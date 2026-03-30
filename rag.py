from langchain_chroma import Chroma
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_ollama import ChatOllama
from langchain_core.messages import SystemMessage, HumanMessage

DB_DIR = "db"

embeddings = HuggingFaceEmbeddings(
    model_name="BAAI/bge-large-en-v1.5",
    model_kwargs={"device": "cuda"},
    encode_kwargs={"normalize_embeddings": True}
)

vectordb = Chroma(
    persist_directory=DB_DIR,
    embedding_function=embeddings,
    collection_name="legal_docs_chunks_only"
)
llm = ChatOllama(
    model="gpt-oss:120b-cloud",
    temperature=0.45
)

INTENT_PROMPT = """
Classify the user's legal query into ONE of the following intents:

GENERAL_RIGHTS
PROCEDURE
OFFENCE
LAW_EXPLANATION
COMPARISON
UNCLEAR

Only output the intent name.
"""

ANSWER_PROMPT = """
You are Vidhan-AI, a legal advisory assistant for Indian law.

Users may describe personal situations, family disputes, property issues, or feelings of unfairness in everyday language.

Your role is to respond as a lawyer would, by identifying the legal issue and providing practical legal guidance.

Your primary source of truth is the legal context retrieved from the current database.

You must always attempt to answer using the provided database context first.

If the database does not contain sufficient information to address the issue, you may rely on your pretrained knowledge of Indian law, subject to the restrictions below.

When pretrained knowledge is used, you must clearly state that the guidance is based on general legal understanding due to absence of relevant material in the database.

You must not fabricate laws, sections, articles, case law, or legal rights.

You must not introduce obscure, disputed, or highly specific legal interpretations.

You must give prescriptive guidance explaining what a person can do, what options are available, or what legal position may be asserted, as supported by the available information.

You may briefly acknowledge the user’s concern, but your response must remain legally focused.

Do not provide emotional counseling.
Do not moralize.
Do not guarantee outcomes.
Do not predict court decisions or final judgments.

IMPORTANT FORMATTING RULES:

Use only plain text.
Do not use Markdown.
Do not use headings.
Do not use bullet points or numbered lists.
Do not use bold, italics, or special formatting.
Write in short paragraphs.
Separate ideas using line breaks.

LANGUAGE STYLE REQUIREMENTS:

Use simple, everyday language.
Assume the reader has no legal background.
Use short, clear sentences.
Prefer direct and practical wording.
You may use phrases such as “can,” “may,” “should consider,” or “is generally advised.”
Avoid heavy legal jargon.
Explain complex ideas in practical terms rather than legal wording.

CONTENT RULES:

If the issue involves family property, inheritance, or personal rights, explain the legal routes available in general terms.

If multiple legal paths may exist, explain them neutrally without recommending one as superior.

If key facts affect legal rights, clearly state what kind of information would matter, without interrogating the user or demanding details.

CONTROLLED FALLBACK RULE:

If the database fully covers the issue, base your guidance strictly on that material.

If the database partially covers the issue, rely on it first and supplement only the missing parts using pretrained knowledge, while clearly indicating this.

If the database does not cover the issue at all, explicitly state that the guidance is based on general legal understanding due to absence of relevant material in the database.

CONSTITUTIONAL SAFETY RULE:

If a question refers to an Article of the Constitution of India:
You may answer only if the current database explicitly defines that Article.
Do not rely on pretrained knowledge to explain constitutional Articles when database information is absent.
If the database does not define the Article, explicitly state that the information is not available in the provided material.
Do not generalize from other Articles.
Do not substitute with similar provisions.
Do not guess.

CRITICAL VERIFICATION RULE:

If the question refers to a specific Article or Section number:
Only explain and apply it if the database or clearly established general legal understanding defines it.
If neither source provides clarity, state that guidance cannot be given on that provision.

Do not infer.
Do not guess.
Do not substitute with related provisions.

ENDING REQUIREMENT:

Always end your response with the exact sentence:

Disclaimer: This is general legal information, not legal advice.
"""

def classify_intent(query):
    response = llm.invoke([
        SystemMessage(content=INTENT_PROMPT),
        HumanMessage(content=query)
    ])
    return response.content.strip()

def normalize_query(query):
    q = query.lower()
    if q.startswith("can police"):
        return "legal limits on police powers under Indian law"
    if "enter" in q or "search" in q:
        return "police search and entry powers under Indian law"
    return query

def is_overview_query(query):
    q = query.lower()
    return any(
        phrase in q
        for phrase in [
            "my rights",
            "fundamental rights",
            "basic rights",
            "what rights",
            "rights do i have"
        ]
    )

def trim_context(docs, max_chars=4000):
    result = ""
    for doc in docs:
        chunk = doc.page_content
        # if a single chunk is already too big, truncate it
        if len(result) + len(chunk) > max_chars:
            remaining = max_chars - len(result)
            if remaining > 200:  # only add if meaningful space left
                result += chunk[:remaining] + "\n\n"
            break
        result += chunk + "\n\n"
    return result.strip()

def ask(query):
    intent = classify_intent(query)

    if intent == "UNCLEAR":
        print("\nYour question is broad. Please clarify the legal context.")
        return

    if intent == "COMPARISON":
        if "ipc" in query.lower() or "crpc" in query.lower():
            print("\nComparison is limited because older laws are not part of the current knowledge base.")
            return

    query = normalize_query(query)

    if intent == "GENERAL_RIGHTS":
        retrieval_query = (
            "fundamental rights of citizens under Part III "
            "Constitution of India Articles 14 to 32"
        )
    else:
        retrieval_query = query

    # lowered k from 6 to 3
    retriever = vectordb.as_retriever(search_kwargs={"k": 3})
    docs = retriever.invoke(f"query: {retrieval_query}")

    if not docs:
        print("\nI could not find an exact provision, but here is the general legal position:")
        return

    # use trim_context instead of raw join
    context = trim_context(docs, max_chars=4000)

    if intent == "GENERAL_RIGHTS" and is_overview_query(query):
        prefix = (
            "Under the Constitution of India, Fundamental Rights broadly include equality before law, "
            "basic freedoms, protection of life and personal liberty, protection against exploitation, "
            "freedom of religion, cultural and educational rights, and the right to constitutional remedies.\n\n"
        )
        context = prefix + context

    response = llm.invoke([
        SystemMessage(content=ANSWER_PROMPT),
        HumanMessage(content=f"Context:\n{context}\n\nQuestion:\n{query}")
    ])

    print("\nAnswer:\n")
    print(response.content)
    
if __name__ == "__main__":
    while True:
        q = input("\nAsk a legal question (or type 'exit'): ")
        if q.lower() == "exit":
            break
        ask(q)

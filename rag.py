from langchain_chroma import Chroma
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_ollama import ChatOllama
from langchain_core.messages import SystemMessage, HumanMessage

DB_DIR = "db"

embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

vectordb = Chroma(
    persist_directory=DB_DIR,
    embedding_function=embeddings
)

llm = ChatOllama(
    model="gemma2",
    temperature=0.2
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
You are Vidhan-AI, a legal information assistant for Indian law.

Answer strictly using the provided legal context.
Do not rely on external knowledge.
Do not mention laws, sections, or articles that are not present in the context.

IMPORTANT ANSWER STRUCTURE RULE:

If the question asks "which section", "which article", "under which provision",
or otherwise asks to identify the law associated with an offence or concept:
- Explicitly identify the relevant section or provision FIRST.
- Clearly state that this section defines or deals with the offence or concept.
- Do NOT treat illustrations, examples, or hypothetical scenarios as the main answer.
- Illustrations may be mentioned only as supporting explanation, not as the core response.

Explain the general legal position using descriptive language.
Avoid advisory or instructional phrasing.
Do not tell the user what they should do.
Do not predict outcomes.

If a constitutional concept is not explicitly defined but is closely
connected to an existing right or provision, explain this relationship
clearly without citing judicial decisions.

Always end with:
"Disclaimer: This is general legal information, not legal advice."

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
        return "What are the legal limits on police powers under Indian law"
    if "enter" in q or "search" in q:
        return "What are the legal provisions governing search and entry by police under Indian law"
    return query

def allowed_sources(intent):
    if intent == "GENERAL_RIGHTS":
        return ["constitution"]
    if intent == "PROCEDURE":
        return ["bnss"]
    if intent == "OFFENCE":
        return ["bns"]
    if intent == "LAW_EXPLANATION":
        return ["constitution", "bns", "bnss"]
    if intent == "COMPARISON":
        return ["constitution", "bns", "bnss"]
    return []

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
    sources = allowed_sources(intent)

    k = 10 if intent == "OFFENCE" else 6
    retriever = vectordb.as_retriever(search_kwargs={"k": k})
    docs = retriever.invoke(query)

    docs = [d for d in docs if d.metadata.get("source") in sources]

    if intent == "GENERAL_RIGHTS":
        overview_docs = vectordb.similarity_search(
            "Fundamental Rights under the Constitution of India",
            k=1
        )
        docs = docs + overview_docs

    if intent == "LAW_EXPLANATION" and "constitution" in sources:
        docs = [d for d in docs if d.metadata.get("source") == "constitution"]

    if intent == "OFFENCE":
        query = "definition of " + query

    if not docs:
        print("\nNo relevant legal provision found in the selected laws.")
        return

    context = "\n\n".join(
        f"Source: {d.metadata.get('source')}\n{d.page_content}"
        for d in docs
    )

    response = llm.invoke([
        SystemMessage(content=ANSWER_PROMPT),
        HumanMessage(content=f"Context:\n{context}\n\nQuestion:\n{query}")
    ])

    print("\nAnswer:\n")
    print(response.content)

    print("\nSources Referenced:")
    for s in sorted(set(d.metadata.get("source") for d in docs)):
        print(f"- {s.capitalize()}")

if __name__ == "__main__":
    while True:
        q = input("\nAsk a legal question (or type 'exit'): ")
        if q.lower() == "exit":
            break
        ask(q)

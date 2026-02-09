import os
import re
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import Chroma
from langchain_core.documents import Document

DATA_DIR = "data"
DB_DIR = "db"

documents = []

files = {
    "constitution.pdf": "constitution",
    "bns.pdf": "bns",
    "bnss.pdf": "bnss"
}

section_pattern = re.compile(
    r"(Section\s+\d+|Article\s+\d+|CHAPTER\s+[IVXLC]+|Chapter\s+\d+|Murder|Culpable Homicide|Theft|Robbery|Cheating)",
    re.IGNORECASE
)

for file, source in files.items():
    path = os.path.join(DATA_DIR, file)
    loader = PyPDFLoader(path)
    pages = loader.load()

    current_section = None

    for p in pages:
        text = p.page_content

        matches = section_pattern.findall(text)
        if matches:
            current_section = matches[0].strip()

        if current_section:
            text = f"Provision context: {current_section}\n\n{text}"

        documents.append(
            Document(
                page_content=text,
                metadata={
                    "source": source,
                    "section_hint": current_section if current_section else "unknown"
                }
            )
        )

overview_text = """
Part III of the Constitution of India guarantees Fundamental Rights.
These include the Right to Equality (Articles 14–18),
Right to Freedoms (Articles 19–22),
Right against Exploitation (Articles 23–24),
Right to Freedom of Religion (Articles 25–28),
Cultural and Educational Rights (Articles 29–30),
and the Right to Constitutional Remedies (Article 32).
"""

documents.append(
    Document(
        page_content=overview_text,
        metadata={"source": "constitution", "type": "overview"}
    )
)

splitter = RecursiveCharacterTextSplitter(
    chunk_size=700,
    chunk_overlap=100
)

chunks = splitter.split_documents(documents)

embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

vectordb = Chroma.from_documents(
    documents=chunks,
    embedding=embeddings,
    persist_directory=DB_DIR
)

vectordb.persist()

print("Ingestion complete.")

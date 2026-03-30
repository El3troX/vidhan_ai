import os
import re
from langchain_community.document_loaders import PyPDFLoader
from langchain_core.documents import Document
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import Chroma

DATA_DIR = "data"
DB_DIR = "db"

FILES = {
    "constitution.pdf": "constitution",
    "bns.pdf": "bns",
    "bnss.pdf": "bnss"
}

def extract_structured_chunks(text, source):
    chunks = []

    if source == "constitution":
        pattern = r"(Article\s+\d+[A-Z]?)"
    else:
        pattern = r"(Section\s+\d+)"

    splits = re.split(pattern, text)

    for i in range(1, len(splits), 2):
        header = splits[i].strip()
        body = splits[i + 1].strip()

        content = f"{header}\n{body}"

        chunks.append(
            Document(
                page_content=content,
                metadata={
                    "source": source,
                    "identifier": header
                }
            )
        )

    return chunks

documents = []

for filename, source in FILES.items():
    path = os.path.join(DATA_DIR, filename)
    loader = PyPDFLoader(path)
    pages = loader.load()

    full_text = "\n".join(p.page_content for p in pages)

    structured_chunks = extract_structured_chunks(full_text, source)
    documents.extend(structured_chunks)

embeddings = HuggingFaceEmbeddings(
    model_name="BAAI/bge-large-en-v1.5",
    model_kwargs={"device": "cuda"},
    encode_kwargs={"normalize_embeddings": True}
)

vectordb = Chroma.from_documents(
    documents=documents,
    embedding=embeddings,
    persist_directory=DB_DIR,
    collection_name="legal_docs_chunks_only"
)

vectordb.persist()

print("Ingestion complete (structure-aware chunking).")

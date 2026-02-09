from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from rag import ask
import sys
import io

app = FastAPI(
    title="Vidhan-AI API",
    description="Indian Legal Information Assistant",
    version="1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class QueryRequest(BaseModel):
    query: str

class QueryResponse(BaseModel):
    answer: str
    sources: list[str]

@app.post("/ask", response_model=QueryResponse)
def ask_question(req: QueryRequest):
    buffer = io.StringIO()
    sys_stdout = sys.stdout
    sys.stdout = buffer

    try:
        ask(req.query)
    finally:
        sys.stdout = sys_stdout

    output = buffer.getvalue()

    answer = ""
    sources = []

    if "Answer:" in output:
        answer = output.split("Answer:")[1].split("Sources Referenced:")[0].strip()

    if "Sources Referenced:" in output:
        src_block = output.split("Sources Referenced:")[1]
        sources = [s.strip("- ").strip() for s in src_block.splitlines() if s.strip()]

    return {
        "answer": answer,
        "sources": sources
    }

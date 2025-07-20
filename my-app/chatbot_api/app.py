import os
import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry
from llama_index.core.readers import SimpleDirectoryReader
from llama_index.core import VectorStoreIndex
from llama_index.embeddings.huggingface import HuggingFaceEmbedding
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


# ======= CONFIGURE =======
# Load GROQ_API_KEY from environment variables only
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
if not GROQ_API_KEY:
    raise RuntimeError("GROQ_API_KEY environment variable not set. Please add it to your .env file.")
GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"

DOCUMENTS_DIR = "./sample_docs"  # This path needs to be relative to where the FastAPI app is run, or an absolute path.
# For now, assuming sample_docs will be copied into or accessible from chatbot_api directory.

# Configure local embedding model
embed_model = HuggingFaceEmbedding(model_name="sentence-transformers/all-MiniLM-L6-v2")

# Configure requests session with retry logic
session = requests.Session()
retries = Retry(
    total=5,
    backoff_factor=1,
    status_forcelist=[500, 502, 503, 504],
    allowed_methods=["POST"]
)
session.mount("https://", HTTPAdapter(max_retries=retries))

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], # Allow your React frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Query(BaseModel):
    question: str

# Global variable to hold the index
rag_index = None

def query_groq_api(prompt: str) -> str:
    try:
        if not GROQ_API_KEY or GROQ_API_KEY.strip() == "":
            return "Error: GROQ_API_KEY not set."

        headers = {
            "Authorization": f"Bearer {GROQ_API_KEY}",
            "Content-Type": "application/json",
        }
        data = {
            "model": "llama-3.3-70b-versatile",
            "messages": [
                {"role": "system", "content": "You are a helpful assistant that provides accurate and concise information about financial topics."},
                {"role": "user", "content": prompt}
            ],
            "max_tokens": 300,
            "temperature": 0.7,
            "top_p": 0.9,
        }

        response = session.post(GROQ_API_URL, headers=headers, json=data, timeout=30)
        response.raise_for_status()
        return response.json()["choices"][0]["message"]["content"].strip()
    except requests.exceptions.RequestException as e:
        print(f"Error connecting to Groq API: {str(e)}")
        return "I apologize, but I'm having trouble connecting to the AI service. Please try again later."
    except Exception as e:
        print(f"An unexpected error occurred in query_groq_api: {str(e)}")
        return "An internal error occurred."


def build_index_func():
    global rag_index
    print("Loading documents...")
    # Ensure DOCUMENTS_DIR exists and contains documents
    if not os.path.exists(DOCUMENTS_DIR) or not os.listdir(DOCUMENTS_DIR):
        print(f"Warning: '{DOCUMENTS_DIR}' is empty or does not exist. Chatbot will operate without RAG context.")
        # Create an empty index or handle this case appropriately if RAG is critical
        rag_index = None
        return

    documents = SimpleDirectoryReader(DOCUMENTS_DIR).load_data()
    print(f"Loaded {len(documents)} documents.")
    rag_index = VectorStoreIndex.from_documents(documents, embed_model=embed_model)


def ask_question_func(index_param, question: str) -> str:
    if index_param is None:
        # Fallback if RAG index is not built (e.g., no documents)
        prompt = f"Question: {question}\nAnswer:"
        answer = query_groq_api(prompt)
        return answer
    else:
        retriever = index_param.as_retriever(similarity_top_k=3)
        retrieved_nodes = retriever.retrieve(question)

        # Combine the retrieved context
        context = "\n".join([node.text for node in retrieved_nodes])

        prompt = f"Context:\n{context}\n\nQuestion: {question}\nAnswer:"
        answer = query_groq_api(prompt)
        return answer

@app.on_event("startup")
async def startup_event():
    # Build the RAG index when the FastAPI application starts up
    build_index_func()

@app.post("/chat")
async def chat_endpoint(query: Query):
    if not GROQ_API_KEY or GROQ_API_KEY.strip() == "":
        raise HTTPException(status_code=500, detail="GROQ_API_KEY is not set.")

    try:
        bot_ans = ask_question_func(rag_index, query.question)
        return {"answer": bot_ans}
    except Exception as e:
        print(f"Error processing chat request: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error while processing your request.")

@app.get("/")
async def root():
    return {"message": "Chatbot API is running. Use the /chat endpoint for questions."}

if __name__ == "__main__":
    import uvicorn
    # To run: uvicorn app:app --reload --host 0.0.0.0 --port 8001
    uvicorn.run(app, host="0.0.0.0", port=8001) 
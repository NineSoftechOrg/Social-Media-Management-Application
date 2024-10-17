# main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import logging

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this as necessary for security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define the request model
class PromptRequest(BaseModel):
    text: str

# Initialize logging
logging.basicConfig(level=logging.INFO)

@app.post("/generate-roadmap/")
async def generate_roadmap(prompt: PromptRequest):
    # Log the received prompt
    logging.info(f"Received prompt: {prompt.text}")
    
    return {"message": "Prompt sent successfully!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=8000)

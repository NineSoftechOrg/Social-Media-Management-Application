 #main.py
from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from langchain_ollama import OllamaLLM
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
import logging
import os
import openai
import io
from io import BytesIO

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
class PdfRequest(BaseModel):
    content: str  # The content that needs to be turned into a PDF (e.g., responseMessage)

# Initialize logging
logging.basicConfig(level=logging.INFO)

# Set your OpenAI API key
# openai.api_key=""

llm = OllamaLLM(model="llama3.2")

@app.post("/generate-roadmap/")
async def generate_roadmap(prompt: PromptRequest):
    logging.info(f"Received prompt: {prompt.text}")

    # Send an immediate response indicating the prompt was received
    intermediate_response = {"message": "Prompt received by AI. Processing..."}

    ## Call Open API and Return Prompt
    # return {"message": intermediate_response["message"], "generated_response": call_open_api(prompt.text)}

    ## Call Local  and Return Prompt
    try:
        return StreamingResponse(generate(prompt.text), media_type="text/plain")
    except Exception as e:
        logging.error(f"Error generating roadmap: {e}")
        return {"message": f"Error generating roadmap: {str(e)}"}
def generate(prompt):
    for chunk in llm.stream(prompt):
        yield f"{chunk}\n"
@app.post("/download-pdf/")
async def download_pdf(request: PdfRequest):
    # Create an in-memory file to store the PDF
    pdf_file = io.BytesIO()

    # Generate PDF using reportlab
    p = canvas.Canvas(pdf_file)
    p.drawString(100, 750, "Generated PDF")
    p.drawString(100, 730, f"Response: {request.content}")  # Add response content to PDF

    p.showPage()
    p.save()

    # Set the file pointer to the beginning of the file
    pdf_file.seek(0)

    # Return the PDF as a StreamingResponse
    return StreamingResponse(pdf_file, media_type="application/pdf", headers={
        "Content-Disposition": "attachment; filename=downloaded_pdf.pdf"
    })
''' async def call_open_api(prompt):
    # Call OpenAI's API to generate a roadmap
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",  # Specify the model you want to use
            messages=[
                {"role": "user", "content": prompt}
            ],
        )

        # Extract the generated text from the response
        generated_text = response.choices[0].message.content.strip()
        logging.info(f"Generated response: {generated_text}")

        return generated_text

    except Exception as e:
        logging.error(f"Error generating roadmap: {e}")
        return {"message": f"Error generating roadmap: {str(e)}"} '''


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=8000)
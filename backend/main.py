from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from langchain_ollama import OllamaLLM
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
import logging
import io

app = FastAPI()

# Enable CORS for cross-origin requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this as necessary for security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request model for receiving prompt
class PromptRequest(BaseModel):
    text: str

# Request model for PDF generation
class PdfRequest(BaseModel):
    content: str  # The content to turn into a PDF

# Initialize logging
logging.basicConfig(level=logging.INFO)

# Initialize your LLM (local AI model or other language model)
llm = OllamaLLM(model="llama3.2")

# Endpoint to generate the roadmap based on prompt
@app.post("/generate-roadmap/")
async def generate_roadmap(prompt: PromptRequest):
    logging.info(f"Received prompt: {prompt.text}")

    try:
        # Construct a detailed prompt for monthly planning
        business_data = prompt.text
        detailed_prompt = f"Based on the following business details, generate a monthly planning best roadmap:\n{business_data}"

        return StreamingResponse(generate(detailed_prompt), media_type="text/plain")
    except Exception as e:
        logging.error(f"Error generating roadmap: {e}")
        return {"message": f"Error generating roadmap: {str(e)}"}


# Generator function to stream AI response
def generate(prompt):
    yield "Starting roadmap generation...\n"
    for chunk in llm.stream(prompt):
        yield f"{chunk}\n"
    yield "Roadmap generation complete.\n" 

# Endpoint to download the response as a PDF
@app.post("/download-pdf/")
async def download_pdf(request: PdfRequest):
    # Create an in-memory file to store the PDF
    pdf_file = io.BytesIO()

    # Generate the PDF using reportlab
    p = canvas.Canvas(pdf_file, pagesize=letter)
    p.drawString(100, 750, "Generated PDF")
    p.drawString(100, 730, f"Response: {request.content}")  # Add response content to PDF

    p.showPage()
    p.save()

    # Set file pointer to the beginning
    pdf_file.seek(0)

    # Return the PDF as a StreamingResponse
    return StreamingResponse(pdf_file, media_type="application/pdf", headers={
        "Content-Disposition": "attachment; filename=downloaded_pdf.pdf"
    })

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=8000)
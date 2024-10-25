from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel
from langchain_ollama import OllamaLLM
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, ListFlowable
from reportlab.lib.units import inch
import logging
import uuid
import os
import re

app = FastAPI()

# CORS settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data model for request
class PromptRequest(BaseModel):
    text: str

# Logging configuration
logging.basicConfig(level=logging.INFO)
llm = OllamaLLM(model="llama3.2")

@app.post("/generate-roadmap/")
async def generate_roadmap(prompt: PromptRequest):
    logging.info(f"Received prompt: {prompt.text}")
    try:
        # Generating a roadmap based on provided business data
        business_data = prompt.text
        detailed_prompt = f"Based on the following business details, generate a monthly planning roadmap:\n{business_data}"
        
        roadmap_content = ""
        for chunk in llm.stream(detailed_prompt):
            roadmap_content += chunk

        pdf_path = f"/tmp/{uuid.uuid4()}.pdf"
        generate_pdf(roadmap_content, pdf_path)

        return {"pdf_url": f"http://localhost:8000/download-pdf/{os.path.basename(pdf_path)}"}

    except Exception as e:
        logging.error(f"Error generating roadmap: {e}")
        return {"message": f"Error generating roadmap: {str(e)}"}

@app.get("/download-pdf/{pdf_filename}")
async def download_pdf(pdf_filename: str):
    pdf_path = f"/tmp/{pdf_filename}"
    if os.path.exists(pdf_path):
        return FileResponse(pdf_path, media_type="application/pdf", filename="roadmap.pdf")
    return {"message": "PDF file not found"}

def generate_pdf(content: str, file_path: str):
    doc = SimpleDocTemplate(file_path, pagesize=letter, rightMargin=50, leftMargin=50, topMargin=50, bottomMargin=50)
    styles = getSampleStyleSheet()

    # Custom styles for PDF elements
    title_style = ParagraphStyle(
        name="TitleStyle",
        fontSize=18,
        leading=22,
        spaceAfter=24,
        alignment=1,  # Center-align title
        textColor=colors.darkblue,
        fontName="Helvetica-Bold"
    )

    subtitle_style = ParagraphStyle(
        name="SubtitleStyle",
        fontSize=14,
        leading=18,
        spaceAfter=14,
        textColor=colors.darkgreen,
        fontName="Helvetica-Bold"
    )

    body_style = ParagraphStyle(
        name="BodyText",
        fontSize=11,
        leading=14,
        spaceAfter=12,
        fontName="Helvetica"
    )

    bullet_style = ParagraphStyle(
        name="Bullet",
        fontSize=11,
        leading=14,
        leftIndent=20,
        bulletIndent=10,
        bulletFontName="Helvetica",
        spaceAfter=8,
        bulletColor=colors.black
    )

    elements = []
    
    # Adding the title
    elements.append(Paragraph("Generated Roadmap", title_style))

    # Parsing and adding content with formatting
    sections = content.split('\n\n')
    for section in sections:
        if section.startswith("## "):  # Subtitle formatting
            elements.append(Spacer(1, 12))
            elements.append(Paragraph(section[3:], subtitle_style))  # Add subtitle without "## "

        elif section.startswith("- "):  # Bullet point formatting
            bullets = []
            for line in section.split("\n"):
                if line.startswith("- "):
                    text = line[2:]
                    # Replace ** with bold formatting
                    formatted_text = re.sub(r'\*\*(.*?)\*\*', r'<b>\1</b>', text)
                    bullets.append(Paragraph(formatted_text, bullet_style))
            elements.extend(bullets)
            elements.append(Spacer(1, 10))

        else:  # Regular paragraph formatting
            # Replace ** with bold formatting
            formatted_text = re.sub(r'\*\*(.*?)\*\*', r'<b>\1</b>', section)
            elements.append(Paragraph(formatted_text, body_style))
            elements.append(Spacer(1, 10))

    # Building the PDF document
    doc.build(elements)

if __name__ == '__main__':
     import uvicorn
     uvicorn.run(app, host="localhost", port=8000)

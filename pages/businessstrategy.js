import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faBriefcase, faCalendarAlt, faMapMarkerAlt, faDollarSign, faComments } from '@fortawesome/free-solid-svg-icons';

const BusinessStrategy = () => {
  const [step, setStep] = useState(1); // Track the current question step
  const [formData, setFormData] = useState({
    companyName: '',
    businessType: '',
    timeSpan: '',
    location: '',
    budget: '',
    recommendations: '',
  });
  const [responseMessage, setResponseMessage] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = async () => {
    if (step < 6) {
      setStep(step + 1);
    } else {
      // Submit the form data to the backend
      try {
        const response = await fetch('http://localhost:8000/generate-roadmap/', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: JSON.stringify(formData) }), // Send form data as text
      });
        if (!response.ok) {
          throw new Error('Failed to generate roadmap');
        }

        const data = await response.text(); // Get the response text
        setResponseMessage(data); // Update response message

        // After generating the roadmap, enable PDF download
        const pdfResponse = await fetch('http://localhost:8000/download-pdf/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ content: data }), // Send response content for PDF generation
        });

        if (!pdfResponse.ok) {
          throw new Error('Failed to generate PDF');
        }

        // Create a Blob from the response
        const pdfBlob = await pdfResponse.blob();
        const url = URL.createObjectURL(pdfBlob);
        setPdfUrl(url); // Update PDF URL for downloading
      } catch (error) {
        alert(error.message);
      }
    }
  };

  const renderQuestion = () => {
    switch (step) {
      case 1:
        return (
          <>
            <label>
              <FontAwesomeIcon icon={faBuilding} /> What is the name of your company?
            </label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              placeholder="e.g., INC Global"
              style={inputStyle}
            />
          </>
        );
      case 2:
        return (
          <>
            <label>
              <FontAwesomeIcon icon={faBriefcase} /> What type of business are you planning?
            </label>
            <input
              type="text"
              name="businessType"
              value={formData.businessType}
              onChange={handleInputChange}
              placeholder="e.g., E-commerce, Consultancy"
              style={inputStyle}
            />
          </>
        );
      case 3:
        return (
          <>
            <label>
              <FontAwesomeIcon icon={faCalendarAlt} /> What is the time span for your strategy?
            </label>
            <input
              type="text"
              name="timeSpan"
              value={formData.timeSpan}
              onChange={handleInputChange}
              placeholder="e.g., 6 months, 1 year"
              style={inputStyle}
            />
          </>
        );
      case 4:
        return (
          <>
            <label>
              <FontAwesomeIcon icon={faMapMarkerAlt} /> Where is the business located?
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="e.g., New York, Remote"
              style={inputStyle}
            />
          </>
        );
      case 5:
        return (
          <>
            <label>
              <FontAwesomeIcon icon={faDollarSign} /> What is your budget range?
            </label>
            <input
              type="text"
              name="budget"
              value={formData.budget}
              onChange={handleInputChange}
              placeholder="e.g., $10,000 - $50,000"
              style={inputStyle}
            />
          </>
        );
      case 6:
        return (
          <>
            <label>
              <FontAwesomeIcon icon={faComments} /> Would you like personalized recommendations?
            </label>
            <input
              type="text"
              name="recommendations"
              value={formData.recommendations}
              onChange={handleInputChange}
              placeholder="Yes or No"
              style={inputStyle}
            />
          </>
        );
      default:
        return null;
    }
  };

  const isNextDisabled = () => {
    switch (step) {
      case 1:
        return formData.companyName.trim() === '';
      case 2:
        return formData.businessType.trim() === '';
      case 3:
        return formData.timeSpan.trim() === '';
      case 4:
        return formData.location.trim() === '';
      case 5:
        return formData.budget.trim() === '';
      case 6:
        return formData.recommendations.trim() === '';
      default:
        return true;
    }
  };

  // Inline styles
  const containerStyle = {
    padding: '20px',
    maxWidth: '600px',
    margin: 'auto',
  };
  
  const chatbotContainerStyle = {
    border: '1px solid #ddd',
    borderRadius: '5px',
    padding: '20px',
    backgroundColor: '#f9f9f9',
  };

  const titleStyle = {
    fontSize: '1.5em',
    fontWeight: 'bold',
    marginBottom: '15px',
    textAlign: 'center',
  };

  const inputStyle = {
    width: '100%',
    padding: '8px',
    marginBottom: '10px',
    fontSize: '1em',
    border: '1px solid #ddd',
    borderRadius: '4px',
  };

  const nextButtonStyle = {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  return (
    <div style={containerStyle}>
      <div style={chatbotContainerStyle}>
        <h2 style={titleStyle}>Business Strategy Form</h2>
        <div>{renderQuestion()}</div>
        <button
          style={nextButtonStyle}
          onClick={nextStep}
          disabled={isNextDisabled()}
        >
          {step < 6 ? 'Next' : 'Submit'}
        </button>
        {pdfUrl && (
          <a href={pdfUrl} download style={{ display: 'block', marginTop: '10px', color: '#007bff' }}>
            Download PDF
          </a>
        )}
        {responseMessage && <div style={{ marginTop: '10px' }}>{responseMessage}</div>}
      </div>
    </div>
  );
};

export default BusinessStrategy;

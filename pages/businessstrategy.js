import React, { useState } from 'react';

export default function BusinessStrategy() {
  const [promptText, setPromptText] = useState(''); // State to hold prompt text
  const [responseMessage, setResponseMessage] = useState(''); // State for backend response
  const [isResponseGenerated, setIsResponseGenerated] = useState(false); // State to track if response is generated

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh', // Full viewport height
    padding: '20px',
    backgroundColor: '#f9f9f9', // Light background for better visibility
  };

  const titleStyle = {
    fontSize: '2rem',
    marginBottom: '20px',
    color: '#333',
  };

  const promptStyle = {
    fontSize: '1.2rem',
    marginBottom: '10px',
    color: '#555',
  };

  const textareaStyle = {
    width: '100%', // Full width
    maxWidth: '600px', // Maximum width for better readability
    height: '200px', // Height of the textarea
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginBottom: '20px',
    fontSize: '1rem',
    resize: 'none', // Disable resizing
  };

  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%', // Full width
    maxWidth: '600px', // Align with textarea
  };

  const buttonStyle = {
    padding: '10px 20px',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  const generateButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#28a745', // Green color
    color: 'white',
  };

  const downloadButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#dc3545', // Red color
    color: 'white',
  };

  const handleGenerate = async () => {
    setResponseMessage(''); // Clear previous response
    setIsResponseGenerated(false); // Reset the flag

    try {
      const response = await fetch('http://localhost:8000/generate-roadmap/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: promptText }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let done = false;
      let text = '';

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        text += decoder.decode(value, { stream: true });
        setResponseMessage(prev => prev + decoder.decode(value, { stream: true }));
      }

      setIsResponseGenerated(true); // Set flag when response is fully generated
    } catch (error) {
      console.error('Error:', error);
      setResponseMessage('Error occurred while generating roadmap.');
    }
  };

  const handleDownload = async () => {
    try {
      const response = await fetch('http://localhost:8000/download-pdf/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: responseMessage }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'roadmap.pdf'; // The name of the PDF file
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading PDF:', error);
      alert('Error occurred while downloading the PDF.');
    }
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Welcome to the Business Strategy Page</h1>
      <p style={promptStyle}>Provide your insights here:</p>
      <textarea
        style={textareaStyle}
        placeholder="Write your insights..."
        value={promptText}
        onChange={(e) => setPromptText(e.target.value)} // Update state on input
      />
      <div style={buttonContainerStyle}>
        <button style={generateButtonStyle} onClick={handleGenerate}>
          Generate
        </button>
      </div>

      {/* Display response when generated */}
      {responseMessage && <div dangerouslySetInnerHTML={{ __html: responseMessage }} />}

      {/* Show "Click to download" message and download button once the response is generated */}
      {isResponseGenerated && (
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <p style={{ fontSize: '1.2rem', color: '#007bff' }}>Click below to download the PDF</p>
          <button style={downloadButtonStyle} onClick={handleDownload}>
            Download PDF
          </button>
        </div>
      )}
    </div>
  );
}
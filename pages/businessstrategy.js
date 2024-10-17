// pages/businessstrategy.js

import React, { useState } from 'react';

export default function BusinessStrategy() {
  const [promptText, setPromptText] = useState(''); // State to hold prompt text
  const [responseMessage, setResponseMessage] = useState(''); // State for backend response

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

      const data = await response.json();
      setResponseMessage(data.message); // Set response message from backend
    } catch (error) {
      console.error('Error:', error);
      setResponseMessage('Error occurred while generating roadmap.'); // Set error message
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
        <button style={downloadButtonStyle} onClick={() => alert('Download PDF clicked!')}>
          Download PDF
        </button>
      </div>
      {responseMessage && <p>{responseMessage}</p>} {/* Display backend response */}
    </div>
  );
}

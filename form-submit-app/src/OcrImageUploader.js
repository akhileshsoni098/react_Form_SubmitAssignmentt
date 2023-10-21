import React, { useState } from 'react';
import axios from 'axios';

const OcrImageUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [ocrResult, setOcrResult] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      if (!selectedFile) {
        setError('Please select a file to upload.');
        return;
      }

      const formData = new FormData();
      formData.append('ocrPic', selectedFile);

      const response = await axios.post('http://localhost:3001/imageToText', formData);

      if (response.status === 200) {
        const data = response.data;
        if (data.status) {
          setOcrResult(data.data);
        } else {
          setError(data.message);
        }
      } else {
        setError('Failed to upload and process the image.');
      }
    } catch (err) {
      setError('An error occurred while processing the image.');
      console.error(err);
    }
  };

  return (
    <div>
      <h2>OCR Image Uploader</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload and Process</button>

      {ocrResult && (
        <div>
          <h3>OCR Result:</h3>
          <p>{ocrResult}</p>
        </div>
      )}

      {error && (
        <div>
          <h3>Error:</h3>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default OcrImageUploader;

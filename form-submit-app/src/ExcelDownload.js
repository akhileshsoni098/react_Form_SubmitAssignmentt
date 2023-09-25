import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import saveAs from 'file-saver';

function ExcelDownload() {
  const [fromDate, setFromDate] = useState(''); // State to store fromDate
  const [toDate, setToDate] = useState(''); // State to store toDate

  const handleDownloadClick = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3001/admin/getAllUserData',
        {
          fromDate: fromDate,
          toDate: toDate,
        },
        {
          responseType: 'blob', // Set the response type to blob
        }
      );

      if (response.status === 200) {
        // Use file-saver to save the Blob as an Excel file
        saveAs(response.data, 'clients.xlsx');
      } else {
        console.error('Failed to generate Excel file');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div>
      <h1>Date filtered Excel data Akhilesh Soni</h1>
      <div>
        <label>From Date:</label>
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />
      </div>
      <div>
        <label>To Date:</label>
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />
      </div>
      <button onClick={handleDownloadClick}>Download Excel</button>
    </div>
  );
}

export default ExcelDownload;

import React, { useState } from 'react';
import axios from 'axios';

const YourComponent = () => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const handleFromDateChange = (event) => {
    setFromDate(event.target.value);
  };

  const handleToDateChange = (event) => {
    setToDate(event.target.value);
  };

  const handleDownload = async () => {
    try {
      const response = await axios.post('http://localhost:3001/admin/allData', {
        fromDate,
        toDate,
      }, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement('a');
      a.href = url;
      a.download = 'students.xlsx';
      a.click();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <h2>Download Student Data</h2>
      <div>
        <label htmlFor="fromDate">From Date:</label>
        <input
          type="date"
          id="fromDate"
          value={fromDate}
          onChange={handleFromDateChange}
        />
      </div>
      <div>
        <label htmlFor="toDate">To Date:</label>
        <input
          type="date"
          id="toDate"
          value={toDate}
          onChange={handleToDateChange}
        />
      </div>
      <button onClick={handleDownload}>Download</button>
    </div>
  );
};

export default YourComponent;

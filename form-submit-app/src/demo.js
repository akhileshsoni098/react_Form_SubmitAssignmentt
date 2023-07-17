import React, { useState } from 'react';

function Tts() {
  const [text, setText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/user/tts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate speech audio');
      }

      const blob = await response.blob();
      const audioUrl = URL.createObjectURL(blob);

      const audio = new Audio(audioUrl);
      audio.play();
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div>
      <h1>Text to Speech</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Convert</button>
      </form>
    </div>
  );
}

export default Tts;

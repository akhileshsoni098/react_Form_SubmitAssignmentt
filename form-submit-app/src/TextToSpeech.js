 /* 
 
 import React, { useState, useEffect } from 'react';

const TextToSpeechApp = () => {
  const [text, setText] = useState('');
  const [voices, setVoices] = useState([]);
  const [selectedVoiceURI, setSelectedVoiceURI] = useState(null);

  useEffect(() => {
    // Load available voices
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    if (window.speechSynthesis) {
      window.speechSynthesis.addEventListener('voiceschanged', loadVoices);
      loadVoices();
    }
  }, []);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleVoiceChange = (event) => {
    setSelectedVoiceURI(event.target.value);
  };

  const handleSpeak = () => {
    if (text && selectedVoiceURI) {
      const utterance = new SpeechSynthesisUtterance(text);

      // Find the selected voice based on URI
      const selectedVoice = voices.find((voice) => voice.voiceURI === selectedVoiceURI);

      if (selectedVoice) {
        utterance.voice = selectedVoice;
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  return (
    <div>
      <h1>Text to Speech App</h1>
      <textarea
        value={text}
        onChange={handleTextChange}
        placeholder="Enter text here..."
      />
      <select onChange={handleVoiceChange}>
        <option value="">Select a voice</option>
        {voices.map((voice) => (
          <option key={voice.voiceURI} value={voice.voiceURI}>
            {voice.name}
          </option>
        ))}
      </select>
      <button onClick={handleSpeak} disabled={!text || !selectedVoiceURI}>
        Speak
      </button>
    </div>
  );
};

export default TextToSpeechApp;


  */

/* 
import React, { useState, useEffect } from 'react';

const TextToSpeechApp = () => {
  const [text, setText] = useState('');
  const [voices, setVoices] = useState([]);
  const [selectedVoiceURI, setSelectedVoiceURI] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    if (window.speechSynthesis) {
      window.speechSynthesis.addEventListener('voiceschanged', loadVoices);
      loadVoices();
    }
  }, []);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleVoiceChange = (event) => {
    setSelectedVoiceURI(event.target.value);
  };

  const handleGenerate = async () => {
    if (text && selectedVoiceURI) {
      const selectedVoice = voices.find((voice) => voice.voiceURI === selectedVoiceURI);

      if (selectedVoice) {
        const audioBlob = await generateAudio(text, selectedVoice);
        setAudioBlob(audioBlob);
      }
    }
  };

  const generateAudio = async (text, voice) => {
    return new Promise((resolve) => {
      const synthesis = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = voice;

      const chunks = [];

      utterance.onaudiostart = () => {
        chunks.length = 0;
      };

      utterance.onaudioprocess = (event) => {
        chunks.push(event.inputBuffer);
      };

      utterance.onend = async () => {
        synthesis.cancel();

        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const destination = audioContext.createMediaStreamDestination();
        const recorder = new MediaRecorder(destination.stream);

        recorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            resolve(event.data);
          }
        };

        chunks.forEach((chunk) => {
          const source = audioContext.createBufferSource();
          source.buffer = chunk;
          source.connect(destination);
          source.start();
        });

        recorder.start();
        recorder.stop();
      };

      synthesis.speak(utterance);
    });
  };

  const handleDownload = () => {
    if (audioBlob) {
      const downloadLink = URL.createObjectURL(audioBlob);
      const a = document.createElement('a');
      a.href = downloadLink;
      a.download = 'speech.wav';
      a.click();
    }
  };

  return (
    <div>
      <h1>Text to Speech App</h1>
      <textarea
        value={text}
        onChange={handleTextChange}
        placeholder="Enter text here..."
      />
      <select onChange={handleVoiceChange}>
        <option value="">Select a voice</option>
        {voices.map((voice) => (
          <option key={voice.voiceURI} value={voice.voiceURI}>
            {voice.name}
          </option>
        ))}
      </select>
      <button onClick={handleGenerate} disabled={!text || !selectedVoiceURI}>
        Generate Audio
      </button>
      {audioBlob && (
        <div>
          <button onClick={handleDownload}>Download Audio</button>
        </div>
      )}
    </div>
  );
};

export default TextToSpeechApp;
 */


// import React, { useState } from "react";
// import axios from "axios";

// function App() {
//   const [text, setText] = useState("");
//   const [voice, setVoice] = useState("en");
//   const [audioUrl, setAudioUrl] = useState("");

//   const generateAudio = async () => {
//     try {
//       const response = await axios.get("http://localhost:3001/generate-audio", {
//         params: { text, voice },
//         responseType: "blob",
//       });

//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       setAudioUrl(url);
//     } catch (error) {
//       console.error("Error generating audio:", error);
//     }
//   };

//   return (
//     <div className="App">
//       <h1>Text-to-Speech Application</h1>
//       <div>
//         <label htmlFor="text">Text:</label>
//         <input
//           type="text"
//           id="text"
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//         />
//       </div>
//       <div>
//         <label htmlFor="voice">Voice:</label>
//         <select
//           id="voice"
//           value={voice}
//           onChange={(e) => setVoice(e.target.value)}
//         >
//           <option value="en">English</option>
//           <option value="es">Spanish</option>
//           <option value="fr">French</option>
//           {/* Add more language options as needed */}
//         </select>
//       </div>
//       <button onClick={generateAudio}>Generate Audio</button>
//       {audioUrl && (
//         <div>
//           <audio controls>
//             <source src={audioUrl} type="audio/mpeg" />
//             Your browser does not support the audio element.
//           </audio>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;







// this code is working for simple audio 

/* import React, { useState } from "react";
import axios from "axios";

const TextToSpeechApp = () => {
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post("http://localhost:3001/speech", { text });
      setMessage(response.data.message);
      setError("");
    } catch (err) {
      setError("Failed to convert text to speech.");
      setMessage("");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Text to Speech Converter</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to convert..."
          style={{ width: "80%", height: "100px" }}
        />
        <br />
        <button type="submit">Convert to Speech</button>
      </form>
      <p style={{ color: "green" }}>{message}</p>
      <p style={{ color: "red" }}>{error}</p>
    </div>
  );
};

export default TextToSpeechApp;
 */

// to select en hi for that 
/* 

import React, { useState } from "react";
import axios from "axios";

const TextToSpeechApp = () => {
  const [text, setText] = useState("");
  const [voice, setVoice] = useState("en");
  const voices = ["en", "hi", "es"]; // Add more voice options

  const handleVoiceChange = (e) => {
    setVoice(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/speech", { text, voice });
      console.log(response.data.message); // Log the message or display it to the user
    } catch (error) {
      console.error("Error converting text to speech:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Text to Speech Converter</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to convert..."
          style={{ width: "80%", height: "100px" }}
        />
        <br />
        <label>
          Select Voice:
          <select value={voice} onChange={handleVoiceChange}>
            {voices.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </label>
        <br />
        <button type="submit">Convert to Speech</button>
      </form>
    </div>
  );
};

export default TextToSpeechApp;
 
 
 */


// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function App() {
//   const [text, setText] = useState("");
//   const [selectedVoice, setSelectedVoice] = useState(null);
//   const [voices, setVoices] = useState([]);

//   useEffect(() => {
//     // Fetch available voices from the browser's speech synthesis API
//     const availableVoices = window.speechSynthesis.getVoices();
//     setVoices(availableVoices);
//     setSelectedVoice(availableVoices[0]); // Default to the first available voice
//   }, []);

//   const handleGenerateSpeech = () => {
//     if (!selectedVoice) {
//       console.error("No voice selected.");
//       return;
//     }

//     // Send the selected voice and text to the backend for speech generation
//     axios.post("http://localhost:3001/speech", {
//       text,
//       selectedVoice: selectedVoice.name,
//     })
//     .then(response => {
//       console.log(response.data);
//     })
//     .catch(error => {
//       console.error("Error generating speech:", error);
//     });
//   };

//   return (
//     <div>
//       <textarea
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         placeholder="Enter text to convert to speech"
//       />
//       <select value={selectedVoice?.name} onChange={(e) => {
//         const selectedVoiceName = e.target.value;
//         const selectedVoice = voices.find(voice => voice.name === selectedVoiceName);
//         setSelectedVoice(selectedVoice);
//       }}>
//         {voices.map(voice => (
//           <option key={voice.name} value={voice.name}>
//             {voice.name}
//           </option>
//         ))}
//       </select>
//       <button onClick={handleGenerateSpeech}>Generate Speech</button>
//     </div>
//   );
// }

// export default App;

////////////////////////////////////////////////////////////////

/* import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TextToSpeechApp = () => {
  const [text, setText] = useState('');
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    if (window.speechSynthesis) {
      window.speechSynthesis.addEventListener('voiceschanged', loadVoices);
      loadVoices();
    }
  }, []);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleVoiceChange = (event) => {
    setSelectedVoice(event.target.value);
  };

  const handleSpeak = () => {
    if (text && selectedVoice) {
      const selectedVoiceObj = voices.find((voice) => voice.name === selectedVoice);

      if (selectedVoiceObj) {
        const data = {
          text: text,
          selectedVoice: selectedVoiceObj,
        };

        axios.post('http://localhost:3001/save-audio', data, { responseType: 'arraybuffer' })
          .then(response => {
            const audioBlob = new Blob([response.data], { type: 'audio/mpeg' });
            const audioUrl = URL.createObjectURL(audioBlob);
            
            // Create an audio element to play the saved audio
            const audioElement = new Audio(audioUrl);
            audioElement.play();
          })
          .catch(error => {
            console.error('Error saving audio:', error);
          });
      }
    }
  };

  return (
    <div>
      <h1>Text to Speech App</h1>
      <textarea
        value={text}
        onChange={handleTextChange}
        placeholder="Enter text here..."
      />
      <select onChange={handleVoiceChange}>
        <option value="">Select a voice</option>
        {voices.map((voice) => (
          <option key={voice.voiceURI} value={voice.name}>
            {voice.name}
          </option>
        ))}
      </select>
      <button onClick={handleSpeak} disabled={!text || !selectedVoice}>
        Speak & Play Audio
      </button>
    </div>
  );
};

export default TextToSpeechApp;
 */



//////////////////////////////////////

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TextToSpeechApp = () => {
  const [text, setText] = useState('');
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState('');

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    if (window.speechSynthesis) {
      window.speechSynthesis.addEventListener('voiceschanged', loadVoices);
      loadVoices();
    }
  }, []);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleVoiceChange = (event) => {
    setSelectedVoice(event.target.value);
  };

  const handleSpeak = async () => {
    if (text && selectedVoice) {
      try {
        const response = await axios.post('http://localhost:3001/save-audio', {
          text: text,
          selectedVoice: selectedVoice,
        }, { responseType: 'arraybuffer' });

        const audioBlob = new Blob([response.data], { type: 'audio/mpeg' });
        const audioUrl = URL.createObjectURL(audioBlob);
        const audioElement = new Audio(audioUrl);
        audioElement.play();
      } catch (error) {
        console.error('Error saving audio:', error);
      }
    }
  };

  return (
    <div>
      <h1>Text to Speech App</h1>
      <textarea
        value={text}
        onChange={handleTextChange}
        placeholder="Enter text here..."
      />
      <select onChange={handleVoiceChange}>
        <option value="">Select a voice</option>
        {voices.map((voice) => (
          <option key={voice.voiceURI} value={voice.voiceURI}>
            {voice.name}
          </option>
        ))}
      </select>
      <button onClick={handleSpeak} disabled={!text || !selectedVoice}>
        Speak & Play Audio
      </button>
    </div>
  );
};

export default TextToSpeechApp;

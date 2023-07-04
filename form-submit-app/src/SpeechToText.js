// import React, { useState } from 'react';

// const SpeechToText = () => {
//   const [transcription, setTranscription] = useState('');
//   const [isListening, setIsListening] = useState(false);
//   const recognition = new window.webkitSpeechRecognition();

//   // Configure speech recognition
//   recognition.continuous = true;
//   recognition.interimResults = true;
//   recognition.lang = 'en-US'; // Set the default language

//   // Event handler for when speech recognition receives a result
//   recognition.onresult = (event) => {
//     const { transcript } = event.results[event.results.length - 1][0];
//     setTranscription(transcript);
//   };

//   // Event handler for errors during speech recognition
//   recognition.onerror = (event) => {
//     console.error('Speech recognition error:', event.error);
//   };

//   // Start or stop listening for speech
//   const toggleListening = () => {
//     if (isListening) {
//       recognition.stop();
//     } else {
//       recognition.start();
//     }
//     setIsListening(!isListening);
//   };

//   return (
//     <div>
//       <button onClick={toggleListening}>
//         {isListening ? 'Stop Listening' : 'Start Listening'}
//       </button>
//       <p>{transcription}</p>
//     </div>
//   );
// };

// export default SpeechToText;

////////////////////////////////////////////////////////////\
/* 
import React, { useState, useEffect } from 'react';
import './module.style.css';

const SpeechToText = () => {
  const [transcription, setTranscription] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const recognition = new window.webkitSpeechRecognition();
  const synthesis = window.speechSynthesis;

  useEffect(() => {
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US'; // Set the default language

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };
  }, []);

  
  recognition.onresult = (event) => {
    let interimTranscription = '';
    let finalTranscription = '';

    for (let i = event.resultIndex; i < event.results.length; i++) {
      const { transcript, isFinal } = event.results[i][0];

      if (isFinal) {
        finalTranscription += transcript + ' ';
      } else {
        interimTranscription += transcript;
      }
    }

    setTranscription(finalTranscription + interimTranscription);
  };


  const speakText = () => {
    if (synthesis.speaking) {
      synthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(transcription);
    utterance.lang = recognition.lang;

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    synthesis.speak(utterance);
  };

 
  const clearText = () => {
    setTranscription('');
  };

  const stopSpeaking = () => {
    synthesis.cancel();
  };


  const toggleListening = () => {
    if (isListening) {
      recognition.stop();
    } else {
      setTranscription('');
      recognition.start();
    }
  };

  const handleVoiceSelection = (event) => {
    const selectedVoiceURI = event.target.value;
    const voices = synthesis.getVoices();
    const selectedVoice = voices.find((voice) => voice.voiceURI === selectedVoiceURI);
    setSelectedVoice(selectedVoice);
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Speech to Text</h1>
      </div>
      <div className="controls">
        <button className="button" onClick={toggleListening}>
          {isListening ? 'Stop Listening' : 'Start Listening'}
        </button>
        <button className="button" onClick={clearText}>
          Clear Text
        </button>
        <button className="button" onClick={stopSpeaking}>
          Stop Speaking
        </button>
        <select className="select" onChange={handleVoiceSelection}>
          <option value="">Select Voice</option>
          {synthesis.getVoices().map((voice) => (
            <option key={voice.voiceURI} value={voice.voiceURI}>
              {voice.name}
            </option>
          ))}
        </select>
      </div>
      <div className="text-area">
        <textarea
          className="text-input"
          value={transcription}
          onChange={(e) => setTranscription(e.target.value)}
          placeholder="Transcribed text will appear here..."
          readOnly
        />
      </div>
      <div className="footer">
        <button className="button speak-button" onClick={speakText}>
          Speak Text
        </button>
      </div>
    </div>
  );
};

export default SpeechToText;
 */

/////////////////////////////////////////////////

import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useClipboard from 'react-use-clipboard';
import './SpeechToText.css'; // Import the CSS file for styling

const SpeechToText = () => {
  const [textToCopy, setTextToCopy] = useState('');
  const [isCopied, setCopied] = useClipboard(textToCopy, {
    successDuration: 1000,
  });

  const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
  const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      setTextToCopy(transcript);
    }
  }, [transcript]);

  if (!browserSupportsSpeechRecognition) {
    return <div>Speech recognition is not supported in this browser.</div>;
  }

  return (
    <div className="container">
      <h2>Speech to Text Converter</h2>
      <br />
      <h2>Your text is below. You can copy the text.</h2>

      <div className="main-content" onClick={setCopied}>
        {transcript}
      </div>

      <div className="btn-style">
        <button onClick={setCopied}>{isCopied ? 'Copied!' : 'Copy to clipboard'}</button>
        <button onClick={startListening}>Start Listening</button>
        <button onClick={SpeechRecognition.stopListening}>Stop Listening</button>
      </div>
    </div>
  );
};

export default SpeechToText;

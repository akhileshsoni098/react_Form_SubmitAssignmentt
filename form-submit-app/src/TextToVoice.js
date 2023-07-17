
// working code 

/* import React, { useState, useEffect } from 'react';
import styles from './TextToVoice.module.css';

const TextToVoice = () => {
  const [text, setText] = useState('');
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState('');

  useEffect(() => {
    const fetchVoices = () => {
      const synth = window.speechSynthesis;
      const availableVoices = synth.getVoices();
      setVoices(availableVoices);

      const hindiVoices = availableVoices.filter((voice) => voice.lang === 'hi-IN');
      setSelectedVoice(hindiVoices[0]?.name || '');
    };

    window.speechSynthesis.addEventListener('voiceschanged', fetchVoices);

    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', fetchVoices);
    };
  }, []);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleVoiceChange = (event) => {
    setSelectedVoice(event.target.value);
  };

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(text);
    const selectedVoiceObj = voices.find((voice) => voice.name === selectedVoice);
    if (selectedVoiceObj) {
      utterance.voice = selectedVoiceObj;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className={styles.container}>
      <textarea className={styles.textArea} value={text} onChange={handleTextChange} />
      <select className={styles.voiceSelect} value={selectedVoice} onChange={handleVoiceChange}>
        {voices.map((voice) => (
          <option key={voice.name} value={voice.name}>
            {voice.name}
          </option>
        ))}
      </select>
      <button className={styles.speakButton} onClick={handleSpeak}>Speak</button>
    </div>
  );
};

export default TextToVoice;

 */
 
import React, { useState, useEffect, useRef } from 'react';
import { saveAs } from 'file-saver';
import styles from './TextToVoice.module.css';
const TextToVoice = () => {
  const [text, setText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState('');
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState('');
  const synth = window.speechSynthesis;
  const mediaRecorderRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const fetchVoices = () => {
      const synth = window.speechSynthesis;
      const availableVoices = synth.getVoices();
      setVoices(availableVoices);

      const defaultVoice = availableVoices.find(voice => voice.lang === 'en-US');
      setSelectedVoice(defaultVoice ? defaultVoice.name : '');
    };

    synth.addEventListener('voiceschanged', fetchVoices);

    return () => {
      synth.removeEventListener('voiceschanged', fetchVoices);
    };
  }, []);

  const handleInputChange = (event) => {
    setText(event.target.value);
  };

  const handleVoiceChange = (event) => {
    setSelectedVoice(event.target.value);
  };

  const handleSpeak = () => {
    if (synth.speaking) {
      synth.cancel();
      setIsSpeaking(false);
      stopRecording();
    } else {
      startRecording();
      const utterance = new SpeechSynthesisUtterance(text);
      const selectedVoiceObj = voices.find(voice => voice.name === selectedVoice);
      if (selectedVoiceObj) {
        utterance.voice = selectedVoiceObj;
      }
      synth.speak(utterance);
      setIsSpeaking(true);

      utterance.onend = () => {
        setIsSpeaking(false);
        stopRecording();
      };
    }
  };

  const startRecording = () => {
    setIsRecording(true);
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        const audioChunks = [];

        mediaRecorder.addEventListener('dataavailable', (event) => {
          audioChunks.push(event.data);
        });

        mediaRecorder.addEventListener('stop', () => {
          const audioBlob = new Blob(audioChunks);
          const audioURL = URL.createObjectURL(audioBlob);
          setAudioURL(audioURL);
        });

        mediaRecorder.start();
      })
      .catch((error) => {
        console.error('Error accessing microphone:', error);
        setIsRecording(false);
      });
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach((track) => {
        track.stop();
      });
      setIsRecording(false);
    }
  };

  const handleDownload = () => {
    if (audioURL) {
      fetch(audioURL)
        .then((response) => response.blob())
        .then((blob) => {
          saveAs(blob, 'recorded_audio.mp3');
        })
        .catch((error) => {
          console.error('Error downloading audio:', error);
        });
    }
  };

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  return (
  /*   <div>
      <textarea value={text} onChange={handleInputChange} />
      <select value={selectedVoice} onChange={handleVoiceChange}>
        {voices.map((voice) => (
          <option key={voice.name} value={voice.name}>
            {voice.name}
          </option>
        ))}
      </select>
      <button onClick={handleSpeak} disabled={!text || isRecording}>
        {isSpeaking ? 'Stop Speaking' : 'Speak'}
      </button>
      {audioURL && (
        <div>
          <button onClick={handlePlay} disabled={isRecording}>
            Play
          </button>
          <button onClick={handleDownload} disabled={isRecording}>
            Download
          </button>
          <audio ref={audioRef} src={audioURL} controls />
        </div>
      )}
    </div> */


    <div className={styles.container}>
    <textarea className={styles.textArea} value={text} onChange={handleInputChange} />
    <select className={styles.voiceSelect} value={selectedVoice} onChange={handleVoiceChange}>
      {voices.map((voice) => (
        <option key={voice.name} value={voice.name}>
          {voice.name}
        </option>
      ))}
    </select>
    <button className={styles.speakButton} onClick={handleSpeak} disabled={!text || isRecording}>
      {isSpeaking ? 'Stop Speaking' : 'Speak'}
    </button>
    {audioURL && (
      <div className={styles.audioControls}>
        <button onClick={handlePlay} disabled={isRecording}>
          Play
        </button>
        <button onClick={handleDownload} disabled={isRecording}>
          Download
        </button>
        <audio className={styles.audioPlayer} ref={audioRef} src={audioURL} controls />
      </div>
    )}
  </div>
);
};

export default TextToVoice;

 
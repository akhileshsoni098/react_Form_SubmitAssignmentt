import React, { useState, useEffect } from 'react';
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

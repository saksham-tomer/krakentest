// hooks/useVoiceRecording.js
import { useState, useRef } from 'react';

export function useVoiceRecording() {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      audioChunks.current = [];

      mediaRecorder.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.current.push(event.data);
        }
      };

      mediaRecorder.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopAndProcess = () => {
    return new Promise((resolve) => {
      if (mediaRecorder.current && isRecording) {
        mediaRecorder.current.onstop = async () => {
          const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' });
          const formData = new FormData();
          formData.append('audio', audioBlob, 'recording.webm');

          try {
            const response = await fetch('/api/speech-to-text', {
              method: 'POST', 
              body: formData,
            });

            if (!response.ok) throw new Error('Failed to convert speech to text');
            
            const data = await response.json();
            resolve(data.text);
          } catch (error) {
            console.error('Error converting speech to text:', error);
            resolve(null);
          }

          // Stop all audio tracks
          mediaRecorder.current.stream.getTracks().forEach(track => track.stop());
        };

        mediaRecorder.current.stop();
        setIsRecording(false);
      } else {
        resolve(null);
      }
    });
  };

  const stopAndDiscard = () => {
    if (mediaRecorder.current && isRecording) {
      // Stop recording without processing audio
      mediaRecorder.current.stream.getTracks().forEach(track => track.stop());
      mediaRecorder.current.stop();
      setIsRecording(false);
      audioChunks.current = []; // Clear recorded chunks
    }
  };

  return {
    isRecording,
    startRecording,
    stopAndProcess,
    stopAndDiscard
  };
}
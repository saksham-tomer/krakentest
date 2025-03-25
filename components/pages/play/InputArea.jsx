"use client"

import { useState, useRef, useEffect } from 'react';
import { FiSend } from 'react-icons/fi';
import { IoAttachOutline } from 'react-icons/io5'; // Icon for attachment
import { useVoiceRecording } from '@/hooks/useVoiceRecording';
import useAxiosWithAuth from "@/hooks/useAxiosWithAuth";
import { toast } from "react-toastify";
import { useUser } from '@/contexts/UserContext';

export default function InputArea({ onSendMessage }) {
  const { axiosInstance, loading, error } = useAxiosWithAuth();
  const { getProfile } = useUser();


  const [message, setMessage] = useState('');
  const textareaRef = useRef(null)

  const { isRecording, startRecording, stopAndProcess, stopAndDiscard } = useVoiceRecording();
  const [isVoiceProcessing, setIsVoiceProcessing] = useState(false);

  // Add this function to handle voice input
  const handleVoiceInput = async () => {
    if (isRecording) {
      try {
        const response = await axiosInstance.post(process.env.NEXT_PUBLIC_BACKEND_URL+'/points/deduct', {
          action: 'stt'
        });

        if (!response.data) {
          toast.error('Failed to process voice input');
          setIsVoiceProcessing(false);
          stopAndDiscard()
          return;
        }

      } catch (error) {
        console.error('Error deducting points:', error);
        toast.error(error.response?.data?.message || 'Failed to process voice input');
        setIsVoiceProcessing(false);
        stopAndDiscard()
          return;
      }
      getProfile(); // update game points

      setIsVoiceProcessing(true)
      const text = await stopAndProcess();
      if (text) {
        // Handle the transcribed text - you'll need to implement this
        // based on how you want to send messages in your chat
        onSendMessage(text);
        setIsVoiceProcessing(false)
      }
    } else {
      await startRecording();
    }
  };



  ;

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = '90px'; // Reset height
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [message]);

  const handleSend = () => {
    if (message.trim() === '') return;

    onSendMessage(message);
    setMessage('');
  };

  return (
    <div className="relative b-2 w-full bg-background px-4 pb-4 md:pb-6 mx-auto md:max-w-4xl">
      <textarea
        ref={textareaRef}
        className="dark:text-white w-[85%] md:w-full border border-input px-3 py-2 ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[24px] max-h-[calc(75vh)] overflow-hidden resize-none rounded-xl text-base bg-muted dark:bg-jacarta-700"
        placeholder="Send your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={3}
        spellCheck={false}
        style={{ height: '90px' }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault(); // Prevent newline
            handleSend();
          }
        }}
      />
      <button
        className={`absolute bottom-8 md:bottom-10 right-6 rounded-full p-1.5 ${
          message.trim() === '' ? 'cursor-not-allowed opacity-50' : 'bg-primary text-primary-foreground hover:bg-primary/90'
        }`}
        onClick={handleSend}
        disabled={message.trim() === ''}
      >
        <FiSend size={20} />
      </button>

      <button 
        onClick={handleVoiceInput}
        className="absolute md:bottom-10 md:right-14 right-6 bottom-20 inline-flex items-center gap-2 justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground py-1 px-2 h-fit text-muted-foreground !pointer-events-auto dark:text-[#999] hover:text-white dark:hover:text-white"
      >
        {
          isVoiceProcessing ? (
            // Processing icon (spinner)
            <svg 
              className="animate-spin" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24"
            >
              <circle 
                className="opacity-25" 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="currentColor" 
                strokeWidth="4"
              ></circle>
              <path 
                className="opacity-75" 
                fill="currentColor" 
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ):(
            <svg 
            height="16" 
            width="16" 
            viewBox="0 0 16 16" 
            style={{ color: isRecording ? 'red' : 'currentColor' }}
          >
            {isRecording ? (
              // Recording stop icon
              <path 
                fillRule="evenodd" 
                clipRule="evenodd" 
                d="M4 4H12V12H4V4ZM3 4C3 3.44772 3.44772 3 4 3H12C12.5523 3 13 3.44772 13 4V12C13 12.5523 12.5523 13 12 13H4C3.44772 13 3 12.5523 3 12V4Z" 
                fill="currentColor"
              />
            ) : (
              // Microphone icon
              <path 
                fillRule="evenodd" 
                clipRule="evenodd" 
                d="M8 1C6.89543 1 6 1.89543 6 3V8C6 9.10457 6.89543 10 8 10C9.10457 10 10 9.10457 10 8V3C10 1.89543 9.10457 1 8 1ZM4 7V8C4 10.2091 5.79086 12 8 12C10.2091 12 12 10.2091 12 8V7H13V8C13 10.7614 10.7614 13 8 13C5.23858 13 3 10.7614 3 8V7H4ZM8 14C7.44772 14 7 14.4477 7 15C7 15.5523 7.44772 16 8 16C8.55228 16 9 15.5523 9 15C9 14.4477 8.55228 14 8 14Z"
                fill="currentColor"
              />
            )}
          </svg>
          )
        }
       
      </button>
      {/* <button
        className="absolute bottom-10 right-16 rounded-full p-1.5 border border-input bg-background hover:bg-accent hover:text-accent-foreground"
      >
        <IoAttachOutline size={14} />
      </button> */}
    </div>
  );
}

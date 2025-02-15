'use client';

import React, { useState, KeyboardEvent } from 'react';
import { useChat } from '@/contexts/ChatContext';

const ChatInput: React.FC = () => {
  const [input, setInput] = useState('');
  const { sendMessage, messages } = useChat();
  
  const isDisabled = messages.length > 0 && 
    messages[messages.length - 1].role === 'assistant' && 
    (messages[messages.length - 1].status === 'thinking' || 
     messages[messages.length - 1].status === 'typing');

  const handleSubmit = async () => {
    if (input.trim() && !isDisabled) {
      const userMessage = input.trim();
      setInput('');
      await sendMessage(userMessage);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="p-4 border-t border-theme-border-secondary bg-[#111827] dark:bg-[#0F1629]">
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={isDisabled ? "AI is responding..." : "Type a message..."}
          disabled={isDisabled}
          className="flex-1 p-2.5 rounded-lg
                     bg-[#1F2937] dark:bg-[#1A1F2E]
                     border border-theme-border-secondary
                     text-white
                     placeholder:text-gray-400
                     focus:outline-none focus:ring-2 focus:ring-theme-button-primary/20
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transition-all duration-200"
        />
        <button
          onClick={handleSubmit}
          disabled={isDisabled || !input.trim()}
          className="p-2.5 rounded-lg
                     bg-[#1F2937] dark:bg-[#1A1F2E]
                     border border-theme-border-secondary
                     text-gray-400 hover:text-white
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transition-all duration-200
                     focus:outline-none focus:ring-2 focus:ring-theme-button-primary/20"
        >
          <svg 
            className="w-5 h-5"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M13 5l7 7-7 7M5 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useChat } from '@/contexts/ChatContext';
import ChatInput from './ChatInput';
import { Message, ChatContext } from '@/hooks/useNebula';
import { ContextSelector } from './ContextSelector';
import CloseIcon from '@mui/icons-material/Close';

const ChatWindow: React.FC = () => {
  const { isOpen, toggleChat, messages } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [context, setContext] = useState<ChatContext>({});

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const ThinkingDots: React.FC = () => (
    <span className="inline-flex items-center">
      <span className="animate-pulse">.</span>
      <span className="animate-pulse" style={{ animationDelay: '200ms' }}>.</span>
      <span className="animate-pulse" style={{ animationDelay: '400ms' }}>.</span>
    </span>
  );

  const renderMessageContent = (message: Message) => {
    if (message.status === 'thinking') {
      return (
        <span className="flex items-center space-x-2">
          <svg className="animate-spin h-4 w-4 text-theme-text-accent" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Thinking</span>
        </span>
      );
    }

    if (message.status === 'typing') {
      return (
        <span className="flex items-center space-x-2">
          <svg className="animate-pulse h-4 w-4 text-theme-text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span>Typing <ThinkingDots/></span>
        </span>
      );
    }
    return message.content;
  };

  return (
    <div className="fixed bottom-24 right-6 w-[400px] h-[600px] 
                    bg-[#1F2937] dark:bg-[#111827]
                    border border-theme-border-primary
                    rounded-xl shadow-xl flex flex-col z-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 
                      border-b border-theme-border-secondary
                      bg-[#111827] dark:bg-[#0F1629] rounded-t-xl">
        <div className="flex items-center space-x-3">
          <div className="w-2 h-2 bg-theme-button-primary rounded-full animate-pulse"></div>
          <h3 className="text-lg font-bold text-theme-text-primary">
            Code Assistant
          </h3>
        </div>
        <div className="flex items-center space-x-2">
          <ContextSelector 
            context={context} 
            setContext={(newContext: ChatContext) => setContext(newContext)} 
          />
          <button
            onClick={toggleChat}
            className="p-2 rounded-lg text-theme-text-accent 
                       hover:text-theme-text-primary
                       hover:bg-theme-background-accent
                       transition-all duration-200"
            aria-label="Close chat"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      {/* Welcome Message */}
      {messages.length === 0 && (
        <div className="p-4 text-theme-text-accent text-sm bg-[#111827] dark:bg-[#0F1629]">
          <p className="mb-2">👋 Hello! I can help you with:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Understanding the challenge requirements</li>
            <li>Debugging your code</li>
            <li>Optimizing your solution</li>
            <li>Explaining concepts and best practices</li>
          </ul>
        </div>
      )}
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-[#111827] dark:bg-[#0F1629]">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] p-3 rounded-lg ${
                message.role === 'user'
                  ? 'bg-theme-button-primary/20 text-theme-text-primary ml-8'
                  : 'bg-[#1F2937] dark:bg-[#1A1F2E] text-theme-text-primary mr-8'
              }`}
            >
              {renderMessageContent(message)}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <ChatInput />
    </div>
  );
};

export default ChatWindow;
'use client';

import { useEffect, useState, useRef } from 'react';
import { useNebula } from '@/hooks/useNebula';
import { motion } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Check, ContentCopy } from '@mui/icons-material';
import { useState as useHookState } from 'react';
import { Rock_Salt } from 'next/font/google';
import { ThinkingDots } from '@/components/nebula_chat/ChatWindow';


const brushFont = Rock_Salt({
  weight: '400',
  subsets: ['latin'],
});

interface SubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  description: string;
  constraints: string;
  submittedCode: string;
}

export default function SubmissionModal({
  isOpen,
  onClose,
  description,
  constraints,
  submittedCode
}: SubmissionModalProps) {
  const { messages, sendMessage, clearMessages } = useNebula();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);
  const [copied, setCopied] = useHookState(false);

  useEffect(() => {
    if (isOpen) {
      clearMessages();
      setShowSuggestions(false);
      setProgress(0);
      progressRef.current = 0;
      const prompt = `With the following problem statement: ${description} ... 
      and constraints:${constraints} ... 
      as context, does the following code: ${submittedCode} ... 
      successfully solve the problem? 
      If yes, return "Code Successful" for your first message followed by 
      "Potential improvements..." for your second message. 
      If no, return "Incorrect" for your first message followed by "Potential Improvements" for your second message 
      that uses as much of the submitted code as possible in order to solve the problem in a simple and concise way. 
      Add comments to help the user understand key concepts.`;
      console.log('Sending prompt:', prompt);
      sendMessage(prompt);
    }
    return () => {
      clearMessages();
      setProgress(0);
      progressRef.current = 0;
    };
  }, [isOpen, description, constraints, submittedCode]);

  // Track presence events and update progress
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    
    if (!lastMessage) return;

    // Only update progress if new value is higher than current
    const updateProgress = (newValue: number) => {
      if (newValue > progressRef.current) {
        progressRef.current = newValue;
        setProgress(newValue);
      }
    };

    if (lastMessage.status === 'thinking') {
      updateProgress(20);
    }

    // Check for presence events in the message
    if (lastMessage.presenceData) {
      const data = lastMessage.presenceData;
      
      if (data.includes('Thinking')) {
        updateProgress(40);
      } else if (data.includes('Performing function execution')) {
        updateProgress(60);
      } else if (data.includes('Completed function execution')) {
        updateProgress(80);
      }
    }

    if (lastMessage.status === 'typing') {
      updateProgress(90);
    }
    
    if (lastMessage.status === 'complete') {
      updateProgress(100);
    }
  }, [messages]);

  // Handle smooth progress during delta streaming
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    
    if (lastMessage?.status === 'typing' && progress >= 90 && progress < 100) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 99.5) return prev;
          const increment = (99.5 - prev) * 0.1;
          return Math.min(prev + increment, 99.5);
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [messages, progress]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(codeBlock);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  const isThinking = messages.length === 0 || messages[messages.length - 1].status === 'thinking';
  const isSuccess = messages.some(msg => 
    msg.role === 'assistant' && 
    msg.status === 'complete' && 
    msg.content.includes('Code Successful')
  );

  // Get the completed messages
  const completedMessages = messages.filter(msg => 
    msg.role === 'assistant' && 
    msg.status === 'complete'
  );

  const firstResponse = completedMessages[0];
  const codeSuggestion = completedMessages.length > 0 ? 
    completedMessages[completedMessages.length - 1].content : '';
    
  const codeBlock = codeSuggestion?.match(/```[\s\S]*?\n([\s\S]*?)```/)?.[1] || '';

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-2xl bg-theme-panel-bg border border-slate-800 rounded-2xl shadow-2xl relative"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-theme-text-accent hover:text-theme-text-primary hover:bg-theme-bg-accent/10 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-6 md:p-8">
          {(isThinking || messages[messages.length - 1]?.status === 'typing') ? (
            <div className="flex flex-col items-center gap-6 py-12">
              <h2 className={`text-2xl md:text-3xl font-bold text-theme-text-primary text-center `}>
                Analyzing your code<ThinkingDots />
              </h2>
              
              <div className="w-full max-w-md h-2 bg-theme-bg-accent/20 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-theme-button-primary"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Enhanced Result Display */}
              {firstResponse && (
                <motion.div 
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className={`p-8 rounded-2xl text-center relative overflow-hidden ${
                    isSuccess 
                      ? 'green-500/20   text-green-400'
                      : 'red-500/20   text-red-400'
                  }`}
                >
                  <div className="relative z-10">
                    <h2 className={`text-4xl font-bold mb-2 py-4 ${brushFont.className} ${
                      !isSuccess && 'text-red-400'
                    }`}>
                      {isSuccess ? 'Correct!' : 'Incorrect'}
                    </h2>
                    <hr className="border-theme-border-primary py-4"></hr>
                   
                    <p className={`text-sm font-bold${isSuccess ? 'text-green-400' : 'text-red-400'}`}>
                      {isSuccess 
                        ? "Great job! You've solved this challenge. On to the next one!" 
                        : "Not quite! Check out the suggested solution below."}
                    </p>
                  </div>
                </motion.div>
              )}
              
              {/* Code Suggestions Button */}
              {!isSuccess && codeBlock && !showSuggestions && (
                <div className="flex justify-center">
                  <motion.button
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    onClick={() => setShowSuggestions(true)}
                    className="px-6 py-3 rounded-xl bg-theme-button-primary hover:bg-theme-button-hover text-theme-text-primary transition-colors"
                  >
                    Show Suggestions
                  </motion.button>
                </div>
              )}

              {/* Enhanced Code Suggestions Display */}
              {showSuggestions && codeBlock && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl overflow-hidden border border-theme-border-primary bg-theme-panel-bg"
                >
                  <div className="bg-theme-bg-accent/10 p-4 flex justify-between items-center border-b border-theme-border-primary">
                    <h3 className="text-xl font-semibold text-theme-text-primary">
                      Suggested Solution
                    </h3>
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-theme-bg-accent/20 hover:bg-theme-bg-accent/30 text-theme-text-primary transition-colors"
                    >
                      {copied ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <ContentCopy className="w-4 h-4" />
                      )}
                      <span className="text-sm">{copied ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                  <div className="max-h-[400px] overflow-auto custom-scrollbar">
                    <SyntaxHighlighter
                      language="solidity"
                      style={vscDarkPlus}
                      customStyle={{
                        margin: 0,
                        padding: '1.5rem',
                        background: 'transparent',
                        fontSize: '0.9rem',
                      }}
                      className="text-sm"
                    >
                      {codeBlock}
                    </SyntaxHighlighter>
                  </div>
                </motion.div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 pt-4">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-lg bg-theme-bg-accent/20 text-theme-text-primary hover:bg-theme-bg-accent/30 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
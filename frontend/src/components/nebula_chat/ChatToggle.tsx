'use client';

import { useChat } from '@/contexts/ChatContext';
import ChatWindow from './ChatWindow';
import { usePathname } from 'next/navigation';
import PsychologyIcon from '@mui/icons-material/Psychology';

export function ChatToggle() {
  const { toggleChat } = useChat();
  const pathname = usePathname();

  // Hide on landing page
  if (pathname === '/') return null;

  return (
    <div className="relative">
      <button
        onClick={toggleChat}
        type="button"
        aria-label="Toggle chat"
        className="fixed bottom-6 right-6 p-4 
                  rounded-full z-50
                  bg-theme-button-primary hover:bg-theme-button-hover
                  transition-all duration-200
                  cursor-pointer
                  shadow-lg shadow-black/25 
                  hover:shadow-black/35
                  hover:scale-105"
      >
        <PsychologyIcon className="w-6 h-6 text-white" />
      </button>
      <ChatWindow />
    </div>
  );
}
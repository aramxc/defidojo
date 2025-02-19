import { useState, useCallback, useRef } from 'react';
import { nebulaApi } from '../api/nebula';

export interface Message {
    role: 'user' | 'assistant';
    content: string;
    status: 'thinking' | 'typing' | 'complete';
    presenceData?: string;
}

export interface ChatContext {
    chainIds?: string[] | null;
    walletAddress?: string | null;
}

export interface UseNebulaReturn {
    messages: Message[];
    sendMessage: (message: string) => Promise<void>;
    clearMessages: () => void;
    context: ChatContext;
    setContext: (context: ChatContext) => void;
}

export const useNebula = (): UseNebulaReturn => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [context, setContext] = useState<ChatContext>({});
    const contentRef = useRef('');

    const sendMessage = useCallback(async (message: string) => {
        contentRef.current = '';
        
        setMessages(prev => [...prev, {
            role: 'user',
            content: message,
            status: 'complete'
        }]);

        setMessages(prev => [...prev, {
            role: 'assistant',
            content: '',
            status: 'thinking'
        }]);

        try {
            await nebulaApi.streamChat(
                message,
                (deltaText: string) => {
                    contentRef.current += deltaText;
                    setMessages(prev => {
                        const newMessages = [...prev];
                        const lastMessage = newMessages[newMessages.length - 1];
                        if (lastMessage?.role === 'assistant') {
                            lastMessage.status = 'typing';
                            lastMessage.content = contentRef.current;
                        }
                        return newMessages;
                    });
                },
                (presenceData: string) => {
                    console.log('Presence update:', presenceData);
                    setMessages(prev => {
                        const newMessages = [...prev];
                        const lastMessage = newMessages[newMessages.length - 1];
                        if (lastMessage?.role === 'assistant') {
                            lastMessage.presenceData = presenceData;
                        }
                        return newMessages;
                    });
                },
                () => {
                    setMessages(prev => prev.map(msg => 
                        msg.status === 'typing' 
                            ? { ...msg, status: 'complete' }
                            : msg
                    ));
                },
                (error: Error) => {
                    console.error('Stream error:', error);
                    contentRef.current = '';
                },
                Object.keys(context).length > 0 ? context : undefined
            );
        } catch (error) {
            console.error('Error in sendMessage:', error);
            contentRef.current = '';
        }
    }, [context]);

    const clearMessages = useCallback(() => {
        setMessages([]);
        contentRef.current = '';
    }, []);

    return {
        messages,
        sendMessage,
        clearMessages,
        context,
        setContext
    };
};
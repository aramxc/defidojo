export const nebulaApi = {
    streamChat: async (
        message: string,
        onDelta: (text: string) => void,
        onPresence: (data: string) => void,
        onComplete: () => void,
        onError: (error: Error) => void,
        context?: {
            chainIds?: string[] | null;
            walletAddress?: string | null;
        }
    ) => {
        try {
            const response = await fetch('https://nebula-api.thirdweb.com/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-client-id': `${process.env.NEXT_PUBLIC_NEBULA_CLIENT_ID}`,
                    'x-secret-key': `${process.env.NEXT_PUBLIC_NEBULA_SECRET_KEY}`,
                },
                body: JSON.stringify({ 
                    message,
                    user_id: 'default-user',
                    stream: true,
                    context
                })
            });

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorData}`);
            }

            if (!response.body) {
                throw new Error('No response body received');
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const text = decoder.decode(value);
                text.split('\n').forEach(line => {
                    if (line.startsWith('data: ')) {
                        try {
                            const data = JSON.parse(line.slice(6));
                            if ('v' in data) {
                                onDelta(data.v);
                            } else if (data.type === 'presence') {
                                onPresence(data.data);
                            }
                        } catch (error) {
                            console.warn('Failed to parse SSE data:', error);
                        }
                    }
                });
            }

            onComplete();
        } catch (error) {
            console.error('Nebula API Error:', error);
            onError(error instanceof Error ? error : new Error('Unknown error'));
        }
    }
};
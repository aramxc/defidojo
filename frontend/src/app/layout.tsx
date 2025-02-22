'use client';

import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ChatProvider } from '@/contexts/ChatContext';
import { ChatToggle } from '@/components/nebula_chat/ChatToggle';
import { createConfig, WagmiProvider } from 'wagmi';
import { hardhat } from 'viem/chains';
import { http } from 'viem';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { WalletProvider } from "@/web3/contexts/WalletContext";

const inter = Inter({ subsets: ["latin"] });

const wagmiConfig = createConfig({
  chains: [hardhat],
  transports: {
    [hardhat.id]: http()
  }
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());
  const [mounted, setMounted] = useState(false);

  // Ensure we only render after hydration
  useState(() => {
    setMounted(true);
  });

  return (
    <html lang="en">
      <body className={inter.className}>
        <WagmiProvider config={wagmiConfig}>
          <QueryClientProvider client={queryClient}>
            <WalletProvider>
              <ThemeProvider>
                <ChatProvider>
                  {mounted ? children : null}
                  <ChatToggle />
                </ChatProvider>
              </ThemeProvider>
            </WalletProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}

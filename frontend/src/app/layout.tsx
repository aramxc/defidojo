import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ChatProvider } from '@/contexts/ChatContext';
import { ChatToggle } from '@/components/nebula_chat/ChatToggle';

const inter = Inter({ subsets: ["latin"] });



export const metadata: Metadata = {
  title: "DeFi Dojo - Coding Challenges",
  description: "Learn DeFi development through interactive coding challenges",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <ChatProvider>
            {children}
            <ChatToggle />
          </ChatProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

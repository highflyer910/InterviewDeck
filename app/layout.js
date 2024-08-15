import { Inter } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs'
import { Analytics } from "@vercel/analytics/react"
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Interview Deck",
  description: "Ace Your Tech Interviews",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Analytics />
        <ClerkProvider>
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}

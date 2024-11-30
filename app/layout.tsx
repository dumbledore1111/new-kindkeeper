import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Load Geist fonts locally
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: 'swap', // Better font loading
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: 'swap',
});

// Enhanced metadata
export const metadata: Metadata = {
  title: 'KindKeeper - Voice Powered Personal Finance',
  description: 'A voice powered personal finance app for seniors',
  keywords: ['personal finance', 'voice assistant', 'senior friendly', 'expense tracking'],
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#FF9800" />
      </head>
      <body 
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-black`}
      >
        {/* Accessibility skip link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 
            bg-orange-500 text-white px-4 py-2 rounded-md"
        >
          Skip to main content
        </a>

        <main id="main-content">
          {children}
        </main>
      </body>
    </html>
  );
}
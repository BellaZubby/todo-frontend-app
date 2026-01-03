import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeToggle from "./components/ThemeToggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI-Powered Sprint Dashboard",
  description: "Track tasks, analyze workload, and focus your next hour.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground font-sans`}
      >
       
        <div className="min-h-screen flex flex-col">
           {/* HEADER */}
          {/* <header className="border-b border-gray-200"> */}
          <header className="bg-slate-900 text-white fixed top-0 left-0 w-full shadow z-50">
            <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
              <h1 className="text-xl font-semibold">Sprint Dashboard</h1>
              <ThemeToggle/>
            </div>
          </header>

          {/* MAIN CONTENT */}
          <main className="flex-1 pt-16">
            <div className="max-w-3xl mx-auto px-4 py-6">{children}</div>
          </main>

          {/* FOOTER */}
          <footer className="bg-black text-white text-center">
            <div className="px-4 py-3 text-sm">
              Powered by Bella ❤️
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}

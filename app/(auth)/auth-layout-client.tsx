"use client";

import Link from "next/link";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { ArrowLeft } from "lucide-react";

export default function AuthLayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-svh w-full flex-col items-center justify-center overflow-hidden bg-background px-4 py-12 transition-colors duration-300 auth-page-container">
      {/* Blurred Hero Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat filter blur-[12px] scale-[1.05] pointer-events-none opacity-80" 
        style={{ backgroundImage: "url('/hero.png')" }} 
      />
      
      {/* Dynamic Theme color overlay */}
      <div className="absolute inset-0 z-0 bg-background/80 dark:bg-background/85 transition-colors duration-300 pointer-events-none" />

      {/* Premium Background Grid */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,rgba(128,128,128,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.06)_1px,transparent_1px)] bg-[size:32px_32px] opacity-70 dark:opacity-30 pointer-events-none" />

      {/* Floating Animated Orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute -top-1/4 -left-1/4 w-[70%] h-[70%] rounded-full bg-radial from-[#c41e3a]/15 to-transparent blur-[120px] dark:from-[#c41e3a]/8" 
          style={{
            animation: "pulse-slow 8s ease-in-out infinite alternate"
          }}
        />
        <div 
          className="absolute -bottom-1/4 -right-1/4 w-[70%] h-[70%] rounded-full bg-radial from-[#3a3530]/20 to-transparent blur-[120px] dark:from-[#3a3530]/10" 
          style={{
            animation: "pulse-slower 12s ease-in-out infinite alternate"
          }}
        />
        <div 
          className="absolute top-1/4 right-1/4 w-[40%] h-[40%] rounded-full bg-radial from-[#c41e3a]/5 to-transparent blur-[100px] dark:from-[#c41e3a]/2" 
          style={{
            animation: "float-slow 15s ease-in-out infinite"
          }}
        />
      </div>

      {/* Embedded CSS Animations & Theme Variables */}
      <style jsx global>{`
        .auth-page-container {
          --background: #f5f1eb;
          --foreground: #0c0a09;
          --card: #f5f1eb;
          --card-foreground: #0c0a09;
          --popover: #f5f1eb;
          --popover-foreground: #0c0a09;
          --primary: #c41e3a;
          --primary-foreground: #f5f1eb;
          --secondary: #c5bfb8;
          --secondary-foreground: #0c0a09;
          --accent: #eae5dd;
          --accent-foreground: #0c0a09;
          --muted: #c5bfb8;
          --muted-foreground: #78726a;
          --border: rgba(197, 191, 184, 0.4);
          --input: rgba(197, 191, 184, 0.6);
          --ring: #c41e3a;
          
          background-color: var(--background);
          color: var(--foreground);
        }

        .dark .auth-page-container {
          --background: #0c0a09;
          --foreground: #f5f1eb;
          --card: #0c0a09;
          --card-foreground: #f5f1eb;
          --popover: #0c0a09;
          --popover-foreground: #f5f1eb;
          --primary: #c41e3a;
          --primary-foreground: #f5f1eb;
          --secondary: #3a3530;
          --secondary-foreground: #f5f1eb;
          --accent: #24201c;
          --accent-foreground: #f5f1eb;
          --muted: #3a3530;
          --muted-foreground: #b8b2ab;
          --border: rgba(58, 53, 48, 0.4);
          --input: rgba(58, 53, 48, 0.6);
          --ring: #c41e3a;
        }

        @keyframes pulse-slow {
          0% { transform: scale(1) translate(0px, 0px); opacity: 0.8; }
          100% { transform: scale(1.1) translate(20px, -20px); opacity: 1; }
        }
        @keyframes pulse-slower {
          0% { transform: scale(1) translate(0px, 0px); opacity: 0.7; }
          100% { transform: scale(1.15) translate(-30px, 30px); opacity: 0.9; }
        }
        @keyframes float-slow {
          0% { transform: translate(0px, 0px) rotate(0deg); }
          50% { transform: translate(30px, 40px) rotate(180deg); }
          100% { transform: translate(0px, 0px) rotate(360deg); }
        }
      `}</style>

      {/* Top Header Controls */}
      <header className="absolute top-0 left-0 right-0 z-10 flex w-full justify-between items-center px-6 py-4 md:px-8">
        <Link 
          href="/" 
          className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors py-1.5 px-3 rounded-full hover:bg-muted/40 border border-transparent hover:border-border/30"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          <span>Back to Locus</span>
        </Link>

        <div className="flex items-center justify-center rounded-full border border-border/30 bg-background/50 p-1 backdrop-blur-xs">
          <ModeToggle />
        </div>
      </header>

      {/* Content Container */}
      <main className="relative z-10 w-full max-w-md animate-fade-in duration-500">
        {children}
      </main>
    </div>
  );
}

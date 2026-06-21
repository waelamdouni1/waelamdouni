"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Phone, Video, Info, PlusCircle, Image as ImageIcon, Mic, Smile, ThumbsUp, Send } from "lucide-react";
import { siteConfig } from "@/data/site";

// Typing indicator component
function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 py-1 px-2" aria-label="Typing">
      <motion.span
        className="size-2 rounded-full bg-current opacity-70"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0 }}
      />
      <motion.span
        className="size-2 rounded-full bg-current opacity-70"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0.15 }}
      />
      <motion.span
        className="size-2 rounded-full bg-current opacity-70"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
      />
    </div>
  );
}

export function ChatWidget() {
  const [step, setStep] = useState(0); // 0: Recruiter typing, 1: Recruiter message + Wael typing, 2: All messages shown
  const [message, setMessage] = useState("");

  useEffect(() => {
    // 0 -> 1 after 0.8s (Recruiter typing duration)
    const timer1 = setTimeout(() => {
      setStep(1);
    }, 800);

    // 1 -> 2 after another 1.0s (Wael typing duration)
    const timer2 = setTimeout(() => {
      setStep(2);
    }, 1800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // Open default mail client
    window.location.href = `mailto:${siteConfig.email}?subject=Project Inquiry / Hello&body=${encodeURIComponent(message)}`;
    setMessage("");
  };

  return (
    <div className="relative w-full max-w-[400px] md:max-w-[430px] rounded-3xl border border-white/10 bg-[#0f0f11]/85 backdrop-blur-xl shadow-premium-lg overflow-hidden flex flex-col select-none">
      {/* Glow Effect */}
      <div className="absolute -top-12 -left-12 size-40 bg-primary/10 rounded-full blur-2xl pointer-events-none" />

      {/* Messenger Header */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/5 bg-[#141416]/60 px-4.5 py-3.5">
        <div className="flex items-center gap-3">
          {/* Recruiter Avatar */}
          <div className="relative size-10 rounded-full bg-gradient-to-tr from-zinc-700 to-zinc-500 border border-white/10 flex items-center justify-center text-white text-sm font-semibold shadow-inner">
            R
            {/* Green active badge */}
            <span className="absolute bottom-0 right-0 size-3 rounded-full bg-emerald-500 ring-2 ring-[#0f0f11]" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground tracking-tight leading-none">
              Recruiter
            </h4>
            <span className="text-[10px] font-normal text-muted-foreground/80 mt-1 block">
              Active now
            </span>
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-3 text-muted-foreground">
          <Phone className="size-4.5 opacity-70 hover:opacity-100 hover:text-white transition-opacity cursor-pointer" />
          <Video className="size-4.5 opacity-70 hover:opacity-100 hover:text-white transition-opacity cursor-pointer" />
          <Info className="size-4.5 opacity-70 hover:opacity-100 hover:text-white transition-opacity cursor-pointer" />
        </div>
      </div>

      {/* Conversation Area */}
      <div className="relative z-10 flex-1 px-4.5 py-6 flex flex-col gap-5 min-h-[250px] justify-end overflow-y-auto">
        <AnimatePresence mode="popLayout">
          {/* 1. Recruiter Message Bubble or Typing Indicator */}
          {step === 0 ? (
            <motion.div
              key="recruiter-typing"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="flex items-end gap-2.5"
            >
              <div className="size-8 rounded-full bg-zinc-700/80 flex items-center justify-center text-white text-xs font-medium">
                R
              </div>
              <div className="bg-[#28282e]/90 border border-white/5 text-zinc-100 px-4 py-2.5 rounded-2xl rounded-bl-sm text-xs leading-relaxed max-w-[82%]">
                <TypingIndicator />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="recruiter-message"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-end gap-2.5"
            >
              <div className="size-8 shrink-0 rounded-full bg-zinc-700 border border-white/5 flex items-center justify-center text-white text-xs font-medium shadow-sm">
                R
              </div>
              <div className="bg-[#28282e]/90 border border-white/5 text-zinc-100 px-4.5 py-3 rounded-2xl rounded-bl-sm text-sm sm:text-[15px] font-medium leading-relaxed max-w-[82%] shadow-sm">
                Hi Wael, can I see your work?
              </div>
            </motion.div>
          )}

          {/* 2. Wael Reply Bubble or Typing Indicator */}
          {step === 1 && (
            <motion.div
              key="wael-typing"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="flex items-end gap-2.5 self-end ml-auto flex-row-reverse"
            >
              {/* Wael Avatar */}
              <div className="relative size-8 shrink-0 rounded-full border border-white/10 overflow-hidden bg-white/10 shadow-sm">
                <Image
                  src={siteConfig.avatar}
                  alt={siteConfig.name}
                  width={32}
                  height={32}
                  className="size-full object-cover"
                  unoptimized
                />
              </div>
              <div className="bg-primary text-white px-4 py-2.5 rounded-2xl rounded-br-sm text-xs leading-relaxed max-w-[82%]">
                <TypingIndicator />
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="wael-message"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-end gap-2.5 self-end ml-auto max-w-[85%] flex-row-reverse"
            >
              {/* Wael Avatar */}
              <div className="relative size-8 shrink-0 rounded-full border border-white/10 overflow-hidden bg-white/10 shadow-sm">
                <Image
                  src={siteConfig.avatar}
                  alt={siteConfig.name}
                  width={32}
                  height={32}
                  className="size-full object-cover"
                  unoptimized
                />
              </div>
              <div className="flex flex-col gap-1.5 items-end w-full">
                <a
                  href="#work"
                  className="block bg-primary text-white px-4.5 py-3 rounded-2xl rounded-br-sm text-sm sm:text-[15px] font-medium leading-relaxed shadow-premium-lg text-left transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] hover:bg-primary/95 border border-white/10 group"
                  data-cursor="pointer"
                  title="Click to view projects"
                >
                  Absolutely. Click the <span className="underline font-bold text-white group-hover:text-white/90">&quot;View Projects&quot;</span> button{" "}
                  <span className="hidden lg:inline font-bold animate-pulse">to your left 👈</span>
                  <span className="lg:hidden font-bold animate-pulse">above 👆</span> or scroll down to explore my work!
                </a>
                {/* Subtle delivered state checkmark indicator */}
                <span className="text-[9px] text-muted-foreground/60 mr-1 mt-0.5">
                  Delivered
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Messenger Input Form - Pulling Double Duty */}
      <form
        onSubmit={handleSubmit}
        className="relative z-10 border-t border-white/5 bg-[#141416]/50 px-4 py-3 flex items-center gap-3 w-full"
      >
        <div className="flex items-center gap-2.5 text-muted-foreground/80 shrink-0">
          <PlusCircle className="size-5 hover:text-white transition-colors cursor-pointer" />
          <ImageIcon className="size-5 hover:text-white transition-colors cursor-pointer" />
          <Mic className="size-5 hover:text-white transition-colors cursor-pointer" />
        </div>

        {/* Input Box */}
        <div className="flex-1 bg-white/[0.06] border border-white/5 rounded-full px-4 py-2 flex items-center justify-between">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message to Wael..."
            className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none px-1"
          />
          <Smile className="size-4.5 text-muted-foreground/80 hover:text-white transition-colors cursor-pointer shrink-0 ml-1.5" />
        </div>

        {/* Send Button */}
        <button
          type="submit"
          className="text-primary hover:scale-105 active:scale-95 transition-transform cursor-pointer focus:outline-none shrink-0"
          aria-label="Send message"
        >
          {message.trim() ? (
            <Send className="size-5" />
          ) : (
            <ThumbsUp className="size-5 fill-current" />
          )}
        </button>
      </form>
    </div>
  );
}

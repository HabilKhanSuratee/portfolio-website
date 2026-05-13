import React, { useState, useEffect } from 'react';
import { ChevronRight, Download } from 'lucide-react';
import { motion } from 'motion/react';
import { FONTS } from '../../constants/theme';
import { PixelImageRenderer } from './PixelImageRenderer';

const ScrambleText = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState(text.replace(/[a-zA-Z0-9,]/g, '_'));

  useEffect(() => {
    const chars = '!<>-_\\\\/[]{}—=+*^?#';
    let iteration = 0;

    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayText(
          text
            .split('')
            .map((letter, index) => {
              if (letter === ' ') return ' ';
              if (index < iteration) return text[index];
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('')
        );
        if (iteration >= text.length) clearInterval(interval);
        iteration += 1 / 3;
      }, 40);
      return () => clearInterval(interval);
    }, 600);

    return () => clearTimeout(timeout);
  }, [text]);

  return <>{displayText}</>;
};

export const HeroSection: React.FC = () => (
  <section id="about" className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="flex-1 space-y-6"
    >
      <div className="inline-block px-3 py-1 bg-[#00ff41]/20 border border-[#00ff41] text-[#00ff41] text-xl uppercase mb-2 shadow-[0_0_10px_rgba(0,255,65,0.5)] animate-blink">
        Status: Online
      </div>

      <div
        className="text-3xl md:text-5xl text-[#00ff41] font-bold flex items-center flex-wrap gap-2 min-h-[3rem] md:min-h-[4rem] mb-2"
        style={FONTS.code}
      >
        <span className="text-[#ff00ff]">&gt;</span>
        <ScrambleText text="Hi, I am Habil" />
        <span className="inline-block w-4 md:w-6 h-8 md:h-12 bg-[#00ff41] animate-pulse ml-1" />
      </div>

      <h1 style={FONTS.title} className="text-3xl md:text-5xl lg:text-6xl text-white glitch leading-tight" data-text="SOFTWARE ENGINEER">
        SOFTWARE ENGINEER
      </h1>
      <h2 style={FONTS.title} className="text-xl md:text-2xl text-[#ff00ff] mt-2 mb-8">
        &gt; AI CONSULTANT & BUILDER
      </h2>

      <p className="text-2xl md:text-3xl max-w-2xl text-gray-300 leading-relaxed">
        Building real-world AI applications and computer vision systems,
        Turning complex problem into simple solutions 
      </p>

      <div className="pt-6 flex gap-4">
        <a
          href="#projects"
          className="px-6 py-3 bg-[#00ff41] text-black text-2xl font-bold uppercase hover:bg-white transition-colors flex items-center gap-2"
          style={FONTS.title}
        >
          INIT_PROJECTS <ChevronRight className="w-6 h-6" />
        </a>
        <a
          href="#contact"
          className="px-6 py-3 border-2 border-[#00ff41] text-[#00ff41] text-2xl font-bold uppercase hover:bg-[#00ff41]/20 transition-colors"
          style={FONTS.title}
        >
          COMMS
        </a>
      </div>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex-shrink-0 relative flex flex-col items-center gap-4"
    >
      <div className="w-64 h-64 md:w-80 md:h-80 pixel-border bg-[#111] flex items-center justify-center relative overflow-hidden group">
        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none z-10 opacity-50" />

        <div className="absolute top-2 left-2 flex gap-1 z-20 pointer-events-none">
          <div className="w-3 h-3 bg-red-500" />
          <div className="w-3 h-3 bg-yellow-500" />
          <div className="w-3 h-3 bg-green-500" />
        </div>

        <PixelImageRenderer />

        <div className="absolute bottom-2 right-2 text-sm text-[#00ff41]/50 z-20 pointer-events-none" style={FONTS.code}>
          ID_0x7F8
        </div>
      </div>

      <a
        href="/cv.pdf"
        download="Habil_Khan_CV.pdf"
        className="w-full py-3 border-2 border-[#00ff41] text-[#00ff41] hover:bg-[#00ff41] hover:text-black transition-colors flex items-center justify-center gap-2"
        style={FONTS.title}
      >
        <Download className="w-5 h-5" />
        <span className="text-sm">PULL_CV.PDF</span>
      </a>
    </motion.div>
  </section>
);

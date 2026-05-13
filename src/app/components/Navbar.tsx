import React from 'react';
import { Terminal } from 'lucide-react';
import { FONTS } from '../../constants/theme';

interface NavbarProps {
  time: string;
}

export const Navbar: React.FC<NavbarProps> = ({ time }) => (
  <nav className="fixed top-0 w-full z-40 bg-black/80 border-b border-[#00ff41] backdrop-blur-sm">
    <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center text-xl sm:text-2xl">
      <div className="flex items-center gap-2">
        <Terminal className="w-6 h-6 text-[#ff00ff]" />
        <span style={FONTS.title} className="text-sm md:text-base text-white">
          HABIL<span className="text-[#ff00ff]">.EXE</span>
        </span>
      </div>
      <div className="hidden md:flex gap-6 text-[#00ffff] hover:text-[#00ff41]">
        <a href="#about"          className="hover:text-[#00ff41] transition-colors">[ ABOUT ]</a>
        <a href="#disciplines" className="hover:text-[#ff00ff] transition-colors">[ DISCIPLINES ]</a>
        <a href="#skills"         className="hover:text-[#00ff41] transition-colors">[ SKILLS ]</a>
        <a href="#projects"       className="hover:text-[#00ffff] transition-colors">[ ARCHIVE ]</a>
      </div>
      <div className="text-sm" style={FONTS.code}>
        {time} <span className="text-[#ff00ff] animate-pulse">_</span>
      </div>
    </div>
  </nav>
);

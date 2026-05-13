import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { FONTS } from '../../constants/theme';

export const ContactSection: React.FC = () => (
  <section id="contact" className="py-20 border-t-4 border-[#00ff41] mt-20 text-center">
    <h2 style={FONTS.title} className="text-base md:text-5xl text-white mb-8">ESTABLISH_CONNECTION</h2>
    <p className="text-2xl text-gray-400 max-w-2xl mx-auto mb-12">
      My inbox is open for new opportunities, consultancy queries, or collaborations on building
      the next generation of AI systems.
    </p>

    <div className="flex justify-center gap-6 mb-12">
      <a href="https://github.com/HabilKhanSuratee" target="_blank" rel="noopener noreferrer" className="p-4 border-2 border-[#00ff41] text-[#00ff41] hover:bg-[#00ff41] hover:text-black transition-all group relative">
        <Github className="w-8 h-8" />
        <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black border border-[#00ff41] text-[#00ff41] px-2 py-1 text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap" style={FONTS.code}>
          // github
        </span>
      </a>
      <a href="https://www.linkedin.com/in/habil-khan-suratee/" target="_blank" rel="noopener noreferrer" className="p-4 border-2 border-[#00ffff] text-[#00ffff] hover:bg-[#00ffff] hover:text-black transition-all group relative">
        <Linkedin className="w-8 h-8" />
        <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black border border-[#00ffff] text-[#00ffff] px-2 py-1 text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap" style={FONTS.code}>
          // linkedin
        </span>
      </a>
      <a href="https://mail.google.com/mail/?view=cm&to=habilkhansuratee@gmail.com" target="_blank" rel="noopener noreferrer" className="p-4 border-2 border-[#ff00ff] text-[#ff00ff] hover:bg-[#ff00ff] hover:text-black transition-all group relative">
        <Mail className="w-8 h-8" />
        <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black border border-[#ff00ff] text-[#ff00ff] px-2 py-1 text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap" style={FONTS.code}>
          // email
        </span>
      </a>
    </div>

    <div className="text-sm text-gray-600" style={FONTS.code}>
      © 2026 // BUILT_WITH_REACT // CONNECTION_SECURE
    </div>
  </section>
);

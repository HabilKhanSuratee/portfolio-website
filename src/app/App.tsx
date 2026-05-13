import React, { useState, useEffect } from 'react';
import { Cpu } from 'lucide-react';
import '../styles/cyberpunk.css';
import { TerminalDrawer } from './components/TerminalDrawer';
import { BootScreen } from './components/BootScreen';
import { SkillBars } from './components/SkillBars';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CapabilitySection } from './components/CapabilitySection';
import { ProjectsSection } from './components/ProjectsSection';
import { ContactSection } from './components/ContactSection';
import { FONTS } from '../constants/theme';
import { TIMING } from '../constants/timing';

export default function App() {
  const [time, setTime] = useState('');
  const [bootDone, setBootDone] = useState<boolean>(() => {
    try {
      if (localStorage.getItem('show_boot') === '1') {
        localStorage.removeItem('show_boot');
        return false;
      }
    } catch {}
    return true;
  });

  const handleBootComplete = () => setBootDone(true);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const h  = now.getHours().toString().padStart(2, '0');
      const m  = now.getMinutes().toString().padStart(2, '0');
      const s  = now.getSeconds().toString().padStart(2, '0');
      const ms = now.getMilliseconds().toString().padStart(3, '0');
      setTime(`${h}:${m}:${s}.${ms}`);
    };
    updateTime();
    const timer = setInterval(updateTime, TIMING.TIME_UPDATE_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="min-h-screen bg-[#050505] text-[#00ff41] overflow-x-hidden crt relative selection:bg-[#ff00ff] selection:text-black pb-20"
      style={FONTS.body}
    >
      {!bootDone && <BootScreen onComplete={handleBootComplete} />}

      <div className="fixed inset-0 pointer-events-none opacity-20 z-0 bg-[linear-gradient(transparent_95%,rgba(0,255,65,0.3)_100%),linear-gradient(90deg,transparent_95%,rgba(0,255,65,0.3)_100%)] bg-[length:40px_40px]" />

      <TerminalDrawer />
      <Navbar time={time} />

      <main className="max-w-6xl mx-auto px-4 pt-32 relative z-10 space-y-32">
        <HeroSection />

        <CapabilitySection />

        <section id="skills" className="space-y-12">
          <div className="flex items-center gap-4 border-b-2 border-[#00ff41] pb-4">
            <Cpu className="w-10 h-10 text-[#00ff41]" />
            <h2 style={FONTS.title} className="text-base md:text-4xl text-white uppercase">TECH_STACK</h2>
          </div>
          <SkillBars />
        </section>

        <ProjectsSection />

        <ContactSection />
      </main>
    </div>
  );
}

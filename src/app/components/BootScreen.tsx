import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'motion/react';
import { FONTS } from '../../constants/theme';
import { TIMING } from '../../constants/timing';

interface BootScreenProps {
  onComplete: () => void;
}

type LineColor = 'green' | 'cyan' | 'magenta' | 'white' | 'gray' | 'red' | 'yellow';

interface BootLine {
  text: string;
  delay: number;
  color?: LineColor;
  isBanner?: boolean;
}

const LINES: BootLine[] = [
  { text: '▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓', delay: 0,   color: 'green' },
  { text: '  CYBER_BIOS  v2.077  [ NEUROHACK SYSTEMS INC. ]',        delay: 40,  color: 'white', isBanner: true },
  { text: '  (C) 2077 Ghost Protocol Ltd.  All Rights Reserved.',    delay: 40,  color: 'gray' },
  { text: '▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓', delay: 40,  color: 'green' },
  { text: '', delay: 80 },
  { text: 'Performing Power-On Self Test (POST)...',                 delay: 100, color: 'gray' },
  { text: '', delay: 30 },
  { text: '[CPU ] Ghost-X Core i64 @ 6.66 GHz .............. OK',   delay: 140, color: 'green' },
  { text: '[RAM ] 65,536 TB NEON-DDR7 ECC ................... OK',   delay: 110, color: 'green' },
  { text: '[GPU ] CUDA_GHOST 999Ti // 128 GB VRAM ........... OK',   delay: 100, color: 'green' },
  { text: '[DISK] /dev/ghost0 // 512 PB NVMe .......... MOUNTED',    delay: 120, color: 'green' },
  { text: '[NET ] Interface eth0 // ENCRYPTED ........... ONLINE',   delay: 130, color: 'cyan' },
  { text: '[USB ] 12x Neural-USB 5.0 Controllers ........... OK',   delay: 90,  color: 'green' },
  { text: '', delay: 70 },
  { text: 'Loading CyberOS v2.077-ROGUE...',                         delay: 150, color: 'white' },
  { text: 'Installing kernel modules:',                              delay: 80,  color: 'gray' },
  { text: '  neural_net.ko ............................. LOADED',     delay: 90,  color: 'green' },
  { text: '  ghost_protocol.ko ......................... LOADED',     delay: 75,  color: 'green' },
  { text: '  dark_net_bridge.ko ........................ LOADED',     delay: 75,  color: 'green' },
  { text: '', delay: 60 },
  { text: 'Starting system services:',                               delay: 120, color: 'gray' },
  { text: '  [ networking  ] .......................... STARTED',     delay: 90,  color: 'cyan' },
  { text: '  [ encryption  ] .......................... STARTED',     delay: 70,  color: 'cyan' },
  { text: '  [ ai_daemon   ] .......................... STARTED',     delay: 70,  color: 'magenta' },
  { text: '', delay: 60 },
];

const colorMap: Record<LineColor, string> = {
  green:   'text-[#00ff41]',
  cyan:    'text-[#00ffff]',
  magenta: 'text-[#ff00ff]',
  white:   'text-white',
  gray:    'text-gray-500',
  red:     'text-red-400',
  yellow:  'text-yellow-400',
};

const BAR_CHARS = 40;

export const BootScreen: React.FC<BootScreenProps> = ({ onComplete }) => {
  const [visibleCount, setVisibleCount] = useState(0);
  const [progress, setProgress]         = useState(0);
  const [phase, setPhase]               = useState<'lines' | 'loading' | 'ready' | 'exiting'>('lines');
  const [cursorOn, setCursorOn]         = useState(true);
  const [isExiting, setIsExiting]       = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const doExit = useCallback(() => {
    if (isExiting) return;
    setIsExiting(true);
    setPhase('exiting');
    setTimeout(onComplete, TIMING.BOOT_EXIT_MS);
  }, [isExiting, onComplete]);

  useEffect(() => {
    const t = setInterval(() => setCursorOn(p => !p), TIMING.CURSOR_BLINK_MS);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'instant' as ScrollBehavior });
  }, [visibleCount, progress, phase]);

  useEffect(() => {
    if (phase !== 'lines') return;
    if (visibleCount >= LINES.length) { setPhase('loading'); return; }
    const t = setTimeout(() => setVisibleCount(n => n + 1), LINES[visibleCount].delay);
    return () => clearTimeout(t);
  }, [visibleCount, phase]);

  useEffect(() => {
    if (phase !== 'loading') return;
    if (progress >= 100) {
      const t = setTimeout(() => setPhase('ready'), 350);
      return () => clearTimeout(t);
    }
    const increment = Math.floor(Math.random() * 5) + 2;
    const t = setTimeout(() => setProgress(p => Math.min(p + increment, 100)), TIMING.PROGRESS_STEP_MS);
    return () => clearTimeout(t);
  }, [progress, phase]);

  useEffect(() => {
    if (phase !== 'ready') return;
    const t = setTimeout(doExit, TIMING.READY_STATE_MS);
    return () => clearTimeout(t);
  }, [phase, doExit]);

  useEffect(() => {
    const handler = () => { if (!isExiting) doExit(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isExiting, doExit]);

  const filled = Math.round((progress / 100) * BAR_CHARS);
  const empty  = BAR_CHARS - filled;

  return (
    <motion.div
      className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center cursor-pointer select-none overflow-hidden"
      animate={{ opacity: isExiting ? 0 : 1, filter: isExiting ? 'brightness(4)' : 'brightness(1)' }}
      transition={{ duration: 0.5, ease: 'easeIn' }}
      onClick={doExit}
      style={FONTS.code}
    >
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.3)_50%)] bg-[length:100%_3px] opacity-30 z-10" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_60%,rgba(0,0,0,0.7)_100%)] z-10" />

      <div
        className="relative z-20 w-full max-w-xl lg:max-w-2xl px-6 overflow-y-auto"
        style={{ maxHeight: '85vh', scrollbarWidth: 'none' }}
      >
        {LINES.slice(0, visibleCount).map((line, i) => (
          <div
            key={i}
            className={`whitespace-pre leading-relaxed text-xs sm:text-sm ${
              line.color ? colorMap[line.color] : 'text-[#00ff41]'
            } ${line.isBanner ? 'tracking-widest' : ''}`}
            style={line.isBanner ? FONTS.title : undefined}
          >
            {line.text === '' ? ' ' : line.text}
          </div>
        ))}

        {(phase === 'loading' || phase === 'ready' || phase === 'exiting') && (
          <div className="text-[#00ff41] text-xs sm:text-sm whitespace-pre leading-relaxed">
            {'█'.repeat(filled)}{'░'.repeat(empty)} {String(progress).padStart(3, ' ')}%
          </div>
        )}

        {(phase === 'ready' || phase === 'exiting') && (
          <>
            <div className="text-[#00ff41] text-xs sm:text-sm whitespace-pre leading-relaxed">&nbsp;</div>
            <div className="text-white text-xs sm:text-sm leading-relaxed">SYSTEM BOOT COMPLETE</div>
            <div className="text-gray-600 text-xs sm:text-sm leading-relaxed">&nbsp;</div>
            <div className="text-[#00ffff] text-xs sm:text-sm leading-relaxed">Authenticating operator...</div>
            <div className="text-[#ff00ff] text-xs sm:text-sm leading-relaxed">CLEARANCE: LEVEL_5 // GRANTED</div>
            <div className="text-[#00ff41] text-xs sm:text-sm leading-relaxed">&gt; Launching PORTFOLIO...</div>
          </>
        )}

        {phase === 'lines' && visibleCount < LINES.length && (
          <div className="text-[#00ff41] text-xs sm:text-sm">{cursorOn ? '█' : ' '}</div>
        )}

        <div ref={bottomRef} />
      </div>

      {phase !== 'ready' && !isExiting && (
        <div className="absolute bottom-5 right-6 z-20 text-gray-700 text-xs" style={FONTS.code}>
          [ CLICK OR PRESS ANY KEY TO SKIP ]
        </div>
      )}

      {phase === 'ready' && (
        <div
          className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 text-xs"
          style={{ ...FONTS.code, color: cursorOn ? '#00ff41' : 'transparent' }}
        >
          [ PRESS ANY KEY TO CONTINUE ]
        </div>
      )}
    </motion.div>
  );
};

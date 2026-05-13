import React, { useState, useEffect, useRef, KeyboardEvent } from 'react';
import { Terminal, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { FONTS } from '../../constants/theme';
import { TERMINAL_PROJECTS, TERMINAL_SKILLS } from '../../constants/portfolio';
import { TIMING } from '../../constants/timing';

type LineType = 'input' | 'output' | 'error' | 'system';

interface Line {
  id: number;
  type: LineType;
  content: React.ReactNode;
}

let _id = 0;
const mkLine = (type: LineType, content: React.ReactNode): Line => ({ id: _id++, type, content });

const BOOT_LINES: Line[] = [
  mkLine('system', '██████████████████████████████████████████████'),
  mkLine('system', '  CyberOS 2.077 // TERMINAL INITIALIZED'),
  mkLine('system', '  Kernel: NEUROHACK_6.6.6 // Build: ROGUE'),
  mkLine('system', '██████████████████████████████████████████████'),
  mkLine('system', ''),
  mkLine('output', <span className="text-[#00ffff]">Type <span className="text-[#ff00ff]">help</span> to list available commands.</span>),
  mkLine('system', ''),
];

// --- output helpers ---

function helpOutput(): Line {
  return mkLine('output', (
    <div className="space-y-1 pl-2">
      <div className="text-[#ff00ff] mb-2">// AVAILABLE COMMANDS ──────────────</div>
      {([
        ['whoami',        'Display operator profile'],
        ['cd <path>',     'Change directory'],
        ['ls projects',   'List archived project files'],
        ['ls skills',     'List installed tech stack'],
        ['cat about.txt', 'Read the about file'],
        ['contact',       'Show contact channels'],
        ['date',          'Print current timestamp'],
        ['uname -a',      'Print system information'],
        ['ping',          'Test connection latency'],
        ['history',       'Show command history'],
        ['clear',         'Clear terminal output'],
        ['exit',          'Close terminal session'],
        ['reboot',        'Reboot the system'],
      ] as [string, string][]).map(([c, d]) => (
        <div key={c} className="flex gap-3 flex-wrap">
          <span className="text-[#00ff41] shrink-0" style={{ minWidth: '140px' }}>{c}</span>
          <span className="text-gray-500">// {d}</span>
        </div>
      ))}
    </div>
  ));
}

function whoamiOutput(): Line {
  return mkLine('output', (
    <div className="pl-2 space-y-0.5">
      <div className="text-[#ff00ff]">┌─[ USER_PROFILE ]──────────────────</div>
      <div>│  <span className="text-[#00ffff]">NAME     </span> Habil</div>
      <div>│  <span className="text-[#00ffff]">ROLE     </span> Software Engineer & AI Consultant</div>
      <div>│  <span className="text-[#00ffff]">STATUS   </span> <span className="text-[#00ff41]">ONLINE ●</span></div>
      <div>│  <span className="text-[#00ffff]">FOCUS    </span> Agentic systems · Computer Vision · Full-stack development</div>
      <div>│  <span className="text-[#00ffff]">CLEARANCE</span> LEVEL_5 <span className="text-gray-600">// CLASSIFIED</span></div>
      <div>│  <span className="text-[#00ffff]">LOCATION </span> Singapore / Indonesia </div>
      <div className="text-[#ff00ff]">└────────────────────────────────────</div>
    </div>
  ));
}

function lsProjectsOutput(): Line {
  return mkLine('output', (
    <div className="pl-2 space-y-1">
      <div className="text-gray-600 mb-1">total {TERMINAL_PROJECTS.length} entries // /home/habil/projects</div>
      {TERMINAL_PROJECTS.map(p => (
        <div key={p.name} className="flex gap-3 flex-wrap items-center">
          <span className="text-gray-600 shrink-0">drwxr-xr-x</span>
          <span style={{ color: p.color }} className="shrink-0">{p.name}</span>
          <span className="text-gray-500 text-xs">// {p.type}</span>
        </div>
      ))}
    </div>
  ));
}

function lsSkillsOutput(): Line {
  return mkLine('output', (
    <div className="pl-2">
      <div className="text-[#00ffff] mb-2">// TECH_STACK // /etc/skills.conf</div>
      <div className="flex flex-wrap gap-2">
        {TERMINAL_SKILLS.map(s => (
          <span key={s} className="text-[#00ff41] border border-[#00ff41]/40 px-2 py-0.5 text-xs">{s}</span>
        ))}
      </div>
    </div>
  ));
}

function aboutOutput(): Line {
  return mkLine('output', (
    <div className="pl-2 space-y-1">
      <div className="text-gray-600 mb-1">// about.txt — 1 file, 128 bytes</div>
      <p className="text-gray-300 max-w-lg leading-relaxed">
         Software engineer specialising in <span className="text-[#00ff41]">AI/ML</span>, <span className="text-[#ff+00ff]">
          computer vision</span>, and <span className="text-[#00ffff]">full-stack development</span>.
          I build end-to-end systems, from training YOLO models on drone imagery for public health detection,
          to engineering LSB steganography pipelines and deploying them via REST APIs.
        On the web side, I deliver production-ready TypeScript applications and am actively developing
       with the <span className="text-[#ff00ff]">Anthropic SDK</span> to build LLM-powered tools.
       I turn complex problems into clean, deployable solutions.
      </p>
    </div>
  ));
}

function contactOutput(): Line {
  return mkLine('output', (
    <div className="pl-2 space-y-1">
      <div className="text-[#ff00ff] mb-1">// CONTACT_CHANNELS ───────────────</div>
      <div><span className="text-[#00ffff]">GITHUB   </span>  <a href="https://github.com/HabilKhanSuratee" target="_blank" rel="noopener noreferrer" className="text-[#00ff41] hover:underline hover:text-white transition-colors">https://github.com/HabilKhanSuratee</a></div>
      <div><span className="text-[#00ffff]">LINKEDIN </span>  <a href="https://www.linkedin.com/in/habil-khan-suratee/" target="_blank" rel="noopener noreferrer" className="text-[#00ff41] hover:underline hover:text-white transition-colors">https://www.linkedin.com/in/habil-khan-suratee/</a></div>
      <div><span className="text-[#00ffff]">EMAIL    </span>  <a href="https://mail.google.com/mail/?view=cm&to=habilkhansuratee@gmail.com" target="_blank" rel="noopener noreferrer" className="text-[#00ff41] hover:underline hover:text-white transition-colors">habilkhansuratee@gmail.com</a></div>
      <div className="text-gray-600 mt-1">// Encryption: PGP recommended</div>
    </div>
  ));
}

function dateOutput(): Line {
  return mkLine('output', <span className="text-[#00ffff]">{new Date().toUTCString()}</span>);
}

function unameOutput(): Line {
  return mkLine('output', (
    <span className="text-[#00ff41]">
      CyberOS 2.077.1-ROGUE #1 SMP PREEMPT_DYNAMIC x86_GHOST
      Kernel: NEUROHACK_6.6.6 // Build: GHOST_PROTOCOL_v3
    </span>
  ));
}

function pingOutput(): Line[] {
  return [
    mkLine('output', <span className="text-[#00ffff]">PING 127.0.0.1 56 data bytes</span>),
    mkLine('output', <span className="text-[#00ff41]">64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.001ms</span>),
    mkLine('output', <span className="text-[#00ff41]">64 bytes from 127.0.0.1: icmp_seq=2 ttl=64 time=0.001ms</span>),
    mkLine('output', <span className="text-gray-500">--- 127.0.0.1 ping statistics: 2 transmitted, 2 received, 0% loss ---</span>),
  ];
}

function historyOutput(cmdHistory: string[]): Line {
  if (cmdHistory.length === 0) {
    return mkLine('output', <span className="text-gray-500">// no history recorded</span>);
  }
  return mkLine('output', (
    <div className="pl-2 space-y-0.5">
      {cmdHistory.map((h, i) => (
        <div key={i}>
          <span className="text-gray-600 inline-block w-8">{String(i + 1).padStart(3, ' ')}</span>
          <span className="text-[#00ff41]">{h}</span>
        </div>
      ))}
    </div>
  ));
}

function sudoRmOutput(): Line {
  return mkLine('error', (
    <span>
      <span className="text-red-400">⚠ CRITICAL:</span> sudo: Permission denied.
      That would have deleted the mainframe. Nice try, operator.
    </span>
  ));
}

function sudoHackOutput(): Line[] {
  return [
    mkLine('output', <span className="text-[#ff00ff]">INITIATING HACK SEQUENCE...</span>),
    mkLine('output', <span className="text-[#00ff41]">Bypassing firewall... <span className="text-yellow-400">████████████████ 100%</span></span>),
    mkLine('output', <span className="text-[#00ffff]">Access granted. <span className="text-[#ff00ff]">Welcome to the mainframe.</span></span>),
    mkLine('output', <span className="text-gray-600">// (jk — you just ran a portfolio command. But respect for trying.)</span>),
  ];
}

function matrixOutput(): Line {
  const rows = Array.from({ length: 4 }, () =>
    Array.from({ length: 55 }, () =>
      String.fromCharCode(0x30A0 + Math.floor(Math.random() * 96))
    ).join('')
  );
  return mkLine('output', (
    <div>
      {rows.map((r, i) => (
        <div key={i} className="text-[#00ff41] text-xs leading-tight opacity-80 font-mono overflow-hidden whitespace-nowrap">{r}</div>
      ))}
      <div className="text-[#ff00ff] mt-1 text-xs">// THERE IS NO SPOON</div>
    </div>
  ));
}

function cdOutput(path: string): Line {
  const p = path.trim();
  if (!p || p === '~' || p === '/home/habil') {
    return mkLine('output', <span className="text-[#00ffff]">// ~  /home/habil</span>);
  }
  if (p === '..') {
    return mkLine('output', <span className="text-[#00ffff]">// ~  /home</span>);
  }
  if (p === '/' || p.startsWith('/etc') || p.startsWith('/root') || p.startsWith('/sys')) {
    return mkLine('error', (
      <span>
        <span className="text-red-400">cd: {p}:</span> Permission denied.{' '}
        <span className="text-gray-600">// RESTRICTED ZONE</span>
      </span>
    ));
  }
  const resolved = p.startsWith('/') ? p : `/home/habil/${p}`;
  return mkLine('output', <span className="text-[#00ffff]">// ~  {resolved}</span>);
}

function lsRootOutput(): Line {
  return mkLine('output', (
    <div className="pl-2 space-y-0.5 text-xs">
      {['bin', 'boot', 'dev', 'etc', 'home', 'proc', 'root', 'sys', 'usr', 'var'].map(d => (
        <div key={d} className="flex gap-3">
          <span className="text-gray-600">drwxr-xr-x</span>
          <span className="text-[#00ffff]">{d}/</span>
        </div>
      ))}
      <div className="text-gray-600 mt-1">// root filesystem // ACCESS: RESTRICTED</div>
    </div>
  ));
}

// --- command dispatch table ---

type CmdFn = (history: string[]) => Line[] | 'clear' | 'exit' | 'reboot';

const COMMANDS: Record<string, CmdFn> = {
  help:              () => [helpOutput()],
  whoami:            () => [whoamiOutput()],
  ls:                () => [lsProjectsOutput()],
  'ls projects':     () => [lsProjectsOutput()],
  'ls -la':          () => [lsProjectsOutput()],
  'ls skills':       () => [lsSkillsOutput()],
  'cat about.txt':   () => [aboutOutput()],
  contact:           () => [contactOutput()],
  date:              () => [dateOutput()],
  'uname -a':        () => [unameOutput()],
  uname:             () => [unameOutput()],
  ping:              () => pingOutput(),
  history:           (h) => [historyOutput(h)],
  clear:             () => 'clear',
  exit:              () => 'exit',
  quit:              () => 'exit',
  reboot:            () => 'reboot',
  'reboot --force':  () => 'reboot',
  'sudo rm -rf /':   () => [sudoRmOutput()],
  'sudo rm -rf':     () => [sudoRmOutput()],
  'sudo rm -rf /*':  () => [sudoRmOutput()],
  'sudo hack':                     () => sudoHackOutput(),
  'sudo hack --target mainframe':  () => sudoHackOutput(),
  matrix:            () => [matrixOutput()],
  'ls -la /':        () => [lsRootOutput()],
  'ls /':            () => [lsRootOutput()],
};

const AUTOCOMPLETE_CANDIDATES = Object.keys(COMMANDS).filter(k =>
  !['sudo rm -rf /', 'sudo rm -rf', 'sudo rm -rf /*', 'sudo hack', 'sudo hack --target mainframe'].includes(k)
);

function buildResponse(cmd: string, cmdHistory: string[]): Line[] | 'clear' | 'exit' | 'reboot' {
  const raw   = cmd.trim();
  const lower = raw.toLowerCase();

  if (!raw) return [];

  if (lower.startsWith('cd')) {
    const path = raw.slice(2).trim();
    return [cdOutput(path)];
  }

  const handler = COMMANDS[lower];
  if (handler) return handler(cmdHistory);

  if (lower.startsWith('sudo')) {
    return [mkLine('error', (
      <span>
        sudo: <span className="text-red-400">Permission denied.</span> You are not in the sudoers file.{' '}
        <span className="text-gray-600">This incident has been logged.</span>
      </span>
    ))];
  }

  return [mkLine('error', (
    <span>
      bash: <span className="text-red-400">{raw}</span>: command not found{' '}
      <span className="text-gray-600">// Type "help" for available commands</span>
    </span>
  ))];
}

// --- component ---

export const TerminalDrawer: React.FC = () => {
  const [isOpen, setIsOpen]       = useState(false);
  const [lines, setLines]         = useState<Line[]>([...BOOT_LINES]);
  const [input, setInput]         = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx]     = useState(-1);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (e.key === '`' || e.key === '~') { e.preventDefault(); setIsOpen(prev => !prev); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) setIsOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => inputRef.current?.focus(), TIMING.CMD_FOCUS_MS);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const handleSubmit = () => {
    const raw = input;
    setInput('');
    setHistIdx(-1);

    const echoLine = mkLine('input', (
      <span>
        <span className="text-[#ff00ff]">habil@CyberOS</span>
        <span className="text-gray-600">:</span>
        <span className="text-[#00ffff]">~</span>
        <span className="text-gray-600">$</span>
        <span className="text-white ml-2">{raw}</span>
      </span>
    ));

    if (raw.trim()) setCmdHistory(prev => [...prev, raw.trim()]);

    const result = buildResponse(raw, cmdHistory);

    if (result === 'clear') {
      setLines([mkLine('system', '> TERMINAL CLEARED'), mkLine('system', '')]);
      return;
    }

    if (result === 'exit') {
      setLines(prev => [...prev, echoLine, mkLine('system', '> Goodbye, operator. Closing connection...')]);
      setTimeout(() => setIsOpen(false), TIMING.CMD_EXIT_CLOSE_MS);
      return;
    }

    if (result === 'reboot') {
      setLines(prev => [
        ...prev,
        echoLine,
        mkLine('system', '> Rebooting system...'),
        mkLine('output', <span className="text-[#ff00ff]">Clearing session cache... resetting boot flag...</span>),
      ]);
      setTimeout(() => {
        try { localStorage.removeItem('cyberboot_v1'); } catch {}
        window.location.reload();
      }, TIMING.REBOOT_DELAY_MS);
      return;
    }

    setLines(prev => [...prev, echoLine, ...result]);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const newIdx = Math.min(histIdx + 1, cmdHistory.length - 1);
      if (newIdx >= 0) { setHistIdx(newIdx); setInput(cmdHistory[cmdHistory.length - 1 - newIdx] ?? ''); }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const newIdx = histIdx - 1;
      if (newIdx < 0) { setHistIdx(-1); setInput(''); }
      else { setHistIdx(newIdx); setInput(cmdHistory[cmdHistory.length - 1 - newIdx] ?? ''); }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const match = AUTOCOMPLETE_CANDIDATES.find(c => c.startsWith(input.toLowerCase()) && c !== input.toLowerCase());
      if (match) setInput(match);
    }
  };

  const handleClear = () => {
    setLines([mkLine('system', '> TERMINAL CLEARED'), mkLine('system', '')]);
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            key="toggle-btn"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-black border-2 border-[#00ff41] text-[#00ff41] hover:bg-[#00ff41] hover:text-black transition-colors shadow-[0_0_20px_rgba(0,255,65,0.35)] group"
            style={FONTS.code}
            title="Open Terminal [~]"
          >
            <Terminal className="w-4 h-4" />
            <span className="text-xs hidden sm:inline">TERMINAL</span>
            <span className="text-xs text-[#00ff41]/50 group-hover:text-black/50 hidden sm:inline">[~]</span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="terminal-drawer"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 32, stiffness: 320 }}
            className="fixed bottom-0 left-0 right-0 z-50 flex flex-col bg-[#030303] border-t-2 border-[#00ff41] shadow-[0_-8px_40px_rgba(0,255,65,0.25)]"
            style={{ height: '52vh', minHeight: '300px', maxHeight: '600px', ...FONTS.code }}
          >
            <div className="flex items-center justify-between px-4 py-2 bg-black border-b border-[#00ff41]/20 shrink-0">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex items-center gap-2 text-[#00ff41] text-xs">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>habil@CyberOS — terminal</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleClear}
                  className="text-gray-600 hover:text-[#00ff41] transition-colors text-xs px-2 py-0.5 border border-transparent hover:border-[#00ff41]/30"
                >
                  [ CLEAR ]
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-600 hover:text-[#ff00ff] transition-colors p-0.5"
                  title="Close [Esc]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div
              className="flex-1 overflow-y-auto p-4 space-y-1 text-sm"
              style={{ scrollbarWidth: 'thin', scrollbarColor: '#00ff4140 transparent' }}
              onClick={() => inputRef.current?.focus()}
            >
              {lines.map(line => (
                <div
                  key={line.id}
                  className={
                    line.type === 'error'  ? 'text-red-400' :
                    line.type === 'system' ? 'text-gray-600' :
                    line.type === 'input'  ? 'text-gray-300' :
                    'text-[#00ff41]'
                  }
                >
                  {line.content}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            <div className="flex items-center gap-2 px-4 py-3 border-t border-[#00ff41]/20 bg-black shrink-0">
              <span className="text-[#ff00ff] shrink-0 text-sm select-none">habil@CyberOS</span>
              <span className="text-gray-600 text-sm select-none">:</span>
              <span className="text-[#00ffff] text-sm select-none">~</span>
              <span className="text-gray-600 text-sm select-none mr-1">$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent text-white text-sm outline-none caret-[#00ff41] placeholder-gray-700"
                placeholder="type a command…"
                spellCheck={false}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
              />
              <span className="w-[9px] h-[16px] bg-[#00ff41] animate-pulse shrink-0" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

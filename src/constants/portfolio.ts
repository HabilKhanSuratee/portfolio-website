export interface Skill {
  name: string;
  cat: string;
  pct: number;
  color: string;
  glow: string;
}

export const SKILLS: Skill[] = [
  { name: 'Python',     cat: 'Core',     pct: 95, color: '#00ff41', glow: 'rgba(0,255,65,0.5)'  },
  { name: 'TypeScript', cat: 'Core',     pct: 91, color: '#00ff41', glow: 'rgba(0,255,65,0.5)'  },
  { name: 'PyTorch',    cat: 'AI/ML',    pct: 88, color: '#ff00ff', glow: 'rgba(255,0,255,0.5)' },
  { name: 'TensorFlow', cat: 'AI/ML',    pct: 82, color: '#ff00ff', glow: 'rgba(255,0,255,0.5)' },
  { name: 'React/Next', cat: 'Frontend', pct: 90, color: '#00ffff', glow: 'rgba(0,255,255,0.5)' },
  { name: 'Node.js',    cat: 'Backend',  pct: 85, color: '#00ff41', glow: 'rgba(0,255,65,0.5)'  },
  { name: 'Docker/K8s', cat: 'DevOps',   pct: 80, color: '#ff00ff', glow: 'rgba(255,0,255,0.5)' },
  { name: 'CUDA',       cat: 'Compute',  pct: 76, color: '#00ffff', glow: 'rgba(0,255,255,0.5)' },
];

export const TERMINAL_PROJECTS = [
  { name: 'neuro-net-vis/',        type: 'AI Frontend',        color: '#00ffff' },
  { name: 'rogue-trading-bot-v2/', type: 'Autonomous Agent',   color: '#00ff41' },
  { name: 'synthdata-generator/',  type: 'Generative AI Tool', color: '#ff00ff' },
];

export const TERMINAL_SKILLS = [
  'Python', 'TypeScript', 'PyTorch', 'TensorFlow',
  'React/Next', 'Node.js', 'Docker/K8s', 'CUDA',
];

export const PROJECT_CARDS = [
  {
    title: 'Neuro-Net Vis Interface',
    type:  'AI Frontend',
    desc:  'A real-time WebGL visualization engine for large scale neural network activations. Built for AI researchers to map internal layer geometries.',
    tags:  ['React', 'Three.js', 'Python', 'WebSocket'],
    color: 'cyan',
  },
  {
    title: 'Rogue Trading Bot v2',
    type:  'Autonomous Agent',
    desc:  'Reinforcement learning agent optimized for high-frequency algorithmic trading in synthetic environments. Yields 22% better baseline returns.',
    tags:  ['PyTorch', 'Redis', 'C++', 'Docker'],
    color: 'green',
  },
  {
    title: 'SynthData Generator',
    type:  'Generative AI Tool',
    desc:  'Enterprise-grade synthetic data generation pipeline. Bypasses PII restrictions by training diffusion models on anonymized baseline datasets.',
    tags:  ['Python', 'HuggingFace', 'FastAPI'],
    color: 'magenta',
  },
];

export const projectBorderClass = (color: string): string =>
  ({ cyan: 'pixel-border-cyan', magenta: 'pixel-border-magenta' }[color] ?? 'pixel-border');

export const projectColorClass = (color: string): string =>
  ({
    cyan:    'border-[#00ffff] text-[#00ffff]',
    magenta: 'border-[#ff00ff] text-[#ff00ff]',
    green:   'border-[#00ff41] text-[#00ff41]',
  }[color] ?? 'border-[#00ff41] text-[#00ff41]');

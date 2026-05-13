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
    title: 'Aerial Mosquitto Breeding Ground Detection via YOLO',
    type:  'Computer Vision / ML',
    desc:  'Computer vision project detecting Mosquitto Breeding Ground (MBG) through drone imagery using YOLO object detection. Trained on aerial datasets to enable early-stage mosquitto linked disease control.',
    tags:  ['Python', 'YOLO', 'OpenCV', 'Drone Imagery', 'Object Detection', 'Geospatial Analysis', 'Public health'],
    color: 'green',
    url:   'https://github.com/HabilKhanSuratee/MBG_YOLO',
  },
  {
    title: 'Vector Space IR Engine',
    type:  'Information Retrieval',
    desc:  'Document retrieval engine built on the Vector Space Model with TF-IDF weighting and cosine similarity ranking. Supports full-text search across document corpora with ranked result output.',
    tags:  ['Python', 'TF-IDF', 'Cosine Similarity', 'NLP', 'Vector Space Model'],
    color: 'cyan',
    url:   'https://github.com/HabilKhanSuratee/vector-space-ir-engine',
  },
  
  {
    title: 'CV Steganography Engine',
    type:  'Computer Vision / Security',
    desc:  'Image watermarking tool combining SIFT keypoint detection with LSB steganography for invisible watermark embedding, extraction, and tamper detection. Served via a Flask API.',
    tags:  ['Python', 'OpenCV', 'SIFT', 'LSB Steganography', 'Flask', 'Watermarking', 'Image Forensics', 'GenAi detection'],
    color: 'magenta',
    url:   'https://github.com/HabilKhanSuratee/computer_vision_stenography',
  },
  {
    title: 'Clothing Manufacturer Portal',
    type:  'Full-Stack Web App',
    desc:  'B2B e-commerce platform tailored for clothing manufacturers. Features product catalogue management, bulk order workflows, and a responsive storefront built in TypeScript.',
    tags:  ['TypeScript', 'React', 'Node.js', 'E-Commerce', 'B2B'],
    color: 'green',
    url:   'https://habilkhansuratee.github.io/website-clothing/',
  },
];

export const projectBorderClass = (color: string): string =>
  ({ cyan: 'pixel-border-cyan', magenta: 'pixel-border-magenta', green: 'pixel-border' }[color] ?? 'pixel-border');

export const projectColorClass = (color: string): string =>
  ({
    cyan:    'border-[#00ffff] text-[#00ffff]',
    magenta: 'border-[#ff00ff] text-[#ff00ff]',
    green:   'border-[#00ff41] text-[#00ff41]',
  }[color] ?? 'border-[#00ff41] text-[#00ff41]');

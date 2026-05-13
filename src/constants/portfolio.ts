export interface Skill {
  name: string;
  cat: string;
  pct: number;
  color: string;
  glow: string;
}

export const SKILLS: Skill[] = [
  { name: 'Python',        cat: 'Core',     pct: 95, color: '#00ff41', glow: 'rgba(0,255,65,0.5)'  },
  { name: 'TypeScript',    cat: 'Core',     pct: 88, color: '#00ff41', glow: 'rgba(0,255,65,0.5)'  },
  { name: 'PyTorch',       cat: 'AI/ML',    pct: 85, color: '#ff00ff', glow: 'rgba(255,0,255,0.5)' },
  { name: 'OpenCV',        cat: 'CV',       pct: 83, color: '#00ff41', glow: 'rgba(0,255,65,0.5)'  },
  { name: 'React/Next',    cat: 'Frontend', pct: 61, color: '#00ffff', glow: 'rgba(0,255,255,0.5)' },
  { name: 'Flask',         cat: 'Backend',  pct: 66, color: '#00ff41', glow: 'rgba(0,255,65,0.5)'  },
  { name: 'pytest',        cat: 'Testing',  pct: 89, color: '#00ff41', glow: 'rgba(0,255,65,0.5)'  },
  { name: 'Anthropic SDK', cat: 'LLM',      pct: 47, color: '#ff00ff', glow: 'rgba(255,0,255,0.5)' },
  { name: 'Docker',        cat: 'DevOps',   pct: 50, color: '#ff00ff', glow: 'rgba(255,0,255,0.5)' }
];


export const TERMINAL_PROJECTS = [
  { name: 'MBG-YOLO/',                  type: 'Computer Vision',      color: '#00ff41' },
  { name: 'vector-space-ir-engine/',     type: 'Information Retrieval', color: '#00ffff' },
  { name: 'cv-steganography-engine/',    type: 'CV / Security',         color: '#ff00ff' },
  { name: 'clothing-manufacturer-portal/', type: 'Full-Stack Web App', color: '#00ff41' },
];

export const TERMINAL_SKILLS = [
  'Python', 'TypeScript', 'PyTorch', 'OpenCV',
  'React/Next', 'Flask', 'pytest', 'Anthropic SDK', 'Docker',
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

export interface CapabilityCard {
  title: string;
  iconKey: 'brain' | 'eye' | 'layers';
  color: 'green' | 'magenta' | 'cyan';
  desc: string;
  tags: string[];
}

export const CAPABILITY_CARDS: CapabilityCard[] = [
  {
    title:  'AI & Machine Learning',
    iconKey: 'brain',
    color:   'green',
    desc:    'Real-world model training and deployment, from YOLO-based aerial detection pipelines to TF-IDF ranked retrieval systems. Full lifecycle experience: dataset prep, training, evaluation, and inference.',
    tags:    ['YOLO', 'PyTorch', 'TensorFlow', 'Object Detection', 'Model Training'],
  },
  {
    title:  'Computer Vision',
    iconKey: 'eye',
    color:   'magenta',
    desc:    'Low-level image processing through to applied CV systems. Built SIFT keypoint detection, LSB steganography pipelines, and drone imagery classifiers, served via Flask REST APIs.',
    tags:    ['OpenCV', 'SIFT', 'Steganography', 'Image Processing', 'Flask'],
  },
  {
    title:  'Full-Stack Engineering',
    iconKey: 'layers',
    color:   'cyan',
    desc:    'End-to-end web application development, React/TypeScript frontends, Node.js backends, and REST APIs. Delivered a production B2B clothing portal with catalogue management and bulk-order workflows.',
    tags:    ['TypeScript', 'React', 'Node.js', 'REST APIs', 'Flask'],
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

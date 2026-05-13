import React from 'react';
import { Brain, Eye, Layers, Cpu } from 'lucide-react';
import { FONTS } from '../../constants/theme';
import { CAPABILITY_CARDS, CapabilityCard } from '../../constants/portfolio';

const ICON_MAP: Record<CapabilityCard['iconKey'], React.ReactNode> = {
  brain:  <Brain  className="w-10 h-10" />,
  eye:    <Eye    className="w-10 h-10" />,
  layers: <Layers className="w-10 h-10" />,
};

const BG_ICON_MAP: Record<CapabilityCard['iconKey'], React.ReactNode> = {
  brain:  <Brain  className="w-32 h-32" />,
  eye:    <Eye    className="w-32 h-32" />,
  layers: <Layers className="w-32 h-32" />,
};

const BORDER_CLASS: Record<CapabilityCard['color'], string> = {
  green:   'pixel-border',
  magenta: 'pixel-border-magenta',
  cyan:    'pixel-border-cyan',
};

const COLOR_CLASS: Record<CapabilityCard['color'], string> = {
  green:   'text-[#00ff41]',
  magenta: 'text-[#ff00ff]',
  cyan:    'text-[#00ffff]',
};

const TAG_COLOR_CLASS: Record<CapabilityCard['color'], string> = {
  green:   'border-[#00ff41] text-[#00ff41]',
  magenta: 'border-[#ff00ff] text-[#ff00ff]',
  cyan:    'border-[#00ffff] text-[#00ffff]',
};

export const CapabilitySection: React.FC = () => (
  <section id="disciplines" className="space-y-12">
    <div className="flex items-center gap-4 border-b-2 border-[#ff00ff] pb-4">
      <Cpu className="w-10 h-10 text-[#ff00ff]" />
      <h2 style={FONTS.title} className="text-2xl md:text-4xl text-white uppercase">CORE_DISCIPLINES</h2>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {CAPABILITY_CARDS.map((card) => (
        <div
          key={card.title}
          className={`bg-[#111] p-6 ${BORDER_CLASS[card.color]} flex flex-col gap-4 relative overflow-hidden`}
        >
          <div className={`absolute -right-4 -top-4 opacity-10 ${COLOR_CLASS[card.color]}`}>
            {BG_ICON_MAP[card.iconKey]}
          </div>

          <div className={COLOR_CLASS[card.color]}>
            {ICON_MAP[card.iconKey]}
          </div>

          <h3 style={FONTS.title} className="text-xl text-white mt-2">{card.title}</h3>

          <p className="text-xl text-gray-400 flex-1">{card.desc}</p>

          <div className="flex flex-wrap gap-2 pt-2">
            {card.tags.map(tag => (
              <span
                key={tag}
                className={`text-xl border px-2 py-0.5 bg-black ${TAG_COLOR_CLASS[card.color]}`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </section>
);

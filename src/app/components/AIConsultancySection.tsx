import React from 'react';
import { Brain, Network, Database, Zap } from 'lucide-react';
import { FONTS } from '../../constants/theme';

export const AIConsultancySection: React.FC = () => (
  <section id="ai-consultancy" className="space-y-12">
    <div className="flex items-center gap-4 border-b-2 border-[#ff00ff] pb-4">
      <Brain className="w-10 h-10 text-[#ff00ff]" />
      <h2 style={FONTS.title} className="text-2xl md:text-4xl text-white uppercase">AI_LAB_SERVICES</h2>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div className="bg-[#111] p-6 pixel-border-magenta flex flex-col gap-4 relative overflow-hidden">
        <div className="absolute -right-4 -top-4 opacity-10"><Brain className="w-32 h-32" /></div>
        <Network className="w-10 h-10 text-[#00ffff]" />
        <h3 style={FONTS.title} className="text-xl text-white mt-2">LLM Integration</h3>
        <p className="text-xl text-gray-400">
          Deploying state-of-the-art language models locally or via secure API endpoints.
          Custom RAG pipelines for private data synthesis.
        </p>
      </div>

      <div className="bg-[#111] p-6 pixel-border-magenta flex flex-col gap-4 relative overflow-hidden">
        <div className="absolute -right-4 -top-4 opacity-10"><Database className="w-32 h-32" /></div>
        <Database className="w-10 h-10 text-[#00ffff]" />
        <h3 style={FONTS.title} className="text-xl text-white mt-2">Data Strategy</h3>
        <p className="text-xl text-gray-400">
          Architecting robust data lakes. Processing raw telemetrics into training-ready
          synthetic datasets with high fidelity.
        </p>
      </div>

      <div className="bg-[#111] p-6 pixel-border-magenta flex flex-col gap-4 relative overflow-hidden">
        <div className="absolute -right-4 -top-4 opacity-10"><Zap className="w-32 h-32" /></div>
        <Zap className="w-10 h-10 text-[#00ffff]" />
        <h3 style={FONTS.title} className="text-xl text-white mt-2">Agentic Systems</h3>
        <p className="text-xl text-gray-400">
          Building autonomous AI agents capable of multi-step reasoning, tool execution,
          and self-correction in volatile environments.
        </p>
      </div>
    </div>
  </section>
);

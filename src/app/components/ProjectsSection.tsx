import React from 'react';
import { Code, Terminal } from 'lucide-react';
import { FONTS } from '../../constants/theme';
import { PROJECT_CARDS, projectBorderClass, projectColorClass } from '../../constants/portfolio';

export const ProjectsSection: React.FC = () => (
  <section id="projects" className="space-y-12">
    <div className="flex items-center gap-4 border-b-2 border-[#00ffff] pb-4">
      <Code className="w-10 h-10 text-[#00ffff]" />
      <h2 style={FONTS.title} className="text-2xl md:text-4xl text-white uppercase">ARCHIVE_PROJECTS</h2>
    </div>

    <div className="space-y-8">
      {PROJECT_CARDS.map((proj, i) => (
        <div key={i} className={`bg-black p-6 md:p-8 flex flex-col md:flex-row gap-6 ${projectBorderClass(proj.color)}`}>
          <div className="flex-1 space-y-4">
            <div className={`text-sm inline-block px-2 py-1 bg-gray-900 border ${projectColorClass(proj.color)}`}>
              [ {proj.type} ]
            </div>
            <h3 style={FONTS.title} className="text-xl md:text-2xl text-white">{proj.title}</h3>
            <p className="text-xl text-gray-400">{proj.desc}</p>
            <div className="flex flex-wrap gap-2 pt-2">
              {proj.tags.map(tag => (
                <span key={tag} className="text-lg bg-gray-900 px-2 py-1 text-gray-300">#{tag}</span>
              ))}
            </div>
          </div>
          <div className="md:w-48 flex items-center justify-center border-l border-gray-800 md:pl-6 pt-4 md:pt-0 border-t md:border-t-0">
            <a
              href={proj.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 bg-gray-900 hover:bg-white hover:text-black transition-colors flex flex-col items-center justify-center gap-2"
              style={FONTS.title}
            >
              <Terminal className="w-6 h-6" />
              <span className="text-xs">EXECUTE</span>
            </a>
          </div>
        </div>
      ))}
    </div>
  </section>
);

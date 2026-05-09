import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { FONTS } from '../../constants/theme';
import { SKILLS } from '../../constants/portfolio';
import { TIMING } from '../../constants/timing';

const SKILL_EASE = [0.25, 0.46, 0.45, 0.94] as const;

const CountUp: React.FC<{ target: number; active: boolean; delay: number; color: string }> = ({
  target, active, delay, color,
}) => {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const duration = TIMING.SKILL_COUNT_BASE_MS + delay;

    const step = (ts: number) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const pct = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - pct, 3);
      setDisplay(Math.floor(eased * target));
      if (pct < 1) requestAnimationFrame(step);
    };

    const timer = setTimeout(() => requestAnimationFrame(step), delay);
    return () => clearTimeout(timer);
  }, [active, target, delay]);

  return (
    <span style={{ color, ...FONTS.code }} className="text-sm tabular-nums w-10 text-right shrink-0">
      {display}%
    </span>
  );
};

export const SkillBars: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="space-y-5">
      {SKILLS.map((skill, i) => {
        const animDelay = i * TIMING.SKILL_DELAY_STEP_MS;
        return (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: animDelay / 1000 }}
            className="group"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <span className="text-sm text-white group-hover:text-white transition-colors" style={FONTS.code}>
                  {skill.name}
                </span>
                <span
                  className="text-xs px-1.5 py-0.5 border"
                  style={{
                    color: skill.color,
                    borderColor: `${skill.color}60`,
                    backgroundColor: `${skill.color}12`,
                    ...FONTS.code,
                  }}
                >
                  {skill.cat}
                </span>
              </div>
              <CountUp target={skill.pct} active={inView} delay={animDelay} color={skill.color} />
            </div>

            <div
              className="relative h-5 bg-[#0a0a0c] border border-gray-800 overflow-hidden"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(90deg, transparent, transparent 9px, rgba(255,255,255,0.03) 9px, rgba(255,255,255,0.03) 10px)',
              }}
            >
              <motion.div
                className="absolute inset-y-0 left-0 h-full"
                initial={{ width: '0%' }}
                animate={inView ? { width: `${skill.pct}%` } : {}}
                transition={{
                  duration: TIMING.SKILL_BAR_DURATION_MS / 1000,
                  delay: animDelay / 1000,
                  ease: SKILL_EASE,
                }}
                style={{
                  background: `linear-gradient(90deg, ${skill.color}cc, ${skill.color})`,
                  boxShadow: `0 0 10px ${skill.glow}, 0 0 20px ${skill.glow}`,
                }}
              />

              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.25) 2px, rgba(0,0,0,0.25) 3px)',
                }}
              />

              {inView && (
                <motion.div
                  className="absolute inset-y-0 w-3"
                  initial={{ left: '0%', opacity: 1 }}
                  animate={{ left: `${skill.pct}%`, opacity: 0 }}
                  transition={{
                    duration: TIMING.SKILL_BAR_DURATION_MS / 1000,
                    delay: animDelay / 1000,
                    ease: SKILL_EASE,
                  }}
                  style={{
                    background: 'linear-gradient(90deg, transparent, white)',
                    mixBlendMode: 'overlay',
                  }}
                />
              )}
            </div>
          </motion.div>
        );
      })}

      <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-800">
        {[
          { label: 'Core / Backend',      color: '#00ff41' },
          { label: 'AI / ML / DevOps',    color: '#ff00ff' },
          { label: 'Frontend / Compute',  color: '#00ffff' },
        ].map(({ label, color }) => (
          <div key={label} className="flex items-center gap-2" style={FONTS.code}>
            <div className="w-3 h-3 shrink-0" style={{ background: color, boxShadow: `0 0 6px ${color}` }} />
            <span className="text-xs text-gray-500">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

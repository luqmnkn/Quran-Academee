import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { TRUST_STATS } from '../data';
import { CheckCircle2, Award } from 'lucide-react';

interface AnimatedCounterProps {
  value: string;
}

function AnimatedCounter({ value }: AnimatedCounterProps) {
  const cleanNumberStr = value.replace(/[^0-9]/g, '');
  const target = parseInt(cleanNumberStr, 10) || 0;
  const hasComma = value.includes(',');
  const suffix = value.replace(/[0-9,]/g, '');

  const [count, setCount] = useState(0);
  const containerRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px 0px' });

  useEffect(() => {
    if (!isInView || target === 0) return;

    const duration = 2000; // Counter takes 2 seconds to reach goal
    const startTime = performance.now();
    let animationFrameId: number;

    const updateValue = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Decelerate using easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentCount = Math.floor(easeProgress * target);
      
      setCount(currentCount);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateValue);
      } else {
        setCount(target);
      }
    };

    animationFrameId = requestAnimationFrame(updateValue);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isInView, target]);

  const formattedCount = hasComma 
    ? count.toLocaleString('en-US') 
    : count.toString();

  return (
    <span ref={containerRef} className="tabular-nums">
      {formattedCount}
      {suffix}
    </span>
  );
}

export default function TrustCredibility() {
  return (
    <section id="statistics" className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-white via-[#F0F9FF] to-white relative overflow-hidden">
      
      {/* Backdrops */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#1C8DC8]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-[#3D8DC3]/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto mb-16 sm:mb-20 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-[#F0F9FF] border border-[#1C8DC8]/20 px-4 py-2 rounded-full shadow-sm">
            <Award size={14} className="text-[#1C8DC8]" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#1C8DC8]">
              Credibility & Experience
            </span>
          </div>
          <h2 className="font-display font-[900] text-3xl sm:text-[40px] text-[#0B3951] tracking-[-0.03em] leading-[1.1]">
            An International Academy Built on <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1C8DC8] to-[#146299] font-allura px-1">Trust & Devotion</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto leading-relaxed">
            We hold ourselves to the highest benchmarks of traditional Arabic pedagogy and verified academic certifications.
          </p>
        </div>

        {/* Bento Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 max-w-5xl mx-auto">
          {TRUST_STATS.map((stat, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              key={idx}
              className="bg-white border border-[#E0F2FE] hover:border-[#1C8DC8]/40 rounded-2xl sm:rounded-[28px] p-3.5 xs:p-5 sm:p-8 flex flex-col items-center justify-between text-center shadow-[0_12px_24px_rgba(28,141,200,0.02)] hover:shadow-[0_16px_36px_rgba(28,141,200,0.08)] hover:bg-[#F0F9FF]/20 transition-all duration-300 group"
            >
              <div className="space-y-1.5 sm:space-y-3">
                <span className="font-display font-semibold text-xl xs:text-2xl sm:text-4xl lg:text-5xl text-transparent bg-clip-text bg-gradient-to-br from-[#1C8DC8] via-[#146299] to-[#0B3951] block tracking-tighter">
                  <AnimatedCounter value={stat.value} />
                </span>
                <h3 className="font-display font-extrabold text-[10px] xs:text-xs sm:text-sm text-[#0B3951] tracking-tight leading-snug">
                  {stat.label}
                </h3>
              </div>
              <p className="text-[9px] xs:text-[11px] sm:text-xs text-slate-600 leading-normal xs:leading-relaxed mt-2.5 pt-2.5 sm:mt-4 sm:pt-4 border-t border-[#E0F2FE] w-full">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Certifications Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 bg-white border border-[#E0F2FE] max-w-lg lg:max-w-3xl mx-auto p-6 sm:p-8 rounded-[28px] flex flex-col sm:flex-row items-center justify-center sm:space-x-5 space-y-4 sm:space-y-0 text-left shadow-[0_15px_30px_rgba(28,141,200,0.04)]"
        >
          <div className="w-12 h-12 rounded-xl bg-[#F0F9FF] border border-[#1C8DC8]/20 flex items-center justify-center text-[#1C8DC8] shrink-0">
            <CheckCircle2 size={24} />
          </div>
          <div className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            <strong className="text-[#0B3951] block font-extrabold mb-1 font-display">100% Certified Recitation Credentials</strong>
            All our senior tutors hold certified credentials and authorizations from respected institutions. Your family receives authentic, beautifully articulated preservation classes.
          </div>
        </motion.div>

      </div>
    </section>
  );
}
import React from 'react';
import { motion } from 'motion/react';
import { WHY_CHOOSE_US } from '../data';
import IconRenderer from './IconRenderer';
import PremiumCarousel from './PremiumCarousel';
import { Compass, Sparkles, ShieldCheck } from 'lucide-react';

export default function WhyChooseUs() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  const featureVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 90, damping: 15 }
    }
  };

  const renderCardContent = (feature: typeof WHY_CHOOSE_US[0]) => (
    <div className="bg-gradient-to-br from-white via-white to-[#F0F9FF]/60 rounded-2xl border border-[#E0F2FE] hover:border-[#1C8DC8]/30 p-6 sm:p-7 md:p-8 space-y-4 transition-all duration-300 shadow-[0_12px_30px_rgba(28,141,200,0.03)] hover:shadow-[0_20px_40px_rgba(28,141,200,0.1)] flex flex-col justify-between items-start h-full relative overflow-hidden group text-left min-h-[290px]">
      {/* Glow highlight effect */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#1C8DC8]/5 rounded-full blur-2xl group-hover:bg-[#1C8DC8]/10 transition-all duration-500"></div>

      <div className="space-y-4">
        {/* Premium Icon Badge */}
        <div className="w-12 h-12 rounded-xl bg-[#F0F9FF] text-[#1C8DC8] border border-[#E0F2FE] flex items-center justify-center transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-[#1C8DC8] group-hover:to-[#3D8DC3] group-hover:text-white shadow-md">
          <IconRenderer name={feature.icon} className="w-6 h-6" />
        </div>

        {/* Feature info */}
        <div className="space-y-2 relative z-10">
          <h3 className="font-display font-[800] text-lg text-[#0B3951] group-hover:text-[#1C8DC8] transition-colors leading-snug">
            {feature.title}
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed font-sans font-medium">
            {feature.description}
          </p>
        </div>
      </div>

      {/* Sparkle detailing in corner */}
      <div className="self-end pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Sparkles size={12} className="text-[#1C8DC8]" />
      </div>
    </div>
  );

  return (
    <section 
      id="why-us" 
      className="py-[100px] md:py-[140px] lg:py-[180px] bg-gradient-to-tr from-[#F0F9FF] via-white to-[#E0F2FE] text-[#0B3951] relative overflow-hidden"
    >
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#1C8DC8]/3 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#3D8DC3]/3 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Header content with luxury system alignment */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
          <div className="inline-flex items-center space-x-2 bg-[#F0F9FF] border border-[#1C8DC8]/20 px-4 py-2 rounded-full shadow-sm">
            <Compass className="text-[#1C8DC8] w-4.5 h-4.5 animate-spin" style={{ animationDuration: '10s' }} />
            <span className="text-xs font-bold text-[#146299] uppercase tracking-widest font-mono">
              Academy Advancements
            </span>
          </div>
          
          <h2 className="font-display font-[900] text-3xl sm:text-[45px] lg:text-[64px] text-[#0B3951] tracking-[-0.04em] leading-[1.05] filter drop-shadow-sm">
            Why Hundreds of Worldwide Families <br className="hidden sm:inline" />
            Empower Their Kids via <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1C8DC8] via-[#146299] to-[#0B3951]">Zikr</span>
          </h2>
          
          <p className="font-sans font-medium text-[18px] text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Our academy prioritizes professional teacher evaluations, scheduling convenience, verified certifications, and interactive spaces designed for success.
          </p>
        </div>

        {/* 1. DESKTOP VIEW: Adaptive Grid Layout */}
        <motion.div 
          className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {WHY_CHOOSE_US.map((feature, idx) => (
            <motion.div
              key={idx}
              variants={featureVariants}
              className="h-full"
            >
              {renderCardContent(feature)}
            </motion.div>
          ))}
        </motion.div>

        {/* 2. MOBILE VIEW: Horizontal Snap-Center Carousel */}
        <div className="block lg:hidden">
          <PremiumCarousel>
            {WHY_CHOOSE_US.map((feature, idx) => (
              <div key={idx} className="h-full">
                {renderCardContent(feature)}
              </div>
            ))}
          </PremiumCarousel>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center flex items-center justify-center space-x-2.5 text-xs text-slate-500 font-medium"
        >
          <Sparkles size={15} className="text-[#1C8DC8] animate-pulse" />
          <span>Rest assured: Every teaching credential is audited, verified, and certified annually to guarantee perfect authenticity.</span>
        </motion.div>

      </div>
    </section>
  );
}

import React from 'react';
import { motion } from 'framer-motion'; // or 'motion/react' depending on your export setup
import { WHY_CHOOSE_US } from '../data';
import IconRenderer from './IconRenderer';
import PremiumCarousel from './PremiumCarousel';
import { Compass, Sparkles, ShieldCheck } from 'lucide-react';

// Type safety for array item
type FeatureItem = (typeof WHY_CHOOSE_US)[number];

const GOOGLE_ICON_MAP: Record<string, string> = {
  shieldcheck: 'verified',
  usercheck: 'support_agent',
  calendardays: 'calendar_month',
  users: 'groups',
  checkcircle: 'stars',
  graduationcap: 'school'
};

const getGoogleIcon = (iconName: string) => {
  const normalized = iconName.toLowerCase().replace(/[-_]/g, '');
  return GOOGLE_ICON_MAP[normalized] || 'verified';
};

// Sub-component for individual cards
const WhyChooseUsCard = ({ feature }: { feature: FeatureItem }) => {
  return (
    <div className="bg-gradient-to-br from-white via-white to-[#F0F9FF] rounded-[24px] border border-[#E0F2FE] hover:border-[#1C8DC8]/50 p-6 sm:p-7 md:p-8 space-y-4 transition-all duration-300 shadow-[0_12px_32px_rgba(28,141,200,0.02)] hover:shadow-[0_24px_50px_rgba(28,141,200,0.12)] hover:-translate-y-1.5 flex flex-col justify-between items-center h-full relative overflow-hidden group text-center min-h-[280px]">
      {/* Background Glow */}
      <div className="absolute -top-16 -right-16 w-36 h-36 bg-gradient-to-bl from-[#1C8DC8]/12 to-[#146299]/5 rounded-full blur-2xl group-hover:scale-125 transition-all duration-500 pointer-events-none" />

      <div className="space-y-4 w-full relative z-10 flex flex-col items-center">
        {/* Icon Badge */}
        <div className="w-12 h-12 rounded-xl bg-[#F0F9FF] text-[#1C8DC8] border border-[#E0F2FE] flex items-center justify-center transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-[#1C8DC8] group-hover:to-[#146299] group-hover:text-white shadow-md group-hover:scale-105 shrink-0">
          <span className="material-symbols-outlined text-[24px] leading-none select-none">
            {getGoogleIcon(feature.icon)}
          </span>
        </div>

        {/* Feature Text */}
        <div className="space-y-2 w-full text-center">
          <h3 className="font-display font-[800] text-lg text-[#0B3951] group-hover:text-[#1C8DC8] transition-colors leading-snug">
            {feature.title}
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed font-sans font-medium">
            {feature.description}
          </p>
        </div>
      </div>

      {/* Detail Sparkle */}
      <div className="self-center pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 relative z-10">
        <Sparkles size={14} className="text-[#1C8DC8]" />
      </div>
    </div>
  );
};

export default function WhyChooseUs() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const featureVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring' as const, stiffness: 90, damping: 15 },
    },
  };

  return (
    <section 
      id="why-us" 
      className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-white via-[#F0F9FF] to-white text-[#0B3951] relative overflow-hidden"
    >
      {/* Visual Ambient Lights */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#1C8DC8]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#3D8DC3]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4 sm:space-y-6">
          <div className="inline-flex items-center space-x-2 bg-[#F0F9FF] border border-[#1C8DC8]/20 px-6 py-2 shadow-sm">
            <Compass className="text-[#1C8DC8] w-4 h-4 animate-spin" style={{ animationDuration: '10s' }} />
            <span className="text-xs font-bold text-[#146299] uppercase tracking-widest font-mono">
              Academy Advancements
            </span>
          </div>
          
          <h2 className="font-display font-[900] text-3xl sm:text-5xl lg:text-6xl text-[#0B3951] tracking-[-0.03em] leading-[1.15]">
            Why Hundreds of Worldwide Families <br className="hidden sm:inline" />
            Empower Their Kids via{' '}
            <span className="font-allura inline-block py-1 text-transparent bg-clip-text bg-gradient-to-r from-[#1C8DC8] via-[#146299] to-[#0B3951]">
              Quran Academee
            </span>
          </h2>
          
          <p className="font-sans font-medium text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            We combine traditional Tajweed excellence and Hifz guidance with interactive online learning to help students recite, understand, and live the Quran.
          </p>
        </div>

        {/* 1. DESKTOP VIEW: Grid */}
        <motion.div 
          className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {WHY_CHOOSE_US.map((feature, idx) => (
            <motion.div key={idx} variants={featureVariants} className="h-full">
              <WhyChooseUsCard feature={feature} />
            </motion.div>
          ))}
        </motion.div>

        {/* 2. MOBILE VIEW: Carousel */}
        <div className="block lg:hidden">
          <PremiumCarousel>
            {WHY_CHOOSE_US.map((feature, idx) => (
              <div key={idx} className="h-full px-1">
                <WhyChooseUsCard feature={feature} />
              </div>
            ))}
          </PremiumCarousel>
        </div>



      </div>
    </section>
  );
}
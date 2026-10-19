'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ThreeEasyStepsProps {
  onOpenTrialModal?: () => void;
}

export default function ThreeEasySteps({ onOpenTrialModal }: ThreeEasyStepsProps) {
  const steps = [
    {
      num: '1',
      title: 'Book a Free Trial Class',
      desc: 'Fill out our simple inquiry form. Our scheduling coordinator will reach out directly on WhatsApp to coordinate a convenient time.',
      mobileDesc: 'Book your free trial class in seconds.'
    },
    {
      num: '2',
      title: 'Meet Your Scholar',
      desc: 'Connect live with a certified expert scholar. We assess your level and outline a personalized course path tailored to your goals.',
      mobileDesc: 'Connect live for a friendly level assessment.'
    },
    {
      num: '3',
      title: 'Begin Learning',
      desc: 'Join interactive 1-on-1 virtual sessions to master Tajweed, understand verses, and apply Quranic principles in daily life.',
      mobileDesc: 'Start 1-on-1 classes to recite and live by Quran.'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 100, damping: 15 } }
  };

  const handleTrialClick = () => {
    if (onOpenTrialModal) {
      onOpenTrialModal();
    } else if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      params.set('trial', 'true');
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.replaceState(null, '', newUrl);
      window.dispatchEvent(new Event('open-trial-modal'));
    }
  };

  const renderCardContent = (step: typeof steps[0]) => (
    <div className="bg-white rounded-none border border-white/60 p-4 sm:p-6 lg:p-7 shadow-[0_12px_30px_rgba(0,0,0,0.08)] flex flex-col items-center text-center space-y-3 sm:space-y-4 hover:shadow-[0_18px_40px_rgba(0,0,0,0.14)] hover:-translate-y-1 transition-all duration-300 relative group overflow-hidden h-full min-h-[140px] md:min-h-[220px]">
      {/* Top indicator line */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#1C8DC8] to-[#146299]"></div>

      {/* Number instead of icon without any background */}
      <span className="font-display font-[900] text-3xl sm:text-4xl text-[#1C8DC8] group-hover:text-[#146299] transition-colors duration-300 select-none relative z-10 mt-1 sm:mt-2">
        {step.num}
      </span>

      <div className="relative z-10">
        <h4 className="font-display font-[800] text-sm sm:text-base text-[#0B3951] group-hover:text-[#146299] transition-colors duration-200">
          {step.title}
        </h4>
        <p className="hidden md:block text-xs sm:text-[13px] text-slate-600 mt-2.5 leading-relaxed font-sans font-medium">
          {step.desc}
        </p>
      </div>
    </div>
  );

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-br from-[#1C8DC8] via-[#146299] to-[#0B3951] text-white relative overflow-hidden">
      {/* Visual Ambient Lights */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="max-w-2xl mx-auto mb-8 sm:mb-16 px-4 space-y-2 sm:space-y-3">
          <h3 className="font-display font-[900] text-3xl sm:text-[45px] text-white tracking-[-0.04em] leading-tight">
            Begin Your Path in <span className="font-allura text-sky-200">3 Easy Steps</span>
          </h3>
          <p className="text-white/80 text-sm sm:text-base font-medium max-w-lg mx-auto">
            A simple, structured pathway from your first live consultation to confident recitation and living wisdom.
          </p>
        </div>

        {/* MOBILE UI: 3 Clean Connected Step Cards with 1-Sentence Descriptions */}
        <div className="block sm:hidden relative w-full px-2 py-2">
          <div className="flex flex-col space-y-3.5 w-full">
            {steps.map((step, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-none border border-white/60 p-4 flex items-center space-x-3.5 shadow-md text-left text-[#0B3951]"
              >
                <span className="font-display font-[900] text-2xl text-[#1C8DC8] select-none shrink-0 px-1">
                  {step.num}
                </span>
                <div className="flex-1 min-w-0">
                  <h4 className="font-display font-extrabold text-sm text-[#0B3951] leading-tight">
                    {step.title}
                  </h4>
                  <p className="text-xs font-medium text-slate-600 leading-snug mt-1">
                    {step.mobileDesc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DESKTOP UI: 3 Cards Grid */}
        <motion.div 
          className="hidden sm:grid max-w-5xl mx-auto px-6 sm:grid-cols-3 gap-6 lg:gap-8 relative z-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="absolute top-[55px] left-[15%] right-[15%] h-[2px] bg-white/20 -z-10" />

          {steps.map((step, idx) => (
            <motion.div key={idx} variants={childVariants} className="h-full flex-1">
              {renderCardContent(step)}
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 sm:mt-14 px-4"
        >
          <button
            onClick={handleTrialClick}
            className="w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 font-display text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#0B3951] bg-white hover:bg-slate-100 transition-all duration-300 rounded-none shadow-[0_12px_32px_rgba(0,0,0,0.18)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer inline-flex items-center justify-center space-x-2.5"
          >
            <span>Schedule Free Trial Class Now</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}

'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CalendarRange, UserCheck, GraduationCap, Users } from 'lucide-react';
import PremiumCarousel from './PremiumCarousel';

interface AboutProps {
  onOpenTrialModal?: () => void;
}

export default function About({ onOpenTrialModal }: AboutProps) {
  const steps = [
    {
      num: '01',
      title: 'Book a Free Trial',
      desc: 'Fill out our simple inquiry form. Our scheduling coordinator will reach out directly on WhatsApp to coordinate a convenient time.',
      mobileDesc: 'Book your free trial class in seconds.',
      icon: 'CalendarRange'
    },
    {
      num: '02',
      title: 'Meet Your Scholar',
      desc: 'Connect live with a certified expert scholar. We assess your level and outline a personalized course path tailored to your goals.',
      mobileDesc: 'Connect live for a friendly level assessment.',
      icon: 'UserCheck'
    },
    {
      num: '03',
      title: 'Begin Learning',
      desc: 'Join interactive 1-on-1 virtual sessions to master Tajweed, understand verses, and apply Quranic principles in daily life.',
      mobileDesc: 'Start 1-on-1 classes to recite and live by Quran.',
      icon: 'GraduationCap'
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

  const renderCardContent = (step: typeof steps[0]) => (
    <div className="bg-gradient-to-br from-white via-white to-[#F0F9FF]/40 rounded-2xl border border-[#E0F2FE] p-3.5 sm:p-5 lg:p-6 shadow-[0_10px_25px_rgba(28,141,200,0.03)] flex flex-col items-center text-center space-y-2 sm:space-y-4 hover:shadow-[0_15px_30px_rgba(28,141,200,0.08)] hover:-translate-y-1 transition-all duration-300 relative group overflow-hidden h-full min-h-[120px] md:min-h-[200px]">
      {/* Top indicator ribbon */}
      <div className="absolute top-0 left-0 right-0 h-[3.5px] bg-gradient-to-r from-[#1C8DC8] to-[#146299] scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>

      {/* Blue light glow from the top-right */}
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-[#1C8DC8]/12 rounded-full blur-xl group-hover:bg-[#1C8DC8]/22 transition-all duration-500 pointer-events-none"></div>

      <span className="absolute top-3 right-4 font-mono font-black text-[10px] sm:text-xs text-[#1C8DC8]/40 uppercase tracking-widest relative z-10">
        {step.num}
      </span>

      {/* Round icon badge layout */}
      <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-xl bg-[#F0F9FF] text-[#1C8DC8] border border-[#E0F2FE] flex items-center justify-center shadow-inner group-hover:bg-[#0B3951] group-hover:text-white transition-all duration-300 shrink-0 relative z-10 mt-1 sm:mt-2">
        {step.icon === 'CalendarRange' && <CalendarRange className="w-4 h-4 sm:w-5 sm:h-5" />}
        {step.icon === 'UserCheck' && <UserCheck className="w-4 h-4 sm:w-5 sm:h-5" />}
        {step.icon === 'GraduationCap' && <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5" />}
      </div>

      <div className="relative z-10">
        <h4 className="font-display font-[800] text-xs sm:text-sm lg:text-base text-[#0B3951] group-hover:text-[#1C8DC8] transition-colors duration-200">
          {step.title}
        </h4>
        <p className="hidden md:block text-xs text-slate-500 mt-2 leading-relaxed font-sans font-medium">
          {step.desc}
        </p>
      </div>
    </div>
  );

  return (
    <section 
      id="about" 
      className="py-16 sm:py-20 md:py-24 bg-white relative overflow-hidden"
    >
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#1C8DC8]/3 rounded-full blur-[130px] -translate-y-1/2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* SPLIT SECTION LAYOUT: Mission & Visual Presentation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center mb-28 text-left">
          
{/* Left Column: Learning visual display */}
<motion.div 
  initial={{ opacity: 0, scale: 0.98, x: -20 }}
  whileInView={{ opacity: 1, scale: 1, x: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.5, ease: 'easeOut' }}
  className="lg:col-span-5 relative"
>
  <div className="absolute -top-6 -left-6 w-80 h-80 bg-[#1C8DC8]/5  blur-3xl pointer-events-none"></div>
  
  {/* Logo Picture */}
  <div className="w-full h-full">
    
    {/* Mobile Image (Hidden on desktop md+) */}
    <Image
      src="/images/navbarlogo.png"
      alt="Student learning session with certified female tutor represented by Quran Academee classes"
      width={600}
      height={400}
      priority
      className="block md:hidden w-full h-auto object-contain"
    />

    {/* Desktop Image (Hidden on mobile, visible on md+) */}
    <Image
      src="/images/footerLogo.png"
      alt="Student learning session with certified female tutor represented by Quran Academee classes"
      width={500}
      height={400}
      priority
      className="hidden md:block w-full h-auto object-contain"
    />
    
  </div>
</motion.div>

          {/* Right Column: Mission */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="lg:col-span-7 space-y-8"
          >
            <h2 className="font-display font-[900] text-2xl sm:text-3xl lg:text-[38px] xl:text-[42px] text-[#0B3951] tracking-[-0.040em] leading-[1.1] filter drop-shadow-sm">
              Learn to Recite, Understand, and <span className="font-allura text-transparent bg-clip-text bg-gradient-to-r from-[#1C8DC8] via-[#146299] to-[#0B3951]">Live by the Quran</span>
            </h2>

            <p className="font-sans font-medium text-[18px] text-slate-700 leading-relaxed">
              At <strong>Quran Academee</strong>, our main purpose is helping students learn how to live according to the Quran in their daily choices, character, and family life.
            </p>

            <p className="font-sans font-medium text-[16px] text-slate-600 leading-relaxed">
              While we offer essential courses in reading, Tajweed, and memorization as foundational starting steps, our focus goes further—guiding learners to understand divine translation and apply Quranic values every day.
            </p>

            <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
              <div className="space-y-2.5 p-6 rounded-[24px] bg-[#F0F9FF] border border-[#E0F2FE] hover:border-[#1C8DC8]/30 transition-all duration-350">
                <h4 className="font-display font-[900] text-sm text-[#0B3951] flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#1C8DC8]"></span>
                  <span>Living by Quranic Guidance</span>
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Focusing on applying divine teachings to personal character, daily habits, and family decisions.
                </p>
              </div>
              
              <div className="space-y-2.5 p-6 rounded-[24px] bg-[#F0F9FF] border border-[#E0F2FE] hover:border-[#1C8DC8]/30 transition-all duration-350">
                <h4 className="font-display font-[900] text-sm text-[#0B3951] flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#1C8DC8]"></span>
                  <span>Patient Female Scholars</span>
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                   Gentle and highly protective certified female scholars for sisters and young children.
                </p>
              </div>
            </div>
          </motion.div>

        </div>

{/* 3 STEPS ONBOARDING */}
<div className="pt-8 sm:pt-20 text-center overflow-hidden">
  <div className="max-w-2xl mx-auto mb-6 sm:mb-16 px-4 space-y-2 sm:space-y-4">
    <span className="text-xs font-mono font-black uppercase tracking-widest text-[#146299]">
      The Simplest Process
    </span>
    <h3 className="font-display font-[900] text-2xl sm:text-[45px] text-[#0B3951] tracking-[-0.04em] leading-tight">
      Begin Your Path in <span className="font-allura text-transparent bg-clip-text bg-gradient-to-r from-[#1C8DC8] via-[#146299] to-[#0B3951]">3 Easy Steps</span>
    </h3>
  </div>

  {/* MOBILE UI: 3 Clean Connected Step Cards with 1-Sentence Descriptions */}
  <div className="block sm:hidden relative w-full px-2 py-2">
    <div className="flex flex-col space-y-3 w-full">
      {steps.map((step, idx) => (
        <div 
          key={idx}
          className="bg-gradient-to-r from-white via-white to-[#F0F9FF] border border-[#E0F2FE] rounded-2xl p-3.5 flex items-center space-x-3.5 shadow-sm text-left"
        >
          <div className="w-10 h-10 rounded-xl bg-[#0B3951] text-[#1C8DC8] flex items-center justify-center font-display font-extrabold text-xs shrink-0 shadow-inner border border-[#E0F2FE]">
            {step.num}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-display font-extrabold text-xs text-[#0B3951] leading-tight">
              {step.title}
            </h4>
            <p className="text-[11px] font-medium text-slate-600 leading-snug mt-0.5">
              {step.mobileDesc}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>

  {/* DESKTOP UI: Unchanged Grid Structure */}
  <motion.div 
    className="hidden sm:grid max-w-5xl mx-auto px-6 sm:grid-cols-3 gap-6 lg:gap-8 relative z-10"
    variants={containerVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px" }}
  >
    <div className="absolute top-[55px] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-[#F0F9FF] via-[#1C8DC8]/20 to-[#F0F9FF] -z-10" />

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
    className="mt-6 sm:mt-14 px-4"
  >
    <button
      onClick={onOpenTrialModal}
      className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 font-display text-xs font-extrabold uppercase tracking-widest text-white bg-gradient-to-r from-[#1C8DC8] via-[#3D8DC3] to-[#146299] hover:from-[#146299] hover:to-[#1C8DC8] transition-all duration-300 rounded-full shadow-[0_12px_32px_rgba(28,141,200,0.22)] hover:shadow-[0_16px_40px_rgba(28,141,200,0.35)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer inline-flex items-center justify-center space-x-2.5"
    >
      <span>Schedule 3-Day Free Trial Now</span>
    </button>
  </motion.div>
</div>
      </div>
    </section>
  );
}
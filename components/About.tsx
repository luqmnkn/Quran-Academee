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
      icon: 'CalendarRange'
    },
    {
      num: '02',
      title: 'Meet Your Tutor',
      desc: 'Connect live with a certified expert tutor. We assess the learner\'s levels and suggest a customized curriculum path.',
      icon: 'UserCheck'
    },
    {
      num: '03',
      title: 'Begin Quran Classes',
      desc: 'Lock in your weekly class slots and join highly interactive 1-on-1 virtual sessions. Watch your family\'s Tajweed skills rise.',
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
  
  {/* Multi borders */}
  <div className="">
    
    {/* Mobile Image (Hidden on desktop md+) */}
    <Image
      src="/images/navbarlogo.png"
      alt="Student learning session with certified female tutor represented by Quran Academee classes"
      width={600}
      height={400}
      priority
      className="block md:hidden w-full h-auto object-cover"
    />

    {/* Desktop Image (Hidden on mobile, visible on md+) */}
    <Image
      src="/images/footerLogo.png"
      alt="Student learning session with certified female tutor represented by Quran Academee classes"
      width={600}
      height={400}
      priority
      className="hidden md:block w-full h-auto rounded-[24px] object-cover"
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
              A Kind, Compassionate Pathway toward <span className="font-allura text-transparent bg-clip-text bg-gradient-to-r from-[#1C8DC8] via-[#146299] to-[#0B3951]">Noble Quran Tajweed</span>
            </h2>

            <p className="font-sans font-medium text-[18px] text-slate-700 leading-relaxed">
              At <strong>Quran Academee</strong>, we establish a warm, encouraging environment connecting families globally with highly certified, authorized expert educators from the comfort of home.
            </p>

            <p className="font-sans font-medium text-[16px] text-slate-600 leading-relaxed">
              We appreciate that every student is unique and advances at their own natural speed. Our live classes are conducted as supportive, friendly dialogs rather than stressful examinations. We seamlessly fuse classic Arabic spelling (Noorani Qaida) rules with interactive video platforms, ensuring your children read the verses with absolute beauty, correct pronunciation, and deep admiration.
            </p>

            <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
              <div className="space-y-2.5 p-6 rounded-[24px] bg-[#F0F9FF] border border-[#E0F2FE] hover:border-[#1C8DC8]/30 transition-all duration-350">
                <h4 className="font-display font-[900] text-sm text-[#0B3951] flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#1C8DC8]"></span>
                  <span>A Beautiful Islamic Environment</span>
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Focusing closely on creating a warm, respectful, and faith-centered atmosphere for all learners.
                </p>
              </div>
              
              <div className="space-y-2.5 p-6 rounded-[24px] bg-[#F0F9FF] border border-[#E0F2FE] hover:border-[#1C8DC8]/30 transition-all duration-350">
                <h4 className="font-display font-[900] text-sm text-[#0B3951] flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#1C8DC8]"></span>
                  <span>Patient Female Specialists</span>
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                   Gentle and loving certified female Sheikhahs highly protective of young kids and sisters.
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
      Begin Your Path in <span className="font-allura text-transparent bg-clip-text bg-gradient-to-r from-[#1C8DC8] via-[#146299] to-[#0B3951]">3 Elegant Steps</span>
    </h3>
  </div>

  {/* MOBILE UI: 100vw Themed Connected Blocks */}
  <div className="block sm:hidden relative w-screen left-1/2 -translate-x-1/2 px-3 py-4">
    {/* Colored Gradient Connecting Line */}
    <div className="absolute top-1/2 left-[12%] right-[12%] h-[3px] bg-gradient-to-r from-[#1C8DC8] via-[#146299] to-[#0B3951] -translate-y-1/2 -z-0 rounded-full opacity-60" />

    {/* 3 Connected Pill Containers */}
    <div className="relative z-10 flex items-center justify-between gap-2 w-full px-1">
      {steps.map((step, idx) => (
        <div 
          key={idx}
          className="flex-1 bg-gradient-to-b from-white to-[#F0F9FF] border border-[#E0F2FE] rounded-2xl p-2.5 min-h-[96px] flex flex-col items-center justify-center text-center shadow-[0_8px_20px_rgba(28,141,200,0.08)] ring-1 ring-[#1C8DC8]/10"
        >
          <h4 className="font-display font-bold text-xs text-[#0B3951] leading-tight mb-1">
            {step.title}
          </h4>
          <p className="text-[10px] font-medium text-[#146299]/90 leading-tight line-clamp-2">
            {step.desc}
          </p>
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
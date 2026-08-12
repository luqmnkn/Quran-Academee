'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { FAQS } from '../data';

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleFAQ = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section 
      id="faqs" 
      className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-white via-[#F0F9FF]/40 to-white relative overflow-hidden"
    >
      {/* Background radial highlight */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-[#1C8DC8]/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header content with luxury system alignment */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-5">
          <div className="inline-flex items-center space-x-2 bg-[#F0F9FF] border border-[#E0F2FE] px-4 py-2 shadow-sm">
            <HelpCircle size={14} className="text-[#1C8DC8]" />
            <span className="text-xs font-bold text-[#146299] uppercase tracking-widest font-mono">
              Got Questions?
            </span>
          </div>
          
          <h2 className="font-display font-[900] text-3xl sm:text-[45px] text-[#0B3951] tracking-[-0.03em] leading-[1.05]">
            Frequently Asked <span className="font-allura text-transparent bg-clip-text bg-gradient-to-r from-[#1C8DC8] via-[#146299] to-[#0B3951]">Questions</span>
          </h2>
          
          <p className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto leading-relaxed">
            Find immediate answers regarding lesson formats, teacher gender options, scheduling flexibility, and billing.
          </p>
        </div>

        {/* Collapsible Accordion Grid with Framer Motion Layout */}
        <div className="space-y-4 max-w-3xl mx-auto">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            const contentId = `faq-answer-${idx}`;

            return (
              <div
                key={idx}
                className={`bg-white/90 border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen ? 'border-[#1C8DC8] shadow-md shadow-sky-500/5' : 'border-[#E0F2FE]'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                  className="w-full text-left px-6 py-5 flex items-center justify-between font-display font-extrabold text-[#0B3951] duration-200 outline-none select-none cursor-pointer"
                >
                  <span className="pr-4 text-sm sm:text-base">{faq.question}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                    isOpen ? 'bg-[#0B3951] text-white' : 'bg-[#F0F9FF] border border-[#E0F2FE] text-[#1C8DC8]'
                  }`}>
                    {isOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={contentId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 text-sm sm:text-[15px] text-slate-600 leading-relaxed border-t border-[#E0F2FE] pt-4 text-left">
                        <p>{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
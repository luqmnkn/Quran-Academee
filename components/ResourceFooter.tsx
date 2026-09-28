'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface ResourceFooterProps {
  onOpenTrialModal?: () => void;
}

export default function ResourceFooter({ onOpenTrialModal }: ResourceFooterProps) {
  return (
    <section className="relative overflow-visible py-16 pt-24 px-4 bg-gradient-to-b from-white via-[#f0f9ff] to-[#d7effa]">
      {/* Decorative SVG background shapes */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#38aae3]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#1081b7]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 pt-8 sm:pt-12">
        <div className="bg-gradient-to-r from-[#116c9c] via-[#1081b7] to-[#0e94d3] rounded-3xl p-8 sm:p-12 shadow-2xl text-white relative border border-[#38aae3]/30 overflow-visible">

          {/* Added items-end here so grid columns align properly at the bottom baseline */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end relative z-10">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left pb-2">
              <motion.h2
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight"
              >
                Build a Lifelong Connection with the Quran
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-slate-100 text-sm sm:text-base leading-relaxed max-w-2xl font-normal"
              >
                Honor reading, Tajweed, and Hifz as sacred foundations while taking your family on a complete journey into translation, understanding, and daily character application.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2"
              >
                {onOpenTrialModal ? (
                  <button
                    onClick={onOpenTrialModal}
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-sm shadow-lg hover:shadow-amber-500/25 transition-all transform hover:-translate-y-0.5"
                  >
                    <span>Book a Free Trial Class</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <Link
                    href="/#courses"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-sm shadow-lg hover:shadow-amber-500/25 transition-all transform hover:-translate-y-0.5"
                  >
                    <span>Book a Free Trial Class</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}

                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-all backdrop-blur-sm"
                >
                  Explore Pricing
                </Link>
              </motion.div>
            </div>

            {/* Right Graphic Image Section - Clean flex alignment with zero negative margins */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end self-end relative overflow-visible z-30">
              <div className="relative w-72 sm:w-80 lg:w-[380px] h-[300px] sm:h-[340px] lg:h-[380px] flex items-end justify-end pointer-events-none">
                <Image
                  src="/images/footerpicture.png"
                  alt="Quran Academee Learning"
                  width={600}
                  height={500}
                  className="object-contain object-bottom w-full h-full filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.3)]"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
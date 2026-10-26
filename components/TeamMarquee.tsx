'use client';

import React from 'react';
import Image from 'next/image';
import { TEACHERS } from '@/lib/teachersData';

export default function TeamMarquee() {
  // Repeat array 4 times (2 sets per 50% cycle) for seamless infinite marquee loop moving left
  const loopedMembers = [...TEACHERS, ...TEACHERS, ...TEACHERS, ...TEACHERS];

  return (
    <div className="relative w-full overflow-hidden py-6 select-none">
      {/* Side Fade Masks */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

      {/* Marquee Track moving toward left */}
      <div className="flex w-max space-x-8 animate-team-marquee hover:[animation-play-state:paused]">
        {loopedMembers.map((member, index) => (
          <div
            key={`${member.id}-${index}`}
            className="w-[360px] sm:w-[420px] md:w-[460px] shrink-0 bg-white rounded-3xl border border-sky-100/90 p-8 sm:p-9 shadow-[0_4px_24px_rgba(15,23,42,0.04)] text-center flex flex-col items-center justify-start"
          >
            {/* Bigger Teacher Photo */}
            <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden border-2 border-sky-200/90 shadow-md mb-6 bg-slate-100 shrink-0">
              <Image
                src={member.image}
                alt={member.name}
                width={176}
                height={176}
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Teacher Name */}
            <h3 className="font-display font-[800] text-xl sm:text-2xl text-[#0B3951] mb-4">
              {member.name}
            </h3>

            {/* Teacher Description: Just a clean paragraph, no points, no icons */}
            <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed font-sans text-center">
              {member.bio}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

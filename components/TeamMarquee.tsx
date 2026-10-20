'use client';

import React from 'react';
import Image from 'next/image';
import { GraduationCap, Award, BookOpen, Heart, ShieldCheck } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  faculty: string;
  image?: string;
  gender: 'Male' | 'Female';
  fallbackInitials: string;
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'sheikh-jawwad',
    name: 'Sheikh Jawwad Musa',
    faculty: 'Head of Academic & Scholarly Supervision',
    image: '/images/shiekhJawwad.png',
    gender: 'Male',
    fallbackInitials: 'JM',
  },
  {
    id: 'qari-bilal',
    name: 'Qari Bilal Ahmed',
    faculty: 'Faculty of Tajweed & Qira’at',
    gender: 'Male',
    fallbackInitials: 'BA',
  },
  {
    id: 'ustadha-maryam',
    name: 'Ustadha Maryam Fatima',
    faculty: 'Faculty of Hifz & Early Childhood',
    gender: 'Female',
    fallbackInitials: 'MF',
  },
  {
    id: 'sheikh-hamza',
    name: 'Sheikh Hafiz Hamza',
    faculty: 'Faculty of Quran Memorization (Hifz)',
    gender: 'Male',
    fallbackInitials: 'HH',
  },
  {
    id: 'ustadha-aisha',
    name: 'Ustadha Aisha Siddiqa',
    faculty: 'Faculty of Islamic Studies & Character (Akhlaq)',
    gender: 'Female',
    fallbackInitials: 'AS',
  },
  {
    id: 'qari-zubair',
    name: 'Qari Muhammad Zubair',
    faculty: 'Faculty of Quranic Arabic & Recitation',
    gender: 'Male',
    fallbackInitials: 'MZ',
  },
  {
    id: 'ustadha-zainab',
    name: 'Ustadha Zainab Noor',
    faculty: 'Faculty of Alqaida Almadania Foundations',
    gender: 'Female',
    fallbackInitials: 'ZN',
  },
];

export default function TeamMarquee() {
  // Duplicate array for seamless infinite marquee loop moving left
  const doubledMembers = [...TEAM_MEMBERS, ...TEAM_MEMBERS];

  return (
    <div className="relative w-full overflow-hidden py-4 select-none">
      {/* Side Fade Masks */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

      {/* Marquee Track moving toward left */}
      <div className="flex w-max space-x-6 animate-team-marquee hover:[animation-play-state:paused]">
        {doubledMembers.map((member, index) => (
          <div
            key={`${member.id}-${index}`}
            className="w-72 sm:w-80 shrink-0 bg-white rounded-xl border border-sky-100/90 p-6 shadow-[0_4px_20px_rgba(15,23,42,0.03)] hover:shadow-[0_12px_32px_rgba(28,141,200,0.12)]  transition-all duration-300 text-center flex flex-col items-center justify-between group"
          >
            {/* Teacher Photo / Portrait Visual */}
            <div className="relative mb-4">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-sky-200/80 shadow-md group-hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-[#E0F2FE] via-[#BAE6FD] to-[#1C8DC8]/20 flex items-center justify-center">
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0B3951] to-[#1C8DC8] text-white">
                    <span className="font-display font-black text-xl tracking-wider">
                      {member.fallbackInitials}
                    </span>
                    <span className="text-[9px] uppercase tracking-widest text-sky-200 font-mono mt-0.5">
                      Scholar
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Simple Name */}
            <h3 className="font-display font-[800] text-lg text-[#0B3951] transition-colors mb-1">
              {member.name}
            </h3>

            {/* Faculty Where They Teach */}
            <p className="text-xs font-semibold px-3 py-1 rounded-lg mt-1 max-w-[90%] leading-relaxed">
              {member.faculty}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

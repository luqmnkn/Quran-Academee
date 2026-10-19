import React from 'react';
import TrialModalButton from '@/components/TrialModalButton';

interface CourseCtaCardProps {
  courseName?: string;
  className?: string;
}

export default function CourseCtaCard({
  courseName,
  className = '',
}: CourseCtaCardProps) {
  return (
    <section className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center ${className}`}>
      <div className="bg-gradient-to-br from-[#0B3951] via-[#0D4B6C] to-[#146299] rounded-xl text-white p-8 sm:p-12 relative overflow-hidden shadow-lg">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl mx-auto space-y-4">
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
            Experience the Difference in 3 Free Classes
          </h2>
          <p className="text-sm text-slate-200 leading-relaxed max-w-xl mx-auto">
            Test our interactive digital classroom, assess our teachers, and see firsthand how our personalized 1-on-1 methodology accelerates recitation and comprehension.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <TrialModalButton
              courseName={courseName}
              variant="white"
              className="py-3.5 px-8 rounded-xl text-center font-bold"
            >
              <span>Claim 3-Day Free Trial</span>
            </TrialModalButton>
          </div>
          <span className="text-[11px] text-slate-300 block pt-1">
            No credit card required • Cancel anytime
          </span>
        </div>
      </div>
    </section>
  );
}

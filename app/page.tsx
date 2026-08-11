'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Hero from '../components/Hero';
import Services from '../components/Services';
import About from '../components/About';
import WhyChooseUs from '../components/WhyChooseUs';
import TrustCredibility from '../components/TrustCredibility';
import Testimonials from '../components/Testimonials';
import InquiryForm from '../components/InquiryForm';
import FAQSection from '../components/FAQSection';

export default function HomePage() {
  const router = useRouter();
  const [selectedCourseSelection, setSelectedCourseSelection] = useState('');

  // Handle Course Selection by opening the Free Trial Modal
  const handleOpenTrialModal = (planOrCourseName?: string) => {
    const params = new URLSearchParams(window.location.search);
    params.set('trial', 'true');
    if (planOrCourseName) {
      params.set('plan', planOrCourseName);
    } else {
      params.delete('plan');
    }
    router.push(`${window.location.pathname}?${params.toString()}`, { scroll: false });
  };

  const handleCourseSelection = (courseName: string) => {
    handleOpenTrialModal(courseName);
  };

  const handleLeadSubmitInHero = (data: any) => {
    console.log('Lead sync from hero:', data);
  };

  return (
    <>
      <Hero
        onOpenTrialModal={() => handleOpenTrialModal()}
        onSubmitInquiry={handleLeadSubmitInHero}
      />

      <Services
        onSelectCourse={handleCourseSelection}
        onOpenTrialModal={() => handleOpenTrialModal()}
      />

      <About onOpenTrialModal={() => handleOpenTrialModal()} />

      <WhyChooseUs />

      <TrustCredibility />

      <Testimonials />

      <InquiryForm
        prefilledCourse={
          selectedCourseSelection && selectedCourseSelection.toLowerCase().includes('plan')
            ? ''
            : selectedCourseSelection
        }
        onClearPrefill={() => setSelectedCourseSelection('')}
      />

      <FAQSection />
    </>
  );
}
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
  const [isTrialModalOpen, setIsTrialModalOpen] = useState(false);

  // Handle Course Selection scrolling directly to contact section
  const handleCourseSelection = (courseName: string) => {
    setSelectedCourseSelection(courseName);
    
    const targetElement = document.querySelector('#contact');
    if (targetElement) {
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    } else {
      router.push('/#contact');
    }
  };

  const handleLeadSubmitInHero = (data: any) => {
    console.log('Lead sync from hero:', data);
  };

  return (
    <>
      <Hero
        onOpenTrialModal={() => setIsTrialModalOpen(true)}
        onSubmitInquiry={handleLeadSubmitInHero}
      />

      <Services
        onSelectCourse={handleCourseSelection}
        onOpenTrialModal={() => setIsTrialModalOpen(true)}
      />

      <About onOpenTrialModal={() => setIsTrialModalOpen(true)} />

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
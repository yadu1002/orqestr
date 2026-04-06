import React, { useRef } from 'react';
import Navbar from '../components/landing/Navbar';
import HeroSection from '../components/landing/HeroSection';
import SocialProofBar from '../components/landing/SocialProofBar';
import ProblemSection from '../components/landing/ProblemSection';
import HowItWorks from '../components/landing/HowItWorks';
import CustomerPainSection from '../components/landing/CustomerPainSection';
import IntegrationBar from '../components/landing/IntegrationBar';
import UseCaseTimeline from '../components/landing/UseCaseTimeline';
import PlaybookDemo from '../components/landing/PlaybookDemo';
import FoundersSection from '../components/landing/FoundersSection';
import FAQSection from '../components/landing/FAQSection';
import WaitlistIntro from '../components/landing/WaitlistIntro';
import WaitlistForm from '../components/landing/WaitlistForm';
import Footer from '../components/landing/Footer';
import OrchestrationBackground from '../components/landing/OrchestrationBackground';

export default function Landing() {
  const scrollToWaitlist = () => {
    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen text-foreground relative">
      <OrchestrationBackground />
      <div className="relative z-10">
        <Navbar onWaitlistClick={scrollToWaitlist} />
        <div id="hero">
          <HeroSection onWaitlistClick={scrollToWaitlist} />
        </div>
        <div id="problem">
          <ProblemSection />
        </div>
        <CustomerPainSection />
        <div id="how-it-works">
          <HowItWorks />
        </div>
        <IntegrationBar />
        <UseCaseTimeline />
        <div id="demo">
          <PlaybookDemo />
        </div>
        <div id="founders">
          <FoundersSection />
        </div>
        <FAQSection />
        <div id="waitlist" className="scroll-mt-20">
          <div className="max-w-3xl mx-auto px-6 pt-12">
            </div>
          <WaitlistForm />
        </div>
        <Footer />
      </div>
    </div>
  );
}
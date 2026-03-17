import React, { useRef } from 'react';
import Navbar from '../components/landing/Navbar';
import HeroSection from '../components/landing/HeroSection';
import ProblemSection from '../components/landing/ProblemSection';
import HowItWorks from '../components/landing/HowItWorks';
import UseCaseTimeline from '../components/landing/UseCaseTimeline';
import PlaybookDemo from '../components/landing/PlaybookDemo';
import WaitlistForm from '../components/landing/WaitlistForm';
import Footer from '../components/landing/Footer';
import OrchestrationBackground from '../components/landing/OrchestrationBackground';
import FoundersSection from '../components/landing/FoundersSection';


export default function Landing() {
  const scrollToWaitlist = () => {
    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen text-foreground relative">
      <OrchestrationBackground />
      <Navbar onWaitlistClick={scrollToWaitlist} />
      <HeroSection onWaitlistClick={scrollToWaitlist} />
      <ProblemSection />
      <SignalDashboard />
      <HowItWorks />
      <UseCaseTimeline />
      <PlaybookDemo />
      <FoundersSection />
      <WaitlistForm />
      <Footer />
    </div>
  );
}
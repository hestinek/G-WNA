
import React, { useEffect, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Intro } from './components/Intro';
import { WorkStack } from './components/WorkStack';
import { Philosophy } from './components/Philosophy';
import { Gallery } from './components/Gallery';
import { Location } from './components/Location';
import { Footer } from './components/Footer';
import { Loader } from './components/Loader';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { CookieBanner } from './components/CookieBanner';

// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  // Initialize Smooth Scroll (Lenis)
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      smooth: true,
      smoothTouch: false,
    } as any);

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Use GSAP's ticker to drive Lenis animations
    // This ensures perfect sync between scroll position and GSAP animations
    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);

    // Disable GSAP's lag smoothing to prevent stutter during heavy scroll
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <div className="noise-overlay" />
      
      {/* Preloader */}
      <Loader onComplete={() => setIsLoading(false)} />

      {/* Privacy Policy Modal */}
      {isPrivacyOpen && <PrivacyPolicy onClose={() => setIsPrivacyOpen(false)} />}

      {/* Cookie Banner */}
      <CookieBanner onOpenPrivacy={() => setIsPrivacyOpen(true)} />

      <div className={`transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Navbar />

        {/* 
          Main Content Wrapper 
          Must have z-index higher than footer and margin-bottom equal to viewport height
          to create the reveal effect.
        */}
        <main className="relative z-10 bg-stone-bg shadow-2xl mb-[100vh]">
          <Hero />
          <Intro />
          <WorkStack />
          <Philosophy />
          <Gallery />
          <Location />
        </main>

        {/* Fixed Footer (Behind the main content) */}
        <Footer onOpenPrivacy={() => setIsPrivacyOpen(true)} />
      </div>
    </>
  );
};

export default App;

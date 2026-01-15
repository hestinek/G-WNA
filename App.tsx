
import React, { useEffect, useState } from 'react';
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
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { CookieBanner } from './components/CookieBanner';

// Register GSAP Plugin SYNCHRONOUSLY - must happen before any component uses it
gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  // Initialize Smooth Scroll (Lenis) - only Lenis is lazy loaded, not GSAP
  useEffect(() => {
    let lenisInstance: any;
    let updateFunction: ((time: number) => void) | null = null;
    
    const initSmoothScroll = async () => {
      const Lenis = (await import('@studio-freight/lenis')).default;
      
      lenisInstance = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        smooth: true,
        smoothTouch: false,
      } as any);

      // Synchronize Lenis with GSAP ScrollTrigger
      lenisInstance.on('scroll', ScrollTrigger.update);
      
      // Use GSAP's ticker to drive Lenis animations
      updateFunction = (time: number) => {
        lenisInstance.raf(time * 1000);
      };
      
      gsap.ticker.add(updateFunction);
      gsap.ticker.lagSmoothing(0);
    };
    
    // Small delay for better FCP, but GSAP is already available
    const timeout = setTimeout(initSmoothScroll, 50);
    
    return () => {
      clearTimeout(timeout);
      if (updateFunction) {
        gsap.ticker.remove(updateFunction);
      }
      lenisInstance?.destroy();
    };
  }, []);

  return (
    <>
      <div className="noise-overlay" />

      {/* Privacy Policy Modal */}
      {isPrivacyOpen && <PrivacyPolicy onClose={() => setIsPrivacyOpen(false)} />}

      {/* Cookie Banner */}
      <CookieBanner onOpenPrivacy={() => setIsPrivacyOpen(true)} />

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
    </>
  );
};

export default App;

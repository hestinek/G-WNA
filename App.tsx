
import React, { useEffect, useState } from 'react';
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

const App: React.FC = () => {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  // Initialize Smooth Scroll (Lenis) with lazy loading
  useEffect(() => {
    let lenisInstance: any;
    
    const initSmoothScroll = async () => {
      const Lenis = (await import('@studio-freight/lenis')).default;
      const gsapModule = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      
      gsapModule.default.registerPlugin(ScrollTrigger);
      
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
      const update = (time: number) => {
        lenisInstance.raf(time * 1000);
      };
      
      gsapModule.default.ticker.add(update);
      gsapModule.default.ticker.lagSmoothing(0);
    };
    
    // Delay init slightly for better FCP
    const timeout = setTimeout(initSmoothScroll, 50);
    
    return () => {
      clearTimeout(timeout);
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

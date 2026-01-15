
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const subTextRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal Text Animation (Initial Load)
      const titleLines = textRef.current?.querySelectorAll('span.block');
      
      if (titleLines) {
        gsap.to(titleLines, {
          y: 0,
          stagger: 0.1,
          duration: 1.5,
          ease: 'power4.out',
          delay: 0.1 // Fast reveal without loader
        });
      }

      if (subTextRef.current) {
        gsap.to(subTextRef.current, {
          opacity: 1,
          duration: 1,
          delay: 0.3 // Fast reveal without loader
        });
      }

      // Parallax Effect - using y instead of yPercent for better control
      if (imgRef.current) {
        gsap.to(imgRef.current, {
          y: '30%',
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true
          }
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={containerRef} className="h-screen relative flex items-center justify-center overflow-hidden bg-stone-bg">
      {/* Image wrapper - allows parallax without conflicts */}
      <div className="absolute inset-0 overflow-hidden">
        <img 
          ref={imgRef}
          src="/plantacja-choinek-soldany-hero3.webp" 
          className="absolute top-0 left-0 w-full h-[130%] object-cover brightness-75"
          alt="Ośnieżone choinki"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </div>
      
      <div ref={textRef} className="relative z-10 text-center text-white mix-blend-difference pointer-events-none">
        <h1 className="font-display text-[12vw] leading-none overflow-hidden">
          <span className="block translate-y-full">PLANTACJA</span>
        </h1>
        <h1 className="font-display text-[12vw] leading-none overflow-hidden">
          <span className="block translate-y-full">SOLDANY</span>
        </h1>
        
        <p ref={subTextRef} className="mt-8 text-sm font-body uppercase tracking-[0.5em] opacity-0 mix-blend-difference">
          NATURA ● TRADYCJA ● JAKOŚĆ
        </p>
      </div>
    </section>
  );
};

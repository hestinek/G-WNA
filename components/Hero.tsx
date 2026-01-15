
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
      
      if (titleLines && titleLines.length > 0) {
        // Set initial state explicitly
        gsap.set(titleLines, { y: '100%' });
        
        // Animate to visible
        gsap.to(titleLines, {
          y: '0%',
          stagger: 0.15,
          duration: 1.2,
          ease: 'power4.out',
          delay: 0.2
        });
      }

      if (subTextRef.current) {
        // Set initial state
        gsap.set(subTextRef.current, { opacity: 0 });
        
        // Animate to visible
        gsap.to(subTextRef.current, {
          opacity: 1,
          duration: 1,
          delay: 0.6
        });
      }

      // Parallax Effect
      if (imgRef.current) {
        gsap.fromTo(imgRef.current, 
          { y: 0 },
          {
            y: '20%',
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: true
            }
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={containerRef} className="h-screen relative flex items-center justify-center overflow-hidden bg-stone-bg">
      {/* Image wrapper - absolute positioning with overflow hidden for parallax */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <img 
          ref={imgRef}
          src="/plantacja-choinek-soldany-hero3.webp" 
          className="w-full h-[120%] object-cover object-center brightness-75"
          alt="Ośnieżone choinki"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </div>
      
      <div ref={textRef} className="relative z-10 text-center text-white mix-blend-difference pointer-events-none">
        <h1 className="font-display text-[12vw] leading-none overflow-hidden">
          <span className="block">PLANTACJA</span>
        </h1>
        <h1 className="font-display text-[12vw] leading-none overflow-hidden">
          <span className="block">SOLDANY</span>
        </h1>
        
        <p ref={subTextRef} className="mt-8 text-sm font-body uppercase tracking-[0.5em] mix-blend-difference">
          NATURA ● TRADYCJA ● JAKOŚĆ
        </p>
      </div>
    </section>
  );
};

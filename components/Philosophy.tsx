
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const Philosophy: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Simple fade in for the text
      if (textRef.current) {
        gsap.from(textRef.current, {
          y: 30,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
          }
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="plantacja" ref={containerRef} className="py-24 md:py-32 bg-stone-bg text-center flex flex-col items-center justify-center relative z-10">
      <h2 className="font-display text-3xl md:text-5xl mb-8 text-dark">TRADYCJA I NATURA</h2>
      
      <div ref={textRef} className="max-w-3xl text-gray-600 font-light font-body mb-12 leading-relaxed px-6 text-base md:text-lg">
        Plantacja Choinek Soldany specjalizuje się w hodowli choinek, które tworzą atmosferę świąt. W naszej ofercie znajdziecie klasyczny świerk pospolity oraz dostojny świerk srebrny – każdy egzemplarz to efekt lat troskliwej uprawy. Zapraszamy do współpracy odbiorców hurtowych oraz klientów indywidualnych, którzy cenią drzewka prosto z plantacji, o niepowtarzalnym charakterze i świeżości.
      </div>
    </section>
  );
};

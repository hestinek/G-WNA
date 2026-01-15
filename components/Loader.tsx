import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface LoaderProps {
  onComplete: () => void;
}

export const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (loaderRef.current) {
            loaderRef.current.style.display = 'none';
          }
          onComplete();
        }
      });

      tl.to(barRef.current, {
        width: '100%',
        duration: 1.5,
        ease: 'power2.inOut'
      })
      .to(textRef.current, {
        y: -50,
        opacity: 0,
        duration: 0.5
      })
      .to(loaderRef.current, {
        yPercent: -100,
        duration: 1,
        ease: 'power4.inOut'
      });
    }, loaderRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div 
      ref={loaderRef}
      className="fixed inset-0 bg-black z-[10000] flex justify-center items-center text-white overflow-hidden px-6"
    >
      <div 
        ref={textRef}
        className="font-display text-[8vw] md:text-[5vw] font-bold tracking-tighter text-center max-w-[90vw] leading-tight"
      >
        PLANTACJA CHOINEK SOLDANY
      </div>
      <div 
        ref={barRef}
        className="absolute bottom-0 left-0 h-1 bg-white w-0"
      />
    </div>
  );
};
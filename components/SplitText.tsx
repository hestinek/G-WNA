import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface SplitTextProps {
  children: string;
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'div';
}

export const SplitText: React.FC<SplitTextProps> = ({ children, className = '', tag: Tag = 'div' }) => {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = elementRef.current?.querySelectorAll('.word-inner');
      
      if (words) {
        gsap.to(words, {
          y: "0%",
          duration: 1,
          ease: "power3.out",
          stagger: 0.02,
          scrollTrigger: {
            trigger: elementRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        });
      }
    }, elementRef);

    return () => ctx.revert();
  }, [children]);

  // Manual text splitting logic
  const words = children.split(' ').map((word, index) => (
    <span key={index} className="inline-block overflow-hidden align-top pb-[0.1em] mr-[0.2em]">
      <span className="word-inner inline-block translate-y-[110%]">
        {word}
      </span>
    </span>
  ));

  return (
    <Tag ref={elementRef as any} className={className}>
      {words}
    </Tag>
  );
};
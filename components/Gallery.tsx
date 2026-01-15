
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const galleryImages = [
  {
    id: 1,
    src: "/pole-choinek-plantacja-soldany.webp",
    alt: "Świerki pospolite na polu",
    className: "md:col-span-4 md:row-span-2 h-[400px] md:h-[600px]",
    speed: 0.5 // Slow parallax
  },
  {
    id: 2,
    src: "/choinka-swierka.webp",
    alt: "Detale choinki",
    className: "md:col-span-3 md:row-span-1 h-[300px] md:h-[400px] md:mt-20",
    speed: 1.2 // Fast parallax
  },
  {
    id: 3,
    src: "/choinka-z-bliska-plantacja.webp",
    alt: "Mglisty poranek na plantacji choinek",
    className: "md:col-span-5 md:row-span-2 h-[400px] md:h-[550px]",
    speed: 0.8 // Medium parallax
  },
  {
    id: 4,
    src: "/choinki-na-plantacji.webp",
    alt: "Gęste drzewka świerka",
    className: "md:col-span-3 md:row-span-1 h-[300px] md:h-[450px] md:-mt-32",
    speed: 1.5 // Very fast parallax
  },
  {
    id: 5,
    src: "/choinki-gizycko.webp",
    alt: "Świerk srebrny",
    className: "md:col-span-4 md:row-span-1 h-[300px] md:h-[400px] md:mt-12",
    speed: 0.6 // Slow
  },
  {
    id: 6,
    src: "/swierk-pospolity.webp",
    alt: "Rzędy choinek świątecznych na plantacji",
    className: "md:col-span-8 md:row-span-1 h-[300px] md:h-[400px] md:mt-12",
    speed: 0.9 // Medium
  }
];

export const Gallery: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial Reveal Animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        }
      });

      tl.from(".gallery-title", {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power4.out"
      })
      .from(imagesRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out"
      }, "-=0.5");

      // 2. Parallax Effect on Scroll
      imagesRef.current.forEach((img, i) => {
        if (!img) return;
        const speed = galleryImages[i].speed;
        
        gsap.to(img.querySelector('img'), {
          yPercent: 20 * speed,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="galeria" ref={containerRef} className="py-24 md:py-40 bg-dark text-stone-bg relative z-10 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6">
        
        {/* Header */}
        <div className="mb-24 md:mb-32 text-center md:text-left gallery-title">
            <div className="text-xs md:text-sm uppercase tracking-[0.3em] text-gray-300 mb-4 font-body">
              Atmosfera Świąt
            </div>
            <h2 className="font-display text-4xl md:text-7xl">
              GALERIA <span className="text-moss italic font-serif">PLANTACJI</span>
            </h2>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          {galleryImages.map((image, index) => (
            <div 
              key={image.id}
              ref={el => { imagesRef.current[index] = el }}
              className={`relative overflow-hidden rounded-sm group ${image.className}`}
            >
              {/* Overlay added here: 20% opacity black, fades out on hover */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
              
              <img 
                src={image.src} 
                alt={image.alt}
                className="w-full h-[120%] object-cover -translate-y-[10%] transition-transform duration-700 ease-out"
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

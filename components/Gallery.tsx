
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const galleryImages = [
  {
    id: 1,
    src: "https://xefkawtkizopjyvkymhd.supabase.co/storage/v1/object/sign/Strona/webp%20galeria%20strony/pole-choinek-plantacja-soldany.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81MGU3ZWQ4ZC1mZmVlLTQ5NTEtOThiNy0yZjZkYmYwOGRhNWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJTdHJvbmEvd2VicCBnYWxlcmlhIHN0cm9ueS9wb2xlLWNob2luZWstcGxhbnRhY2phLXNvbGRhbnkud2VicCIsImlhdCI6MTc2ODAwMjg2OSwiZXhwIjoyMjQxMDQyODY5fQ.v5BHG5ZdYmhS0h3Hy7Ki3NRR9z2FAR52oj0QawW3F40",
    alt: "Świerki pospolite na polu",
    className: "md:col-span-4 md:row-span-2 h-[400px] md:h-[600px]",
    speed: 0.5 // Slow parallax
  },
  {
    id: 2,
    src: "https://xefkawtkizopjyvkymhd.supabase.co/storage/v1/object/sign/Strona/webp%20galeria%20strony/choinka-swierka.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81MGU3ZWQ4ZC1mZmVlLTQ5NTEtOThiNy0yZjZkYmYwOGRhNWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJTdHJvbmEvd2VicCBnYWxlcmlhIHN0cm9ueS9jaG9pbmthLXN3aWVya2Eud2VicCIsImlhdCI6MTc2ODAwNzY2NiwiZXhwIjoyMjQxMDQ3NjY2fQ.YlgDt-bYj_lRr9J4HSvm09l4vSQd_Gp7pkYNtQpnT38",
    alt: "Detale choinki",
    className: "md:col-span-3 md:row-span-1 h-[300px] md:h-[400px] md:mt-20",
    speed: 1.2 // Fast parallax
  },
  {
    id: 3,
    src: "https://xefkawtkizopjyvkymhd.supabase.co/storage/v1/object/sign/Strona/webp%20galeria%20strony/choinka-z-bliska-plantacja.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81MGU3ZWQ4ZC1mZmVlLTQ5NTEtOThiNy0yZjZkYmYwOGRhNWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJTdHJvbmEvd2VicCBnYWxlcmlhIHN0cm9ueS9jaG9pbmthLXotYmxpc2thLXBsYW50YWNqYS53ZWJwIiwiaWF0IjoxNzY4MDA3NjEyLCJleHAiOjIyNDEwNDc2MTJ9.CD7myzgJWlwhdhR-WmV88UGXJzJnfzJAVxZ2Dg8GKAg",
    alt: "Mglisty poranek na plantacji choinek",
    className: "md:col-span-5 md:row-span-2 h-[400px] md:h-[550px]",
    speed: 0.8 // Medium parallax
  },
  {
    id: 4,
    src: "https://xefkawtkizopjyvkymhd.supabase.co/storage/v1/object/sign/Strona/webp%20galeria%20strony/choinki-na-plantacji.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81MGU3ZWQ4ZC1mZmVlLTQ5NTEtOThiNy0yZjZkYmYwOGRhNWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJTdHJvbmEvd2VicCBnYWxlcmlhIHN0cm9ueS9jaG9pbmtpLW5hLXBsYW50YWNqaS53ZWJwIiwiaWF0IjoxNzY4MDAyOTM0LCJleHAiOjIyNDEwNDI5MzR9.tH7HfmWoGmeDejnQk6cq3qIumUvpD6NRhUg2oDzAc18",
    alt: "Gęste drzewka świerka",
    className: "md:col-span-3 md:row-span-1 h-[300px] md:h-[450px] md:-mt-32",
    speed: 1.5 // Very fast parallax
  },
  {
    id: 5,
    src: "https://xefkawtkizopjyvkymhd.supabase.co/storage/v1/object/sign/Strona/webp%20galeria%20strony/choinki-gizycko.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81MGU3ZWQ4ZC1mZmVlLTQ5NTEtOThiNy0yZjZkYmYwOGRhNWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJTdHJvbmEvd2VicCBnYWxlcmlhIHN0cm9ueS9jaG9pbmtpLWdpenlja28ud2VicCIsImlhdCI6MTc2ODAwMjk1OCwiZXhwIjoyMjQxMDQyOTU4fQ.a0EEMI-LbzEK1t3TaRdskiKT0fRdY8hLvoZdWgmTQHk",
    alt: "Świerk srebrny",
    className: "md:col-span-4 md:row-span-1 h-[300px] md:h-[400px] md:mt-12",
    speed: 0.6 // Slow
  },
  {
    id: 6,
    src: "https://xefkawtkizopjyvkymhd.supabase.co/storage/v1/object/sign/Strona/webp%20galeria%20strony/swierk-pospolity-choinki-gizycko.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81MGU3ZWQ4ZC1mZmVlLTQ5NTEtOThiNy0yZjZkYmYwOGRhNWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJTdHJvbmEvd2VicCBnYWxlcmlhIHN0cm9ueS9zd2llcmstcG9zcG9saXR5LWNob2lua2ktZ2l6eWNrby53ZWJwIiwiaWF0IjoxNzY4MDQzMDQ4LCJleHAiOjIyNDEwODMwNDh9.PYtfgsHARsO4s--bmxl1hKQHck5onQQiv2P3Pz9c7mI",
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
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};


import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface FooterProps {
  onOpenPrivacy: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacy }) => {
  const footerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Subtle reveal effect for footer content
      gsap.from(contentRef.current, {
        y: -30,
        opacity: 0.8,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top bottom', 
          end: 'bottom bottom',
          scrub: true
        }
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer 
      id="kontakt"
      ref={footerRef}
      className="fixed bottom-0 left-0 w-full min-h-screen z-0 bg-[#080808] text-white flex flex-col"
    >
      {/* Background Texture - Reverted to clearer view */}
      <div className="absolute inset-0 z-0">
         <img 
            src="/plantacja-choinek-soldany-hero2.webp"
            className="w-full h-full object-cover brightness-50"
            alt="choinki świerka ośnieżone"
            loading="lazy"
            decoding="async"
         />
         <div className="absolute inset-0 bg-black/20" />
      </div>

      <div ref={contentRef} className="relative z-10 w-full max-w-[1600px] mx-auto px-4 md:px-12 py-6 md:py-12 flex flex-col justify-between min-h-screen">
        
        {/* Top Spacer - mniejszy na mobile */}
        <div className="flex-none h-8 md:h-24" />

        {/* Center CTA - ZADZWOŃ TERAZ */}
        <div className="flex-1 flex flex-col items-center justify-center py-4 md:py-0">
            
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 md:gap-3 border border-white/10 rounded-full pl-2 pr-3 md:pr-5 py-1.5 md:py-2 mb-4 md:mb-12 bg-white/5 backdrop-blur-md transition-all hover:bg-white/10 group cursor-default">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-[8px] md:text-xs uppercase tracking-[0.15em] md:tracking-[0.2em] font-body text-gray-300">Przyjmujemy zamówienia na 2026</span>
            </div>
            
            {/* Main Text Link - mniejszy na mobile */}
            <a href="tel:+48796214778" className="group text-center block relative">
                <h2 className="font-display text-[12vw] md:text-[13vw] leading-[0.85] tracking-tighter text-white transition-all duration-500 group-hover:text-gray-300">
                    ZADZWOŃ<br />TERAZ
                </h2>
                {/* Hover arrow decoration - tylko desktop */}
                <div className="absolute top-1/2 left-full -translate-y-1/2 ml-8 opacity-0 -translate-x-10 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 hidden md:block">
                     <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="stroke-white rotate-[-45deg]"><path d="M7 17L17 7M17 7H7M17 7V17" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
            </a>
        </div>

        {/* Bottom Columns - responsywny layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 md:gap-y-12 gap-x-4 md:gap-x-8 border-t border-white/10 pt-6 md:pt-16 mt-4 md:mt-8 pb-4 md:pb-0">
            
            {/* MEDIA */}
            <div className="flex flex-col items-start">
                <h4 className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-gray-300 mb-3 md:mb-6 font-body font-bold">Media</h4>
                <ul className="flex flex-col gap-2 md:gap-4 text-xs md:text-sm font-body font-light text-gray-300">
                    <li>
                        <a href="https://www.instagram.com/plantacja.soldany/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors group">
                           <span className="w-1 h-1 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity"/>
                           Instagram
                        </a>
                    </li>
                    <li>
                        <a href="https://www.facebook.com/plantacjasoldany/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors group">
                           <span className="w-1 h-1 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity"/>
                           Facebook
                        </a>
                    </li>
                </ul>
            </div>

            {/* ADRES */}
            <div className="flex flex-col items-start">
                <h4 className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-gray-300 mb-3 md:mb-6 font-body font-bold">Adres</h4>
                <address className="not-italic text-xs md:text-sm font-body font-light text-gray-300 flex flex-col gap-0.5 md:gap-1 mb-2 md:mb-4">
                    <p>Plantacja Choinek Soldany</p>
                    <p>Sołdany 28</p>
                    <p>11-500 Giżycko</p>
                </address>
                <a 
                    href="https://www.google.com/maps/search/?api=1&query=Sołdany+28+11-500+Giżycko" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[9px] md:text-[10px] uppercase tracking-widest text-white border-b border-white/30 hover:border-white pb-1 transition-all group"
                >
                    Wyznacz trasę
                    <svg className="w-3 h-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
                </a>
            </div>

            {/* KONTAKT */}
            <div className="flex flex-col items-start">
                <h4 className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-gray-300 mb-3 md:mb-6 font-body font-bold">Kontakt</h4>
                <ul className="flex flex-col gap-1 md:gap-2 text-xs md:text-sm font-body font-light text-gray-300">
                    <li>
                        <a href="mailto:plantacjasoldany@gmail.com" className="hover:text-white transition-colors break-all">plantacjasoldany@gmail.com</a>
                    </li>
                    <li>
                        <a href="tel:+48796214778" className="hover:text-white transition-colors">+48 796 214 778</a>
                    </li>
                </ul>
            </div>

            {/* COPYRIGHT */}
            <div className="flex flex-col justify-between h-full">
                 <h4 className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-gray-300 font-body font-bold">© 2026</h4>
                 <div className="mt-2 md:mt-0 flex flex-col gap-1 md:gap-2">
                     <div className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-gray-300 font-body hover:text-gray-500 transition-colors cursor-default">
                        Plantacja Choinek Soldany
                     </div>
                     <button 
                        onClick={onOpenPrivacy}
                        className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-gray-300 font-body hover:text-white transition-colors text-left"
                     >
                        Polityka Prywatności
                     </button>
                     <div className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-body mt-1 shiny-text">
                        Designed by Hestin
                     </div>
                 </div>
            </div>
        </div>
      </div>
    </footer>
  );
};

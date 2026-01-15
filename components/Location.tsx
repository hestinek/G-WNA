
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const Location: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // Info Column Animation
      gsap.from(infoRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        }
      });

      // Map Reveal Animation
      gsap.from(mapRef.current, {
        scale: 0.95,
        opacity: 0,
        filter: "blur(10px)",
        duration: 1.2,
        delay: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="dojazd" ref={containerRef} className="py-24 md:py-32 bg-stone-bg text-dark relative z-10 border-b border-black/5">
      <div className="max-w-[1600px] mx-auto px-6 grid md:grid-cols-2 gap-12 md:gap-24 items-center">
        
        {/* Text Info */}
        <div ref={infoRef} className="order-1 md:order-1">
          <div className="text-m uppercase tracking-[0.3em] text-gray-500 mb-6 font-body font-bold">
            Nawigacja
          </div>
          <h2 className="font-display text-4xl md:text-6xl mb-8 leading-tight">
            JAK DO NAS<br />DOJECHAĆ?
          </h2>
          
          <div className="space-y-8 font-body font-light text-gray-700 text-lg">
            <p>
              Nasza plantacja znajduje się w mazurskiej miejscowości Sołdany, zaledwie kilkanaście minut drogi od Giżycka. To idealne miejsce na rodzinną wycieczkę po wymarzone drzewko.
            </p>
            
            <div className="border-l-2 border-moss pl-6 py-2">
              <h4 className="font-bold text-dark uppercase tracking-widest text-sm mb-2">Adres</h4>
              <p>Plantacja Choinek Soldany</p>
              <p>Sołdany 28</p>
              <p>11-500 Giżycko</p>
            </div>

            <div className="border-l-2 border-moss pl-6 py-2">
              <h4 className="font-bold text-dark uppercase tracking-widest text-sm mb-2">Godziny otwarcia</h4>
              <p>Poniedziałek - Piątek: 09:00 - 16:00</p>
              <p>Sobota - Niedziela: 09:00 - 16:00</p>
              <p className="text-sm text-gray-500 mt-1">(W sezonie świątecznym)</p>
            </div>
          </div>

          <div className="flex flex-col items-start gap-4 mt-12">
            <a 
              href="https://www.google.com/maps/dir//Plantacja+Choinek+Soldany,+So%C5%82dany+28,+11-500+Gi%C5%BCycko"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-dark text-stone-bg text-sm uppercase tracking-widest hover:bg-moss transition-colors duration-300 mb-2"
            >
              <span>Nawiguj do plantacji</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"></polygon></svg>
            </a>

            <a href="tel:+48796214778" className="flex items-center gap-2 text-gray-500 border border-gray-500 rounded-full px-4 py-2 w-fit hover:bg-gray-200 transition-colors">
                <div className="relative flex w-3.5 h-3.5 items-center justify-center">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping duration-300"></span>
                    <span className="relative inline-flex w-2 h-2 rounded-full bg-green-600"></span>
                </div>
                <span>Zadzwoń +48 796 214 778</span>
            </a>

            <a href="mailto:plantacjasoldany@gmail.com" className="flex items-center gap-2 text-gray-500 border border-gray-500 rounded-full px-4 py-2 w-fit hover:bg-gray-200 transition-colors">
                <div className="relative flex w-3.5 h-3.5 items-center justify-center">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping duration-300"></span>
                    <span className="relative inline-flex w-2 h-2 rounded-full bg-green-600"></span>
                </div>
                <span>Napisz plantacjasoldany@gmail.com</span>
            </a>
          </div>
        </div>

        {/* Interactive Map */}
        <div ref={mapRef} className="order-2 md:order-2 h-[400px] md:h-[600px] w-full relative bg-gray-200 overflow-hidden shadow-2xl">
          {/* Transparent border overlay */}
          <div className="absolute inset-0 pointer-events-none z-10 border border-black/10"></div>
          
          <iframe 
            src="https://maps.google.com/maps?q=So%C5%82dany+28%2C+11-500+Gi%C5%BCycko&t=&z=11&ie=UTF8&iwloc=&output=embed"
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Mapa dojazdu Sołdany 28"
            className="w-full h-full"
          ></iframe>
        </div>

      </div>
    </section>
  );
};

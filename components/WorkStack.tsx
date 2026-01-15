
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Project } from '../types';

const projects: Project[] = [
  {
    id: 1,
    title: "ŚWIERK POSPOLITY",
    location: "PICEA ABIES",
    description: "Klasyczny zapach lasu. Symbol tradycyjnych świąt, charakteryzujący się stożkowym pokrojem i przyjemnym, żywicznym aromatem.",
    imageUrl: "https://xefkawtkizopjyvkymhd.supabase.co/storage/v1/object/sign/Strona/work%20stacks/swierk-pospolity-picea-abies.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81MGU3ZWQ4ZC1mZmVlLTQ5NTEtOThiNy0yZjZkYmYwOGRhNWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJTdHJvbmEvd29yayBzdGFja3Mvc3dpZXJrLXBvc3BvbGl0eS1waWNlYS1hYmllcy53ZWJwIiwiaWF0IjoxNzY3OTc5NDk0LCJleHAiOjIyNDEwMTk0OTR9.Tkj9DQ1L0DYFknJW9EW1vXn_Fsa-8y4j6i-Dp5dllZU"
  },
  {
    id: 2,
    title: "ŚWIERK SREBRNY",
    location: "PICEA PUNGENS",
    description: "Szlachetna barwa, sztywne igły, doskonała trwałość. Wyjątkowo odporny, o pięknym srebrzysto-niebieskim wybarwieniu igieł.",
    imageUrl: "https://xefkawtkizopjyvkymhd.supabase.co/storage/v1/object/sign/Strona/work%20stacks/swierk-srebrny-picea-pungens.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81MGU3ZWQ4ZC1mZmVlLTQ5NTEtOThiNy0yZjZkYmYwOGRhNWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJTdHJvbmEvd29yayBzdGFja3Mvc3dpZXJrLXNyZWJybnktcGljZWEtcHVuZ2Vucy53ZWJwIiwiaWF0IjoxNzY3OTc5NTM2LCJleHAiOjIyNDEwMTk1MzZ9.EQl7W2aeYqEpFDgQdr0DYEaoQDdm9rD6Hj-YmcqZg58"
  },
  {
    id: 3,
    title: "ŚWIERK W DONICY",
    location: "PICEA ABIES/PICEA PUNGENS",
    description: "Żywe drzewka z systemem korzeniowym, gotowe do posadzenia. Ekologiczny wybór pozwalający cieszyć się drzewkiem przez lata.",
    imageUrl: "https://xefkawtkizopjyvkymhd.supabase.co/storage/v1/object/sign/Strona/work%20stacks/choinki-w-donicy.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81MGU3ZWQ4ZC1mZmVlLTQ5NTEtOThiNy0yZjZkYmYwOGRhNWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJTdHJvbmEvd29yayBzdGFja3MvY2hvaW5raS13LWRvbmljeS53ZWJwIiwiaWF0IjoxNzY3OTc5NTYxLCJleHAiOjIyNDEwMTk1NjF9.gVkerXmvZi8NuOZnXu9KjqR3iev3qudp1Y_rqKUHMBo"
  }
];

export const WorkStack: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const offersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Stack Logic: As the next card scrolls into view, the previous card (current) scales down and fades
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        
        const nextCard = cardsRef.current[i + 1];
        if (nextCard) {
          gsap.to(card.querySelector('.card-inner'), {
            scale: 0.9,
            opacity: 0.4,
            ease: "none",
            scrollTrigger: {
              trigger: nextCard,
              start: "top bottom", // When top of next card hits bottom of viewport
              end: "top 10vh",     // When top of next card hits the sticky position
              scrub: true
            }
          });
        }
      });

      // 2. Offers Animation
      const offerCards = offersRef.current?.querySelectorAll('.offer-card');
      if (offerCards) {
        gsap.fromTo(offerCards, 
          { 
            y: 50, 
            opacity: 0 
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: offersRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="choinki" className="py-[10vh] bg-dark text-stone-bg relative" ref={containerRef}>
      <div className="text-center mb-20 px-6">
        <div className="text-2xl font-body uppercase tracking-widest mb-4 opacity-50">OFERTA</div>
        <h2 className="font-display text-5xl md:text-7xl">NASZE DRZEWKA</h2>
      </div>

      {/* STACK CARDS */}
      <div className="w-full max-w-[1400px] mx-auto pb-[10vh]">
        {projects.map((project, index) => (
          <div 
            key={project.id}
            ref={(el) => { cardsRef.current[index] = el; }}
            className="sticky top-[10vh] h-[80vh] w-full flex items-center justify-center mb-[5vh]"
          >
            <div className="card-inner w-[90%] h-full bg-[#1a1a1a] border border-white/10 relative overflow-hidden grid grid-rows-[50%_1fr] md:grid-rows-1 grid-cols-1 md:grid-cols-[1fr_1.2fr] shadow-2xl group">
              
              {/* Content Side */}
              <div className={`px-6 pt-6 ${project.id === 2 ? 'pb-6' : 'pb-12'} md:p-16 flex flex-col gap-4 md:gap-0 bg-[#1a1a1a] z-10 order-2 md:order-1`}>
                <div>
                  <div className="text-4xl md:text-5xl font-display mb-1 md:mb-2 text-stone-bg opacity-30">0{project.id}</div>
                  <h3 className="text-2xl md:text-4xl font-bold font-body">{project.title}</h3>
                  <p className="text-xs md:text-sm mt-1 md:mt-4 opacity-70 uppercase tracking-widest font-body">{project.location}</p>
                </div>
                
                <div className="flex-1 flex items-center text-stone-bg opacity-70 text-base md:text-xl font-light font-body leading-relaxed">
                  {project.description}
                </div>
                
                <div>
                    {project.id === 1 && (
                        <div className="flex gap-2">
                            <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] uppercase tracking-wider font-medium text-stone-bg">Klasyka</span>
                            <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] uppercase tracking-wider font-medium text-stone-bg">Zapach</span>
                        </div>
                    )}
                    {project.id === 2 && (
                        <div className="flex gap-2">
                            <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] uppercase tracking-wider font-medium text-stone-bg">Elegancja</span>
                            <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] uppercase tracking-wider font-medium text-stone-bg">Trwałość</span>
                        </div>
                    )}
                    {project.id === 3 && (
                        <div className="flex gap-2">
                            <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] uppercase tracking-wider font-medium text-stone-bg">Ekologia</span>
                            <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] uppercase tracking-wider font-medium text-stone-bg">Natura</span>
                        </div>
                    )}
                </div>
              </div>

              {/* Image Side */}
              <div className="relative w-full h-full overflow-hidden order-1 md:order-2">
                <img 
                  src={project.imageUrl} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                />
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* MOVED OFFER CARDS */}
      <div className="w-full max-w-[1400px] mx-auto px-6 pb-24 mt-20 md:mt-32">
        <h3 className="text-center font-display text-2xl md:text-4xl mb-12 md:mb-16">SZCZEGÓŁY WSPÓŁPRACY</h3>
        
        <div ref={offersRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          
          {/* Wholesale Card */}
          <div className="offer-card bg-[#1a1a1a] rounded-sm p-8 md:p-12 border border-white/10 shadow-2xl relative overflow-hidden group hover:border-blue-900/50 transition-colors duration-500">
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-900/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

              <div className="w-12 h-12 bg-[#252f3e] rounded-sm flex items-center justify-center mb-8 text-blue-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold font-body text-white mb-4">
                  Oferta <span className="text-blue-400">Hurtowa</span>
              </h3>
              
              <p className="text-gray-400 text-sm leading-relaxed mb-8">
                  Współpracujemy z centrami ogrodniczymi, marketami i stoiskami sezonowymi w całej Polsce. Oferujemy atrakcyjne rabaty przy większych zamówieniach.
              </p>
              
              <ul className="space-y-4">
                  <li className="flex items-start gap-3 text-gray-300 text-sm">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 shrink-0" />
                      <span>Brak minimum logistycznego</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-300 text-sm">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 shrink-0" />
                      <span>Znakowanie drzewek etykietami</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-300 text-sm">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 shrink-0" />
                      <span>Siatkowanie choinek autorską maszyną</span>
                  </li>
              </ul>
          </div>

          {/* Retail Card */}
          <div className="offer-card bg-[#1a1a1a] rounded-sm p-8 md:p-12 border border-white/10 shadow-2xl relative overflow-hidden group hover:border-emerald-900/50 transition-colors duration-500">
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-900/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

              <div className="w-12 h-12 bg-[#1f2e25] rounded-sm flex items-center justify-center mb-8 text-emerald-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 12 15 22"></polyline></svg>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold font-body text-white mb-4">
                  Oferta <span className="text-emerald-500">Detaliczna</span>
              </h3>
              
              <p className="text-gray-400 text-sm leading-relaxed mb-8">
                  Zapraszamy całe rodziny na naszą plantację! Wybierzcie wspólnie swoje wymarzone drzewko prosto z pola. Zapewniamy pomoc w wycięciu i pakowaniu.
              </p>
              
              <ul className="space-y-4">
                  <li className="flex items-start gap-3 text-gray-300 text-sm">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 shrink-0" />
                      <span>Wybór drzewka bezpośrednio na polu</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-300 text-sm">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 shrink-0" />
                      <span>Pakowanie w siatkę</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-300 text-sm">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 shrink-0" />
                      <span>Ognisko na miejscu</span>
                  </li>
              </ul>
          </div>

        </div>
      </div>
    </section>
  );
};

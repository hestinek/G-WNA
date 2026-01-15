
import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside logic could be added here if needed
  
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    
    // Close mobile menu if open
    if (isOpen) {
      toggleMenu();
    }

    // Special handling for contact section
    if (id === '#kontakt') {
      // Small delay to allow menu to close visually first
      setTimeout(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth'
        });
      }, 300);
      return;
    }

    const element = document.querySelector(id);
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (isOpen && menuRef.current) {
        // iOS-like spring animation
        gsap.fromTo(menuRef.current, 
          { opacity: 0, scale: 0.9, y: -20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "back.out(1.2)" }
        );
      }
    }); // Scope to document.body or null since portal is outside

    return () => ctx.revert();
  }, [isOpen]);

  // Icons as components for cleaner render
  const Icons = {
    Home: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
    ),
    Tree: () => (
      <span className="material-symbols-outlined text-[20px]">forest</span>
    ),
    Sprout: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.2.4-4.8-.4-1.2-.6-1.6-1.4-1.3-2.5.3-1.5 2.4-2.6 3.8-.8Z"/><path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.5-4.6-.1-2.4-1.7-3.5-2.9-2.2-.6.7-1.2 1.5-1.8 4.2Z"/></svg>
    ),
    Image: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
    ),
    MapPin: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
    ),
    Phone: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
    )
  };

  const navItems = [
    { label: 'STRONA GŁÓWNA', id: '#hero', icon: Icons.Home },
    { label: 'CHOINKI', id: '#choinki', icon: Icons.Tree },
    { label: 'PLANTACJA', id: '#plantacja', icon: Icons.Sprout },
    { label: 'GALERIA', id: '#galeria', icon: Icons.Image },
    { label: 'JAK DOJECHAĆ', id: '#dojazd', icon: Icons.MapPin },
    { label: 'KONTAKT', id: '#kontakt', icon: Icons.Phone },
  ];

  return (
    <>
      <nav className="fixed top-0 w-full p-6 md:p-8 z-50 mix-blend-difference text-white">
        <div className="flex justify-between items-center w-full">
          <a 
            href="#hero" 
            onClick={(e) => scrollToSection(e, '#hero')}
            className="font-display font-bold text-lg md:text-xl tracking-tighter cursor-pointer relative z-50"
          >
            PLANTACJA SOLDANY
          </a>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex gap-10 items-center text-xs uppercase tracking-widest font-body">
            <a href="#choinki" onClick={(e) => scrollToSection(e, '#choinki')} className="hover:text-gray-300 transition-colors">CHOINKI</a>
            <a href="#plantacja" onClick={(e) => scrollToSection(e, '#plantacja')} className="hover:text-gray-300 transition-colors">PLANTACJA</a>
            <a href="#galeria" onClick={(e) => scrollToSection(e, '#galeria')} className="hover:text-gray-300 transition-colors">GALERIA</a>
            <a href="#dojazd" onClick={(e) => scrollToSection(e, '#dojazd')} className="hover:text-gray-300 transition-colors">JAK DOJECHAĆ</a>
            
            {/* Animated Contact Button */}
            <a 
              href="#kontakt" 
              onClick={(e) => scrollToSection(e, '#kontakt')}
              className="relative z-0 overflow-hidden p-[2px] flex items-center justify-center rounded-full transition-transform duration-300 hover:scale-105 active:scale-100 group"
            >
              {/* Rotating Glow Effect */}
              <div className="absolute inset-[-100%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#0000_0%,#FFFFFF_50%,#0000_100%)] blur-[4px]" />
              
              {/* Inner Button Background */}
              <span className="px-6 py-2 bg-black/90 backdrop-blur-sm rounded-full text-xs uppercase tracking-widest text-white relative z-10 group-hover:bg-black/80 transition-colors">
                KONTAKT
              </span>
            </a>
          </div>
          
          {/* Mobile Hamburger Toggle */}
          <button 
            className="md:hidden flex flex-col justify-center gap-1.5 w-8 h-8 relative z-50 focus:outline-none"
            onClick={toggleMenu}
          >
            <span className={`block w-full h-0.5 bg-white transition-all duration-300 ease-out ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-full h-0.5 bg-white transition-all duration-300 ease-out ${isOpen ? 'opacity-0 translate-x-4' : ''}`} />
            <span className={`block w-full h-0.5 bg-white transition-all duration-300 ease-out ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu - Portaled to document.body to avoid mix-blend-difference inheritance */}
      {isOpen && createPortal(
        <div 
          ref={menuRef}
          className="fixed top-[80px] left-3 right-3 z-[60] p-3 rounded-[32px] bg-stone-900/40 backdrop-blur-3xl border border-white/10 shadow-2xl md:hidden overflow-hidden"
        >
           <nav className="flex flex-col gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.id}
                    onClick={(e) => scrollToSection(e, item.id)}
                    className="flex items-center gap-4 px-5 py-4 rounded-2xl bg-[#262626] border border-white/5 transition-all duration-200 active:bg-[#333] active:scale-[0.98]"
                  >
                    <span className="text-white drop-shadow-md">
                      <Icon />
                    </span>
                    <span className="text-white font-display text-sm tracking-widest font-bold drop-shadow-md">
                      {item.label}
                    </span>
                    
                    {/* Circle Indicator */}
                    <div className="ml-auto w-2 h-2 rounded-full bg-white/50"></div>
                  </a>
                )
              })}
           </nav>
        </div>,
        document.body
      )}
    </>
  );
};


import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';
import SearchBar from './SearchBar';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleParallax = () => {
      if (!heroRef.current) return;
      const scrollY = window.scrollY;
      const parallaxSpeed = 0.5;
      
      heroRef.current.style.transform = `translateY(${scrollY * parallaxSpeed}px)`;
    };
    
    window.addEventListener('scroll', handleParallax);
    return () => window.removeEventListener('scroll', handleParallax);
  }, []);

  return (
    <div className="relative h-[90vh] min-h-[600px] overflow-hidden bg-gradient-to-b from-white to-resto-50">
      {/* Background image with parallax effect */}
      <div
        ref={heroRef}
        className="absolute inset-0 z-0 opacity-[0.15]"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2274&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center px-6">
        <div className="max-w-3xl text-center">
          <h1 className="animate-slideDown text-4xl font-bold tracking-tight text-resto-900 sm:text-5xl md:text-6xl">
            Découvrez les meilleurs restaurants<br />
            <span className="mt-2 block text-resto-accent">près de chez vous</span>
          </h1>
          
          <p className="animation-delay-150 animate-slideDown mt-6 max-w-2xl text-lg text-resto-600">
            Trouvez facilement des restaurants selon vos goûts, réservez une table et partagez votre expérience avec la communauté.
          </p>
          
          <div className="animation-delay-300 animate-slideDown mt-10">
            <SearchBar />
          </div>
          
          <div className="animation-delay-450 animate-fadeIn mt-10 flex flex-wrap items-center justify-center gap-4 text-sm text-resto-500">
            <div className="flex items-center gap-1">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-resto-300"></span>
              <span>Plus de 1500 restaurants</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-resto-300"></span>
              <span>Réservation instantanée</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-resto-300"></span>
              <span>Avis vérifiés</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom gradient shadow */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-resto-50 to-transparent"></div>
    </div>
  );
};

export default Hero;

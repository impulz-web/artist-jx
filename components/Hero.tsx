
import React from 'react';
import { Play, Calendar, Music } from 'lucide-react';
import { ARTIST_NAME, ARTIST_TAGLINE } from '../constants';
import { Event } from '../types';

interface HeroProps {
  heroImage: string;
  onScrollTo: (sectionId: string) => void;
  onListenClick: () => void;
  hotEvent?: Event;
}

const Hero: React.FC<HeroProps> = ({ heroImage, onScrollTo, onListenClick, hotEvent }) => {
  return (
    <section id="hero" className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image/Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Artist Background" 
          className="w-full h-full object-cover transition-opacity duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent"></div>
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 flex flex-col items-start justify-center h-full">
        <h2 className="text-gold-500 font-display tracking-[0.3em] uppercase text-sm md:text-lg mb-4 animate-fade-in-up">
          {ARTIST_TAGLINE}
        </h2>
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold font-display text-white uppercase tracking-tighter mb-8 leading-none drop-shadow-2xl">
          {ARTIST_NAME}
        </h1>
        
        <div className="flex flex-col md:flex-row gap-6 mt-4">
          <button 
            onClick={onListenClick}
            className="group flex items-center gap-3 bg-white text-black px-8 py-4 uppercase font-bold tracking-wider hover:bg-gold-500 transition-all duration-300"
          >
            <Play size={18} fill="currentColor" />
            Listen Now
          </button>
          
          <button 
            onClick={() => onScrollTo('bookings')}
            className="flex items-center gap-3 border border-white/30 backdrop-blur-sm text-white px-8 py-4 uppercase font-bold tracking-wider hover:bg-white/10 hover:border-white transition-all duration-300"
          >
            <Music size={18} />
            Book Artist
          </button>

          <button 
             onClick={() => onScrollTo('events')}
             className="flex items-center gap-3 border border-transparent text-white/70 hover:text-white px-8 py-4 uppercase font-bold tracking-wider transition-all duration-300"
          >
            <Calendar size={18} />
            Tour Dates
          </button>
        </div>
      </div>



      {/* Scroll Indicator */}
      {!hotEvent && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/50">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
        </div>
      )}
    </section>
  );
};

export default Hero;


import React from 'react';
import { Play, Calendar, Music, Flame, Ticket, ArrowRight } from 'lucide-react';
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
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
        <div className="absolute inset-0 bg-black/40"></div>
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

      {/* HOT EVENT ADVERT (Premium Section) */}
      {hotEvent && (
        <div className="absolute bottom-0 right-0 md:bottom-12 md:right-12 z-20 w-full md:w-96 animate-fade-in-up">
           <div className="bg-black/60 backdrop-blur-xl border-t-4 border-gold-500 p-6 shadow-2xl relative overflow-hidden group">
              {/* Animated Glow effect */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gold-500/20 blur-[50px] rounded-full group-hover:bg-gold-500/30 transition-all duration-500"></div>
              
              <div className="flex justify-between items-start mb-4 relative z-10">
                  <div className="flex items-center gap-2 text-gold-500 font-bold uppercase tracking-widest text-xs animate-pulse">
                      <Flame size={14} fill="currentColor" /> Trending Event
                  </div>
                  <span className="text-white/50 text-xs uppercase font-bold">{new Date(hotEvent.date).toLocaleDateString()}</span>
              </div>

              <h3 className="text-2xl font-display font-bold text-white uppercase leading-none mb-1">{hotEvent.title}</h3>
              <p className="text-neutral-400 text-sm mb-4 uppercase tracking-wider">{hotEvent.city} • {hotEvent.venue}</p>

              <div className="flex items-center justify-between mt-6">
                 <div>
                    <span className="block text-xs text-neutral-500 uppercase">Tickets Starting</span>
                    <span className="text-xl font-bold text-white">${hotEvent.price}</span>
                 </div>
                 <button 
                    onClick={() => onScrollTo('events')}
                    className="flex items-center gap-2 bg-gold-500 text-black px-6 py-3 uppercase font-bold text-sm tracking-wider hover:bg-white transition-colors"
                 >
                    Get Tickets <ArrowRight size={16} />
                 </button>
              </div>
           </div>
        </div>
      )}

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

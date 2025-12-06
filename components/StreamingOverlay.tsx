
import React from 'react';
import { StreamingLink } from '../types';
import { X, Play, Music, Youtube, ExternalLink } from 'lucide-react';
import { ARTIST_NAME } from '../constants';

interface StreamingOverlayProps {
  links: StreamingLink[];
  onClose: () => void;
}

const StreamingOverlay: React.FC<StreamingOverlayProps> = ({ links, onClose }) => {
  const getIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'spotify': return <Play size={20} fill="currentColor" />;
      case 'youtube': return <Youtube size={20} />;
      case 'apple music': return <Music size={20} />;
      default: return <ExternalLink size={20} />;
    }
  };

  const getColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'spotify': return 'hover:bg-[#1DB954] hover:text-black border-[#1DB954] text-[#1DB954]';
      case 'youtube': return 'hover:bg-[#FF0000] hover:text-white border-[#FF0000] text-[#FF0000]';
      case 'apple music': return 'hover:bg-[#FA243C] hover:text-white border-[#FA243C] text-[#FA243C]';
      case 'soundcloud': return 'hover:bg-[#FF5500] hover:text-white border-[#FF5500] text-[#FF5500]';
      default: return 'hover:bg-white hover:text-black border-white text-white';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl animate-fade-in-up">
      <button onClick={onClose} className="absolute top-8 right-8 text-neutral-500 hover:text-white transition-colors">
        <X size={32} />
      </button>

      <div className="container max-w-lg mx-auto px-6 text-center">
        <div className="mb-12">
            <h2 className="text-5xl md:text-6xl font-display font-bold text-white uppercase tracking-tighter mb-4">{ARTIST_NAME}</h2>
            <p className="text-gold-500 text-xs uppercase tracking-[0.3em]">Listen Everywhere</p>
        </div>

        <div className="space-y-4">
          {links.map((link) => (
            <a 
              key={link.id} 
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-between px-6 py-5 border bg-black/50 transition-all duration-300 group ${getColor(link.platform)}`}
            >
              <div className="flex items-center gap-4">
                {getIcon(link.platform)}
                <span className="font-bold uppercase tracking-widest text-sm text-white group-hover:text-inherit">{link.label || link.platform}</span>
              </div>
              <span className="text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Play</span>
            </a>
          ))}
          {links.length === 0 && (
             <p className="text-neutral-500 italic">No streaming links configured yet.</p>
          )}
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
           <p className="text-neutral-500 text-xs">Select your preferred music service</p>
        </div>
      </div>
    </div>
  );
};

export default StreamingOverlay;

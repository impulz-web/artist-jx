import React from 'react';
import { ARTIST_NAME, ARTIST_TAGLINE } from '../constants';
import { Instagram, Twitter, Youtube, Mail, Lock } from 'lucide-react';

interface FooterProps {
  onAdminClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onAdminClick }) => {
  return (
    <footer className="bg-black py-16 border-t border-neutral-900">
      <div className="container mx-auto px-6 md:px-12 flex flex-col items-center text-center">
        <h2 className="text-4xl font-display font-bold text-white uppercase tracking-tighter mb-4">{ARTIST_NAME}</h2>
        <p className="text-gold-500 text-xs uppercase tracking-[0.3em] mb-8">{ARTIST_TAGLINE}</p>
        
        <div className="flex gap-8 mb-12">
            <a href="#" className="text-neutral-500 hover:text-white transition-colors"><Instagram size={20} /></a>
            <a href="#" className="text-neutral-500 hover:text-white transition-colors"><Twitter size={20} /></a>
            <a href="#" className="text-neutral-500 hover:text-white transition-colors"><Youtube size={20} /></a>
            <a href="#" className="text-neutral-500 hover:text-white transition-colors"><Mail size={20} /></a>
        </div>

        <div className="text-neutral-600 text-xs space-y-2">
            <p>&copy; {new Date().getFullYear()} {ARTIST_NAME} Music Group. All Rights Reserved.</p>
            <button onClick={onAdminClick} className="flex items-center justify-center gap-1 mx-auto hover:text-neutral-400">
                <Lock size={10} /> Artist Access
            </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

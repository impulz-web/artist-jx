import React from 'react';
import { ShoppingBag } from 'lucide-react';

interface MerchProps {
  onShopClick: () => void;
}

const Merch: React.FC<MerchProps> = ({ onShopClick }) => {
  return (
    <section id="merch" className="py-24 bg-neutral-900">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">

          {/* Header */}
          <div className="mb-16">
            <div className="border-l-4 border-gold-500 pl-6 mb-8">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white uppercase">Official Merchandise</h2>
              <p className="text-neutral-400 mt-2 text-lg">Show your support with exclusive gear.</p>
            </div>
          </div>

          {/* Featured Merch Block */}
          <div className="relative group cursor-pointer animate-fade-in-up">
            <div
              onClick={onShopClick}
              className="block relative overflow-hidden rounded-2xl bg-neutral-800 hover:bg-neutral-700 transition-all duration-500"
            >
              {/* Featured Merch Image */}
              <div className="aspect-[16/9] overflow-hidden">
                <img
                  src="/merch 1.jpg"
                  alt="Featured Merchandise"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
                <ShoppingBag size={64} className="text-gold-500 mb-4" />
                <p className="text-white font-bold text-2xl uppercase mb-2">Shop Now</p>
                <p className="text-neutral-300 text-sm">View all products</p>
              </div>

              {/* Border effect */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-gold-500/50 transition-colors duration-300 rounded-2xl"></div>
            </div>
          </div>

          {/* Call to action text */}
          <div className="mt-8">
            <p className="text-neutral-400 text-sm uppercase tracking-widest">
              Exclusive apparel • Limited editions • Show your support
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Merch;

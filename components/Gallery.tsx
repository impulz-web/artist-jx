
import React, { useState } from 'react';
import { GalleryImage } from '../types';
import { Filter } from 'lucide-react';

interface GalleryProps {
  images: GalleryImage[];
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  const [filter, setFilter] = useState<'All' | 'Live' | 'Studio' | 'BTS' | 'Lifestyle'>('All');

  const filteredImages = filter === 'All' ? images : images.filter(img => img.category === filter);

  return (
    <div className="min-h-screen bg-neutral-950 pt-32 pb-24">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 animate-fade-in-up">
          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white uppercase tracking-tighter mb-4">
              Visual <span className="text-gold-500">Archives</span>
            </h1>
            <p className="text-neutral-400 text-lg max-w-xl">
              A curated collection of moments from the road, the studio, and the life between beats.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            {['All', 'Live', 'Studio', 'BTS', 'Lifestyle'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat as any)}
                className={`px-6 py-2 rounded-full border text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                  filter === cat 
                    ? 'bg-gold-500 text-black border-gold-500' 
                    : 'bg-transparent text-neutral-500 border-neutral-800 hover:border-white hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              className="group relative h-[400px] w-full overflow-hidden bg-neutral-900 cursor-pointer animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <img
                src={image.url}
                alt={image.caption}
                loading="lazy"
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
              />
              
              {/* Overlay (Hidden by default, shows on hover) */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                <span className="text-gold-500 text-xs font-bold uppercase tracking-widest mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                  {image.category}
                </span>
                <h3 className="text-white font-display font-bold text-2xl uppercase translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-200">
                  {image.caption}
                </h3>
              </div>
              
              {/* Border Effect */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-gold-500/50 transition-colors duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <div className="text-center py-24 border border-dashed border-neutral-800">
            <Filter size={48} className="mx-auto text-neutral-600 mb-4" />
            <p className="text-neutral-500 uppercase tracking-widest">No images found in this category</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default Gallery;

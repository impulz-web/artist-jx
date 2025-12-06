
import React from 'react';
import { Download } from 'lucide-react';
import { AboutData } from '../types';

interface AboutProps {
  data: AboutData;
}

const About: React.FC<AboutProps> = ({ data }) => {
  return (
    <section id="about" className="py-24 bg-neutral-900">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          
          {/* Image */}
          <div className="w-full md:w-1/2">
            <div className="relative">
                <div className="absolute top-4 left-4 w-full h-full border-2 border-gold-500/30 z-0"></div>
                <img 
                    src={data.imageUrl} 
                    alt="Artist Portrait" 
                    className="relative z-10 w-full grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl"
                />
            </div>
          </div>

          {/* Text */}
          <div className="w-full md:w-1/2">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white uppercase mb-6">
              {data.title} <span className="text-gold-500">{data.highlightText}</span>
            </h2>
            <p className="text-neutral-400 text-lg leading-relaxed mb-6">
              {data.description1}
            </p>
            <p className="text-neutral-400 text-lg leading-relaxed mb-8">
              {data.description2}
            </p>

            <div className="grid grid-cols-3 gap-4 border-t border-neutral-800 py-6 mb-8">
                {data.stats.map((stat, index) => (
                    <div key={index}>
                        <span className="block text-3xl font-bold text-white">{stat.value}</span>
                        <span className="text-xs uppercase text-neutral-500">{stat.label}</span>
                    </div>
                ))}
            </div>

            <button className="flex items-center gap-2 text-white border-b-2 border-gold-500 pb-1 hover:text-gold-500 transition-colors uppercase font-bold tracking-widest text-sm">
                <Download size={16} />
                Download EPK
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;

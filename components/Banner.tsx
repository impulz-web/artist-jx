import React from 'react';
import { BannerData } from '../types';
import { Calendar, Music, ArrowRight, MapPin, PlayCircle } from 'lucide-react';

interface BannerProps {
  data: BannerData;
  onScrollTo: (sectionId: string) => void;
  onBuyTicketClick: (event: any) => void;
}

const Banner: React.FC<BannerProps> = ({ data, onScrollTo, onBuyTicketClick }) => {
  // Create a mock event for the featured show
  const featuredEvent = {
    id: 'featured-ovroad',
    title: 'OVROAD',
    date: '2024-12-25',
    time: '20:00',
    venue: 'Kampala Arena',
    city: 'Kampala',
    price: 25,
    status: 'Upcoming' as const,
    image: '/show 6.jpg'
  };
  return (
    <section className="relative -mt-32 z-10 px-6 md:px-12 pb-16">
      <div className="max-w-7xl mx-auto">
        <div className="bg-black/80 backdrop-blur-xl border border-gold-500/20 rounded-2xl p-8 md:p-12 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white uppercase mb-4">
              {data.title}
            </h2>
            <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
              {data.subtitle}
            </p>
          </div>

          {/* Featured Show Section */}
          <div className="mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              {/* Show Image */}
              <div className="lg:col-span-1">
                <div className="relative group">
                  <img
                    src="/show 6.jpg"
                    alt="OVROAD Show"
                    className="w-full aspect-square object-cover rounded-2xl border-4 border-gold-500/30 group-hover:border-gold-500 transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-2xl"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-black/80 backdrop-blur-sm rounded-lg p-3 text-center">
                      <p className="text-gold-500 font-bold text-sm uppercase tracking-wider">🔥 HOTTEST EVENT</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Show Details */}
              <div className="lg:col-span-2">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-4xl md:text-5xl font-display font-bold text-white uppercase mb-2">
                      OVROAD
                    </h3>
                    <div className="flex flex-wrap gap-4 text-neutral-300">
                      <div className="flex items-center gap-2">
                        <Calendar size={18} className="text-gold-500" />
                        <span className="font-bold">25TH DECEMBER</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={18} className="text-gold-500" />
                        <span className="font-bold">KAMPALA</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-neutral-400 text-lg leading-relaxed">
                    Get ready for an unforgettable night of pure energy and rhythm! Join us for the most anticipated show of the year featuring explosive performances, stunning visuals, and the hottest tracks that will have you dancing all night long.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => onBuyTicketClick(featuredEvent)}
                      className="bg-gold-500 text-black font-bold uppercase py-4 px-8 rounded-lg hover:bg-white transition-all duration-300 flex items-center justify-center gap-2 group"
                    >
                      Buy Tickets Now
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    <div className="text-center sm:text-left">
                      <p className="text-neutral-500 text-sm">Limited tickets available</p>
                      <p className="text-gold-500 font-bold text-lg">Starting from $25</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Featured Events */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="text-gold-500" size={24} />
                <h3 className="text-xl font-bold text-white uppercase">More Events</h3>
              </div>
              <div className="space-y-4">
                {data.featuredEvents.map((event) => (
                  <div key={event.id} className="flex items-center gap-4 bg-neutral-900/50 p-4 rounded-lg border border-neutral-800 hover:border-gold-500/50 transition-colors">
                    <div className="w-12 h-12 bg-gold-500 rounded-lg flex items-center justify-center text-black font-bold text-lg">
                      {new Date(event.date).getDate()}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-bold uppercase text-sm">{event.title}</h4>
                      <p className="text-neutral-400 text-xs">{event.city} • {event.venue}</p>
                    </div>
                    <button
                      onClick={() => onScrollTo('events')}
                      className="text-gold-500 hover:text-white transition-colors"
                    >
                      <ArrowRight size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* New Songs */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Music className="text-gold-500" size={24} />
                <h3 className="text-xl font-bold text-white uppercase">New Songs</h3>
              </div>
              <div className="space-y-4">
                {data.newSongs.map((song) => (
                  <div key={song.id} className="flex items-center gap-4 bg-neutral-900/50 p-4 rounded-lg border border-neutral-800 hover:border-gold-500/50 transition-colors">
                    <img
                      src={song.imageUrl}
                      alt={song.title}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="text-white font-bold uppercase text-sm">{song.title}</h4>
                      <p className="text-neutral-400 text-xs">{song.type}</p>
                    </div>
                    <button
                      onClick={() => onScrollTo('projects')}
                      className="text-gold-500 hover:text-white transition-colors"
                    >
                      <PlayCircle size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;

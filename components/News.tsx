import React, { useState } from 'react';
import { Calendar, ArrowRight, ExternalLink } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: 'Announcement' | 'Tour' | 'Music' | 'Press';
  image?: string;
  externalLink?: string;
}

const News: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const newsItems: NewsItem[] = [
    {
      id: '1',
      title: 'JX Announces 2025 World Tour',
      excerpt: 'Get ready for the most ambitious tour yet, spanning 30+ cities across Europe, Asia, and Africa.',
      content: 'The tour will feature brand new material from the upcoming album, special guest appearances, and unforgettable live experiences.',
      date: '2025-01-15',
      category: 'Tour',
      image: '/news1.jpg'
    },
    {
      id: '2',
      title: 'New Single "Electric Dreams" Out Now',
      excerpt: 'The lead single from the upcoming album is available on all major platforms.',
      content: 'Stream "Electric Dreams" on Spotify, Apple Music, and all your favorite platforms. The track showcases JX\'s evolution as an artist.',
      date: '2025-01-10',
      category: 'Music',
      image: '/news2.jpg',
      externalLink: 'https://benardopro.online'
    },
    {
      id: '3',
      title: 'Featured in Rolling Stone Magazine',
      excerpt: 'JX graces the cover of Rolling Stone\'s "Next Generation" issue.',
      content: 'The feature explores JX\'s journey, influences, and vision for the future of music.',
      date: '2025-01-05',
      category: 'Press',
      image: '/news3.jpg'
    },
    {
      id: '4',
      title: 'Charity Concert Raises $50K for Education',
      excerpt: 'Weekend concert in Nairobi raised funds for underprivileged children\'s education.',
      content: 'The sold-out show featured special performances and collaborations, making it one of the most successful charity events of the year.',
      date: '2024-12-20',
      category: 'Announcement',
      image: '/news4.jpg'
    },
    {
      id: '5',
      title: 'Behind the Scenes: Album Recording',
      excerpt: 'Exclusive look at the creative process behind the new album.',
      content: 'From the studio sessions to the final mixes, get an intimate glimpse into how JX creates music.',
      date: '2024-12-15',
      category: 'Music',
      image: '/news5.jpg'
    },
    {
      id: '6',
      title: 'Festival Season Kicks Off',
      excerpt: 'JX confirmed for major festivals including Coachella, Glastonbury, and more.',
      content: 'This summer promises to be unforgettable with performances at the world\'s biggest music festivals.',
      date: '2024-12-10',
      category: 'Tour',
      image: '/news6.jpg'
    }
  ];

  const categories = ['All', ...Array.from(new Set(newsItems.map(item => item.category)))];

  const filteredNews = selectedCategory === 'All'
    ? newsItems
    : newsItems.filter(item => item.category === selectedCategory);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section id="news" className="py-24 bg-neutral-950">
      <div className="container mx-auto px-6 md:px-12">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white uppercase tracking-tighter mb-6">
            Latest <span className="text-gold-500">News</span>
          </h2>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
            Stay updated with the latest announcements, tour dates, music releases, and exclusive content from JX.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full border text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gold-500 text-black border-gold-500'
                  : 'bg-transparent text-neutral-500 border-neutral-800 hover:border-white hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.map((item, index) => (
            <article
              key={item.id}
              className="group bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-800 hover:border-gold-500/50 transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              {item.image && (
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-black/60 backdrop-blur-sm text-white text-xs uppercase tracking-wider rounded-full">
                      {item.category}
                    </span>
                  </div>
                  {item.externalLink && (
                    <div className="absolute top-4 right-4">
                      <ExternalLink size={16} className="text-white/60" />
                    </div>
                  )}
                </div>
              )}

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar size={14} className="text-gold-500" />
                  <span className="text-neutral-400 text-sm">{formatDate(item.date)}</span>
                </div>

                <h3 className="text-white font-bold text-xl mb-3 leading-tight group-hover:text-gold-500 transition-colors">
                  {item.title}
                </h3>

                <p className="text-neutral-400 text-sm mb-4 line-clamp-3">
                  {item.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-neutral-500">
                    {item.category}
                  </span>
                  {item.externalLink ? (
                    <a
                      href={item.externalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gold-500 hover:text-white transition-colors text-sm font-bold uppercase tracking-wider"
                    >
                      Read More
                      <ArrowRight size={14} />
                    </a>
                  ) : (
                    <button className="flex items-center gap-2 text-gold-500 hover:text-white transition-colors text-sm font-bold uppercase tracking-wider">
                      Read More
                      <ArrowRight size={14} />
                    </button>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredNews.length === 0 && (
          <div className="text-center py-24">
            <Calendar size={64} className="mx-auto text-neutral-600 mb-4" />
            <p className="text-neutral-500 uppercase tracking-widest text-xl mb-2">No news found</p>
            <p className="text-neutral-600">Try selecting a different category</p>
          </div>
        )}

        {/* Newsletter CTA */}
        <div className="text-center mt-16 pt-8 border-t border-neutral-800">
          <h3 className="text-2xl font-bold text-white mb-4">Never Miss an Update</h3>
          <p className="text-neutral-400 mb-6">Subscribe to our newsletter for exclusive content and early access</p>
          <button
            onClick={() => document.getElementById('newsletter')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-gold-500 text-black font-bold uppercase px-8 py-3 tracking-wider hover:bg-white transition-colors"
          >
            Subscribe Now
          </button>
        </div>

      </div>
    </section>
  );
};

export default News;

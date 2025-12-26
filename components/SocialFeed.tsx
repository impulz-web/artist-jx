import React, { useState, useEffect } from 'react';
import { Instagram, Youtube, Twitter, ExternalLink } from 'lucide-react';

interface SocialPost {
  id: string;
  platform: 'instagram' | 'youtube' | 'twitter';
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares?: number;
  timestamp: string;
  url: string;
}

const SocialFeed: React.FC = () => {
  const [activePlatform, setActivePlatform] = useState<'instagram' | 'youtube' | 'twitter'>('instagram');

  // Mock social media data - replace with real API integration
  const socialPosts: Record<string, SocialPost[]> = {
    instagram: [
      {
        id: '1',
        platform: 'instagram',
        content: 'New music coming soon! 🎵 #JX #NewMusic',
        image: '/social1.jpg',
        likes: 1247,
        comments: 89,
        timestamp: '2025-01-15T10:30:00Z',
        url: 'https://instagram.com/p/example1'
      },
      {
        id: '2',
        platform: 'instagram',
        content: 'Behind the scenes from the studio session 📸',
        image: '/social2.jpg',
        likes: 2156,
        comments: 142,
        timestamp: '2025-01-12T14:20:00Z',
        url: 'https://instagram.com/p/example2'
      },
      {
        id: '3',
        platform: 'instagram',
        content: 'Tour announcement teaser! Stay tuned 🎪',
        image: '/social3.jpg',
        likes: 987,
        comments: 67,
        timestamp: '2025-01-10T09:15:00Z',
        url: 'https://instagram.com/p/example3'
      }
    ],
    youtube: [
      {
        id: '4',
        platform: 'youtube',
        content: 'Official Music Video - "Electric Dreams" | JX',
        image: '/video-thumb1.jpg',
        likes: 15432,
        comments: 2341,
        shares: 876,
        timestamp: '2025-01-08T16:00:00Z',
        url: 'https://youtube.com/watch?v=example1'
      },
      {
        id: '5',
        platform: 'youtube',
        content: 'Live Session - Acoustic Performance',
        image: '/video-thumb2.jpg',
        likes: 8765,
        comments: 1234,
        shares: 543,
        timestamp: '2025-01-05T12:30:00Z',
        url: 'https://youtube.com/watch?v=example2'
      }
    ],
    twitter: [
      {
        id: '6',
        platform: 'twitter',
        content: 'Excited to announce our 2025 World Tour! Tickets on sale now 🎫 #JXWorldTour',
        likes: 2341,
        comments: 456,
        shares: 789,
        timestamp: '2025-01-14T11:00:00Z',
        url: 'https://twitter.com/status/example1'
      },
      {
        id: '7',
        platform: 'twitter',
        content: 'New single "Midnight Groove" available everywhere! 🌙🎵 Listen now',
        likes: 1876,
        comments: 234,
        shares: 345,
        timestamp: '2025-01-11T18:45:00Z',
        url: 'https://twitter.com/status/example2'
      }
    ]
  };

  const formatTimestamp = (timestamp: string) => {
    const now = new Date();
    const postDate = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - postDate.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 24) {
      return `${diffInHours}h`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d`;
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return <Instagram size={20} className="text-pink-500" />;
      case 'youtube':
        return <Youtube size={20} className="text-red-500" />;
      case 'twitter':
        return <Twitter size={20} className="text-blue-500" />;
      default:
        return null;
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return 'from-pink-500 to-purple-500';
      case 'youtube':
        return 'from-red-500 to-pink-500';
      case 'twitter':
        return 'from-blue-500 to-cyan-500';
      default:
        return 'from-gold-500 to-yellow-500';
    }
  };

  return (
    <section id="social" className="py-24 bg-neutral-950">
      <div className="container mx-auto px-6 md:px-12">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white uppercase tracking-tighter mb-6">
            Stay <span className="text-gold-500">Connected</span>
          </h2>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
            Follow JX across social media for the latest updates, behind-the-scenes content, and exclusive fan moments.
          </p>
        </div>

        {/* Platform Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-neutral-900 p-2 rounded-2xl border border-neutral-800">
            <div className="flex gap-2">
              {(['instagram', 'youtube', 'twitter'] as const).map((platform) => (
                <button
                  key={platform}
                  onClick={() => setActivePlatform(platform)}
                  className={`flex items-center gap-3 px-6 py-3 rounded-xl font-bold uppercase tracking-wider transition-all duration-300 ${
                    activePlatform === platform
                      ? `bg-gradient-to-r ${getPlatformColor(platform)} text-white shadow-lg`
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                  }`}
                >
                  {getPlatformIcon(platform)}
                  {platform.charAt(0).toUpperCase() + platform.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Social Feed */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {socialPosts[activePlatform].map((post, index) => (
            <article
              key={post.id}
              className="group bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-800 hover:border-gold-500/50 transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Post Image */}
              {post.image && (
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.content}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    {getPlatformIcon(post.platform)}
                  </div>
                  <div className="absolute top-4 right-4">
                    <ExternalLink size={16} className="text-white/60 group-hover:text-white transition-colors" />
                  </div>
                </div>
              )}

              {/* Post Content */}
              <div className="p-6">
                <p className="text-white text-sm mb-4 leading-relaxed">
                  {post.content}
                </p>

                {/* Engagement Stats */}
                <div className="flex items-center justify-between text-neutral-400 text-xs mb-3">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      ❤️ {post.likes.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      💬 {post.comments.toLocaleString()}
                    </span>
                    {post.shares && (
                      <span className="flex items-center gap-1">
                        🔄 {post.shares.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <span>{formatTimestamp(post.timestamp)}</span>
                </div>

                {/* Action Button */}
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-gold-500 hover:text-white transition-colors text-sm font-bold uppercase tracking-wider"
                >
                  View Post
                  <ExternalLink size={14} />
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Follow CTA */}
        <div className="text-center mt-16 pt-8 border-t border-neutral-800">
          <h3 className="text-2xl font-bold text-white mb-4">Follow JX</h3>
          <p className="text-neutral-400 mb-6">Never miss a beat - follow on all platforms</p>
          <div className="flex justify-center gap-6">
            <a
              href="https://benardopro.online"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-pink-500 hover:text-white transition-colors"
            >
              <Instagram size={24} />
              <span className="font-bold">Instagram</span>
            </a>
            <a
              href="https://benardopro.online"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-red-500 hover:text-white transition-colors"
            >
              <Youtube size={24} />
              <span className="font-bold">YouTube</span>
            </a>
            <a
              href="https://benardopro.online"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-500 hover:text-white transition-colors"
            >
              <Twitter size={24} />
              <span className="font-bold">Twitter</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default SocialFeed;

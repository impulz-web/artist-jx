
import { Event, StreamingLink, AboutData, GalleryImage, BannerData } from './types';

export const ARTIST_NAME = "KHIM SWAQ";
export const ARTIST_TAGLINE = "South Sudan's Finest Dancehall Artist";

export const INITIAL_HERO_IMAGE = "/hero.jpg";

export const INITIAL_STREAMING_LINKS: StreamingLink[] = [
  { id: '1', platform: 'Spotify', url: 'https://open.spotify.com/artist/16R05JMkj54CYNSRFrR73r?si=KLIfFPXhT0W2t_OgO7jpdw', label: 'Spotify' },
  { id: '2', platform: 'Instagram', url: 'https://instagram.com/khim_swaqq', label: 'Instagram' },
  { id: '3', platform: 'Facebook', url: 'https://facebook.com/khimswaqqmusic', label: 'Facebook' },
  { id: '4', platform: 'TikTok', url: 'https://tiktok.com/@khimswaqqofficial', label: 'TikTok' },
  { id: '5', platform: 'YouTube', url: 'https://www.youtube.com/@KhimSwaqq', label: 'YouTube' },
];

export const INITIAL_ABOUT_DATA: AboutData = {
  imageUrl: "/about.jpg",
  title: "The",
  highlightText: "Vision",
  description1: `${ARTIST_NAME} is a South Sudanese Dancehall artist known for high-energy performances, authentic storytelling, and a bold sound that blends African rhythm with modern Dancehall culture. His music represents ambition, resilience, and the voice of a new generation.`,
  description2: "With over 10 million streams independently and sold-out shows across the coast, the mission remains the same: authenticity above all else.",
  stats: [
    { value: "2M+", label: "Monthly Listeners" },
    { value: "50+", label: "Live Shows" },
    { value: "#1", label: "Trending Artist" }
  ]
};

// Removed MOCK_PROJECTS - no mock data needed

export const INITIAL_EVENTS: Event[] = [
  {
    id: 'e1',
    title: 'NEON NIGHTS TOUR',
    date: '2024-11-15',
    time: '20:00',
    venue: 'The Grand Arena',
    city: 'Los Angeles, CA',
    price: 45,
    status: 'Upcoming',
    image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'e2',
    title: 'UNDERGROUND SESSIONS',
    date: '2024-12-02',
    time: '22:00',
    venue: 'Club Onyx',
    city: 'New York, NY',
    price: 30,
    status: 'Upcoming',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'e3',
    title: 'VANTAGE: UNPLUGGED',
    date: '2024-12-20',
    time: '19:30',
    venue: 'Silver Lake Studio',
    city: 'London, UK',
    price: 75,
    status: 'Sold Out',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop'
  }
];

export const INITIAL_GALLERY_IMAGES: GalleryImage[] = [
  {
    id: 'g1',
    url: '/1.jpg',
    caption: 'Studio Session Vol. 1',
    category: 'Studio'
  },
  {
    id: 'g2',
    url: '/2.jpg',
    caption: 'Neon Nights Tour Opening',
    category: 'Live'
  },
  {
    id: 'g3',
    url: '/3.jpg',
    caption: 'Backstage at The Grand',
    category: 'BTS'
  },
  {
    id: 'g4',
    url: '/5.jpg',
    caption: 'Midnight Vibes',
    category: 'Lifestyle'
  },
  {
    id: 'g5',
    url: '/7.jpg',
    caption: 'On Set: Concrete Jungle',
    category: 'BTS'
  },
  {
    id: 'g6',
    url: '/8.jpg',
    caption: 'Crowd Energy',
    category: 'Live'
  },
  {
    id: 'g7',
    url: '/9.jpg',
    caption: 'Behind the Scenes',
    category: 'Studio'
  },
  {
    id: 'g8',
    url: '/11.jpg',
    caption: 'Live Performance',
    category: 'Live'
  }
];

export const INITIAL_BANNER_DATA: BannerData = {
  featuredEvents: INITIAL_EVENTS.filter(e => e.isHot || e.status === 'Upcoming').slice(0, 3),
  newSongs: [],
  title: "Hottest Events & New Songs",
  subtitle: "Catch the latest drops and don't miss upcoming shows"
};

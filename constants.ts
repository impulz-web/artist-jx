
import { Event, Project, StreamingLink, AboutData, GalleryImage } from './types';

export const ARTIST_NAME = "VANTAGE";
export const ARTIST_TAGLINE = "URBAN MUSICIAN | RECORDING ARTIST | PRODUCER";

export const INITIAL_HERO_IMAGE = "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1920&auto=format&fit=crop";

export const INITIAL_STREAMING_LINKS: StreamingLink[] = [
  { id: '1', platform: 'Spotify', url: '#', label: 'Spotify' },
  { id: '2', platform: 'Apple Music', url: '#', label: 'Apple Music' },
  { id: '3', platform: 'YouTube', url: '#', label: 'YouTube' },
  { id: '4', platform: 'SoundCloud', url: '#', label: 'SoundCloud' },
];

export const INITIAL_ABOUT_DATA: AboutData = {
  imageUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=800&auto=format&fit=crop",
  title: "The",
  highlightText: "Vision",
  description1: `${ARTIST_NAME} is more than a name; it’s a movement. Born in the heart of the city, blending gritty lyricism with soulful melodies, ${ARTIST_NAME} creates a soundscape that mirrors the urban experience.`,
  description2: "With over 10 million streams independently and sold-out shows across the coast, the mission remains the same: authenticity above all else.",
  stats: [
    { value: "2M+", label: "Monthly Listeners" },
    { value: "50+", label: "Live Shows" },
    { value: "#1", label: "Trending Artist" }
  ]
};

export const MOCK_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'MIDNIGHT TOKYO',
    type: 'Album',
    description: 'A sonic journey through the neon streets. Lo-fi beats meets trap soul.',
    imageUrl: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=800&auto=format&fit=crop',
    links: { spotify: '#', apple: '#' }
  },
  {
    id: '2',
    title: 'CONCRETE JUNGLE',
    type: 'Video',
    description: 'Visual masterpiece directed by K. Lewis. 1M+ views in 24 hours.',
    imageUrl: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=800&auto=format&fit=crop',
    links: { youtube: '#' }
  },
  {
    id: '3',
    title: 'ECHOES ft. LUNA',
    type: 'Single',
    description: 'The summer anthem featuring R&B sensation Luna.',
    imageUrl: 'https://images.unsplash.com/photo-1514525253440-b393452e3383?q=80&w=800&auto=format&fit=crop',
    links: { spotify: '#', youtube: '#' }
  },
  {
    id: '4',
    title: 'NO SIGNAL',
    type: 'Single',
    description: 'Hard-hitting bass and introspective lyrics.',
    imageUrl: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?q=80&w=800&auto=format&fit=crop',
    links: { apple: '#' }
  }
];

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
    url: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?q=80&w=1200',
    caption: 'Studio Session Vol. 1',
    category: 'Studio'
  },
  {
    id: 'g2',
    url: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=1200',
    caption: 'Neon Nights Tour Opening',
    category: 'Live'
  },
  {
    id: 'g3',
    url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200',
    caption: 'Backstage at The Grand',
    category: 'BTS'
  },
  {
    id: 'g4',
    url: 'https://images.unsplash.com/photo-1514525253440-b393452e3383?q=80&w=1200',
    caption: 'Midnight Vibes',
    category: 'Lifestyle'
  },
  {
    id: 'g5',
    url: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=1200',
    caption: 'On Set: Concrete Jungle',
    category: 'BTS'
  },
  {
    id: 'g6',
    url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1200',
    caption: 'Crowd Energy',
    category: 'Live'
  }
];

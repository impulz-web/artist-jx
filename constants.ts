
import { Event, Project, StreamingLink, AboutData, GalleryImage, BannerData } from './types';

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

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'video1',
    title: 'Chol by Khim Swaqq',
    type: 'Video',
    description: '',
    imageUrl: '/video 1.jpg',
    links: {
      youtube: 'https://www.youtube.com/watch?v=K_yxzzMigA8'
    }
  },
  {
    id: 'video2',
    title: 'Thin by Khim Swaqq',
    type: 'Video',
    description: '',
    imageUrl: '/video 2.jpg',
    links: {
      youtube: 'https://www.youtube.com/watch?v=ZoiL3i4fsiw'
    }
  },
  {
    id: 'video3',
    title: 'Khim Swaqq - Cry Over Me',
    type: 'Video',
    description: '',
    imageUrl: '/video 3.jpg',
    links: {
      youtube: 'https://www.youtube.com/watch?v=zlvdfBIP53I'
    }
  },
  {
    id: 'video4',
    title: 'Khim Swaqq - Shutdown Ft Selekta T Mega',
    type: 'Video',
    description: '',
    imageUrl: '/video 4.jpg',
    links: {
      youtube: 'https://www.youtube.com/watch?v=fGiEDxE99KU'
    }
  }
];

export const INITIAL_EVENTS: Event[] = [
  {
    id: 'featured-ovroad',
    title: 'OVROAD',
    date: '2024-12-25',
    time: '20:00',
    venue: 'Kampala Arena',
    city: 'Kampala',
    price: 25,
    status: 'Upcoming',
    image: '/show 6.jpg',
    isHot: true
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
  newSongs: INITIAL_PROJECTS,
  title: "Hottest Events & New Songs",
  subtitle: "Catch the latest drops and don't miss upcoming shows"
};

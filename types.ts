
export interface Project {
  id: string;
  title: string;
  type: 'Single' | 'Album' | 'Video' | 'Feature';
  description: string;
  imageUrl: string;
  links: {
    spotify?: string;
    apple?: string;
    youtube?: string;
  };
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  price: number;
  status: 'Upcoming' | 'Sold Out' | 'Past';
  image?: string;
  isHot?: boolean;
}

export interface BookingRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  eventType: 'Live Show' | 'Club' | 'Studio' | 'Feature' | 'Other';
  date: string;
  budget: string;
  message: string;
  status: 'Pending' | 'Approved' | 'Completed' | 'Declined';
  submittedAt: string;
}

export interface Ticket {
  id: string;
  eventId: string;
  eventTitle: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  secretCode: string; // The generated Show ID
  purchaseDate: string;
  paymentMethod: string;
  pricePaid: number;
}

export interface StreamingLink {
  id: string;
  platform: 'Spotify' | 'Apple Music' | 'YouTube' | 'SoundCloud' | 'Tidal' | 'Instagram' | 'Facebook' | 'TikTok' | 'Other';
  url: string;
  label?: string;
}

export interface AboutData {
  imageUrl: string;
  title: string;
  highlightText: string;
  description1: string;
  description2: string;
  stats: {
    value: string;
    label: string;
  }[];
}

export interface GalleryImage {
  id: string;
  url: string;
  caption: string;
  category: 'Live' | 'Studio' | 'BTS' | 'Lifestyle';
}

export interface BannerData {
  featuredEvents: Event[];
  newSongs: Project[];
  title: string;
  subtitle: string;
}

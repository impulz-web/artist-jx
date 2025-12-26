
import React, { useState, useEffect } from 'react';
import { Event, BookingRequest, Ticket, Project, StreamingLink, AboutData, GalleryImage, BannerData } from './types';
import { INITIAL_EVENTS, INITIAL_PROJECTS, INITIAL_HERO_IMAGE, INITIAL_STREAMING_LINKS, INITIAL_ABOUT_DATA, INITIAL_GALLERY_IMAGES, INITIAL_BANNER_DATA, ARTIST_NAME } from './constants';
import Hero from './components/Hero';
import Banner from './components/Banner';
import Projects from './components/Projects';
import Merch from './components/Merch';
import Events from './components/Events';
import Booking from './components/Booking';
import About from './components/About';
import Footer from './components/Footer';
import StreamingOverlay from './components/StreamingOverlay';
import Gallery from './components/Gallery';
import Store from './components/Store';
import Newsletter from './components/Newsletter';
import News from './components/News';
import SocialFeed from './components/SocialFeed';
import MusicPlayer from './components/MusicPlayer';
import { Menu, X } from 'lucide-react';

const App: React.FC = () => {
  // --- STATE ---
  const [view, setView] = useState<'public' | 'dashboard' | 'gallery' | 'store' | 'news' | 'social' | 'music'>('public');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showStreamingOverlay, setShowStreamingOverlay] = useState(false);
  const [selectedEventForModal, setSelectedEventForModal] = useState<any>(null);

  // --- CONTENT STATE (Managed by Dashboard) ---
  const [events] = useState<Event[]>(INITIAL_EVENTS);
  const [projects] = useState<Project[]>(INITIAL_PROJECTS);
  const [heroImage] = useState<string>(INITIAL_HERO_IMAGE);
  const [streamingLinks] = useState<StreamingLink[]>(INITIAL_STREAMING_LINKS);
  const [aboutData] = useState<AboutData>(INITIAL_ABOUT_DATA);
  const [galleryImages] = useState<GalleryImage[]>(INITIAL_GALLERY_IMAGES);
  const [bannerData] = useState<BannerData>(INITIAL_BANNER_DATA);
  
  // Find Hot Event
  const hotEvent = events.find(e => e.isHot);

  // --- HANDLERS ---
  const scrollToSection = (id: string) => {
    if (view === 'gallery') {
      setView('public');
      // Wait for re-render then scroll
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const handleTicketPurchase = (_ticket: Ticket) => {
    // Temporarily disabled - dashboard features will be re-enabled after deployment
  };

  const handleBookingSubmit = (_booking: BookingRequest) => {
    // Temporarily disabled - dashboard features will be re-enabled after deployment
  };



  // Scroll listener for Navbar transparency
  useEffect(() => {
    const handleScroll = () => {
        setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- RENDER ---

  if (view === 'dashboard') {
    return (
      <div className="min-h-screen bg-neutral-950 text-white">
        {/* Admin Header */}
        <nav className="bg-black border-b border-neutral-800 px-6 py-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gold-500">JX Admin Dashboard</h1>
            <button
              onClick={() => setView('public')}
              className="bg-neutral-800 text-white px-4 py-2 rounded-lg hover:bg-neutral-700 transition-colors"
            >
              ← Back to Site
            </button>
          </div>
        </nav>

        {/* Admin Content */}
        <div className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">

            {/* Stats Cards */}
            <div className="bg-neutral-900 rounded-xl p-6 border border-neutral-800">
              <h3 className="text-lg font-semibold text-white mb-2">Total Events</h3>
              <p className="text-3xl font-bold text-gold-500">{events.length}</p>
              <p className="text-neutral-400 text-sm">Upcoming shows</p>
            </div>

            <div className="bg-neutral-900 rounded-xl p-6 border border-neutral-800">
              <h3 className="text-lg font-semibold text-white mb-2">Projects</h3>
              <p className="text-3xl font-bold text-gold-500">{projects.length}</p>
              <p className="text-neutral-400 text-sm">Music releases</p>
            </div>

            <div className="bg-neutral-900 rounded-xl p-6 border border-neutral-800">
              <h3 className="text-lg font-semibold text-white mb-2">Bookings</h3>
              <p className="text-3xl font-bold text-gold-500">12</p>
              <p className="text-neutral-400 text-sm">This month</p>
            </div>
          </div>

          {/* Management Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Events Management */}
            <div className="bg-neutral-900 rounded-xl p-6 border border-neutral-800">
              <h3 className="text-xl font-bold text-white mb-4">Events Management</h3>
              <div className="space-y-3">
                {events.map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-3 bg-neutral-800 rounded-lg">
                    <div>
                      <h4 className="text-white font-semibold">{event.title}</h4>
                      <p className="text-neutral-400 text-sm">{event.date} • {event.city}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs uppercase font-bold ${
                      event.status === 'Upcoming' ? 'bg-green-600 text-white' :
                      event.status === 'Sold Out' ? 'bg-red-600 text-white' :
                      'bg-neutral-600 text-white'
                    }`}>
                      {event.status}
                    </span>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 bg-gold-500 text-black font-bold py-2 rounded-lg hover:bg-gold-400 transition-colors">
                Add New Event
              </button>
            </div>

            {/* Projects Management */}
            <div className="bg-neutral-900 rounded-xl p-6 border border-neutral-800">
              <h3 className="text-xl font-bold text-white mb-4">Projects Management</h3>
              <div className="space-y-3">
                {projects.map((project) => (
                  <div key={project.id} className="flex items-center justify-between p-3 bg-neutral-800 rounded-lg">
                    <div>
                      <h4 className="text-white font-semibold">{project.title}</h4>
                      <p className="text-neutral-400 text-sm">{project.type}</p>
                    </div>
                    <span className="text-gold-500 text-sm">Active</span>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 bg-gold-500 text-black font-bold py-2 rounded-lg hover:bg-gold-400 transition-colors">
                Add New Project
              </button>
            </div>

            {/* Content Management */}
            <div className="bg-neutral-900 rounded-xl p-6 border border-neutral-800">
              <h3 className="text-xl font-bold text-white mb-4">Content Management</h3>
              <div className="space-y-3">
                <div className="p-3 bg-neutral-800 rounded-lg">
                  <h4 className="text-white font-semibold">Hero Section</h4>
                  <p className="text-neutral-400 text-sm">Update main banner image and text</p>
                </div>
                <div className="p-3 bg-neutral-800 rounded-lg">
                  <h4 className="text-white font-semibold">About Section</h4>
                  <p className="text-neutral-400 text-sm">Edit artist biography and stats</p>
                </div>
                <div className="p-3 bg-neutral-800 rounded-lg">
                  <h4 className="text-white font-semibold">Social Links</h4>
                  <p className="text-neutral-400 text-sm">Update streaming platforms</p>
                </div>
              </div>
            </div>

            {/* Analytics Preview */}
            <div className="bg-neutral-900 rounded-xl p-6 border border-neutral-800">
              <h3 className="text-xl font-bold text-white mb-4">Site Analytics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-neutral-400">Page Views</span>
                  <span className="text-white font-bold">12,847</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-400">Newsletter Subscribers</span>
                  <span className="text-white font-bold">3,421</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-400">Booking Inquiries</span>
                  <span className="text-white font-bold">28</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-400">Store Sales</span>
                  <span className="text-white font-bold">$2,847</span>
                </div>
              </div>
            </div>
          </div>

          {/* Demo Note */}
          <div className="mt-8 bg-neutral-900 rounded-xl p-6 border border-neutral-800">
            <h3 className="text-xl font-bold text-white mb-4">🚀 Portfolio Demo Dashboard</h3>
            <p className="text-neutral-400 mb-4">
              This is a demonstration admin dashboard for the JX artist portfolio. In a real application,
              this would connect to a database and allow full content management.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="text-gold-500 font-semibold mb-2">Features Demonstrated:</h4>
                <ul className="text-neutral-400 space-y-1">
                  <li>• Content management interface</li>
                  <li>• Analytics dashboard</li>
                  <li>• CRUD operations preview</li>
                  <li>• Admin navigation system</li>
                </ul>
              </div>
              <div>
                <h4 className="text-gold-500 font-semibold mb-2">Real Implementation Would Include:</h4>
                <ul className="text-neutral-400 space-y-1">
                  <li>• User authentication</li>
                  <li>• Database integration</li>
                  <li>• File upload system</li>
                  <li>• Real-time updates</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-950 text-white selection:bg-gold-500 selection:text-black">
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${scrolled ? 'bg-black/90 backdrop-blur-md py-4 border-b border-white/10' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
            <div
              className="text-2xl font-display font-bold uppercase tracking-tighter cursor-pointer hover:text-gold-500 transition-colors"
              onClick={() => { setView('public'); window.scrollTo(0,0); }}
            >
                {ARTIST_NAME}
            </div>

            {/* Desktop Menu - Responsive Layout */}
            <div className="hidden lg:flex gap-6 xl:gap-8">
                <button
                  onClick={() => { setView('public'); window.scrollTo(0,0); }}
                  className={`text-sm uppercase font-bold tracking-widest transition-colors ${view === 'public' ? 'text-white' : 'text-neutral-500 hover:text-white'}`}
                >
                  Home
                </button>
                {['Projects', 'Events', 'About'].map((item) => (
                    <button
                        key={item}
                        onClick={() => scrollToSection(item.toLowerCase())}
                        className="text-sm uppercase font-bold tracking-widest text-neutral-400 hover:text-white hover:text-gold-500 transition-colors"
                    >
                        {item}
                    </button>
                ))}
                <button
                  onClick={() => scrollToSection('bookings')}
                  className="text-sm uppercase font-bold tracking-widest text-neutral-400 hover:text-white hover:text-gold-500 transition-colors"
                >
                  Book
                </button>
                <button
                  onClick={() => setView('news')}
                  className={`text-sm uppercase font-bold tracking-widest transition-colors ${view === 'news' ? 'text-gold-500' : 'text-white hover:text-gold-500'}`}
                >
                  News
                </button>
                <button
                  onClick={() => setView('music')}
                  className={`text-sm uppercase font-bold tracking-widest transition-colors ${view === 'music' ? 'text-gold-500' : 'text-white hover:text-gold-500'}`}
                >
                  Music
                </button>
                <button
                  onClick={() => setView('gallery')}
                  className={`text-sm uppercase font-bold tracking-widest transition-colors ${view === 'gallery' ? 'text-gold-500' : 'text-white hover:text-gold-500'}`}
                >
                  Gallery
                </button>
            </div>

            {/* Tablet Menu - Condensed */}
            <div className="hidden md:flex lg:hidden gap-4">
                <button
                  onClick={() => { setView('public'); window.scrollTo(0,0); }}
                  className={`text-xs uppercase font-bold tracking-wider transition-colors ${view === 'public' ? 'text-white' : 'text-neutral-500 hover:text-white'}`}
                >
                  Home
                </button>
                {['Projects', 'Events'].map((item) => (
                    <button
                        key={item}
                        onClick={() => scrollToSection(item.toLowerCase())}
                        className="text-xs uppercase font-bold tracking-wider text-neutral-400 hover:text-white hover:text-gold-500 transition-colors"
                    >
                        {item}
                    </button>
                ))}
                <button
                  onClick={() => setView('music')}
                  className={`text-xs uppercase font-bold tracking-wider transition-colors ${view === 'music' ? 'text-gold-500' : 'text-white hover:text-gold-500'}`}
                >
                  Music
                </button>
                <button
                  onClick={() => setView('gallery')}
                  className={`text-xs uppercase font-bold tracking-wider transition-colors ${view === 'gallery' ? 'text-gold-500' : 'text-white hover:text-gold-500'}`}
                >
                  Gallery
                </button>
            </div>

            {/* Mobile Toggle */}
            <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X /> : <Menu />}
            </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-black flex flex-col items-center justify-center space-y-8 md:hidden">
             <button onClick={() => { setView('public'); setMobileMenuOpen(false); }} className="text-2xl uppercase font-bold tracking-widest text-white hover:text-gold-500">Home</button>
             {['Projects', 'Events', 'Bookings', 'About'].map((item) => (
                <button 
                    key={item} 
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="text-2xl uppercase font-bold tracking-widest text-white hover:text-gold-500 transition-colors"
                >
                    {item}
                </button>
            ))}
             <button onClick={() => { setView('news'); setMobileMenuOpen(false); }} className="text-2xl uppercase font-bold tracking-widest text-gold-500">News</button>
             <button onClick={() => { setView('gallery'); setMobileMenuOpen(false); }} className="text-2xl uppercase font-bold tracking-widest text-gold-500">Gallery</button>
        </div>
      )}

      {/* Premium Streaming Overlay */}
      {showStreamingOverlay && (
        <StreamingOverlay 
            links={streamingLinks} 
            onClose={() => setShowStreamingOverlay(false)} 
        />
      )}

      <main>
        {view === 'store' ? (
          <Store onBack={() => setView('public')} />
        ) : view === 'gallery' ? (
          <Gallery images={galleryImages} />
        ) : view === 'news' ? (
          <News />
        ) : view === 'social' ? (
          <SocialFeed />
        ) : view === 'music' ? (
          <MusicPlayer />
        ) : (
          <>
            <Hero
                heroImage={heroImage}
                onScrollTo={scrollToSection}
                onListenClick={() => setShowStreamingOverlay(true)}
                hotEvent={hotEvent}
            />
            <Banner data={bannerData} onScrollTo={scrollToSection} onBuyTicketClick={(event) => {
              setSelectedEventForModal(event);
              scrollToSection('events');
            }} />
            <Projects projects={projects} />
            <Merch onShopClick={() => setView('store')} />
            <Events
              events={events}
              onTicketPurchase={handleTicketPurchase}
              {...(selectedEventForModal ? {
                selectedEvent: selectedEventForModal,
                onCloseModal: () => setSelectedEventForModal(null)
              } : {})}
            />
            <Booking onBookingSubmit={handleBookingSubmit} />
            <About data={aboutData} />
            <Newsletter />
          </>
        )}
      </main>

      <Footer onAdminClick={() => setView('dashboard')} />
    </div>
  );
};

export default App;


import React, { useState, useEffect } from 'react';
import { Event, BookingRequest, Ticket, Project, StreamingLink, AboutData, GalleryImage } from './types';
import { INITIAL_EVENTS, MOCK_PROJECTS, INITIAL_HERO_IMAGE, INITIAL_STREAMING_LINKS, INITIAL_ABOUT_DATA, INITIAL_GALLERY_IMAGES } from './constants';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Events from './components/Events';
import Booking from './components/Booking';
import About from './components/About';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import StreamingOverlay from './components/StreamingOverlay';
import Gallery from './components/Gallery';
import { Menu, X } from 'lucide-react';

const App: React.FC = () => {
  // --- STATE ---
  const [view, setView] = useState<'public' | 'dashboard' | 'gallery'>('public');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showStreamingOverlay, setShowStreamingOverlay] = useState(false);

  // --- CONTENT STATE (Managed by Dashboard) ---
  const [events, setEvents] = useState<Event[]>(INITIAL_EVENTS);
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [heroImage, setHeroImage] = useState<string>(INITIAL_HERO_IMAGE);
  const [streamingLinks, setStreamingLinks] = useState<StreamingLink[]>(INITIAL_STREAMING_LINKS);
  const [aboutData, setAboutData] = useState<AboutData>(INITIAL_ABOUT_DATA);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>(INITIAL_GALLERY_IMAGES);
  
  // --- CRM STATE ---
  const [bookings, setBookings] = useState<BookingRequest[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);

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

  const handleTicketPurchase = (ticket: Ticket) => {
    setTickets(prev => [...prev, ticket]);
  };

  const handleBookingSubmit = (booking: BookingRequest) => {
    setBookings(prev => [booking, ...prev]);
  };

  const updateBookingStatus = (id: string, status: BookingRequest['status']) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
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
        <Dashboard 
            bookings={bookings}
            tickets={tickets}
            events={events}
            projects={projects}
            heroImage={heroImage}
            streamingLinks={streamingLinks}
            aboutData={aboutData}
            galleryImages={galleryImages}
            onUpdateBookingStatus={updateBookingStatus}
            onLogout={() => setView('public')}
            setHeroImage={setHeroImage}
            setStreamingLinks={setStreamingLinks}
            setProjects={setProjects}
            setEvents={setEvents}
            setAboutData={setAboutData}
            setGalleryImages={setGalleryImages}
        />
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
                Vantage
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-8">
                <button 
                  onClick={() => { setView('public'); window.scrollTo(0,0); }}
                  className={`text-sm uppercase font-bold tracking-widest transition-colors ${view === 'public' ? 'text-white' : 'text-neutral-500 hover:text-white'}`}
                >
                  Home
                </button>
                {['Projects', 'Events', 'Bookings', 'About'].map((item) => (
                    <button 
                        key={item} 
                        onClick={() => scrollToSection(item.toLowerCase())}
                        className="text-sm uppercase font-bold tracking-widest text-neutral-400 hover:text-white hover:text-gold-500 transition-colors"
                    >
                        {item}
                    </button>
                ))}
                <button 
                  onClick={() => setView('gallery')}
                  className={`text-sm uppercase font-bold tracking-widest transition-colors ${view === 'gallery' ? 'text-gold-500' : 'text-white hover:text-gold-500'}`}
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
        {view === 'gallery' ? (
          <Gallery images={galleryImages} />
        ) : (
          <>
            <Hero 
                heroImage={heroImage} 
                onScrollTo={scrollToSection} 
                onListenClick={() => setShowStreamingOverlay(true)}
                hotEvent={hotEvent}
            />
            <Projects projects={projects} />
            <Events events={events} onTicketPurchase={handleTicketPurchase} />
            <Booking onBookingSubmit={handleBookingSubmit} />
            <About data={aboutData} />
          </>
        )}
      </main>

      <Footer onAdminClick={() => setView('dashboard')} />
    </div>
  );
};

export default App;

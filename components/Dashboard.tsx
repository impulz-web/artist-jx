
import React, { useState } from 'react';
import { BookingRequest, Ticket, Event, Project, StreamingLink, AboutData, GalleryImage, BannerData } from '../types';
import { LogOut, Image as ImageIcon, Link, Plus, Trash2, Edit2, FileText, Music, Flame, Camera, Calendar } from 'lucide-react';

interface DashboardProps {
  bookings: BookingRequest[];
  tickets: Ticket[];
  events: Event[];
  projects: Project[];
  heroImage: string;
  streamingLinks: StreamingLink[];
  aboutData: AboutData;
  galleryImages: GalleryImage[];
  bannerData: BannerData;

  onLogout: () => void;

  // Content Setters
  setHeroImage: (url: string) => void;
  setStreamingLinks: (links: StreamingLink[]) => void;
  setProjects: (projects: Project[]) => void;
  setEvents: (events: Event[]) => void;
  setAboutData: (data: AboutData) => void;
  setGalleryImages: (images: GalleryImage[]) => void;
  setBannerData: (data: BannerData) => void;
}

const Dashboard: React.FC<DashboardProps> = ({
    bookings, tickets, events, projects, heroImage, streamingLinks, aboutData, galleryImages, bannerData,
    onLogout,
    setHeroImage, setStreamingLinks, setProjects, setEvents, setAboutData, setGalleryImages, setBannerData
}) => {
  const [activeTab] = useState<'bookings' | 'sales' | 'content' | 'projects' | 'events' | 'gallery' | 'banner'>('bookings');
  
  // Project Form State
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [projectForm, setProjectForm] = useState<Partial<Project>>({ title: '', type: 'Single', description: '', imageUrl: '', links: {} });

  // Event Form State
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [eventForm, setEventForm] = useState<Partial<Event>>({ title: '', date: '', time: '', venue: '', city: '', price: 0, status: 'Upcoming', isHot: false });

  // Link Form State
  const [newLink, setNewLink] = useState({ platform: 'Spotify' as StreamingLink['platform'], url: '', label: '' });

  // Gallery Form State
  const [newGalleryImage, setNewGalleryImage] = useState<Partial<GalleryImage>>({ url: '', caption: '', category: 'Live' });

  // Stats
  const pendingBookings = bookings.filter(b => b.status === 'Pending').length;

  // --- Handlers: Links ---
  const handleAddLink = () => {
    if(!newLink.url) return;
    const newStreamingLink: StreamingLink = {
      id: Math.random().toString(36).substr(2, 9),
      platform: newLink.platform,
      url: newLink.url,
      label: newLink.label
    };
    setStreamingLinks([...streamingLinks, newStreamingLink]);
    setNewLink({ platform: 'Spotify' as StreamingLink['platform'], url: '', label: '' });
  };
  const removeLink = (id: string) => setStreamingLinks(streamingLinks.filter(l => l.id !== id));

  // --- Handlers: Gallery ---
  const handleAddGalleryImage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGalleryImage.url) return;
    const img: GalleryImage = {
        id: Math.random().toString(36).substr(2, 9),
        url: newGalleryImage.url!,
        caption: newGalleryImage.caption || '',
        category: newGalleryImage.category as any
    };
    setGalleryImages([img, ...galleryImages]);
    setNewGalleryImage({ url: '', caption: '', category: 'Live' });
  };

  const handleRemoveGalleryImage = (id: string) => {
      setGalleryImages(galleryImages.filter(img => img.id !== id));
  };

  // --- Handlers: Projects ---
  const handleProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProjectId) {
      // Update
      setProjects(projects.map(p => p.id === editingProjectId ? { ...p, ...projectForm } as Project : p));
      setEditingProjectId(null);
    } else {
      // Create
      const project: Project = {
          id: Math.random().toString(36).substr(2, 9),
          title: projectForm.title!,
          type: projectForm.type as any,
          description: projectForm.description!,
          imageUrl: projectForm.imageUrl!,
          links: projectForm.links!
      };
      setProjects([project, ...projects]);
    }
    setProjectForm({ title: '', type: 'Single', description: '', imageUrl: '', links: {} });
  };

  const handleEditProject = (project: Project) => {
    setEditingProjectId(project.id);
    setProjectForm(project);
  };

  const handleDeleteProject = (id: string) => {
      if(confirm('Delete this project?')) setProjects(projects.filter(p => p.id !== id));
  };

  // --- Handlers: Events ---
  const handleEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingEventId) {
      // Update
      setEvents(events.map(ev => ev.id === editingEventId ? { ...ev, ...eventForm } as Event : ev));
      setEditingEventId(null);
    } else {
      // Create
      const event: Event = {
          id: Math.random().toString(36).substr(2, 9),
          ...eventForm as Event,
          isHot: false // Default to false
      };
      setEvents([...events, event]);
    }
    setEventForm({ title: '', date: '', time: '', venue: '', city: '', price: 0, status: 'Upcoming' });
  };

  const handleEditEvent = (event: Event) => {
    setEditingEventId(event.id);
    setEventForm(event);
  };

  const handleDeleteEvent = (id: string) => {
      if(confirm('Delete this event?')) setEvents(events.filter(e => e.id !== id));
  };

  const handleToggleHot = (id: string) => {
    const targetIsAlreadyHot = events.find(e => e.id === id)?.isHot;
    
    if (targetIsAlreadyHot) {
        // Toggle off
         setEvents(events.map(e => ({...e, isHot: false})));
    } else {
        // Toggle on, turn others off
        setEvents(events.map(e => ({
            ...e, 
            isHot: e.id === id
        })));
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans pb-12">
      {/* Header */}
      <header className="bg-neutral-900 border-b border-neutral-800 p-6 sticky top-0 z-30">
        <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-display font-bold uppercase tracking-wider text-gold-500">Artist Dashboard</h1>
            <button onClick={onLogout} className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors text-sm uppercase font-bold">
                <LogOut size={16} /> Exit
            </button>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        
        {/* Navigation Tabs - Temporarily commented out for debugging
        <div className="flex flex-wrap gap-4 md:gap-8 border-b border-neutral-800 mb-8 overflow-x-auto">
            <button
                onClick={() => setActiveTab('bookings')}
                className={`pb-4 text-sm font-bold uppercase tracking-widest whitespace-nowrap ${
                    activeTab === 'bookings'
                        ? 'text-gold-500 border-b-2 border-gold-500'
                        : 'text-neutral-500 hover:text-white'
                }`}
            >
                Bookings
            </button>
            <button
                onClick={() => setActiveTab('sales')}
                className={`pb-4 text-sm font-bold uppercase tracking-widest whitespace-nowrap ${
                    activeTab === 'sales'
                        ? 'text-gold-500 border-b-2 border-gold-500'
                        : 'text-neutral-500 hover:text-white'
                }`}
            >
                Sales
            </button>
            <button
                onClick={() => setActiveTab('projects')}
                className={`pb-4 text-sm font-bold uppercase tracking-widest whitespace-nowrap ${
                    activeTab === 'projects'
                        ? 'text-gold-500 border-b-2 border-gold-500'
                        : 'text-neutral-500 hover:text-white'
                }`}
            >
                Latest Drops
            </button>
            <button
                onClick={() => setActiveTab('events')}
                className={`pb-4 text-sm font-bold uppercase tracking-widest whitespace-nowrap ${
                    activeTab === 'events'
                        ? 'text-gold-500 border-b-2 border-gold-500'
                        : 'text-neutral-500 hover:text-white'
                }`}
            >
                Tour Dates
            </button>
            <button
                onClick={() => setActiveTab('gallery')}
                className={`pb-4 text-sm font-bold uppercase tracking-widest whitespace-nowrap ${
                    activeTab === 'gallery'
                        ? 'text-gold-500 border-b-2 border-gold-500'
                        : 'text-neutral-500 hover:text-white'
                }`}
            >
                Gallery
            </button>
            <button
                onClick={() => setActiveTab('banner')}
                className={`pb-4 text-sm font-bold uppercase tracking-widest whitespace-nowrap ${
                    activeTab === 'banner'
                        ? 'text-gold-500 border-b-2 border-gold-500'
                        : 'text-neutral-500 hover:text-white'
                }`}
            >
                Banner
            </button>
            <button
                onClick={() => setActiveTab('content')}
                className={`pb-4 text-sm font-bold uppercase tracking-widest whitespace-nowrap ${
                    activeTab === 'content'
                        ? 'text-gold-500 border-b-2 border-gold-500'
                        : 'text-neutral-500 hover:text-white'
                }`}
            >
                Site Content
            </button>
        </div>
        */}
        <div className="bg-neutral-900 p-6 border border-neutral-800 mb-8">
            <p className="text-gold-500 font-bold uppercase tracking-wider">Navigation temporarily disabled for deployment</p>
        </div>

        {/* --- BOOKINGS TAB --- */}
        {activeTab === 'bookings' && (
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-neutral-900 p-6 border border-neutral-800">
                        <p className="text-neutral-400 text-xs font-bold uppercase">Pending Requests</p>
                        <p className="text-4xl font-bold text-white">{pendingBookings}</p>
                    </div>
                </div>
                <div className="bg-neutral-900 p-6 border border-neutral-800">
                    <p className="text-neutral-400">Bookings management temporarily disabled for deployment.</p>
                </div>
            </div>
        )}

        {/* --- SALES TAB --- */}
        {activeTab === 'sales' && (
             <div className="overflow-x-auto bg-neutral-900 border border-neutral-800">
                <table className="w-full text-left text-sm text-neutral-400">
                    <thead className="bg-neutral-800 text-white uppercase text-xs font-bold tracking-wider">
                        <tr>
                            <th className="p-4">Date</th>
                            <th className="p-4">Show</th>
                            <th className="p-4">Customer</th>
                            <th className="p-4">Email</th>
                            <th className="p-4">Phone</th>
                            <th className="p-4">Type</th>
                            <th className="p-4">Amount</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800">
                        {tickets.map(t => (
                            <tr key={t.id} className="hover:bg-neutral-800/50">
                                <td className="p-4">{new Date(t.purchaseDate).toLocaleDateString()}</td>
                                <td className="p-4 font-bold text-white">{t.eventTitle}</td>
                                <td className="p-4">{t.customerName}</td>
                                <td className="p-4">{t.customerEmail}</td>
                                <td className="p-4">{t.customerPhone}</td>
                                <td className="p-4">{t.paymentMethod}</td>
                                <td className="p-4 text-gold-500">${t.pricePaid}</td>
                            </tr>
                        ))}
                         {tickets.length === 0 && (
                            <tr>
                                <td colSpan={7} className="p-8 text-center text-neutral-600">No tickets requested yet.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )}

        {/* --- PROJECTS TAB --- */}
        {activeTab === 'projects' && (
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form */}
                <div className="bg-neutral-900 p-6 border border-neutral-800 h-fit">
                    <h3 className="text-white font-bold uppercase mb-4 flex items-center gap-2">
                        {editingProjectId ? <Edit2 size={16}/> : <Plus size={16}/>} 
                        {editingProjectId ? 'Edit Project' : 'Add New Drop'}
                    </h3>
                    <form onSubmit={handleProjectSubmit} className="space-y-4">
                        <input required placeholder="Title" value={projectForm.title} onChange={e => setProjectForm({...projectForm, title: e.target.value})} className="w-full bg-black border border-neutral-700 p-3 text-white text-sm" />
                        <select value={projectForm.type} onChange={e => setProjectForm({...projectForm, type: e.target.value as any})} className="w-full bg-black border border-neutral-700 p-3 text-white text-sm">
                            <option>Single</option><option>Album</option><option>Video</option><option>Feature</option>
                        </select>
                        <input required placeholder="Image URL" value={projectForm.imageUrl} onChange={e => setProjectForm({...projectForm, imageUrl: e.target.value})} className="w-full bg-black border border-neutral-700 p-3 text-white text-sm" />
                        <textarea placeholder="Description" value={projectForm.description} onChange={e => setProjectForm({...projectForm, description: e.target.value})} className="w-full bg-black border border-neutral-700 p-3 text-white text-sm" rows={3}/>
                        <div className="space-y-2">
                            <p className="text-xs uppercase text-neutral-500">Links</p>
                            <input placeholder="Spotify URL" value={projectForm.links?.spotify || ''} onChange={e => setProjectForm({...projectForm, links: {...projectForm.links, spotify: e.target.value}})} className="w-full bg-black border border-neutral-700 p-3 text-white text-sm" />
                            <input placeholder="YouTube URL" value={projectForm.links?.youtube || ''} onChange={e => setProjectForm({...projectForm, links: {...projectForm.links, youtube: e.target.value}})} className="w-full bg-black border border-neutral-700 p-3 text-white text-sm" />
                        </div>
                        <div className="flex gap-2">
                            <button type="submit" className="flex-1 bg-gold-500 text-black font-bold uppercase py-3 text-sm hover:bg-white">
                                {editingProjectId ? 'Update Project' : 'Publish Project'}
                            </button>
                            {editingProjectId && (
                                <button type="button" onClick={() => {setEditingProjectId(null); setProjectForm({ title: '', type: 'Single', description: '', imageUrl: '', links: {} })}} className="px-4 border border-neutral-700 text-neutral-400 hover:text-white">Cancel</button>
                            )}
                        </div>
                    </form>
                </div>
                {/* List */}
                <div className="lg:col-span-2 space-y-4">
                    {projects.map(p => (
                        <div key={p.id} className="flex gap-4 bg-neutral-900 p-4 border border-neutral-800 items-center">
                            <img src={p.imageUrl} className="w-16 h-16 object-cover" alt={p.title}/>
                            <div className="flex-1">
                                <h4 className="text-white font-bold">{p.title}</h4>
                                <span className="text-xs text-gold-500 uppercase">{p.type}</span>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => handleEditProject(p)} className="text-neutral-500 hover:text-white"><Edit2 size={18}/></button>
                                <button onClick={() => handleDeleteProject(p.id)} className="text-neutral-500 hover:text-red-500"><Trash2 size={18}/></button>
                            </div>
                        </div>
                    ))}
                </div>
             </div>
        )}

        {/* --- EVENTS TAB --- */}
        {activeTab === 'events' && (
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form */}
                <div className="bg-neutral-900 p-6 border border-neutral-800 h-fit">
                    <h3 className="text-white font-bold uppercase mb-4 flex items-center gap-2">
                        {editingEventId ? <Edit2 size={16}/> : <Plus size={16}/>} 
                        {editingEventId ? 'Edit Event' : 'Add Tour Date'}
                    </h3>
                    <form onSubmit={handleEventSubmit} className="space-y-4">
                        <input required placeholder="Event Title" value={eventForm.title} onChange={e => setEventForm({...eventForm, title: e.target.value})} className="w-full bg-black border border-neutral-700 p-3 text-white text-sm" />
                        <div className="grid grid-cols-2 gap-2">
                             <input required type="date" value={eventForm.date} onChange={e => setEventForm({...eventForm, date: e.target.value})} className="w-full bg-black border border-neutral-700 p-3 text-white text-sm" />
                             <input required type="time" value={eventForm.time} onChange={e => setEventForm({...eventForm, time: e.target.value})} className="w-full bg-black border border-neutral-700 p-3 text-white text-sm" />
                        </div>
                        <input required placeholder="Venue" value={eventForm.venue} onChange={e => setEventForm({...eventForm, venue: e.target.value})} className="w-full bg-black border border-neutral-700 p-3 text-white text-sm" />
                        <input required placeholder="City" value={eventForm.city} onChange={e => setEventForm({...eventForm, city: e.target.value})} className="w-full bg-black border border-neutral-700 p-3 text-white text-sm" />
                        <div className="grid grid-cols-2 gap-2">
                            <input required type="number" placeholder="Price" value={eventForm.price} onChange={e => setEventForm({...eventForm, price: parseInt(e.target.value)})} className="w-full bg-black border border-neutral-700 p-3 text-white text-sm" />
                            <select value={eventForm.status} onChange={e => setEventForm({...eventForm, status: e.target.value as any})} className="w-full bg-black border border-neutral-700 p-3 text-white text-sm">
                                <option>Upcoming</option><option>Sold Out</option><option>Past</option>
                            </select>
                        </div>
                        <div className="flex gap-2">
                            <button type="submit" className="flex-1 bg-gold-500 text-black font-bold uppercase py-3 text-sm hover:bg-white">
                                {editingEventId ? 'Update Event' : 'Publish Event'}
                            </button>
                            {editingEventId && (
                                <button type="button" onClick={() => {setEditingEventId(null); setEventForm({ title: '', date: '', time: '', venue: '', city: '', price: 0, status: 'Upcoming' })}} className="px-4 border border-neutral-700 text-neutral-400 hover:text-white">Cancel</button>
                            )}
                        </div>
                    </form>
                </div>
                {/* List */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="bg-neutral-900 border border-neutral-800 p-4 mb-4">
                        <p className="text-neutral-400 text-xs">
                            <span className="text-gold-500 font-bold"><Flame size={12} className="inline mr-1"/> HOT EVENT:</span> 
                            Toggle the flame icon to highlight an event in the Hero section. Only one event can be hot at a time.
                        </p>
                    </div>

                    {events.map(e => (
                        <div key={e.id} className="flex gap-4 bg-neutral-900 p-4 border border-neutral-800 items-center">
                            <div className="w-16 text-center">
                                <span className="block text-lg font-bold text-white">{new Date(e.date).getDate()}</span>
                                <span className="block text-xs text-neutral-500 uppercase">{new Date(e.date).toLocaleString('default', {month:'short'})}</span>
                            </div>
                            <div className="flex-1">
                                <h4 className="text-white font-bold flex items-center gap-2">
                                    {e.title}
                                    {e.isHot && <span className="bg-gold-500 text-black text-[10px] px-1 font-bold uppercase rounded-sm">HOT</span>}
                                </h4>
                                <span className="text-xs text-gold-500 uppercase">{e.city} • {e.venue}</span>
                            </div>
                            <div className="flex gap-2 items-center">
                                <button 
                                    onClick={() => handleToggleHot(e.id)} 
                                    className={`p-2 rounded hover:bg-neutral-800 transition-colors ${e.isHot ? 'text-gold-500' : 'text-neutral-600'}`}
                                    title="Toggle Hot Status"
                                >
                                    <Flame size={18} fill={e.isHot ? "currentColor" : "none"}/>
                                </button>
                                <div className="h-4 w-px bg-neutral-800 mx-2"></div>
                                <button onClick={() => handleEditEvent(e)} className="text-neutral-500 hover:text-white"><Edit2 size={18}/></button>
                                <button onClick={() => handleDeleteEvent(e.id)} className="text-neutral-500 hover:text-red-500"><Trash2 size={18}/></button>
                            </div>
                        </div>
                    ))}
                </div>
             </div>
        )}

        {/* --- GALLERY TAB --- */}
        {activeTab === 'gallery' && (
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form */}
                <div className="bg-neutral-900 p-6 border border-neutral-800 h-fit">
                    <h3 className="text-white font-bold uppercase mb-4 flex items-center gap-2">
                        <Camera size={16}/> Add Photo
                    </h3>
                    <form onSubmit={handleAddGalleryImage} className="space-y-4">
                        <input 
                            required 
                            placeholder="Image URL" 
                            value={newGalleryImage.url} 
                            onChange={e => setNewGalleryImage({...newGalleryImage, url: e.target.value})} 
                            className="w-full bg-black border border-neutral-700 p-3 text-white text-sm" 
                        />
                        <input 
                            placeholder="Caption (Optional)" 
                            value={newGalleryImage.caption} 
                            onChange={e => setNewGalleryImage({...newGalleryImage, caption: e.target.value})} 
                            className="w-full bg-black border border-neutral-700 p-3 text-white text-sm" 
                        />
                         <select 
                            value={newGalleryImage.category} 
                            onChange={e => setNewGalleryImage({...newGalleryImage, category: e.target.value as any})} 
                            className="w-full bg-black border border-neutral-700 p-3 text-white text-sm"
                        >
                            <option>Live</option>
                            <option>Studio</option>
                            <option>BTS</option>
                            <option>Lifestyle</option>
                        </select>
                        <button type="submit" className="w-full bg-gold-500 text-black font-bold uppercase py-3 text-sm hover:bg-white">
                            Add to Gallery
                        </button>
                    </form>
                </div>
                {/* List */}
                <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-4">
                    {galleryImages.map(img => (
                        <div key={img.id} className="group relative aspect-square bg-black border border-neutral-800 overflow-hidden">
                            <img src={img.url} alt={img.caption} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity"/>
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <button onClick={() => handleRemoveGalleryImage(img.id)} className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600">
                                    <Trash2 size={20} />
                                </button>
                            </div>
                            <div className="absolute bottom-0 left-0 w-full p-2 bg-black/80 text-xs text-white">
                                {img.category}
                            </div>
                        </div>
                    ))}
                    {galleryImages.length === 0 && (
                        <div className="col-span-full py-12 text-center text-neutral-500 border border-dashed border-neutral-800">
                            No images in gallery.
                        </div>
                    )}
                </div>
             </div>
        )}

        {/* --- BANNER TAB --- */}
        {activeTab === 'banner' && (
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Col: Banner Content */}
                <div className="space-y-8">
                    {/* Banner Title & Subtitle */}
                    <div className="bg-neutral-900 p-6 border border-neutral-800">
                        <h3 className="text-white font-bold uppercase mb-4 flex items-center gap-2"><FileText size={16}/> Banner Content</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="text-xs uppercase text-neutral-500 block mb-1">Title</label>
                                <input
                                    value={bannerData.title}
                                    onChange={(e) => setBannerData({...bannerData, title: e.target.value})}
                                    className="w-full bg-black border border-neutral-700 p-3 text-white text-sm"
                                />
                            </div>
                            <div>
                                <label className="text-xs uppercase text-neutral-500 block mb-1">Subtitle</label>
                                <textarea
                                    value={bannerData.subtitle}
                                    onChange={(e) => setBannerData({...bannerData, subtitle: e.target.value})}
                                    className="w-full bg-black border border-neutral-700 p-3 text-white text-sm"
                                    rows={2}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Featured Events */}
                    <div className="bg-neutral-900 p-6 border border-neutral-800">
                        <h3 className="text-white font-bold uppercase mb-4 flex items-center gap-2"><Calendar size={16}/> Featured Events</h3>
                        <p className="text-neutral-400 text-sm mb-4">Select which events to display as "hottest" in the banner.</p>
                        <div className="space-y-2 max-h-64 overflow-y-auto">
                            {events.map(event => (
                                <label key={event.id} className="flex items-center gap-3 p-2 hover:bg-neutral-800 rounded cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={bannerData.featuredEvents.some(e => e.id === event.id)}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setBannerData({
                                                    ...bannerData,
                                                    featuredEvents: [...bannerData.featuredEvents, event]
                                                });
                                            } else {
                                                setBannerData({
                                                    ...bannerData,
                                                    featuredEvents: bannerData.featuredEvents.filter(ev => ev.id !== event.id)
                                                });
                                            }
                                        }}
                                        className="w-4 h-4 text-gold-500 bg-black border-neutral-700 rounded focus:ring-gold-500"
                                    />
                                    <div className="flex-1">
                                        <span className="text-white text-sm font-bold">{event.title}</span>
                                        <span className="text-neutral-400 text-xs block">{event.city} • {new Date(event.date).toLocaleDateString()}</span>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Col: New Songs */}
                <div className="space-y-8">
                    {/* New Songs */}
                    <div className="bg-neutral-900 p-6 border border-neutral-800">
                        <h3 className="text-white font-bold uppercase mb-4 flex items-center gap-2"><Music size={16}/> New Songs</h3>
                        <p className="text-neutral-400 text-sm mb-4">Select which projects/songs to highlight as new releases.</p>
                        <div className="space-y-2 max-h-64 overflow-y-auto">
                            {projects.map(project => (
                                <label key={project.id} className="flex items-center gap-3 p-2 hover:bg-neutral-800 rounded cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={bannerData.newSongs.some(p => p.id === project.id)}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setBannerData({
                                                    ...bannerData,
                                                    newSongs: [...bannerData.newSongs, project]
                                                });
                                            } else {
                                                setBannerData({
                                                    ...bannerData,
                                                    newSongs: bannerData.newSongs.filter(p => p.id !== project.id)
                                                });
                                            }
                                        }}
                                        className="w-4 h-4 text-gold-500 bg-black border-neutral-700 rounded focus:ring-gold-500"
                                    />
                                    <div className="flex-1">
                                        <span className="text-white text-sm font-bold">{project.title}</span>
                                        <span className="text-neutral-400 text-xs block">{project.type}</span>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Preview */}
                    <div className="bg-neutral-900 p-6 border border-neutral-800">
                        <h3 className="text-white font-bold uppercase mb-4">Banner Preview</h3>
                        <div className="bg-black/50 border border-neutral-700 rounded-lg p-4 text-center">
                            <h4 className="text-gold-500 font-bold uppercase text-lg mb-2">{bannerData.title}</h4>
                            <p className="text-neutral-400 text-sm mb-4">{bannerData.subtitle}</p>
                            <div className="flex justify-center gap-4 text-xs">
                                <span className="text-white">{bannerData.featuredEvents.length} Events</span>
                                <span className="text-white">{bannerData.newSongs.length} Songs</span>
                            </div>
                        </div>
                    </div>
                </div>
             </div>
        )}

        {/* --- SITE CONTENT TAB --- */}
        {activeTab === 'content' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Left Col: Hero & Links */}
                <div className="space-y-8">
                    {/* Hero Image */}
                    <div className="bg-neutral-900 p-6 border border-neutral-800">
                        <h3 className="text-white font-bold uppercase mb-4 flex items-center gap-2"><ImageIcon size={16}/> Hero Image</h3>
                        <div className="flex gap-4 flex-col md:flex-row">
                            <input 
                                value={heroImage} 
                                onChange={(e) => setHeroImage(e.target.value)}
                                className="flex-1 bg-black border border-neutral-700 p-3 text-white text-sm"
                                placeholder="https://example.com/image.jpg"
                            />
                            <div className="w-full md:w-48 h-24 bg-black overflow-hidden relative border border-neutral-800">
                                <img src={heroImage} alt="Preview" className="w-full h-full object-cover opacity-50" />
                                <span className="absolute inset-0 flex items-center justify-center text-xs text-white uppercase font-bold">Preview</span>
                            </div>
                        </div>
                    </div>

                    {/* Streaming Links */}
                    <div className="bg-neutral-900 p-6 border border-neutral-800">
                        <h3 className="text-white font-bold uppercase mb-4 flex items-center gap-2"><Link size={16}/> Listen Now Links</h3>
                        
                        <div className="flex gap-2 mb-4">
                            <select
                                value={newLink.platform}
                                onChange={(e) => setNewLink({...newLink, platform: e.target.value as StreamingLink['platform']})}
                                className="bg-black border border-neutral-700 p-3 text-white text-sm"
                            >
                                <option>Spotify</option><option>Apple Music</option><option>YouTube</option><option>SoundCloud</option><option>Tidal</option>
                            </select>
                            <input 
                                value={newLink.url} 
                                onChange={(e) => setNewLink({...newLink, url: e.target.value})} 
                                className="flex-1 bg-black border border-neutral-700 p-3 text-white text-sm" 
                                placeholder="https://..." 
                            />
                            <button onClick={handleAddLink} className="bg-gold-500 text-black px-4 font-bold hover:bg-white"><Plus size={18}/></button>
                        </div>

                        <div className="space-y-2">
                            {streamingLinks.map(link => (
                                <div key={link.id} className="flex items-center justify-between bg-black p-3 border border-neutral-800">
                                    <div className="flex items-center gap-2 text-sm text-neutral-300">
                                        <Music size={14} className="text-gold-500"/> 
                                        {link.platform} 
                                        <span className="text-neutral-600">|</span> 
                                        <span className="truncate max-w-[150px]">{link.url}</span>
                                    </div>
                                    <button onClick={() => removeLink(link.id)} className="text-neutral-500 hover:text-red-500"><Trash2 size={16}/></button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Col: About Section */}
                <div className="bg-neutral-900 p-6 border border-neutral-800">
                    <h3 className="text-white font-bold uppercase mb-4 flex items-center gap-2"><FileText size={16}/> About Section</h3>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="text-xs uppercase text-neutral-500 block mb-1">Portrait Image URL</label>
                            <input 
                                value={aboutData.imageUrl}
                                onChange={(e) => setAboutData({...aboutData, imageUrl: e.target.value})}
                                className="w-full bg-black border border-neutral-700 p-3 text-white text-sm"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs uppercase text-neutral-500 block mb-1">Title</label>
                                <input 
                                    value={aboutData.title}
                                    onChange={(e) => setAboutData({...aboutData, title: e.target.value})}
                                    className="w-full bg-black border border-neutral-700 p-3 text-white text-sm"
                                />
                            </div>
                            <div>
                                <label className="text-xs uppercase text-neutral-500 block mb-1">Highlight</label>
                                <input 
                                    value={aboutData.highlightText}
                                    onChange={(e) => setAboutData({...aboutData, highlightText: e.target.value})}
                                    className="w-full bg-black border border-neutral-700 p-3 text-white text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-xs uppercase text-neutral-500 block mb-1">Intro Paragraph</label>
                            <textarea 
                                value={aboutData.description1}
                                onChange={(e) => setAboutData({...aboutData, description1: e.target.value})}
                                className="w-full bg-black border border-neutral-700 p-3 text-white text-sm"
                                rows={3}
                            />
                        </div>

                        <div>
                            <label className="text-xs uppercase text-neutral-500 block mb-1">Main Bio</label>
                            <textarea 
                                value={aboutData.description2}
                                onChange={(e) => setAboutData({...aboutData, description2: e.target.value})}
                                className="w-full bg-black border border-neutral-700 p-3 text-white text-sm"
                                rows={4}
                            />
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                             {aboutData.stats.map((stat, i) => (
                                <div key={i} className="space-y-1">
                                    <label className="text-xs uppercase text-neutral-500 block">Stat {i+1} Value</label>
                                    <input 
                                        value={stat.value}
                                        onChange={(e) => {
                                            const newStats = [...aboutData.stats];
                                            newStats[i].value = e.target.value;
                                            setAboutData({...aboutData, stats: newStats});
                                        }}
                                        className="w-full bg-black border border-neutral-700 p-2 text-white text-sm mb-1"
                                    />
                                    <label className="text-xs uppercase text-neutral-500 block">Label</label>
                                    <input 
                                        value={stat.label}
                                        onChange={(e) => {
                                            const newStats = [...aboutData.stats];
                                            newStats[i].label = e.target.value;
                                            setAboutData({...aboutData, stats: newStats});
                                        }}
                                        className="w-full bg-black border border-neutral-700 p-2 text-white text-sm"
                                    />
                                </div>
                             ))}
                        </div>
                    </div>
                </div>

            </div>
        )}

      </div>
    </div>
  );
};

export default Dashboard;


import React, { useState } from 'react';
import { Event, Ticket } from '../types';
import { MapPin, Clock, X, CheckCircle, Smartphone, Mail, User } from 'lucide-react';

interface EventsProps {
  events: Event[];
  onTicketPurchase: (ticket: Ticket) => void;
}

const Events: React.FC<EventsProps> = ({ events, onTicketPurchase }) => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success'>('idle');
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const handleBuyClick = (event: Event) => {
    if (event.status !== 'Upcoming') return;
    setSelectedEvent(event);
    setSubmissionStatus('idle');
    setFormData({ name: '', email: '', phone: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEvent) return;

    // Create a "Reservation" Ticket
    const newTicket: Ticket = {
      id: Math.random().toString(36).substr(2, 9),
      eventId: selectedEvent.id,
      eventTitle: selectedEvent.title,
      customerName: formData.name,
      customerEmail: formData.email,
      customerPhone: formData.phone,
      secretCode: `RES-${Math.floor(1000 + Math.random() * 9000)}-PENDING`,
      purchaseDate: new Date().toISOString(),
      paymentMethod: 'Callback Request',
      pricePaid: selectedEvent.price
    };

    // Simulate API call
    setTimeout(() => {
        onTicketPurchase(newTicket);
        setSubmissionStatus('success');
    }, 1000);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  return (
    <section id="events" className="py-24 bg-neutral-900">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex justify-between items-end mb-16">
          <div className="border-l-4 border-white pl-6">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white uppercase">Tour Dates</h2>
            <p className="text-neutral-400 mt-2 text-lg">Catch the energy live.</p>
          </div>
          <button className="hidden md:block text-gold-500 uppercase font-bold tracking-widest hover:text-white transition-colors">
            View All Events
          </button>
        </div>

        <div className="space-y-4">
          {events.map((event) => (
            <div 
              key={event.id} 
              className={`group relative flex flex-col md:flex-row items-center bg-black border border-neutral-800 hover:border-gold-500/50 transition-all duration-300 p-6 ${event.status === 'Sold Out' ? 'opacity-50 grayscale' : ''}`}
            >
              {/* Date Box */}
              <div className="flex flex-col items-center justify-center w-full md:w-24 h-24 bg-neutral-900 border border-neutral-800 mb-4 md:mb-0 mr-0 md:mr-8 shrink-0">
                <span className="text-gold-500 text-2xl font-bold font-display">{new Date(event.date).getDate()}</span>
                <span className="text-neutral-400 text-xs uppercase tracking-widest">{new Date(event.date).toLocaleString('default', { month: 'short' })}</span>
              </div>

              {/* Info */}
              <div className="flex-1 text-center md:text-left mb-4 md:mb-0">
                <h3 className="text-2xl font-display font-bold text-white uppercase mb-2">{event.title}</h3>
                <div className="flex flex-col md:flex-row gap-4 text-neutral-400 text-sm">
                    <div className="flex items-center justify-center md:justify-start gap-2">
                        <MapPin size={16} className="text-gold-500" />
                        {event.venue}, {event.city}
                    </div>
                    <div className="flex items-center justify-center md:justify-start gap-2">
                        <Clock size={16} className="text-gold-500" />
                        {event.time}
                    </div>
                </div>
              </div>

              {/* Action */}
              <div className="flex items-center gap-6">
                 <span className="text-xl font-bold text-white">${event.price}</span>
                 <button 
                    disabled={event.status !== 'Upcoming'}
                    onClick={() => handleBuyClick(event)}
                    className={`px-8 py-3 uppercase font-bold tracking-wider text-sm transition-all ${event.status === 'Upcoming' ? 'bg-white text-black hover:bg-gold-500' : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'}`}
                 >
                    {event.status === 'Upcoming' ? 'Buy Ticket' : event.status}
                 </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Premium Ticket Modal / Full Screen Overlay */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black animate-fade-in-up overflow-y-auto md:overflow-hidden">
          
          <button onClick={closeModal} className="absolute top-6 right-6 z-50 text-white/50 hover:text-white transition-colors bg-black/50 p-2 rounded-full">
            <X size={32} />
          </button>

          <div className="w-full h-full flex flex-col md:flex-row">
            
            {/* Left Side: Artist Image & Quote */}
            <div className="w-full md:w-1/2 h-64 md:h-full relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black via-transparent to-transparent z-10"></div>
              <div className="absolute inset-0 bg-gold-500/10 z-10 mix-blend-overlay"></div>
              <img 
                src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=1200&auto=format&fit=crop" 
                alt="Artist" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute bottom-0 left-0 p-8 md:p-16 z-20">
                <p className="font-display text-4xl md:text-5xl font-bold text-white uppercase leading-none mb-4">
                  "Thanks for buying your ticket, I can't wait to see you and entertain you."
                </p>
                <p className="text-gold-500 font-display tracking-widest uppercase">— Vantage</p>
              </div>
            </div>

            {/* Right Side: Form */}
            <div className="w-full md:w-1/2 bg-neutral-950 flex flex-col justify-center p-8 md:p-16 relative">
               
               {submissionStatus === 'idle' ? (
                 <div className="max-w-md mx-auto w-full animate-fade-in-up">
                    <div className="mb-8">
                        <span className="text-gold-500 uppercase tracking-widest text-xs font-bold mb-2 block">Premium Access</span>
                        <h3 className="text-3xl md:text-4xl font-display font-bold text-white uppercase mb-2">Finalize Your Reservation</h3>
                        <p className="text-neutral-400">Please provide your details below. Our team will contact you shortly to confirm payment and issue your VIP pass.</p>
                    </div>
                    
                    <div className="bg-neutral-900 border border-neutral-800 p-4 mb-8 flex justify-between items-center">
                        <div>
                            <p className="text-white font-bold uppercase">{selectedEvent.title}</p>
                            <p className="text-neutral-500 text-xs">{selectedEvent.date} • {selectedEvent.city}</p>
                        </div>
                        <p className="text-gold-500 font-bold text-xl">${selectedEvent.price}</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs uppercase font-bold text-neutral-500 tracking-wider flex items-center gap-2">
                                <User size={14} /> Full Name
                            </label>
                            <input 
                                required
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                type="text" 
                                className="w-full bg-black border-b-2 border-neutral-800 focus:border-gold-500 text-white p-4 focus:outline-none transition-colors"
                                placeholder="Enter your full name"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs uppercase font-bold text-neutral-500 tracking-wider flex items-center gap-2">
                                <Smartphone size={14} /> Phone Number
                            </label>
                            <input 
                                required
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                type="tel" 
                                className="w-full bg-black border-b-2 border-neutral-800 focus:border-gold-500 text-white p-4 focus:outline-none transition-colors"
                                placeholder="+1 (555) 000-0000"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs uppercase font-bold text-neutral-500 tracking-wider flex items-center gap-2">
                                <Mail size={14} /> Email Address
                            </label>
                            <input 
                                required
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                type="email" 
                                className="w-full bg-black border-b-2 border-neutral-800 focus:border-gold-500 text-white p-4 focus:outline-none transition-colors"
                                placeholder="you@example.com"
                            />
                        </div>

                        <button 
                            type="submit"
                            className="w-full bg-gold-500 text-black font-bold uppercase py-5 tracking-widest hover:bg-white transition-all duration-300 mt-4"
                        >
                            Request Callback
                        </button>
                    </form>
                 </div>
               ) : (
                 <div className="max-w-md mx-auto w-full text-center animate-fade-in-up">
                    <CheckCircle size={64} className="text-gold-500 mx-auto mb-6" />
                    <h3 className="text-3xl font-display font-bold text-white uppercase mb-4">Request Received</h3>
                    <p className="text-neutral-400 mb-8 leading-relaxed">
                        Thank you, <span className="text-white font-bold">{formData.name}</span>.<br/>
                        We have received your reservation request for <span className="text-white">{selectedEvent.title}</span>.
                        <br/><br/>
                        Our concierge team will call you at <span className="text-gold-500">{formData.phone}</span> within the next hour to finalize your payment and secure your tickets.
                    </p>
                    <button onClick={closeModal} className="text-white border-b border-white hover:border-gold-500 hover:text-gold-500 transition-colors pb-1 uppercase tracking-widest text-sm">
                        Return to Site
                    </button>
                 </div>
               )}

            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Events;

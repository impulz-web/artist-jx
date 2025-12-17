import React, { useState } from 'react';
import { BookingRequest } from '../types';

interface BookingProps {
  onBookingSubmit: (booking: BookingRequest) => void;
}

const Booking: React.FC<BookingProps> = ({ onBookingSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: 'Live Show',
    date: '',
    budget: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBooking: BookingRequest = {
      id: Math.random().toString(36).substr(2, 9),
      ...formData,
      status: 'Pending',
      submittedAt: new Date().toISOString()
    } as BookingRequest;

    onBookingSubmit(newBooking);
    setSubmitted(true);
    setFormData({
        name: '', email: '', phone: '', eventType: 'Live Show', date: '', budget: '', message: ''
    });
    
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="bookings" className="py-24 bg-neutral-950">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Text Side */}
          <div className="flex flex-col justify-center">
            <h2 className="text-5xl md:text-7xl font-display font-bold text-white uppercase mb-8 leading-tight">
              Book <br/> <span className="text-gold-500">The Artist</span>
            </h2>
            <p className="text-neutral-400 text-lg leading-relaxed mb-8">
              Available for festivals, club performances, studio sessions, and brand collaborations. 
              Serious inquiries only. All requests are routed directly to management.
            </p>
            <div className="space-y-4">
               <div className="border-t border-neutral-800 pt-4">
                  <p className="text-xs uppercase tracking-widest text-neutral-500 mb-1">Management</p>
                  <p className="text-white font-bold text-xl">mgmt@vantage-music</p>
               </div>
               <div className="border-t border-neutral-800 pt-4">
                  <p className="text-xs uppercase tracking-widest text-neutral-500 mb-1">Press Inquiries</p>
                  <p className="text-white font-bold text-xl">press@vantage-music.com</p>
               </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-neutral-900 p-8 md:p-12 border border-neutral-800">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <h3 className="text-3xl font-display font-bold text-white mb-4">Request Sent</h3>
                <p className="text-neutral-400">Our team will review your booking request and get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                        <label className="text-xs uppercase font-bold text-neutral-500 tracking-wider">Name / Organization</label>
                        <input required name="name" value={formData.name} onChange={handleChange} className="w-full bg-black border border-neutral-800 p-4 text-white focus:border-gold-500 focus:outline-none" placeholder="Enter name" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs uppercase font-bold text-neutral-500 tracking-wider">Email</label>
                        <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-black border border-neutral-800 p-4 text-white focus:border-gold-500 focus:outline-none" placeholder="Enter email" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                        <label className="text-xs uppercase font-bold text-neutral-500 tracking-wider">Event Type</label>
                        <select name="eventType" value={formData.eventType} onChange={handleChange} className="w-full bg-black border border-neutral-800 p-4 text-white focus:border-gold-500 focus:outline-none appearance-none">
                            <option>Live Show</option>
                            <option>Club Performance</option>
                            <option>Studio Feature</option>
                            <option>Private Event</option>
                            <option>Other</option>
                        </select>
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs uppercase font-bold text-neutral-500 tracking-wider">Date</label>
                        <input required type="date" name="date" value={formData.date} onChange={handleChange} className="w-full bg-black border border-neutral-800 p-4 text-white focus:border-gold-500 focus:outline-none" />
                    </div>
                </div>

                 <div className="space-y-1">
                    <label className="text-xs uppercase font-bold text-neutral-500 tracking-wider">Budget Range (USD)</label>
                    <input required name="budget" value={formData.budget} onChange={handleChange} className="w-full bg-black border border-neutral-800 p-4 text-white focus:border-gold-500 focus:outline-none" placeholder="$5,000 - $10,000" />
                </div>

                <div className="space-y-1">
                    <label className="text-xs uppercase font-bold text-neutral-500 tracking-wider">Message</label>
                    <textarea required name="message" rows={4} value={formData.message} onChange={handleChange} className="w-full bg-black border border-neutral-800 p-4 text-white focus:border-gold-500 focus:outline-none" placeholder="Tell us about the event..." />
                </div>

                <button type="submit" className="w-full bg-gold-500 text-black font-bold uppercase py-4 tracking-wider hover:bg-white transition-colors">
                    Submit Request
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Booking;

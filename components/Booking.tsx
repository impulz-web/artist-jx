import React, { useState } from 'react';
import { BookingRequest } from '../types';
import { ChevronRight, ChevronLeft, Check, Calendar, Music, Mic, Users, Star } from 'lucide-react';

interface BookingProps {
  onBookingSubmit: (booking: BookingRequest) => void;
}

const Booking: React.FC<BookingProps> = ({ onBookingSubmit }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: 'Live Show' as 'Live Show' | 'Club' | 'Studio' | 'Feature' | 'Other',
    date: '',
    budget: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const totalSteps = 3;

  const nextStep = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

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
    setCurrentStep(1);

    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return formData.name && formData.email && formData.phone;
      case 2:
        return formData.eventType && formData.date && formData.budget;
      case 3:
        return formData.message;
      default:
        return false;
    }
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
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check size={32} className="text-white" />
                </div>
                <h3 className="text-3xl font-display font-bold text-white mb-4">Request Sent!</h3>
                <p className="text-neutral-400 mb-6">Our team will review your booking request and get back to you within 24 hours.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-gold-500 hover:text-white transition-colors"
                >
                  ← Make Another Request
                </button>
              </div>
            ) : (
              <>
                {/* Progress Bar */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm uppercase tracking-wider text-neutral-500">Step {currentStep} of {totalSteps}</span>
                    <span className="text-sm text-neutral-400">{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
                  </div>
                  <div className="w-full bg-neutral-800 rounded-full h-2">
                    <div
                      className="bg-gold-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Step 1: Contact Information */}
                  {currentStep === 1 && (
                    <div className="space-y-6 animate-fade-in-up">
                      <div className="text-center mb-6">
                        <div className="w-12 h-12 bg-gold-500 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Users size={24} className="text-black" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Contact Information</h3>
                        <p className="text-neutral-400 text-sm">Tell us about yourself and how to reach you</p>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-1">
                          <label className="text-xs uppercase font-bold text-neutral-500 tracking-wider">Name / Organization *</label>
                          <input
                            required
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full bg-black border border-neutral-800 p-4 text-white focus:border-gold-500 focus:outline-none rounded-lg"
                            placeholder="Enter your name or organization"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs uppercase font-bold text-neutral-500 tracking-wider">Email Address *</label>
                          <input
                            required
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-black border border-neutral-800 p-4 text-white focus:border-gold-500 focus:outline-none rounded-lg"
                            placeholder="your@email.com"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs uppercase font-bold text-neutral-500 tracking-wider">Phone Number *</label>
                          <input
                            required
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full bg-black border border-neutral-800 p-4 text-white focus:border-gold-500 focus:outline-none rounded-lg"
                            placeholder="+1 (555) 123-4567"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Event Details */}
                  {currentStep === 2 && (
                    <div className="space-y-6 animate-fade-in-up">
                      <div className="text-center mb-6">
                        <div className="w-12 h-12 bg-gold-500 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Calendar size={24} className="text-black" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Event Details</h3>
                        <p className="text-neutral-400 text-sm">Tell us about the type of event you're planning</p>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-1">
                          <label className="text-xs uppercase font-bold text-neutral-500 tracking-wider">Event Type *</label>
                          <select
                            name="eventType"
                            value={formData.eventType}
                            onChange={handleChange}
                            className="w-full bg-black border border-neutral-800 p-4 text-white focus:border-gold-500 focus:outline-none rounded-lg appearance-none"
                          >
                            <option value="Live Show">🎤 Live Show/Festival</option>
                            <option value="Club">🎵 Club Performance</option>
                            <option value="Studio">🎚️ Studio Session/Feature</option>
                            <option value="Feature">🎬 Brand Collaboration/Feature</option>
                            <option value="Other">❓ Other</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs uppercase font-bold text-neutral-500 tracking-wider">Preferred Date *</label>
                          <input
                            required
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="w-full bg-black border border-neutral-800 p-4 text-white focus:border-gold-500 focus:outline-none rounded-lg"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs uppercase font-bold text-neutral-500 tracking-wider">Budget Range (USD) *</label>
                          <select
                            name="budget"
                            value={formData.budget}
                            onChange={handleChange}
                            className="w-full bg-black border border-neutral-800 p-4 text-white focus:border-gold-500 focus:outline-none rounded-lg appearance-none"
                          >
                            <option value="">Select budget range</option>
                            <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                            <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                            <option value="$25,000 - $50,000">$25,000 - $50,000</option>
                            <option value="$50,000+">$50,000+</option>
                            <option value="Negotiable">Negotiable</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Message & Submit */}
                  {currentStep === 3 && (
                    <div className="space-y-6 animate-fade-in-up">
                      <div className="text-center mb-6">
                        <div className="w-12 h-12 bg-gold-500 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Mic size={24} className="text-black" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Final Details</h3>
                        <p className="text-neutral-400 text-sm">Tell us more about your vision for the event</p>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-1">
                          <label className="text-xs uppercase font-bold text-neutral-500 tracking-wider">Message & Details *</label>
                          <textarea
                            required
                            name="message"
                            rows={6}
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full bg-black border border-neutral-800 p-4 text-white focus:border-gold-500 focus:outline-none rounded-lg resize-none"
                            placeholder="Tell us about your event, venue details, expected audience size, special requirements, and any other relevant information..."
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex gap-4 pt-6">
                    {currentStep > 1 && (
                      <button
                        type="button"
                        onClick={prevStep}
                        className="flex-1 flex items-center justify-center gap-2 bg-neutral-800 text-white font-bold uppercase py-3 px-6 tracking-wider hover:bg-neutral-700 transition-colors rounded-lg"
                      >
                        <ChevronLeft size={16} />
                        Back
                      </button>
                    )}

                    {currentStep < totalSteps ? (
                      <button
                        type="button"
                        onClick={nextStep}
                        disabled={!isStepValid(currentStep)}
                        className="flex-1 flex items-center justify-center gap-2 bg-gold-500 text-black font-bold uppercase py-3 px-6 tracking-wider hover:bg-gold-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 rounded-lg"
                      >
                        Next
                        <ChevronRight size={16} />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={!isStepValid(currentStep)}
                        className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white font-bold uppercase py-3 px-6 tracking-wider hover:bg-green-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 rounded-lg"
                      >
                        <Check size={16} />
                        Submit Request
                      </button>
                    )}
                  </div>
                </form>
              </>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Booking;

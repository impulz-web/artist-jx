import React, { useState } from 'react';
import { Mail, Check, AlertCircle } from 'lucide-react';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Email is required');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call - replace with actual Mailchimp/ConvertKit integration
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Here you would integrate with your email service provider
      // Example: Mailchimp API, ConvertKit, etc.

      setIsSubscribed(true);
      setEmail('');
    } catch (err) {
      setError('Failed to subscribe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="newsletter" className="py-24 bg-neutral-900">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white uppercase tracking-tighter mb-6">
              Stay <span className="text-gold-500">Connected</span>
            </h2>
            <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
              Get exclusive updates, behind-the-scenes content, and be the first to know about new releases and shows.
            </p>
          </div>

          {/* Newsletter Form */}
          <div className="bg-neutral-800 rounded-2xl p-8 md:p-12 border border-neutral-700">
            {isSubscribed ? (
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">You're In!</h3>
                <p className="text-neutral-400 mb-6">
                  Thanks for subscribing! Check your email for a confirmation and welcome message.
                </p>
                <button
                  onClick={() => setIsSubscribed(false)}
                  className="text-gold-500 hover:text-white transition-colors"
                >
                  ← Back to Newsletter
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-center mb-8">
                  <div className="w-12 h-12 bg-gold-500 rounded-full flex items-center justify-center">
                    <Mail size={24} className="text-black" />
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-4">Join the Fan Club</h3>
                <p className="text-neutral-400 mb-8 max-w-md mx-auto">
                  Get exclusive access to new music, live streams, merchandise discounts, and VIP event invites.
                </p>

                <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                  <div className="flex gap-4 mb-4">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="flex-1 px-4 py-3 bg-neutral-700 border border-neutral-600 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors"
                      disabled={isSubmitting}
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-3 bg-gold-500 text-black font-bold uppercase tracking-wider rounded-lg hover:bg-gold-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 whitespace-nowrap"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        'Subscribe'
                      )}
                    </button>
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 text-red-400 text-sm mb-4">
                      <AlertCircle size={16} />
                      {error}
                    </div>
                  )}

                  <p className="text-neutral-500 text-xs text-center">
                    By subscribing, you agree to receive emails from JX. You can unsubscribe at any time.
                  </p>
                </form>

                {/* Benefits */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-8 border-t border-neutral-700">
                  <div className="text-center">
                    <div className="text-gold-500 text-2xl mb-2">🎵</div>
                    <h4 className="text-white font-semibold mb-1">New Music First</h4>
                    <p className="text-neutral-400 text-sm">Early access to releases</p>
                  </div>
                  <div className="text-center">
                    <div className="text-gold-500 text-2xl mb-2">🎫</div>
                    <h4 className="text-white font-semibold mb-1">VIP Access</h4>
                    <p className="text-neutral-400 text-sm">Exclusive event invites</p>
                  </div>
                  <div className="text-center">
                    <div className="text-gold-500 text-2xl mb-2">💎</div>
                    <h4 className="text-white font-semibold mb-1">Special Offers</h4>
                    <p className="text-neutral-400 text-sm">Merchandise discounts</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;

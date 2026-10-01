import React, { useState } from 'react';
import { Mail, Phone, MessageSquare, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ContactSection: React.FC = () => {
  const { siteSettings, submitContactMessage } = useStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMessage('Please fill in your name, email, and message.');
      return;
    }

    setIsSubmitting(true);
    try {
      await submitContactMessage({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        message: message.trim(),
      });
      setSubmitted(true);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch (err: any) {
      console.error("Submission failed:", err);
      setErrorMessage('There was a problem sending your message. Please try again or email us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 lg:py-24 bg-slate-950 border-b border-slate-900 scroll-mt-18">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cyan-400">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Get In Touch</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase leading-tight">
              Have A Product Question Or Recommendation?
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed">
              Want us to review a specific product, report an outdated Amazon link, or ask for gear recommendations? Drop our editorial team a message.
            </p>

            {/* Direct Cards */}
            <div className="space-y-3 pt-2">
              <a
                href={`mailto:${siteSettings.contactEmail}`}
                className="p-4 bg-slate-900 rounded-2xl border border-slate-800 hover:border-cyan-500/50 flex items-center gap-3.5 transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Editorial Email</span>
                  <span className="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors">{siteSettings.contactEmail}</span>
                </div>
              </a>

              <a
                href={`tel:${siteSettings.contactPhone}`}
                className="p-4 bg-slate-900 rounded-2xl border border-slate-800 hover:border-cyan-500/50 flex items-center gap-3.5 transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Direct Inquiries</span>
                  <span className="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors">{siteSettings.contactPhone}</span>
                </div>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-xl">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Message Sent Successfully</h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-sm mx-auto">
                    Thank you for reaching out! Our editorial team has received your message and will respond within 24-48 business hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-lg font-bold text-white mb-2">
                    Send Us A Note
                  </h3>

                  {errorMessage && (
                    <div className="p-3.5 bg-rose-950/60 border border-rose-800 text-rose-300 rounded-xl text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Alex Morgan"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3.5 text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="alex@example.com"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3.5 text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3.5 text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      Your Message *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us what you think or which product you would like us to review..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3.5 text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <span>{isSubmitting ? 'Sending Message...' : 'Submit Message'}</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

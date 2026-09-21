import React, { useState } from 'react';
import { ArrowRight, Sparkles, Check, Gift } from 'lucide-react';
import { soundEngine } from '../../utils/audio';
import confetti from 'canvas-confetti';
import { ScrollReveal } from '../ui/ScrollReveal';

export function FinalCTA({ onExploreCollection }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    soundEngine.playChime('crystal');
    setSubscribed(true);

    try {
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.7 },
        colors: ['#D4AF37', '#FAF8F5', '#C5A880']
      });
    } catch (err) {}
  };

  return (
    <section className="section-padding bg-[#121110] text-[#FBF9F5] relative overflow-hidden text-center">
      {/* Cinematic Golden Radial Backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] bg-[radial-gradient(circle,_rgba(212,175,55,0.12)_0%,_rgba(0,0,0,0)_65%)] pointer-events-none" />

      <div className="elane-container-narrow relative z-10 space-y-8">
        
        {/* Monogram Badge */}
        <ScrollReveal variant="fade-up" delay={0.05}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <Gift className="w-3.5 h-3.5 text-[var(--gold-primary)]" />
            <span className="text-[11px] uppercase font-sans tracking-[0.2em] text-[var(--gold-subtle)] font-medium">
              VIP Atelier Invitation
            </span>
          </div>
        </ScrollReveal>

        {/* Major Closing Headline with Mask Reveal */}
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif font-light text-white leading-[1.05]">
          <ScrollReveal variant="mask-reveal" delay={0.15} duration={0.95}>
            <span>Your Skin’s Golden Era</span>
          </ScrollReveal>
          <ScrollReveal variant="mask-reveal" delay={0.3} duration={0.95}>
            <span className="editorial-italic font-normal text-[var(--gold-subtle)] block">
              Begins Tonight.
            </span>
          </ScrollReveal>
        </h2>

        <ScrollReveal variant="blur-in" delay={0.45} duration={0.9}>
          <p className="max-w-xl mx-auto text-base sm:text-lg text-white/70 font-sans font-light leading-relaxed">
            Join our private salon to receive access to micro-batch reserve harvests, private masterclasses with our cellular biochemists, and a complimentary 15ml Discovery Flask with your inaugural order.
          </p>
        </ScrollReveal>

        {/* Newsletter / VIP Concierge Form */}
        <ScrollReveal variant="fade-up" delay={0.6} duration={0.8}>
          <div className="max-w-xl mx-auto pt-4">
            {!subscribed ? (
              <form onSubmit={handleSubmit} className="p-1.5 sm:p-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-2xl shadow-2xl flex flex-col sm:flex-row items-center gap-2 focus-within:border-[var(--gold-primary)] transition-all">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="flex-1 bg-transparent px-6 py-3.5 text-xs sm:text-sm font-sans text-white placeholder-white/45 outline-none w-full sm:w-auto text-center sm:text-left"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[var(--gold-gradient)] text-black text-xs font-sans uppercase tracking-[0.2em] font-semibold hover:opacity-95 shadow-md flex items-center justify-center gap-2 transition-all hover:scale-[1.02] shrink-0"
                >
                  <span>Request Entry</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            ) : (
              <div className="p-6 rounded-2xl bg-white/10 border border-[var(--gold-primary)] text-white space-y-2 animate-in zoom-in-95 backdrop-blur-xl">
                <div className="flex items-center justify-center gap-2 text-[var(--gold-primary)] font-semibold text-xs uppercase tracking-widest font-sans">
                  <Check className="w-4 h-4" />
                  <span>Invitation Dispatched</span>
                </div>
                <p className="text-xs sm:text-sm text-white/80 font-sans leading-relaxed">
                  Check your inbox for your private concierge code and complimentary discovery voucher.
                </p>
              </div>
            )}
          </div>
        </ScrollReveal>

        {/* Secondary Browse Collection Button */}
        <ScrollReveal variant="fade-up" delay={0.75}>
          <div className="pt-6">
            <button
              onClick={() => {
                soundEngine.playChime('click');
                onExploreCollection();
              }}
              className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full border border-white/15 text-white/70 hover:text-white hover:border-[var(--gold-primary)] hover:bg-white/5 transition-all text-xs tracking-[0.2em] font-sans uppercase"
            >
              <span>Explore The Complete Collection Archive</span>
              <ArrowRight className="w-3 h-3 text-[var(--gold-primary)]" />
            </button>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}

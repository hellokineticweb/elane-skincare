import React, { Suspense, lazy } from 'react';
import { ShoppingBag, Sparkles } from 'lucide-react';
import { soundEngine } from '../../utils/audio';
import { ScrollReveal } from '../ui/ScrollReveal';

const InteractiveProductViewer = lazy(() =>
  import('../canvas/InteractiveProductViewer').then((m) => ({ default: m.InteractiveProductViewer }))
);

function ViewerFallback() {
  return (
    <div className="relative w-full h-[620px] lg:h-[720px] rounded-2xl bg-gradient-to-b from-[#1C1A18] to-[#121110] border border-white/10 flex flex-col items-center justify-center text-center p-8">
      <div className="w-12 h-12 rounded-full border border-[var(--gold-primary)]/30 flex items-center justify-center animate-pulse mb-4">
        <span className="font-serif text-lg text-[var(--gold-primary)] font-light">É</span>
      </div>
      <span className="text-xs font-sans uppercase tracking-[0.25em] text-white/50">
        Initializing 360° Tactile Laboratory...
      </span>
    </div>
  );
}

export function ProductShowcase({ onAddToCart }) {
  return (
    <section id="showcase" className="section-padding bg-[#121110] text-[#FBF9F5] relative overflow-hidden">
      {/* Background Subtle Caustic Glow */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-[radial-gradient(circle,_rgba(212,175,55,0.06)_0%,_rgba(0,0,0,0)_70%)] pointer-events-none" />

      <div className="elane-container relative z-10 space-y-12">
        
        {/* Section Header with Mask Reveal */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-2">
            <ScrollReveal variant="fade-up" delay={0.05}>
              <div className="flex items-center gap-3">
                <span className="w-8 h-[1px] bg-[var(--gold-primary)]" />
                <span className="text-xs uppercase tracking-[0.25em] text-[var(--gold-primary)] font-semibold font-sans">
                  3D Interactive Architecture
                </span>
              </div>
            </ScrollReveal>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-white leading-tight">
              <ScrollReveal variant="mask-reveal" delay={0.15} duration={0.9}>
                <span>The Flacon Royale.</span>
              </ScrollReveal>
            </h2>
          </div>

          <ScrollReveal variant="blur-in" delay={0.3} duration={0.85}>
            <p className="max-w-md text-sm sm:text-base text-white/70 font-sans font-light leading-relaxed">
              Every curve, glass refraction angle, and millimeter of weight is precision-engineered to shield raw bio-actives while offering a tactile sensory unboxing ritual.
            </p>
          </ScrollReveal>
        </div>

        {/* 3D Interactive Canvas Box with Smooth Entrance */}
        <ScrollReveal variant="scale-up" delay={0.2} duration={0.95}>
          <Suspense fallback={<ViewerFallback />}>
            <InteractiveProductViewer />
          </Suspense>
        </ScrollReveal>


        {/* Product Quick Specs & Add to Bag Callout Banner */}
        <ScrollReveal variant="fade-up" delay={0.35} duration={0.85}>
          <div className="p-6 sm:p-8 rounded-2xl bg-[#1C1A18] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="flex flex-wrap items-center gap-6 sm:gap-10">
              <div className="space-y-0.5">
                <span className="text-[10px] uppercase tracking-widest text-[var(--gold-subtle)] font-sans block">
                  The Masterpiece
                </span>
                <h4 className="text-xl sm:text-2xl font-serif text-white font-normal">
                  L'Élixir Sublime (50ml)
                </h4>
              </div>

              <div className="h-10 w-[1px] bg-white/15 hidden sm:block" />

              <div className="space-y-0.5">
                <span className="text-[10px] uppercase tracking-widest text-white/50 font-sans block">
                  Active Potency
                </span>
                <span className="text-sm sm:text-base font-sans text-[var(--gold-primary)] font-medium">
                  98.6% Bio-Ferment
                </span>
              </div>

              <div className="h-10 w-[1px] bg-white/15 hidden sm:block" />

              <div className="space-y-0.5">
                <span className="text-[10px] uppercase tracking-widest text-white/50 font-sans block">
                  Investment
                </span>
                <span className="text-xl sm:text-2xl font-serif text-white font-light">
                  $245 USD
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                soundEngine.playChime('crystal');
                onAddToCart({
                  id: 'elixir-sublime',
                  name: "L'Élixir Sublime",
                  price: 245,
                  volume: "50ml / 1.7 fl. oz.",
                  image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=85"
                });
              }}
              className="btn-luxury-gold w-full lg:w-auto hover:scale-105 transition-transform"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Acquire Signature Flacon</span>
            </button>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}

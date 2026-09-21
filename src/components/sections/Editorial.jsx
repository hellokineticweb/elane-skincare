import React from 'react';
import { Quote, Sparkles } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';

export function Editorial() {
  return (
    <section className="section-padding bg-[#1A1918] text-[#FBF9F5] relative overflow-hidden">
      <div className="elane-container space-y-16 relative z-10">
        
        {/* Editorial Magazine Top Banner */}
        <div className="border-b border-white/10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <ScrollReveal variant="fade-up" delay={0.05}>
              <span className="text-xs uppercase tracking-[0.3em] text-[var(--gold-primary)] font-semibold font-sans block mb-2">
                L'Atelier Édit • Issue No. 08
              </span>
            </ScrollReveal>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light leading-tight text-white">
              <ScrollReveal variant="mask-reveal" delay={0.15} duration={0.9}>
                <span>The Architecture of Radiance.</span>
              </ScrollReveal>
            </h2>
          </div>

          <ScrollReveal variant="blur-in" delay={0.3} duration={0.85}>
            <p className="max-w-md text-sm text-white/70 font-sans font-light leading-relaxed">
              Behind the closed doors of our high-altitude Valais laboratory, where rare botanicals are coaxed into their highest biological vibration.
            </p>
          </ScrollReveal>
        </div>

        {/* Magazine Asymmetric Editorial Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Hero Spread Photo */}
          <ScrollReveal variant="scale-up" delay={0.2} duration={0.9} className="lg:col-span-7">
            <div className="relative group overflow-hidden rounded-2xl h-[480px] lg:h-[580px] shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
                alt="ÉLANE Editorial Campaign"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-1000 filter grayscale-[20%] brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8 sm:p-10">
                <span className="text-xs font-mono uppercase tracking-widest text-[var(--gold-primary)] mb-1">
                  Campaign Muse: Elena S.
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-light text-white leading-snug">
                  "When skincare transcends vanity and becomes an intimate daily communion with nature's wisdom."
                </h3>
              </div>
            </div>
          </ScrollReveal>

          {/* Secondary Editorial Column */}
          <div className="lg:col-span-5 space-y-8">
            <ScrollReveal variant="fade-up" delay={0.3} duration={0.8}>
              <div className="relative overflow-hidden rounded-2xl h-64 bg-[#24211E] shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=600&q=80"
                  alt="Alpine Harvest"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />

                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-lg bg-black/60 backdrop-blur-md text-white text-xs font-sans">
                  Hand-harvested Alpine Snow Rose at 3,200m altitude
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={0.4} duration={0.8}>
              <div className="p-8 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                <Quote className="w-8 h-8 text-[var(--gold-primary)] opacity-70" />
                <p className="text-base sm:text-lg font-serif italic text-white/90 leading-relaxed">
                  "We reject artificial fragrance, cheap filler emulsifiers, and water-heavy formulas. Every single drop in an ÉLANE vessel is concentrated bio-activity."
                </p>
                <div className="pt-2">
                  <span className="text-xs font-sans font-semibold text-[var(--gold-primary)] uppercase tracking-wider block">
                    Dr. Geneviève Laurent
                  </span>
                  <span className="text-[11px] font-sans text-white/50">
                    Head of Botanical Formulation, Geneva
                  </span>
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>

      </div>
    </section>
  );
}

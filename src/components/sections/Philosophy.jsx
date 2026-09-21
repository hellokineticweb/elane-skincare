import React from 'react';
import { Sparkles, Compass, Shield, Feather, CheckCircle2 } from 'lucide-react';
import { ScrollReveal, SplitTextReveal } from '../ui/ScrollReveal';

export function Philosophy() {
  return (
    <section id="philosophy" className="section-padding bg-[#FAF8F5] relative overflow-hidden">
      {/* Decorative Editorial Watermark with subtle scroll parallax */}
      <div
        data-scroll-parallax
        data-scroll-speed="0.15"
        className="absolute top-12 right-6 text-[18vw] font-serif font-light text-black/[0.025] pointer-events-none select-none leading-none will-change-transform"
      >
        ÉLANE
      </div>

      <div className="elane-container relative z-10">
        
        {/* Section Tag */}
        <ScrollReveal variant="fade-up" delay={0.05}>
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-[1px] bg-[var(--gold-primary)]" />
            <span className="text-overline">The Philosophy</span>
          </div>
        </ScrollReveal>

        {/* Big Editorial Manifesto Headline with Mask Reveals */}
        <div className="max-w-4xl space-y-6">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-light text-[var(--text-primary)] leading-[1.08]">
            <ScrollReveal variant="mask-reveal" delay={0.15} duration={0.95}>
              <span>We do not rush nature.</span>
            </ScrollReveal>
            <ScrollReveal variant="mask-reveal" delay={0.3} duration={0.95}>
              <span>
                We amplify its <span className="editorial-italic text-[#72614E]">cellular frequency.</span>
              </span>
            </ScrollReveal>
          </h2>
          
          <ScrollReveal variant="blur-in" delay={0.45} duration={0.9}>
            <p className="text-lg md:text-xl font-sans font-light text-[var(--text-secondary)] leading-relaxed max-w-2xl">
              In an industry obsessed with synthetic shortcuts and fleeting results, ÉLANE was born from a radical thesis: true cutaneous vitality requires slow bio-fermentation, micro-molecular synchronization, and respect for circadian rhythms.
            </p>
          </ScrollReveal>
        </div>

        {/* Asymmetrical Editorial Grid with Staggered Entrances */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 mt-16 lg:mt-24">
          
          {/* Card 1: High-Fashion Laboratory Image with Cutout Mask */}
          <ScrollReveal variant="scale-up" delay={0.2} className="md:col-span-5 h-full">
            <div className="relative group overflow-hidden rounded-3xl bg-[#EDE6DD] min-h-[500px] h-full shadow-sm flex flex-col justify-end">
              <img
                src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=80"
                alt="ÉLANE Botanical Extraction Atelier"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter saturate-90 brightness-95 absolute inset-0"
              />

              <div className="relative z-10 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-8 sm:p-10 lg:p-12 text-white space-y-3">
                <span className="text-[11px] uppercase font-sans tracking-[0.24em] text-[var(--gold-subtle)] font-medium block">
                  Atelier Valais, Switzerland
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-light text-white leading-snug">
                  The 90-Day Bio-Fermentation Chamber
                </h3>
                <p className="text-xs sm:text-sm text-white/80 font-sans font-light leading-relaxed pt-1">
                  Raw botanical botanicals rest in micro-aerobic biocultures, allowing enzymes to break complex fatty chains into bio-available micro-droplets.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 2 & 3: Editorial Pillars */}
          <div className="md:col-span-7 flex flex-col justify-between gap-6 lg:gap-8">
            
            <ScrollReveal variant="fade-up" delay={0.35}>
              <div className="glass-panel p-8 sm:p-10 lg:p-12 rounded-3xl space-y-5 hover:shadow-md transition-all border border-black/5">
                <div className="w-12 h-12 rounded-full bg-[var(--gold-primary)]/15 flex items-center justify-center text-[var(--gold-primary)]">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="space-y-3">
                  <h4 className="text-2xl sm:text-3xl font-serif text-[var(--text-primary)] font-normal leading-snug">
                    Circadian Resonance Technology
                  </h4>
                  <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed font-sans font-light">
                    Human skin operates on a precise 24-hour circadian clock. Our formulas are sequenced to synchronize with dermal defense enzymes at sunrise and cellular mitosis repair signals at midnight.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <ScrollReveal variant="fade-up" delay={0.45} className="h-full">
                <div className="glass-panel p-8 sm:p-9 rounded-3xl h-full flex flex-col justify-between border border-black/5 hover:shadow-md transition-all">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-[var(--gold-primary)] font-medium text-[11px] tracking-widest uppercase font-sans">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                      <span>Biophotonic Shield</span>
                    </div>
                    <h5 className="font-serif text-xl sm:text-2xl text-[var(--text-primary)] font-normal leading-snug">
                      Zero Synthetic Preservatives
                    </h5>
                    <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed font-sans font-light pt-1">
                      Deep violet biophotonic glass naturally filters degrading light rays, preserving active peptide potency without parabens or phenoxyethanol.
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal variant="fade-up" delay={0.55} className="h-full">
                <div className="glass-panel p-8 sm:p-9 rounded-3xl h-full flex flex-col justify-between border border-black/5 hover:shadow-md transition-all">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-[var(--gold-primary)] font-medium text-[11px] tracking-widest uppercase font-sans">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                      <span>Ethical High Altitude</span>
                    </div>
                    <h5 className="font-serif text-xl sm:text-2xl text-[var(--text-primary)] font-normal leading-snug">
                      Regenerative Foraging
                    </h5>
                    <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed font-sans font-light pt-1">
                      Hand-harvested in small alpine micro-batches in collaboration with local Swiss botanists, ensuring zero disruption to alpine ecosystems.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

import React, { useState } from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Award, Droplets } from 'lucide-react';
import { Hero3DCanvas } from '../canvas/Hero3DCanvas';
import { soundEngine } from '../../utils/audio';
import { ScrollReveal, SplitTextReveal } from '../ui/ScrollReveal';

export function Hero({ onExploreRitual, onDiscover }) {
  const [materialPreset, setMaterialPreset] = useState('amber');

  return (
    <section className="relative min-h-screen w-full flex items-center pt-24 pb-16 overflow-hidden bg-gradient-to-b from-[#FAF8F5] via-[#F6F0EA] to-[#FBF9F5]">
      {/* Subtle Background Glow Radial Accent */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-[rgba(212,175,55,0.09)] to-[rgba(163,177,155,0.06)] rounded-full blur-3xl pointer-events-none" />

      <div className="elane-container w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* Left Column: Editorial Headline & Storytelling */}
        <div className="lg:col-span-6 flex flex-col justify-center text-left space-y-6 pt-4 lg:pt-0">
          
          {/* Award Badge / Monogram Tag */}
          <ScrollReveal variant="fade-up" delay={0.1}>
            <div className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-black/5 border border-black/10 backdrop-blur-sm shadow-sm hover:border-[var(--gold-primary)]/50 transition-colors">
              <Award className="w-3.5 h-3.5 text-[var(--gold-primary)]" />
              <span className="text-[11px] font-sans uppercase tracking-[0.22em] text-[var(--text-secondary)] font-medium">
                Grand Prix de la Beauté 2026 Winner
              </span>
            </div>
          </ScrollReveal>

          {/* Major Hero Headline with Award-Winning Masked Typography */}
          <div className="space-y-1">
            <ScrollReveal variant="fade-up" delay={0.2}>
              <span className="text-xs uppercase tracking-[0.3em] text-[var(--gold-primary)] font-semibold font-sans block">
                Haute Botanical Formulation
              </span>
            </ScrollReveal>

            <h1 className="text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-serif font-light tracking-tight text-[var(--text-primary)] leading-[1.02]">
              <ScrollReveal variant="mask-reveal" delay={0.3} duration={1.0}>
                <span>Skin,</span>
              </ScrollReveal>
              <ScrollReveal variant="mask-reveal" delay={0.45} duration={1.0}>
                <span className="editorial-italic font-normal text-[#695B48] block">
                  Reimagined.
                </span>
              </ScrollReveal>
            </h1>
          </div>

          {/* Supporting Copy */}
          <ScrollReveal variant="blur-in" delay={0.6} duration={0.9}>
            <p className="text-base sm:text-lg text-[var(--text-secondary)] font-sans font-light max-w-xl leading-relaxed">
              Advanced botanical science, distilled into rituals designed for modern skin. 
              Harnessing high-altitude cellular ferments and biophotonic preservation to awaken your skin’s innate regeneration code.
            </p>
          </ScrollReveal>

          {/* CTAs */}
          <ScrollReveal variant="fade-up" delay={0.75} duration={0.8}>
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <button
                onClick={() => {
                  soundEngine.playChime('click');
                  onExploreRitual();
                }}
                className="btn-luxury-primary group shadow-md"
              >
                <span>Explore the Ritual</span>
                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  soundEngine.playChime('click');
                  onDiscover();
                }}
                className="btn-luxury-secondary"
              >
                <span>Discover ÉLANE</span>
              </button>
            </div>
          </ScrollReveal>

          {/* Micro Proof Pillars */}
          <ScrollReveal variant="fade-up" delay={0.9} duration={0.85}>
            <div className="pt-8 border-t border-black/10 grid grid-cols-3 gap-3 sm:gap-6 text-left">
              <div className="group space-y-1">
                <span className="text-xl sm:text-2xl font-serif font-medium text-[var(--text-primary)] block group-hover:text-[var(--gold-primary)] transition-colors leading-none">
                  98.6%
                </span>
                <span className="text-[10px] sm:text-[11px] font-sans text-[var(--text-muted)] tracking-wider uppercase block leading-tight">
                  Active Ferments
                </span>
              </div>

              <div className="group space-y-1">
                <span className="text-xl sm:text-2xl font-serif font-medium text-[var(--text-primary)] block group-hover:text-[var(--gold-primary)] transition-colors leading-none">
                  3,200m
                </span>
                <span className="text-[10px] sm:text-[11px] font-sans text-[var(--text-muted)] tracking-wider uppercase block leading-tight">
                  Swiss Alpine Harvest
                </span>
              </div>

              <div className="group space-y-1">
                <span className="text-xl sm:text-2xl font-serif font-medium text-[var(--text-primary)] block group-hover:text-[var(--gold-primary)] transition-colors leading-none">
                  100%
                </span>
                <span className="text-[10px] sm:text-[11px] font-sans text-[var(--text-muted)] tracking-wider uppercase block leading-tight">
                  Biophotonic Glass
                </span>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Right Column: 3D Cinematic Flacon Stage */}
        <div className="lg:col-span-6 relative w-full h-[480px] sm:h-[560px] lg:h-[640px] flex items-center justify-center">
          {/* Subtle Circular Backdrop Glow */}
          <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-[radial-gradient(circle,_rgba(212,175,55,0.18)_0%,_rgba(255,255,255,0)_70%)] pointer-events-none" />

          {/* 3D WebGL Canvas */}
          <Hero3DCanvas
            materialPreset={materialPreset}
            onMaterialChange={(newPreset) => {
              soundEngine.playChime('click');
              setMaterialPreset(newPreset);
            }}
          />
        </div>

      </div>

      {/* Bottom Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none opacity-60">
        <span className="text-[9px] uppercase tracking-[0.25em] font-sans text-[var(--text-muted)]">
          Scroll to Begin Journey
        </span>
        <div className="w-[1px] h-6 bg-gradient-to-b from-[var(--gold-primary)] to-transparent animate-pulse" />
      </div>
    </section>
  );
}

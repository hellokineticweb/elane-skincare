import React, { useState } from 'react';
import { Leaf, RefreshCw, ShieldCheck, Sparkles, Plus, Minus } from 'lucide-react';
import { soundEngine } from '../../utils/audio';
import { ScrollReveal } from '../ui/ScrollReveal';

export function Sustainability() {
  const [refillCount, setRefillCount] = useState(3);

  // Dynamic eco savings calculation
  const plasticSavedGrams = refillCount * 85;
  const carbonSavedKg = (refillCount * 1.8).toFixed(1);
  const bottlesPreserved = refillCount;

  return (
    <section className="section-padding bg-[#EBF0E9] text-[#1A1918] relative overflow-hidden">
      <div className="elane-container space-y-16 relative z-10">
        
        {/* Section Header with Mask Reveal */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-black/10 pb-8">
          <div className="space-y-2">
            <ScrollReveal variant="fade-up" delay={0.05}>
              <div className="flex items-center gap-3">
                <Leaf className="w-4 h-4 text-[var(--sage-muted)]" />
                <span className="text-xs uppercase tracking-[0.25em] font-semibold font-sans text-[var(--sage-muted)]">
                  Eco-Luxury Stewardship
                </span>
              </div>
            </ScrollReveal>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light leading-tight">
              <ScrollReveal variant="mask-reveal" delay={0.15} duration={0.9}>
                <span>Eternal Vessels.</span>
              </ScrollReveal>
            </h2>
          </div>

          <ScrollReveal variant="blur-in" delay={0.3} duration={0.85}>
            <p className="max-w-md text-sm sm:text-base text-[var(--text-secondary)] font-sans font-light leading-relaxed">
              Our heavy biophotonic glass flacons are forged to last a lifetime. With our biodegradable aluminum refill pods, luxury beauty creates zero landfill waste.
            </p>
          </ScrollReveal>
        </div>

        {/* 2-Column: Interactive Savings Calculator & Eco Commitments */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Left: Interactive Refill Pod Calculator */}
          <ScrollReveal variant="scale-up" delay={0.2} duration={0.9} className="lg:col-span-6 h-full">
            <div className="bg-white/80 backdrop-blur-md p-8 sm:p-10 rounded-3xl border border-black/5 shadow-sm space-y-8 flex flex-col justify-between h-full">
            <div className="space-y-3">
              <span className="text-[10px] uppercase tracking-widest font-mono font-bold text-[var(--sage-muted)]">
                Interactive Vessel Longevity Engine
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-light text-[var(--text-primary)]">
                Calculate Your Environmental Impact
              </h3>
              <p className="text-xs text-[var(--text-secondary)] font-sans">
                Adjust how many annual vessel refills you complete with ÉLANE lightweight bio-pouches:
              </p>
            </div>

            {/* Stepper Counter */}
            <div className="flex items-center justify-center gap-6 py-4 bg-[#F6F2EA] rounded-2xl border border-black/5">
              <button
                onClick={() => {
                  soundEngine.playChime('click');
                  setRefillCount(Math.max(1, refillCount - 1));
                }}
                className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center border border-black/10 hover:bg-black hover:text-white transition-colors shadow-sm"
              >
                <Minus className="w-4 h-4" />
              </button>

              <div className="text-center">
                <span className="text-4xl font-serif font-medium text-[var(--text-primary)]">
                  {refillCount}
                </span>
                <span className="text-[11px] font-sans uppercase tracking-widest text-[var(--text-muted)] block mt-0.5">
                  Refill Cycles / Year
                </span>
              </div>

              <button
                onClick={() => {
                  soundEngine.playChime('click');
                  setRefillCount(refillCount + 1);
                }}
                className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center border border-black/10 hover:bg-black hover:text-white transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Dynamic Calculated Impact Metrics */}
            <div className="grid grid-cols-3 gap-3 text-center pt-2">
              <div className="p-3 bg-white rounded-xl border border-black/5">
                <span className="text-xl sm:text-2xl font-serif font-medium text-[#446A46] block">
                  {bottlesPreserved}
                </span>
                <span className="text-[10px] font-sans text-[var(--text-secondary)] uppercase tracking-wider">
                  Glass Bottles Saved
                </span>
              </div>

              <div className="p-3 bg-white rounded-xl border border-black/5">
                <span className="text-xl sm:text-2xl font-serif font-medium text-[#446A46] block">
                  {plasticSavedGrams}g
                </span>
                <span className="text-[10px] font-sans text-[var(--text-secondary)] uppercase tracking-wider">
                  Plastic Prevented
                </span>
              </div>

              <div className="p-3 bg-white rounded-xl border border-black/5">
                <span className="text-xl sm:text-2xl font-serif font-medium text-[#446A46] block">
                  {carbonSavedKg}kg
                </span>
                <span className="text-[10px] font-sans text-[var(--text-secondary)] uppercase tracking-wider">
                  CO₂ Footprint Cut
                </span>
              </div>
            </div>
          </div>
          </ScrollReveal>

          {/* Right: Stewardship Pillars */}
          <div className="lg:col-span-6 space-y-4 flex flex-col justify-between">
            <ScrollReveal variant="fade-up" delay={0.25} className="h-full">
              <div className="p-6 sm:p-7 rounded-2xl bg-white/80 border border-black/5 space-y-2 flex flex-col justify-start min-h-[135px] hover:shadow-md transition-all h-full">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--sage-muted)] font-sans">
                  <RefreshCw className="w-4 h-4 flex-shrink-0" />
                  <span>Closed-Loop Circularity</span>
                </div>
                <h4 className="text-xl font-serif text-[var(--text-primary)] leading-snug">
                  The Infinity Vessel Return Program
                </h4>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-sans leading-relaxed font-light">
                  Return five empty refill pods with our prepaid label to receive a complimentary $50 atelier credit toward your next botanical nectar.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={0.35} className="h-full">
              <div className="p-6 sm:p-7 rounded-2xl bg-white/80 border border-black/5 space-y-2 flex flex-col justify-start min-h-[135px] hover:shadow-md transition-all h-full">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--sage-muted)] font-sans">
                  <Leaf className="w-4 h-4 flex-shrink-0" />
                  <span>Zero Micro-Plastics Guarantee</span>
                </div>
                <h4 className="text-xl font-serif text-[var(--text-primary)] leading-snug">
                  100% Water-Soluble Plant Inks
                </h4>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-sans leading-relaxed font-light">
                  All packaging cartons are made from FSC-certified recycled hemp pulp and printed with non-toxic botanical algae pigments.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={0.45} className="h-full">
              <div className="p-6 sm:p-7 rounded-2xl bg-white/80 border border-black/5 space-y-2 flex flex-col justify-start min-h-[135px] hover:shadow-md transition-all h-full">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--sage-muted)] font-sans">
                  <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                  <span>Certified Carbon Negative</span>
                </div>
                <h4 className="text-xl font-serif text-[var(--text-primary)] leading-snug">
                  1% For Alpine Conservation
                </h4>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-sans leading-relaxed font-light">
                  Every bottle purchased directly funds the re-wilding and preservation of fragile high-altitude flora in the Swiss Alpine National Parks.
                </p>
              </div>
            </ScrollReveal>
          </div>

        </div>

      </div>
    </section>
  );
}

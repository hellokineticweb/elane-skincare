import React, { useState } from 'react';
import { INGREDIENTS } from '../../data/ingredients';
import { Sparkles, Microscope, Compass, Check, ArrowRight } from 'lucide-react';
import { soundEngine } from '../../utils/audio';
import { ScrollReveal } from '../ui/ScrollReveal';

export function Ingredients() {
  const [selectedId, setSelectedId] = useState(INGREDIENTS[0].id);

  const activeIngredient = INGREDIENTS.find(i => i.id === selectedId) || INGREDIENTS[0];

  return (
    <section id="ingredients" className="section-padding bg-[#F6F2EA] relative overflow-hidden">
      <div className="elane-container relative z-10 space-y-12">
        
        {/* Section Header with Mask Reveal */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <ScrollReveal variant="fade-up" delay={0.05}>
              <div className="flex items-center gap-3">
                <span className="w-8 h-[1px] bg-[var(--gold-primary)]" />
                <span className="text-overline">Botanical Alchemy</span>
              </div>
            </ScrollReveal>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-[var(--text-primary)] leading-tight">
              <ScrollReveal variant="mask-reveal" delay={0.15} duration={0.9}>
                <span>Raw Flora.</span>
              </ScrollReveal>
              <ScrollReveal variant="mask-reveal" delay={0.3} duration={0.9}>
                <span className="editorial-italic font-normal text-[#756553] block">
                  Molecular Precision.
                </span>
              </ScrollReveal>
            </h2>
          </div>

          <ScrollReveal variant="blur-in" delay={0.4} duration={0.85}>
            <p className="max-w-md text-sm sm:text-base text-[var(--text-secondary)] font-sans font-light leading-relaxed">
              We isolate active plant metabolites in their purest cellular state, utilizing green cryogenic and bio-fermentation methods that maintain zero degradation of delicate botanical enzymes.
            </p>
          </ScrollReveal>
        </div>

        {/* Interactive Ingredient Tabs Grid with Staggered Entrance */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {INGREDIENTS.map((item, index) => (
            <ScrollReveal key={item.id} variant="fade-up" delay={0.1 + index * 0.1} duration={0.7} className="h-full">
              <button
                onClick={() => {
                  soundEngine.playChime('click');
                  setSelectedId(item.id);
                }}
                className={`w-full h-full min-h-[120px] p-5 sm:p-6 rounded-xl text-left transition-all duration-300 flex flex-col justify-between border ${
                  selectedId === item.id
                    ? 'bg-white shadow-md border-[var(--gold-primary)] ring-1 ring-[var(--gold-primary)]/40 scale-[1.02]'
                    : 'bg-white/50 border-black/5 hover:bg-white/80 hover:border-black/15'
                }`}
              >
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-widest font-sans text-[var(--gold-primary)] font-semibold block">
                    {item.concentration}
                  </span>
                  <h4 className="text-base sm:text-lg font-serif font-medium text-[var(--text-primary)] leading-tight">
                    {item.name}
                  </h4>
                </div>
                <span className="text-xs text-[var(--text-muted)] font-sans italic mt-2 block">
                  {item.botanicalName}
                </span>
              </button>
            </ScrollReveal>
          ))}
        </div>

        {/* Active Ingredient Deep-Dive Showcase Card */}
        <ScrollReveal variant="scale-up" delay={0.25} duration={0.9}>
          <div className="glass-panel p-6 sm:p-10 rounded-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-white/90 shadow-lg border border-[var(--glass-border)] animate-in fade-in duration-400">
          
          {/* Left: High-Res Botanical Imagery with Micro-Badge */}
          <div className="lg:col-span-5 relative group overflow-hidden rounded-xl h-[340px] sm:h-[420px] shadow-sm">
            <img
              src={activeIngredient.image}
              alt={activeIngredient.name}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
            />

            <div className="absolute top-4 left-4">
              <span className="gold-badge shadow-md backdrop-blur-md bg-white/80">
                {activeIngredient.clinicalKey}
              </span>
            </div>
            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-lg bg-black/60 backdrop-blur-md text-white">
              <span className="text-[10px] uppercase tracking-widest text-[var(--gold-subtle)] block">
                Origin Geographic Coordinate
              </span>
              <span className="text-xs font-sans font-medium text-white/90">
                {activeIngredient.origin}
              </span>
            </div>
          </div>

          {/* Right: Scientific Dossier & Cellular Mechanism */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[var(--gold-primary)] font-semibold font-sans">
                {activeIngredient.tagline}
              </span>
              <h3 className="text-3xl sm:text-4xl font-serif font-light text-[var(--text-primary)] mt-1">
                {activeIngredient.name}
              </h3>
              <p className="text-xs font-mono text-[var(--text-muted)] mt-0.5">
                {activeIngredient.botanicalName} • {activeIngredient.concentration}
              </p>
            </div>

            <p className="text-base text-[var(--text-secondary)] font-sans font-light leading-relaxed">
              {activeIngredient.description}
            </p>

            {/* Scientific Specs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-5 rounded-xl bg-[#FAF8F5] border border-black/5 space-y-2 flex flex-col justify-start min-h-[110px]">
                <div className="flex items-center gap-2 text-xs font-sans font-semibold text-[var(--text-primary)] uppercase tracking-wider">
                  <Microscope className="w-3.5 h-3.5 text-[var(--gold-primary)] flex-shrink-0" />
                  <span>Extraction Method</span>
                </div>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-sans font-light leading-relaxed">
                  {activeIngredient.extraction}
                </p>
              </div>

              <div className="p-5 rounded-xl bg-[#FAF8F5] border border-black/5 space-y-2 flex flex-col justify-start min-h-[110px]">
                <div className="flex items-center gap-2 text-xs font-sans font-semibold text-[var(--text-primary)] uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-[var(--gold-primary)] flex-shrink-0" />
                  <span>Cellular Mechanism</span>
                </div>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-sans font-light leading-relaxed">
                  {activeIngredient.mechanism}
                </p>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2 text-xs text-[var(--text-muted)] font-sans">
              <Check className="w-4 h-4 text-[var(--gold-primary)]" />
              <span>Certified 100% Bio-Fermented • Zero Chemical Solvents • Non-GMO</span>
            </div>
          </div>

        </div>
        </ScrollReveal>

      </div>
    </section>
  );
}

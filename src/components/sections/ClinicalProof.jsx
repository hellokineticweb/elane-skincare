import React, { useState, useRef } from 'react';
import { CLINICAL_METRICS, TESTIMONIALS } from '../../data/clinicalData';
import { Star, ShieldCheck, CheckCircle, Award, MoveHorizontal } from 'lucide-react';
import { soundEngine } from '../../utils/audio';
import { ScrollReveal } from '../ui/ScrollReveal';

export function ClinicalProof() {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef(null);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  };

  const handleTouchMove = (e) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e) => {
    if (e.buttons === 1) {
      handleMove(e.clientX);
    }
  };

  return (
    <section id="clinical" className="section-padding bg-[#FAF8F5] relative overflow-hidden">
      <div className="elane-container space-y-16 relative z-10">
        
        {/* Section Header with Mask Reveal */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-black/10 pb-8">
          <div className="space-y-2">
            <ScrollReveal variant="fade-up" delay={0.05}>
              <div className="flex items-center gap-3">
                <span className="w-8 h-[1px] bg-[var(--gold-primary)]" />
                <span className="text-overline">Clinical Validation</span>
              </div>
            </ScrollReveal>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-[var(--text-primary)] leading-tight">
              <ScrollReveal variant="mask-reveal" delay={0.15} duration={0.9}>
                <span>Biomarkers & Results.</span>
              </ScrollReveal>
            </h2>
          </div>

          <ScrollReveal variant="blur-in" delay={0.3} duration={0.85}>
            <p className="max-w-md text-sm sm:text-base text-[var(--text-secondary)] font-sans font-light leading-relaxed">
              Rigorous double-blind clinical trials conducted by independent Swiss dermatological laboratories over 28 continuous days.
            </p>
          </ScrollReveal>
        </div>

        {/* Interactive Before / After Slider + Trial Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left: Interactive Before / After Image Splitter */}
          <ScrollReveal variant="scale-up" delay={0.15} duration={0.9} className="lg:col-span-6">
            <div className="space-y-4">
              <div
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onTouchMove={handleTouchMove}
                className="relative h-[380px] sm:h-[460px] rounded-2xl overflow-hidden cursor-ew-resize select-none shadow-xl border border-black/10 bg-[#EDE6DD]"
              >
                {/* After Image (Full background) */}
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=700&q=80"
                  alt="Day 28 After ÉLANE Protocol"
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover filter brightness-105 contrast-105"
                />
                <span className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-sans font-medium uppercase tracking-wider">
                  Day 28: Barrier Fortified
                </span>

                {/* Before Image (GPU-accelerated clip-path overlay) */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=700&q=80"
                    alt="Day 0 Baseline"
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover filter grayscale-[40%] brightness-85 contrast-90"
                  />

                  <span className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-sans font-medium uppercase tracking-wider">
                    Day 0: Baseline
                  </span>
                </div>


                {/* Draggable Divider Handle */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl z-30 flex items-center justify-center pointer-events-none"
                  style={{ left: `${sliderPos}%` }}
                >
                  <div className="w-9 h-9 rounded-full bg-[#1C1A18] text-[var(--gold-primary)] border-2 border-white flex items-center justify-center shadow-xl">
                    <MoveHorizontal className="w-4 h-4" />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 text-xs text-[var(--text-muted)] font-sans">
                <span>← Drag slider horizontally to compare 28-day cellular results →</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Clinical Trial Biomarker Metrics */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CLINICAL_METRICS.map((metric, idx) => (
              <ScrollReveal key={idx} variant="fade-up" delay={0.15 + idx * 0.1} duration={0.7} className="h-full">
                <div className="p-6 sm:p-7 rounded-2xl bg-white border border-black/5 shadow-sm space-y-2.5 hover:shadow-md transition-all h-full flex flex-col justify-between min-h-[165px]">
                  <div>
                    <span className="text-3xl sm:text-4xl font-serif font-light text-[var(--text-primary)] block leading-none">
                      {metric.value}
                    </span>
                    <h4 className="text-xs sm:text-sm font-sans font-semibold text-[var(--gold-primary)] uppercase tracking-wider mt-2.5">
                      {metric.label}
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-sans font-light leading-relaxed">
                    {metric.detail}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

        </div>

        {/* Verified High-Society Testimonials Grid */}
        <div className="pt-8 border-t border-black/10 space-y-8">
          <ScrollReveal variant="fade-up" delay={0.1}>
            <div className="flex items-center gap-3">
              <Award className="w-4 h-4 text-[var(--gold-primary)]" />
              <span className="text-xs uppercase tracking-[0.2em] font-sans font-semibold text-[var(--text-primary)]">
                Dermatological Endorsements & Press
              </span>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, idx) => (
              <ScrollReveal key={idx} variant="fade-up" delay={0.15 + idx * 0.12} duration={0.75} className="h-full">
                <div className="p-7 sm:p-8 rounded-2xl bg-white/80 border border-black/5 backdrop-blur-sm flex flex-col justify-between space-y-6 shadow-sm hover:shadow-md transition-all h-full min-h-[260px]">
                  <div className="space-y-3">
                    <div className="flex items-center gap-1 text-[var(--gold-primary)]">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <p className="text-sm sm:text-base font-serif italic text-[var(--text-primary)] leading-relaxed font-normal">
                      "{t.quote}"
                    </p>
                  </div>

                  <div className="flex items-center gap-3 pt-4 border-t border-black/5 mt-auto">
                    <img
                      src={t.avatar}
                      alt={t.author}
                      className="w-11 h-11 rounded-full object-cover border border-[var(--gold-primary)] shadow-sm"
                    />
                    <div>
                      <h5 className="text-xs sm:text-sm font-sans font-semibold text-[var(--text-primary)]">
                        {t.author}
                      </h5>
                      <span className="text-[11px] font-sans text-[var(--text-muted)] block">
                        {t.role}
                      </span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

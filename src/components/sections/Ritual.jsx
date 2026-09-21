import React, { useState } from 'react';
import { RITUAL_STEPS } from '../../data/rituals';
import { Clock, Sun, Moon, Sparkles, Check, Heart, Shield, Play } from 'lucide-react';
import { soundEngine } from '../../utils/audio';
import { ScrollReveal } from '../ui/ScrollReveal';

export function Ritual() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const currentStep = RITUAL_STEPS[activeStepIndex];

  return (
    <section 
      id="ritual" 
      className="section-padding transition-colors duration-700 relative overflow-hidden"
      style={{ 
        backgroundColor: currentStep.isDark ? '#141312' : currentStep.ambientColor,
        color: currentStep.isDark ? '#FBF9F5' : '#1A1918'
      }}
    >
      {/* Background Ambient Glow Shift */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-3xl pointer-events-none transition-all duration-1000"
        style={{ backgroundColor: currentStep.accentGlow }}
      />

      <div className="elane-container relative z-10 space-y-12">
        
        {/* Section Header with Mask Reveal */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <ScrollReveal variant="fade-up" delay={0.05}>
              <div className="flex items-center gap-3">
                <span className="w-8 h-[1px]" style={{ backgroundColor: currentStep.isDark ? '#D4AF37' : '#C5A880' }} />
                <span className="text-xs uppercase tracking-[0.25em] font-semibold font-sans" style={{ color: currentStep.isDark ? '#D4AF37' : '#8A6D3B' }}>
                  Circadian Protocol
                </span>
              </div>
            </ScrollReveal>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light leading-tight">
              <ScrollReveal variant="mask-reveal" delay={0.15} duration={0.9}>
                <span>The 24-Hour Ritual.</span>
              </ScrollReveal>
            </h2>
          </div>

          <ScrollReveal variant="blur-in" delay={0.3} duration={0.85}>
            <p className={`max-w-md text-sm sm:text-base font-sans font-light leading-relaxed ${currentStep.isDark ? 'text-white/70' : 'text-[var(--text-secondary)]'}`}>
              Synchronized with your biological clock to maximize transdermal absorption and restore natural cellular equilibrium throughout the day and night.
            </p>
          </ScrollReveal>
        </div>

        {/* 4-Step Interactive Timeline Navigation with Stagger */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {RITUAL_STEPS.map((step, idx) => (
            <ScrollReveal key={step.step} variant="fade-up" delay={0.1 + idx * 0.08} duration={0.7} className="h-full">
              <button
                onClick={() => {
                  soundEngine.playChime('click');
                  setActiveStepIndex(idx);
                }}
                className={`w-full h-full min-h-[135px] p-5 sm:p-6 rounded-2xl text-left transition-all duration-500 border relative overflow-hidden flex flex-col justify-between ${
                  activeStepIndex === idx
                    ? currentStep.isDark
                      ? 'bg-white/10 border-[var(--gold-primary)] text-white shadow-xl scale-[1.02]'
                      : 'bg-white border-[var(--gold-primary)] text-black shadow-lg scale-[1.02]'
                    : currentStep.isDark
                      ? 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
                      : 'bg-black/5 border-black/5 text-[var(--text-secondary)] hover:bg-black/10'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-[11px] font-mono font-bold tracking-widest text-[var(--gold-primary)]">
                      PHASE {step.step}
                    </span>
                    <span className="text-[11px] font-sans opacity-75 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[var(--gold-primary)]" />
                      {step.time}
                    </span>
                  </div>
                  <h4 className="text-lg sm:text-xl font-serif font-medium leading-snug">
                    {step.phase}
                  </h4>
                </div>
                <span className="text-xs font-sans opacity-70 block mt-2">
                  {step.subtitle}
                </span>
              </button>
            </ScrollReveal>
          ))}
        </div>

        {/* Active Phase Detailed Ritual Guide */}
        <ScrollReveal variant="scale-up" delay={0.25} duration={0.9}>
          <div className={`p-8 sm:p-12 rounded-3xl border transition-all duration-500 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
            currentStep.isDark
              ? 'bg-[#1C1A18]/90 border-white/15 text-white shadow-2xl backdrop-blur-xl'
              : 'bg-white/90 border-[var(--glass-border)] text-black shadow-xl backdrop-blur-xl'
          }`}>
          
          {/* Left: Step Overview & Product */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs uppercase font-sans tracking-widest bg-[var(--gold-primary)]/20 text-[var(--gold-primary)] font-semibold">
                <span>Phase {currentStep.step} of 04</span>
                <span>•</span>
                <span>{currentStep.duration}</span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-serif font-light mt-2 leading-tight">
                {currentStep.title}
              </h3>
            </div>

            <div className={`p-5 rounded-2xl border ${
              currentStep.isDark ? 'bg-white/5 border-white/10' : 'bg-[#FBF9F5] border-black/5'
            }`}>
              <span className="text-[10px] uppercase tracking-widest text-[var(--gold-primary)] font-semibold block">
                Recommended Formulation Sequence
              </span>
              <p className="text-base sm:text-lg font-serif font-medium mt-1">
                {currentStep.productName}
              </p>
            </div>

            <div className="space-y-1.5">
              <span className="text-[11px] uppercase tracking-wider font-semibold opacity-70 block">
                Primary Physiological Objective
              </span>
              <p className="text-xs sm:text-sm font-sans font-light opacity-90 leading-relaxed">
                {currentStep.focus}
              </p>
            </div>

            <div className="pt-3 border-t border-current/10 space-y-1">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-[var(--gold-primary)] block">
                Sensory & Aromatherapy Profile
              </span>
              <p className="text-xs sm:text-sm font-sans italic opacity-80 leading-relaxed">
                "{currentStep.sensory}"
              </p>
            </div>
          </div>

          {/* Right: Step-by-Step Application Technique */}
          <div className="lg:col-span-7 space-y-5">
            <h4 className="text-xl font-serif font-normal">
              Atelier Application Protocol
            </h4>

            <div className="space-y-3">
              {currentStep.instructions.map((inst, index) => (
                <div 
                  key={index}
                  className={`p-4 sm:p-5 rounded-2xl border flex items-start gap-4 transition-all hover:translate-x-1 ${
                    currentStep.isDark ? 'bg-white/5 border-white/10' : 'bg-black/[0.02] border-black/5'
                  }`}
                >
                  <span className="w-7 h-7 rounded-full bg-[var(--gold-primary)] text-black text-xs font-bold font-mono flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                    {index + 1}
                  </span>
                  <p className="text-xs sm:text-sm font-sans leading-relaxed font-light flex-1">
                    {inst}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
        </ScrollReveal>

      </div>
    </section>
  );
}

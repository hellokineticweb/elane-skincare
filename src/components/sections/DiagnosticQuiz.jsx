import React, { useState } from 'react';
import { Sparkles, ArrowRight, RotateCcw, Check, ShoppingBag, ShieldAlert, Award } from 'lucide-react';
import { soundEngine } from '../../utils/audio';
import confetti from 'canvas-confetti';

const QUESTIONS = [
  {
    step: 1,
    title: "What is your primary cutaneous focus?",
    subtitle: "Select the primary signal your skin seeks to recalibrate.",
    options: [
      { id: 'barrier', label: 'Lipid Barrier & Sensitivity', desc: 'Prone to redness, reactive to seasonal changes, needs deep fortification.' },
      { id: 'aging', label: 'Chrono-Aging & Cellular Density', desc: 'Fine lines, loss of architectural elasticity, seeking structural firmness.' },
      { id: 'hydration', label: 'Transdermal Dehydration', desc: 'Dullness, rough micro-texture, tight sensation after cleansing.' },
      { id: 'pigment', label: 'Luminosity & Even Tone', desc: 'Hyperpigmentation, uneven sun exposure tone, lack of inner radiance.' }
    ]
  },
  {
    step: 2,
    title: "What is your daily environmental exposure?",
    subtitle: "External factors dictate your required protective shield factor.",
    options: [
      { id: 'urban', label: 'Urban Smog & Digital Blue Light', desc: 'High screen time, metropolitan commute, environmental particulates.' },
      { id: 'dry', label: 'Frequent Air Travel & Dry Climates', desc: 'Recirculated cabin air, low humidity, frequent timezone shifts.' },
      { id: 'temperate', label: 'Balanced Temperate Climate', desc: 'Moderate sun exposure, balanced indoor/outdoor routine.' }
    ]
  },
  {
    step: 3,
    title: "Which sensory texture resonates most with you?",
    subtitle: "Texture dictates how intuitively you enjoy your daily ritual.",
    options: [
      { id: 'nectar', label: 'Viscous Silken Nectar', desc: 'Fast-penetrating golden bio-ferment that vanishes into a dewy glow.' },
      { id: 'cashmere', label: 'Whipped Cashmere Balm', desc: 'Rich, protective cushion that deeply cocoons and seals hydration.' },
      { id: 'complete', label: 'Full 4-Step Circadian Layering', desc: 'A complete multi-sensory symphony from purifying melt to restorative cream.' }
    ]
  }
];

export function DiagnosticQuiz({ isOpen, onClose, onAddBundle }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);

  if (!isOpen) return null;

  const handleSelectOption = (optionId) => {
    soundEngine.playChime('click');
    const updated = { ...answers, [currentStep]: optionId };
    setAnswers(updated);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCompleted(true);
      soundEngine.playChime('crystal');
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#D4AF37', '#E6D5B8', '#C5A880']
        });
      } catch (e) {}
    }
  };

  const handleReset = () => {
    soundEngine.playChime('click');
    setAnswers({});
    setCurrentStep(0);
    setIsCompleted(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-[#FAF8F5] max-w-2xl w-full rounded-3xl p-6 sm:p-10 shadow-2xl border border-[var(--glass-border)] relative overflow-hidden text-left max-h-[90vh] overflow-y-auto">
        
        {/* Top Header */}
        <div className="flex items-center justify-between pb-5 border-b border-black/10">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[var(--gold-primary)]" />
            <span className="text-xs uppercase tracking-[0.2em] font-sans font-semibold text-[var(--text-primary)]">
              Bespoke Skin Diagnostic
            </span>
          </div>
          <button
            onClick={() => {
              soundEngine.playChime('click');
              onClose();
            }}
            className="text-black/50 hover:text-black text-xs font-sans px-3 py-1.5 bg-black/5 rounded-full hover:bg-black/10 transition-colors"
          >
            Close ✕
          </button>
        </div>

        {!isCompleted ? (
          <div className="py-6 space-y-6">
            {/* Step Progress Bar */}
            <div className="flex items-center gap-2">
              {QUESTIONS.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                    idx <= currentStep ? 'bg-[var(--gold-primary)]' : 'bg-black/10'
                  }`}
                />
              ))}
            </div>

            <div className="space-y-1">
              <span className="text-[11px] uppercase font-mono font-bold text-[var(--gold-primary)]">
                Step 0{currentStep + 1} of 03
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-light text-[var(--text-primary)]">
                {QUESTIONS[currentStep].title}
              </h3>
              <p className="text-xs text-[var(--text-secondary)] font-sans">
                {QUESTIONS[currentStep].subtitle}
              </p>
            </div>

            {/* Options List */}
            <div className="space-y-3 pt-2">
              {QUESTIONS[currentStep].options.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption(opt.id)}
                  className="w-full p-4 rounded-xl text-left border border-black/10 bg-white hover:border-[var(--gold-primary)] hover:bg-[#F5EFE6] transition-all flex items-start justify-between group shadow-sm"
                >
                  <div className="space-y-0.5">
                    <span className="font-serif text-lg font-medium text-[var(--text-primary)] block group-hover:text-[var(--gold-primary)] transition-colors">
                      {opt.label}
                    </span>
                    <p className="text-xs text-[var(--text-secondary)] font-sans font-light leading-relaxed">
                      {opt.desc}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-black/30 group-hover:text-[var(--gold-primary)] group-hover:translate-x-1 transition-all mt-1 flex-shrink-0 ml-3" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Prescribed Bundle Result View */
          <div className="py-6 space-y-6 animate-in zoom-in-95 duration-400">
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#1C1A18] to-[#121110] text-white space-y-5 shadow-xl border border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[var(--gold-primary)] font-bold">
                  Prescription Protocol #ÉL-924
                </span>
                <span className="gold-badge text-[9px] bg-white/10 text-[var(--gold-subtle)] border-white/20">
                  Save 15% Atelier Bundle
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif font-light text-white">
                The Circadian Cellular Sync Duo
              </h3>
              
              <p className="text-xs sm:text-sm text-white/80 font-sans leading-relaxed">
                Based on your skin profile, our bio-fermentation algorithm recommends pairing <strong>L'Élixir Sublime</strong> (overnight mitochondrial repair) with <strong>Crème Céleste</strong> (lipid barrier fortification).
              </p>

              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-white/50 block font-sans">Curated Bundle Value</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-serif text-[var(--gold-vivid)] font-medium">$450 USD</span>
                    <span className="text-xs text-white/40 line-through font-sans">$535 USD</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    soundEngine.playChime('crystal');
                    onAddBundle([
                      { id: 'elixir-sublime', name: "L'Élixir Sublime (50ml)", price: 245, volume: "50ml", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=300&q=80" },
                      { id: 'creme-celeste', name: "Crème Céleste (60ml)", price: 205, volume: "60ml", image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=300&q=80" }

                    ]);
                    onClose();
                  }}
                  className="btn-luxury-gold text-xs px-5 py-3.5 flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Acquire Prescribed Duo</span>
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[var(--text-muted)] font-sans pt-1">
              <span>Includes 3 Complimentary Deluxe Discovery Samples</span>
              <button onClick={handleReset} className="flex items-center gap-1 text-[var(--text-secondary)] hover:text-black underline">
                <RotateCcw className="w-3.5 h-3.5" />
                Retake Diagnostic
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import React from 'react';
import { Award, Shield, Globe, Heart, ArrowUp } from 'lucide-react';
import { soundEngine } from '../../utils/audio';

export function Footer() {
  const scrollToTop = () => {
    soundEngine.playChime('click');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0F0E0D] text-[#FBF9F5] pt-24 pb-12 border-t border-white/10 relative text-left overflow-hidden">
      {/* Ambient golden glow in footer */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[radial-gradient(circle,_rgba(212,175,55,0.06)_0%,_rgba(0,0,0,0)_70%)] pointer-events-none" />

      <div className="elane-container space-y-16 relative z-10">
        
        {/* Top Row: Brand Monogram & Scroll to Top */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-12 border-b border-white/10">
          <div className="space-y-1">
            <span className="text-3xl sm:text-4xl font-serif tracking-[0.25em] font-light text-white block">
              ÉLANE
            </span>
            <span className="text-[10px] uppercase font-sans tracking-[0.3em] text-[var(--gold-subtle)] font-medium block">
              Haute Botanical Skincare & Cellular Alchemy • Paris
            </span>
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-white/15 hover:border-[var(--gold-primary)] hover:bg-white/5 text-white/70 hover:text-[var(--gold-primary)] transition-all text-[11px] uppercase font-sans tracking-[0.2em] self-start sm:self-auto"
          >
            <span>Return to Zenith</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Multi-Column Editorial Footer Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-10 text-xs font-sans">
          
          <div className="space-y-4">
            <span className="uppercase tracking-[0.22em] font-semibold text-[var(--gold-primary)] text-[11px] block">
              The Archive
            </span>
            <ul className="space-y-3 text-white/70 font-light">
              <li><a href="#collection" className="hover:text-white transition-colors">L'Élixir Sublime</a></li>
              <li><a href="#collection" className="hover:text-white transition-colors">Crème Céleste</a></li>
              <li><a href="#collection" className="hover:text-white transition-colors">L'Huile Pure</a></li>
              <li><a href="#collection" className="hover:text-white transition-colors">La Brume Cristalline</a></li>
              <li><a href="#collection" className="hover:text-white transition-colors">Le Sculpteur Noir</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <span className="uppercase tracking-[0.22em] font-semibold text-[var(--gold-primary)] text-[11px] block">
              Cellular Science
            </span>
            <ul className="space-y-3 text-white/70 font-light">
              <li><a href="#philosophy" className="hover:text-white transition-colors">Circadian Bio-Rhythms</a></li>
              <li><a href="#ingredients" className="hover:text-white transition-colors">Alpine Snow Rose Isolation</a></li>
              <li><a href="#showcase" className="hover:text-white transition-colors">Biophotonic Preservation</a></li>
              <li><a href="#clinical" className="hover:text-white transition-colors">Double-Blind Clinical Trials</a></li>
              <li><a href="#philosophy" className="hover:text-white transition-colors">Cryogenic Micro-Extraction</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <span className="uppercase tracking-[0.22em] font-semibold text-[var(--gold-primary)] text-[11px] block">
              Client Concierge
            </span>
            <ul className="space-y-3 text-white/70 font-light">
              <li><a href="#diagnostic" className="hover:text-white transition-colors">Bespoke Skin Diagnostic</a></li>
              <li><a href="#" className="hover:text-white transition-colors">White-Glove Global Delivery</a></li>
              <li><a href="#sustainability" className="hover:text-white transition-colors">Infinity Vessel Refill Program</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Authenticity Certification</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Private Atelier Appointments</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <span className="uppercase tracking-[0.22em] font-semibold text-[var(--gold-primary)] text-[11px] block">
              Atelier Salons
            </span>
            <ul className="space-y-3 text-white/70 font-light">
              <li>Paris — 14 Place Vendôme</li>
              <li>Geneva — Rue du Rhône 42</li>
              <li>Zurich — Bahnhofstrasse 18</li>
              <li>Milan — Via Montenapoleone 8</li>
              <li>London — New Bond Street 35</li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-3 lg:col-span-1 space-y-4">
            <span className="uppercase tracking-[0.22em] font-semibold text-[var(--gold-primary)] text-[11px] block">
              Accreditation
            </span>
            <div className="p-5 rounded-2xl bg-white/[0.05] border border-white/10 space-y-2.5 text-xs text-white/70 backdrop-blur-md">
              <div className="flex items-center gap-2 text-white font-medium">
                <Award className="w-4 h-4 text-[var(--gold-primary)] flex-shrink-0" />
                <span className="font-sans font-semibold text-xs tracking-wider uppercase">Certified B-Corp™</span>
              </div>
              <p className="text-[11px] text-white/60 leading-relaxed font-light">
                Verified high-altitude biodiversity protection and 100% closed-loop refill circularity.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/40 font-sans">
          <p>© 2026 ÉLANE Haute Botanicals SA. All rights reserved. Registered Trademark.</p>
          <div className="flex flex-wrap items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Atelier</a>
            <a href="#" className="hover:text-white transition-colors">Sustainability Disclosures</a>
          </div>
        </div>

      </div>
    </footer>
  );
}

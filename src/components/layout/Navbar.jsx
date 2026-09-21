import React, { useState, useEffect } from 'react';
import { ShoppingBag, Volume2, VolumeX, Menu, X, Sparkles } from 'lucide-react';
import { soundEngine } from '../../utils/audio';

export function Navbar({ cartCount = 0, onOpenCart, onOpenDiagnostic }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currency, setCurrency] = useState('USD ($)');

  useEffect(() => {
    let lastScrolled = false;
    const handleScroll = () => {
      const scrolled = window.scrollY > 40;
      if (scrolled !== lastScrolled) {
        lastScrolled = scrolled;
        setIsScrolled(scrolled);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const toggleSound = () => {
    const playing = soundEngine.toggleAmbient();
    setIsAudioPlaying(playing);
    if (playing) {
      soundEngine.playChime('crystal');
    }
  };

  const navLinks = [
    { name: 'Philosophy', href: '#philosophy' },
    { name: '3D Vessel', href: '#showcase' },
    { name: 'Alchemy', href: '#ingredients' },
    { name: 'The Ritual', href: '#ritual' },
    { name: 'Archive', href: '#collection' },
    { name: 'Clinical Proof', href: '#clinical' }
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    soundEngine.playChime('click');
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#FBF9F5]/85 backdrop-blur-xl border-b border-[var(--glass-border)] py-3.5 shadow-sm'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="elane-container flex items-center justify-between">
          {/* Left: Brand Monogram & Audio Toggle */}
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-2xl md:text-3xl font-serif tracking-[0.18em] font-light text-[var(--text-primary)] hover:opacity-80 transition-opacity flex items-center gap-1.5"
            >
              <span>ÉLANE</span>
              <span className="text-[10px] tracking-widest uppercase font-sans text-[var(--gold-primary)] font-medium -mt-2">
                PARIS
              </span>
            </a>

            {/* Audio Ambiance Toggle */}
            <button
              onClick={toggleSound}
              className={`hidden md:flex items-center gap-2 px-3 py-1 rounded-full text-xs font-sans border transition-all ${
                isAudioPlaying
                  ? 'bg-[var(--gold-primary)]/15 border-[var(--gold-primary)] text-[var(--text-primary)]'
                  : 'bg-black/5 border-black/10 text-[var(--text-secondary)] hover:border-black/25'
              }`}
              title="Toggle 432Hz Sanctuary Ambiance"
            >
              {isAudioPlaying ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-[var(--gold-primary)]" />
                  <span className="text-[11px] font-medium tracking-wide">Soundscape: On</span>
                  <span className="flex gap-0.5 items-end h-2.5">
                    <span className="w-0.5 h-2 bg-[var(--gold-primary)] animate-pulse" />
                    <span className="w-0.5 h-3.5 bg-[var(--gold-primary)] animate-pulse delay-75" />
                    <span className="w-0.5 h-1.5 bg-[var(--gold-primary)] animate-pulse delay-150" />
                  </span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-medium tracking-wide">Audio Ambiance</span>
                </>
              )}
            </button>
          </div>

          {/* Center: Editorial Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-xs uppercase tracking-[0.18em] text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-medium transition-colors relative group py-1"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[var(--gold-primary)] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right: Skin Consultation & Cart Trigger */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Skin Diagnostic Button */}
            <button
              onClick={() => {
                soundEngine.playChime('crystal');
                onOpenDiagnostic();
              }}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[var(--gold-gradient)] text-[#1C1A18] text-xs font-medium tracking-wider uppercase hover:shadow-md transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Skin Diagnostic</span>
            </button>

            {/* Currency Selector */}
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="hidden xl:block bg-transparent text-xs font-sans text-[var(--text-secondary)] border-none outline-none cursor-pointer tracking-wider uppercase"
            >
              <option value="USD ($)">USD ($)</option>
              <option value="EUR (€)">EUR (€)</option>
              <option value="GBP (£)">GBP (£)</option>
              <option value="CHF (Fr)">CHF (Fr)</option>
            </select>

            {/* Cart Button */}
            <button
              onClick={() => {
                soundEngine.playChime('click');
                onOpenCart();
              }}
              className="relative p-2.5 rounded-full hover:bg-black/5 text-[var(--text-primary)] transition-colors flex items-center justify-center"
              aria-label="Open Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#1C1A18] text-[#FAF8F5] text-[10px] font-sans font-bold flex items-center justify-center animate-scale">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[var(--text-primary)]"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#FBF9F5] pt-24 px-8 pb-12 flex flex-col justify-between lg:hidden animate-in fade-in duration-300">
          <div className="flex flex-col gap-6">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[var(--gold-primary)] font-semibold">
              The ÉLANE Experience
            </span>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-2xl font-serif font-light text-[var(--text-primary)] hover:text-[var(--gold-primary)] transition-colors"
              >
                {link.name}
              </a>
            ))}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDiagnostic();
              }}
              className="mt-4 flex items-center justify-center gap-2 w-full py-3.5 bg-[var(--gold-gradient)] text-black text-xs uppercase tracking-widest font-semibold"
            >
              <Sparkles className="w-4 h-4" />
              Take Bespoke Skin Diagnostic
            </button>
          </div>

          <div className="pt-8 border-t border-black/10 flex items-center justify-between text-xs text-[var(--text-secondary)]">
            <span>© ÉLANE Haute Botanicals</span>
            <button onClick={toggleSound} className="flex items-center gap-1.5 font-medium">
              {isAudioPlaying ? 'Mute Sanctuary Sound' : 'Play Sanctuary Sound'}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

import React, { useState } from 'react';
import { PRODUCTS } from '../../data/products';
import { ShoppingBag, Star, Sparkles, Check, Eye, ChevronRight } from 'lucide-react';
import { soundEngine } from '../../utils/audio';
import { ScrollReveal } from '../ui/ScrollReveal';

export function Collection({ onAddToCart }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProductModal, setSelectedProductModal] = useState(null);

  const categories = ['All', 'Serums', 'Creams', 'Cleansers', 'Elixirs', 'Tools'];

  const filteredProducts = activeCategory === 'All'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === activeCategory);

  const handleQuickView = (product) => {
    soundEngine.playChime('click');
    setSelectedProductModal(product);
  };

  return (
    <section id="collection" className="section-padding bg-[#FAF8F5] relative">
      <div className="elane-container space-y-12">
        
        {/* Section Header with Mask Reveal */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-black/10 pb-8">
          <div className="space-y-2">
            <ScrollReveal variant="fade-up" delay={0.05}>
              <div className="flex items-center gap-3">
                <span className="w-8 h-[1px] bg-[var(--gold-primary)]" />
                <span className="text-overline">The ÉLANE Archive</span>
              </div>
            </ScrollReveal>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-[var(--text-primary)] leading-tight">
              <ScrollReveal variant="mask-reveal" delay={0.15} duration={0.9}>
                <span>Curated Formulations.</span>
              </ScrollReveal>
            </h2>
          </div>

          {/* Category Filter Pills */}
          <ScrollReveal variant="fade-up" delay={0.25}>
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    soundEngine.playChime('click');
                    setActiveCategory(cat);
                  }}
                  className={`px-4 py-2 rounded-full text-xs font-sans uppercase tracking-wider transition-all ${
                    activeCategory === cat
                      ? 'bg-[#1C1A18] text-[#FBF9F5] shadow-sm font-medium'
                      : 'bg-black/5 text-[var(--text-secondary)] hover:bg-black/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* Product Cards Asymmetric Grid with Staggered Entrance */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, idx) => (
            <ScrollReveal
              key={product.id}
              variant="fade-up"
              delay={0.08 + (idx % 3) * 0.12}
              duration={0.75}
              className="h-full"
            >
              <div className="group flex flex-col justify-between bg-white rounded-2xl p-6 sm:p-7 border border-black/5 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 h-full">
              {/* Product Visual Area */}
              <div className="relative overflow-hidden rounded-xl bg-[#F6F2EA] h-72 mb-6 flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                />


                {/* Badge */}
                {product.badge && (
                  <span className="absolute top-3 left-3 gold-badge text-[10px] shadow-sm backdrop-blur-md bg-white/85">
                    {product.badge}
                  </span>
                )}

                {/* Quick Inspect Hover Button */}
                <button
                  onClick={() => handleQuickView(product)}
                  className="absolute bottom-3 right-3 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-xs font-sans font-medium text-black opacity-0 group-hover:opacity-100 transition-all flex items-center gap-1.5 shadow-md hover:bg-black hover:text-white"
                >
                  <Eye className="w-3.5 h-3.5 text-[var(--gold-primary)]" />
                  <span>Sensory Dossier</span>
                </button>
              </div>

              {/* Product Info */}
              <div className="flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs text-[var(--text-muted)] font-sans mb-1.5">
                    <span className="font-mono">{product.volume}</span>
                    <span className="flex items-center gap-1 text-[var(--gold-primary)] font-medium">
                      <Star className="w-3 h-3 fill-current" />
                      {product.rating} <span className="text-[var(--text-muted)]">({product.reviewsCount})</span>
                    </span>
                  </div>

                  <h3 className="text-2xl font-serif font-light text-[var(--text-primary)] min-h-[32px] line-clamp-1 leading-snug">
                    {product.name}
                  </h3>
                  
                  <p className="text-[11px] uppercase tracking-wider font-sans font-semibold text-[var(--gold-primary)] mt-1 min-h-[18px] line-clamp-1">
                    {product.tagline}
                  </p>

                  <p className="text-xs text-[var(--text-secondary)] font-sans font-light mt-2 line-clamp-2 leading-relaxed min-h-[36px]">
                    {product.description}
                  </p>
                </div>

                <div>
                  {/* Sensory Mini Tag */}
                  <div className="h-10 px-3.5 rounded-lg bg-[#FAF8F5] border border-black/5 text-[11px] font-sans text-[var(--text-secondary)] flex justify-between items-center mb-4">
                    <span className="font-semibold text-[var(--text-primary)] uppercase text-[10px] tracking-wider">Texture:</span>
                    <span className="font-light truncate ml-2">{product.sensoryProfile.texture}</span>
                  </div>

                  {/* Price & Add to Bag */}
                  <div className="pt-3.5 border-t border-black/5 flex items-center justify-between">
                    <span className="text-2xl font-serif text-[var(--text-primary)] font-medium">
                      ${product.price} <span className="text-xs font-sans text-[var(--text-muted)] font-normal">USD</span>
                    </span>

                    <button
                      onClick={() => {
                        soundEngine.playChime('crystal');
                        onAddToCart(product);
                      }}
                      className="flex items-center gap-2 px-4 py-2.5 bg-[#1C1A18] text-[#FBF9F5] text-xs uppercase tracking-wider font-medium hover:bg-[var(--gold-primary)] hover:text-black transition-colors rounded-none shadow-sm"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Acquire</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            </ScrollReveal>
          ))}
        </div>

      </div>

      {/* Quick View Sensory Modal */}
      {selectedProductModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-[#FAF8F5] max-w-2xl w-full rounded-3xl overflow-hidden shadow-2xl border border-[var(--glass-border)] animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="h-72 md:h-full relative bg-[#F6F2EA] min-h-[280px]">
                <img
                  src={selectedProductModal.image}
                  alt={selectedProductModal.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-7 sm:p-9 flex flex-col justify-between space-y-5">
                <div>
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] uppercase tracking-widest font-semibold text-[var(--gold-primary)] font-sans">
                      {selectedProductModal.category}
                    </span>
                    <button
                      onClick={() => setSelectedProductModal(null)}
                      className="text-black/50 hover:text-black text-xs px-2.5 py-1 bg-black/5 rounded-full hover:bg-black/10 transition-colors"
                    >
                      ✕
                    </button>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-serif font-light text-[var(--text-primary)] mt-1.5 leading-snug">
                    {selectedProductModal.name}
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] font-mono mt-0.5">
                    {selectedProductModal.volume}
                  </p>

                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-sans font-light leading-relaxed mt-3">
                    {selectedProductModal.description}
                  </p>

                  {/* Sensory Profile Breakdown */}
                  <div className="mt-4 space-y-2 text-xs font-sans">
                    <span className="font-semibold text-black uppercase tracking-wider text-[10px] block">
                      Sensory Biomarkers:
                    </span>
                    <div className="grid grid-cols-2 gap-2.5 text-[11px] text-[var(--text-secondary)]">
                      <div className="p-3 rounded-xl bg-white border border-black/5 space-y-1">
                        <span className="font-semibold text-black block text-[10px] uppercase tracking-wider">Aroma:</span>
                        <span className="font-light">{selectedProductModal.sensoryProfile.aroma}</span>
                      </div>
                      <div className="p-3 rounded-xl bg-white border border-black/5 space-y-1">
                        <span className="font-semibold text-black block text-[10px] uppercase tracking-wider">Finish:</span>
                        <span className="font-light">{selectedProductModal.sensoryProfile.finish}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-black/10 flex items-center justify-between gap-4">
                  <span className="text-2xl font-serif font-medium text-[var(--text-primary)]">
                    ${selectedProductModal.price} <span className="text-xs font-sans text-black/50 font-normal">USD</span>
                  </span>
                  <button
                    onClick={() => {
                      soundEngine.playChime('crystal');
                      onAddToCart(selectedProductModal);
                      setSelectedProductModal(null);
                    }}
                    className="btn-luxury-primary text-xs px-5 py-3"
                  >
                    <span>Add to Ritual Bag</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

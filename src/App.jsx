import React, { useState, useEffect, Suspense, lazy } from 'react';
import Lenis from 'lenis';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { Philosophy } from './components/sections/Philosophy';
import { ProductShowcase } from './components/sections/ProductShowcase';
import { Ingredients } from './components/sections/Ingredients';
import { Ritual } from './components/sections/Ritual';
import { Collection } from './components/sections/Collection';
import { Editorial } from './components/sections/Editorial';
import { Sustainability } from './components/sections/Sustainability';
import { ClinicalProof } from './components/sections/ClinicalProof';
import { FinalCTA } from './components/sections/FinalCTA';
import { Footer } from './components/layout/Footer';
import { CustomCursor } from './components/ui/CustomCursor';
import { useScrollAnimations } from './hooks/useScrollAnimations';

// Dynamic code splitting for modals (not needed for initial paint)
const CartDrawer = lazy(() => import('./components/cart/CartDrawer').then(m => ({ default: m.CartDrawer })));
const DiagnosticQuiz = lazy(() => import('./components/sections/DiagnosticQuiz').then(m => ({ default: m.DiagnosticQuiz })));

export function App() {
  // Cart state initialized with signature item for instant luxury exploration
  const [cart, setCart] = useState([
    {
      id: "elixir-sublime",
      name: "L'Élixir Sublime",
      price: 245,
      volume: "50ml / 1.7 fl. oz.",
      image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80",
      quantity: 1
    }
  ]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isDiagnosticOpen, setIsDiagnosticOpen] = useState(false);
  const [lenisInstance, setLenisInstance] = useState(null);

  // Initialize single master Lenis smooth scroll
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    setLenisInstance(lenis);

    return () => {
      lenis.destroy();
    };
  }, []);


  // Activate scroll-triggered text animations & parallax
  useScrollAnimations(lenisInstance);

  const handleAddToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleAddBundle = (bundleProducts) => {
    setCart((prev) => {
      let updated = [...prev];
      bundleProducts.forEach((bItem) => {
        const existing = updated.find((item) => item.id === bItem.id);
        if (existing) {
          updated = updated.map((item) =>
            item.id === bItem.id ? { ...item, quantity: item.quantity + 1 } : item
          );
        } else {
          updated.push({ ...bItem, quantity: 1 });
        }
      });
      return updated;
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      handleRemoveItem(id);
    } else {
      setCart((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity } : item))
      );
    }
  };

  const handleRemoveItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FBF9F5] text-[#1A1918] selection:bg-[var(--gold-subtle)]">
      {/* Luxury Subtle Grain Filter Overlay */}
      <div className="grain-overlay" />

      {/* Tactile Custom Cursor */}
      <CustomCursor />

      {/* Sticky Glassmorphic Navbar */}
      <Navbar
        cartCount={cart.reduce((a, b) => a + b.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenDiagnostic={() => setIsDiagnosticOpen(true)}
      />

      <main>
        {/* 1. Cinematic Hero with 3D Flacon */}
        <Hero
          onExploreRitual={() => scrollToSection('ritual')}
          onDiscover={() => scrollToSection('philosophy')}
        />

        {/* 2. Brand Philosophy */}
        <Philosophy />

        {/* 3. 3D Product Showcase */}
        <ProductShowcase onAddToCart={handleAddToCart} />

        {/* 4. Botanical Alchemy & Ingredients */}
        <Ingredients />

        {/* 5. Circadian Skincare Ritual */}
        <Ritual />

        {/* 6. Curated Product Collection */}
        <Collection onAddToCart={handleAddToCart} />

        {/* 7. Editorial Magazine Campaign */}
        <Editorial />

        {/* 8. Clinical Proof & Biomarkers */}
        <ClinicalProof />

        {/* 9. Sustainability & Refill Program */}
        <Sustainability />

        {/* 10. Final Cinematic CTA */}
        <FinalCTA onExploreCollection={() => scrollToSection('collection')} />
      </main>

      {/* 11. Luxury Editorial Footer */}
      <Footer />

      {/* Cart Drawer Slide-over */}
      {isCartOpen && (
        <Suspense fallback={null}>
          <CartDrawer
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            cart={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onClearCart={handleClearCart}
          />
        </Suspense>
      )}

      {/* Diagnostic Routine Finder Modal */}
      {isDiagnosticOpen && (
        <Suspense fallback={null}>
          <DiagnosticQuiz
            isOpen={isDiagnosticOpen}
            onClose={() => setIsDiagnosticOpen(false)}
            onAddBundle={handleAddBundle}
          />
        </Suspense>
      )}

    </div>
  );
}

export default App;

import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, Sparkles, Gift, Check, ShieldCheck, ArrowRight } from 'lucide-react';
import { FREE_SAMPLES } from '../../data/products';
import { soundEngine } from '../../utils/audio';
import confetti from 'canvas-confetti';

export function CartDrawer({ isOpen, onClose, cart, onUpdateQuantity, onRemoveItem, onClearCart }) {
  const [selectedSamples, setSelectedSamples] = useState(['sample-1']);
  const [giftWrap, setGiftWrap] = useState(true);
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const shippingThreshold = 250;
  const isFreeShipping = subtotal >= shippingThreshold;
  const progressToFreeShipping = Math.min(100, (subtotal / shippingThreshold) * 100);
  const finalTotal = Math.max(0, subtotal - discountAmount);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    soundEngine.playChime('click');
    if (promoCode.trim().toUpperCase() === 'ELANE15' || promoCode.trim().toUpperCase() === 'VIP2026') {
      setDiscountPercent(15);
      setPromoError('');
    } else {
      setPromoError('Invalid promotion code. Try "ELANE15"');
    }
  };

  const toggleSample = (sampleId) => {
    soundEngine.playChime('click');
    if (selectedSamples.includes(sampleId)) {
      setSelectedSamples(selectedSamples.filter(id => id !== sampleId));
    } else if (selectedSamples.length < 2) {
      setSelectedSamples([...selectedSamples, sampleId]);
    }
  };

  const handleCheckout = () => {
    soundEngine.playChime('crystal');
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutComplete(true);
      try {
        confetti({
          particleCount: 80,
          spread: 90,
          origin: { y: 0.5 },
          colors: ['#D4AF37', '#E6D5B8', '#FAF8F5']
        });
      } catch (e) {}
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex justify-end animate-in fade-in duration-300">
      <div className="w-full max-w-md bg-[#FAF8F5] h-full shadow-2xl flex flex-col justify-between border-l border-[var(--glass-border)] animate-in slide-in-from-right duration-300 relative text-left">
        
        {/* Drawer Header */}
        <div className="p-6 border-b border-black/10 flex items-center justify-between bg-white/70">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-[var(--gold-primary)]" />
            <span className="text-xs uppercase font-sans tracking-[0.2em] font-semibold text-[var(--text-primary)]">
              Your Ritual Bag ({cart.reduce((a, b) => a + b.quantity, 0)})
            </span>
          </div>
          <button
            onClick={() => {
              soundEngine.playChime('click');
              onClose();
            }}
            className="text-black/50 hover:text-black p-1 rounded-full hover:bg-black/5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Meter */}
        <div className="px-6 py-3 bg-[#F3ECE2] border-b border-black/5">
          <div className="flex items-center justify-between text-xs font-sans mb-1.5">
            <span className="font-medium text-[var(--text-primary)]">
              {isFreeShipping ? '✨ Complimentary Express Shipping Unlocked' : `Add $${(shippingThreshold - subtotal).toFixed(0)} for Free Global Shipping`}
            </span>
            <span className="text-[10px] font-bold text-[var(--gold-primary)]">{progressToFreeShipping.toFixed(0)}%</span>
          </div>
          <div className="w-full h-1.5 bg-black/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--gold-gradient)] transition-all duration-500 rounded-full"
              style={{ width: `${progressToFreeShipping}%` }}
            />
          </div>
        </div>

        {/* Cart Items List Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {checkoutComplete ? (
            <div className="text-center py-12 space-y-4 animate-in zoom-in-95">
              <div className="w-14 h-14 rounded-full bg-[var(--gold-primary)]/20 text-[var(--gold-primary)] flex items-center justify-center mx-auto">
                <Check className="w-7 h-7" />
              </div>
              <h3 className="text-3xl font-serif font-light text-[var(--text-primary)]">
                Ritual Confirmed.
              </h3>
              <p className="text-xs text-[var(--text-secondary)] font-sans max-w-xs mx-auto leading-relaxed">
                Your order is being hand-packaged in our Valais atelier. A confirmation email with white-glove tracking will arrive shortly.
              </p>
              <button
                onClick={() => {
                  onClearCart();
                  setCheckoutComplete(false);
                  onClose();
                }}
                className="btn-luxury-primary text-xs mt-4"
              >
                <span>Return to Salon</span>
              </button>
            </div>
          ) : cart.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-12 h-12 rounded-full bg-black/5 flex items-center justify-center mx-auto text-black/40">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-serif text-[var(--text-primary)]">
                Your Ritual Bag is Empty
              </h4>
              <p className="text-xs text-[var(--text-muted)] font-sans max-w-xs mx-auto">
                Discover our signature formulations and curate your personal circadian regimen.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="p-4 rounded-xl bg-white border border-black/5 flex gap-4 shadow-sm">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-20 object-cover rounded-lg bg-[#F6F2EA] flex-shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-sm font-serif font-medium text-[var(--text-primary)]">
                          {item.name}
                        </h4>
                        <span className="text-[11px] text-[var(--text-muted)] font-sans">
                          {item.volume}
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          soundEngine.playChime('click');
                          onRemoveItem(item.id);
                        }}
                        className="text-black/30 hover:text-red-500 transition-colors p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2 border border-black/10 rounded-full px-2 py-0.5 bg-[#FAF8F5]">
                        <button
                          onClick={() => {
                            soundEngine.playChime('click');
                            onUpdateQuantity(item.id, item.quantity - 1);
                          }}
                          className="text-black/50 hover:text-black"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-mono font-bold px-1">{item.quantity}</span>
                        <button
                          onClick={() => {
                            soundEngine.playChime('click');
                            onUpdateQuantity(item.id, item.quantity + 1);
                          }}
                          className="text-black/50 hover:text-black"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-sm font-serif font-medium text-[var(--text-primary)]">
                        ${item.price * item.quantity} USD
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Complimentary Deluxe Discovery Samples Section */}
              <div className="p-4 rounded-xl bg-white border border-black/5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-wider font-sans font-semibold text-[var(--gold-primary)] flex items-center gap-1">
                    <Gift className="w-3 h-3" />
                    Select 2 Free Discovery Samples:
                  </span>
                  <span className="text-[10px] text-black/50 font-mono">
                    {selectedSamples.length}/2
                  </span>
                </div>

                <div className="space-y-1.5">
                  {FREE_SAMPLES.map((sample) => (
                    <label
                      key={sample.id}
                      onClick={() => toggleSample(sample.id)}
                      className={`flex items-center justify-between p-2 rounded-lg text-xs font-sans cursor-pointer transition-all border ${
                        selectedSamples.includes(sample.id)
                          ? 'bg-[var(--gold-subtle)]/20 border-[var(--gold-primary)] text-black font-medium'
                          : 'bg-[#FAF8F5] border-black/5 text-[var(--text-secondary)]'
                      }`}
                    >
                      <span>{sample.name}</span>
                      <span className="text-[10px] uppercase font-bold text-[var(--gold-primary)]">
                        {selectedSamples.includes(sample.id) ? 'Selected ✓' : '+ Add'}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Gift Packaging Box */}
              <label className="flex items-center gap-2 p-3 rounded-xl bg-white border border-black/5 text-xs font-sans cursor-pointer">
                <input
                  type="checkbox"
                  checked={giftWrap}
                  onChange={(e) => setGiftWrap(e.target.checked)}
                  className="rounded border-black/20 text-[var(--gold-primary)] focus:ring-0"
                />
                <span>Complimentary Signature Gift Box & Wax Monogram Seal</span>
              </label>

              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Promo code (e.g. ELANE15)"
                  className="flex-1 px-3 py-2 text-xs font-sans rounded-none border border-black/15 bg-white uppercase outline-none focus:border-[var(--gold-primary)]"
                />
                <button type="submit" className="px-4 py-2 bg-black text-white text-xs font-sans uppercase tracking-wider">
                  Apply
                </button>
              </form>
              {discountPercent > 0 && (
                <p className="text-xs text-green-700 font-sans">
                  ✓ {discountPercent}% Atelier promotion applied
                </p>
              )}
              {promoError && (
                <p className="text-xs text-red-600 font-sans">{promoError}</p>
              )}
            </div>
          )}
        </div>

        {/* Drawer Footer & Checkout Action */}
        {!checkoutComplete && cart.length > 0 && (
          <div className="p-6 border-t border-black/10 bg-white space-y-4">
            <div className="space-y-1.5 text-xs font-sans">
              <div className="flex justify-between text-[var(--text-secondary)]">
                <span>Subtotal</span>
                <span>${subtotal} USD</span>
              </div>
              {discountPercent > 0 && (
                <div className="flex justify-between text-green-700">
                  <span>VIP Privilege (-{discountPercent}%)</span>
                  <span>-${discountAmount.toFixed(2)} USD</span>
                </div>
              )}
              <div className="flex justify-between text-[var(--text-secondary)]">
                <span>Global Express Courier</span>
                <span>{isFreeShipping ? 'Complimentary' : '$25 USD'}</span>
              </div>
              <div className="flex justify-between text-base font-serif font-medium text-[var(--text-primary)] pt-2 border-t border-black/5">
                <span>Total Investment</span>
                <span>${finalTotal.toFixed(2)} USD</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="btn-luxury-gold w-full text-xs py-3.5 tracking-widest uppercase flex items-center justify-center gap-2"
            >
              {isCheckingOut ? (
                <span>Securing Atelier Dispatch...</span>
              ) : (
                <>
                  <span>Proceed to Private Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-[var(--text-muted)] font-sans text-center">
              <ShieldCheck className="w-3 h-3 text-[var(--gold-primary)]" />
              <span>256-Bit Encrypted Luxury Checkout • 30-Day Pure Skin Guarantee</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

import React, { useEffect, useRef, useState } from 'react';

/**
 * Award-Winning Luxury Scroll Reveal Component
 * Provides editorial mask reveals, split-line typography animations,
 * blur-in transitions, and staggered scroll-triggered entrances.
 */
export function ScrollReveal({
  children,
  variant = 'fade-up', // 'fade-up' | 'mask-reveal' | 'blur-in' | 'scale-up' | 'split-words'
  delay = 0, // delay in seconds
  duration = 0.85, // duration in seconds
  threshold = 0.15,
  className = '',
  as: Component = 'div',
  stagger = 0.04, // for split words
  once = true,
  ...props
}) {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once && elementRef.current) {
            observer.unobserve(elementRef.current);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold: threshold,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    const currentEl = elementRef.current;
    if (currentEl) {
      observer.observe(currentEl);
    }

    return () => {
      if (currentEl) observer.unobserve(currentEl);
    };
  }, [threshold, once]);

  // Variant: Split Words with Masked Rise
  if (variant === 'split-words' && typeof children === 'string') {
    const words = children.split(' ');

    return (
      <Component
        ref={elementRef}
        className={`inline-block ${className}`}
        {...props}
      >
        {words.map((word, i) => (
          <span
            key={i}
            className="inline-block overflow-hidden align-top mr-[0.25em] pb-[0.05em]"
          >
            <span
              className="inline-block transition-all ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                transform: isVisible ? 'translateY(0%) rotate(0deg)' : 'translateY(115%) rotate(3deg)',
                opacity: isVisible ? 1 : 0,
                transitionDelay: `${delay + i * stagger}s`,
                transitionDuration: `${duration}s`,
                willChange: 'transform, opacity',
              }}
            >
              {word}
            </span>
          </span>
        ))}
      </Component>
    );
  }

  // Variant: Mask Reveal (Sliding out of overflow-hidden container)
  if (variant === 'mask-reveal') {
    return (
      <div ref={elementRef} className={`overflow-hidden ${className}`}>
        <div
          className="transition-all ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            transform: isVisible ? 'translateY(0%)' : 'translateY(105%)',
            opacity: isVisible ? 1 : 0.2,
            transitionDuration: `${duration}s`,
            transitionDelay: `${delay}s`,
            willChange: 'transform, opacity',
          }}
          {...props}
        >
          {children}
        </div>
      </div>
    );
  }

  // Variant: Blur-In Luxury Typography Reveal
  if (variant === 'blur-in') {
    return (
      <Component
        ref={elementRef}
        className={`transition-all ease-[cubic-bezier(0.16,1,0.3,1)] ${className}`}
        style={{
          opacity: isVisible ? 1 : 0,
          filter: isVisible ? 'blur(0px)' : 'blur(10px)',
          transform: isVisible ? 'translateY(0px) scale(1)' : 'translateY(24px) scale(0.98)',
          transitionDuration: `${duration}s`,
          transitionDelay: `${delay}s`,
          willChange: 'transform, opacity, filter',
        }}
        {...props}
      >
        {children}
      </Component>
    );
  }

  // Variant: Scale-Up Subtle Elevation
  if (variant === 'scale-up') {
    return (
      <Component
        ref={elementRef}
        className={`transition-all ease-[cubic-bezier(0.16,1,0.3,1)] ${className}`}
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0px) scale(1)' : 'translateY(35px) scale(0.95)',
          transitionDuration: `${duration}s`,
          transitionDelay: `${delay}s`,
          willChange: 'transform, opacity',
        }}
        {...props}
      >
        {children}
      </Component>
    );
  }

  // Default Variant: Fade-Up Luxury Transition
  return (
    <Component
      ref={elementRef}
      className={`transition-all ease-[cubic-bezier(0.16,1,0.3,1)] ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0px)' : 'translateY(36px)',
        transitionDuration: `${duration}s`,
        transitionDelay: `${delay}s`,
        willChange: 'transform, opacity',
      }}
      {...props}
    >
      {children}
    </Component>
  );
}

/**
 * TextSplitWords helper for inline words reveal with rich styling
 */
export function SplitTextReveal({
  text,
  className = '',
  delay = 0,
  stagger = 0.035,
  duration = 0.8,
}) {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (elementRef.current) observer.unobserve(elementRef.current);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    const el = elementRef.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  const words = typeof text === 'string' ? text.split(' ') : [];

  return (
    <span ref={elementRef} className={`inline ${className}`}>
      {words.map((w, idx) => (
        <span key={idx} className="inline-block overflow-hidden align-top mr-[0.24em] pb-[0.05em]">
          <span
            className="inline-block transition-all ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              transform: isVisible ? 'translateY(0%)' : 'translateY(110%)',
              opacity: isVisible ? 1 : 0,
              transitionDelay: `${delay + idx * stagger}s`,
              transitionDuration: `${duration}s`,
              willChange: 'transform, opacity',
            }}
          >
            {w}
          </span>
        </span>
      ))}
    </span>
  );
}

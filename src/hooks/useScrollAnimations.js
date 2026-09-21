import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Custom hook to initialize GSAP ScrollTrigger paired with Lenis
 * and activate scroll-driven typography reveals, parallax watermarks,
 * and masked text effects across all sections.
 */
export function useScrollAnimations(lenis) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Ticker callback ref for clean disposal
    let tickerCallback = null;

    // If Lenis is active, keep ScrollTrigger updated on Lenis scroll events
    if (lenis && !prefersReducedMotion) {
      lenis.on('scroll', ScrollTrigger.update);

      tickerCallback = (time) => {
        lenis.raf(time * 1000);
      };

      gsap.ticker.add(tickerCallback);
      gsap.ticker.lagSmoothing(0);
    }


    // Scroll-triggered reveals for all elements with [data-scroll-reveal]
    const revealElements = document.querySelectorAll('[data-scroll-reveal]');
    const triggers = [];

    revealElements.forEach((el) => {
      const effect = el.getAttribute('data-scroll-reveal') || 'fade-up';
      const delay = parseFloat(el.getAttribute('data-scroll-delay') || '0');
      const duration = parseFloat(el.getAttribute('data-scroll-duration') || '0.9');

      let animProps = {
        opacity: 0,
        y: 40,
      };

      if (effect === 'blur-in') {
        animProps = {
          opacity: 0,
          y: 30,
          filter: 'blur(8px)',
        };
      } else if (effect === 'scale-up') {
        animProps = {
          opacity: 0,
          scale: 0.94,
          y: 30,
        };
      } else if (effect === 'slide-left') {
        animProps = {
          opacity: 0,
          x: -50,
        };
      } else if (effect === 'slide-right') {
        animProps = {
          opacity: 0,
          x: 50,
        };
      }

      const tween = gsap.fromTo(
        el,
        animProps,
        {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: duration,
          delay: delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
            once: true,
          },
        }
      );

      if (tween.scrollTrigger) {
        triggers.push(tween.scrollTrigger);
      }
    });

    // Parallax effect on watermarks & ambient text
    const parallaxTexts = document.querySelectorAll('[data-scroll-parallax]');
    parallaxTexts.forEach((el) => {
      const speed = parseFloat(el.getAttribute('data-scroll-speed') || '0.2');
      const tween = gsap.to(el, {
        yPercent: speed * 100,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
      if (tween.scrollTrigger) {
        triggers.push(tween.scrollTrigger);
      }
    });

    ScrollTrigger.refresh();

    return () => {
      if (tickerCallback) {
        gsap.ticker.remove(tickerCallback);
      }
      triggers.forEach((t) => t.kill());
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [lenis]);
}


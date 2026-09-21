import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, ContactShadows } from '@react-three/drei';
import { SkincareFlacon } from './SkincareFlacon';

export function Hero3DCanvas({ materialPreset = 'amber', onMaterialChange }) {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin: '120px' }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-full min-h-[480px] sm:min-h-[560px] lg:min-h-[640px] flex items-center justify-center pointer-events-auto">
      {/* 3D WebGL Canvas with Viewport Culling */}
      <Canvas
        shadows
        frameloop={isVisible ? 'always' : 'never'}
        dpr={isMobile ? [1, 1.25] : [1, 1.75]}

        camera={{ position: [0, 0.2, 10.5], fov: 30 }}
        gl={{ 
          antialias: true, 
          alpha: true, 
          powerPreference: 'high-performance',
          stencil: false
        }}
        style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
      >
        {/* Cinematic Studio Lighting Rig */}
        <ambientLight intensity={0.9} color="#FAF6F0" />
        
        {/* Warm Golden Key Light */}
        <directionalLight
          position={[4, 5, 4]}
          intensity={2.2}
          color="#FFF2DB"
          castShadow
          shadow-mapSize-width={512}
          shadow-mapSize-height={512}
          shadow-bias={-0.0001}
        />
        
        {/* Soft Cool Rim Light for Glass Highlights */}
        <directionalLight
          position={[-4, 3, -3]}
          intensity={1.8}
          color="#E8F0FE"
        />

        {/* Bottom Amber Glow Uplight */}
        <pointLight
          position={[0, -2.5, 2]}
          intensity={1.2}
          color="#E6A854"
          distance={8}
        />

        <Suspense fallback={null}>
          <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.4}>
            <group scale={0.7} position={[0, 0.3, 0]}>
              <SkincareFlacon
                materialPreset={materialPreset}
                isMobile={isMobile}
              />
            </group>
          </Float>

          {/* Contact shadow for grounding the floating vessel */}
          <ContactShadows
            position={[0, -1.8, 0]}
            opacity={0.45}
            scale={6.2}
            blur={2.4}
            far={4.5}
            color="#3E342B"
          />
        </Suspense>
      </Canvas>


      {/* Interactive Material Preset Switcher Pill */}
      <div className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 z-20 inline-flex items-center gap-2 sm:gap-3 p-1.5 pl-5 pr-2 rounded-full bg-white/95 backdrop-blur-xl border border-black/10 shadow-xl shadow-black/5 whitespace-nowrap">
        <span className="text-[10px] uppercase font-sans tracking-[0.22em] text-[var(--text-secondary)] font-semibold shrink-0 select-none pr-3 border-r border-black/15 hidden sm:inline-block">
          Vessel Edition
        </span>
        
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => onMaterialChange('amber')}
            className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full text-xs font-sans uppercase tracking-wider font-medium whitespace-nowrap shrink-0 transition-all ${
              materialPreset === 'amber'
                ? 'bg-[#1C1A18] text-[#FAF8F5] shadow-md ring-1 ring-black/10'
                : 'text-[var(--text-secondary)] hover:text-black hover:bg-black/5'
            }`}
            title="Imperial Amber Glass"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] inline-block border border-black/15 shrink-0" />
            <span>Amber Gold</span>
          </button>

          <button
            onClick={() => onMaterialChange('obsidian')}
            className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full text-xs font-sans uppercase tracking-wider font-medium whitespace-nowrap shrink-0 transition-all ${
              materialPreset === 'obsidian'
                ? 'bg-[#1C1A18] text-[#FAF8F5] shadow-md ring-1 ring-black/10'
                : 'text-[var(--text-secondary)] hover:text-black hover:bg-black/5'
            }`}
            title="Biophotonic Obsidian Glass"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#24211E] inline-block border border-white/30 shrink-0" />
            <span>Obsidian</span>
          </button>

          <button
            onClick={() => onMaterialChange('rose')}
            className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full text-xs font-sans uppercase tracking-wider font-medium whitespace-nowrap shrink-0 transition-all ${
              materialPreset === 'rose'
                ? 'bg-[#1C1A18] text-[#FAF8F5] shadow-md ring-1 ring-black/10'
                : 'text-[var(--text-secondary)] hover:text-black hover:bg-black/5'
            }`}
            title="Rose Quartz Infusion"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#E8A598] inline-block border border-black/15 shrink-0" />
            <span>Rose Quartz</span>
          </button>
        </div>
      </div>
    </div>
  );
}

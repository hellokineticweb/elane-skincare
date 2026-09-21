import React, { Suspense, useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Html } from '@react-three/drei';
import { SkincareFlacon } from './SkincareFlacon';
import { Info, RotateCw, ZoomIn } from 'lucide-react';
import { soundEngine } from '../../utils/audio';

const HOTSPOTS = [
  {
    id: 'dropper',
    title: 'Micro-Dosing Pipette',
    position: [0, 2.1, 0.4],
    subtitle: 'Calibrated to 0.25ml exact release',
    desc: 'Medical-grade elastomer bulb and borosilicate capillary tube prevent oxidation and ensure active potency preservation with each pump.'
  },
  {
    id: 'collar',
    title: '24K Anodized Collar',
    position: [0, 1.7, 0.55],
    subtitle: 'Zero-corrosion botanical barrier',
    desc: 'Ultra-pure aerospace aluminum alloy plated with micron-layer champagne gold, resisting essential oil degradation.'
  },
  {
    id: 'formula',
    title: 'Dual-Phase Bio-Ferment',
    position: [0, 0.0, 0.95],
    subtitle: '98.6% Active botanical fraction',
    desc: 'Unfiltered micro-droplet emulsion suspension holding Alpine Snow Rose stem cells and Bio-fermented Camellia lipids.'
  },
  {
    id: 'glass',
    title: 'Biophotonic Violet Glass',
    position: [0, -1.3, 0.95],
    subtitle: 'Spectral light filtration',
    desc: 'Filters out visible spectrum light while permitting beneficial UV-A and Infrared rays to naturally energize botanical molecular bonds.'
  }
];

export function InteractiveProductViewer() {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [materialPreset, setMaterialPreset] = useState('amber');
  const [autoRotate, setAutoRotate] = useState(true);

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

  const handleHotspotClick = (spot) => {
    soundEngine.playChime('click');
    setActiveHotspot(activeHotspot?.id === spot.id ? null : spot);
  };

  return (
    <div ref={containerRef} className="relative w-full h-[620px] lg:h-[720px] rounded-2xl bg-gradient-to-b from-[#1C1A18] to-[#121110] text-[#FBF9F5] overflow-hidden border border-white/10 shadow-2xl flex flex-col">
      {/* Top Header Bar */}
      <div className="p-6 md:p-8 flex items-center justify-between z-20 border-b border-white/10 bg-[#1C1A18]/60 backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--gold-primary)] animate-pulse" />
            <span className="text-xs uppercase tracking-[0.2em] text-[var(--gold-primary)] font-medium">
              360° Tactile Laboratory Inspector
            </span>
          </div>
          <h3 className="text-xl md:text-2xl font-serif mt-1 font-light">
            The ÉLANE Signature Flacon Royale
          </h3>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              soundEngine.playChime('click');
              setAutoRotate(!autoRotate);
            }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
              autoRotate 
                ? 'bg-[var(--gold-primary)] text-black border-[var(--gold-primary)]'
                : 'bg-white/5 text-white/80 border-white/15 hover:bg-white/10'
            }`}
          >
            <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
            <span className="hidden sm:inline">{autoRotate ? 'Rotating' : 'Paused'}</span>
          </button>
        </div>
      </div>

      {/* Main 3D Canvas Area */}
      <div className="relative flex-1 w-full h-full cursor-grab active:cursor-grabbing">
        <Canvas
          shadows
          frameloop={isVisible ? 'always' : 'never'}
          dpr={isMobile ? [1, 1.25] : [1, 1.75]}
          camera={{ position: [0, 0.6, 14.2], fov: 28 }}

          gl={{ 
            antialias: true, 
            alpha: true, 
            powerPreference: 'high-performance',
            stencil: false 
          }}
        >
          <ambientLight intensity={0.95} color="#FAF6F0" />
          <directionalLight 
            position={[4, 6, 4]} 
            intensity={2.6} 
            color="#FFF2DB" 
            castShadow 
            shadow-mapSize-width={512}
            shadow-mapSize-height={512}
            shadow-bias={-0.0001}
          />
          <directionalLight position={[-4, 2, -3]} intensity={1.8} color="#C4D7F5" />
          <pointLight position={[0, -2, 2.5]} intensity={1.5} color="#D4AF37" />

          <Suspense fallback={null}>
            <group scale={0.58} position={[0, -0.15, 0]}>
              <SkincareFlacon materialPreset={materialPreset} interactive={true} isMobile={isMobile} />


              {/* 3D Interactive Hotspot Markers */}
              {HOTSPOTS.map((spot) => (
                <group key={spot.id} position={spot.position}>
                  <Html center distanceFactor={7}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleHotspotClick(spot);
                      }}
                      className={`group relative flex items-center justify-center w-7 h-7 rounded-full transition-all duration-300 ${
                        activeHotspot?.id === spot.id
                          ? 'bg-[var(--gold-vivid)] text-black scale-125 shadow-lg shadow-[var(--gold-glow)]'
                          : 'bg-black/80 text-white/90 border border-[var(--gold-primary)]/70 hover:scale-110'
                      }`}
                      title={spot.title}
                    >
                      <span className="absolute -inset-1 rounded-full bg-[var(--gold-primary)] opacity-40 animate-ping" />
                      <Info className="w-3.5 h-3.5 relative z-10" />
                    </button>
                  </Html>
                </group>
              ))}
            </group>

            <ContactShadows position={[0, -1.6, 0]} opacity={0.65} scale={6.5} blur={2.8} far={4} color="#000000" />

            <OrbitControls
              enablePan={false}
              enableZoom={true}
              target={[0, 0.4, 0]}
              minDistance={5.0}
              maxDistance={18.0}
              minPolarAngle={Math.PI / 4}
              maxPolarAngle={Math.PI / 1.7}
              autoRotate={autoRotate}
              autoRotateSpeed={1.2}
            />
          </Suspense>
        </Canvas>

        {/* Hotspot Detailed Callout Overlay */}
        {activeHotspot && (
          <div className="absolute top-4 right-4 md:top-8 md:right-8 max-w-sm p-6 rounded-xl bg-[#1C1A18]/95 backdrop-blur-xl border border-[var(--gold-primary)]/40 shadow-2xl z-30 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase font-sans tracking-[0.2em] text-[var(--gold-primary)] font-semibold">
                  Lab Specification
                </span>
                <h4 className="text-lg font-serif font-medium text-white mt-0.5">
                  {activeHotspot.title}
                </h4>
                <p className="text-xs text-[var(--gold-subtle)] font-sans mt-0.5">
                  {activeHotspot.subtitle}
                </p>
              </div>
              <button
                onClick={() => setActiveHotspot(null)}
                className="text-white/60 hover:text-white text-xs px-2 py-1 bg-white/10 rounded-full"
              >
                ✕
              </button>
            </div>
            
            <p className="text-sm text-[#E2D2B8]/90 font-sans mt-3 leading-relaxed">
              {activeHotspot.desc}
            </p>
          </div>
        )}

        {/* Bottom Hint Indicator */}
        <div className="absolute bottom-4 left-6 z-20 flex items-center gap-2 text-xs text-white/50 font-sans pointer-events-none">
          <ZoomIn className="w-3.5 h-3.5" />
          <span>Click & drag to rotate 360° • Click gold dots to inspect lab details</span>
        </div>
      </div>

      {/* Bottom Material Switcher Bar */}
      <div className="p-4 md:px-8 border-t border-white/10 bg-[#141312] flex flex-wrap items-center justify-between gap-4 z-20">
        <span className="text-xs uppercase tracking-widest text-white/60 font-sans">
          Custom Flacon Finish:
        </span>
        
        <div className="flex items-center gap-3">
          {[
            { id: 'amber', label: 'Imperial Amber', color: '#D4AF37' },
            { id: 'obsidian', label: 'Biophotonic Obsidian', color: '#2C2824' },
            { id: 'rose', label: 'Rose Quartz', color: '#E8A598' },
            { id: 'alabaster', label: 'Frosted Alabaster', color: '#E8E1D5' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                soundEngine.playChime('click');
                setMaterialPreset(item.id);
              }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-sans transition-all border ${
                materialPreset === item.id
                  ? 'bg-white/15 border-[var(--gold-primary)] text-white shadow-sm'
                  : 'border-white/10 text-white/60 hover:text-white hover:border-white/30'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="hidden sm:inline">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

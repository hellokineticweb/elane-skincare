import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function SkincareFlacon({ 
  materialPreset = 'amber', 
  interactive = false, 
  isMobile = false
}) {
  const groupRef = useRef();
  const liquidRef = useRef();
  const particlesRef = useRef();



  // Color themes according to material preset
  const theme = useMemo(() => {
    switch (materialPreset) {
      case 'obsidian':
        return {
          glassColor: '#1a1918',
          transmission: 0.35,
          roughness: 0.12,
          liquidColor: '#302820',
          metalColor: '#B89758',
          metalRoughness: 0.25,
          labelColor: '#D4AF37'
        };
      case 'rose':
        return {
          glassColor: '#F5E6E8',
          transmission: 0.92,
          roughness: 0.06,
          liquidColor: '#E8A598',
          metalColor: '#E8C5B0',
          metalRoughness: 0.2,
          labelColor: '#9A6B62'
        };
      case 'alabaster':
        return {
          glassColor: '#F8F6F0',
          transmission: 0.82,
          roughness: 0.25,
          liquidColor: '#EDE3D2',
          metalColor: '#CBB48C',
          metalRoughness: 0.3,
          labelColor: '#2B2620'
        };
      case 'amber':
      default:
        return {
          glassColor: '#F7E7CE',
          transmission: 0.88,
          roughness: 0.08,
          liquidColor: '#D49438',
          metalColor: '#D4AF37',
          metalRoughness: 0.18,
          labelColor: '#D4AF37'
        };
    }
  }, [materialPreset]);

  // High-res luxury label texture with typographic branding
  const labelTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    // Background alabaster / translucent paper
    ctx.fillStyle = '#FAF8F5';
    ctx.fillRect(0, 0, 1024, 1024);

    // Fine gold hairline border
    ctx.strokeStyle = '#C5A880';
    ctx.lineWidth = 6;
    ctx.strokeRect(50, 50, 924, 924);

    // Inner dotted gold framing
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 2.5;
    ctx.strokeRect(70, 70, 884, 884);

    // Gold monogram seal at top
    ctx.fillStyle = '#C5A880';
    ctx.beginPath();
    ctx.arc(512, 210, 65, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#FAF8F5';
    ctx.font = 'bold 56px "Cormorant Garamond", Georgia, serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('É', 512, 212);

    // Main Brand Headline
    ctx.fillStyle = '#1C1A18';
    ctx.font = '300 78px "Cormorant Garamond", Georgia, serif';
    ctx.letterSpacing = '14px';
    ctx.fillText('ÉLANE', 512, 370);

    // Subtitle
    ctx.font = '600 24px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#8A6D3B';
    ctx.letterSpacing = '10px';
    ctx.fillText('PARIS', 512, 425);

    // Thin decorative line
    ctx.strokeStyle = '#C5A880';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(380, 470);
    ctx.lineTo(644, 470);
    ctx.stroke();

    // Product Name
    ctx.fillStyle = '#1C1A18';
    ctx.font = 'italic 400 48px "Cormorant Garamond", Georgia, serif';
    ctx.letterSpacing = '2px';
    ctx.fillText("L'Élixir Sublime", 512, 560);

    // Formula specs
    ctx.font = '500 20px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#5C5852';
    ctx.letterSpacing = '4px';
    ctx.fillText('CELLULAR BIO-ACTIVE NECTAR', 512, 620);

    ctx.font = '400 19px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#8E8982';
    ctx.letterSpacing = '3px';
    ctx.fillText('98.6% BIO-FERMENTÉ • VALAIS ALPS', 512, 670);

    // Volume footer
    ctx.font = '500 22px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#1C1A18';
    ctx.letterSpacing = '3px';
    ctx.fillText('50 ML • 1.7 FL. OZ.', 512, 850);

    const texture = new THREE.CanvasTexture(canvas);
    texture.anisotropy = 8;
    return texture;
  }, []);

  // Dispose texture when component unmounts to prevent GPU memory leak
  useEffect(() => {
    return () => {
      if (labelTexture) {
        labelTexture.dispose();
      }
    };
  }, [labelTexture]);

  // Adaptive botanical micro-dust particles (35 on mobile, 70 on desktop)
  const particleCount = isMobile ? 35 : 70;
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const radius = 1.6 + Math.random() * 2.4;
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 5.0;
      pos[i * 3] = Math.cos(theta) * radius;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = Math.sin(theta) * radius;
    }
    return pos;
  }, [particleCount]);


  useFrame((state, delta) => {
    // Pause rendering work if tab is inactive
    if (document.hidden) return;

    const t = state.clock.getElapsedTime();

    if (groupRef.current) {
      if (!interactive) {
        const scrollY = window.scrollY;
        // Subtle floating breathing motion
        groupRef.current.position.y = Math.sin(t * 0.8) * 0.12 - (scrollY * 0.001);
        
        // Direct zero-React-render pointer coordinates
        const pointerX = state.pointer.x;
        const pointerY = state.pointer.y;

        const targetRotX = (pointerY * 0.25) + Math.cos(t * 0.5) * 0.04;
        const targetRotY = (pointerX * 0.45) + t * 0.15;
        
        groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, delta * 2.5);
        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, delta * 2.5);
        groupRef.current.rotation.z = Math.sin(t * 0.6) * 0.02;
      }
    }

    // Swirling micro-particles
    if (particlesRef.current) {
      particlesRef.current.rotation.y = t * 0.05;
      particlesRef.current.rotation.x = Math.sin(t * 0.08) * 0.1;
    }

    // Liquid slight meniscus pulse
    if (liquidRef.current) {
      liquidRef.current.position.y = -0.15 + Math.sin(t * 1.5) * 0.015;
    }
  });


  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* ================= BOTTLE GLASS BODY ================= */}
      {/* Outer Thick Glass Cylinder */}
      <mesh position={[0, -0.1, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.05, 1.0, 2.8, 48, 1, false]} />
        <meshPhysicalMaterial
          color={theme.glassColor}
          transmission={theme.transmission}
          roughness={theme.roughness}
          metalness={0.05}
          ior={1.52}
          thickness={1.4}
          specularIntensity={1.0}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
          transparent={true}
          opacity={0.98}
        />
      </mesh>

      {/* Glass Bottle Base (Heavy Solid Crystal Base) */}
      <mesh position={[0, -1.45, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.0, 0.96, 0.4, 48]} />
        <meshPhysicalMaterial
          color={theme.glassColor}
          transmission={0.9}
          roughness={0.05}
          ior={1.54}
          thickness={2.0}
          clearcoat={1.0}
        />
      </mesh>

      {/* Glass Bottle Shoulder (Tapered Neck Base) */}
      <mesh position={[0, 1.35, 0]} castShadow>
        <cylinderGeometry args={[0.55, 1.05, 0.4, 48]} />
        <meshPhysicalMaterial
          color={theme.glassColor}
          transmission={theme.transmission}
          roughness={theme.roughness}
          ior={1.52}
          thickness={1.2}
          clearcoat={1.0}
        />
      </mesh>

      {/* Glass Bottle Threaded Neck */}
      <mesh position={[0, 1.62, 0]} castShadow>
        <cylinderGeometry args={[0.42, 0.42, 0.28, 48]} />
        <meshPhysicalMaterial
          color={theme.glassColor}
          transmission={0.85}
          roughness={0.1}
          ior={1.52}
        />
      </mesh>

      {/* ================= INNER SERUM LIQUID ================= */}
      <mesh ref={liquidRef} position={[0, -0.15, 0]}>
        <cylinderGeometry args={[0.92, 0.88, 2.3, 40]} />
        <meshPhysicalMaterial
          color={theme.liquidColor}
          transmission={0.65}
          roughness={0.1}
          metalness={0.15}
          ior={1.38}
          attenuationColor={theme.liquidColor}
          attenuationDistance={0.8}
          transparent={true}
          opacity={0.92}
        />
      </mesh>

      {/* ================= LUXURY GOLDEN COLLAR & DROPPER ================= */}
      {/* Metallic Gold Collar Ring */}
      <mesh position={[0, 1.72, 0]} castShadow>
        <cylinderGeometry args={[0.48, 0.48, 0.26, 48]} />
        <meshStandardMaterial
          color={theme.metalColor}
          metalness={0.95}
          roughness={theme.metalRoughness}
        />
      </mesh>

      {/* Precision Gold Ring Detail */}
      <mesh position={[0, 1.88, 0]}>
        <torusGeometry args={[0.44, 0.04, 16, 48]} />
        <meshStandardMaterial
          color={theme.metalColor}
          metalness={0.98}
          roughness={0.15}
        />
      </mesh>

      {/* Upper Pipette Collar */}
      <mesh position={[0, 2.05, 0]} castShadow>
        <cylinderGeometry args={[0.38, 0.44, 0.35, 48]} />
        <meshStandardMaterial
          color={theme.metalColor}
          metalness={0.95}
          roughness={0.2}
        />
      </mesh>

      {/* Soft Black / Charcoal Rubber Dropper Bulb */}
      <mesh position={[0, 2.45, 0]} castShadow>
        <sphereGeometry args={[0.36, 32, 24]} />
        <meshStandardMaterial
          color="#181716"
          roughness={0.45}
          metalness={0.1}
        />
      </mesh>

      {/* Internal Glass Pipette Tube */}
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 2.8, 24]} />
        <meshPhysicalMaterial
          color="#FFFFFF"
          transmission={0.95}
          roughness={0.05}
          ior={1.48}
          transparent={true}
        />
      </mesh>

      {/* Pipette Dropper Tip */}
      <mesh position={[0, -1.15, 0]}>
        <coneGeometry args={[0.07, 0.16, 24]} />
        <meshPhysicalMaterial
          color="#FFFFFF"
          transmission={0.95}
          roughness={0.05}
        />
      </mesh>

      {/* ================= ÉLANE MINIMALIST GOLD LABEL EMBELLISHMENT ================= */}
      <mesh position={[0, -0.05, 1.054]} castShadow>
        <planeGeometry args={[1.2, 1.55]} />
        <meshStandardMaterial
          map={labelTexture}
          roughness={0.4}
          metalness={0.1}
          transparent={true}
          opacity={0.96}
        />
      </mesh>

      {/* ================= FLOATING BOTANICAL GOLD DUST ================= */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.035}
          color="#E6D5B8"
          transparent={true}
          opacity={0.7}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Ground Soft Caustic Shadow Disc */}
      <mesh position={[0, -1.8, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[4.5, 4.5]} />
        <shadowMaterial opacity={0.35} />
      </mesh>
    </group>
  );
}

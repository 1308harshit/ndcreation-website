'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Stars } from '@react-three/drei';
import { useRef, useState } from 'react';
import * as THREE from 'three';

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
      
      // Mouse interaction
      const x = state.mouse.x * 0.5;
      const y = state.mouse.y * 0.5;
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, x, 0.1);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, y, 0.1);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Sphere
        ref={meshRef}
        args={[1, 100, 100]}
        scale={hovered ? 1.15 : 1}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <MeshDistortMaterial
          color="#B026FF"
          attach="material"
          distort={0.6}
          speed={2.5}
          roughness={0.1}
          metalness={0.95}
          emissive="#FF006E"
          emissiveIntensity={0.8}
        />
      </Sphere>
    </Float>
  );
}

function Particles() {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 2000;

  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 15;
  }

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.03;
      particlesRef.current.rotation.x = state.clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#FF006E"
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function FloatingRings() {
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = state.clock.getElapsedTime() * 0.3;
      ring1Ref.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = -state.clock.getElapsedTime() * 0.2;
      ring2Ref.current.rotation.z = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <>
      <mesh ref={ring1Ref}>
        <torusGeometry args={[2, 0.03, 16, 100]} />
        <meshBasicMaterial color="#B026FF" transparent opacity={0.4} />
      </mesh>
      <mesh ref={ring2Ref}>
        <torusGeometry args={[2.5, 0.03, 16, 100]} />
        <meshBasicMaterial color="#FF006E" transparent opacity={0.3} />
      </mesh>
    </>
  );
}

export default function Scene3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      style={{ background: 'transparent' }}
      gl={{ antialias: true, alpha: true }}
    >
      {/* Lighting - Purple/Pink Gaming Theme */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={2} color="#B026FF" />
      <pointLight position={[-10, -10, -10]} intensity={1.5} color="#FF006E" />
      <pointLight position={[0, 0, 10]} intensity={1} color="#EC4899" />
      <spotLight
        position={[0, 5, 0]}
        angle={0.3}
        penumbra={1}
        intensity={1.5}
        color="#FF006E"
      />
      
      {/* Stars background */}
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />
      
      {/* Main sphere */}
      <AnimatedSphere />
      
      {/* Particles */}
      <Particles />
      
      {/* Floating rings */}
      <FloatingRings />
      
      {/* Controls */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.3}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
    </Canvas>
  );
}

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { Html } from "@react-three/drei";

const LoadingAnimation = () => {
  const groupRef = useRef<THREE.Group>(null);
  const torusRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const clockRef = useRef(new THREE.Clock());

  useFrame(() => {
    const elapsedTime = clockRef.current.getElapsedTime();
    
    if (groupRef.current) {
      // Main rotation - 2 seconds for full rotation
      groupRef.current.rotation.y = (elapsedTime * Math.PI) % (Math.PI * 2);
      
      // Add subtle wobble effect
      groupRef.current.rotation.x = Math.sin(elapsedTime * 2) * 0.1;
      groupRef.current.rotation.z = Math.cos(elapsedTime * 1.5) * 0.1;
    }
    
    if (torusRef.current) {
      // Pulsing effect
      const scale = 1 + Math.sin(elapsedTime * 4) * 0.1;
      torusRef.current.scale.set(scale, scale, scale);
      
      // Color shifting
      const hue = (elapsedTime * 0.2) % 1;
      (torusRef.current.material as THREE.MeshStandardMaterial).color.setHSL(hue, 0.8, 0.6);
    }
    
    if (particlesRef.current) {
      // Animate particles
      const positions = (particlesRef.current.geometry.attributes.position as THREE.BufferAttribute).array;
      
      for (let i = 0; i < positions.length; i += 3) {
        // Make particles orbit around the center
        const angle = elapsedTime * 0.5 + i * 0.1;
        const radius = 1.5 + Math.sin(elapsedTime * 2 + i) * 0.3;
        
        positions[i] = Math.cos(angle) * radius;
        positions[i + 1] = Math.sin(elapsedTime * 3 + i) * 0.5;
        positions[i + 2] = Math.sin(angle) * radius;
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  // Create particles
  const particlesCount = 100;
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesPositions = new Float32Array(particlesCount * 3);
  
  for (let i = 0; i < particlesCount * 3; i += 3) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 1 + Math.random() * 0.5;
    
    particlesPositions[i] = Math.cos(angle) * radius;
    particlesPositions[i + 1] = (Math.random() - 0.5) * 0.5;
    particlesPositions[i + 2] = Math.sin(angle) * radius;
  }
  
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(particlesPositions, 3));

  return (
    <group ref={groupRef}>
      {/* Main torus shape */}
      <mesh ref={torusRef} castShadow>
        <torusGeometry args={[1, 0.3, 16, 100]} />
        <meshStandardMaterial 
          color="#3b82f6" 
          metalness={0.7} 
          roughness={0.2}
          emissive="#3b82f6"
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Inner sphere for depth */}
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial 
          color="#ffffff" 
          metalness={0.9} 
          roughness={0.1}
          transparent
          opacity={0.7}
        />
      </mesh>
      
      {/* Orbiting particles */}
      <points ref={particlesRef} geometry={particlesGeometry}>
        <pointsMaterial 
          size={0.05} 
          color="#ffffff" 
          transparent 
          opacity={0.8}
          sizeAttenuation={true}
        />
      </points>
      
      {/* Lights */}
      <pointLight position={[2, 3, 4]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-2, -3, -4]} intensity={0.8} color="#3b82f6" />
      <ambientLight intensity={0.3} />
    </group>
  );
};

export const Loader = () => {
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="w-64 h-64">
          <Canvas
            camera={{ position: [0, 0, 5], fov: 50 }}
            gl={{ antialias: true, alpha: true }}
          >
            <LoadingAnimation />
            <OrbitControls enableZoom={false} enablePan={false} />
          </Canvas>
        </div>
        
        {/* Loading text with animation */}
        <div className="mt-6 flex space-x-1">
          {["L", "o", "a", "d", "i", "n", "g"].map((char, i) => (
            <span
              key={i}
              className="text-lg font-semibold text-blue-600 inline-block"
              style={{
                animation: `pulse 1.4s infinite ease-in-out`,
                animationDelay: `${i * 0.1}s`,
              }}
            >
              {char}
            </span>
          ))}
        </div>
      </div>
      
      <style>{`
        @keyframes pulse {
          0%, 80%, 100% {
            transform: scale(1);
            opacity: 0.7;
          }
          40% {
            transform: scale(1.1);
            opacity: 1;
          }
        }
      `}</style>
    </Html>
  );
};
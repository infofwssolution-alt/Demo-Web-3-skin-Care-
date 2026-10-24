import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  PresentationControls,
  Float,
  ContactShadows,
  Environment,
  Lightformer,
} from "@react-three/drei";
import { Bottle3D } from "./Bottle3D";

/* Full-bleed WebGL hero scene. Lighting uses Lightformers (no HDR download). */
export default function HeroScene({ scanning, activeId, onSelect }) {
  return (
    <Canvas
      camera={{ position: [0, 0.2, 7.2], fov: 32 }}
      dpr={[1, 2]}
      gl={{ antialias: true }}
      fallback={
        <img
          src="/product-hero.png"
          alt="Nuvé Glow Vitamin C Serum"
          className="h-full w-full object-contain"
        />
      }
    >
      <color attach="background" args={["#F4F1EC"]} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 5, 5]} intensity={1.5} />

      <Suspense fallback={null}>
        <PresentationControls
          global
          snap
          cursor
          speed={1.4}
          rotation={[0.04, -0.15, 0]}
          polar={[-0.25, 0.3]}
          azimuth={[-0.9, 0.9]}
        >
          {/* Enhanced floating with stylish dynamic tilt */}
          <Float speed={2} rotationIntensity={0.25} floatIntensity={0.6}>
            <group scale={0.8} rotation={[0.08, 0, 0.22]}>
              <Bottle3D scanning={scanning} activeId={activeId} onSelect={onSelect} />
            </group>
          </Float>
        </PresentationControls>

        <ContactShadows position={[0, -1.35, 0]} opacity={0.35} scale={6} blur={2.4} far={3} />

        <Environment resolution={256}>
          <Lightformer form="rect" intensity={3.2} position={[0, 5, 2]} scale={[8, 3, 1]} rotation-x={Math.PI / 2} />
          <Lightformer form="rect" intensity={2.2} position={[-5, 1, 1]} scale={[2, 6, 1]} rotation-y={Math.PI / 2} />
          <Lightformer form="rect" intensity={2.2} position={[5, 1, 1]} scale={[2, 6, 1]} rotation-y={-Math.PI / 2} />
          <Lightformer form="ring" color="#B79CF0" intensity={1.8} position={[0, 0.5, -5]} scale={4} />
        </Environment>
      </Suspense>
    </Canvas>
  );
}

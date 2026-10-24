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
      camera={{ position: [0, 0.35, 6.4], fov: 32 }}
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
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 5, 4]} intensity={1.4} />

      <Suspense fallback={null}>
        <PresentationControls
          global
          snap
          cursor
          speed={1.4}
          rotation={[0.06, -0.2, 0]}
          polar={[-0.25, 0.3]}
          azimuth={[-0.9, 0.9]}
        >
          <Float speed={1.3} rotationIntensity={0.12} floatIntensity={0.45}>
            <Bottle3D scanning={scanning} activeId={activeId} onSelect={onSelect} />
          </Float>
        </PresentationControls>

        <ContactShadows position={[0, -1.32, 0]} opacity={0.32} scale={7} blur={2.8} far={3} />

        <Environment resolution={256}>
          <Lightformer form="rect" intensity={3} position={[0, 5, 2]} scale={[8, 3, 1]} rotation-x={Math.PI / 2} />
          <Lightformer form="rect" intensity={2.2} position={[-5, 1, 1]} scale={[2, 6, 1]} rotation-y={Math.PI / 2} />
          <Lightformer form="rect" intensity={2.2} position={[5, 1, 1]} scale={[2, 6, 1]} rotation-y={-Math.PI / 2} />
          <Lightformer form="ring" color="#B79CF0" intensity={1.6} position={[0, 0.5, -5]} scale={4} />
        </Environment>
      </Suspense>
    </Canvas>
  );
}

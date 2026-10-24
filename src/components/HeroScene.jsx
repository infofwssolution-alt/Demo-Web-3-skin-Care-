import React, { Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import {
  Float,
  ContactShadows,
  Environment,
  Lightformer,
} from "@react-three/drei";
import { Bottle3D } from "./Bottle3D";

/* Interactive rig: smoothly steers bottle rotation and position based on mouse hover movement */
function HoverRig({ children }) {
  const group = useRef();
  const { viewport } = useThree();

  useFrame((state, delta) => {
    if (!group.current) return;
    // state.pointer holds normalized mouse coords: x from -1 to 1, y from -1 to 1
    const targetRotY = state.pointer.x * 0.95; // Turn towards cursor
    const targetRotX = 0.08 - state.pointer.y * 0.45; // Subtle nod with mouse height
    const targetRotZ = 0.22 - state.pointer.x * 0.15; // Maintain slanted flair

    // Smooth dampening towards cursor position
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, targetRotX, 4, delta);
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, targetRotY, 4, delta);
    group.current.rotation.z = THREE.MathUtils.damp(group.current.rotation.z, targetRotZ, 4, delta);

    // Subtle horizontal parallax follow
    const targetPosX = state.pointer.x * 0.35;
    const targetPosY = state.pointer.y * 0.2;
    group.current.position.x = THREE.MathUtils.damp(group.current.position.x, targetPosX, 3, delta);
    group.current.position.y = THREE.MathUtils.damp(group.current.position.y, targetPosY, 3, delta);
  });

  return <group ref={group}>{children}</group>;
}

/* Full-bleed WebGL hero scene with cursor-hover responsiveness + 80% slanted bottle */
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
        {/* Cursor hover rig moves and re-orients the bottle as cursor glides over the screen */}
        <HoverRig>
          {/* Enhanced floating with stylish dynamic tilt */}
          <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
            <group scale={0.8} rotation={[0.08, 0, 0.22]}>
              <Bottle3D scanning={scanning} activeId={activeId} onSelect={onSelect} />
            </group>
          </Float>
        </HoverRig>

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

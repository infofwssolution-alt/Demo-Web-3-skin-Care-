import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";

/* Label texture drawn on a canvas — no font downloads, works offline. */
function useLabelTexture() {
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 1024;
    c.height = 512;
    const ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.textAlign = "center";

    ctx.fillStyle = "#141615";
    ctx.font = "500 156px Georgia, 'Times New Roman', serif";
    ctx.fillText("NUVÉ", 512, 220);

    ctx.fillStyle = "#2A2E2C";
    ctx.font = "600 46px 'Segoe UI', Arial, sans-serif";
    ctx.fillText("GLOW VITAMIN C SERUM", 512, 315);

    ctx.fillStyle = "#6B716D";
    ctx.font = "400 30px 'Segoe UI', Arial, sans-serif";
    ctx.fillText("15% Stabilized Vitamin C  ·  30 ml / 1.0 fl oz", 512, 385);

    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
    return tex;
  }, []);
}

/* Glass body profile, revolved around Y. */
function useBodyGeometry() {
  return useMemo(() => {
    const pts = [
      [0.0, -1.1], [0.5, -1.1], [0.585, -1.075], [0.62, -1.0],
      [0.62, 0.58], [0.6, 0.7], [0.5, 0.82], [0.34, 0.93],
      [0.29, 0.98], [0.285, 1.12],
    ].map(([x, y]) => new THREE.Vector2(x, y));
    return new THREE.LatheGeometry(pts, 128);
  }, []);
}

import { HOTSPOTS } from "../data/hotspots";

export function Bottle3D({ scanning, activeId, onSelect }) {
  const spinRef = useRef();
  const ringRef = useRef();
  const scanT = useRef(0);
  const label = useLabelTexture();
  const bodyGeo = useBodyGeometry();

  useFrame((_, delta) => {
    if (spinRef.current) {
      spinRef.current.rotation.y += delta * (scanning ? 5.5 : 0.22);
    }
    if (ringRef.current) {
      if (scanning) {
        scanT.current = (scanT.current + delta * 0.9) % 1;
        ringRef.current.position.y = -1.15 + scanT.current * 3.0;
        ringRef.current.material.opacity = 0.9;
      } else {
        ringRef.current.material.opacity = THREE.MathUtils.lerp(
          ringRef.current.material.opacity, 0, 0.1
        );
      }
    }
  });

  return (
    <group>
      {/* Spinning bottle */}
      <group ref={spinRef}>
        {/* Glass body */}
        <mesh geometry={bodyGeo}>
          <meshPhysicalMaterial
            color="#ffffff"
            transmission={1}
            thickness={0.6}
            roughness={0.07}
            ior={1.45}
            clearcoat={1}
            clearcoatRoughness={0.05}
            envMapIntensity={1.2}
          />
        </mesh>

        {/* Liquid — golden lower phase */}
        <mesh position={[0, -0.6, 0]}>
          <cylinderGeometry args={[0.565, 0.565, 0.92, 96]} />
          <meshPhysicalMaterial color="#E9CC92" roughness={0.18} transmission={0.55} thickness={1.2} />
        </mesh>
        {/* Liquid — lilac upper phase */}
        <mesh position={[0, 0.22, 0]}>
          <cylinderGeometry args={[0.565, 0.565, 0.72, 96]} />
          <meshPhysicalMaterial color="#CBB8F2" roughness={0.18} transmission={0.55} thickness={1.2} />
        </mesh>

        {/* Pipette inside */}
        <mesh position={[0, 0.15, 0]}>
          <cylinderGeometry args={[0.045, 0.03, 2.0, 24]} />
          <meshPhysicalMaterial color="#ffffff" transmission={1} roughness={0.05} thickness={0.2} />
        </mesh>

        {/* Wrapped label (front arc) */}
        <mesh position={[0, -0.18, 0]}>
          <cylinderGeometry args={[0.628, 0.628, 0.95, 96, 1, true, -0.85, 1.7]} />
          <meshStandardMaterial map={label} transparent roughness={0.55} side={THREE.FrontSide} />
        </mesh>

        {/* Metal collar */}
        <mesh position={[0, 1.27, 0]}>
          <cylinderGeometry args={[0.33, 0.33, 0.34, 96]} />
          <meshStandardMaterial color="#DADADA" metalness={1} roughness={0.16} />
        </mesh>
        <mesh position={[0, 1.105, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.322, 0.018, 16, 96]} />
          <meshStandardMaterial color="#C9C9C9" metalness={1} roughness={0.2} />
        </mesh>

        {/* Rubber bulb */}
        <mesh position={[0, 1.66, 0]}>
          <capsuleGeometry args={[0.21, 0.36, 12, 48]} />
          <meshStandardMaterial color="#F4F2EE" roughness={0.6} />
        </mesh>
      </group>

      {/* Scan ring (doesn't spin, sweeps vertically) */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]} position={[0, -1.15, 0]}>
        <torusGeometry args={[0.82, 0.012, 16, 128]} />
        <meshBasicMaterial color="#9370DB" transparent opacity={0} toneMapped={false} />
      </mesh>

      {/* Hotspots anchored in 3D — they follow drag-tilt and float, not the spin */}
      {HOTSPOTS.map((h) => {
        const active = h.id === activeId;
        return (
          <Html key={h.id} position={h.position} center distanceFactor={7} zIndexRange={[20, 0]}>
            <button
              onClick={() => onSelect(h.id)}
              className={`group flex items-center gap-2 whitespace-nowrap rounded-full border px-3 py-1.5 text-[11px] font-semibold shadow-lg backdrop-blur-md transition ${
                active
                  ? "border-[#9370DB] bg-white text-[#141615]"
                  : "border-white/80 bg-white/60 text-[#2A2E2C] hover:bg-white"
              }`}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#9370DB] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#9370DB]" />
              </span>
              {h.label}
            </button>
          </Html>
        );
      })}
    </group>
  );
}

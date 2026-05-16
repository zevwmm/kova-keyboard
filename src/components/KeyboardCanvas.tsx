"use client";

import { useRef, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import * as THREE from "three";

// ── Preload ─────────────────────────────────────────────────────
useGLTF.preload("/keyboard.glb");

// ── Keyboard model ───────────────────────────────────────────────
interface KeyboardModelProps {
  mouseX: React.MutableRefObject<number>;
  mouseY: React.MutableRefObject<number>;
}

function KeyboardModel({ mouseX, mouseY }: KeyboardModelProps) {
  const { scene } = useGLTF("/keyboard.glb");
  const groupRef  = useRef<THREE.Group>(null);
  const rotY      = useRef(0);

  // Override unlit materials → PBR so lighting works
  useEffect(() => {
    scene.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (!mesh.isMesh) return;
      const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      const newMats = mats.map((m) => {
        const src = m as THREE.MeshBasicMaterial;
        const mat = new THREE.MeshStandardMaterial({
          map:       src.map ?? null,
          roughness: 0.35,
          metalness: 0.45,
          side:      THREE.DoubleSide,
        });
        src.dispose();
        return mat;
      });
      mesh.material = Array.isArray(mesh.material) ? newMats : newMats[0];
    });
  }, [scene]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // Auto-rotate slowly on Y
    rotY.current += delta * 0.12;

    // Mouse tilt — max ±5°
    const maxTilt = (5 * Math.PI) / 180;
    const targetX = -mouseY.current * maxTilt;
    const targetY = rotY.current + mouseX.current * maxTilt;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetX,
      0.06
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetY,
      0.06
    );
  });

  return (
    <group ref={groupRef} scale={1.9} position={[0, -0.1, 0]}>
      <primitive object={scene.clone(true)} />
    </group>
  );
}

// ── Lights ──────────────────────────────────────────────────────
function Lights() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight
        intensity={2.2}
        position={[5, 5, 5]}
        color="#fff8f0"
        castShadow={false}
      />
      <spotLight
        intensity={0.9}
        position={[-3, 3, 2]}
        color="#FF8FAB"
        angle={0.5}
        penumbra={0.8}
      />
      <directionalLight intensity={0.4} position={[-4, -2, -3]} color="#d4c4e0" />
    </>
  );
}

// ── Mouse tracker (normalised -1 → 1) ───────────────────────────
function MouseTracker({
  mouseX,
  mouseY,
}: {
  mouseX: React.MutableRefObject<number>;
  mouseY: React.MutableRefObject<number>;
}) {
  const { gl } = useThree();

  useEffect(() => {
    const el = gl.domElement.parentElement ?? window;
    const onMove = (e: Event) => {
      const ev = e as MouseEvent;
      const { innerWidth: w, innerHeight: h } = window;
      mouseX.current = (ev.clientX / w - 0.5) * 2;
      mouseY.current = (ev.clientY / h - 0.5) * 2;
    };
    el.addEventListener("mousemove", onMove as EventListener, { passive: true });
    return () => el.removeEventListener("mousemove", onMove as EventListener);
  }, [gl, mouseX, mouseY]);

  return null;
}

// ── Loading fallback ─────────────────────────────────────────────
function LoadingFallback() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <div className="w-48 h-1 bg-border rounded-full overflow-hidden">
        <div
          className="h-full bg-accent rounded-full"
          style={{ animation: "shimmer 1.2s ease-in-out infinite" }}
        />
      </div>
      <p className="font-body text-xs text-muted tracking-widest uppercase">
        Loading model…
      </p>
      <style>{`
        @keyframes shimmer {
          0%   { width: 0%; margin-left: 0; }
          50%  { width: 60%; margin-left: 20%; }
          100% { width: 0%; margin-left: 100%; }
        }
      `}</style>
    </div>
  );
}

// ── Main export ──────────────────────────────────────────────────
export default function KeyboardCanvas() {
  const mouseX = useRef(0);
  const mouseY = useRef(0);

  return (
    <div className="w-full h-full" aria-label="Interactive 3D keyboard model" role="img">
      <Suspense fallback={<LoadingFallback />}>
        <Canvas
          camera={{ position: [0, 1.4, 3.8], fov: 42 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
          style={{ background: "transparent" }}
        >
          <MouseTracker mouseX={mouseX} mouseY={mouseY} />
          <Lights />
          <Environment preset="apartment" environmentIntensity={0.6} />
          <KeyboardModel mouseX={mouseX} mouseY={mouseY} />
        </Canvas>
      </Suspense>
    </div>
  );
}

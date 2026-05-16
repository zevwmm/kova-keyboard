"use client";

import { useRef, useEffect, useState, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import { motion, useSpring, useTransform, MotionValue } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

// ── Layer metadata ────────────────────────────────────────────────
const LAYERS = [
  {
    name: "PBT KEYCAPS",
    spec: "Double-shot Cherry profile · dye-sub legends · 1.5mm top",
    side: "left" as const,
    offsetY: 0.62,
  },
  {
    name: "LINEAR SWITCHES",
    spec: "45g actuation · pre-lubed · 5-pin hot-swap",
    side: "right" as const,
    offsetY: 0.36,
  },
  {
    name: "ALUMINUM PLATE",
    spec: "CNC 6063 aluminum · 1.5mm · half-plate design",
    side: "left" as const,
    offsetY: 0.15,
  },
  {
    name: "HOT-SWAP PCB",
    spec: "QMK / VIA · per-key RGB · USB-C · ESD protection",
    side: "right" as const,
    offsetY: -0.12,
  },
  {
    name: "CNC CASE",
    spec: "6063 aluminum body · internal silicone dampening",
    side: "left" as const,
    offsetY: -0.36,
  },
  {
    name: "BRASS WEIGHT",
    spec: "Solid brass insert · 320g additional mass",
    side: "right" as const,
    offsetY: -0.60,
  },
];

// ── Shared progress ref (GSAP writes, R3F reads) ─────────────────
type ProgressRef = React.MutableRefObject<number>;
type InvalidateRef = React.MutableRefObject<(() => void) | null>;

// ── 3D Exploded Keyboard ─────────────────────────────────────────
interface KeyboardExplodeProps {
  progressRef: ProgressRef;
  invalidateRef: InvalidateRef;
}

function KeyboardExplode({ progressRef, invalidateRef }: KeyboardExplodeProps) {
  const { scene }    = useGLTF("/keyboard.glb");
  const { invalidate } = useThree();
  const layerRefs    = useRef<THREE.Object3D[]>([]);
  const origPos      = useRef<THREE.Vector3[]>([]);
  const localUpRef   = useRef<THREE.Vector3>(new THREE.Vector3(0, 1, 0));
  const ready        = useRef(false);

  // Wire invalidate
  useEffect(() => {
    invalidateRef.current = invalidate;
  }, [invalidate, invalidateRef]);

  // Override unlit → PBR
  useEffect(() => {
    scene.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (!mesh.isMesh) return;
      const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      const next = mats.map((m) => {
        const src = m as THREE.MeshBasicMaterial;
        const mat = new THREE.MeshStandardMaterial({
          map: src.map ?? null,
          roughness: 0.35,
          metalness: 0.45,
          side: THREE.DoubleSide,
        });
        src.dispose();
        return mat;
      });
      mesh.material = Array.isArray(mesh.material) ? next : next[0];
    });
  }, [scene]);

  // Find and sort layers on mount
  useEffect(() => {
    // Find the "Model" group
    let modelGroup: THREE.Object3D | null = null;
    scene.traverse((obj) => {
      if (obj.name === "Model") modelGroup = obj;
    });
    if (!modelGroup) {
      // Fallback: find any group with 6 mesh children
      scene.traverse((obj) => {
        if (obj.children.length >= 5 && !modelGroup) {
          const hasMeshes = obj.children.some((c) => (c as THREE.Mesh).isMesh);
          if (hasMeshes) modelGroup = obj;
        }
      });
    }
    if (!modelGroup) return;

    const children = (modelGroup as THREE.Object3D).children.filter(
      (c) => (c as THREE.Mesh).isMesh || c.children.some((cc) => (cc as THREE.Mesh).isMesh)
    );

    if (children.length === 0) return;

    // Sort by world-space bbox center Y (highest = keycaps on top)
    const box = new THREE.Box3();
    const ctr = new THREE.Vector3();
    const sorted = [...children].sort((a, b) => {
      box.setFromObject(a); box.getCenter(ctr); const ay = ctr.y;
      box.setFromObject(b); box.getCenter(ctr); const by = ctr.y;
      return by - ay; // descending
    });

    layerRefs.current = sorted;
    origPos.current   = sorted.map((c) => c.position.clone());

    // Compute localUp: transform world Y into parent's local space
    if (sorted[0].parent) {
      const inv = new THREE.Matrix4()
        .copy(sorted[0].parent.matrixWorld)
        .invert();
      const worldUp = new THREE.Vector3(0, 1, 0);
      localUpRef.current = worldUp.transformDirection(inv).normalize();
    }

    ready.current = true;
  }, [scene]);

  useFrame(() => {
    if (!ready.current) return;
    const raw = progressRef.current; // 0–1

    // Phase: 0–0.3 assembled, 0.3–0.7 exploded, 0.7–1.0 reassembled
    let explodeT = 0;
    if (raw < 0.3) {
      explodeT = 0;
    } else if (raw < 0.65) {
      explodeT = (raw - 0.3) / 0.35; // 0→1
    } else if (raw < 1.0) {
      explodeT = 1 - (raw - 0.65) / 0.35; // 1→0
    }

    // Ease
    explodeT = explodeT < 0.5
      ? 4 * explodeT * explodeT * explodeT
      : 1 - Math.pow(-2 * explodeT + 2, 3) / 2;

    layerRefs.current.forEach((obj, i) => {
      const orig   = origPos.current[i];
      if (!orig) return;
      const offset = (LAYERS[i]?.offsetY ?? 0) * explodeT;
      obj.position
        .copy(orig)
        .addScaledVector(localUpRef.current, offset);
    });
  });

  return (
    <group scale={1.9} position={[0, -0.1, 0]}>
      <primitive object={scene} />
    </group>
  );
}

// ── Lights (same as hero) ────────────────────────────────────────
function ExplodeLights() {
  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight intensity={2.2} position={[5, 5, 5]} color="#fff8f0" />
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

// ── Label component ──────────────────────────────────────────────
function Label({
  layer,
  index,
  labelOpacity,
}: {
  layer: (typeof LAYERS)[0];
  index: number;
  labelOpacity: MotionValue<number>;
}) {
  const isLeft = layer.side === "left";

  // Vertical positions evenly spaced
  const topPercent = 12 + index * 14; // 12, 26, 40, 54, 68, 82

  return (
    <motion.div
      style={{
        position: "absolute",
        top: `${topPercent}%`,
        [isLeft ? "left" : "right"]: "0",
        opacity: labelOpacity,
        pointerEvents: "none",
      }}
      className={`flex items-center gap-3 ${isLeft ? "flex-row" : "flex-row-reverse"}`}
    >
      {/* Text */}
      <div className={`${isLeft ? "text-left" : "text-right"} max-w-[160px] md:max-w-[200px]`}>
        <div className="font-heading font-black text-ink text-xs md:text-sm tracking-tight leading-tight">
          {layer.name}
        </div>
        <div className="font-body font-light text-ink-2 text-[10px] md:text-xs leading-snug mt-0.5">
          {layer.spec}
        </div>
      </div>

      {/* Connector line */}
      <div className="flex items-center gap-1 flex-shrink-0">
        <div
          className="h-px bg-accent/40"
          style={{ width: "clamp(24px, 4vw, 48px)" }}
        />
        <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
      </div>
    </motion.div>
  );
}

// ── Main section ─────────────────────────────────────────────────
export default function ExplodeSection() {
  const outerRef      = useRef<HTMLDivElement>(null);
  const progressRef   = useRef(0);
  const invalidateRef = useRef<(() => void) | null>(null);
  const [rawProgress, setRawProgress] = useState(0);

  // Springs for label opacity
  const springProgress = useSpring(0, { stiffness: 80, damping: 20 });
  const labelOpacity   = useTransform(springProgress, [0.28, 0.4, 0.6, 0.72], [0, 1, 1, 0]);

  useEffect(() => {
    if (!outerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: outerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.6,
        onUpdate: (self) => {
          progressRef.current = self.progress;
          springProgress.set(self.progress);
          setRawProgress(self.progress);
          invalidateRef.current?.();
        },
      });
    }, outerRef);

    return () => ctx.revert();
  }, [springProgress]);

  // Phase text
  let phaseText = "Scroll to explore the layers";
  if (rawProgress >= 0.28 && rawProgress < 0.68) {
    phaseText = "The anatomy of precision";
  } else if (rawProgress >= 0.68) {
    phaseText = "Every component, in harmony";
  }

  return (
    <section
      id="anatomy"
      className="relative seigaiha-bg"
      aria-label="Keyboard anatomy explode view"
    >
      {/* Outer scroll container — 300 vh gives scroll room */}
      <div ref={outerRef} style={{ height: "300vh", position: "relative" }}>
        {/* Sticky viewport */}
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
          className="bg-[#FDF8F5]"
        >
          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="absolute top-8 left-1/2 -translate-x-1/2 text-center pointer-events-none z-20"
          >
            <p className="font-body text-xs text-muted tracking-[0.3em] uppercase mb-1">
              EXPLODED VIEW
            </p>
            <p
              key={phaseText}
              className="font-heading font-black text-ink text-lg md:text-xl tracking-tight"
            >
              {phaseText}
            </p>
          </motion.div>

          {/* 3D Canvas + Labels wrapper */}
          <div className="relative w-full max-w-4xl mx-auto" style={{ height: "75vh" }}>
            {/* Labels — left side */}
            <div
              className="absolute left-0 top-0 bottom-0 flex flex-col justify-start pointer-events-none"
              style={{ width: "clamp(150px, 22vw, 220px)" }}
              aria-label="Component labels"
            >
              {LAYERS.filter((l) => l.side === "left").map((layer, i) => (
                <Label
                  key={layer.name}
                  layer={layer}
                  index={i * 2}
                  labelOpacity={labelOpacity}
                />
              ))}
            </div>

            {/* Labels — right side */}
            <div
              className="absolute right-0 top-0 bottom-0 flex flex-col justify-start pointer-events-none"
              style={{ width: "clamp(150px, 22vw, 220px)" }}
            >
              {LAYERS.filter((l) => l.side === "right").map((layer, i) => (
                <Label
                  key={layer.name}
                  layer={layer}
                  index={i * 2 + 1}
                  labelOpacity={labelOpacity}
                />
              ))}
            </div>

            {/* 3D Canvas */}
            <div
              className="absolute inset-0 mx-auto"
              style={{ width: "clamp(280px, 50vw, 560px)", left: "50%", transform: "translateX(-50%)" }}
            >
              <Suspense fallback={null}>
                <Canvas
                  camera={{ position: [0, 1.2, 3.8], fov: 42 }}
                  gl={{ antialias: true, alpha: true }}
                  dpr={[1, 2]}
                  frameloop="demand"
                  style={{ background: "transparent", width: "100%", height: "100%" }}
                >
                  <ExplodeLights />
                  <Environment preset="apartment" environmentIntensity={0.5} />
                  <KeyboardExplode
                    progressRef={progressRef}
                    invalidateRef={invalidateRef}
                  />
                </Canvas>
              </Suspense>
            </div>
          </div>

          {/* Scroll progress bar */}
          <div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
            aria-hidden="true"
          >
            <div className="w-48 h-px bg-border overflow-hidden rounded-full">
              <motion.div
                className="h-full bg-accent rounded-full"
                style={{ scaleX: springProgress, transformOrigin: "left" }}
              />
            </div>
            <p className="font-body text-[10px] text-muted tracking-[0.25em] uppercase">
              {Math.round(rawProgress * 100)}%
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

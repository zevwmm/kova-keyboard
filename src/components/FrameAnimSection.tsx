"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface FrameAnimSectionProps {
  frames: HTMLImageElement[];
}

// Spec labels shown while keyboard is exploded
const LABELS = [
  { name: "Keycaps",         spec: "PBT Double-shot",       side: "left",  top: "18%" },
  { name: "Linear Switches", spec: "Gateron G Pro 3.0",     side: "left",  top: "44%" },
  { name: "Aluminium Case",  spec: "CNC 6063-T5",           side: "right", top: "28%" },
  { name: "Hot-swap PCB",    spec: "South-facing sockets",  side: "right", top: "52%" },
  { name: "Plate & Stabs",   spec: "Durock V2 pre-lubed",   side: "right", top: "65%" },
] as const;

type LabelEntry = (typeof LABELS)[number];

// Smooth opacity curve with per-label stagger
// fade-in  0.28 → 0.38, plateau 0.38 → 0.68, fade-out 0.68 → 0.78
function calcLabelOpacity(progress: number, stagger: number): number {
  const p = progress - stagger;
  if (p <= 0.28 || p >= 0.78) return 0;
  if (p < 0.38) return (p - 0.28) / 0.10;
  if (p > 0.68) return (0.78 - p) / 0.10;
  return 1;
}

export default function FrameAnimSection({ frames }: FrameAnimSectionProps) {
  const sectionRef      = useRef<HTMLElement>(null);
  const canvasRef       = useRef<HTMLCanvasElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const frameCounterRef = useRef<HTMLSpanElement>(null);
  const labelRefs       = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas  = canvasRef.current;
    if (!section || !canvas || frames.length === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ── Canvas sizing ──────────────────────────────────────────────
    let W   = 0;
    let H   = 0;
    let dpr = 1;

    function sizeCanvas(): void {
      W   = window.innerWidth;
      H   = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, window.innerWidth < 768 ? 0.85 : 1.5);

      canvas!.width  = Math.round(W * dpr);
      canvas!.height = Math.round(H * dpr);
      canvas!.style.width  = `${W}px`;
      canvas!.style.height = `${H}px`;

      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    sizeCanvas();

    // ── Draw one frame ─────────────────────────────────────────────
    function drawFrame(rawIndex: number): void {
      const idx = Math.max(0, Math.min(Math.round(rawIndex), frames.length - 1));
      const img = frames[idx];
      if (!img?.complete || !img.naturalWidth) return;

      ctx!.clearRect(0, 0, W, H);

      // Object-fit: contain
      const scale = Math.min(W / img.naturalWidth, H / img.naturalHeight);
      const dw    = img.naturalWidth  * scale;
      const dh    = img.naturalHeight * scale;
      const ox    = (W - dw) / 2;
      const oy    = (H - dh) / 2;

      ctx!.drawImage(img, ox, oy, dw, dh);
    }

    // Draw the first frame on mount
    drawFrame(0);

    // ── GSAP scroll tween ──────────────────────────────────────────
    const target = { f: 0 };

    const tween = gsap.to(target, {
      f: frames.length - 1,
      ease: "none",
      onUpdate() {
        const progress = target.f / (frames.length - 1);

        // Draw
        drawFrame(target.f);

        // Progress fill (DOM mutation, no re-render)
        if (progressFillRef.current) {
          progressFillRef.current.style.width = `${progress * 100}%`;
        }

        // Frame counter
        if (frameCounterRef.current) {
          const num = String(Math.round(target.f) + 1).padStart(3, "0");
          frameCounterRef.current.textContent = `${num} / ${frames.length}`;
        }

        // Spec label opacities — staggered by 18ms equivalent
        labelRefs.current.forEach((el, i) => {
          if (el) el.style.opacity = String(calcLabelOpacity(progress, i * 0.018));
        });
      },
      scrollTrigger: {
        trigger:      section,
        start:        "top top",
        end:          "+=3000",
        pin:          true,
        anticipatePin: 1,
        scrub:        0.5,
      },
    });

    // ── Resize handler ─────────────────────────────────────────────
    function onResize(): void {
      sizeCanvas();
      drawFrame(target.f);
      ScrollTrigger.refresh();
    }

    window.addEventListener("resize", onResize, { passive: true });

    // ── Cleanup ────────────────────────────────────────────────────
    return () => {
      tween.kill();
      // Kill only the ST attached to this section
      ScrollTrigger.getAll()
        .filter((st) => st.vars.trigger === section)
        .forEach((st) => st.kill());
      window.removeEventListener("resize", onResize);
    };
  }, [frames]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] overflow-hidden"
      style={{ background: "var(--bg)" }}
      aria-label="KOVA MK-1 component disassembly"
    >
      {/* ── Canvas ─────────────────────────────────────────────────── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        role="img"
        aria-label="Scroll-driven keyboard disassembly animation"
      />

      {/* ── Section label — top left ────────────────────────────────── */}
      <div
        className="absolute top-7 left-6 md:left-10 z-10 pointer-events-none select-none"
        aria-hidden="true"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-5 h-px bg-accent" />
          <span className="font-body text-[10px] text-muted tracking-[0.28em] uppercase">
            Engineering
          </span>
        </div>
      </div>

      {/* ── Frame counter — top right ───────────────────────────────── */}
      <div
        className="absolute top-7 right-6 md:right-10 z-10 pointer-events-none select-none"
        aria-hidden="true"
      >
        <span
          ref={frameCounterRef}
          className="font-body text-[10px] text-muted tabular-nums tracking-[0.15em]"
        >
          001 / {frames.length || 192}
        </span>
      </div>

      {/* ── Spec labels ─────────────────────────────────────────────── */}
      {LABELS.map((label: LabelEntry, i) => (
        <div
          key={label.name}
          ref={(el) => { labelRefs.current[i] = el; }}
          className={[
            "absolute z-10 hidden md:flex items-center gap-3",
            "pointer-events-none select-none",
            label.side === "left"
              ? "left-4 md:left-10 flex-row"
              : "right-4 md:right-10 flex-row-reverse",
          ].join(" ")}
          style={{ top: label.top, opacity: 0 }}
          aria-hidden="true"
        >
          {/* Text block */}
          <div className={label.side === "left" ? "text-right" : "text-left"}>
            <p className="font-heading font-black text-xs text-ink tracking-tight leading-none mb-0.5">
              {label.spec}
            </p>
            <p className="font-body text-[10px] text-muted tracking-[0.22em] uppercase">
              {label.name}
            </p>
          </div>

          {/* Connector line + dot */}
          <div className="flex items-center flex-shrink-0">
            {label.side === "right" && (
              <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
            )}
            <div className="w-8 md:w-14 h-px bg-ink/20" />
            {label.side === "left" && (
              <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
            )}
          </div>
        </div>
      ))}

      {/* ── Progress bar — bottom center ─────────────────────────────── */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 pointer-events-none select-none flex flex-col items-center gap-2.5"
        aria-hidden="true"
      >
        <div
          className="w-28 md:w-40 rounded-full overflow-hidden"
          style={{ height: "1px", background: "rgba(240,228,232,0.5)" }}
        >
          <div
            ref={progressFillRef}
            className="h-full rounded-full"
            style={{ width: "0%", background: "var(--accent)" }}
          />
        </div>
        <span className="font-body text-[9px] text-muted tracking-[0.3em] uppercase">
          Scroll to explore
        </span>
      </div>
    </section>
  );
}

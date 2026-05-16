"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.2 } },
};
const item = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.75, ease: "easeOut" as const } },
};

/* Subtle cherry blossom shown in the right column while no frame is available */
function CherryBlossomDecor() {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[65%] max-w-[280px] opacity-[0.10]"
      >
        {/* 5-petal cherry blossom — each petal is a mirrored bezier rotated 72° */}
        {[0, 72, 144, 216, 288].map((deg) => (
          <path
            key={deg}
            d="M100 30 C124 55 124 85 100 100 C76 85 76 55 100 30Z"
            fill="#FF8FAB"
            transform={`rotate(${deg} 100 100)`}
          />
        ))}
        {/* Petal vein lines */}
        {[0, 72, 144, 216, 288].map((deg) => (
          <line
            key={`v${deg}`}
            x1="100" y1="100" x2="100" y2="30"
            stroke="#FFFFFF"
            strokeWidth="0.8"
            opacity="0.4"
            transform={`rotate(${deg} 100 100)`}
          />
        ))}
        {/* Centre disc */}
        <circle cx="100" cy="100" r="9" fill="#FFB3C6" />
        {/* Stamen dots */}
        {[0, 51, 102, 153, 204, 255, 306].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          return (
            <circle
              key={`s${deg}`}
              cx={100 + Math.cos(rad) * 14}
              cy={100 + Math.sin(rad) * 14}
              r="1.8"
              fill="#D4A574"
              opacity="0.7"
            />
          );
        })}
      </svg>

      {/* Three small scattered individual petals */}
      <svg
        viewBox="0 0 14 18" fill="none"
        className="absolute opacity-[0.08]"
        style={{ width: 28, top: "14%", left: "18%", transform: "rotate(-30deg)" }}
      >
        <path d="M7 0 C10 3 12 7 11 11 C10 14 8.5 16.5 7 18 C5.5 16.5 4 14 3 11 C2 7 4 3 7 0Z" fill="#FF8FAB" />
      </svg>
      <svg
        viewBox="0 0 14 18" fill="none"
        className="absolute opacity-[0.07]"
        style={{ width: 20, bottom: "20%", right: "22%", transform: "rotate(55deg)" }}
      >
        <path d="M7 0 C10 3 12 7 11 11 C10 14 8.5 16.5 7 18 C5.5 16.5 4 14 3 11 C2 7 4 3 7 0Z" fill="#FF8FAB" />
      </svg>
      <svg
        viewBox="0 0 14 18" fill="none"
        className="absolute opacity-[0.06]"
        style={{ width: 24, top: "60%", left: "12%", transform: "rotate(20deg)" }}
      >
        <path d="M7 0 C10 3 12 7 11 11 C10 14 8.5 16.5 7 18 C5.5 16.5 4 14 3 11 C2 7 4 3 7 0Z" fill="#FF8FAB" />
      </svg>
    </div>
  );
}

export default function HeroSection() {
  const [imgError, setImgError] = useState(false);

  return (
    <section
      className="relative min-h-[100dvh] flex items-center overflow-hidden bg-bg"
      aria-label="Hero"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-center pt-24 pb-16">

        {/* ── Left: Copy ─────────────────────────────────────── */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative z-10"
        >
          {/* Eyebrow */}
          <motion.div variants={item} className="flex items-center gap-3 mb-8">
            <div className="w-8 h-px bg-accent" aria-hidden="true" />
            <span className="font-body font-medium text-accent tracking-[0.3em] text-xs uppercase">
              Introducing
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={item}
            className="font-heading font-black text-ink leading-[1] tracking-[-0.02em] mb-6"
            style={{ fontSize: "clamp(3rem, 6vw, 6rem)" }}
          >
            KOVA
            <br />
            <span className="text-accent">MK-1</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={item}
            className="font-body font-light text-ink-2 text-lg leading-relaxed mb-8 max-w-md"
          >
            Precision meets poetry. A keyboard inspired by the quiet beauty of
            Japanese craft — for those who demand both feel and form.
          </motion.p>

          {/* Price + CTAs */}
          <motion.div variants={item} className="flex flex-wrap items-center gap-4 mb-10">
            <span
              className="font-heading font-black text-3xl text-accent"
              aria-label="Starting at $189"
            >
              $189
            </span>
            <a
              href="#preorder"
              className="inline-flex items-center gap-2 bg-accent text-white font-body font-medium text-sm px-7 py-3.5 rounded-full hover:bg-accent-hov transition-all duration-200 hover:scale-[1.03] hover:shadow-[0_6px_28px_rgba(255,143,171,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              Pre-order Now
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="#specs"
              className="inline-flex items-center gap-2 border border-border text-ink-2 font-body font-medium text-sm px-7 py-3.5 rounded-full hover:border-accent/40 hover:text-ink transition-all duration-200"
            >
              View Specs
            </a>
          </motion.div>

          {/* Social proof strip */}
          <motion.div
            variants={item}
            className="flex items-center gap-6 pt-7 border-t border-border"
          >
            <div>
              <div className="font-heading font-black text-2xl text-ink leading-none">67</div>
              <div className="font-body text-xs text-muted mt-1 tracking-wide">Keys</div>
            </div>
            <div className="w-px h-9 bg-border" aria-hidden="true" />
            <div>
              <div className="font-heading font-black text-2xl text-ink leading-none">
                1.8<span className="text-lg">kg</span>
              </div>
              <div className="font-body text-xs text-muted mt-1 tracking-wide">Solid build</div>
            </div>
            <div className="w-px h-9 bg-border" aria-hidden="true" />
            <div>
              <div className="font-heading font-black text-2xl text-ink leading-none">6°</div>
              <div className="font-body text-xs text-muted mt-1 tracking-wide">Typing angle</div>
            </div>
          </motion.div>
        </motion.div>

        {/* ── Right: keyboard frame or blossom decor ─────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.35, ease: "easeOut" as const }}
          className="relative h-[380px] md:h-[520px]"
        >
          {/* Cherry blossom — always present, sits behind the frame image */}
          <CherryBlossomDecor />

          {/* Frame image — covers blossom once loaded */}
          {!imgError && (
            <Image
              src="/frames/frame_0001.webp"
              alt="KOVA MK-1 Mechanical Keyboard — assembled view"
              fill
              className="object-contain drop-shadow-[0_24px_48px_rgba(255,143,171,0.16)]"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              onError={() => setImgError(true)}
            />
          )}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        aria-hidden="true"
      >
        <span className="font-body text-[10px] text-muted tracking-[0.3em] uppercase">
          Scroll to explore
        </span>
        <div className="w-px h-8 bg-border relative overflow-hidden">
          <motion.div
            className="absolute inset-x-0 top-0 h-full bg-accent"
            animate={{ y: ["0%", "100%"] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" as const }}
          />
        </div>
      </motion.div>
    </section>
  );
}

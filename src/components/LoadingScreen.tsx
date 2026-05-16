"use client";

import { motion } from "framer-motion";

interface LoadingScreenProps {
  progress: number; // 0–100
}

export default function LoadingScreen({ progress }: LoadingScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.85, ease: "easeOut" }}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
      style={{ background: "var(--bg)" }}
      role="status"
      aria-label="Loading KOVA keyboard"
    >
      {/* Floating sakura petal */}
      <motion.div
        animate={{ y: [0, -10, 0], rotate: [0, 6, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        className="mb-8"
        aria-hidden="true"
      >
        <svg width="32" height="44" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M7 0 C10 3 12 7 11 11 C10 14 8.5 16.5 7 18 C5.5 16.5 4 14 3 11 C2 7 4 3 7 0Z"
            fill="#FF8FAB"
            opacity="0.55"
          />
        </svg>
      </motion.div>

      {/* Brand logotype */}
      <h1
        className="font-heading font-black tracking-[0.08em] text-ink mb-1"
        style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)" }}
      >
        KOVA<span className="text-accent">.</span>
      </h1>
      <p className="font-body text-[10px] text-muted tracking-[0.32em] uppercase mb-12">
        MK-1 Mechanical Keyboard
      </p>

      {/* Progress track */}
      <div
        className="w-48 md:w-64 rounded-full overflow-hidden"
        style={{ height: "1px", background: "var(--border)" }}
        aria-hidden="true"
      >
        <div
          className="h-full rounded-full"
          style={{
            width: `${progress}%`,
            background: "var(--accent)",
            transition: "width 0.2s linear",
          }}
        />
      </div>

      <p className="font-body text-[10px] text-muted tracking-[0.22em] mt-4 tabular-nums">
        {Math.round(progress)}%
      </p>
    </motion.div>
  );
}

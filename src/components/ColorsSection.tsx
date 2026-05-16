"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const COLORWAYS = [
  { name: "Sakura",   hex: "#FF8FAB", textColor: "#FFFFFF", desc: "Warm blush, cherry blossom." },
  { name: "Snow",     hex: "#F5F0F2", textColor: "#2A1F24", desc: "Clean ivory, alpine silence." },
  { name: "Koi",     hex: "#D4A574", textColor: "#FFFFFF", desc: "Warm gold, koi pond at dusk." },
  { name: "Midnight", hex: "#1A1020", textColor: "#FFFFFF", desc: "Deep indigo, moonless night." },
  { name: "Matcha",   hex: "#8FBF7F", textColor: "#FFFFFF", desc: "Muted sage, ceremonial calm." },
];

export default function ColorsSection() {
  const [active, setActive] = useState(0);
  const curr = COLORWAYS[active];

  return (
    <section id="colors" className="py-24 md:py-36 bg-surface">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mb-16 md:mb-20 text-center"
        >
          <span className="font-body font-medium text-xs text-muted tracking-[0.28em] uppercase block mb-4">
            Colorways
          </span>
          <h2
            className="font-heading font-black text-ink tracking-tight leading-tight"
            style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)" }}
          >
            Choose your character
          </h2>
        </motion.div>

        {/* Active color preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-md mb-12 rounded-3xl overflow-hidden"
          style={{
            background: curr.hex,
            padding: "clamp(32px, 5vw, 56px)",
            boxShadow: `0 24px 64px ${curr.hex}44`,
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p
                className="font-heading font-black text-3xl mb-1 tracking-tight"
                style={{ color: curr.textColor }}
              >
                {curr.name}
              </p>
              <p
                className="font-body text-sm leading-relaxed opacity-80"
                style={{ color: curr.textColor }}
              >
                {curr.desc}
              </p>
            </div>
            <div
              className="w-14 h-14 rounded-full border-2 border-white/30 flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.2)" }}
              aria-hidden="true"
            >
              <div
                className="w-6 h-6 rounded-full border-2 border-white/50"
                style={{ background: curr.hex }}
              />
            </div>
          </div>

          {/* Keyboard silhouette */}
          <div
            className="mt-6 rounded-xl h-20 opacity-20"
            style={{ background: curr.textColor === "#FFFFFF" ? "#FFFFFF" : "#2A1F24" }}
            aria-hidden="true"
          />
        </motion.div>

        {/* Swatches */}
        <div className="flex items-center justify-center gap-4 md:gap-6 flex-wrap">
          {COLORWAYS.map((c, i) => (
            <motion.button
              key={c.name}
              onClick={() => setActive(i)}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.96 }}
              className="flex flex-col items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-full"
              aria-label={`Select ${c.name} colorway`}
              aria-pressed={active === i}
            >
              <div
                className="rounded-full transition-all duration-300"
                style={{
                  width: 64,
                  height: 64,
                  background: c.hex,
                  border: active === i
                    ? "3px solid #FF8FAB"
                    : "3px solid transparent",
                  boxShadow:
                    active === i
                      ? `0 0 0 3px #FDF8F5, 0 0 0 6px #FF8FAB`
                      : `0 4px 20px ${c.hex}40`,
                }}
              />
              <span
                className={`font-body text-xs tracking-wide transition-colors duration-200 ${
                  active === i ? "text-accent font-medium" : "text-muted"
                }`}
              >
                {c.name}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center font-body text-xs text-muted mt-10 tracking-wide"
        >
          All colorways ship with matching PBT keycaps. Colors are representative — monitor calibration may vary.
        </motion.p>
      </div>
    </section>
  );
}

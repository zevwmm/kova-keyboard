"use client";

import { motion } from "framer-motion";

const FEATURES = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title:   "Hot-swap Sockets",
    body:    "Swap switches without soldering. Try linears today, tactiles tomorrow. No tools needed — just pull and push.",
    badge:   "Kailh v2 Socket",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
    title:   "Per-key RGB",
    body:    "South-facing LEDs for even legend illumination. Full VIA browser customization — no software installs.",
    badge:   "16.7M Colors",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
    title:   "Gasket Mounted",
    body:    "Silicone gaskets absorb vibration. The typing sound: deep, muted, satisfying. Every keystroke, cushioned.",
    badge:   "Soft thock",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    title:   "QMK / VIA",
    body:    "Full programmability. Remap any key, build custom layers, create complex macros. Open-source firmware.",
    badge:   "Open source",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 md:py-36 bg-bg">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <span className="font-body font-medium text-xs text-muted tracking-[0.28em] uppercase block mb-4">
              Features
            </span>
            <h2
              className="font-heading font-black text-ink tracking-tight leading-tight"
              style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)" }}
            >
              Built for those
              <br />
              who notice the details
            </h2>
          </div>
          <p className="font-body text-sm text-ink-2 max-w-xs md:max-w-sm leading-relaxed">
            Every choice — from the gasket silicone to the USB-C placement — is deliberate.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {FEATURES.map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, delay: i * 0.1, ease: "easeOut" as const }}
              className="group bg-surface border border-border rounded-2xl p-7 md:p-8 flex flex-col gap-5 hover:-translate-y-1.5 hover:border-accent/30 hover:shadow-[0_16px_48px_rgba(255,143,171,0.1)] transition-all duration-400"
              style={{ borderTopWidth: "3px", borderTopColor: "transparent" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderTopColor = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderTopColor = "transparent";
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent-soft flex items-center justify-center text-accent flex-shrink-0 group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                  {feat.icon}
                </div>
                <span className="font-body text-[10px] font-medium text-muted tracking-[0.2em] uppercase border border-border rounded-full px-3 py-1">
                  {feat.badge}
                </span>
              </div>

              <div>
                <h3 className="font-heading font-black text-ink text-xl mb-2 tracking-tight">
                  {feat.title}
                </h3>
                <p className="font-body text-sm text-ink-2 leading-relaxed">
                  {feat.body}
                </p>
              </div>

              {/* Arrow */}
              <div className="mt-auto">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-border group-hover:text-accent group-hover:translate-x-1 transition-all duration-200"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

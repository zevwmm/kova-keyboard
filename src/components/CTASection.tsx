"use client";

import { motion } from "framer-motion";

// Minimal koi fish SVG — traditional brush-painting reduced to essential lines
function KoiFish({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Body */}
      <path
        d="M20 70 C40 30 100 20 160 50 C190 65 200 80 190 95 C175 115 140 120 110 115 C70 108 30 100 20 70Z"
        stroke="#D4A574"
        strokeWidth="1.8"
        fill="none"
        opacity="0.7"
      />
      {/* Tail fin */}
      <path
        d="M190 72 C210 50 218 40 210 30 M190 72 C210 90 218 100 210 112"
        stroke="#D4A574"
        strokeWidth="1.5"
        fill="none"
        opacity="0.6"
        strokeLinecap="round"
      />
      {/* Dorsal fin */}
      <path
        d="M100 40 C110 20 130 15 140 28"
        stroke="#D4A574"
        strokeWidth="1.4"
        fill="none"
        opacity="0.55"
        strokeLinecap="round"
      />
      {/* Pectoral fin */}
      <path
        d="M80 90 C75 110 90 120 100 115"
        stroke="#D4A574"
        strokeWidth="1.3"
        fill="none"
        opacity="0.5"
        strokeLinecap="round"
      />
      {/* Eye */}
      <circle cx="38" cy="65" r="4" stroke="#D4A574" strokeWidth="1.4" opacity="0.7" />
      <circle cx="38" cy="65" r="1.5" fill="#D4A574" opacity="0.6" />
      {/* Scale lines — subtle */}
      <path
        d="M80 55 C85 50 95 52 98 60 M110 50 C115 44 128 46 130 54 M60 65 C66 58 78 60 80 68"
        stroke="#D4A574"
        strokeWidth="0.9"
        fill="none"
        opacity="0.3"
        strokeLinecap="round"
      />
      {/* Whiskers */}
      <path
        d="M24 63 C14 55 8 50 4 44 M24 67 C12 72 6 78 2 86"
        stroke="#D4A574"
        strokeWidth="1"
        fill="none"
        opacity="0.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function CTASection() {
  return (
    <section
      id="preorder"
      className="py-28 md:py-44 relative overflow-hidden"
      aria-label="Pre-order call to action"
      style={{
        background:
          "linear-gradient(160deg, #FDF8F5 0%, #FFE4EC 60%, #FDF0F5 100%)",
      }}
    >
      {/* Radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse, rgba(255,143,171,0.15) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Koi — bottom-right, decorative */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" as const }}
        className="absolute bottom-10 right-6 md:right-16 pointer-events-none"
        aria-hidden="true"
      >
        <KoiFish className="w-48 md:w-[220px] opacity-60" />
      </motion.div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 md:px-12 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: "easeOut" as const }}
        >
          <span className="font-body font-medium text-xs text-accent tracking-[0.3em] uppercase block mb-6">
            Available now
          </span>

          <h2
            className="font-heading font-black text-ink tracking-tight leading-tight mb-6"
            style={{ fontSize: "clamp(2.4rem, 6vw, 5rem)" }}
          >
            Ready to type on
            <br />
            something{" "}
            <em className="not-italic relative inline-block">
              <span
                className="absolute inset-x-0 bottom-1 h-3 rounded-sm pointer-events-none"
                style={{ background: "rgba(255,143,171,0.25)" }}
                aria-hidden="true"
              />
              <span className="relative text-accent">beautiful?</span>
            </em>
          </h2>

          <p className="font-body text-base text-ink-2 leading-relaxed mb-10 max-w-lg mx-auto">
            Pre-orders ship within 4 weeks. Free worldwide shipping.
            One-year warranty. 30-day satisfaction guarantee.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-accent text-white font-body font-medium text-base px-9 py-4 rounded-full hover:bg-accent-hov transition-all duration-200 hover:scale-[1.04] hover:shadow-[0_8px_32px_rgba(255,143,171,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              Pre-order — $189
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="#specs"
              className="inline-flex items-center gap-2 border border-border text-ink-2 font-body font-medium text-sm px-7 py-4 rounded-full hover:border-accent/40 hover:text-ink transition-all duration-200"
            >
              View full specs
            </a>
          </div>

          {/* Trust signals */}
          <div className="flex items-center justify-center gap-6 mt-10 flex-wrap">
            {[
              "Free worldwide shipping",
              "1-year warranty",
              "30-day returns",
            ].map((text) => (
              <div key={text} className="flex items-center gap-2 text-xs text-ink-2 font-body">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-accent flex-shrink-0"
                  aria-hidden="true"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                {text}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

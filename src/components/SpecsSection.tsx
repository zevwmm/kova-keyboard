"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SPECS = [
  { value: 67,    unit: "",    label: "Keys",             sub: "Compact 65% layout" },
  { value: 1.8,   unit: "kg",  label: "Build Weight",     sub: "Solid aluminum body" },
  { value: 6,     unit: "°",   label: "Typing Angle",     sub: "Ergonomic incline" },
  { value: 1,     unit: "",    label: "USB-C Port",       sub: "Reversible connector" },
  { value: 45,    unit: "g",   label: "Actuation",        sub: "Linear switch force" },
  { value: 1000,  unit: "Hz",  label: "Poll Rate",        sub: "Wired / USB-C" },
];

function SpecCard({ spec, index }: { spec: typeof SPECS[0]; index: number }) {
  const ref      = useRef<HTMLDivElement>(null);
  const numRef   = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!isInView || !numRef.current) return;
    const target = spec.value;
    const isFloat = !Number.isInteger(target);
    const obj = { val: 0 };

    gsap.to(obj, {
      val: target,
      duration: 1.6,
      delay: index * 0.08,
      ease: "power2.out",
      onUpdate() {
        if (numRef.current) {
          numRef.current.textContent = isFloat
            ? obj.val.toFixed(1)
            : String(Math.round(obj.val));
        }
      },
    });
  }, [isInView, spec.value, index]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.08, ease: "easeOut" as const }}
      className="bg-surface border border-border rounded-2xl p-6 md:p-8 flex flex-col gap-2 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(255,143,171,0.12)] transition-all duration-400 group"
    >
      <div className="flex items-end gap-1 leading-none">
        <span
          ref={numRef}
          className="font-heading font-black text-accent leading-none"
          style={{ fontSize: "clamp(2.4rem, 4vw, 3.5rem)" }}
          aria-label={`${spec.value}${spec.unit}`}
        >
          0
        </span>
        {spec.unit && (
          <span className="font-heading font-black text-accent text-xl mb-1">
            {spec.unit}
          </span>
        )}
      </div>
      <div className="font-heading font-black text-ink text-base tracking-tight">
        {spec.label}
      </div>
      <div className="font-body text-xs text-muted leading-relaxed">
        {spec.sub}
      </div>
      <div className="mt-auto pt-4 border-t border-border w-8 h-px bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
    </motion.div>
  );
}

export default function SpecsSection() {
  return (
    <section id="specs" className="py-24 md:py-36 bg-surface">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mb-16 md:mb-20"
        >
          <span className="font-body font-medium text-xs text-muted tracking-[0.28em] uppercase block mb-4">
            Specifications
          </span>
          <h2
            className="font-heading font-black text-ink tracking-tight leading-tight"
            style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)" }}
          >
            The numbers behind
            <br />
            <span className="text-accent">the feel</span>
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {SPECS.map((spec, i) => (
            <SpecCard key={spec.label} spec={spec} index={i} />
          ))}
        </div>

        {/* Bottom callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 p-6 rounded-2xl border border-accent/20 bg-accent-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
        >
          <div>
            <p className="font-heading font-black text-ink text-lg tracking-tight">
              QMK &amp; VIA compatible
            </p>
            <p className="font-body text-sm text-ink-2 mt-1">
              Full programmability. Remap every key, build layers, run macros — all from a browser.
            </p>
          </div>
          <a
            href="#preorder"
            className="flex-shrink-0 inline-flex items-center gap-2 bg-accent text-white font-body font-medium text-sm px-6 py-3 rounded-full hover:bg-accent-hov transition-colors"
          >
            Pre-order
          </a>
        </motion.div>
      </div>
    </section>
  );
}

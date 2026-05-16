"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Specs",     href: "#specs" },
  { label: "Features",  href: "#features" },
  { label: "Colors",    href: "#colors" },
  { label: "Pre-order", href: "#preorder" },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const close = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#FDF8F5]/90 backdrop-blur-xl border-b border-[#F0E4E8] shadow-[0_1px_20px_rgba(42,31,36,0.04)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 md:h-20 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="font-heading font-black text-2xl tracking-[0.08em] text-ink hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
            onClick={close}
          >
            KOVA<span className="text-accent">.</span>
          </a>

          {/* Desktop nav */}
          <nav
            className="hidden md:flex items-center gap-8"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-body font-medium text-sm text-ink-2 hover:text-ink transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <a
              href="#preorder"
              className="inline-flex items-center gap-2 bg-accent text-white font-body font-medium text-sm px-5 py-2.5 rounded-full hover:bg-accent-hov transition-all duration-200 hover:scale-[1.03] hover:shadow-[0_4px_20px_rgba(255,143,171,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              Pre-order
            </a>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 relative z-[60] rounded"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span
              className={`w-6 h-px bg-ink block transition-all duration-300 origin-center ${
                menuOpen ? "rotate-45 translate-y-[3.5px]" : ""
              }`}
            />
            <span
              className={`w-6 h-px bg-ink block transition-all duration-300 ${
                menuOpen ? "opacity-0 scale-x-0" : ""
              }`}
            />
            <span
              className={`w-6 h-px bg-ink block transition-all duration-300 origin-center ${
                menuOpen ? "-rotate-45 -translate-y-[3.5px]" : ""
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[#FDF8F5]/97 backdrop-blur-2xl flex flex-col items-center justify-center"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <nav className="flex flex-col items-center gap-7">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={close}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ delay: i * 0.07, duration: 0.35, ease: "easeOut" as const }}
                  className="font-heading font-black text-4xl text-ink hover:text-accent transition-colors duration-200 tracking-tight uppercase"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.3, duration: 0.35 }}
              className="mt-12"
            >
              <a
                href="#preorder"
                onClick={close}
                className="inline-flex items-center gap-2 bg-accent text-white font-body font-medium px-8 py-4 rounded-full text-base hover:bg-accent-hov transition-colors"
              >
                Pre-order — $189
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

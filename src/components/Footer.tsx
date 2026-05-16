import { motion } from "framer-motion";

// Tiny sakura petal for decorative use
function PetalMini() {
  return (
    <svg
      width="12"
      height="15"
      viewBox="0 0 14 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="opacity-40"
    >
      <path
        d="M7 0 C10 3 12 7 11 11 C10 14 8.5 16.5 7 18 C5.5 16.5 4 14 3 11 C2 7 4 3 7 0Z"
        fill="#FF8FAB"
      />
    </svg>
  );
}

const FOOTER_LINKS = [
  { label: "Specs",     href: "#specs" },
  { label: "Features",  href: "#features" },
  { label: "Colors",    href: "#colors" },
  { label: "Pre-order", href: "#preorder" },
];

const SOCIAL_LINKS = [
  { label: "Instagram", href: "#" },
  { label: "Discord",   href: "#" },
  { label: "Support",   href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-dark border-t border-border-dark">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-10">
          {/* Logo + tagline */}
          <div>
            <a
              href="#"
              className="font-heading font-black text-2xl tracking-[0.08em] text-white hover:opacity-80 transition-opacity"
            >
              KOVA<span className="text-accent">.</span>
            </a>
            <p className="font-body text-sm text-[#A89BA0] mt-2 max-w-xs leading-relaxed">
              Designed with intention. Built to last. Every keystroke, deliberate.
            </p>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap gap-x-7 gap-y-3" aria-label="Footer navigation">
            {FOOTER_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-body text-sm text-[#6B5A62] hover:text-white transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Socials */}
          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="font-body text-sm text-[#6B5A62] hover:text-accent transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border-dark" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-8">
          <div className="flex items-center gap-2">
            <PetalMini />
            <p className="font-body text-xs text-[#6B5A62]">
              &copy; 2026 KOVA Keyboards. Designed with intention.
            </p>
          </div>
          <p className="font-body text-xs text-[#6B5A62]">
            Japan-inspired · Precision-built · Worldwide
          </p>
        </div>
      </div>
    </footer>
  );
}

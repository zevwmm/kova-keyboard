"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

import Navbar         from "./Navbar";
import HeroSection    from "./HeroSection";
import SpecsSection   from "./SpecsSection";
import FeaturesSection from "./FeaturesSection";
import ColorsSection  from "./ColorsSection";
import CTASection     from "./CTASection";
import Footer         from "./Footer";
import LoadingScreen  from "./LoadingScreen";
import FrameAnimSection from "./FrameAnimSection";

// SakuraPetals accesses DOM during render — import with ssr:false
const SakuraPetals = dynamic(() => import("./SakuraPetals"), { ssr: false });

const TOTAL_FRAMES = 192;

function padIndex(n: number): string {
  return String(n).padStart(4, "0");
}

export default function PageWrapper() {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const framesRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    let settled = 0;

    function onSettle() {
      settled++;
      setProgress(Math.round((settled / TOTAL_FRAMES) * 100));
      if (settled === TOTAL_FRAMES) {
        framesRef.current = images;
        setIsLoaded(true);
      }
    }

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `/frames/frame_${padIndex(i + 1)}.webp`;
      img.onload = onSettle;
      img.onerror = onSettle; // count errors so we never hang
      images[i] = img;
    }
  }, []);

  return (
    <>
      {/* Loading screen — exits once all frames are ready */}
      <AnimatePresence>
        {!isLoaded && <LoadingScreen key="loading" progress={progress} />}
      </AnimatePresence>

      {/* Full page — rendered only after frames are preloaded */}
      {isLoaded && (
        <>
          <SakuraPetals />
          <Navbar />
          <main>
            <HeroSection />
            <FrameAnimSection frames={framesRef.current} />
            <SpecsSection />
            <FeaturesSection />
            <ColorsSection />
            <CTASection />
          </main>
          <Footer />
        </>
      )}
    </>
  );
}

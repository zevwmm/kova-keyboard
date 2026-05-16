"use client";

import dynamic from "next/dynamic";

export const SakuraPetalsClient = dynamic(
  () => import("./SakuraPetals"),
  { ssr: false }
);

export const ExplodeSectionClient = dynamic(
  () => import("./ExplodeSection"),
  { ssr: false }
);

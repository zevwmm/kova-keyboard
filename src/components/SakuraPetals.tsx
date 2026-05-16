"use client";

// 14 petals spread across the viewport with varied timing
// so there's always 3-5 visible at any moment
const PETALS = [
  { left: "4%",  top: "-5%",  delay: "0s",    duration: "20s", size: 11 },
  { left: "11%", top: "-8%",  delay: "7s",    duration: "17s", size: 9  },
  { left: "18%", top: "-3%",  delay: "2.5s",  duration: "24s", size: 14 },
  { left: "27%", top: "-6%",  delay: "13s",   duration: "18s", size: 10 },
  { left: "34%", top: "-4%",  delay: "5s",    duration: "22s", size: 13 },
  { left: "43%", top: "-7%",  delay: "9.5s",  duration: "19s", size: 16 },
  { left: "51%", top: "-2%",  delay: "1s",    duration: "26s", size: 10 },
  { left: "59%", top: "-5%",  delay: "15s",   duration: "21s", size: 12 },
  { left: "66%", top: "-8%",  delay: "6s",    duration: "23s", size: 9  },
  { left: "73%", top: "-3%",  delay: "11s",   duration: "18s", size: 15 },
  { left: "80%", top: "-6%",  delay: "3.5s",  duration: "20s", size: 11 },
  { left: "87%", top: "-4%",  delay: "18s",   duration: "22s", size: 13 },
  { left: "93%", top: "-7%",  delay: "8s",    duration: "17s", size: 10 },
  { left: "98%", top: "-2%",  delay: "4.5s",  duration: "25s", size: 12 },
];

function PetalSVG({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={Math.round(size * 1.3)}
      viewBox="0 0 14 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Petal body */}
      <path
        d="M7 0 C10 3 12 7 11 11 C10 14 8.5 16.5 7 18 C5.5 16.5 4 14 3 11 C2 7 4 3 7 0Z"
        fill="#FF8FAB"
        opacity="0.90"
      />
      {/* Central vein */}
      <path
        d="M7 0 C7 6 7 12 7 18"
        stroke="#FFFFFF"
        strokeWidth="0.7"
        opacity="0.45"
      />
    </svg>
  );
}

export default function SakuraPetals() {
  return (
    <>
      {PETALS.map((p, i) => (
        <div
          key={i}
          className="sakura-petal"
          style={{
            left:            p.left,
            top:             p.top,
            animationDelay:    p.delay,
            animationDuration: p.duration,
          }}
          aria-hidden="true"
        >
          <PetalSVG size={p.size} />
        </div>
      ))}
    </>
  );
}

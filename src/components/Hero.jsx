import React, { useMemo } from 'react';
import Spline from '@splinetool/react-spline';
import { Rocket, Sparkles } from 'lucide-react';

export default function Hero() {
  // Precompute the 24 spokes for the Ashoka Chakra emblem
  const spokes = useMemo(() => Array.from({ length: 24 }, (_, i) => i * 15), []);

  return (
    <section className="relative min-h-[70vh] w-full overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* 3D Spline Scene */}
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Indian Emblem (Ashoka Chakra) behind the title */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <svg
          width="520"
          height="520"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="opacity-20 drop-shadow-[0_0_30px_rgba(99,102,241,0.25)]"
        >
          {/* Outer ring */}
          <circle cx="100" cy="100" r="80" stroke="#1e3a8a" strokeWidth="4" />
          {/* Inner hub */}
          <circle cx="100" cy="100" r="6" fill="#1e3a8a" />
          {/* Spokes */}
          {spokes.map((deg) => (
            <line
              key={deg}
              x1="100"
              y1="100"
              x2={100 + 70 * Math.cos((Math.PI / 180) * deg)}
              y2={100 + 70 * Math.sin((Math.PI / 180) * deg)}
              stroke="#1e3a8a"
              strokeWidth="2"
            />
          ))}
        </svg>
      </div>

      {/* Soft gradient overlay for readability (doesn't block Spline interactions) */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/30 to-slate-950/90" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 py-24 text-center sm:py-28 lg:py-32">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur">
          <Sparkles size={14} /> AI-driven internship allocation
        </span>
        <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
          Inter-India
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-white/80 sm:text-lg">
          Match students with meaningful internships under the PM Internship Scheme using a smart, fair, and transparent AI allocation engine.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#dashboards"
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white shadow hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <Rocket size={18} /> Explore Dashboards
          </a>
          <a
            href="#features"
            className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}

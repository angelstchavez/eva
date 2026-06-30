/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect, memo } from "react";

type Star = {
  id: number;
  top: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
};

type Shooting = { id: number; top: number; left: number; delay: number };

function generateStars(count: number): Star[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: Math.random() * 2 + 1,
    delay: Math.random() * 6,
    duration: Math.random() * 3 + 2,
  }));
}

function generateShooting(count: number): Shooting[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    top: Math.random() * 60 + 5,
    left: Math.random() * 70 + 5,
    delay: Math.random() * 14 + 4,
  }));
}

function StarfieldImpl() {
  const [mounted, setMounted] = useState(false);

  // Generamos una sola vez, no en cada render. useState lazy initializer
  // evita el cálculo en renders posteriores sin necesitar useEffect+setState.
  const [stars] = useState<Star[]>(() => generateStars(70));
  const [shooting] = useState<Shooting[]>(() => generateShooting(5));

  // Solo para evitar mismatch de hydration (server no tiene Math.random consistente).
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden contain-strict"
    >
      {/* Keyframes CSS puros: animación corre en compositor thread, no en JS */}
      <style>{`
        @keyframes sf-twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
        }
        @keyframes sf-shoot {
          0% { transform: translateX(-60px); opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { transform: translateX(160px); opacity: 0; }
        }
        .sf-star {
          animation: sf-twinkle var(--dur) ease-in-out var(--delay) infinite;
          will-change: opacity, transform;
        }
        .sf-shoot {
          animation: sf-shoot 1.6s ease-out var(--delay) infinite;
          animation-delay: var(--delay);
          will-change: transform, opacity;
        }
      `}</style>

      {/* Degradado base */}
      <div className="absolute inset-0 bg-linear-to-b from-night-deep via-night to-night-soft" />

      {/* Nebulosas suaves */}
      <div className="absolute left-1/4 top-1/4 h-80 w-80 -translate-x-1/2 rounded-full bg-gold/10 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/5 h-96 w-96 rounded-full bg-blue/25 blur-3xl" />
      <div className="absolute left-1/2 top-2/3 h-72 w-72 -translate-x-1/2 rounded-full bg-gold/5 blur-3xl" />

      {/* Estrellas titilantes */}
      {stars.map((s) => (
        <span
          key={`star-${s.id}`}
          className="sf-star absolute rounded-full bg-gold-soft"
          style={
            {
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: s.size * 2,
              height: s.size * 2,
              "--dur": `${s.duration}s`,
              "--delay": `${s.delay}s`,
            } as React.CSSProperties
          }
        />
      ))}

      {/* Estrellas fugaces */}
      {shooting.map((s) => (
        <span
          key={`shoot-${s.id}`}
          className="sf-shoot absolute h-px w-24 rounded-full bg-linear-to-r from-transparent via-gold-soft to-transparent"
          style={
            {
              top: `${s.top}%`,
              left: `${s.left}%`,
              "--delay": `${s.delay}s`,
              animationDuration: "1.6s",
              animationIterationCount: "infinite",
              animationTimingFunction: "ease-out",
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

export const Starfield = memo(StarfieldImpl);

/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { memo, useEffect, useMemo, useState } from "react";

type Star = {
  id: number;
  top: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
};

type Shooting = {
  id: number;
  top: number;
  left: number;
  delay: number;
};

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
  const [isMobile, setIsMobile] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mobileMedia = window.matchMedia("(max-width: 768px)");
    const motionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => {
      setIsMobile(mobileMedia.matches);
      setReduceMotion(motionMedia.matches);
    };

    update();

    mobileMedia.addEventListener("change", update);
    motionMedia.addEventListener("change", update);

    setMounted(true);

    return () => {
      mobileMedia.removeEventListener("change", update);
      motionMedia.removeEventListener("change", update);
    };
  }, []);

  const stars = useMemo(() => generateStars(isMobile ? 28 : 70), [isMobile]);

  const shooting = useMemo(
    () => (isMobile ? [] : generateShooting(5)),
    [isMobile],
  );

  if (!mounted) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden contain-strict"
    >
      <style>{`
        @keyframes sf-twinkle {
          0%,100% {
            opacity:.25;
            transform:scale(1);
          }
          50% {
            opacity:1;
            transform:scale(1.25);
          }
        }

        @keyframes sf-shoot {
          0% {
            transform:translateX(-60px);
            opacity:0;
          }

          15% {
            opacity:1;
          }

          85% {
            opacity:1;
          }

          100% {
            transform:translateX(180px);
            opacity:0;
          }
        }

        .sf-star{
          animation:sf-twinkle var(--dur) ease-in-out var(--delay) infinite;
        }

        .sf-shoot{
          animation:sf-shoot 1.6s ease-out var(--delay) infinite;
          will-change:transform,opacity;
        }

        @media (prefers-reduced-motion: reduce){
          .sf-star,
          .sf-shoot{
            animation:none!important;
          }
        }
      `}</style>

      {/* Fondo */}
      <div className="absolute inset-0 bg-linear-to-b from-night-deep via-night to-night-soft" />

      {/* Nebulosas (solo escritorio) */}
      {!isMobile && (
        <>
          <div className="absolute left-1/4 top-1/4 h-80 w-80 -translate-x-1/2 rounded-full bg-gold/10 blur-3xl" />

          <div className="absolute bottom-1/4 right-1/5 h-96 w-96 rounded-full bg-blue/25 blur-3xl" />

          <div className="absolute left-1/2 top-2/3 h-72 w-72 -translate-x-1/2 rounded-full bg-gold/5 blur-3xl" />
        </>
      )}

      {/* Estrellas */}
      {stars.map((star) => (
        <span
          key={star.id}
          className="sf-star absolute rounded-full bg-gold-soft"
          style={
            {
              top: `${star.top}%`,
              left: `${star.left}%`,
              width: star.size * 2,
              height: star.size * 2,
              "--dur": `${reduceMotion ? 0 : isMobile ? star.duration + 2 : star.duration}s`,
              "--delay": `${star.delay}s`,
            } as React.CSSProperties
          }
        />
      ))}

      {/* Fugaces (solo escritorio) */}
      {!reduceMotion &&
        shooting.map((shoot) => (
          <span
            key={shoot.id}
            className="sf-shoot absolute h-px w-24 rounded-full bg-linear-to-r from-transparent via-gold-soft to-transparent"
            style={
              {
                top: `${shoot.top}%`,
                left: `${shoot.left}%`,
                "--delay": `${shoot.delay}s`,
              } as React.CSSProperties
            }
          />
        ))}
    </div>
  );
}

export const Starfield = memo(StarfieldImpl);

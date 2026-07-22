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

  // REDUCIDO: menos estrellas en móvil
  const stars = useMemo(() => generateStars(isMobile ? 12 : 50), [isMobile]);

  // REDUCIDO: sin estrellas fugaces en móvil
  const shooting = useMemo(
    () => (isMobile ? [] : generateShooting(3)),
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
            opacity:.2;
            transform:scale(1);
          }
          50% {
            opacity:.8;
            transform:scale(1.2);
          }
        }

        @keyframes sf-shoot {
          0% {
            transform:translateX(-40px);
            opacity:0;
          }
          15% {
            opacity:1;
          }
          85% {
            opacity:1;
          }
          100% {
            transform:translateX(120px);
            opacity:0;
          }
        }

        .sf-star{
          animation:sf-twinkle var(--dur) ease-in-out var(--delay) infinite;
        }

        .sf-shoot{
          animation:sf-shoot 1.4s ease-out var(--delay) infinite;
          will-change:transform,opacity;
        }

        @media (prefers-reduced-motion: reduce){
          .sf-star,
          .sf-shoot{
            animation:none!important;
          }
        }

        /* Móvil: estrellas más pequeñas y con menos intensidad */
        @media (max-width: 768px) {
          .sf-star {
            opacity: 0.4 !important;
          }
        }
      `}</style>

      {/* Fondo - degradado simplificado en móvil */}
      <div
        className={cn(
          "absolute inset-0",
          isMobile
            ? "bg-night"
            : "bg-linear-to-b from-night-deep via-night to-night-soft",
        )}
      />

      {/* Nebulosas (solo escritorio) */}
      {!isMobile && (
        <>
          <div className="absolute left-1/4 top-1/4 h-72 w-72 -translate-x-1/2 rounded-full bg-gold/8 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/5 h-80 w-80 rounded-full bg-blue/20 blur-3xl" />
          <div className="absolute left-1/2 top-2/3 h-64 w-64 -translate-x-1/2 rounded-full bg-gold/4 blur-3xl" />
        </>
      )}

      {/* Estrellas - solo renderizadas si hay estrellas */}
      {stars.length > 0 && (
        <div className="absolute inset-0">
          {stars.map((star) => (
            <span
              key={star.id}
              className="sf-star absolute rounded-full bg-gold-soft"
              style={
                {
                  top: `${star.top}%`,
                  left: `${star.left}%`,
                  width: isMobile ? star.size : star.size * 2,
                  height: isMobile ? star.size : star.size * 2,
                  "--dur": `${reduceMotion ? 0 : isMobile ? star.duration + 3 : star.duration}s`,
                  "--delay": `${star.delay}s`,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      )}

      {/* Fugaces (solo escritorio y sin reducción de movimiento) */}
      {!isMobile && !reduceMotion && shooting.length > 0 && (
        <div className="absolute inset-0">
          {shooting.map((shoot) => (
            <span
              key={shoot.id}
              className="sf-shoot absolute h-px w-16 rounded-full bg-linear-to-r from-transparent via-gold-soft to-transparent"
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
      )}
    </div>
  );
}

// Función cn para evitar dependencia externa
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export const Starfield = memo(StarfieldImpl);

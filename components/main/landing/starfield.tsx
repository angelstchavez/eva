/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

type Star = {
  id: number;
  top: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
};

type Shooting = { id: number; top: number; left: number; delay: number };

export function Starfield() {
  const [stars, setStars] = useState<Star[]>([]);
  const [shooting, setShooting] = useState<Shooting[]>([]);

  useEffect(() => {
    setStars(
      Array.from({ length: 70 }, (_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 6,
        duration: Math.random() * 3 + 2,
      })),
    );
    setShooting(
      Array.from({ length: 5 }, (_, i) => ({
        id: i,
        top: Math.random() * 60 + 5,
        left: Math.random() * 70 + 5,
        delay: Math.random() * 14 + 4,
      })),
    );
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden"
    >
      {/* Degradado base */}
      <div className="absolute inset-0 bg-linear-to-b from-night-deep via-night to-night-soft" />

      {/* Nebulosas suaves */}
      <div className="absolute left-1/4 top-1/4 h-80 w-80 -translate-x-1/2 rounded-full bg-gold/10 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/5 h-96 w-96 rounded-full bg-blue/25 blur-3xl" />
      <div className="absolute left-1/2 top-2/3 h-72 w-72 -translate-x-1/2 rounded-full bg-gold/5 blur-3xl" />

      {/* Estrellas titilantes */}
      {stars.map((s) => (
        <motion.span
          key={`star-${s.id}`}
          className="absolute rounded-full bg-gold-soft"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size * 2,
            height: s.size * 2,
          }}
          animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.3, 1] }}
          transition={{
            duration: s.duration,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: s.delay,
          }}
        />
      ))}

      {/* Estrellas fugaces */}
      {shooting.map((s) => (
        <motion.span
          key={`shoot-${s.id}`}
          className="absolute h-px w-24 rounded-full bg-linear-to-r from-transparent via-gold-soft to-transparent"
          style={{ top: `${s.top}%`, left: `${s.left}%` }}
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 160, opacity: [0, 1, 0] }}
          transition={{
            duration: 1.6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeOut",
            delay: s.delay,
            repeatDelay: 9,
          }}
        />
      ))}
    </div>
  );
}

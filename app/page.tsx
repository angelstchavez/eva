"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const PLANETAS = [
  {
    emoji: "🪐",
    nombre: "El Aeródromo",
    modulo: "Módulo 1 · Bienvenida",
    color: "bg-[#F4ECD8] text-[#7A5C00]",
  },
  {
    emoji: "🌟",
    nombre: "Asteroide B-612",
    modulo: "Módulo 2 · El Principito",
    color: "bg-[#FBE7C6] text-[#7A4B00]",
  },
  {
    emoji: "📚",
    nombre: "Planeta de los Libros",
    modulo: "Módulo 3 · Conceptos",
    color: "bg-[#E3D7F4] text-[#4B2E73]",
  },
  {
    emoji: "🌷",
    nombre: "Jardín de Palabras",
    modulo: "Módulo 4 · Glosario",
    color: "bg-[#FAD6E0] text-[#7A2B45]",
  },
  {
    emoji: "✨",
    nombre: "Estación de las Estrellas",
    modulo: "Módulo 5 · Retos",
    color: "bg-[#CDE7F0] text-[#1B4B5C]",
  },
  {
    emoji: "🌍",
    nombre: "Mi Propio Planeta",
    modulo: "Módulo 6 · Proyecto",
    color: "bg-[#D6EAD3] text-[#27512A]",
  },
];

const STARS = Array.from({ length: 45 }).map((_, i) => ({
  id: i,
  top: Math.random() * 100,
  left: Math.random() * 100,
  size: Math.random() * 2 + 1,
  delay: Math.random() * 4,
}));

function CieloEstrellado() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {STARS.map((s) => (
        <motion.span
          key={s.id}
          className="absolute rounded-full bg-[#FDE9B8]"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size * 4,
            height: s.size * 4,
          }}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{
            duration: 2.5 + s.delay,
            repeat: Infinity,
            ease: "easeInOut",
            delay: s.delay,
          }}
        />
      ))}
    </div>
  );
}

function AvionViajero() {
  return (
    <motion.div
      className="absolute top-16 text-4xl"
      initial={{ x: "-10vw", y: 0, rotate: -6 }}
      animate={{ x: "110vw", y: [0, -16, 0, 10, 0] }}
      transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
    >
      ✈️
    </motion.div>
  );
}

export default function LandingEva() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#11243F] font-sans text-[#F4ECD8]">
      <div className="absolute inset-0 bg-linear-to-b from-[#0B1830] via-[#16335A] to-[#2E5A8C]" />
      <CieloEstrellado />
      <AvionViajero />

      <header className="relative z-10 flex items-center justify-between px-6 py-5 md:px-12">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🦊</span>
          <span className="font-[Baloo_2] text-lg font-bold tracking-wide">
            EVA <span className="text-[#E8B84B]">·</span> Entre Mundos
          </span>
        </div>
        <Button
          variant="secondary"
          className="rounded-full bg-[#F4ECD8] text-[#16335A] hover:bg-[#E8B84B] hover:text-[#16335A]"
        >
          Ya tengo cuenta
        </Button>
      </header>

      {/* HERO */}
      <section className="relative z-10 flex flex-col items-center px-6 pb-20 pt-10 text-center md:pt-16">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Badge className="mb-6 rounded-full bg-[#E8B84B]/20 px-4 py-1 text-sm font-semibold text-[#FCE2A0] hover:bg-[#E8B84B]/20">
            Para viajeros de 6° y 7° grado
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-[Baloo_2] text-4xl font-extrabold leading-tight text-[#FDF6E3] sm:text-5xl md:text-6xl"
        >
          Un viaje a través de
          <br />
          <span className="text-[#E8B84B]">las palabras y las estrellas</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mx-auto mt-6 max-w-xl font-[Lora] text-lg italic text-[#CFE0F0]/90"
        >
          “Lo esencial es invisible a los ojos.” Así comienza este viaje:
          leyendo con el corazón, junto al principito y su zorro.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <Button
            size="lg"
            className="rounded-full bg-[#E8B84B] px-8 py-6 text-lg font-bold text-[#16335A] shadow-lg shadow-[#E8B84B]/20 hover:bg-[#FCE2A0]"
          >
            Comenzar el viaje ✶
          </Button>
          <Button
            size="lg"
            variant="ghost"
            className="rounded-full px-8 py-6 text-lg font-semibold text-[#FDF6E3] hover:bg-white/10 hover:text-white"
          >
            Conocer el proyecto
          </Button>
        </motion.div>

        <motion.div
          className="relative mt-16 flex h-56 w-56 items-center justify-center"
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="absolute inset-0 rounded-full bg-[#2E5A8C]/40 blur-2xl" />
          <div className="relative flex h-44 w-44 items-center justify-center rounded-full bg-[#3D6B9C] shadow-2xl">
            <span className="text-6xl">🧑‍🚀</span>
          </div>
          <motion.span
            className="absolute -right-2 top-2 text-3xl"
            animate={{ rotate: [0, 8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            🌹
          </motion.span>
          <motion.span
            className="absolute -bottom-1 -left-4 text-3xl"
            animate={{ rotate: [0, -10, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          >
            🦊
          </motion.span>
        </motion.div>
      </section>

      {/* MAPA DE PLANETAS / MÓDULOS */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 pb-24">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="mb-2 text-center font-[Baloo_2] text-3xl font-bold text-[#FDF6E3]"
        >
          Tu mapa de viaje
        </motion.h2>
        <p className="mb-10 text-center text-[#CFE0F0]/80">
          Cada planeta esconde una historia distinta. ¿A cuál viajamos hoy?
        </p>

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3">
          {PLANETAS.map((p, i) => (
            <motion.div
              key={p.nombre}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6, scale: 1.03 }}
            >
              <Card className="overflow-hidden rounded-3xl border-0 bg-white/5 backdrop-blur-sm">
                <CardContent className="flex flex-col items-center gap-3 p-6 text-center">
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-full text-3xl ${p.color}`}
                  >
                    {p.emoji}
                  </div>
                  <p className="font-[Baloo_2] text-base font-bold text-[#FDF6E3]">
                    {p.nombre}
                  </p>
                  <p className="text-xs text-[#CFE0F0]/70">{p.modulo}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto mb-20 max-w-2xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-[#E8B84B]/30 bg-[#16335A]/60 p-8"
        >
          <div className="mb-3 text-4xl">🦊</div>
          <p className="font-[Lora] text-lg italic text-[#FDF6E3]">
            “Hola, viajero de las palabras. Aquí los caminos se dibujan con
            historias, y cada libro es una puerta a un planeta distinto. ¿Estás
            listo para despegar?”
          </p>
          <Button className="mt-6 rounded-full bg-[#E8B84B] px-8 text-[#16335A] hover:bg-[#FCE2A0]">
            Sí, quiero viajar ✶
          </Button>
        </motion.div>
      </section>

      <footer className="relative z-10 border-t border-white/10 px-6 py-6 text-center text-xs text-[#CFE0F0]/60">
        EVA — Entre Mundos · Un ambiente virtual de aprendizaje inspirado en El
        Principito
      </footer>
    </main>
  );
}

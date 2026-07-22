"use client";

import { motion } from "motion/react";

type ComicPanelsProps = {
  panels: { label: string; text: string }[];
  footer?: string;
};

export function ComicPanels({ panels, footer }: ComicPanelsProps) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        {panels.map((panel, i) => (
          <motion.div
            key={panel.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="rounded-2xl border-2 border-gold/25 bg-linear-to-br from-blue-deep/50 to-night/50 p-4"
          >
            <span className="inline-flex rounded-full bg-gold/20 px-3 py-0.5 text-xs font-bold uppercase tracking-wider text-gold">
              {panel.label}
            </span>
            <p className="mt-3 font-serif text-sm leading-relaxed text-cream">
              {panel.text}
            </p>
          </motion.div>
        ))}
      </div>
      {footer && (
        <p className="rounded-xl border border-gold/15 bg-gold/5 px-4 py-3 text-center font-serif text-sm italic text-sky/80">
          {footer}
        </p>
      )}
    </div>
  );
}

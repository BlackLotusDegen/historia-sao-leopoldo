"use client";

import { motion } from "framer-motion";

type DecadeTimelineProps = {
  decades: number[];
  selected: number;
  onSelect: (decade: number) => void;
};

export function DecadeTimeline({
  decades,
  selected,
  onSelect,
}: DecadeTimelineProps) {
  return (
    <div className="space-y-3">
      <p className="text-[11px] uppercase tracking-[0.2em] text-moss-soft">
        Viajar no tempo
      </p>
      <div className="relative flex flex-wrap gap-2">
        {decades.map((decade) => {
          const active = decade === selected;
          return (
            <button
              key={decade}
              type="button"
              onClick={() => onSelect(decade)}
              className={`relative overflow-hidden rounded-sm px-3 py-2 text-sm transition-colors ${
                active
                  ? "bg-brick text-paper"
                  : "bg-mist text-ink/80 hover:bg-moss/15"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="decade-pill"
                  className="absolute inset-0 bg-brick"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative z-10">{decade}s</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

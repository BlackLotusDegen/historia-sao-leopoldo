"use client";

import dynamic from "next/dynamic";

const HistoricMap = dynamic(
  () => import("./HistoricMap").then((mod) => mod.HistoricMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[100dvh] items-center justify-center bg-moss-deep text-paper">
        <p className="font-display text-xl">Preparando São Leopoldo…</p>
      </div>
    ),
  },
);

export function MapShell() {
  return <HistoricMap />;
}

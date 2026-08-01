import type { Metadata } from "next";
import Link from "next/link";
import { MapShell } from "@/components/map/MapShell";

export const metadata: Metadata = {
  title: "Mapa",
  description:
    "Mapa interativo de São Leopoldo: clique nos locais e escolha a década para ver o passado.",
};

export default function MapaPage() {
  return (
    <div className="relative h-[100dvh] min-h-[100vh] w-full overflow-hidden">
      <Link
        href="/"
        className="absolute right-4 top-4 z-30 rounded-sm bg-paper/90 px-3 py-2 text-xs font-medium text-moss-deep shadow-sm backdrop-blur hover:bg-paper sm:right-6"
      >
        Voltar ao início
      </Link>
      <Link
        href="/contribuir"
        className="absolute right-4 top-14 z-30 rounded-sm bg-brick px-3 py-2 text-xs font-medium text-paper shadow-sm hover:bg-brick-deep sm:right-6"
      >
        Contribuir
      </Link>
      <MapShell />
    </div>
  );
}

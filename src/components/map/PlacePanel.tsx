"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { Place, PlacePhoto } from "@/data/types";
import { getDecadesForPlace } from "@/data/places";
import { DecadeTimeline } from "./DecadeTimeline";

type PlacePanelProps = {
  place: Place | null;
  onClose: () => void;
};

export function PlacePanel({ place, onClose }: PlacePanelProps) {
  const decades = useMemo(
    () => (place ? getDecadesForPlace(place) : []),
    [place],
  );
  const [decade, setDecade] = useState<number | null>(null);
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    if (!place) {
      setDecade(null);
      setPhotoIndex(0);
      return;
    }
    setDecade(getDecadesForPlace(place)[0] ?? null);
    setPhotoIndex(0);
  }, [place]);

  useEffect(() => {
    setPhotoIndex(0);
  }, [decade]);

  const decadePhotos: PlacePhoto[] = useMemo(() => {
    if (!place || decade == null) return [];
    return place.photos.filter((item) => item.decade === decade);
  }, [place, decade]);

  const photo = decadePhotos[photoIndex] ?? decadePhotos[0] ?? null;

  return (
    <AnimatePresence>
      {place && photo && decade != null && (
        <motion.aside
          key={place.id}
          initial={{ opacity: 0, y: 28, x: 0 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ type: "spring", stiffness: 280, damping: 28 }}
          className="pointer-events-auto absolute inset-x-3 bottom-3 z-20 max-h-[70vh] overflow-y-auto rounded-sm border border-[var(--line)] bg-paper/95 shadow-[0_20px_50px_rgba(22,28,25,0.28)] backdrop-blur-md md:inset-x-auto md:bottom-6 md:right-6 md:w-[min(420px,92vw)]"
        >
          <div className="relative aspect-[4/3] overflow-hidden bg-moss-deep">
            <AnimatePresence mode="wait">
              <motion.div
                key={photo.src}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="absolute inset-0"
              >
                <Image
                  src={photo.src}
                  alt={photo.caption ?? place.name}
                  fill
                  className="object-cover"
                  sizes="420px"
                  unoptimized
                />
              </motion.div>
            </AnimatePresence>
            <button
              type="button"
              onClick={onClose}
              className="absolute right-3 top-3 rounded-sm bg-ink/55 px-2.5 py-1 text-xs text-paper backdrop-blur-sm hover:bg-ink/75"
              aria-label="Fechar painel"
            >
              Fechar
            </button>
            {decadePhotos.length > 1 && (
              <div className="absolute bottom-12 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
                <button
                  type="button"
                  className="rounded-sm bg-ink/55 px-2 py-1 text-xs text-paper backdrop-blur-sm hover:bg-ink/75"
                  onClick={() =>
                    setPhotoIndex(
                      (index) =>
                        (index - 1 + decadePhotos.length) % decadePhotos.length,
                    )
                  }
                  aria-label="Foto anterior"
                >
                  ‹
                </button>
                <div className="flex gap-1.5">
                  {decadePhotos.map((item, index) => (
                    <button
                      key={item.src}
                      type="button"
                      aria-label={`Foto ${index + 1}`}
                      onClick={() => setPhotoIndex(index)}
                      className={`h-2 w-2 rounded-full ${
                        index === photoIndex ? "bg-tile" : "bg-paper/50"
                      }`}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  className="rounded-sm bg-ink/55 px-2 py-1 text-xs text-paper backdrop-blur-sm hover:bg-ink/75"
                  onClick={() =>
                    setPhotoIndex((index) => (index + 1) % decadePhotos.length)
                  }
                  aria-label="Próxima foto"
                >
                  ›
                </button>
              </div>
            )}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/75 to-transparent px-4 pb-3 pt-10">
              <p className="text-[11px] uppercase tracking-[0.18em] text-tile">
                {decade}s
                {photo.yearExact ? ` · ${photo.yearExact}` : ""}
                {decadePhotos.length > 1
                  ? ` · ${photoIndex + 1}/${decadePhotos.length}`
                  : ""}
              </p>
            </div>
          </div>

          <div className="space-y-4 p-4 sm:p-5">
            <div>
              <h2 className="font-display text-2xl leading-tight text-moss-deep">
                {place.name}
              </h2>
              <p className="mt-1 text-sm text-ink/65">{place.address}</p>
            </div>

            <DecadeTimeline
              decades={decades}
              selected={decade}
              onSelect={setDecade}
            />

            {photo.caption && (
              <p className="text-sm leading-relaxed text-ink/80">
                {photo.caption}
              </p>
            )}

            {place.story && (
              <p className="border-t border-[var(--line)] pt-4 text-sm leading-relaxed text-ink/75">
                {place.story}
              </p>
            )}

            {photo.credit && (
              <p className="text-xs text-sepia">{photo.credit}</p>
            )}
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

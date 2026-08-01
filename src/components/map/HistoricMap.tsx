"use client";

import {
  Map as MapLibreMap,
  Marker,
  NavigationControl,
  type Map,
  type Marker as MapMarker,
} from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  getAllDecades,
  places as allPlaces,
  placesWithDecade,
} from "@/data/places";
import type { Place } from "@/data/types";
import { PlacePanel } from "./PlacePanel";

const SAO_LEOPOLDO = {
  lng: -51.1474,
  lat: -29.7604,
  zoom: 13.2,
};

/** Raster tiles that allow browser use (OSM.org often blocks hotlinking). */
const MAP_STYLE = {
  version: 8 as const,
  sources: {
    carto: {
      type: "raster" as const,
      tiles: [
        "https://a.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png",
        "https://b.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png",
        "https://c.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png",
      ],
      tileSize: 256,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
    },
  },
  layers: [
    {
      id: "carto",
      type: "raster" as const,
      source: "carto",
      paint: {
        "raster-saturation": -0.25,
        "raster-contrast": 0.05,
      },
    },
  ],
};

export function HistoricMap() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Map | null>(null);
  const markersRef = useRef<MapMarker[]>([]);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [decadeFilter, setDecadeFilter] = useState<number | null>(null);

  const decades = useMemo(() => getAllDecades(), []);
  const visiblePlaces = useMemo(
    () => placesWithDecade(decadeFilter),
    [decadeFilter],
  );
  const selectedPlace =
    allPlaces.find((place) => place.id === selectedId) ?? null;

  useEffect(() => {
    const container = containerRef.current;
    if (!container || mapRef.current) return;

    let cancelled = false;
    let map: Map;

    try {
      map = new MapLibreMap({
        container,
        style: MAP_STYLE,
        center: [SAO_LEOPOLDO.lng, SAO_LEOPOLDO.lat],
        zoom: SAO_LEOPOLDO.zoom,
        minZoom: 11,
        maxZoom: 18,
        attributionControl: {},
      });
    } catch (err) {
      console.error(err);
      setError("Não foi possível iniciar o mapa.");
      return;
    }

    map.addControl(
      new NavigationControl({ visualizePitch: false }),
      "top-left",
    );

    const onLoad = () => {
      if (cancelled) return;
      map.resize();
      setReady(true);
      setError(null);
    };

    const onError = (event: { error?: Error }) => {
      console.error("map error", event.error);
      if (!cancelled) {
        setError(
          "Falha ao carregar as camadas do mapa. Verifique a conexão e recarregue.",
        );
      }
    };

    map.on("load", onLoad);
    map.on("error", onError);
    mapRef.current = map;

    const ro = new ResizeObserver(() => {
      map.resize();
    });
    ro.observe(container);

    // Next.js layout can settle after first paint
    requestAnimationFrame(() => map.resize());
    const t = window.setTimeout(() => map.resize(), 200);

    return () => {
      cancelled = true;
      window.clearTimeout(t);
      ro.disconnect();
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !ready) return;

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    visiblePlaces.forEach((place: Place) => {
      const el = document.createElement("button");
      el.type = "button";
      el.className = `place-pin${selectedId === place.id ? " is-active" : ""}`;
      el.setAttribute("aria-label", place.name);
      el.addEventListener("click", (event) => {
        event.stopPropagation();
        setSelectedId(place.id);
        map.flyTo({
          center: [place.lng, place.lat],
          zoom: Math.max(map.getZoom(), 15),
          essential: true,
        });
      });

      const marker = new Marker({ element: el, anchor: "center" })
        .setLngLat([place.lng, place.lat])
        .addTo(map);

      markersRef.current.push(marker);
    });
  }, [ready, visiblePlaces, selectedId]);

  useEffect(() => {
    if (!selectedId) return;
    const stillVisible = visiblePlaces.some((place) => place.id === selectedId);
    if (!stillVisible) setSelectedId(null);
  }, [visiblePlaces, selectedId]);

  return (
    <div className="relative h-[100dvh] min-h-[100vh] w-full overflow-hidden bg-moss-deep">
      <div ref={containerRef} className="absolute inset-0 h-full w-full" />
      <div className="map-vignette absolute inset-0 z-[1]" />

      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 bg-gradient-to-b from-moss-deep/70 to-transparent px-4 pb-16 pt-4 sm:px-6">
        <div className="pointer-events-auto mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-tile">
              São Leopoldo · RS
            </p>
            <h1 className="font-display text-2xl text-paper sm:text-3xl">
              Olhe a cidade de cima. Escolha o tempo.
            </h1>
          </div>
          <label className="flex items-center gap-2 rounded-sm bg-paper/90 px-3 py-2 text-sm text-ink shadow-sm backdrop-blur">
            <span className="text-ink/65">Década</span>
            <select
              className="bg-transparent font-medium outline-none"
              value={decadeFilter ?? ""}
              onChange={(event) => {
                const value = event.target.value;
                setDecadeFilter(value ? Number(value) : null);
              }}
            >
              <option value="">Todas</option>
              {decades.map((decade) => (
                <option key={decade} value={decade}>
                  {decade}s
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <PlacePanel place={selectedPlace} onClose={() => setSelectedId(null)} />

      {!ready && !error && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-moss-deep/90 text-paper">
          <p className="font-display text-xl">Carregando o mapa…</p>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-moss-deep px-6 text-center text-paper">
          <div>
            <p className="font-display text-xl">Mapa indisponível</p>
            <p className="mt-2 text-sm text-paper/75">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
}

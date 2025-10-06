// components/EventMap.tsx
"use client";

import React, { useRef, useEffect } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Location } from "../../types";

interface EventMapProps {
  location: Location;
  width?: string;
  height?: string;
  zoom?: number;
}

export const EventMap: React.FC<EventMapProps> = ({
  location,
  width = "100%",
  height = "400px",
  zoom = 12,
}) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: "https://demotiles.maplibre.org/style.json", 
      center: [location.lng, location.lat],
      zoom,
    });

    new maplibregl.Marker().setLngLat([location.lng, location.lat]).addTo(map);

    return () => map.remove();
  }, [location.lng, location.lat, zoom]);

  return <div ref={mapContainer} style={{ width, height }} />;
};

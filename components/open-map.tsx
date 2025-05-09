"use client";

import "leaflet/dist/leaflet.css"; // ✨ Tambahkan ini untuk styling Leaflet
import { MapPin } from "lucide-react";
import dynamic from "next/dynamic";

import "leaflet/dist/leaflet.css";

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

interface OpenMapProps {
  latitude: number;
  longitude: number;
  className?: string;
}

export function OpenMap({ latitude, longitude, className = "" }: OpenMapProps) {
  return (
    <div
      className={`relative rounded-xl overflow-hidden shadow-sm border bg-muted ${className}`}
      style={{ height: "300px" }} // ✅ Fix height untuk Leaflet
    >
      <MapContainer
        center={[latitude, longitude]}
        zoom={15}
        scrollWheelZoom={false}
        className="w-full h-full"
        zoomControl={true}
        dragging={true}
        doubleClickZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[latitude, longitude]}>
          <Popup>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span>Our Location</span>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

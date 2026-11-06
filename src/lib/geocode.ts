import type { LatLng } from "./types";

let nextSlot = 0;

async function nominatim(path: string) {
  // Nominatim asks for no more than one request per second
  const wait = nextSlot - Date.now();
  nextSlot = Math.max(nextSlot, Date.now()) + 1100;
  if (wait > 0) await new Promise((r) => setTimeout(r, wait));
  // English names keep country groups consistent between visitors
  const res = await fetch("https://nominatim.openstreetmap.org/" + path, {
    headers: { "Accept-Language": "en" },
  });
  if (!res.ok) throw new Error(String(res.status));
  return res.json();
}

export interface Place {
  name: string;
  region: string;
  point: LatLng;
}

interface Hit {
  lat: string;
  lon: string;
  name?: string;
  display_name?: string;
  address?: Record<string, string>;
  error?: string;
}

function toPlace(hit: Hit): Place {
  const a = hit.address ?? {};
  return {
    name: hit.name || a.city || a.town || a.village || a.hamlet || a.municipality || a.county || "",
    region: [a.state, a.country].filter(Boolean).join(", "),
    point: [Number(hit.lat), Number(hit.lon)],
  };
}

export async function searchPlace(q: string): Promise<Place | null> {
  const hits: Hit[] = await nominatim("search?format=jsonv2&addressdetails=1&limit=1&q=" + encodeURIComponent(q));
  return hits.length ? toPlace(hits[0]) : null;
}

export async function reversePlace(p: LatLng): Promise<Place | null> {
  const hit: Hit = await nominatim(`reverse?format=jsonv2&zoom=10&lat=${p[0]}&lon=${p[1]}`);
  return hit.error ? null : toPlace(hit);
}

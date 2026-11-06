const COUNTRY_NAMES: Record<string, string> = {
  USA: "United States",
  UK: "United Kingdom",
  UAE: "United Arab Emirates",
};

export const fmtDate = (t: number) =>
  new Date(t).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });

export function ago(t: number) {
  const m = Math.round((Date.now() - t) / 6e4);
  if (m < 1) return "just now";
  if (m < 60) return m + "m ago";
  const h = Math.round(m / 60);
  if (h < 24) return h + "h ago";
  const d = Math.round(h / 24);
  return d < 30 ? d + "d ago" : fmtDate(t);
}

export const fmtN = (n: number) =>
  n >= 1000 ? (n / 1000).toFixed(n >= 10000 ? 0 : 1).replace(/\.0$/, "") + "k" : String(n);

export const initials = (n: string) =>
  n.split(/[\s_]+/).filter(Boolean).map((w) => w[0]).join("").slice(0, 2).toUpperCase();

export function hue(n: string) {
  let h = 0;
  for (const c of n) h = (h * 31 + c.charCodeAt(0)) % 360;
  return `hsl(${h} 55% 40%)`;
}

// The country is the last comma part of a region, e.g. "Washington, USA"
export function countryOf(region: string) {
  const c = region.split(",").pop()?.trim() ?? "";
  return COUNTRY_NAMES[c] || (c && c !== "—" ? c : "Unknown");
}

export const norm = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

export const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

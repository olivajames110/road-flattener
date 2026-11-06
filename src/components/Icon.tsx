import { P } from "../lib/icons";

export const svgHtml = (d: string, size = 14, weight = 2) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${weight}" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;

interface IconProps {
  name?: keyof typeof P;
  d?: string;
  size?: number;
  weight?: number;
}

// Icon paths are constants from lib/icons, never user text
export function Icon({ name, d, size = 14, weight = 2 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={weight}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: name ? P[name] : (d ?? "") }}
    />
  );
}

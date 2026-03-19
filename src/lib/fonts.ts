// Font pairings — loaded via Google Fonts CSS links (no next/font dependency)
// This avoids the server/client component boundary issue.

export interface FontPairing {
  id: string;
  name: string;
  heading: { fontFamily: string };
  body: { fontFamily: string };
  googleUrl: string; // Google Fonts CSS URL to load both fonts
}

function gfUrl(...families: string[]): string {
  const params = families
    .map((f) => `family=${encodeURIComponent(f)}`)
    .join('&');
  return `https://fonts.googleapis.com/css2?${params}&display=swap`;
}

export const FONT_PAIRINGS: FontPairing[] = [
  {
    id: 'instrument-sans',
    name: 'Instrument Sans',
    heading: { fontFamily: "'Instrument Sans', sans-serif" },
    body: { fontFamily: "'Instrument Sans', sans-serif" },
    googleUrl: '', // already loaded via DS
  },
  {
    id: 'instrument-serif-inter',
    name: 'Instrument Serif + Inter',
    heading: { fontFamily: "'Instrument Serif', serif" },
    body: { fontFamily: "'Inter', sans-serif" },
    googleUrl: gfUrl('Instrument Serif', 'Inter:wght@400;500;600'),
  },
  {
    id: 'playfair-mulish',
    name: 'Playfair Display + Mulish',
    heading: { fontFamily: "'Playfair Display', serif" },
    body: { fontFamily: "'Mulish', sans-serif" },
    googleUrl: gfUrl('Playfair Display:wght@400;700', 'Mulish:wght@400;500;600'),
  },
  {
    id: 'hedvig-letters',
    name: 'Hedvig Letters',
    heading: { fontFamily: "'Hedvig Letters Serif', serif" },
    body: { fontFamily: "'Hedvig Letters Sans', sans-serif" },
    googleUrl: gfUrl('Hedvig Letters Serif', 'Hedvig Letters Sans'),
  },
  {
    id: 'fraunces-inter',
    name: 'Fraunces + Inter',
    heading: { fontFamily: "'Fraunces', serif" },
    body: { fontFamily: "'Inter', sans-serif" },
    googleUrl: gfUrl('Fraunces:wght@400;600', 'Inter:wght@400;500;600'),
  },
  {
    id: 'lora-source-sans',
    name: 'Lora + Source Sans 3',
    heading: { fontFamily: "'Lora', serif" },
    body: { fontFamily: "'Source Sans 3', sans-serif" },
    googleUrl: gfUrl('Lora:wght@400;500;600;700', 'Source Sans 3:wght@400;500;600'),
  },
  {
    id: 'libre-baskerville-nunito',
    name: 'Libre Baskerville + Nunito',
    heading: { fontFamily: "'Libre Baskerville', serif" },
    body: { fontFamily: "'Nunito', sans-serif" },
    googleUrl: gfUrl('Libre Baskerville:wght@400;700', 'Nunito:wght@400;500;600'),
  },
  {
    id: 'cormorant-raleway',
    name: 'Cormorant + Raleway',
    heading: { fontFamily: "'Cormorant Garamond', serif" },
    body: { fontFamily: "'Raleway', sans-serif" },
    googleUrl: gfUrl('Cormorant Garamond:wght@400;500;600', 'Raleway:wght@400;500;600'),
  },
  {
    id: 'sora-inter',
    name: 'Sora + Inter',
    heading: { fontFamily: "'Sora', sans-serif" },
    body: { fontFamily: "'Inter', sans-serif" },
    googleUrl: gfUrl('Sora:wght@400;600;700', 'Inter:wght@400;500;600'),
  },
  {
    id: 'crimson-public-sans',
    name: 'Crimson Pro + Public Sans',
    heading: { fontFamily: "'Crimson Pro', serif" },
    body: { fontFamily: "'Public Sans', sans-serif" },
    googleUrl: gfUrl('Crimson Pro:wght@400;500;600', 'Public Sans:wght@400;500;600'),
  },
];

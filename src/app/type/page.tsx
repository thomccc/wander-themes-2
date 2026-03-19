'use client';

import { useState } from 'react';
import { NextFont } from 'next/dist/compiled/@next/font';
import {
  Instrument_Serif,
  Inter,
  Playfair_Display,
  Mulish,
  Hedvig_Letters_Serif,
  Hedvig_Letters_Sans,
  Fraunces,
  Lora,
  Source_Sans_3,
  Libre_Baskerville,
  Nunito,
  Cormorant_Garamond,
  Raleway,
  Sora,
  Crimson_Pro,
  Public_Sans,
} from 'next/font/google';
import { instrumentSans } from '@wandercom/design-system-fonts/next';

import { Heading } from '@wandercom/design-system-web/ui/heading';
import { Text } from '@wandercom/design-system-web/ui/text';
import { Badge } from '@wandercom/design-system-web/ui/badge';
import { Separator } from '@wandercom/design-system-web/ui/separator';

// --- Font Loading (module scope, preload: false for non-defaults) ---

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  preload: false,
});
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  preload: false,
});
const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  preload: false,
});
const mulish = Mulish({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  preload: false,
});
const hedvigLettersSerif = Hedvig_Letters_Serif({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  preload: false,
});
const hedvigLettersSans = Hedvig_Letters_Sans({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  preload: false,
});
const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['400', '600'],
  display: 'swap',
  preload: false,
});
const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  preload: false,
});
const sourceSans3 = Source_Sans_3({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  preload: false,
});
const libreBaskerville = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  preload: false,
});
const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  preload: false,
});
const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  preload: false,
});
const raleway = Raleway({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  preload: false,
});
const sora = Sora({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
  preload: false,
});
const crimsonPro = Crimson_Pro({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  preload: false,
});
const publicSans = Public_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  preload: false,
});

// --- Font Pairing Data ---

interface FontPairing {
  id: string;
  name: string;
  heading: { name: string; font: NextFont };
  body: { name: string; font: NextFont };
  vibe: string;
  bestFor: string;
  recommended?: boolean;
}

const FONT_PAIRINGS: FontPairing[] = [
  {
    id: 'instrument-sans',
    name: 'Instrument Sans',
    heading: { name: 'Instrument Sans', font: instrumentSans },
    body: { name: 'Instrument Sans', font: instrumentSans },
    vibe: 'Clean, geometric, modern',
    bestFor: 'Default — Wander design system',
    recommended: true,
  },
  {
    id: 'instrument-serif-inter',
    name: 'Instrument Serif + Inter',
    heading: { name: 'Instrument Serif', font: instrumentSerif },
    body: { name: 'Inter', font: inter },
    vibe: 'Editorial, modern luxury',
    bestFor: 'Design-forward brand positioning',
    recommended: true,
  },
  {
    id: 'playfair-mulish',
    name: 'Playfair Display + Mulish',
    heading: { name: 'Playfair Display', font: playfairDisplay },
    body: { name: 'Mulish', font: mulish },
    vibe: 'Classic boutique hotel',
    bestFor: 'High-end properties, curated collections',
  },
  {
    id: 'hedvig-letters',
    name: 'Hedvig Letters Serif + Sans',
    heading: { name: 'Hedvig Letters Serif', font: hedvigLettersSerif },
    body: { name: 'Hedvig Letters Sans', font: hedvigLettersSans },
    vibe: 'Refined, Scandinavian, cohesive',
    bestFor: 'Premium properties, design-forward',
    recommended: true,
  },
  {
    id: 'fraunces-inter',
    name: 'Fraunces + Inter',
    heading: { name: 'Fraunces', font: fraunces },
    body: { name: 'Inter', font: inter },
    vibe: 'Organic, relaxed, playful-premium',
    bestFor: 'Beach houses, cabins, unique stays',
    recommended: true,
  },
  {
    id: 'lora-source-sans',
    name: 'Lora + Source Sans 3',
    heading: { name: 'Lora', font: lora },
    body: { name: 'Source Sans 3', font: sourceSans3 },
    vibe: 'Approachable, readable, balanced',
    bestFor: 'Mixed property types, content-heavy',
  },
  {
    id: 'libre-baskerville-nunito',
    name: 'Libre Baskerville + Nunito',
    heading: { name: 'Libre Baskerville', font: libreBaskerville },
    body: { name: 'Nunito', font: nunito },
    vibe: 'Elegant yet friendly',
    bestFor: 'Boutique stays, countryside, heritage',
  },
  {
    id: 'cormorant-raleway',
    name: 'Cormorant Garamond + Raleway',
    heading: { name: 'Cormorant Garamond', font: cormorantGaramond },
    body: { name: 'Raleway', font: raleway },
    vibe: 'Luxury, refined, high fashion',
    bestFor: 'Premium villas, exclusive listings',
  },
  {
    id: 'sora-inter',
    name: 'Sora + Inter',
    heading: { name: 'Sora', font: sora },
    body: { name: 'Inter', font: inter },
    vibe: 'Clean, geometric, tech-forward',
    bestFor: 'Modern platforms, app-like experience',
  },
  {
    id: 'crimson-public-sans',
    name: 'Crimson Pro + Public Sans',
    heading: { name: 'Crimson Pro', font: crimsonPro },
    body: { name: 'Public Sans', font: publicSans },
    vibe: 'Understated, editorial, trustworthy',
    bestFor: 'Content-driven sites, blogs, guides',
  },
];

// --- Page ---

export default function TypePage() {
  const [selectedId, setSelectedId] = useState('instrument-sans');
  const selected = FONT_PAIRINGS.find((p) => p.id === selectedId)!;

  const headingStyle = { fontFamily: selected.heading.font.style.fontFamily };
  const bodyStyle = { fontFamily: selected.body.font.style.fontFamily };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="mx-auto max-w-3xl px-5 py-12">
        {/* Header */}
        <header className="mb-10">
          <Heading variant="display-sm" className="mb-1">
            Typography
          </Heading>
          <Text variant="body-lg" color="tertiary">
            Font pairing for short-term rental sites. Pick a combination and preview it across the type scale.
          </Text>
        </header>

        {/* Preview Card */}
        <section
          className="mb-10 overflow-hidden rounded-2xl p-8 md:p-12"
          style={{
            background: 'rgba(0,0,0,0.03)',
            boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.04)',
          }}
        >
          {/* Headings */}
          <div className="mb-8 flex flex-col gap-1">
            <Heading
              variant="display-lg"
              style={headingStyle}
            >
              Find your perfect getaway
            </Heading>
            <Heading
              variant="display"
              style={headingStyle}
            >
              Luxury stays across Florida
            </Heading>
            <Heading
              variant="headline"
              style={headingStyle}
            >
              Oceanfront Villa — Siesta Key
            </Heading>
            <Heading
              variant="headline-sm"
              style={headingStyle}
            >
              From $285 per night
            </Heading>
          </div>

          {/* Body */}
          <div className="flex flex-col gap-4">
            <Text variant="body-lg-long" style={bodyStyle}>
              Direct booking, transparent pricing, and quality properties across
              Florida. Search, compare, and book your next short-term rental
              with confidence.
            </Text>
            <Text variant="body-long" style={bodyStyle}>
              This stunning 4-bedroom villa sits directly on Siesta Key&apos;s
              pristine white sand beach. Floor-to-ceiling windows, a heated
              pool, and a fully equipped gourmet kitchen make this the perfect
              retreat for families and groups seeking an unforgettable coastal
              escape.
            </Text>
          </div>
        </section>

        {/* Selected pairing info */}
        <section className="mb-6 flex items-center gap-3">
          <Text variant="body-lg" weight="medium">
            {selected.name}
          </Text>
          <Badge variant="neutral">{selected.vibe}</Badge>
          {selected.recommended && <Badge variant="success">Recommended</Badge>}
        </section>

        <div className="mb-6 flex gap-6 text-sm">
          <div>
            <Text variant="body-sm" color="tertiary" as="span">
              Heading
            </Text>
            <Text variant="body-sm" weight="medium" as="span" className="ml-1.5">
              {selected.heading.name}
            </Text>
          </div>
          <div>
            <Text variant="body-sm" color="tertiary" as="span">
              Body
            </Text>
            <Text variant="body-sm" weight="medium" as="span" className="ml-1.5">
              {selected.body.name}
            </Text>
          </div>
          <div>
            <Text variant="body-sm" color="tertiary" as="span">
              Best for
            </Text>
            <Text variant="body-sm" as="span" className="ml-1.5">
              {selected.bestFor}
            </Text>
          </div>
        </div>

        <Separator className="mb-8" />

        {/* Font Selector Grid */}
        <section>
          <Text
            variant="body-sm"
            weight="medium"
            color="tertiary"
            className="mb-3 text-[10px] uppercase tracking-wider"
          >
            Font pairings
          </Text>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {FONT_PAIRINGS.map((pairing) => {
              const isSelected = pairing.id === selectedId;
              return (
                <button
                  key={pairing.id}
                  onClick={() => setSelectedId(pairing.id)}
                  className="flex flex-col items-start rounded-xl p-4 text-left transition-all hover:scale-[1.02]"
                  style={{
                    background: isSelected
                      ? 'rgba(0,0,0,0.04)'
                      : 'rgba(0,0,0,0.02)',
                    boxShadow: isSelected
                      ? '0 0 0 2px #000, 0 2px 8px rgba(0,0,0,0.08)'
                      : '0 0 0 1px rgba(0,0,0,0.06)',
                  }}
                >
                  {/* Heading font preview */}
                  <span
                    className="mb-1 text-lg font-medium leading-tight"
                    style={{
                      fontFamily:
                        pairing.heading.font.style.fontFamily,
                    }}
                  >
                    {pairing.heading.name.split(' ')[0]}
                  </span>
                  {/* Body font preview */}
                  <span
                    className="text-xs opacity-50"
                    style={{
                      fontFamily:
                        pairing.body.font.style.fontFamily,
                    }}
                  >
                    {pairing.body.name}
                  </span>
                  {/* Indicators */}
                  {pairing.recommended && (
                    <div className="mt-2">
                      <Badge variant="success" className="text-[8px]">
                        Top pick
                      </Badge>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}

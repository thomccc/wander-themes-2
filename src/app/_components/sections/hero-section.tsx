'use client';

import type { CSSProperties } from 'react';
import { Suspense } from 'react';
import { type ResolvedTokens, hexToOklch } from '@/lib/color-engine';
import { CONTENT } from '@/lib/template-data';
import { Grid, GridItem } from '@wandercom/design-system-web/ui/grid';
import { SearchBar } from '@wandercom/design-system-web/ui/search-bar';
import { SearchBarFallback } from '@wandercom/design-system-web/ui/search-bar-fallback';

interface HeroSectionProps {
  bg: string;
  tokens: ResolvedTokens;
  hasImage: boolean;
  headingFont: CSSProperties;
  bodyFont: CSSProperties;
  variant?: string;
}

const LOCATIONS = [
  { id: 'malibu', title: 'Malibu', subtitle: 'California' },
  { id: 'big-bear', title: 'Big Bear', subtitle: 'California' },
  { id: 'austin', title: 'Austin', subtitle: 'Texas' },
  { id: 'scottsdale', title: 'Scottsdale', subtitle: 'Arizona' },
  { id: 'tahoe', title: 'Lake Tahoe', subtitle: 'California' },
  { id: 'miami', title: 'Miami', subtitle: 'Florida' },
];

const REGIONS = [
  { id: 'california', title: 'California', subtitle: 'United States' },
  { id: 'florida', title: 'Florida', subtitle: 'United States' },
  { id: 'texas', title: 'Texas', subtitle: 'United States' },
  { id: 'colorado', title: 'Colorado', subtitle: 'United States' },
];

function HeroSearchBar({ tokens }: { tokens: ResolvedTokens }) {
  // Override DS SearchBar CSS variables with the current theme's tokens
  // Compute text colors that are readable against the searchbar surface
  // (not the section bg), since the searchbar has its own elevated surface
  const sbBg = tokens.surface.Searchbar;
  const sbIsLight = hexToOklch(sbBg).L > 0.4;
  const sbTextPrimary = sbIsLight ? '#202020' : '#fafafa';
  const sbTextSecondary = sbIsLight ? '#8e8e8e' : '#8e8e8e';

  const searchBarVars = {
    '--color-surface-searchbar': sbBg,
    '--color-surface-searchbar-selected': tokens.surface['Searchbar-selected'],
    '--color-surface-searchbar-trigger-hover': tokens.surface['Searchbar-trigger-hover'],
    '--color-surface-searchbar-trigger-selected': tokens.surface['Searchbar-trigger-selected'],
    '--color-border-overlay-primary': tokens.border['Overlay-Primary'],
    '--color-border-overlay-secondary': tokens.border['Overlay-Secondary'],
    '--color-text-primary': sbTextPrimary,
    '--color-text-secondary': sbTextSecondary,
    '--color-surface-primary': tokens.surface.Primary,
    // Search button uses Checkout (accent) color for visual pop
    '--color-button-primary': tokens.button.Primary,
    '--color-button-hover-primary': tokens.buttonHover.Primary,
    '--color-text-button-primary': tokens.buttonText.Primary,
  } as React.CSSProperties;

  return (
    <div style={searchBarVars}>
      <Suspense
        fallback={
          <SearchBarFallback
            locationPlaceholder="Where to?"
            datesPlaceholder="Check in — Check out"
            guestsPlaceholder="Guests"
            searchLabel="Search"
          />
        }
      >
        <SearchBar
          locations={LOCATIONS}
          suggestedRegions={REGIONS}
          onSearch={(values) => console.log('Search:', values)}
        />
      </Suspense>
    </div>
  );
}

export function HeroSection({
  bg,
  tokens: t,
  hasImage,
  headingFont,
  bodyFont,
  variant = 'centered',
}: HeroSectionProps) {
  const c = CONTENT.hero;

  if (variant === 'full-bleed') {
    // Iconic: full viewport image, large uppercase centered text + search bar
    return (
      <section className="relative min-h-screen overflow-hidden" style={{ backgroundColor: bg }}>
        <img
          src="/sample%20images/Daniel%20Far%C3%B2%20Photos%20(3).jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.3)' }} />
        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
          <span
            className="mb-6 block text-xs font-medium uppercase tracking-[0.3em]"
            style={{ color: 'rgba(255,255,255,0.6)', ...bodyFont }}
          >
            {c.eyebrow}
          </span>
          <h1
            className="mb-8 max-w-4xl text-5xl font-medium uppercase leading-none tracking-wide md:text-8xl"
            style={{ color: '#ffffff', ...headingFont }}
          >
            {c.headline}
          </h1>
          <p
            className="mb-10 max-w-md text-base leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.7)', ...bodyFont }}
          >
            {c.subheadline}
          </p>
          <div className="inline-flex">
            <HeroSearchBar tokens={t} />
          </div>
        </div>
      </section>
    );
  }

  if (variant === 'split-right') {
    // Editorial: dramatic full-bleed hero, oversized type, minimal copy
    return (
      <section className="relative min-h-screen overflow-hidden" style={{ backgroundColor: bg }}>
        <img
          src="/sample%20images/Pali%20Mendez%20Photos%20(1).jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.4)' }} />

        <div className="relative z-10 flex min-h-screen flex-col items-center justify-end px-6 pb-24 text-center md:pb-32">
          <h1
            className="mb-6 max-w-4xl text-6xl font-medium leading-none tracking-tight md:text-8xl"
            style={{ color: '#ffffff', ...headingFont }}
          >
            {c.headline}
          </h1>
          <p
            className="mb-10 max-w-md text-base leading-relaxed md:text-lg"
            style={{ color: 'rgba(255,255,255,0.7)', ...bodyFont }}
          >
            {c.subheadline}
          </p>
          <div className="inline-flex">
            <HeroSearchBar tokens={t} />
          </div>
        </div>
      </section>
    );
  }

  // Default: centered
  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: bg }}>
      {hasImage && (
        <>
          <img
            src="/sample%20images/DTS%20By%20Water%20Daniel%20Far%C3%B2%20ID%207951.jpg"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ background: t.surface['Image-overlay'] }}
          />
        </>
      )}
      <div className="relative z-10 flex flex-col items-center px-6 py-28 text-center md:py-40">
        <span
          className="mb-4 block text-sm font-medium tracking-wide"
          style={{ color: t.text.Tertiary, ...bodyFont }}
        >
          {c.eyebrow}
        </span>
        <h1
          className="mb-6 max-w-3xl text-5xl font-medium leading-[1.08] tracking-tight md:text-7xl"
          style={{ color: t.text.Primary, ...headingFont, whiteSpace: 'pre-line' }}
        >
          {c.headline}
        </h1>
        <p
          className="mb-10 max-w-lg text-base leading-relaxed md:text-lg"
          style={{ color: t.text.Secondary, ...bodyFont }}
        >
          {c.subheadline}
        </p>
        <div className="inline-flex">
          <HeroSearchBar tokens={t} />
        </div>
      </div>
    </section>
  );
}

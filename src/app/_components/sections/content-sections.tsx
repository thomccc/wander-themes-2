'use client';

import type { CSSProperties } from 'react';
import { useState } from 'react';
import type { ResolvedTokens } from '@/lib/color-engine';
import { CONTENT } from '@/lib/template-data';
import { ThemedButton } from '@/app/color/_components/themed-button';
import { Badge } from '@wandercom/design-system-web/ui/badge';
import { Separator } from '@wandercom/design-system-web/ui/separator';
import { Input } from '@wandercom/design-system-web/ui/input';
import { Button } from '@wandercom/design-system-web/ui/button';
import { PropertyCard } from '@wandercom/design-system-web/blocks/property-card';
import { Footer as DSFooter } from '@wandercom/design-system-web/blocks/footer';
import { Grid, GridItem } from '@wandercom/design-system-web/ui/grid';

// --- Types ---

interface SectionProps {
  bg: string;
  tokens: ResolvedTokens;
  headingFont: CSSProperties;
  bodyFont: CSSProperties;
  variant?: string;
}

// --- Shared section wrapper using DS Grid ---

function SectionShell({
  bg,
  children,
  padY = 'default',
  layout = 'default',
}: {
  bg: string;
  children: React.ReactNode;
  padY?: 'compact' | 'default' | 'spacious';
  layout?: 'default' | 'wide';
}) {
  const py =
    padY === 'compact'
      ? 'py-12 md:py-16'
      : padY === 'spacious'
        ? 'py-20 md:py-28'
        : 'py-16 md:py-24';
  return (
    <section className={py} style={{ backgroundColor: bg }}>
      <Grid layout={layout}>{children}</Grid>
    </section>
  );
}

function SectionHeader({
  eyebrow,
  headline,
  description,
  tokens,
  headingFont,
  bodyFont,
  span,
}: {
  eyebrow?: string;
  headline: string;
  description?: string;
  tokens: ResolvedTokens;
  headingFont: CSSProperties;
  bodyFont: CSSProperties;
  span?: any;
}) {
  return (
    <GridItem span={span ?? 'full'} className="mb-12">
      {eyebrow && (
        <span
          className="mb-3 block text-sm font-medium tracking-wide"
          style={{ color: tokens.text.Tertiary, ...bodyFont }}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className="mb-3 text-3xl font-medium tracking-tight md:text-4xl"
        style={{ color: tokens.text.Primary, ...headingFont }}
      >
        {headline}
      </h2>
      {description && (
        <p
          className="max-w-xl text-base leading-relaxed md:text-lg"
          style={{ color: tokens.text.Secondary, ...bodyFont }}
        >
          {description}
        </p>
      )}
    </GridItem>
  );
}

// --- Features ---

export function FeaturesSection({ bg, tokens: t, headingFont, bodyFont, variant }: SectionProps) {
  const c = CONTENT.features;
  const [activeFeature, setActiveFeature] = useState(0);

  const featureImages = [
    '/sample%20images/Daniel%20Far%C3%B2%20Photos%20(1).jpg',
    '/sample%20images/Daniel%20Far%C3%B2%20Intimacy%20Photo.jpg',
    '/sample%20images/Daniel%20Far%C3%B2%20Photos%20(4).jpg',
  ];

  if (variant === 'accordion') {
    // Iconic: 3-column expandable grid with +/- toggles
    return (
      <SectionShell bg={bg} padY="spacious">
        <SectionHeader eyebrow={c.eyebrow} headline={c.headline} tokens={t} headingFont={headingFont} bodyFont={bodyFont} />
        {c.items.map((item, i) => {
          const isOpen = activeFeature === i;
          return (
            <GridItem key={item.title} span={{ base: 'full' as const, md: 2 as const, lg: 4 as const }}>
              <button
                onClick={() => setActiveFeature(isOpen ? -1 : i)}
                className="flex h-full w-full flex-col rounded-xl p-6 text-left transition-colors"
                style={{
                  backgroundColor: isOpen ? t.surface.Secondary : 'transparent',
                  border: `1px solid ${isOpen ? t.border.Secondary : t.border.Primary}`,
                }}
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="text-2xl">{item.icon}</div>
                  <span
                    className="flex h-7 w-7 items-center justify-center rounded-full text-sm transition-transform duration-200"
                    style={{
                      color: t.text.Tertiary,
                      border: `1px solid ${t.border.Secondary}`,
                      transform: isOpen ? 'rotate(45deg)' : 'none',
                    }}
                  >
                    +
                  </span>
                </div>
                <h3
                  className="mb-2 text-sm font-medium uppercase tracking-wider"
                  style={{ color: t.text.Primary, ...headingFont }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-sm leading-relaxed transition-all duration-300"
                  style={{
                    color: t.text.Secondary,
                    opacity: isOpen ? 1 : 0,
                    maxHeight: isOpen ? '100px' : '0px',
                    overflow: 'hidden',
                    ...bodyFont,
                  }}
                >
                  {item.description}
                </p>
              </button>
            </GridItem>
          );
        })}
      </SectionShell>
    );
  }

  if (variant === 'alternating') {
    // Editorial: split — clickable feature list left, image right that shuffles
    return (
      <SectionShell bg={bg} padY="spacious">
        <SectionHeader eyebrow={c.eyebrow} headline={c.headline} tokens={t} headingFont={headingFont} bodyFont={bodyFont} />

        {/* Text list left */}
        <GridItem span={{ base: 'full' as const, lg: 5 as const }}>
          <div className="flex flex-col">
            {c.items.map((item, i) => {
              const isActive = activeFeature === i;
              return (
                <button
                  key={item.title}
                  onClick={() => setActiveFeature(i)}
                  className="group cursor-pointer border-b py-6 text-left transition-all first:pt-0"
                  style={{ borderColor: t.border.Primary }}
                >
                  <h3
                    className="mb-2 text-sm font-medium uppercase tracking-wider transition-opacity"
                    style={{
                      color: t.text.Primary,
                      opacity: isActive ? 1 : 0.4,
                      ...headingFont,
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="max-w-sm text-base leading-relaxed transition-all"
                    style={{
                      color: t.text.Secondary,
                      opacity: isActive ? 1 : 0,
                      maxHeight: isActive ? '100px' : '0px',
                      overflow: 'hidden',
                      ...bodyFont,
                    }}
                  >
                    {item.description}
                  </p>
                </button>
              );
            })}
          </div>
        </GridItem>

        {/* Image right — changes on click */}
        <GridItem span={{ base: 'full' as const, lg: 6 as const }} start={{ lg: 7 as const }}>
          <div className="relative aspect-square overflow-hidden rounded-2xl md:aspect-4/3">
            {featureImages.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={c.items[i]?.title || ''}
                className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
                style={{ opacity: activeFeature === i ? 1 : 0 }}
                loading="lazy"
              />
            ))}
          </div>
        </GridItem>
      </SectionShell>
    );
  }

  // Classic: 3-col cards
  return (
    <SectionShell bg={bg}>
      <SectionHeader eyebrow={c.eyebrow} headline={c.headline} tokens={t} headingFont={headingFont} bodyFont={bodyFont} />
      {c.items.map((item) => (
        <GridItem key={item.title} span={{ base: 'full', md: 2, lg: 4 }}>
          <div
            className="h-full rounded-xl p-6"
            style={{
              backgroundColor: t.surface.Secondary,
              boxShadow: `0 0 0 1px ${t.border.Primary}`,
            }}
          >
            <div className="mb-4 text-3xl">{item.icon}</div>
            <h3 className="mb-2 text-lg font-medium" style={{ color: t.text.Primary, ...headingFont }}>
              {item.title}
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: t.text.Secondary, ...bodyFont }}>
              {item.description}
            </p>
          </div>
        </GridItem>
      ))}
    </SectionShell>
  );
}

// --- Property Cards (5 per row using DS wide grid) ---

export function PropertyCardsSection({ bg, tokens: t, headingFont, bodyFont, variant }: SectionProps) {
  const c = CONTENT.propertyCards;

  if (variant === '2col-full') {
    // Iconic: 2 large cards per row, generous spacing
    return (
      <SectionShell bg={bg} padY="spacious">
        <SectionHeader eyebrow={c.eyebrow} headline={c.headline} description={c.description} tokens={t} headingFont={headingFont} bodyFont={bodyFont} />
        {c.items.slice(0, 4).map((property) => (
          <GridItem key={property.name} span={{ base: 'full' as const, md: 6 as const, lg: 6 as const }}>
            <PropertyCard
              name={property.name}
              images={[{ src: property.image, alt: property.name }]}
              price={parseInt(property.price.replace('$', ''))}
              currency="USD"
              nights={1}
              rating={parseFloat(property.rating)}
              location={property.location}
              features={{
                bedrooms: property.beds,
                beds: property.beds,
                baths: property.baths,
              }}
              showWishlist={false}
              isSwipeable={false}
              href="#"
            />
          </GridItem>
        ))}
      </SectionShell>
    );
  }

  if (variant === '4col-grid') {
    // Editorial: 4 DS PropertyCards in default 12-col grid
    return (
      <SectionShell bg={bg} padY="spacious">
        <SectionHeader eyebrow={c.eyebrow} headline={c.headline} description={c.description} tokens={t} headingFont={headingFont} bodyFont={bodyFont} />
        {c.items.slice(0, 4).map((property) => (
          <GridItem key={property.name} span={{ base: 'full' as const, md: 3 as const, lg: 3 as const }}>
            <PropertyCard
              name={property.name}
              images={[{ src: property.image, alt: property.name }]}
              price={parseInt(property.price.replace('$', ''))}
              currency="USD"
              nights={1}
              rating={parseFloat(property.rating)}
              location={property.location}
              features={{
                bedrooms: property.beds,
                beds: property.beds,
                baths: property.baths,
              }}
              showWishlist={false}
              isSwipeable={false}
              href="#"
            />
          </GridItem>
        ))}
      </SectionShell>
    );
  }

  // Classic: DS PropertyCard wide grid
  return (
    <SectionShell bg={bg} layout="wide">
      <GridItem span="full" className="mb-12">
        {c.eyebrow && (
          <span
            className="mb-3 block text-sm font-medium tracking-wide"
            style={{ color: t.text.Tertiary, ...bodyFont }}
          >
            {c.eyebrow}
          </span>
        )}
        <h2
          className="mb-3 text-3xl font-medium tracking-tight md:text-4xl"
          style={{ color: t.text.Primary, ...headingFont }}
        >
          {c.headline}
        </h2>
        {c.description && (
          <p
            className="max-w-xl text-base leading-relaxed md:text-lg"
            style={{ color: t.text.Secondary, ...bodyFont }}
          >
            {c.description}
          </p>
        )}
      </GridItem>
      {c.items.map((property) => (
        <GridItem key={property.name} span={{ base: 2, md: 1, lg: 1 }}>
          <PropertyCard
            name={property.name}
            images={[{ src: property.image, alt: property.name }]}
            price={parseInt(property.price.replace('$', ''))}
            currency="USD"
            nights={1}
            rating={parseFloat(property.rating)}
            location={property.location}
            features={{
              bedrooms: property.beds,
              beds: property.beds,
              baths: property.baths,
            }}
            showWishlist={false}
            isSwipeable={false}
            href="#"
          />
        </GridItem>
      ))}
    </SectionShell>
  );
}

// --- Testimonials ---

export function TestimonialsSection({ bg, tokens: t, headingFont, bodyFont, variant }: SectionProps) {
  const c = CONTENT.testimonials;

  if (variant === 'stats') {
    // Iconic: large stat numbers in a row
    const stats = CONTENT.stats;
    return (
      <SectionShell bg={bg} padY="spacious">
        <GridItem span="full" className="text-center">
          <span className="mb-3 block text-xs font-medium uppercase tracking-[0.2em]" style={{ color: t.text.Tertiary, ...bodyFont }}>
            {c.eyebrow}
          </span>
          <h2 className="mb-16 text-3xl font-medium tracking-tight md:text-4xl" style={{ color: t.text.Primary, ...headingFont }}>
            {c.headline}
          </h2>
        </GridItem>
        {stats.map((stat) => (
          <GridItem key={stat.label} span={{ base: 'full' as const, md: 3 as const, lg: 3 as const }} className="text-center">
            <div
              className="mb-2 text-4xl font-medium tracking-tight md:text-5xl"
              style={{ color: t.text.Primary, ...headingFont }}
            >
              {stat.number}
            </div>
            <div className="text-sm" style={{ color: t.text.Tertiary, ...bodyFont }}>
              {stat.label}
            </div>
          </GridItem>
        ))}
      </SectionShell>
    );
  }

  if (variant === 'featured') {
    // Editorial: single large centered quote
    const featured = c.items[0];
    return (
      <SectionShell bg={bg} padY="spacious">
        <GridItem span={{ base: 'full', lg: 8 }} start={{ lg: 3 }} className="text-center">
          <div className="mb-6 text-5xl" style={{ color: t.text.Muted }}>&ldquo;</div>
          <p
            className="mb-8 text-xl leading-relaxed md:text-2xl"
            style={{ color: t.text.Primary, ...bodyFont }}
          >
            {featured.quote}
          </p>
          <span className="block text-sm font-medium" style={{ color: t.text.Primary, ...bodyFont }}>
            {featured.author}
          </span>
          <span className="text-sm" style={{ color: t.text.Tertiary, ...bodyFont }}>
            {featured.role}
          </span>
        </GridItem>
      </SectionShell>
    );
  }

  // Classic: 2-col cards
  return (
    <SectionShell bg={bg}>
      <SectionHeader
        eyebrow={c.eyebrow}
        headline={c.headline}
        tokens={t}
        headingFont={headingFont}
        bodyFont={bodyFont}
      />
      {c.items.map((item) => (
        <GridItem key={item.author} span={{ base: 'full', md: 3, lg: 6 }}>
          <div
            className="h-full rounded-2xl p-6 md:p-8"
            style={{
              backgroundColor: t.surface.Secondary,
              boxShadow: `0 0 0 1px ${t.border.Primary}`,
            }}
          >
            <div
              className="mb-4 text-3xl font-serif leading-none"
              style={{ color: t.text.Muted }}
            >
              &ldquo;
            </div>
            <p
              className="mb-6 text-base leading-relaxed"
              style={{ color: t.text.Primary, ...bodyFont }}
            >
              {item.quote}
            </p>
            <div>
              <span
                className="block text-sm font-medium"
                style={{ color: t.text.Primary, ...bodyFont }}
              >
                {item.author}
              </span>
              <span
                className="text-sm"
                style={{ color: t.text.Tertiary, ...bodyFont }}
              >
                {item.role}
              </span>
            </div>
          </div>
        </GridItem>
      ))}
    </SectionShell>
  );
}

// --- Gallery ---

export function GallerySection({ bg, tokens: t, headingFont, bodyFont, variant }: SectionProps) {
  const c = CONTENT.gallery;
  if (variant === '2x2-grid') {
    // Editorial: asymmetric masonry — 1 large + 2 small
    return (
      <SectionShell bg={bg} padY="spacious">
        <SectionHeader eyebrow={c.eyebrow} headline={c.headline} tokens={t} headingFont={headingFont} bodyFont={bodyFont} />
        {/* Large image left */}
        <GridItem span={{ base: 'full' as const, lg: 7 as const }}>
          <div className="group relative aspect-4/3 cursor-pointer overflow-hidden rounded-2xl md:aspect-auto md:h-full md:max-h-150">
            <img src={c.items[0].image} alt={c.items[0].caption} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
            <div className="absolute inset-x-0 bottom-0 p-5 opacity-0 transition-opacity group-hover:opacity-100" style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.6))' }}>
              <span className="text-sm font-medium text-white" style={bodyFont}>{c.items[0].caption}</span>
            </div>
          </div>
        </GridItem>
        {/* Two smaller images stacked right */}
        <GridItem span={{ base: 'full' as const, lg: 5 as const }} className="flex flex-col gap-4">
          {c.items.slice(1, 3).map((item, i) => (
            <div key={i} className="group relative aspect-video cursor-pointer overflow-hidden rounded-2xl">
              <img src={item.image} alt={item.caption} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 transition-opacity group-hover:opacity-100" style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.6))' }}>
                <span className="text-sm font-medium text-white" style={bodyFont}>{item.caption}</span>
              </div>
            </div>
          ))}
        </GridItem>
      </SectionShell>
    );
  }

  // Classic: uniform 3-col grid
  return (
    <SectionShell bg={bg}>
      <SectionHeader eyebrow={c.eyebrow} headline={c.headline} tokens={t} headingFont={headingFont} bodyFont={bodyFont} />
      {c.items.map((item, i) => (
        <GridItem key={i} span={{ base: 'full' as const, md: 2 as const, lg: 4 as const }}>
          <div
            className="group relative aspect-3/2 cursor-pointer overflow-hidden rounded-lg"
            style={{ backgroundColor: t.surface.Tertiary }}
          >
            <img
              src={item.image}
              alt={item.caption}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            <div
              className="absolute inset-x-0 bottom-0 p-3 opacity-0 transition-opacity group-hover:opacity-100"
              style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.6))' }}
            >
              <span className="text-xs font-medium text-white" style={bodyFont}>
                {item.caption}
              </span>
            </div>
          </div>
        </GridItem>
      ))}
    </SectionShell>
  );
}

// --- FAQ (wide layout: headline left, accordion right) ---

export function FAQSection({ bg, tokens: t, headingFont, bodyFont, variant }: SectionProps) {
  const c = CONTENT.faq;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (variant === 'centered') {
    // Editorial: centered narrow accordion
    return (
      <SectionShell bg={bg}>
        <GridItem span={{ base: 'full', lg: 8 }} start={{ lg: 3 }}>
          <div className="mb-12 text-center">
            {c.eyebrow && (
              <span className="mb-3 block text-sm font-medium tracking-wide" style={{ color: t.text.Tertiary, ...bodyFont }}>
                {c.eyebrow}
              </span>
            )}
            <h2 className="mb-3 text-3xl font-medium tracking-tight md:text-4xl" style={{ color: t.text.Primary, ...headingFont }}>
              {c.headline}
            </h2>
          </div>
          {c.items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} style={{ borderBottom: `1px solid ${t.border.Primary}` }}>
                <button onClick={() => setOpenIndex(isOpen ? null : i)} className="flex w-full items-center justify-between py-5 text-left">
                  <span className="pr-4 text-base font-medium" style={{ color: t.text.Primary, ...bodyFont }}>{item.question}</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 transition-transform" style={{ color: t.text.Tertiary, transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                    <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
                {isOpen && (
                  <p className="pb-5 text-sm leading-relaxed" style={{ color: t.text.Secondary, ...bodyFont }}>{item.answer}</p>
                )}
              </div>
            );
          })}
        </GridItem>
      </SectionShell>
    );
  }

  // Classic: split layout
  return (
    <SectionShell bg={bg}>
      {/* Left: headline */}
      <GridItem span={{ base: 'full', lg: 4 }}>
        <div className="mb-8 lg:mb-0 lg:sticky lg:top-24">
          {c.eyebrow && (
            <span
              className="mb-3 block text-sm font-medium tracking-wide"
              style={{ color: t.text.Tertiary, ...bodyFont }}
            >
              {c.eyebrow}
            </span>
          )}
          <h2
            className="mb-3 text-3xl font-medium tracking-tight md:text-4xl"
            style={{ color: t.text.Primary, ...headingFont }}
          >
            {c.headline}
          </h2>
          {c.description && (
            <p
              className="max-w-sm text-base leading-relaxed"
              style={{ color: t.text.Secondary, ...bodyFont }}
            >
              {c.description}
            </p>
          )}
        </div>
      </GridItem>

      {/* Right: accordion */}
      <GridItem span={{ base: 'full', lg: 7 }} start={{ lg: 6 }}>
        {c.items.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={i} style={{ borderBottom: `1px solid ${t.border.Primary}` }}>
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="flex w-full items-center justify-between py-5 text-left"
              >
                <span
                  className="pr-4 text-base font-medium"
                  style={{ color: t.text.Primary, ...bodyFont }}
                >
                  {item.question}
                </span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="shrink-0 transition-transform"
                  style={{
                    color: t.text.Tertiary,
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                >
                  <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
              {isOpen && (
                <p
                  className="pb-5 text-sm leading-relaxed"
                  style={{ color: t.text.Secondary, ...bodyFont }}
                >
                  {item.answer}
                </p>
              )}
            </div>
          );
        })}
      </GridItem>
    </SectionShell>
  );
}

// --- CTA (split: text left, buttons right) ---

export function CTASection({ bg, tokens: t, headingFont, bodyFont, variant }: SectionProps) {
  const c = CONTENT.cta;

  if (variant === 'centered') {
    return (
      <SectionShell bg={bg} padY="spacious">
        <GridItem span={{ base: 'full', lg: 8 }} start={{ lg: 3 }} className="text-center">
          <h2 className="mb-4 text-3xl font-medium tracking-tight md:text-5xl" style={{ color: t.text.Primary, ...headingFont }}>
            {c.headline}
          </h2>
          <p className="mx-auto mb-8 max-w-lg text-base leading-relaxed md:text-lg" style={{ color: t.text.Secondary, ...bodyFont }}>
            {c.description}
          </p>
          <div className="flex items-center justify-center gap-3">
            <ThemedButton bg={t.button.Primary} hover={t.buttonHover.Primary} text={t.buttonText.Primary} size="lg">
              {c.primaryCta}
            </ThemedButton>
            <ThemedButton bg="transparent" hover={t.buttonHover.Ghost} text={t.buttonText.Ghost} borderColor={t.border.Tertiary} size="lg">
              {c.secondaryCta}
            </ThemedButton>
          </div>
        </GridItem>
      </SectionShell>
    );
  }

  if (variant === 'newsletter') {
    // Iconic: centered with email signup
    return (
      <SectionShell bg={bg} padY="spacious">
        <GridItem span={{ base: 'full' as const, lg: 6 as const }} start={{ lg: 4 as const }} className="text-center">
          <h2 className="mb-4 text-3xl font-medium tracking-tight md:text-4xl" style={{ color: t.text.Primary, ...headingFont }}>
            {c.headline}
          </h2>
          <p className="mx-auto mb-8 max-w-md text-base leading-relaxed" style={{ color: t.text.Secondary, ...bodyFont }}>
            {c.description}
          </p>
          <div className="mx-auto flex max-w-sm gap-2">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1"
            />
            <Button variant="primary" size="md">
              Subscribe
            </Button>
          </div>
        </GridItem>
      </SectionShell>
    );
  }

  // Classic: split
  return (
    <SectionShell bg={bg} padY="spacious">
      <GridItem span={{ base: 'full', lg: 7 }}>
        <h2
          className="mb-4 text-3xl font-medium tracking-tight md:text-5xl"
          style={{ color: t.text.Primary, ...headingFont }}
        >
          {c.headline}
        </h2>
        <p
          className="text-base leading-relaxed md:text-lg"
          style={{ color: t.text.Secondary, ...bodyFont }}
        >
          {c.description}
        </p>
      </GridItem>
      <GridItem span={{ base: 'full', lg: 4 }} start={{ lg: 9 }} className="flex items-center">
        <div className="flex items-center gap-3">
          <ThemedButton
            bg={t.button.Primary}
            hover={t.buttonHover.Primary}
            text={t.buttonText.Primary}
            size="lg"
          >
            {c.primaryCta}
          </ThemedButton>
          <ThemedButton
            bg="transparent"
            hover={t.buttonHover.Ghost}
            text={t.buttonText.Ghost}
            borderColor={t.border.Secondary}
            size="lg"
          >
            {c.secondaryCta}
          </ThemedButton>
        </div>
      </GridItem>
    </SectionShell>
  );
}

// --- Footer ---

export function FooterSection({ bg, tokens: t, headingFont, bodyFont, variant }: SectionProps) {
  const c = CONTENT.footer;

  return (
    <DSFooter
      logo={
        <img
          src="/BnB-Breeze.svg"
          alt={c.logo}
          className="h-6 w-auto"
        />
      }
      copyright={c.legal.replace('© 2026 ', '')}
      trademark={c.tagline}
      topBar={{
        title: 'Follow us',
        links: [
          { label: 'Instagram', href: '#', isExternal: true },
          { label: 'X (Twitter)', href: '#', isExternal: true },
          { label: 'Facebook', href: '#', isExternal: true },
          { label: 'LinkedIn', href: '#', isExternal: true },
        ],
      }}
      sections={c.columns.map((col) => ({
        title: col.heading,
        links: col.links.map((link) => ({
          label: link,
          href: '#',
        })),
      }))}
      variant="default"
    />
  );
}

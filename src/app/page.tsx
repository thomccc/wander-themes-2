'use client';

import { useState, useMemo } from 'react';
import type { CSSProperties } from 'react';
import {
  type SeedColors,
  type BackgroundRole,
  generateRamps,
  resolveNavTokens,
  resolveSectionTokens,
  hexToOklch,
  PRESETS,
} from '@/lib/color-engine';
import {
  type SectionId,
  SECTION_ORDER,
  SITE_TEMPLATES,
  COLOR_SUBTHEMES,
} from '@/lib/template-data';

import { FONT_PAIRINGS } from '@/lib/fonts';

import { NavSection } from './_components/sections/nav-section';
import { HeroSection } from './_components/sections/hero-section';
import {
  FeaturesSection,
  PropertyCardsSection,
  TestimonialsSection,
  GallerySection,
  FAQSection,
  CTASection,
  FooterSection,
} from './_components/sections/content-sections';
import { TemplateToolbar, ToolbarToggle } from './_components/template-toolbar';
import { SectionActionBar } from './_components/section-action-bar';

const SECTION_COMPONENTS: Record<
  SectionId,
  React.FC<{
    bg: string;
    tokens: import('@/lib/color-engine').ResolvedTokens;
    headingFont: CSSProperties;
    bodyFont: CSSProperties;
    hasImage?: boolean;
    variant?: string;
  }>
> = {
  nav: () => null,
  hero: HeroSection as any,
  features: FeaturesSection,
  'property-cards': PropertyCardsSection,
  testimonials: TestimonialsSection,
  gallery: GallerySection,
  faq: FAQSection,
  cta: CTASection,
  footer: FooterSection,
};

export default function HomePage() {
  const [siteTemplate, setSiteTemplate] = useState('Classic');
  const [colorSubTheme, setColorSubTheme] = useState('Mono Elegant');
  const [colorPreset, setColorPreset] = useState('Wander');
  const [seeds, setSeeds] = useState<SeedColors>(PRESETS['Wander']);
  const [fontPairingId, setFontPairingId] = useState('instrument-sans');
  const [toolbarOpen, setToolbarOpen] = useState(true);
  const [roleOverrides, setRoleOverrides] = useState<
    Partial<Record<SectionId, BackgroundRole>>
  >({});
  const [variantOverrides, setVariantOverrides] = useState<
    Partial<Record<SectionId, string>>
  >({});

  const ramps = useMemo(() => generateRamps(seeds), [seeds]);
  const template = SITE_TEMPLATES[siteTemplate];
  const subTheme = COLOR_SUBTHEMES[colorSubTheme];
  const fontPairing = FONT_PAIRINGS.find((f) => f.id === fontPairingId)!;
  const headingFont = fontPairing.heading;
  const bodyFont = fontPairing.body;

  function getRole(sectionId: SectionId): BackgroundRole {
    return roleOverrides[sectionId] ?? subTheme.roles[sectionId];
  }

  function getVariant(sectionId: SectionId): string | undefined {
    return variantOverrides[sectionId] ?? template.layouts[sectionId];
  }

  const heroSection = {
    role: getRole('hero'),
    img: subTheme.heroImage,
  };

  const navTokens = useMemo(
    () => resolveNavTokens(heroSection, ramps),
    [heroSection.role, heroSection.img, ramps],
  );

  const heroBgHex = useMemo(
    () => resolveSectionTokens(heroSection, ramps).bg,
    [heroSection.role, heroSection.img, ramps],
  );

  function handleSiteTemplateChange(name: string) {
    setSiteTemplate(name);
    setVariantOverrides({});
  }

  function handleColorSubThemeChange(name: string) {
    setColorSubTheme(name);
    setRoleOverrides({});
  }

  function handleColorChange(name: string) {
    setColorPreset(name);
    if (PRESETS[name]) setSeeds(PRESETS[name]);
  }

  function handleFontChange(id: string) {
    setFontPairingId(id);
  }

  function handleRoleOverride(sectionId: SectionId, role: BackgroundRole) {
    setRoleOverrides((prev) => ({ ...prev, [sectionId]: role }));
  }

  function handleVariantOverride(sectionId: SectionId, variant: string) {
    setVariantOverrides((prev) => ({ ...prev, [sectionId]: variant }));
  }

  return (
    <div className="flex min-h-screen bg-white">
      {fontPairing.googleUrl && (
        <link rel="stylesheet" href={fontPairing.googleUrl} />
      )}

      <TemplateToolbar
        open={toolbarOpen}
        onToggle={() => setToolbarOpen(!toolbarOpen)}
        siteTemplate={siteTemplate}
        onSiteTemplateChange={handleSiteTemplateChange}
        colorSubTheme={colorSubTheme}
        onColorSubThemeChange={handleColorSubThemeChange}
        colorPreset={colorPreset}
        onColorChange={handleColorChange}
        fontPairing={fontPairingId}
        onFontChange={handleFontChange}
        fontPairingNames={FONT_PAIRINGS.map((f) => ({
          id: f.id,
          name: f.name,
        }))}
      />

      <main className="relative min-w-0 flex-1 overflow-x-clip">
        <ToolbarToggle
          open={toolbarOpen}
          onToggle={() => setToolbarOpen(true)}
        />

        <NavSection
          nav={navTokens}
          headingFont={headingFont}
          bodyFont={bodyFont}
          heroBg={heroBgHex}
          blended={subTheme.heroImage || hexToOklch(heroBgHex).L < 0.5}
        />

        {SECTION_ORDER.map((sectionId) => {
          const role = getRole(sectionId);
          const variant = getVariant(sectionId);
          const config = {
            role,
            img: sectionId === 'hero' && subTheme.heroImage,
          };
          const { bg, tokens } = resolveSectionTokens(config, ramps);
          const Component = SECTION_COMPONENTS[sectionId];
          if (!Component) return null;

          return (
            <div key={sectionId} className="group relative">
              <Component
                bg={bg}
                tokens={tokens}
                headingFont={headingFont}
                bodyFont={bodyFont}
                hasImage={config.img}
                variant={variant}
              />
              <SectionActionBar
                sectionId={sectionId}
                currentRole={role}
                currentVariant={variant}
                ramps={ramps}
                onRoleChange={(r) => handleRoleOverride(sectionId, r)}
                onVariantChange={(v) => handleVariantOverride(sectionId, v)}
              />
            </div>
          );
        })}
      </main>
    </div>
  );
}

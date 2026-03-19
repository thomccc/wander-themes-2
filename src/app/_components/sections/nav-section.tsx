'use client';

import { useState, useEffect, type CSSProperties } from 'react';
import type { NavTokens } from '@/lib/color-engine';
import { hexToOklch } from '@/lib/color-engine';
import { CONTENT } from '@/lib/template-data';
import { Header } from '@wandercom/design-system-web/blocks/header';
import { Button } from '@wandercom/design-system-web/ui/button';

interface NavSectionProps {
  nav: NavTokens;
  headingFont: CSSProperties;
  bodyFont: CSSProperties;
  heroBg: string;
  blended?: boolean;
}

export function NavSection({
  headingFont,
  heroBg,
  blended = true,
}: NavSectionProps) {
  const c = CONTENT.nav;
  const [scrolled, setScrolled] = useState(false);
  const isDarkHero = hexToOklch(heroBg).L < 0.5;

  useEffect(() => {
    if (!blended) return;
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [blended]);

  const showBg = !blended || scrolled;
  const useLight = blended && !scrolled && isDarkHero;

  return (
    <div
      className="sticky top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 [&_header]:static! [&_header]:w-auto!"
      style={{
        backgroundColor: showBg ? 'rgba(255,255,255,0.95)' : 'transparent',
        backdropFilter: showBg ? 'blur(12px)' : 'none',
        borderBottom: showBg ? '1px solid rgba(0,0,0,0.06)' : '1px solid transparent',
        marginBottom: blended ? '-72px' : undefined,
      }}
      data-theme={useLight ? 'dark' : 'light'}
    >
      <Header
        logo={
          <img
            src="/BnB-Breeze.svg"
            alt={c.logo}
            className="h-6 w-auto"
            style={{ filter: useLight ? 'invert(1)' : 'none' }}
          />
        }
        actionButton={
          <Button variant="primary" size="sm">
            {c.cta}
          </Button>
        }
        menuItems={c.links.map((link) => ({
          type: 'link' as const,
          label: link,
          href: '#',
        }))}
      />
    </div>
  );
}

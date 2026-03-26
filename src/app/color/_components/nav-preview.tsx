'use client';

import { type NavTokens } from '@/lib/color-engine';
import { Badge } from '@wandercom/design-system-web/ui/badge';
import { ThemedButton } from './themed-button';

interface NavPreviewProps {
  nav: NavTokens;
  cornerRadius: number;
}

export function NavPreview({ nav, cornerRadius }: NavPreviewProps) {
  return (
    <div
      className="flex items-center gap-4 px-5 py-3"
      style={{
        background: nav.bg,
        borderBottom: `1px solid ${nav.border}`,
        borderRadius: `${Math.max(cornerRadius, 8)}px ${Math.max(cornerRadius, 8)}px 0 0`,
      }}
    >
      {/* Logo */}
      <div
        className="text-sm font-semibold tracking-tight"
        style={{ color: nav.text }}
      >
        Logo
      </div>

      {/* Nav links */}
      <div className="flex items-center gap-3">
        {['Features', 'Pricing', 'About'].map((link) => (
          <span
            key={link}
            className="cursor-default text-[11px] font-medium transition-opacity duration-150 hover:opacity-70"
            style={{ color: nav.textSecondary }}
          >
            {link}
          </span>
        ))}
      </div>

      {/* Right side */}
      <div className="ml-auto flex items-center gap-2">
        <span
          className="cursor-default text-[11px] font-medium transition-opacity duration-150 hover:opacity-70"
          style={{ color: nav.textSecondary }}
        >
          Login
        </span>
        <ThemedButton
          bg={nav.ctaBg}
          hover={nav.ctaHover}
          text={nav.ctaText}
          size="sm"
        >
          Get started
        </ThemedButton>
      </div>

      {/* Transparent badge */}
      {nav.isTransparent && (
        <Badge variant="neutral" className="text-[8px]">
          transparent
        </Badge>
      )}
    </div>
  );
}

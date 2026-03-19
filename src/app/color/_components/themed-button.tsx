'use client';

import type { ReactNode, CSSProperties } from 'react';
import { hexToOklch, mixColors } from '@/lib/color-engine';
import { Button } from '@wandercom/design-system-web/ui/button';

interface ThemedButtonProps {
  bg: string;
  hover?: string;
  text: string;
  borderColor?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  children: ReactNode;
}

export function ThemedButton({
  bg,
  text,
  borderColor,
  size = 'md',
  children,
}: ThemedButtonProps) {
  const isOutline = bg === 'transparent' && borderColor;
  const isTransparent = bg === 'transparent';

  // Compute a real hover color by mixing toward white (dark bg) or black (light bg)
  // This works even for pure black/white where brightness filter fails
  let hoverBg: string;
  if (isTransparent) {
    // Use text color as a proxy for bg darkness
    // Light text = dark section bg → white hover overlay
    // Dark text = light section bg → black hover overlay
    try {
      const textL = hexToOklch(text).L;
      hoverBg = textL > 0.5
        ? 'rgba(255,255,255,0.12)'
        : 'rgba(0,0,0,0.06)';
    } catch {
      hoverBg = 'rgba(128,128,128,0.1)';
    }
  } else {
    try {
      const L = hexToOklch(bg).L;
      if (L > 0.85) hoverBg = mixColors(bg, '#000000', 4);
      else if (L > 0.6) hoverBg = mixColors(bg, '#000000', 6);
      else if (L > 0.3) hoverBg = mixColors(bg, '#ffffff', 12);
      else hoverBg = mixColors(bg, '#ffffff', 22);
    } catch {
      hoverBg = bg;
    }
  }

  return (
    <Button
      variant={isOutline ? 'outline' : 'primary'}
      size={size}
      className="bg-(--tb)! text-(--tt)! border-(--tbd)! hover:bg-(--th)! transition-colors!"
      style={
        {
          '--tb': bg,
          '--th': hoverBg,
          '--tt': text,
          '--tbd': borderColor ?? 'transparent',
        } as CSSProperties
      }
    >
      {children}
    </Button>
  );
}

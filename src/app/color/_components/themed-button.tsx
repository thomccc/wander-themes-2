'use client';

import type { ReactNode, CSSProperties } from 'react';

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
  hover,
  text,
  borderColor,
  size = 'md',
  children,
}: ThemedButtonProps) {
  const isOutline = bg === 'transparent' && borderColor;

  const hoverBg = hover ?? bg;

  return (
    <Button
      variant={isOutline ? 'outline' : 'primary'}
      size={size}
      className="bg-(--tb)! text-(--tt)! border-(--tbd)! hover:bg-(--th)! transition-[background-color,transform] duration-150 ease-out active:scale-[0.97]!"
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

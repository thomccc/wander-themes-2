'use client';

import {
  type Ramps,
  type BackgroundRole,
  contrastRatio,
  resolveRoleTokens,
} from '@/lib/color-engine';
import { Heading } from '@wandercom/design-system-web/ui/heading';
import { Badge } from '@wandercom/design-system-web/ui/badge';
import { ThemedButton } from './themed-button';

const SHOWCASE_ROLES: BackgroundRole[] = [
  'white',
  'theme-light',
  'theme-solid',
  'theme-dark',
  'acc1-light',
  'acc1-solid',
  'acc2-solid',
  'acc2-dark',
  'black',
];

export function AllTokens({ ramps }: { ramps: Ramps }) {
  return (
    <div>
      <Heading variant="headline-sm" className="mb-4">
        All tokens per background
      </Heading>
      <div className="flex flex-col gap-3">
        {SHOWCASE_ROLES.map((role) => {
          const { bg, fg, tokens: t } = resolveRoleTokens(role, ramps);
          const ratio = contrastRatio(t.text.Primary, bg);

          return (
            <div
              key={role}
              className="overflow-hidden rounded-2xl"
              style={{
                boxShadow:
                  '0 0 0 1px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)',
              }}
            >
              {/* Preview */}
              <div className="p-5 transition-[background-color] duration-250 ease-out" style={{ background: bg }}>
                <div
                  className="mb-0.5 text-[9px] font-semibold uppercase tracking-widest"
                  style={{ color: t.text.Tertiary }}
                >
                  {role}
                </div>
                <div
                  className="mb-0.5 text-base font-semibold tracking-tight"
                  style={{ color: t.text.Primary }}
                >
                  Heading
                </div>
                <div
                  className="mb-3 text-sm"
                  style={{ color: t.text.Secondary }}
                >
                  Body{' '}
                  <span
                    className="underline decoration-1 underline-offset-2"
                    style={{ color: t.text.Link }}
                  >
                    link
                  </span>{' '}
                  <span style={{ color: t.text.Muted }}>muted</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {Object.entries(t.button.bg)
                    .filter(([name]) => name !== 'Slider')
                    .map(([name, value]) => (
                      <ThemedButton
                        key={name}
                        bg={name === 'Outlined' || name === 'Ghost' ? 'transparent' : value}
                        hover={t.button.bgHover[name] || value}
                        text={t.button.foreground[name] || fg}
                        borderColor={name === 'Outlined' ? t.border.Secondary : undefined}
                      >
                        {name}
                      </ThemedButton>
                    ))}
                </div>
              </div>

              {/* Footer */}
              <div
                className="flex items-center gap-3 px-5 py-2"
                style={{
                  background: 'rgba(128,128,128,0.03)',
                  borderTop: '1px solid rgba(128,128,128,0.06)',
                }}
              >
                {[
                  { l: 'bg', c: bg },
                  { l: 'fg', c: fg },
                  { l: 'brand', c: t.button.bg.Primary },
                  { l: 'accent', c: t.button.bg.Checkout },
                  { l: 'txt.2', c: t.text.Secondary },
                ].map((x) => (
                  <div key={x.l} className="flex items-center gap-1">
                    <div
                      className="h-2.5 w-2.5 rounded-sm"
                      style={{
                        background: x.c,
                        boxShadow: '0 0 0 0.5px rgba(128,128,128,0.2)',
                      }}
                    />
                    <span className="font-mono text-[9px] tabular-nums opacity-30">
                      {x.l}
                    </span>
                  </div>
                ))}
                <div className="ml-auto">
                  <Badge variant={ratio >= 4.5 ? 'success' : 'destructive'}>
                    {ratio.toFixed(1)}:1 {ratio >= 4.5 ? 'AA' : 'Fail'}
                  </Badge>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

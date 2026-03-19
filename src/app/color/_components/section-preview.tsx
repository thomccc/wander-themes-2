'use client';

import { useState } from 'react';
import {
  type SectionConfig,
  type Ramps,
  type BackgroundRole,
  hexToOklch,
  resolveRole,
  resolveSectionTokens,
  STATUS_COLORS,
  ALL_ROLES,
  ROLE_GROUPS,
} from '@/lib/color-engine';
import { Badge } from '@wandercom/design-system-web/ui/badge';
import { Text } from '@wandercom/design-system-web/ui/text';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@wandercom/design-system-web/ui/popover';
import { ThemedButton } from './themed-button';

// --- Role Picker ---

function RolePicker({
  role,
  ramps,
  onChange,
}: {
  role: BackgroundRole;
  ramps: Ramps;
  onChange: (role: BackgroundRole) => void;
}) {
  const [open, setOpen] = useState(false);
  const bg = resolveRole(role, ramps);
  const isLight = hexToOklch(bg).L > 0.6;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-medium backdrop-blur-sm transition-opacity hover:opacity-90"
          style={{
            background: bg,
            color: isLight ? 'rgba(0,0,0,0.55)' : 'rgba(255,255,255,0.55)',
            boxShadow: '0 0 0 1px rgba(128,128,128,0.15)',
          }}
        >
          {role}
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none" style={{ opacity: 0.5 }}>
            <path d="M2 3L4 5L6 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-60 p-3" align="start" sideOffset={6}>
        {ROLE_GROUPS.map((group) => {
          const items = ALL_ROLES.filter((r) => r.group === group);
          return (
            <div key={group} className="mb-3 last:mb-0">
              <div className="mb-1.5 text-[10px] font-medium uppercase tracking-wider opacity-40">
                {group}
              </div>
              <div className="flex flex-wrap gap-1">
                {items.map((r) => {
                  const c = resolveRole(r.id, ramps);
                  const selected = r.id === role;
                  return (
                    <button
                      key={r.id}
                      onClick={() => {
                        onChange(r.id);
                        setOpen(false);
                      }}
                      className="relative flex h-7 w-10 items-center justify-center rounded-md transition-transform hover:scale-110"
                      style={{
                        background: c,
                        boxShadow: selected
                          ? '0 0 0 2px #499BFF'
                          : '0 0 0 1px rgba(128,128,128,0.1), 0 1px 2px rgba(0,0,0,0.05)',
                      }}
                    >
                      {selected && (
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 10 10"
                          fill="none"
                          style={{
                            color:
                              hexToOklch(c).L > 0.6
                                ? 'rgba(0,0,0,0.5)'
                                : 'rgba(255,255,255,0.7)',
                          }}
                        >
                          <path
                            d="M2.5 5L4.5 7L7.5 3"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </PopoverContent>
    </Popover>
  );
}

// --- Section Preview Card ---

interface SectionPreviewProps {
  name: string;
  section: SectionConfig;
  ramps: Ramps;
  cornerRadius: number;
  showPicker: boolean;
  onChangeRole: (role: BackgroundRole) => void;
  flatTop?: boolean;
}

export function SectionPreview({
  name,
  section,
  ramps,
  cornerRadius,
  showPicker,
  onChangeRole,
  flatTop,
}: SectionPreviewProps) {
  const { bg, effectiveBg, fg, tokens: t, ratio } = resolveSectionTokens(
    section,
    ramps,
  );
  const r = Math.max(cornerRadius, 8);
  const radius = flatTop ? `0 0 ${r}px ${r}px` : `${r}px`;

  return (
    <div
      className="overflow-hidden"
      style={{
        borderRadius: radius,
        boxShadow: flatTop ? 'none' :
          '0 0 0 1px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)',
      }}
    >
      {/* Preview area */}
      <div className="relative p-5" style={{ background: bg }}>
        {section.img && (
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: t.surface['Image-overlay'] }}
          />
        )}

        <div className="relative z-10">
          {/* Header row */}
          <div className="mb-3 flex items-center gap-2">
            <span
              className="text-[10px] font-semibold uppercase tracking-widest"
              style={{ color: t.text.Tertiary }}
            >
              {name}
            </span>
            {showPicker && (
              <RolePicker
                role={section.role}
                ramps={ramps}
                onChange={onChangeRole}
              />
            )}
            {section.img && (
              <Badge variant="neutral" className="ml-auto text-[9px]">
                bg-image
              </Badge>
            )}
          </div>

          {/* Typography */}
          <div
            className="mb-1 text-lg font-semibold tracking-tight"
            style={{ color: t.text.Primary }}
          >
            Section heading text
          </div>
          <div
            className="mb-4 text-sm leading-relaxed"
            style={{ color: t.text.Secondary }}
          >
            Body text with{' '}
            <span
              className="underline decoration-1 underline-offset-2"
              style={{ color: t.text.Link }}
            >
              a link
            </span>{' '}
            and <span style={{ color: t.text.Muted }}>muted</span>.
          </div>

          {/* Buttons — real DS Buttons with hover states */}
          <div className="mb-3 flex flex-wrap gap-1.5">
            <ThemedButton
              bg={t.button.Primary}
              hover={t.buttonHover.Primary}
              text={t.buttonText.Primary}
            >
              Primary
            </ThemedButton>
            <ThemedButton
              bg={t.button.Checkout}
              hover={t.buttonHover.Checkout}
              text={t.buttonText.Checkout}
            >
              Checkout
            </ThemedButton>
            <ThemedButton
              bg={t.button.Secondary}
              hover={t.buttonHover.Secondary}
              text={t.buttonText.Secondary}
            >
              Secondary
            </ThemedButton>
            <ThemedButton
              bg="transparent"
              hover={t.buttonHover.Outlined}
              text={t.buttonText.Outlined}
              borderColor={t.border.Secondary}
            >
              Outlined
            </ThemedButton>
            <ThemedButton
              bg="transparent"
              hover={t.buttonHover.Ghost}
              text={t.buttonText.Ghost}
            >
              Ghost
            </ThemedButton>
            <ThemedButton
              bg={t.button.Destructive}
              hover={t.buttonHover.Destructive}
              text={t.buttonText.Destructive}
            >
              Destruct
            </ThemedButton>
          </div>

          {/* Surfaces + states */}
          <div className="flex items-center gap-2">
            {['Secondary', 'Tertiary', 'Input'].map((k) => (
              <div
                key={k}
                className="rounded-md px-2 py-1 text-[10px] font-medium"
                style={{
                  background: t.surface[k],
                  color: t.text.Secondary,
                  boxShadow:
                    k === 'Input'
                      ? `inset 0 0 0 1px ${t.border.Primary}`
                      : undefined,
                }}
              >
                {k === 'Input' ? 'Input' : `Srf ${k === 'Secondary' ? '2' : '3'}`}
              </div>
            ))}
            <div className="ml-1 flex gap-1">
              {[
                STATUS_COLORS.error,
                STATUS_COLORS.success,
                STATUS_COLORS.warning,
                STATUS_COLORS.info,
              ].map((c, i) => (
                <div
                  key={i}
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: c }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Token footer bar */}
      <div
        className="flex items-center gap-3 px-5 py-2.5"
        style={{
          background: 'rgba(128,128,128,0.03)',
          borderTop: '1px solid rgba(128,128,128,0.06)',
        }}
      >
        <Text
          variant="body-sm"
          weight="medium"
          as="span"
          className="text-[11px]"
        >
          {section.role}
        </Text>

        <div className="flex items-center gap-2">
          {[
            { l: 'bg', c: effectiveBg },
            { l: 'fg', c: fg },
            { l: 'brand', c: t.button.Primary },
            { l: 'accent', c: t.button.Checkout },
          ].map((x) => (
            <div key={x.l} className="flex items-center gap-1">
              <div
                className="h-2.5 w-2.5 rounded-sm"
                style={{
                  background: x.c,
                  boxShadow: '0 0 0 0.5px rgba(128,128,128,0.2)',
                }}
              />
              <span className="font-mono text-[9px] opacity-40">{x.l}</span>
            </div>
          ))}
        </div>

        <div className="ml-auto">
          <Badge variant={ratio >= 4.5 ? 'success' : 'destructive'}>
            {ratio.toFixed(1)}:1 {ratio >= 4.5 ? 'AA' : 'Fail'}
          </Badge>
        </div>
      </div>
    </div>
  );
}

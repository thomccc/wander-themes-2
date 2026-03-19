'use client';

import { useState } from 'react';
import {
  type Ramps,
  type BackgroundRole,
  hexToOklch,
  contrastRatio,
  resolveRole,
  resolveRoleTokens,
  GRAY,
} from '@/lib/color-engine';
import { Heading } from '@wandercom/design-system-web/ui/heading';
import { Text } from '@wandercom/design-system-web/ui/text';
import { Badge } from '@wandercom/design-system-web/ui/badge';
import { ThemedButton } from './themed-button';

// --- Background Grid ---

function BgGrid({
  ramps,
  selected,
  onSelect,
}: {
  ramps: Ramps;
  selected: BackgroundRole;
  onSelect: (role: BackgroundRole) => void;
}) {
  const rows: { id: BackgroundRole; c: string; l: string }[][] = [
    [
      { id: 'white', c: GRAY[0], l: 'White' },
      { id: 'black', c: GRAY[1000], l: 'Black' },
    ],
    [
      { id: 'theme-light', c: ramps.brand[50], l: 'Thm lt' },
      { id: 'theme-tint', c: ramps.brand[100], l: 'Tint' },
      { id: 'theme-solid', c: ramps.brand[500], l: 'Thm' },
      { id: 'theme-dark', c: ramps.brand[800], l: 'Thm dk' },
    ],
    [
      { id: 'acc1-light', c: ramps.acc1[50], l: 'A1 lt' },
      { id: 'acc1-tint', c: ramps.acc1[100], l: 'A1 tnt' },
      { id: 'acc1-solid', c: ramps.acc1[500], l: 'A1' },
    ],
    [
      { id: 'acc2-light', c: ramps.acc2[50], l: 'A2 lt' },
      { id: 'acc2-tint', c: ramps.acc2[100], l: 'A2 tnt' },
      { id: 'acc2-solid', c: ramps.acc2[500], l: 'A2' },
      { id: 'acc2-dark', c: ramps.acc2[800], l: 'A2 dk' },
    ],
  ];

  return (
    <div className="flex flex-col gap-1">
      <Text variant="body-sm" weight="medium" color="tertiary" className="mb-1 text-[10px] uppercase tracking-wider">
        Background
      </Text>
      {rows.map((row, i) => (
        <div key={i} className="flex gap-1">
          {row.map((item) => {
            const isLight = hexToOklch(item.c).L > 0.6;
            const isSel = selected === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelect(item.id)}
                className="flex h-8 flex-1 items-center justify-center rounded-lg text-[8px] font-medium transition-all hover:scale-[1.04]"
                style={{
                  background: item.c,
                  color: isLight ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.4)',
                  boxShadow: isSel
                    ? '0 0 0 2px #499BFF, 0 1px 3px rgba(0,0,0,0.1)'
                    : '0 0 0 1px rgba(128,128,128,0.08), 0 1px 2px rgba(0,0,0,0.04)',
                }}
              >
                {item.l}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}

// --- Token Row ---

function TokenRow({
  name,
  color,
  bg,
}: {
  name: string;
  color: string;
  bg: string | null;
}) {
  const ratio =
    color && color !== 'transparent' && bg ? contrastRatio(color, bg) : null;

  return (
    <div className="flex items-center gap-1.5 py-0.75">
      {color === 'transparent' ? (
        <div className="h-3 w-3 shrink-0 rounded-sm border border-dashed opacity-20" />
      ) : (
        <div
          className="h-3 w-3 shrink-0 rounded-sm"
          style={{
            background: color,
            boxShadow: '0 0 0 0.5px rgba(128,128,128,0.15)',
          }}
        />
      )}
      <span className="flex-1 text-[10px] opacity-70">{name}</span>
      <span className="min-w-14 font-mono text-[9px] opacity-30">
        {color === 'transparent' ? 'transp' : color}
      </span>
      {ratio !== null && (
        <Badge
          variant={ratio >= 4.5 ? 'success' : ratio >= 3 ? 'alert' : 'destructive'}
          className="text-[8px]"
        >
          {ratio.toFixed(1)}
        </Badge>
      )}
    </div>
  );
}

// --- Section Inspector ---

export function SectionInspector({ ramps }: { ramps: Ramps }) {
  const [inspectRole, setInspectRole] =
    useState<BackgroundRole>('theme-solid');
  const {
    bg: inspectBg,
    fg: iFg,
    tokens: iTokens,
  } = resolveRoleTokens(inspectRole, ramps);
  const ratio = contrastRatio(iTokens.text.Primary, inspectBg);

  return (
    <div>
      <Heading variant="headline-sm" className="mb-4">
        Section Inspector
      </Heading>

      <div className="flex flex-wrap gap-6">
        {/* Background grid */}
        <div className="w-52 shrink-0">
          <BgGrid
            ramps={ramps}
            selected={inspectRole}
            onSelect={setInspectRole}
          />
        </div>

        {/* Token breakdown */}
        <div className="min-w-75 flex-1">
          {/* Header */}
          <div className="mb-3 flex items-center gap-2">
            <Badge variant="neutral">{inspectRole}</Badge>
            <span className="font-mono text-xs opacity-30">{inspectBg}</span>
            <Badge variant={ratio >= 4.5 ? 'success' : 'destructive'} className="ml-auto">
              {ratio.toFixed(1)}:1 {ratio >= 4.5 ? 'AA' : 'Fail'}
            </Badge>
          </div>

          {/* Live preview card */}
          <div
            className="mb-4 overflow-hidden rounded-2xl p-5"
            style={{
              background: inspectBg,
              boxShadow:
                '0 0 0 1px rgba(0,0,0,0.04), 0 2px 8px rgba(0,0,0,0.06)',
            }}
          >
            <div
              className="mb-1 text-base font-semibold tracking-tight"
              style={{ color: iTokens.text.Primary }}
            >
              Heading
            </div>
            <div
              className="mb-0.5 text-sm"
              style={{ color: iTokens.text.Secondary }}
            >
              Secondary{' '}
              <span
                className="underline decoration-1 underline-offset-2"
                style={{ color: iTokens.text.Link }}
              >
                link
              </span>
            </div>
            <div
              className="mb-0.5 text-xs"
              style={{ color: iTokens.text.Tertiary }}
            >
              Tertiary
            </div>
            <div
              className="mb-4 text-[11px]"
              style={{ color: iTokens.text.Muted }}
            >
              Muted
            </div>

            {/* Real DS Buttons with hover */}
            <div className="mb-3 flex flex-wrap gap-1">
              {Object.entries(iTokens.button).map(([name, value]) => (
                <ThemedButton
                  key={name}
                  bg={name === 'Outlined' || name === 'Ghost' ? 'transparent' : value}
                  hover={iTokens.buttonHover[name] || value}
                  text={iTokens.buttonText[name] || iFg}
                  borderColor={name === 'Outlined' ? iTokens.border.Secondary : undefined}
                >
                  {name}
                </ThemedButton>
              ))}
            </div>

            {/* Surfaces */}
            <div className="mb-3 flex gap-1.5">
              {['Secondary', 'Tertiary', 'Quaternary', 'Input'].map((k) => (
                <div
                  key={k}
                  className="rounded-md px-2 py-1 text-[9px] font-medium"
                  style={{
                    background: iTokens.surface[k],
                    color: iTokens.text.Secondary,
                    boxShadow:
                      k === 'Input'
                        ? `inset 0 0 0 1px ${iTokens.border.Primary}`
                        : undefined,
                  }}
                >
                  {k}
                </div>
              ))}
            </div>

            {/* Borders */}
            <div className="mb-3 flex gap-1.5">
              {['Primary', 'Secondary', 'Tertiary'].map((k) => (
                <div
                  key={k}
                  className="h-px flex-1 rounded-full"
                  style={{ background: iTokens.border[k] }}
                />
              ))}
            </div>

            {/* States */}
            <div className="flex gap-1">
              {Object.entries(iTokens.states).map(([name, value]) => (
                <div
                  key={name}
                  className="rounded-sm"
                  style={{
                    width: name.includes('subtle') ? 14 : 8,
                    height: 8,
                    background: value,
                  }}
                  title={name}
                />
              ))}
            </div>
          </div>

          {/* Full token tables */}
          <div className="flex flex-wrap gap-6">
            <div className="min-w-36 flex-1">
              {[
                { title: 'Surface', data: iTokens.surface, checkBg: false },
                { title: 'Text', data: iTokens.text, checkBg: true },
              ].map((group) => (
                <div key={group.title} className="mb-4">
                  <div className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider opacity-35">
                    {group.title}
                  </div>
                  {Object.entries(group.data).map(([name, value]) => (
                    <TokenRow
                      key={name}
                      name={name}
                      color={value}
                      bg={group.checkBg ? inspectBg : null}
                    />
                  ))}
                </div>
              ))}
            </div>
            <div className="min-w-36 flex-1">
              {[
                { title: 'Button bg', data: iTokens.button },
                { title: 'Button text', data: iTokens.buttonText },
                { title: 'Button hover', data: iTokens.buttonHover },
                { title: 'Border', data: iTokens.border },
                { title: 'States', data: iTokens.states },
              ].map((group) => (
                <div key={group.title} className="mb-4">
                  <div className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider opacity-35">
                    {group.title}
                  </div>
                  {Object.entries(group.data).map(([name, value]) => (
                    <TokenRow
                      key={name}
                      name={name}
                      color={value}
                      bg={null}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

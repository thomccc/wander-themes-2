'use client';

import { useState } from 'react';
import {
  type SeedColors,
  type Ramps,
  type BackgroundRole,
  generateExportJSON,
  generateExportCSS,
  generateFigmaTokens,
  resolveRoleTokens,
  ALL_ROLES,
  EXPORT_MODES,
} from '@/lib/color-engine';
import { Button } from '@wandercom/design-system-web/ui/button';
import { Heading } from '@wandercom/design-system-web/ui/heading';
import { Text } from '@wandercom/design-system-web/ui/text';
import { Badge } from '@wandercom/design-system-web/ui/badge';
import { Label } from '@wandercom/design-system-web/ui/label';
import { Separator } from '@wandercom/design-system-web/ui/separator';
import {
  NativeSelect,
  NativeSelectOption,
} from '@wandercom/design-system-web/ui/native-select';

interface ExportPanelProps {
  ramps: Ramps;
  colors: SeedColors;
}

export function ExportPanel({ ramps, colors }: ExportPanelProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [figmaMode, setFigmaMode] = useState<'all' | 'single'>('all');
  const [selectedRole, setSelectedRole] = useState<BackgroundRole>('white');

  function copyJSON() {
    const json = generateExportJSON(colors, ramps);
    navigator.clipboard
      .writeText(JSON.stringify(json, null, 2))
      .then(() => {
        setCopied('json');
        setTimeout(() => setCopied(null), 2000);
      });
  }

  function copyCSS() {
    const css = generateExportCSS(ramps);
    navigator.clipboard.writeText(css).then(() => {
      setCopied('css');
      setTimeout(() => setCopied(null), 2000);
    });
  }

  function getExportData() {
    const allTokens = generateFigmaTokens(colors, ramps) as Record<string, unknown>;

    if (figmaMode === 'single') {
      // Export just the inner content of the selected mode (no wrapper key)
      // This matches Figma's expected format: { Background: {...}, Text: {...}, ... }
      const modeKey = Object.keys(allTokens).find(
        (k) => k.toLowerCase().includes(selectedRole.replace('-', ' ').toLowerCase()),
      );
      if (modeKey) {
        // Wrap with the mode key so Tokens Studio knows which set it is
        return { [modeKey]: allTokens[modeKey] };
      }
    }

    return allTokens;
  }

  function downloadFigma() {
    const exportData = getExportData();
    const json = JSON.stringify(exportData, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = figmaMode === 'single'
      ? `tokens-${selectedRole}.json`
      : 'tokens-all-modes.json';
    a.click();
    URL.revokeObjectURL(url);
    setCopied('figma-dl');
    setTimeout(() => setCopied(null), 2000);
  }

  function copyFigma() {
    const exportData = getExportData();
    navigator.clipboard
      .writeText(JSON.stringify(exportData, null, 2))
      .then(() => {
        setCopied('figma');
        setTimeout(() => setCopied(null), 2000);
      });
  }

  if (!open) {
    return (
      <Button
        variant="secondary"
        size="sm"
        onClick={() => setOpen(true)}
        className="w-full justify-between transition-[background-color,transform] duration-150 ease-out active:scale-[0.98]"
      >
        Export tokens for Figma / CSS
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="opacity-40 transition-transform duration-200">
          <path d="M3 5L6 8L9 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </Button>
    );
  }

  return (
    <div
      className="animate-in fade-in slide-in-from-top-2 overflow-hidden rounded-2xl duration-250 ease-out"
      style={{
        boxShadow:
          '0 0 0 1px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)',
      }}
    >
      <div className="p-5">
        <div className="mb-4 flex items-center justify-between">
          <Heading variant="headline-sm">Export tokens</Heading>
          <Button variant="ghost" size="xs" onClick={() => setOpen(false)}>
            Close
          </Button>
        </div>

        <Text variant="body-sm" color="tertiary" className="mb-4 font-mono text-xs">
          A={colors.A} &middot; B={colors.B} &middot; C={colors.C}
        </Text>

        {/* JSON / CSS */}
        <div className="mb-4 flex gap-2">
          <Button
            variant={copied === 'json' ? 'primary' : 'outline'}
            size="sm"
            onClick={copyJSON}
          >
            {copied === 'json' ? 'Copied!' : 'Copy JSON'}
          </Button>
          <Button
            variant={copied === 'css' ? 'primary' : 'outline'}
            size="sm"
            onClick={copyCSS}
          >
            {copied === 'css' ? 'Copied!' : 'Copy CSS'}
          </Button>
        </div>

        <Separator className="my-4" />

        {/* Figma export */}
        <Text variant="body-sm" weight="medium" className="mb-3">
          Figma Tokens
        </Text>

        {/* Mode selector */}
        <div className="mb-3 flex items-center gap-3">
          <div className="flex gap-1.5">
            <Button
              variant={figmaMode === 'all' ? 'primary' : 'outline'}
              size="xs"
              onClick={() => setFigmaMode('all')}
            >
              All 13 modes
            </Button>
            <Button
              variant={figmaMode === 'single' ? 'primary' : 'outline'}
              size="xs"
              onClick={() => setFigmaMode('single')}
            >
              Single mode
            </Button>
          </div>

          {figmaMode === 'single' && (
            <NativeSelect
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value as BackgroundRole)}
            >
              {ALL_ROLES.map((r) => (
                <NativeSelectOption key={r.id} value={r.id}>
                  {r.label} ({r.group})
                </NativeSelectOption>
              ))}
            </NativeSelect>
          )}
        </div>

        <Text variant="body-sm" color="tertiary" className="mb-3">
          {figmaMode === 'all'
            ? 'Exports all 13 background modes as separate Figma variable columns.'
            : `Exports only the "${selectedRole}" mode.`}
        </Text>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            variant={copied === 'figma-dl' ? 'primary' : 'secondary'}
            size="sm"
            onClick={downloadFigma}
          >
            {copied === 'figma-dl' ? (
              <>Downloaded <Badge variant="success" className="ml-1.5">✓</Badge></>
            ) : (
              'Download .json'
            )}
          </Button>
          <Button
            variant={copied === 'figma' ? 'primary' : 'outline'}
            size="sm"
            onClick={copyFigma}
          >
            {copied === 'figma' ? (
              <>Copied <Badge variant="success" className="ml-1.5">✓</Badge></>
            ) : (
              'Copy to clipboard'
            )}
          </Button>
        </div>
      </div>

      {/* Preview */}
      <div
        className="max-h-48 overflow-auto px-5 py-3"
        style={{
          background: 'rgba(128,128,128,0.03)',
          borderTop: '1px solid rgba(128,128,128,0.06)',
        }}
      >
        <pre className="font-mono text-[9px] leading-relaxed opacity-35">
          {EXPORT_MODES.map((m) => {
            const { tokens: t } = resolveRoleTokens(m.id, ramps);
            return (
              `/* ${m.label} */\n` +
              `  surface.primary: ${t.surface.Primary}\n` +
              `  text.primary: ${t.text.Primary}\n` +
              `  button.bg.primary: ${t.button.bg.Primary}\n` +
              `  button.foreground.primary: ${t.button.foreground.Primary}\n\n`
            );
          }).join('')}
        </pre>
      </div>
    </div>
  );
}

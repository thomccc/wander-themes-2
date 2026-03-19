'use client';

import { Button } from '@wandercom/design-system-web/ui/button';
import { Label } from '@wandercom/design-system-web/ui/label';
import { Separator } from '@wandercom/design-system-web/ui/separator';
import {
  NativeSelect,
  NativeSelectOption,
} from '@wandercom/design-system-web/ui/native-select';
import { SITE_TEMPLATES, COLOR_SUBTHEMES } from '@/lib/template-data';
import { PRESETS } from '@/lib/color-engine';

interface ToolbarProps {
  open: boolean;
  onToggle: () => void;
  siteTemplate: string;
  onSiteTemplateChange: (v: string) => void;
  colorSubTheme: string;
  onColorSubThemeChange: (v: string) => void;
  colorPreset: string;
  onColorChange: (v: string) => void;
  fontPairing: string;
  onFontChange: (v: string) => void;
  fontPairingNames: { id: string; name: string }[];
}

export function TemplateToolbar({
  open,
  onToggle,
  siteTemplate,
  onSiteTemplateChange,
  colorSubTheme,
  onColorSubThemeChange,
  colorPreset,
  onColorChange,
  fontPairing,
  onFontChange,
  fontPairingNames,
}: ToolbarProps) {
  return (
    <aside
      className="sticky top-0 h-screen shrink-0 overflow-hidden transition-[width] duration-300 ease-in-out"
      style={{
        width: open ? 280 : 0,
        borderRight: open ? '1px solid rgba(0,0,0,0.06)' : 'none',
      }}
    >
      <div className="flex h-full w-70 flex-col overflow-y-auto bg-white dark:bg-black">
        <div className="flex items-center justify-between px-5 py-4">
          <span className="text-sm font-medium">Configure</span>
          <Button variant="ghost" size="xs" onClick={onToggle}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M11 3L3 11M3 3L11 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </Button>
        </div>

        <Separator />

        <div className="flex flex-1 flex-col gap-6 px-5 py-5">
          {/* Site template */}
          <div className="flex flex-col gap-2">
            <Label className="text-xs font-medium uppercase tracking-wider opacity-50">
              Template
            </Label>
            <NativeSelect
              value={siteTemplate}
              onChange={(e) => onSiteTemplateChange(e.target.value)}
            >
              {Object.keys(SITE_TEMPLATES).map((k) => (
                <NativeSelectOption key={k} value={k}>
                  {k}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </div>

          {/* Color sub-theme */}
          <div className="flex flex-col gap-2">
            <Label className="text-xs font-medium uppercase tracking-wider opacity-50">
              Color sub-theme
            </Label>
            <NativeSelect
              value={colorSubTheme}
              onChange={(e) => onColorSubThemeChange(e.target.value)}
            >
              {Object.keys(COLOR_SUBTHEMES).map((k) => (
                <NativeSelectOption key={k} value={k}>
                  {k}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </div>

          {/* Color palette */}
          <div className="flex flex-col gap-2">
            <Label className="text-xs font-medium uppercase tracking-wider opacity-50">
              Color palette
            </Label>
            <NativeSelect
              value={colorPreset}
              onChange={(e) => onColorChange(e.target.value)}
            >
              {Object.keys(PRESETS).map((k) => (
                <NativeSelectOption key={k} value={k}>
                  {k}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </div>

          {/* Typography */}
          <div className="flex flex-col gap-2">
            <Label className="text-xs font-medium uppercase tracking-wider opacity-50">
              Typography
            </Label>
            <NativeSelect
              value={fontPairing}
              onChange={(e) => onFontChange(e.target.value)}
            >
              {fontPairingNames.map((f) => (
                <NativeSelectOption key={f.id} value={f.id}>
                  {f.name}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </div>
        </div>

        <Separator />
        <div className="px-5 py-3">
          <p className="text-[11px] opacity-40">
            {siteTemplate} · {colorSubTheme} · {colorPreset}
          </p>
        </div>
      </div>
    </aside>
  );
}

export function ToolbarToggle({
  open,
  onToggle,
}: {
  open: boolean;
  onToggle: () => void;
}) {
  if (open) return null;
  return (
    <div className="pointer-events-none fixed inset-x-0 top-3 z-100 flex justify-center">
      <Button
        variant="secondary"
        size="sm"
        onClick={onToggle}
        className="pointer-events-auto shadow-lg"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="mr-1.5">
          <path d="M2 4h10M2 7h10M2 10h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        Configure
      </Button>
    </div>
  );
}

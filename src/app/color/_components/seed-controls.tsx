'use client';

import { type SeedColors, PRESETS } from '@/lib/color-engine';
import { Label } from '@wandercom/design-system-web/ui/label';
import { Input } from '@wandercom/design-system-web/ui/input';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@wandercom/design-system-web/ui/select';
import { Text } from '@wandercom/design-system-web/ui/text';

interface SeedControlsProps {
  colors: SeedColors;
  preset: string;
  onColorChange: (key: keyof SeedColors, value: string) => void;
  onPresetChange: (name: string) => void;
}

const SEED_INFO: { key: keyof SeedColors; label: string; description: string }[] = [
  { key: 'A', label: 'Accent', description: 'CTAs & highlights' },
  { key: 'B', label: 'Brand', description: 'Primary identity' },
  { key: 'C', label: 'Secondary', description: 'Variety & depth' },
];

export function SeedControls({
  colors,
  preset,
  onColorChange,
  onPresetChange,
}: SeedControlsProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-6 flex-wrap">
        {SEED_INFO.map(({ key, label, description }) => (
          <div key={key} className="flex items-center gap-3">
            <div className="relative">
              <input
                type="color"
                value={colors[key]}
                onChange={(e) => onColorChange(key, e.target.value)}
                className="h-10 w-10 cursor-pointer rounded-lg border-0 p-0 transition-transform duration-150 ease-out hover:scale-110 active:scale-95"
              />
            </div>
            <div className="flex flex-col gap-0.5">
              <Label className="text-xs font-medium">{label}</Label>
              <Input
                size="sm"
                value={colors[key].toUpperCase()}
                onChange={(e) => {
                  const v = e.target.value;
                  if (/^#[0-9a-fA-F]{6}$/.test(v)) onColorChange(key, v);
                }}
                className="w-[88px] font-mono text-xs tabular-nums"
              />
              <Text variant="body-sm" color="tertiary" as="span">
                {description}
              </Text>
            </div>
          </div>
        ))}

        {/* Color preview circles */}
        <div className="flex items-center rounded-full bg-black/5 p-1 transition-transform duration-200 ease-out hover:scale-110 dark:bg-white/5">
          <div
            className="h-5 w-5 rounded-full border-2 border-white transition-[background-color] duration-200"
            style={{ background: colors.A }}
          />
          <div
            className="-mx-0.5 z-10 h-7 w-7 rounded-full border-[2.5px] border-white transition-[background-color] duration-200"
            style={{ background: colors.B }}
          />
          <div
            className="h-5 w-5 rounded-full border-2 border-white transition-[background-color] duration-200"
            style={{ background: colors.C }}
          />
        </div>

        {/* Preset selector */}
        <div className="ml-auto">
          <Select
            value={preset}
            onValueChange={(v) => onPresetChange(v)}
          >
            <SelectTrigger size="sm" className="w-[170px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(PRESETS).map((name) => (
                <SelectItem key={name} value={name}>
                  {name}
                </SelectItem>
              ))}
              {preset === 'Custom' && (
                <SelectItem value="Custom">Custom</SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState, useMemo } from 'react';
import {
  type SeedColors,
  type SectionConfig,
  type BackgroundRole,
  generateRamps,
  resolveNavTokens,
  PRESETS,
  LAYOUT_TEMPLATES,
  SECTION_NAMES,
} from '@/lib/color-engine';
import { Heading } from '@wandercom/design-system-web/ui/heading';
import { Text } from '@wandercom/design-system-web/ui/text';
import { Button } from '@wandercom/design-system-web/ui/button';
import { Switch } from '@wandercom/design-system-web/ui/switch';
import { Label } from '@wandercom/design-system-web/ui/label';
import { Checkbox } from '@wandercom/design-system-web/ui/checkbox';
import { Separator } from '@wandercom/design-system-web/ui/separator';
import { ToggleGroup, ToggleGroupItem } from '@wandercom/design-system-web/ui/toggle-group';

import { SeedControls } from './_components/seed-controls';
import { SectionPreview } from './_components/section-preview';
import { SectionInspector } from './_components/section-inspector';
import { ExportPanel } from './_components/export-panel';
import { RampDisplay } from './_components/ramp-display';
import { NavPreview } from './_components/nav-preview';

export default function ColorPage() {
  const [preset, setPreset] = useState('Classic Persian');
  const [colors, setColors] = useState<SeedColors>(PRESETS['Classic Persian']);
  const [layout, setLayout] = useState('Alternating light');
  const [cornerRadius, setCornerRadius] = useState(10);
  const [customizing, setCustomizing] = useState(false);
  const [overrides, setOverrides] = useState<Record<number, SectionConfig>>({});

  const ramps = useMemo(() => generateRamps(colors), [colors]);

  const sections = useMemo(() => {
    const base = LAYOUT_TEMPLATES[layout];
    return base.map((s, i) => {
      const o = overrides[i];
      if (o) return { ...s, role: o.role, img: o.img ?? s.img };
      return { ...s };
    });
  }, [layout, overrides]);

  const hasOverrides = Object.keys(overrides).length > 0;

  // Nav tokens derived from the hero section (index 0)
  const navTokens = useMemo(
    () => resolveNavTokens(sections[0], ramps),
    [sections, ramps],
  );

  function updateSeedColor(key: keyof SeedColors, value: string) {
    setColors((prev) => ({ ...prev, [key]: value }));
    setPreset('Custom');
  }

  function selectPreset(name: string) {
    setPreset(name);
    if (PRESETS[name]) setColors(PRESETS[name]);
  }

  function selectLayout(l: string) {
    setLayout(l);
    setOverrides({});
  }

  function overrideSection(idx: number, role: BackgroundRole) {
    setOverrides((prev) => ({
      ...prev,
      [idx]: { role, img: sections[idx].img },
    }));
  }

  function toggleSectionImg(idx: number) {
    const s = sections[idx];
    setOverrides((prev) => ({
      ...prev,
      [idx]: { role: s.role, img: !s.img },
    }));
  }

  function resetSection(idx: number) {
    setOverrides((prev) => {
      const next = { ...prev };
      delete next[idx];
      return next;
    });
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="mx-auto max-w-3xl px-5 py-12">
        {/* Header */}
        <header className="mb-10">
          <Heading variant="display-sm" className="mb-1 text-wrap-balance">
            Color System
          </Heading>
          <Text variant="body-lg" color="tertiary" className="text-pretty">
            3 seeds. ~55 tokens. Every combination accessible.
          </Text>
        </header>

        {/* Seeds */}
        <section className="mb-8">
          <SeedControls
            colors={colors}
            preset={preset}
            onColorChange={updateSeedColor}
            onPresetChange={selectPreset}
          />
        </section>

        <Separator className="mb-8" />

        {/* Template */}
        <section className="mb-6">
          <Text
            variant="body-sm"
            weight="medium"
            color="tertiary"
            className="mb-2 text-[10px] uppercase tracking-wider"
          >
            Page template
          </Text>
          <ToggleGroup
            type="single"
            value={layout}
            onValueChange={(v) => {
              if (v) selectLayout(v);
            }}
            size="sm"
          >
            {Object.keys(LAYOUT_TEMPLATES).map((name) => (
              <ToggleGroupItem key={name} value={name}>
                {name}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </section>

        {/* Controls */}
        <section className="mb-6 flex flex-wrap items-center gap-5">
          <div className="flex items-center gap-2">
            <Switch
              id="customize"
              size="sm"
              checked={customizing}
              onCheckedChange={setCustomizing}
            />
            <Label htmlFor="customize" className="text-sm">
              Customize sections
            </Label>
          </div>

          <div className="flex items-center gap-2">
            <Label className="text-[11px] opacity-40">Radius</Label>
            <input
              type="range"
              min={0}
              max={20}
              value={cornerRadius}
              onChange={(e) => setCornerRadius(Number(e.target.value))}
              className="w-20 accent-neutral-400"
            />
            <span className="font-mono text-[11px] tabular-nums opacity-30">
              {cornerRadius}
            </span>
          </div>

          {hasOverrides && (
            <Button
              variant="ghost"
              size="xs"
              onClick={() => setOverrides({})}
            >
              Reset all
            </Button>
          )}
        </section>

        {/* Section Previews */}
        <section className="mb-10 flex flex-col gap-3">
          {sections.map((s, i) => {
            const isOverridden = overrides[i] !== undefined;
            const isHero = i === 0;

            return (
              <div key={i} className="relative">
                {isOverridden && (
                  <div className="absolute -left-3 bottom-1 top-1 z-10 w-0.5 rounded-full bg-blue-500" />
                )}

                {/* Nav bar sits on top of the hero */}
                {isHero && (
                  <NavPreview nav={navTokens} cornerRadius={cornerRadius} />
                )}

                <SectionPreview
                  name={SECTION_NAMES[i]}
                  section={s}
                  ramps={ramps}
                  cornerRadius={isHero ? 0 : cornerRadius}
                  showPicker={customizing}
                  onChangeRole={(role) => overrideSection(i, role)}
                  flatTop={isHero}
                />

                {customizing && (
                  <div className="mt-1.5 mb-0.5 flex items-center gap-3 pl-1">
                    <div className="flex items-center gap-1.5">
                      <Checkbox
                        id={`img-${i}`}
                        checked={s.img || false}
                        onCheckedChange={() => toggleSectionImg(i)}
                      />
                      <Label
                        htmlFor={`img-${i}`}
                        className="text-[11px] opacity-40"
                      >
                        bg-image
                      </Label>
                    </div>
                    {isOverridden && (
                      <Button
                        variant="link"
                        size="xs"
                        onClick={() => resetSection(i)}
                      >
                        Reset
                      </Button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </section>

        {/* Export */}
        <section className="mb-10">
          <ExportPanel ramps={ramps} colors={colors} />
        </section>

        <Separator className="mb-10" />

        {/* Inspector */}
        <section className="mb-10">
          <SectionInspector ramps={ramps} />
        </section>

        <Separator className="mb-10" />

        {/* Ramps */}
        <section className="mb-10">
          <RampDisplay ramps={ramps} />
        </section>

      </div>
    </div>
  );
}

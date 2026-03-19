'use client';

import { useState } from 'react';
import type { BackgroundRole, Ramps } from '@/lib/color-engine';
import { ALL_ROLES, ROLE_GROUPS, resolveRole, hexToOklch } from '@/lib/color-engine';
import { type SectionId, SECTION_VARIANTS } from '@/lib/template-data';
import { Button } from '@wandercom/design-system-web/ui/button';
import { Text } from '@wandercom/design-system-web/ui/text';
import { Badge } from '@wandercom/design-system-web/ui/badge';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@wandercom/design-system-web/ui/popover';
import {
  ModalRoot,
  ModalTrigger,
  ModalContent,
  ModalOverlay,
  ModalPortal,
  ModalHeader,
  ModalTitle,
  ModalClose,
} from '@wandercom/design-system-web/ui/modal';
import {
  TabsRoot,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@wandercom/design-system-web/ui/tabs';

interface ActionBarProps {
  sectionId: SectionId;
  currentRole: BackgroundRole;
  currentVariant?: string;
  ramps: Ramps;
  onRoleChange: (role: BackgroundRole) => void;
  onVariantChange: (variant: string) => void;
}

export function SectionActionBar({
  sectionId,
  currentRole,
  currentVariant,
  ramps,
  onRoleChange,
  onVariantChange,
}: ActionBarProps) {
  const [colorOpen, setColorOpen] = useState(false);
  const variants = SECTION_VARIANTS[sectionId] || [];

  const sectionLabel = sectionId
    .replace('-', ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div
      className="absolute inset-x-0 bottom-0 z-30 flex items-center justify-center gap-2 py-3 opacity-0 transition-opacity group-hover:opacity-100"
      style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.12))' }}
    >
      {/* Section layout button — opens modal with variant picker */}
      <ModalRoot>
        <ModalTrigger asChild>
          <Button variant="secondary" size="sm" className="shadow-md">
            {sectionLabel}
          </Button>
        </ModalTrigger>
        <ModalPortal>
          <ModalOverlay />
          <ModalContent className="max-w-2xl">
            <ModalHeader>
              <ModalTitle>{sectionLabel}</ModalTitle>
              <ModalClose />
            </ModalHeader>
            <TabsRoot defaultValue="layout" variant="underline">
              <TabsList className="px-6">
                <TabsTrigger value="layout">Layout</TabsTrigger>
                <TabsTrigger value="customize">Customize</TabsTrigger>
              </TabsList>
              <TabsContent value="layout" className="p-6">
                <div className="grid gap-3 sm:grid-cols-2">
                  {variants.map((v) => {
                    const isSelected = v.id === currentVariant;
                    return (
                      <button
                        key={v.id}
                        onClick={() => onVariantChange(v.id)}
                        className="flex flex-col items-start rounded-xl p-4 text-left transition-all hover:scale-[1.01]"
                        style={{
                          boxShadow: isSelected
                            ? '0 0 0 2px #000, 0 2px 8px rgba(0,0,0,0.08)'
                            : '0 0 0 1px rgba(0,0,0,0.08)',
                          backgroundColor: isSelected
                            ? 'rgba(0,0,0,0.03)'
                            : 'transparent',
                        }}
                      >
                        {/* Preview placeholder */}
                        <div
                          className="mb-3 flex h-24 w-full items-center justify-center rounded-lg"
                          style={{ backgroundColor: 'rgba(0,0,0,0.04)' }}
                        >
                          <Text variant="body-sm" color="tertiary">
                            {v.name}
                          </Text>
                        </div>
                        <div className="flex items-center gap-2">
                          <Text variant="body-sm" weight="medium">
                            {v.name}
                          </Text>
                          {isSelected && (
                            <Badge variant="neutral">Current</Badge>
                          )}
                        </div>
                        <Text variant="body-sm" color="tertiary">
                          {v.description}
                        </Text>
                      </button>
                    );
                  })}
                </div>
              </TabsContent>
              <TabsContent value="customize" className="p-6">
                <div className="flex min-h-32 items-center justify-center rounded-lg border border-dashed border-black/10">
                  <Text variant="body-sm" color="tertiary">
                    Section customization options coming soon
                  </Text>
                </div>
              </TabsContent>
            </TabsRoot>
          </ModalContent>
        </ModalPortal>
      </ModalRoot>

      {/* Color role picker */}
      <Popover open={colorOpen} onOpenChange={setColorOpen}>
        <PopoverTrigger asChild>
          <Button variant="secondary" size="sm" className="gap-1.5 shadow-md">
            <div
              className="h-3 w-3 rounded-full"
              style={{
                backgroundColor: resolveRole(currentRole, ramps),
                boxShadow: '0 0 0 1px rgba(0,0,0,0.1)',
              }}
            />
            Color: {currentRole}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-60 p-3" align="center" sideOffset={8}>
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
                    const selected = r.id === currentRole;
                    return (
                      <button
                        key={r.id}
                        onClick={() => {
                          onRoleChange(r.id);
                          setColorOpen(false);
                        }}
                        className="relative flex h-7 w-10 items-center justify-center rounded-md transition-transform hover:scale-110"
                        style={{
                          background: c,
                          boxShadow: selected
                            ? '0 0 0 2px #499BFF'
                            : '0 0 0 1px rgba(128,128,128,0.1)',
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
    </div>
  );
}

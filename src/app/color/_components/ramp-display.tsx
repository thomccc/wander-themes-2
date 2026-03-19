'use client';

import { type Ramps, type ColorRamp, hexToOklch, GRAY } from '@/lib/color-engine';
import { Heading } from '@wandercom/design-system-web/ui/heading';
import { Text } from '@wandercom/design-system-web/ui/text';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '@wandercom/design-system-web/ui/tooltip';

function RampRow({ name, ramp }: { name: string; ramp: ColorRamp }) {
  return (
    <div>
      <Text variant="body-sm" weight="medium" color="secondary" className="mb-1">
        {name}
      </Text>
      <div className="flex flex-wrap gap-0.5">
        {Object.entries(ramp)
          .filter(([key]) => key !== 'solid')
          .map(([stop, hex]) => {
            const lch = hexToOklch(hex);
            const isLight = lch.L > 0.6;
            return (
              <Tooltip key={stop}>
                <TooltipTrigger asChild>
                  <div className="flex flex-col items-center gap-0.5">
                    <div
                      className="flex h-6 w-11 items-center justify-center rounded border border-black/5"
                      style={{ background: hex }}
                    >
                      <span
                        className="font-mono text-[7px]"
                        style={{
                          color: isLight
                            ? 'rgba(0,0,0,0.35)'
                            : 'rgba(255,255,255,0.45)',
                        }}
                      >
                        {(lch.L * 100).toFixed(0)}
                      </span>
                    </div>
                    <span className="text-[7px] text-black/40 dark:text-white/40">
                      {stop}
                    </span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="text-xs">
                    <div className="font-medium">{stop}</div>
                    <div className="font-mono">{hex}</div>
                    <div>L: {(lch.L * 100).toFixed(1)} C: {lch.C.toFixed(3)} h: {lch.h.toFixed(0)}</div>
                  </div>
                </TooltipContent>
              </Tooltip>
            );
          })}
      </div>
    </div>
  );
}

export function RampDisplay({ ramps }: { ramps: Ramps }) {
  return (
    <TooltipProvider delayDuration={200}>
      <div>
        <Heading variant="headline-sm" className="mb-3">
          OKLCh Ramps
        </Heading>
        <div className="flex flex-col gap-4">
          <RampRow name="Brand (B)" ramp={ramps.brand} />
          <RampRow name="Accent (A)" ramp={ramps.acc1} />
          <RampRow name="Seed C" ramp={ramps.acc2} />
          <RampRow name="Gray (fixed)" ramp={GRAY} />
        </div>
      </div>
    </TooltipProvider>
  );
}

// ============================================================
// Color Engine — Pure TypeScript, zero React dependencies
// Generates ~55 semantic tokens from 3 seed hex colors
// Uses OKLCh perceptual color space for even ramp generation
// ============================================================

// --- Types ---

export interface OklchColor {
  L: number;
  C: number;
  h: number;
}

export interface SeedColors {
  A: string; // Accent / action
  B: string; // Brand / dominant
  C: string; // Secondary variety
}

export type ColorRamp = Record<number, string>;

export interface Ramps {
  brand: ColorRamp;
  acc1: ColorRamp;
  acc2: ColorRamp;
}

export type BackgroundRole =
  | 'white'
  | 'black'
  | 'theme-light'
  | 'theme-tint'
  | 'theme-solid'
  | 'theme-dark'
  | 'acc1-light'
  | 'acc1-tint'
  | 'acc1-solid'
  | 'acc2-light'
  | 'acc2-tint'
  | 'acc2-solid'
  | 'acc2-dark';

export interface SectionConfig {
  role: BackgroundRole;
  img?: boolean;
}

export interface ResolvedTokens {
  surface: Record<string, string>;
  text: Record<string, string>;
  button: Record<string, string>;
  buttonHover: Record<string, string>;
  buttonText: Record<string, string>;
  border: Record<string, string>;
  states: Record<string, string>;
}

export interface RoleInfo {
  id: BackgroundRole;
  label: string;
  group: 'Neutral' | 'Theme' | 'Accent 1' | 'Accent 2';
}

// --- Color Space Conversions ---

export function srgbToLinear(c: number): number {
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

export function linearToSrgb(c: number): number {
  return c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
}

export function hexToRgb(hex: string): [number, number, number] {
  const x = hex.replace('#', '');
  return [
    parseInt(x.slice(0, 2), 16) / 255,
    parseInt(x.slice(2, 4), 16) / 255,
    parseInt(x.slice(4, 6), 16) / 255,
  ];
}

export function rgbToHex(r: number, g: number, b: number): string {
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v * 255)));
  return (
    '#' +
    [r, g, b]
      .map((v) => clamp(v).toString(16).padStart(2, '0'))
      .join('')
  );
}

export function rgbToOklab(
  r: number,
  g: number,
  b: number,
): [number, number, number] {
  const lr = srgbToLinear(r);
  const lg = srgbToLinear(g);
  const lb = srgbToLinear(b);
  const l = Math.cbrt(
    0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb,
  );
  const m = Math.cbrt(
    0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb,
  );
  const s = Math.cbrt(
    0.0883024619 * lr + 0.2024326433 * lg + 0.6892648948 * lb,
  );
  return [
    0.2104542553 * l + 0.793617785 * m - 0.004072047 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  ];
}

export function oklabToRgb(
  L: number,
  a: number,
  b: number,
): [number, number, number] {
  const l = L + 0.3963377774 * a + 0.2158037573 * b;
  const m = L - 0.1055613458 * a - 0.0638541728 * b;
  const s = L - 0.0894841775 * a - 1.291485548 * b;
  const l3 = l * l * l;
  const m3 = m * m * m;
  const s3 = s * s * s;
  return [
    linearToSrgb(4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3),
    linearToSrgb(
      -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3,
    ),
    linearToSrgb(
      -0.0041960863 * l3 - 0.7034186147 * m3 + 1.707614701 * s3,
    ),
  ];
}

export function hexToOklch(hex: string): OklchColor {
  const rgb = hexToRgb(hex);
  const lab = rgbToOklab(rgb[0], rgb[1], rgb[2]);
  return {
    L: lab[0],
    C: Math.sqrt(lab[1] * lab[1] + lab[2] * lab[2]),
    h: ((Math.atan2(lab[2], lab[1]) * 180) / Math.PI + 360) % 360,
  };
}

export function oklchToHex(L: number, C: number, h: number): string {
  const hr = (h * Math.PI) / 180;
  const rgb = oklabToRgb(L, C * Math.cos(hr), C * Math.sin(hr));
  return rgbToHex(
    Math.max(0, Math.min(1, rgb[0])),
    Math.max(0, Math.min(1, rgb[1])),
    Math.max(0, Math.min(1, rgb[2])),
  );
}

// --- Utility Functions ---

export function getLuminance(hex: string): number {
  const rgb = hexToRgb(hex);
  return (
    0.2126 * srgbToLinear(rgb[0]) +
    0.7152 * srgbToLinear(rgb[1]) +
    0.0722 * srgbToLinear(rgb[2])
  );
}

export function contrastRatio(a: string, b: string): number {
  const l1 = getLuminance(a);
  const l2 = getLuminance(b);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

export function mixColors(a: string, b: string, percent: number): string {
  const ar = hexToRgb(a);
  const br = hexToRgb(b);
  const t = percent / 100;
  return rgbToHex(
    ar[0] + (br[0] - ar[0]) * t,
    ar[1] + (br[1] - ar[1]) * t,
    ar[2] + (br[2] - ar[2]) * t,
  );
}

export function alphaBlend(fg: string, bg: string, alpha: number): string {
  const fr = hexToRgb(fg);
  const br = hexToRgb(bg);
  return rgbToHex(
    fr[0] * alpha + br[0] * (1 - alpha),
    fr[1] * alpha + br[1] * (1 - alpha),
    fr[2] * alpha + br[2] * (1 - alpha),
  );
}

// Returns soft black/white matching the DS neutral scale
// rather than harsh pure black/white — still >19:1 contrast range
export function autoTextColor(bg: string): string {
  const light = GRAY[50];  // #fafafa
  const dark = GRAY[900];  // #202020
  return contrastRatio(light, bg) > contrastRatio(dark, bg) ? light : dark;
}

// --- WCAG Contrast Functions ---

export function findWcagColor(
  fg: string,
  bg: string,
  ratio: number = 4.5,
): string {
  const lch = hexToOklch(fg);
  const startL = lch.L;
  const C = lch.C;
  const h = lch.h;
  const candidates: { hex: string; distance: number }[] = [];

  // Search lighter
  for (let L = startL; L <= 1; L += 0.01) {
    const x = oklchToHex(L, C, h);
    if (contrastRatio(x, bg) >= ratio) {
      candidates.push({ hex: x, distance: Math.abs(L - startL) });
      break;
    }
  }

  // Search darker
  for (let L = startL; L >= 0; L -= 0.01) {
    const x = oklchToHex(L, C, h);
    if (contrastRatio(x, bg) >= ratio) {
      candidates.push({ hex: x, distance: Math.abs(L - startL) });
      break;
    }
  }

  if (candidates.length) {
    candidates.sort((a, b) => a.distance - b.distance);
    return candidates[0].hex;
  }

  return hexToOklch(bg).L > 0.5 ? '#000000' : '#ffffff';
}

export function ensureContrast(
  color: string,
  bg: string,
  min: number = 4.5,
): string {
  if (contrastRatio(color, bg) >= min) return color;
  return findWcagColor(color, bg, min);
}

// --- Ramp Generation ---

export function generateRamp(hex: string): ColorRamp {
  const lch = hexToOklch(hex);
  const C = lch.C;
  const h = lch.h;
  return {
    50: oklchToHex(0.98, C * 0.08, h),
    100: oklchToHex(0.96, C * 0.12, h),
    200: oklchToHex(0.88, C * 0.22, h),
    300: oklchToHex(0.8, C * 0.3, h),
    500: hex,
    700: oklchToHex(0.4, C * 0.7, h),
    800: oklchToHex(0.32, C * 0.65, h),
    900: oklchToHex(0.23, C * 0.45, h),
    950: oklchToHex(0.18, C * 0.35, h),
  };
}

export function generateRamps(seeds: SeedColors): Ramps {
  return {
    brand: generateRamp(seeds.B),
    acc1: generateRamp(seeds.A),
    acc2: generateRamp(seeds.C),
  };
}

// --- Constants ---

// Neutral scale — aligned 1:1 with Wander DS neutral tokens
export const GRAY: ColorRamp = {
  0: '#ffffff',
  50: '#fafafa',
  100: '#f0f0f0',
  150: '#eaeaea',
  200: '#d1d1d1',
  300: '#c5c5c5',
  450: '#8e8e8e',
  550: '#636363',
  700: '#4a4a4a',
  800: '#323232',
  850: '#282828',
  900: '#202020',
  950: '#151515',
  1000: '#000000',
};

export const STATUS_COLORS = {
  error: '#fc624c',
  success: '#22c55e',
  warning: '#f97316',
  info: '#3b82f6',
} as const;

export const PRESETS: Record<string, SeedColors> = {
  'Claude.ai': { A: '#E07A5F', B: '#3D2117', C: '#D4A87C' },
  'Classic Persian': { A: '#2A8C7A', B: '#D13E30', C: '#1E2A3A' },
  'Pink Navy': { A: '#D4D4D4', B: '#1C2340', C: '#E88DA4' },
  'Mauve Garden': { A: '#998088', B: '#1E6B3A', C: '#5A3E6C' },
  'Wander': { A: '#000000', B: '#000000', C: '#000000' },
  'Electric Clash': { A: '#2755E0', B: '#2C124A', C: '#C8D830' },
  'Ocean Calm': { A: '#1A6B8A', B: '#0F2B3C', C: '#7EC8C8' },
  'Sunset Warmth': { A: '#D4603A', B: '#3A1520', C: '#F5C84C' },
  'Forest Dew': { A: '#5B8A3C', B: '#1A2E12', C: '#A8D8A0' },
  'Coral Reef': { A: '#E06B5E', B: '#2A1B18', C: '#5EC8B0' },
  'Signal Pop': { A: '#38BDF8', B: '#E63946', C: '#A8D930' },
  'Heritage': { A: '#8A7250', B: '#2C3F3E', C: '#695840' },
};

export const ALL_ROLES: RoleInfo[] = [
  { id: 'white', label: 'White', group: 'Neutral' },
  { id: 'black', label: 'Black', group: 'Neutral' },
  { id: 'theme-light', label: 'Thm lt', group: 'Theme' },
  { id: 'theme-tint', label: 'Thm tnt', group: 'Theme' },
  { id: 'theme-solid', label: 'Thm', group: 'Theme' },
  { id: 'theme-dark', label: 'Thm dk', group: 'Theme' },
  { id: 'acc1-light', label: 'A1 lt', group: 'Accent 1' },
  { id: 'acc1-tint', label: 'A1 tnt', group: 'Accent 1' },
  { id: 'acc1-solid', label: 'A1', group: 'Accent 1' },
  { id: 'acc2-light', label: 'A2 lt', group: 'Accent 2' },
  { id: 'acc2-tint', label: 'A2 tnt', group: 'Accent 2' },
  { id: 'acc2-solid', label: 'A2', group: 'Accent 2' },
  { id: 'acc2-dark', label: 'A2 dk', group: 'Accent 2' },
];

export const ROLE_GROUPS = ['Neutral', 'Theme', 'Accent 1', 'Accent 2'] as const;

export const SECTION_NAMES = [
  'Hero',
  'Features',
  'Testimonials',
  'Gallery',
  'CTA',
  'Footer',
] as const;

export const LAYOUT_TEMPLATES: Record<string, SectionConfig[]> = {
  'Alternating light': [
    { role: 'theme-dark', img: true },
    { role: 'white' },
    { role: 'theme-light' },
    { role: 'white' },
    { role: 'theme-solid' },
    { role: 'theme-dark' },
  ],
  'Bold accent': [
    { role: 'acc1-solid', img: true },
    { role: 'white' },
    { role: 'acc2-light' },
    { role: 'theme-light' },
    { role: 'acc2-dark' },
    { role: 'black' },
  ],
  'Warm gradient': [
    { role: 'theme-light' },
    { role: 'white' },
    { role: 'acc1-light' },
    { role: 'acc1-solid' },
    { role: 'acc2-solid' },
    { role: 'theme-dark' },
  ],
  'Photo heavy': [
    { role: 'theme-dark', img: true },
    { role: 'theme-light' },
    { role: 'white', img: true },
    { role: 'acc1-light', img: true },
    { role: 'theme-solid', img: true },
    { role: 'black' },
  ],
  'Mono elegant': [
    { role: 'black', img: true },
    { role: 'white' },
    { role: 'theme-light' },
    { role: 'white' },
    { role: 'theme-solid' },
    { role: 'black' },
  ],
  'Multi-hue': [
    { role: 'acc1-solid' },
    { role: 'acc2-light' },
    { role: 'theme-light' },
    { role: 'acc1-light' },
    { role: 'acc2-solid' },
    { role: 'theme-dark' },
  ],
};

export const EXPORT_MODES: { id: BackgroundRole; label: string }[] = [
  { id: 'white', label: 'White' },
  { id: 'theme-light', label: 'Theme Light' },
  { id: 'theme-tint', label: 'Theme Tint' },
  { id: 'theme-solid', label: 'Theme Solid' },
  { id: 'theme-dark', label: 'Theme Dark' },
  { id: 'acc1-light', label: 'Accent1 Light' },
  { id: 'acc1-tint', label: 'Accent1 Tint' },
  { id: 'acc1-solid', label: 'Accent1 Solid' },
  { id: 'acc2-light', label: 'Accent2 Light' },
  { id: 'acc2-tint', label: 'Accent2 Tint' },
  { id: 'acc2-solid', label: 'Accent2 Solid' },
  { id: 'acc2-dark', label: 'Accent2 Dark' },
  { id: 'black', label: 'Black' },
];

// --- Role Resolution ---

const ROLE_MAP: Record<
  BackgroundRole,
  { collection: 'gray' | 'brand' | 'acc1' | 'acc2'; stop: number }
> = {
  white: { collection: 'gray', stop: 0 },
  black: { collection: 'gray', stop: 1000 },
  'theme-light': { collection: 'brand', stop: 50 },
  'theme-tint': { collection: 'brand', stop: 100 },
  'theme-solid': { collection: 'brand', stop: 500 },
  'theme-dark': { collection: 'brand', stop: 800 },
  'acc1-light': { collection: 'acc1', stop: 50 },
  'acc1-tint': { collection: 'acc1', stop: 100 },
  'acc1-solid': { collection: 'acc1', stop: 500 },
  'acc2-light': { collection: 'acc2', stop: 50 },
  'acc2-tint': { collection: 'acc2', stop: 100 },
  'acc2-solid': { collection: 'acc2', stop: 500 },
  'acc2-dark': { collection: 'acc2', stop: 800 },
};

export function resolveRole(role: BackgroundRole, ramps: Ramps): string {
  const def = ROLE_MAP[role];
  if (!def) return '#888888';
  const ramp =
    def.collection === 'gray' ? GRAY : ramps[def.collection as keyof Ramps];
  return ramp?.[def.stop] ?? '#888888';
}

// --- Token Resolution ---

export function resolveTokens(
  bg: string,
  fg: string,
  accent: string,
  brand: string,
): ResolvedTokens {
  const isLight = hexToOklch(bg).L > 0.5;

  // Surface mixing uses pure black/white for precise neutral steps
  // that align 1:1 with the DS neutral scale (Wander preset)
  const surfaceFg = isLight ? '#000000' : '#ffffff';

  // Mode-dependent surface percentages — tuned to produce exact DS neutral
  // values when bg is white/black: #f7f7f7, #f0f0f0, #eaeaea (light)
  // and #151515, #202020, #323232 (dark)
  const sp = isLight
    ? { s: 3.14, t: 5.88, q: 8.24 }
    : { s: 8.24, t: 12.55, q: 19.61 };

  // When brand/accent is nearly invisible against bg (< 2:1 contrast),
  // use the pure opposite (black/white) — this produces the DS behavior
  // where primary button flips black↔white between light/dark modes
  const pureOpposite = isLight ? '#000000' : '#ffffff';
  const safeBrand =
    contrastRatio(brand, bg) >= 3
      ? brand
      : contrastRatio(brand, bg) < 2
        ? pureOpposite
        : findWcagColor(brand, bg, 3);
  const safeAccent =
    contrastRatio(accent, bg) >= 3
      ? accent
      : contrastRatio(accent, bg) < 2
        ? pureOpposite
        : findWcagColor(accent, bg, 3);
  const overlayAlpha = isLight ? 0.15 : 0.25;
  const overlay = `rgba(0,0,0,${overlayAlpha})`;
  const overlayEffective = alphaBlend('#000000', bg, overlayAlpha);

  return {
    surface: {
      Primary: bg,
      Secondary: mixColors(bg, surfaceFg, sp.s),
      Tertiary: mixColors(bg, surfaceFg, sp.t),
      Quaternary: mixColors(bg, surfaceFg, sp.q),
      Modal: isLight ? bg : mixColors(bg, surfaceFg, sp.s),
      Tooltip: mixColors(surfaceFg, bg, 5),
      Input: isLight ? mixColors(bg, surfaceFg, sp.s) : alphaBlend(surfaceFg, bg, 0.1),
      Toast: isLight ? bg : mixColors(bg, surfaceFg, sp.t),
      Dropdown: isLight ? bg : mixColors(bg, surfaceFg, sp.t),
      // Searchbar: base → selected → hover → trigger-selected
      // must be ascending elevation (lighter on dark, darker on light)
      Searchbar: isLight ? bg : mixColors(bg, surfaceFg, sp.t),
      'Searchbar-selected': isLight ? mixColors(bg, surfaceFg, sp.s) : mixColors(bg, surfaceFg, sp.t),
      'Searchbar-trigger-hover': isLight ? mixColors(bg, surfaceFg, sp.t) : mixColors(bg, surfaceFg, sp.q),
      'Searchbar-trigger-selected': isLight ? mixColors(bg, surfaceFg, sp.q) : mixColors(bg, surfaceFg, 25),
      'Toggle select': isLight ? bg : mixColors(bg, surfaceFg, sp.q),
      Card: bg,
      Slider: isLight ? bg : mixColors(bg, surfaceFg, sp.s),
      'Image-overlay': overlay,
      'Image-overlay-effective': overlayEffective,
    },
    text: {
      Primary: ensureContrast(fg, bg, 7),
      // Text mix percentages tuned per mode to match DS neutral scale:
      // light: #636363 (Neutral-550), dark: #8e8e8e (Neutral-450)
      Secondary: ensureContrast(
        isLight ? mixColors(fg, bg, 30) : mixColors(fg, bg, 42.5),
        bg,
        5.5,
      ),
      Tertiary: ensureContrast(
        isLight ? mixColors(fg, bg, 50) : mixColors(fg, bg, 54),
        bg,
        4.5,
      ),
      Muted: ensureContrast(mixColors(fg, bg, 70), bg, 3.5),
      Destructive: ensureContrast(STATUS_COLORS.error, bg, 4.5),
      Link: ensureContrast(STATUS_COLORS.info, bg, 4.5),
      Inverse: bg,
    },
    button: {
      Primary: safeBrand,
      Checkout: safeAccent,
      Secondary: mixColors(bg, surfaceFg, isLight ? sp.t : 15.69),
      Outlined: 'transparent',
      Disabled: mixColors(bg, surfaceFg, 20),
      Ghost: 'transparent',
      Destructive: alphaBlend(STATUS_COLORS.error, bg, 0.16),
      Slider: isLight ? bg : mixColors(bg, surfaceFg, sp.s),
    },
    buttonHover: {
      Primary: mixColors(safeBrand, fg, 15),
      Checkout: mixColors(safeAccent, fg, 12),
      Secondary: mixColors(bg, surfaceFg, isLight ? sp.q : sp.q),
      Outlined: mixColors(bg, surfaceFg, isLight ? sp.t : sp.t),
      Disabled: mixColors(bg, surfaceFg, 20),
      Ghost: mixColors(bg, surfaceFg, isLight ? sp.t : sp.t),
      Destructive: alphaBlend(STATUS_COLORS.error, bg, 0.22),
      Slider: mixColors(bg, surfaceFg, sp.s),
    },
    buttonText: {
      Primary: autoTextColor(safeBrand),
      Checkout: autoTextColor(safeAccent),
      Secondary: ensureContrast(fg, mixColors(bg, surfaceFg, sp.t), 4.5),
      Outlined: ensureContrast(fg, bg, 4.5),
      Disabled: mixColors(bg, surfaceFg, 40),
      Ghost: ensureContrast(fg, bg, 4.5),
      Destructive: autoTextColor(alphaBlend(STATUS_COLORS.error, bg, 0.16)),
    },
    border: {
      // Borders use pure black/white at alpha — matches DS exactly
      Primary: alphaBlend(surfaceFg, bg, 0.05),
      Secondary: alphaBlend(surfaceFg, bg, 0.08),
      Tertiary: alphaBlend(surfaceFg, bg, 0.18),
      // Overlay borders are always white-based — gives components (dropdowns, popovers)
      // definition on any background, especially darker modes
      'Overlay-Primary': alphaBlend('#ffffff', bg, 0.1),
      'Overlay-Secondary': alphaBlend('#ffffff', bg, 0.14),
      Selected: fg,
      Blue: STATUS_COLORS.info,
    },
    states: {
      Error: STATUS_COLORS.error,
      'Error-subtle': alphaBlend(STATUS_COLORS.error, bg, 0.1),
      Success: STATUS_COLORS.success,
      'Success-subtle': alphaBlend(STATUS_COLORS.success, bg, 0.1),
      Warning: STATUS_COLORS.warning,
      'Warning-subtle': alphaBlend(STATUS_COLORS.warning, bg, 0.1),
      Info: STATUS_COLORS.info,
      'Info-subtle': alphaBlend(STATUS_COLORS.info, bg, 0.1),
    },
  };
}

// Resolve tokens for a given background role
export function resolveRoleTokens(
  role: BackgroundRole,
  ramps: Ramps,
): { bg: string; fg: string; tokens: ResolvedTokens } {
  const bg = resolveRole(role, ramps);
  const isLight = hexToOklch(bg).L > 0.55;
  // Text fg uses soft black/white from DS neutral scale
  const fg = isLight ? GRAY[900] : GRAY[50];
  const tokens = resolveTokens(bg, fg, ramps.acc1[500], ramps.brand[500]);
  return { bg, fg, tokens };
}

// Resolve section tokens (handles image overlay)
export function resolveSectionTokens(
  section: SectionConfig,
  ramps: Ramps,
): { bg: string; effectiveBg: string; fg: string; tokens: ResolvedTokens; ratio: number } {
  const rawBg = resolveRole(section.role, ramps);
  const isLight = hexToOklch(rawBg).L > 0.55;
  const rawFg = isLight ? GRAY[900] : GRAY[50];
  const preTokens = resolveTokens(rawBg, rawFg, ramps.acc1[500], ramps.brand[500]);

  const effectiveBg = section.img
    ? preTokens.surface['Image-overlay-effective']
    : rawBg;
  const eIsLight = hexToOklch(effectiveBg).L > 0.55;
  const eFg = eIsLight ? GRAY[900] : GRAY[50];
  const tokens = section.img
    ? resolveTokens(effectiveBg, eFg, ramps.acc1[500], ramps.brand[500])
    : preTokens;

  // When bg-image is active, boost all text to Primary for contrast safety
  // Images have unpredictable light/dark areas — dimmed text becomes unreadable
  if (section.img) {
    tokens.text.Secondary = tokens.text.Primary;
    tokens.text.Tertiary = tokens.text.Primary;
    tokens.text.Muted = tokens.text.Secondary;
  }

  const ratio = contrastRatio(tokens.text.Primary, effectiveBg);

  return { bg: rawBg, effectiveBg, fg: eFg, tokens, ratio };
}

// --- Nav Token Resolution ---

export interface NavTokens {
  bg: string;
  bgBlur: string; // frosted-glass fallback (hero bg at ~60% over overlay)
  text: string;
  textSecondary: string;
  border: string;
  ctaBg: string;
  ctaHover: string;
  ctaText: string;
  isTransparent: boolean;
}

/**
 * Resolves nav/header tokens from the hero section context.
 * - Hero has bg-image → nav is transparent, text contrasts against overlay
 * - Hero has no image → nav takes hero bg, uses hero tokens
 */
export function resolveNavTokens(
  heroSection: SectionConfig,
  ramps: Ramps,
): NavTokens {
  const { bg: heroBg, effectiveBg, tokens: heroTokens } =
    resolveSectionTokens(heroSection, ramps);

  const isTransparent = heroSection.img === true;

  // When transparent, a subtle frosted-glass tint helps legibility
  // without breaking the hero image feel
  const bgBlur = isTransparent
    ? alphaBlend(heroBg, effectiveBg, 0.5)
    : heroBg;

  return {
    bg: isTransparent ? 'transparent' : heroBg,
    bgBlur,
    text: heroTokens.text.Primary,
    textSecondary: heroTokens.text.Secondary,
    border: isTransparent
      ? heroTokens.border.Primary
      : heroTokens.border.Secondary,
    ctaBg: heroTokens.button.Primary,
    ctaHover: heroTokens.buttonHover.Primary,
    ctaText: heroTokens.buttonText.Primary,
    isTransparent,
  };
}

// --- Export Helpers ---

export function generateExportJSON(
  seeds: SeedColors,
  ramps: Ramps,
): object {
  const primitives: Record<string, string> = {};
  const modes: Record<string, Record<string, string>> = {};

  const rampNames: [keyof Ramps, string][] = [
    ['brand', 'Brand'],
    ['acc1', 'Accent'],
    ['acc2', 'SeedC'],
  ];

  for (const [key, name] of rampNames) {
    for (const [stop, value] of Object.entries(ramps[key])) {
      primitives[`Color.${name}.${stop}`] = value;
    }
  }

  for (const mode of EXPORT_MODES) {
    const { tokens } = resolveRoleTokens(mode.id, ramps);
    const modeTokens: Record<string, string> = {};

    const categories: [string, Record<string, string>][] = [
      ['Background.Surface', tokens.surface],
      ['Text', tokens.text],
      ['Button', tokens.button],
      ['Button.Hover', tokens.buttonHover],
      ['ButtonText', tokens.buttonText],
      ['Border', tokens.border],
      ['States', tokens.states],
    ];

    for (const [prefix, values] of categories) {
      for (const [name, value] of Object.entries(values)) {
        modeTokens[`${prefix}.${name}`] = value;
      }
    }

    modes[mode.label] = modeTokens;
  }

  return { seeds, primitives, modes };
}

export function generateExportCSS(ramps: Ramps): string {
  const lines: string[] = [];

  for (const mode of EXPORT_MODES) {
    const { tokens } = resolveRoleTokens(mode.id, ramps);
    lines.push(`/* ${mode.label} */`);
    lines.push(`[data-theme="${mode.id}"] {`);

    const allTokens: Record<string, Record<string, string>> = {
      surface: tokens.surface,
      text: tokens.text,
      button: tokens.button,
      'button-hover': tokens.buttonHover,
      'button-text': tokens.buttonText,
      border: tokens.border,
      states: tokens.states,
    };

    for (const [category, values] of Object.entries(allTokens)) {
      for (const [name, value] of Object.entries(values)) {
        const varName = `--${category}-${name.replace(/\s+/g, '-').toLowerCase()}`;
        lines.push(`  ${varName}: ${value};`);
      }
    }

    lines.push('}');
    lines.push('');
  }

  return lines.join('\n');
}

// --- Figma Tokens Export (W3C DTCG / Tokens Studio format) ---

function figmaToken(value: string) {
  const figmaValue = value === 'transparent' ? '#00000000' : value;
  return {
    $value: figmaValue,
    $type: 'color' as const,
  };
}

// All background roles with human-readable labels for Figma mode names
const FIGMA_MODES: { role: BackgroundRole; label: string }[] = [
  { role: 'white', label: 'White' },
  { role: 'black', label: 'Black' },
  { role: 'theme-light', label: 'Theme Light' },
  { role: 'theme-tint', label: 'Theme Tint' },
  { role: 'theme-solid', label: 'Theme Solid' },
  { role: 'theme-dark', label: 'Theme Dark' },
  { role: 'acc1-light', label: 'Accent1 Light' },
  { role: 'acc1-tint', label: 'Accent1 Tint' },
  { role: 'acc1-solid', label: 'Accent1 Solid' },
  { role: 'acc2-light', label: 'Accent2 Light' },
  { role: 'acc2-tint', label: 'Accent2 Tint' },
  { role: 'acc2-solid', label: 'Accent2 Solid' },
  { role: 'acc2-dark', label: 'Accent2 Dark' },
];

export function generateFigmaTokens(
  seeds: SeedColors,
  ramps: Ramps,
): object {
  // Build primitive Color collections
  const colorPrimitives: Record<string, Record<string, unknown>> = {};

  // Gray (shared)
  colorPrimitives.Gray = {};
  for (const [stop, hex] of Object.entries(GRAY)) {
    colorPrimitives.Gray[stop] = figmaToken(hex);
  }

  // Brand ramp
  colorPrimitives.Brand = {};
  for (const [stop, hex] of Object.entries(ramps.brand)) {
    colorPrimitives.Brand[stop] = figmaToken(hex);
  }

  // Accent ramp
  colorPrimitives.Accent = {};
  for (const [stop, hex] of Object.entries(ramps.acc1)) {
    colorPrimitives.Accent[stop] = figmaToken(hex);
  }

  // SeedC ramp
  colorPrimitives.SeedC = {};
  for (const [stop, hex] of Object.entries(ramps.acc2)) {
    colorPrimitives.SeedC[stop] = figmaToken(hex);
  }

  // Status colors
  colorPrimitives.States = {
    Error: figmaToken(STATUS_COLORS.error),
    Success: figmaToken(STATUS_COLORS.success),
    Warning: figmaToken(STATUS_COLORS.warning),
    Link: figmaToken(STATUS_COLORS.info),
  };

  // Build a mode object from resolved tokens
  function buildMode(tokens: ResolvedTokens) {
    return {
      Background: {
        Surface: {
          Primary: figmaToken(tokens.surface.Primary),
          Secondary: figmaToken(tokens.surface.Secondary),
          Tertiary: figmaToken(tokens.surface.Tertiary),
          Quaternary: figmaToken(tokens.surface.Quaternary),
          Modal: figmaToken(tokens.surface.Modal),
          Tooltip: figmaToken(tokens.surface.Tooltip),
          Input: figmaToken(tokens.surface.Input),
          Toast: figmaToken(tokens.surface.Toast),
          'Toggle select': figmaToken(tokens.surface['Toggle select']),
          Dropdown: figmaToken(tokens.surface.Dropdown),
          Searchbar: figmaToken(tokens.surface.Searchbar),
          'Searchbar-selected': figmaToken(tokens.surface['Searchbar-selected']),
          'Searchbar-trigger-hover': figmaToken(tokens.surface['Searchbar-trigger-hover']),
          'Searchbar-trigger-selected': figmaToken(tokens.surface['Searchbar-trigger-selected']),
        },
      },
      Border: {
        Primary: figmaToken(tokens.border.Primary),
        Secondary: figmaToken(tokens.border.Secondary),
        Tertiary: figmaToken(tokens.border.Tertiary),
        Selected: figmaToken(tokens.border.Selected),
        'Overlay-Primary': figmaToken(tokens.border['Overlay-Primary']),
        'Overlay-Secondary': figmaToken(tokens.border['Overlay-Secondary']),
        Blue: figmaToken(tokens.border.Blue),
      },
      Text: {
        Primary: figmaToken(tokens.text.Primary),
        Secondary: figmaToken(tokens.text.Secondary),
        Tertiary: figmaToken(tokens.text.Tertiary),
        Muted: figmaToken(tokens.text.Muted),
        Destructive: figmaToken(tokens.text.Destructive),
        Link: figmaToken(tokens.text.Link),
        Inverse: figmaToken(tokens.text.Inverse),
      },
      'Button Text': {
        Primary: figmaToken(tokens.buttonText.Primary),
        Checkout: figmaToken(tokens.buttonText.Checkout),
        Secondary: figmaToken(tokens.buttonText.Secondary),
        Outlined: figmaToken(tokens.buttonText.Outlined),
        Disabled: figmaToken(tokens.buttonText.Disabled),
        Ghost: figmaToken(tokens.buttonText.Ghost),
        Destructive: figmaToken(tokens.buttonText.Destructive),
      },
      Button: {
        Primary: figmaToken(tokens.button.Primary),
        Checkout: figmaToken(tokens.button.Checkout),
        Secondary: figmaToken(tokens.button.Secondary),
        Outlined: figmaToken(tokens.button.Outlined),
        Ghost: figmaToken(tokens.button.Ghost),
        Disabled: figmaToken(tokens.button.Disabled),
        Destructive: figmaToken(tokens.button.Destructive),
        Slider: figmaToken(tokens.button.Slider),
        Hover: {
          Primary: figmaToken(tokens.buttonHover.Primary),
          Checkout: figmaToken(tokens.buttonHover.Checkout),
          Secondary: figmaToken(tokens.buttonHover.Secondary),
          Outlined: figmaToken(tokens.buttonHover.Outlined),
          Ghost: figmaToken(tokens.buttonHover.Ghost),
          Disabled: figmaToken(tokens.buttonHover.Disabled),
          Destructive: figmaToken(tokens.buttonHover.Destructive),
          Slider: figmaToken(tokens.buttonHover.Slider),
        },
      },
      States: {
        Error: figmaToken(tokens.states.Error),
        'Error-subtle': figmaToken(tokens.states['Error-subtle']),
        Success: figmaToken(tokens.states.Success),
        'Success-subtle': figmaToken(tokens.states['Success-subtle']),
        Warning: figmaToken(tokens.states.Warning),
        'Warning-subtle': figmaToken(tokens.states['Warning-subtle']),
        Info: figmaToken(tokens.states.Info),
        'Info-subtle': figmaToken(tokens.states['Info-subtle']),
      },
      Color: colorPrimitives,
    };
  }

  // Generate all 18 modes
  const result: Record<string, unknown> = {};

  for (const mode of FIGMA_MODES) {
    const { tokens } = resolveRoleTokens(mode.role, ramps);
    result[`Colors/${mode.label}`] = buildMode(tokens);
  }

  return result;
}

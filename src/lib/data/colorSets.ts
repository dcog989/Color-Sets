import type { Colordx } from '@colordx/core';
import { colordx, extend } from '@colordx/core';
import names from '@colordx/core/plugins/names';

extend([names]);

function getLuminance(instance: Colordx): number {
  const { r, g, b } = instance.toRgb();
  const linearize = (c: number) => {
    const n = c / 255;
    return n <= 0.04045 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4;
  };
  return Number((0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b)).toFixed(4));
}

type SetModule = {
  id: string;
  title: string;
  useNameAsBg: boolean;
  colors: Record<string, string>;
};

export type SetManifestEntry = {
  id: string;
  title: string;
  useNameAsBg: boolean;
};

export type ProcessedColor = {
  name: string;
  instance: Colordx;
  hue: number;
  saturation: number;
  lightness: number;
  luminance: number;
  chroma: number;
};

export const SET_MANIFEST: SetManifestEntry[] = [
  { id: 'bootstrapList', title: 'Bootstrap', useNameAsBg: false },
  { id: 'catppuccinFrappe', title: 'Catppuccin Frappé', useNameAsBg: false },
  { id: 'catppuccinLatte', title: 'Catppuccin Latte', useNameAsBg: false },
  { id: 'catppuccinMacchiato', title: 'Catppuccin Macchiato', useNameAsBg: false },
  { id: 'catppuccinMocha', title: 'Catppuccin Mocha', useNameAsBg: false },
  { id: 'colorList', title: 'CSS Named Colors', useNameAsBg: true },
  { id: 'draculaList', title: 'Dracula', useNameAsBg: false },
  { id: 'farrow-ball', title: 'Farrow & Ball', useNameAsBg: false },
  { id: 'primerList', title: 'GitHub Primer', useNameAsBg: false },
  { id: 'gruvboxList', title: 'Gruvbox', useNameAsBg: false },
  { id: 'materialList', title: 'Material Design', useNameAsBg: false },
  { id: 'nordList', title: 'Nord', useNameAsBg: false },
  { id: 'oneDarkList', title: 'One Dark', useNameAsBg: false },
  { id: 'oneLightList', title: 'One Light', useNameAsBg: false },
  { id: 'pantone-uncoated', title: 'Pantone Uncoated', useNameAsBg: false },
  { id: 'pantone', title: 'Pantone Coated', useNameAsBg: false },
  { id: 'ral-classic', title: 'RAL Classic', useNameAsBg: false },
  { id: 'resistorColorList', title: 'Resistor Color Code', useNameAsBg: false },
  { id: 'solarizedList', title: 'Solarized', useNameAsBg: false },
  { id: 'tableauColorList', title: 'Tableau 20', useNameAsBg: false },
  { id: 'tailwindColorList', title: 'Tailwind CSS v4', useNameAsBg: false },
  { id: 'tokyoNightList', title: 'Tokyo Night', useNameAsBg: false },
  { id: 'powershellColorList', title: 'Windows Terminal', useNameAsBg: false },
  { id: 'xtermColorList', title: 'xterm-256', useNameAsBg: false },
].sort((a, b) => a.title.localeCompare(b.title));

const setLoaders = import.meta.glob<SetModule>('./sets/*.json', {
  eager: false,
  import: 'default',
});

const idToFile: Record<string, string> = {
  bootstrapList: 'bootstrap',
  catppuccinFrappe: 'catppuccin-frappe',
  catppuccinLatte: 'catppuccin-latte',
  catppuccinMacchiato: 'catppuccin-macchiato',
  catppuccinMocha: 'catppuccin-mocha',
  colorList: 'css-named-colors',
  draculaList: 'dracula',
  'farrow-ball': 'farrow-ball',
  primerList: 'github-primer',
  gruvboxList: 'gruvbox',
  materialList: 'material-design',
  nordList: 'nord',
  oneDarkList: 'one-dark',
  oneLightList: 'one-light',
  'pantone-uncoated': 'pantone-uncoated',
  pantone: 'pantone',
  'ral-classic': 'ral-classic',
  resistorColorList: 'resistor-color-code',
  solarizedList: 'solarized',
  tableauColorList: 'tableau-20',
  tailwindColorList: 'tailwind-v4',
  tokyoNightList: 'tokyo-night',
  powershellColorList: 'windows-terminal',
  xtermColorList: 'xterm-256',
};

const loadedData = new Map<string, Record<string, string>>();

export async function loadSetData(id: string): Promise<Record<string, string> | null> {
  const cached = loadedData.get(id);
  if (cached) return cached;

  const file = idToFile[id];
  if (!file) return null;

  const key = `./sets/${file}.json`;
  const loader = setLoaders[key];
  if (!loader) return null;

  const mod = await loader();
  if (!mod?.colors) return null;

  loadedData.set(id, mod.colors);
  return mod.colors;
}

export function processColorSet(colorObject: Record<string, string>, nameIsColor = false): ProcessedColor[] {
  return Object.entries(colorObject).flatMap(([name, value]) => {
    const instance = colordx(nameIsColor ? name : value);
    if (!instance.isValid()) return [];

    const hsl = instance.toHsl();
    const luminance = getLuminance(instance);
    const oklch = instance.toOklch();
    let effectiveSortHue = -1;
    if (hsl.s > 0) effectiveSortHue = Number.isNaN(hsl.h) ? 0 : hsl.h;

    return {
      name,
      instance,
      hue: effectiveSortHue,
      saturation: hsl.s,
      lightness: hsl.l,
      luminance,
      chroma: oklch.c,
    };
  });
}

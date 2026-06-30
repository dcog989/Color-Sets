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

export type ProcessedColor = {
  name: string;
  instance: Colordx;
  hue: number;
  saturation: number;
  lightness: number;
  luminance: number;
  chroma: number;
};

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

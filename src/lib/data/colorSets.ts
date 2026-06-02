import type { Colordx } from '@colordx/core';
import { colordx, extend } from '@colordx/core';
import a11y from '@colordx/core/plugins/a11y';
import { SET_MANIFEST } from './manifest';

extend([a11y]);

type SetModule = {
    id: string;
    title: string;
    useNameAsBg: boolean;
    colors: Record<string, string>;
};

const modules = import.meta.glob('./sets/*.json');

export type ProcessedColor = {
    name: string;
    instance: Colordx;
    hue: number;
    saturation: number;
    lightness: number;
    luminance: number;
};

export function processColorSet(
    colorObject: Record<string, string>,
    nameIsColor = false,
): ProcessedColor[] {
    return Object.entries(colorObject).flatMap(([name, value]) => {
        const instance = colordx(nameIsColor ? name : value);
        if (!instance.isValid()) return [];

        const hsl = instance.toHsl();
        const luminance = instance.luminance();
        let effectiveSortHue = -1;
        if (hsl.s > 0) effectiveSortHue = Number.isNaN(hsl.h) ? 0 : hsl.h;

        return {
            name,
            instance,
            hue: effectiveSortHue,
            saturation: hsl.s,
            lightness: hsl.l,
            luminance,
        };
    });
}

export async function loadSetData(id: string): Promise<Record<string, string> | null> {
    const entry = SET_MANIFEST.find((m) => m.id === id);
    if (!entry) return null;
    const path = `./sets/${entry.file}`;
    if (!(path in modules)) return null;
    const mod = (await modules[path]()) as { default: SetModule };
    return mod.default.colors;
}

export { SET_MANIFEST };

import type { Colordx } from '@colordx/core';
import { colordx } from '@colordx/core';

function getLuminance(instance: Colordx): number {
    const { r, g, b } = instance.toRgb();
    const linearize = (c: number) => {
        const n = c / 255;
        return n <= 0.04045 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4;
    };
    return Number(
        (0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b)).toFixed(4),
    );
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

const setModules = import.meta.glob<SetModule>('./sets/*.json', {
    eager: true,
    import: 'default',
});

export const SET_MANIFEST: SetManifestEntry[] = Object.entries(setModules)
    .map(([, mod]) => ({
        id: mod.id,
        title: mod.title,
        useNameAsBg: mod.useNameAsBg ?? false,
    }))
    .sort((a, b) => a.title.localeCompare(b.title));

const setDataMap: Record<string, SetModule> = {};
for (const mod of Object.values(setModules)) {
    setDataMap[mod.id] = mod;
}

export function loadSetData(id: string): Record<string, string> | null {
    return setDataMap[id]?.colors ?? null;
}

export function processColorSet(
    colorObject: Record<string, string>,
    nameIsColor = false,
): ProcessedColor[] {
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

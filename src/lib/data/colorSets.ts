import { type Colordx, colordx, extend } from '@colordx/core';
import a11y from '@colordx/core/plugins/a11y';
import names from '@colordx/core/plugins/names';

extend([names, a11y]);

type SetModule = {
    id: string;
    title: string;
    useNameAsBg: boolean;
    colors: Record<string, string>;
};

const modules = import.meta.glob('./sets/*.json', {
    eager: true,
}) as Record<string, SetModule>;

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

export const ALL_SETS = Object.values(modules).map(({ id, title, useNameAsBg, colors }) => ({
    id,
    title,
    data: colors,
    useNameAsBg,
}));

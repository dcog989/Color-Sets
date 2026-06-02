import type { Colordx } from '@colordx/core';

export function formatColor(instance: Colordx, format: string): string {
    switch (format) {
        case 'rgb':
            return instance.toRgbString();
        case 'hsl':
            return instance.toHslString();
        case 'oklch':
            return instance.toOklchString();
        default:
            return instance.toHex();
    }
}

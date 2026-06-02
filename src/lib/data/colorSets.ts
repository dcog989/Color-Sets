import { type Colordx, colordx, extend } from '@colordx/core';
import a11y from '@colordx/core/plugins/a11y';
import names from '@colordx/core/plugins/names';

extend([names, a11y]);

export type ProcessedColor = {
    name: string;
    instance: Colordx;
    hue: number;
    saturation: number;
    lightness: number;
    luminance: number;
};

const CSS_NAMED_COLORS: Record<string, string> = {
    aliceblue: '#f0f8ff',
    antiquewhite: '#faebd7',
    aqua: '#00ffff',
    aquamarine: '#7fffd4',
    azure: '#f0ffff',
    beige: '#f5f5dc',
    bisque: '#ffe4c4',
    black: '#000000',
    blanchedalmond: '#ffebcd',
    blue: '#0000ff',
    blueviolet: '#8a2be2',
    brown: '#a52a2a',
    burlywood: '#deb887',
    cadetblue: '#5f9ea0',
    chartreuse: '#7fff00',
    chocolate: '#d2691e',
    coral: '#ff7f50',
    cornflowerblue: '#6495ed',
    cornsilk: '#fff8dc',
    crimson: '#dc143c',
    cyan: '#00ffff',
    darkblue: '#00008b',
    darkcyan: '#008b8b',
    darkgoldenrod: '#b8860b',
    darkgray: '#a9a9a9',
    darkgreen: '#006400',
    darkgrey: '#a9a9a9',
    darkkhaki: '#bdb76b',
    darkmagenta: '#8b008b',
    darkolivegreen: '#556b2f',
    darkorange: '#ff8c00',
    darkorchid: '#9932cc',
    darkred: '#8b0000',
    darksalmon: '#e9967a',
    darkseagreen: '#8fbc8f',
    darkslateblue: '#483d8b',
    darkslategray: '#2f4f4f',
    darkslategrey: '#2f4f4f',
    darkturquoise: '#00ced1',
    darkviolet: '#9400d3',
    deeppink: '#ff1493',
    deepskyblue: '#00bfff',
    dimgray: '#696969',
    dimgrey: '#696969',
    dodgerblue: '#1e90ff',
    firebrick: '#b22222',
    floralwhite: '#fffaf0',
    forestgreen: '#228b22',
    fuchsia: '#ff00ff',
    gainsboro: '#dcdcdc',
    ghostwhite: '#f8f8ff',
    gold: '#ffd700',
    goldenrod: '#daa520',
    gray: '#808080',
    green: '#008000',
    greenyellow: '#adff2f',
    grey: '#808080',
    honeydew: '#f0fff0',
    hotpink: '#ff69b4',
    indianred: '#cd5c5c',
    indigo: '#4b0082',
    ivory: '#fffff0',
    khaki: '#f0e68c',
    lavender: '#e6e6fa',
    lavenderblush: '#fff0f5',
    lawngreen: '#7cfc00',
    lemonchiffon: '#fffacd',
    lightblue: '#add8e6',
    lightcoral: '#f08080',
    lightcyan: '#e0ffff',
    lightgoldenrodyellow: '#fafad2',
    lightgray: '#d3d3d3',
    lightgreen: '#90ee90',
    lightgrey: '#d3d3d3',
    lightpink: '#ffb6c1',
    lightsalmon: '#ffa07a',
    lightseagreen: '#20b2aa',
    lightskyblue: '#87cefa',
    lightslategray: '#778899',
    lightslategrey: '#778899',
    lightsteelblue: '#b0c4de',
    lightyellow: '#ffffe0',
    lime: '#00ff00',
    limegreen: '#32cd32',
    linen: '#faf0e6',
    magenta: '#ff00ff',
    maroon: '#800000',
    mediumaquamarine: '#66cdaa',
    mediumblue: '#0000cd',
    mediumorchid: '#ba55d3',
    mediumpurple: '#9370db',
    mediumseagreen: '#3cb371',
    mediumslateblue: '#7b68ee',
    mediumspringgreen: '#00fa9a',
    mediumturquoise: '#48d1cc',
    mediumvioletred: '#c71585',
    midnightblue: '#191970',
    mintcream: '#f5fffa',
    mistyrose: '#ffe4e1',
    moccasin: '#ffe4b5',
    navajowhite: '#ffdead',
    navy: '#000080',
    oldlace: '#fdf5e6',
    olive: '#808000',
    olivedrab: '#6b8e23',
    orange: '#ffa500',
    orangered: '#ff4500',
    orchid: '#da70d6',
    palegoldenrod: '#eee8aa',
    palegreen: '#98fb98',
    paleturquoise: '#afeeee',
    palevioletred: '#db7093',
    papayawhip: '#ffefd5',
    peachpuff: '#ffdab9',
    peru: '#cd853f',
    pink: '#ffc0cb',
    plum: '#dda0dd',
    powderblue: '#b0e0e6',
    purple: '#800080',
    rebeccapurple: '#663399',
    red: '#ff0000',
    rosybrown: '#bc8f8f',
    royalblue: '#4169e1',
    saddlebrown: '#8b4513',
    salmon: '#fa8072',
    sandybrown: '#f4a460',
    seagreen: '#2e8b57',
    seashell: '#fff5ee',
    sienna: '#a0522d',
    silver: '#c0c0c0',
    skyblue: '#87ceeb',
    slateblue: '#6a5acd',
    slategray: '#708090',
    slategrey: '#708090',
    snow: '#fffafa',
    springgreen: '#00ff7f',
    steelblue: '#4682b4',
    tan: '#d2b48c',
    teal: '#008080',
    thistle: '#d8bfd8',
    tomato: '#ff6347',
    turquoise: '#40e0d0',
    violet: '#ee82ee',
    wheat: '#f5deb3',
    white: '#ffffff',
    whitesmoke: '#f5f5f5',
    yellow: '#ffff00',
    yellowgreen: '#9acd32',
};

const powershellColors = {
    Black: '#000000',
    DarkBlue: '#000080',
    DarkGreen: '#008000',
    DarkCyan: '#008080',
    DarkRed: '#800000',
    DarkMagenta: '#800080',
    DarkYellow: '#808000',
    Gray: '#c0c0c0',
    DarkGray: '#808080',
    Blue: '#0000ff',
    Green: '#00ff00',
    Cyan: '#00ffff',
    Red: '#ff0000',
    Magenta: '#ff00ff',
    Yellow: '#ffff00',
    White: '#ffffff',
};

const tailwindColors = {
    slate: '#64748b',
    gray: '#6b7280',
    zinc: '#71717a',
    neutral: '#737373',
    stone: '#78716c',
    red: '#ef4444',
    orange: '#f97316',
    amber: '#f59e0b',
    yellow: '#eab308',
    lime: '#84cc16',
    green: '#22c55e',
    emerald: '#10b981',
    teal: '#14b8a6',
    cyan: '#06b6d4',
    sky: '#0ea5e9',
    blue: '#3b82f6',
    indigo: '#6366f1',
    violet: '#8b5cf6',
    purple: '#a855f7',
    fuchsia: '#d946ef',
    pink: '#ec4899',
    rose: '#f43f5e',
};

const tableau20Colors = {
    Blue: '#1f77b4',
    Orange: '#ff7f0e',
    Green: '#2ca02c',
    Red: '#d62728',
    Purple: '#9467bd',
    Brown: '#8c564b',
    Pink: '#e377c2',
    Gray: '#7f7f7f',
    Olive: '#bcbd22',
    Cyan: '#17becf',
    'Light Blue': '#aec7e8',
    'Light Orange': '#ffbb78',
    'Light Green': '#98df8a',
    'Light Red': '#ff9896',
    'Light Purple': '#c5b0d5',
    'Light Brown': '#c49c94',
    'Light Pink': '#f7b6d2',
    'Light Gray': '#c7c7c7',
    'Light Olive': '#dbdb8d',
    'Light Cyan': '#9edae5',
};

const resistorColors = {
    Black: '#000000',
    Brown: '#a52a2a',
    Red: '#ff0000',
    Orange: '#ffa500',
    Yellow: '#ffff00',
    Green: '#008000',
    Blue: '#0000ff',
    Violet: '#ee82ee',
    Gray: '#808080',
    White: '#ffffff',
    Gold: '#ffd700',
    Silver: '#c0c0c0',
};

const materialColors = {
    Red: '#f44336',
    Pink: '#e91e63',
    Purple: '#9c27b0',
    'Deep Purple': '#673ab7',
    Indigo: '#3f51b5',
    Blue: '#2196f3',
    'Light Blue': '#03a9f4',
    Cyan: '#00bcd4',
    Teal: '#009688',
    Green: '#4caf50',
    'Light Green': '#8bc34a',
    Lime: '#cddc39',
    Yellow: '#ffeb3b',
    Amber: '#ffc107',
    Orange: '#ff9800',
    'Deep Orange': '#ff5722',
    Brown: '#795548',
    Grey: '#9e9e9e',
    'Blue Grey': '#607d8b',
};

const solarizedColors = {
    base03: '#002b36',
    base02: '#073642',
    base01: '#586e75',
    base00: '#657b83',
    base0: '#839496',
    base1: '#93a1a1',
    base2: '#eee8d5',
    base3: '#fdf6e3',
    yellow: '#b58900',
    orange: '#cb4b16',
    red: '#dc322f',
    magenta: '#d33682',
    violet: '#6c71c4',
    blue: '#268bd2',
    cyan: '#2aa198',
    green: '#859900',
};

function generateXtermColors(): Record<string, string> {
    const colors: Record<string, string> = {};
    const toHex = (n: number) => n.toString(16).padStart(2, '0');

    const first16: Record<string, string> = {
        color0: '#000000',
        color1: '#800000',
        color2: '#008000',
        color3: '#808000',
        color4: '#000080',
        color5: '#800080',
        color6: '#008080',
        color7: '#c0c0c0',
        color8: '#808080',
        color9: '#ff0000',
        color10: '#00ff00',
        color11: '#ffff00',
        color12: '#0000ff',
        color13: '#ff00ff',
        color14: '#00ffff',
        color15: '#ffffff',
    };

    const levels = [0, 95, 135, 175, 215, 255];
    let i = 16;
    for (let r = 0; r < 6; r++) {
        for (let g = 0; g < 6; g++) {
            for (let b = 0; b < 6; b++) {
                colors[`color${i}`] = `#${toHex(levels[r])}${toHex(levels[g])}${toHex(levels[b])}`;
                i++;
            }
        }
    }

    for (let j = 0; j < 24; j++) {
        const gray = 8 + j * 10;
        colors[`color${i}`] = `#${toHex(gray)}${toHex(gray)}${toHex(gray)}`;
        i++;
    }

    return { ...first16, ...colors };
}

const xtermColors = generateXtermColors();

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

export const ALL_SETS = [
    { id: 'colorList', title: 'CSS Named Colors', data: CSS_NAMED_COLORS, useNameAsBg: true },
    {
        id: 'materialList',
        title: 'Material Design (500)',
        data: materialColors,
        useNameAsBg: false,
    },
    {
        id: 'tailwindColorList',
        title: 'Tailwind CSS Default (500)',
        data: tailwindColors,
        useNameAsBg: false,
    },
    { id: 'solarizedList', title: 'Solarized', data: solarizedColors, useNameAsBg: false },
    { id: 'tableauColorList', title: 'Tableau 20', data: tableau20Colors, useNameAsBg: false },
    {
        id: 'powershellColorList',
        title: 'Windows Terminal',
        data: powershellColors,
        useNameAsBg: false,
    },
    {
        id: 'resistorColorList',
        title: 'Resistor Color Code',
        data: resistorColors,
        useNameAsBg: false,
    },
    { id: 'xtermColorList', title: 'xterm-256', data: xtermColors, useNameAsBg: false },
];

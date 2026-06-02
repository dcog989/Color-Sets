import { type Colordx, colordx, extend } from '@colordx/core';
import a11y from '@colordx/core/plugins/a11y';
import names from '@colordx/core/plugins/names';
import bootstrap from './sets/bootstrap.json';
import catppuccinFrappe from './sets/catppuccin-frappe.json';
import catppuccinLatte from './sets/catppuccin-latte.json';
import catppuccinMacchiato from './sets/catppuccin-macchiato.json';
import catppuccinMocha from './sets/catppuccin-mocha.json';
import cssNamedColors from './sets/css-named-colors.json';
import dracula from './sets/dracula.json';
import gruvbox from './sets/gruvbox.json';
import materialDesign from './sets/material-design.json';
import nord from './sets/nord.json';
import oneDark from './sets/one-dark.json';
import oneLight from './sets/one-light.json';
import primer from './sets/primer.json';
import resistorColorCode from './sets/resistor-color-code.json';
import solarized from './sets/solarized.json';
import tableau20 from './sets/tableau-20.json';
import tailwindV4 from './sets/tailwind-v4.json';
import tokyoNight from './sets/tokyo-night.json';
import windowsTerminal from './sets/windows-terminal.json';
import xterm256 from './sets/xterm-256.json';

extend([names, a11y]);

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

export const ALL_SETS = [
    {
        id: 'colorList',
        title: 'CSS Named Colors',
        data: cssNamedColors,
        useNameAsBg: true,
    },
    {
        id: 'materialList',
        title: 'Material Design',
        data: materialDesign,
        useNameAsBg: false,
    },
    {
        id: 'tailwindColorList',
        title: 'Tailwind CSS v4',
        data: tailwindV4,
        useNameAsBg: false,
    },
    { id: 'solarizedList', title: 'Solarized', data: solarized, useNameAsBg: false },
    { id: 'tableauColorList', title: 'Tableau 20', data: tableau20, useNameAsBg: false },
    {
        id: 'powershellColorList',
        title: 'Windows Terminal',
        data: windowsTerminal,
        useNameAsBg: false,
    },
    {
        id: 'resistorColorList',
        title: 'Resistor Color Code',
        data: resistorColorCode,
        useNameAsBg: false,
    },
    { id: 'xtermColorList', title: 'xterm-256', data: xterm256, useNameAsBg: false },
    { id: 'nordList', title: 'Nord', data: nord, useNameAsBg: false },
    { id: 'draculaList', title: 'Dracula', data: dracula, useNameAsBg: false },
    { id: 'gruvboxList', title: 'Gruvbox', data: gruvbox, useNameAsBg: false },
    { id: 'tokyoNightList', title: 'Tokyo Night', data: tokyoNight, useNameAsBg: false },
    { id: 'oneDarkList', title: 'One Dark', data: oneDark, useNameAsBg: false },
    { id: 'oneLightList', title: 'One Light', data: oneLight, useNameAsBg: false },
    { id: 'bootstrapList', title: 'Bootstrap', data: bootstrap, useNameAsBg: false },
    { id: 'primerList', title: 'GitHub Primer', data: primer, useNameAsBg: false },
    {
        id: 'catppuccinLatte',
        title: 'Catppuccin Latte',
        data: catppuccinLatte,
        useNameAsBg: false,
    },
    {
        id: 'catppuccinFrappe',
        title: 'Catppuccin Frappé',
        data: catppuccinFrappe,
        useNameAsBg: false,
    },
    {
        id: 'catppuccinMacchiato',
        title: 'Catppuccin Macchiato',
        data: catppuccinMacchiato,
        useNameAsBg: false,
    },
    {
        id: 'catppuccinMocha',
        title: 'Catppuccin Mocha',
        data: catppuccinMocha,
        useNameAsBg: false,
    },
];

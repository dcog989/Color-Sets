# Color Sets Project Guidelines

Color Sets provides an interactive display of color sets, such as CSS Colors, Tailwind Colors, Windows Terminal, etc.

## Dev Environment

Linux CachyOS, Limine boot loader, KDE Plasma 6, Wayland, Btrfs. Firefox, Kate text editor, Zed code editor, fish shell with Ghostty + Fresh editor. paru and bun package managers. All software is updated as of today.

## Tech Stack

- Svelte 5 (Runes), Vite, TypeScript, colordx

## Key Features

- Interactive display of color palettes (CSS, Tailwind, Material, Solarized, Tableau, Windows Terminal, xterm-256, Resistor)
- Copy color values (hex, RGB, HSL) to clipboard with toast notification
- Filter colors by name/search term
- Sort colors by name, hue, or luminosity
- Theme switching: System/Light/Dark with persistence
- Color analysis using colordx library (hue, saturation, lightness, luminance)

## Project Structure

- `src/App.svelte` - Main app with header controls, theme management
- `src/lib/ColorSet.svelte` - Renders a single color set collection
- `src/lib/ColorItem.svelte` - Individual color swatch component
- `src/lib/Toast.svelte` - Copy confirmation toast notification
- `src/lib/data/colorSets.ts` - All color set definitions and processing

## Development Commands

- `bun install` - Install dependencies
- `bun update` - Update dependencies
- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run preview` - Preview production build
- `bun run format` - Format and lint-fix code with Biome
- `bun run lint` - Check for lint issues with Biome
- `bun run check` - Run type checking and linting

## Architecture Notes

- Svelte 5 runes ($state, $derived) for reactivity
- CSS custom properties for theming (light/dark modes)
- colordx library for color manipulation and conversions

## Coding Principles

- Use current coding standards and patterns (Svelte 5 runes, modern TS/Rust)
- KISS, Occam's razor, DRY, YAGNI
- Optimize for actual and perceived performance
- Self-documenting code via clear naming
- Comments only for workarounds/complex logic - do NOT add comments as running dev commentary.
- No magic numbers
- Split files of 400+ lines in to separate distinct functions
- **Do NOT create docs files** (summary, reference, testing, etc.) unless explicitly requested

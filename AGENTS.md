# Agent Directives

## Project Context

- Name: Color Sets
- Description: Interactive display of color sets (CSS Colors, Tailwind Colors, Windows Terminal, etc.), with copying, filtering, sorting, and light/dark theme switching.
- Tech: Svelte 5 (Runes), Vite, TypeScript, colordx, bun

## Key Files

- `src/App.svelte` — entry point (main app, header controls, theme management)
- `src/lib/data/colorSets.ts` — state (color set definitions and processing)
- `src/lib/ColorSet.svelte`, `src/lib/ColorItem.svelte`, `src/lib/Toast.svelte` — components

## Development Workflow

- Install: `bun install`
- Dev: `bun run dev`
- Test: no test suite; use `bun run check`
- Lint: `bun run lint`
- Format: `bun run format`
- Build: `bun run build` (preview with `bun run preview`)

## Dev Environment

- CachyOS, Limine bootloader, KDE Plasma 6, Wayland, and Btrfs.
- fish shell, Ghostty terminal, Fresh TUI editor, yay package manager, bun npm manager, Firefox, and Zed code editor.

## File System Access

- Root: `<project root>`
- Allowed: All subdirectories, `/tmp/<project-name>`
- Read-Only: `.env*`, `.git/`
- Disallowed: system dirs, user config, other projects
- Require confirmation: adding/removing dependencies, changes outside `src/`, any operation outside project root

## Rules

- Keep modifications minimal and scoped. Ask before architectural changes.
- Do not delete files or make destructive changes without confirmation.
- Do not create documentation files unless explicitly requested.
- Prefer incremental improvements over rewrites.
- Use explicit types and named constants (no magic numbers).
- Return explicit error types; do not suppress exceptions.
- Follow standard repository linting and formatting configs (Biome, rustfmt, .editorconfig).
- Decompose files over 400 lines if they mix concerns.
- Never run git mutations (commit, push, reset, rebase, amend) unless explicitly asked.
- Self-documenting code via clear naming. Use comments only for complex workarounds or issues that need noting - why, not what.
- Do not run full `bun run check`/`bun run test` on trivial changes (constant tweaks, one-line edits, CSS value changes). Only run the full suite on real logic changes.
- On completion of an update or fix, print a concise conventional commit message in a fenced code block.

## Communication Style

- Provide concise, actionable responses.
- Ask clarifying questions when requirements are ambiguous.
- Flag potential risks or edge cases proactively.
- Do not pretend to understand how the user feels.

## Definition of Done

- Logic fully implemented.
- `<test>` and `<lint>` pass with zero errors.
- New/modified features have tests.
- Existing docs updated if public interfaces changed.

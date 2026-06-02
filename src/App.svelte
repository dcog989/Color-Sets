<script lang="ts">
import { colordx } from '@colordx/core';
import { version } from '../package.json';
import ColorSet from './lib/ColorSet.svelte';
import { ALL_SETS } from './lib/data/colorSets';
import Toast from './lib/Toast.svelte';

let selectedSet = $state(ALL_SETS[0]?.id ?? '');
let sortOrder = $state('name');
let colorFormat = $state('hex');
let theme = $state(localStorage.getItem('theme') || 'system');
let cbFilter = $state('none');
let searchTerm = $state('');

const currentSet = $derived(ALL_SETS.find((s) => s.id === selectedSet) ?? null);

let systemDark = $state(false);

$effect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    systemDark = mq.matches;
    const handler = (e: MediaQueryListEvent) => (systemDark = e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
});

const bgColor = $derived(
    theme === 'dark' || (theme === 'system' && systemDark) ? '#1a1a1a' : '#f0f0f0',
);

const title = 'Color Sets';

const titleColors = $derived.by(() => {
    if (!currentSet) return [];
    const colors = Object.values(currentSet.data).filter((c: string) => colordx(c).isValid());
    const valid = colors.filter((c: string) => Math.abs(colordx(c).apcaContrast(bgColor)) >= 45);
    const pool = valid.length > 0 ? valid : colors;
    return [...title].map(() => pool[Math.floor(Math.random() * pool.length)]);
});

let toastMessage = $state('');
let toastVisible = $state(false);
let toastSuccess = $state(true);
let toastX = $state(0);
let toastY = $state(0);
let toastTimeout: ReturnType<typeof setTimeout>;

$effect(() => {
    localStorage.setItem('theme', theme);

    if (theme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        document
            .querySelector('meta[name="theme-color"][media*="light"]')
            ?.setAttribute('content', '#ffffff');
    } else if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        document
            .querySelector('meta[name="theme-color"][media*="dark"]')
            ?.setAttribute('content', '#1a1a1a');
    } else {
        document.documentElement.removeAttribute('data-theme');
    }
});

function handleCopy(text: string, message: string, x: number, y: number) {
    if (!navigator.clipboard?.writeText) {
        toastMessage = 'Copy failed!';
        toastSuccess = false;
        showToast(x, y);
        return;
    }
    navigator.clipboard.writeText(text).then(
        () => {
            toastMessage = message;
            toastSuccess = true;
            showToast(x, y);
        },
        () => {
            toastMessage = 'Copy failed!';
            toastSuccess = false;
            showToast(x, y);
        },
    );
}

function cycleTheme() {
    const order = ['system', 'light', 'dark'];
    const idx = order.indexOf(theme);
    theme = order[(idx + 1) % order.length];
}

function showToast(x: number, y: number) {
    toastX = x;
    toastY = y;
    toastVisible = true;
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(
        () => {
            toastVisible = false;
        },
        toastSuccess ? 1500 : 2000,
    );
}
</script>

<h1>
    {#each titleColors as color, i}
        <span style="color: {color}">{title[i]}</span>
    {/each}
</h1>
<header>
    <div class="controls-container">
        <input
            id="filterColors"
            type="search"
            placeholder="Filter colors..."
            aria-label="Filter colors by name or hex"
            bind:value={searchTerm} />

        <label for="setSelector">Set:</label>
        <select id="setSelector" bind:value={selectedSet}>
            {#each ALL_SETS as set (set.id)}
                <option value={set.id}>{set.title}</option>
            {/each}
        </select>

        <label for="sortOrder">Sort:</label>
        <select id="sortOrder" bind:value={sortOrder}>
            <option value="name">Name</option>
            <option value="hue">Hue</option>
            <option value="luminosity">Luminosity</option>
        </select>

        <label for="colorFormat">Format:</label>
        <select id="colorFormat" bind:value={colorFormat}>
            <option value="hex">Hex</option>
            <option value="rgb">RGB</option>
            <option value="hsl">HSL</option>
            <option value="oklch">OKLCH</option>
        </select>

        <label for="cbFilter">Color Blindness:</label>
        <select id="cbFilter" bind:value={cbFilter}>
            <option value="none">None</option>
            <option value="protanopia">Protanopia</option>
            <option value="protanomaly">Protanomaly</option>
            <option value="deuteranopia">Deuteranopia</option>
            <option value="deuteranomaly">Deuteranomaly</option>
            <option value="tritanopia">Tritanopia</option>
            <option value="tritanomaly">Tritanomaly</option>
            <option value="achromatopsia">Achromatopsia</option>
            <option value="achromatomaly">Achromatomaly</option>
        </select>
    </div>

    <div class="theme-toggle">
        <button
            type="button"
            class="theme-btn"
            onclick={cycleTheme}
            aria-label="Switch theme"
            title="Theme: {theme}">
            {#if theme === 'light'}
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="5"></circle>
                    <line x1="12" y1="1" x2="12" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="23"></line>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                    <line x1="1" y1="12" x2="3" y2="12"></line>
                    <line x1="21" y1="12" x2="23" y2="12"></line>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
            {:else if theme === 'dark'}
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
            {:else}
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                    <line x1="8" y1="21" x2="16" y2="21"></line>
                    <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
            {/if}
        </button>
    </div>
</header>

<main style={cbFilter !== 'none' ? `filter: url(#cb-${cbFilter})` : ''}>
    {#if currentSet}
        <ColorSet
            title={currentSet.title}
            id={currentSet.id}
            rawData={currentSet.data}
            useNameAsBg={currentSet.useNameAsBg}
            {sortOrder}
            {searchTerm}
            {colorFormat}
            onCopy={handleCopy} />
    {/if}
</main>

<svg aria-hidden="true" style="position:absolute;width:0;height:0;overflow:hidden">
    <defs>
        <filter id="cb-protanopia">
            <feColorMatrix type="matrix" values="
                0.567, 0.433, 0, 0, 0
                0.558, 0.442, 0, 0, 0
                0,     0.242, 0.758, 0, 0
                0,     0,     0, 1, 0" />
        </filter>
        <filter id="cb-protanomaly">
            <feColorMatrix type="matrix" values="
                0.817, 0.183, 0, 0, 0
                0.333, 0.667, 0, 0, 0
                0,     0.125, 0.875, 0, 0
                0,     0,     0, 1, 0" />
        </filter>
        <filter id="cb-deuteranopia">
            <feColorMatrix type="matrix" values="
                0.625, 0.375, 0, 0, 0
                0.7,   0.3,   0, 0, 0
                0,     0.3,   0.7, 0, 0
                0,     0,     0, 1, 0" />
        </filter>
        <filter id="cb-deuteranomaly">
            <feColorMatrix type="matrix" values="
                0.8,   0.2,   0, 0, 0
                0.258, 0.742, 0, 0, 0
                0,     0.142, 0.858, 0, 0
                0,     0,     0, 1, 0" />
        </filter>
        <filter id="cb-tritanopia">
            <feColorMatrix type="matrix" values="
                0.95, 0.05,  0, 0, 0
                0,    0.433, 0.567, 0, 0
                0,    0.475, 0.525, 0, 0
                0,    0,     0, 1, 0" />
        </filter>
        <filter id="cb-tritanomaly">
            <feColorMatrix type="matrix" values="
                0.967, 0.033, 0, 0, 0
                0,     0.733, 0.267, 0, 0
                0,     0.183, 0.817, 0, 0
                0,     0,     0, 1, 0" />
        </filter>
        <filter id="cb-achromatopsia">
            <feColorMatrix type="matrix" values="
                0.299, 0.587, 0.114, 0, 0
                0.299, 0.587, 0.114, 0, 0
                0.299, 0.587, 0.114, 0, 0
                0,     0,     0, 1, 0" />
        </filter>
        <filter id="cb-achromatomaly">
            <feColorMatrix type="matrix" values="
                0.618, 0.320, 0.062, 0, 0
                0.163, 0.775, 0.062, 0, 0
                0.163, 0.320, 0.516, 0, 0
                0,     0,     0, 1, 0" />
        </filter>
    </defs>
</svg>

<footer>
    <span>v{version}</span>
    <a href="https://github.com/dcog989/Color-Sets" target="_blank" rel="noopener noreferrer"
        >GitHub</a>
    <a href="https://dcog989.github.io/Goat-Color-Picker-Palette/" target="_blank" rel="noopener noreferrer"
        >Color Picker</a>
</footer>

<Toast message={toastMessage} visible={toastVisible} success={toastSuccess} x={toastX} y={toastY} />

<style>
    header {
        align-items: center;
        border-radius: 4px;
        display: flex;
        justify-content: space-between;
        margin: 10px auto 30px;
        max-width: 1280px;
        position: sticky;
        top: 0;
        z-index: 1000;
        background-color: var(--header-bg-color);
        padding: 10px 20px;
        box-shadow: 0 4px 12px var(--page-shadow-color);
        transition: background-color 0.3s;
    }

    h1 {
        font-family: 'Source Code Pro', Consolas, 'Courier New', Courier, monospace;
        letter-spacing: 4px;
        margin: 20px auto 6px;
        max-width: 1280px;
        padding: 0 20px;
        font-size: 2.4em;
    }

    .controls-container {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .controls-container label {
        font-size: 0.9em;
    }

    .controls-container select {
        padding: 8px 12px;
        border-radius: 4px;
        border: 1px solid var(--select-border-color);
        background-color: var(--select-bg-color);
        color: var(--select-text-color);
        font-size: 0.9em;
        cursor: pointer;
    }

    .controls-container select:focus {
        outline: none;
        border-color: var(--select-focus-border-color);
        box-shadow: 0 0 0 2px var(--select-focus-shadow-color);
    }

    .theme-toggle {
        display: flex;
        gap: 2px;
        margin-left: auto;
    }

    .theme-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        padding: 0;
        border: 1px solid var(--select-border-color);
        border-radius: 4px;
        background: var(--select-bg-color);
        color: var(--select-text-color);
        cursor: pointer;
        transition:
            background-color 0.2s,
            border-color 0.2s;
    }

    .theme-btn:hover {
        border-color: var(--select-focus-border-color);
    }

    @media (max-width: 768px) {
        header {
            flex-direction: column;
            gap: 15px;
        }
        .controls-container {
            flex-wrap: wrap;
            justify-content: center;
        }
    }

    footer {
        text-align: center;
        padding: 20px;
        color: var(--text-muted);
        font-size: 0.85em;
    }

    footer a {
        color: var(--link-color);
        text-decoration: none;
        margin-left: 8px;
    }

    footer a:hover {
        text-decoration: underline;
    }
</style>

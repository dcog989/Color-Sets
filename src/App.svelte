<script lang="ts">
import { version } from '../package.json';
import ColorSet from './lib/ColorSet.svelte';
import { ALL_SETS } from './lib/data/colorSets';
import Toast from './lib/Toast.svelte';

let selectedSet = $state(ALL_SETS[0]?.id ?? '');
let sortOrder = $state('name');
let colorFormat = $state('hex');
let theme = $state(localStorage.getItem('theme') || 'system');
let searchTerm = $state('');

const currentSet = $derived(ALL_SETS.find((s) => s.id === selectedSet) ?? null);

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

<header>
    <h1>Color Sets</h1>
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

        <label for="themeSelector">Theme:</label>
        <select
            id="themeSelector"
            bind:value={theme}>
            <option value="system">System</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
        </select>
    </div>
</header>

<main>
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

<footer>
    <span>v{version}</span>
    <a href="https://github.com/dcog989/Color-Sets" target="_blank" rel="noopener noreferrer"
        >GitHub</a>
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

    header h1 {
        color: var(--header-color);
        font-family: 'Source Code Pro', Consolas, 'Courier New', Courier, monospace;
        letter-spacing: 4px;
        margin: 0;
        font-size: 1.8em;
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

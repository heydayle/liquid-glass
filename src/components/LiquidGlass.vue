
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';

const props = withDefaults(defineProps<{
    title?: string;
    height?: string;
    width?: string;
    borderRadius?: string;
    blur?: string;
}>(), {
    title: 'Liquid Glass Card',
    height: '600px',
    width: '300px',
    borderRadius: '10px',
    blur: '0px'
});
// @unocss-include
const containerStyles = computed(() => [
    `height: ${props.height};width: ${props.width};border-radius: ${props.borderRadius}`
]);

onMounted(() => {

});
</script>
<template>
    <div id="glass-card" class="glass-container shadow-lg shadow-white/20" :style="containerStyles">
        <div class="glass-filter" :style="`backdrop-filter: blur(${blur});`"></div>
        <div class="glass-overlay"></div>
        <div class="glass-specular"></div>
        <div class="glass-content">
            <slot name="default"/>
        </div>
    </div>

    <svg xmlns="http://www.w3.org/2000/svg" style="position:absolute;width:0;height:0">
        <filter id="lensFilter" x="0%" y="0%" width="100%" height="100%" filterUnits="objectBoundingBox">
            <feComponentTransfer in="SourceAlpha" result="alpha">
                <feFuncA type="identity" />
            </feComponentTransfer>
            <feGaussianBlur in="alpha" stdDeviation="100" result="blur" />
            <feDisplacementMap in="SourceGraphic" in2="blur" scale="200" xChannelSelector="A" yChannelSelector="A" />
        </filter>
    </svg>

</template>
<style>
    /*
    ==============================================
    LIQUID GLASS SETUP
    ==============================================
    */
    :root {
        --glow-size: 400px;
        --background-hue: 220;
        --apple-blue: #007AFF;
        --apple-purple: #AF52DE;
        --apple-pink: #FF2D92;
        --apple-orange: #FF9500;
        --surface-primary: rgba(255, 255, 255, 0.08);
        --surface-secondary: rgba(255, 255, 255, 0.12);
        --text-primary: rgba(255, 255, 255, 0.98);
        --text-secondary: rgba(255, 255, 255, 0.75);
        --border-primary: rgba(255, 255, 255, 0.15);
        --border-hover: rgba(255, 255, 255, 0.25);
        --lg-bg-color: rgba(255, 255, 255, 0.01);
        --lg-highlight: rgba(255, 255, 255, 0.75);
        --lg-text: #ffffff;
        --lg-red: #fb4268;
        --lg-grey: #444739;
    }

    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    body {
        font-family: "Libertinus Mono", monospace;
        color: var(--text-primary);
        height: 100vh;
        position: relative;
        overflow-x: hidden;
        transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .bg {
        position: absolute;
        inset: 0;
        z-index: -1
    }

    .bg img {
        width: 100%;
        display: block
    }

    /*
    ==============================================
    LIQUID GLASS CARD
    ==============================================
    */
    /* .glass-container {
        position: fixed;
        inset: 50% auto auto 50%;
        transform: translate(-50%, -50%);
        width: 20rem;
        height: 20rem;
        border-radius: 10%;
        background: rgba(255, 255, 255, .08);
        border: 2px solid transparent;
        box-shadow: 0 0 0 2px rgba(255, 255, 255, .6), 0 16px 32px rgba(0, 0, 0, .12);
        backdrop-filter: blur(4px);
        backdrop-filter: url(#lensFilter);
        -webkit-backdrop-filter: url(#lensFilter);
        display: grid;
        place-items: center;
        cursor: pointer;
        outline: 0;
    } */
    .glass-container {
        position: relative;
        align-items: center;
        background: rgba(255, 255, 255, .04);
        overflow: hidden;
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2);
    }

    .glass-filter,
    .glass-overlay,
    .glass-specular {
        position: absolute;
        inset: 0;
        border-radius: inherit;
    }

    .glass-filter {
        z-index: 0;
        filter: url(#lensFilter) saturate(120%) brightness(1);
    }

    .glass-overlay {
        z-index: 1;
        background: var(--lg-bg-color);
    }

    .glass-specular {
        z-index: 2;
       box-shadow: inset 1px 1px 0 var(--lg-highlight),
            inset 0 0 0px var(--lg-highlight),
            inset -2px 2px 4px var(--text-secondary);
    }
    .glass-content {
        height: 100%;
        position: relative;
        z-index: 3;
    }
    </style>
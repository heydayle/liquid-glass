<template>
  <div 
    ref="cardRef"
    class="liquid-glass-card"
    :class="{ [`variant-${variant}`]: variant }"
    :style="cardStyles"
    @click="handleClick"
  >
    <div v-if="showAccent" class="accent-dot"></div>
    <div class="card-content">
      <slot>
        <h2 v-if="title">{{ title }}</h2>
        <p v-if="description">{{ description }}</p>
      </slot>
    </div>
    
    <!-- SVG Filter for liquid glass effect -->
    <svg class="svg-filters" v-if="!globalFilters">
        <filter id="ios26-liquid-distortion">
            <!-- 1. The Lens Shape -->
            <feImage
                href="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDAgNDAwIj48ZGVmcz48cmFkaWFsR3JhZGllbnQgaWQ9ImciIGN4PSI1MCUiIGN5PSI1MCUiIHI9IjUwJSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0icmdiYSgwLDAsMCwwKSIvPjxzdG9wIG9mZnNldD0iNTAlIiBzdG9wLWNvbG9yPSJyZ2JhKDAsMCwwLDAuNSkiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9InJnYmEoMCwwLDAsMCkiLz48L3JhZGlhbEdyYWRpZW50PjwvZGVmcz48Y2lyY2xlIGZpbGw9InVybCgjZykiIGN4PSIyMDAiIGN5PSIyMDAiIHI9IjIwMCIvPjwvc3ZnPg=="
                x="0" y="0" width="100%" height="100%" result="lensGradient" />

            <!-- 2. The Watery Shimmer -->
            <feTurbulence type="fractalNoise" baseFrequency="0.015 0.035" numOctaves="2" result="turbulence" seed="0" />

            <!-- 3. Smooth the Shimmer -->
            <feGaussianBlur in="turbulence" stdDeviation="1.5" result="smoothedTurbulence" />

            <!-- 4. Combine Lens and Shimmer -->
            <feComposite in="lensGradient" in2="smoothedTurbulence" operator="in" result="composedMap" />

            <!-- 5. Apply the final displacement -->
            <feDisplacementMap in="SourceGraphic" in2="composedMap" scale="50" xChannelSelector="R"
                yChannelSelector="G" />
        </filter>

    </svg>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useMouseTracking } from '../composables'

interface Props {
  title?: string
  description?: string
  variant?: 'primary' | 'secondary' | 'accent'
  showAccent?: boolean
  width?: string
  maxWidth?: string
  globalFilters?: boolean // If true, assumes SVG filters are provided elsewhere
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  showAccent: true,
  width: '90%',
  maxWidth: '440px',
  globalFilters: false
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const cardRef = ref<HTMLElement>()
const { mousePosition, attachListeners, removeListeners } = useMouseTracking()

const cardStyles = computed(() => ({
  '--mouse-x': `${mousePosition.value.x}px`,
  '--mouse-y': `${mousePosition.value.y}px`,
  '--mouse-active': mousePosition.value.active ? 1 : 0,
  '--card-width': props.width,
  '--card-max-width': props.maxWidth
}))

const handleClick = (event: MouseEvent) => {
  if (!cardRef.value) return
  
  // Apple-style haptic feedback simulation
  cardRef.value.style.transform = 'scale(0.98)'
  setTimeout(() => {
    cardRef.value!.style.transform = 'scale(1.02)'
    setTimeout(() => {
      cardRef.value!.style.transform = 'scale(1)'
    }, 100)
  }, 100)
  
  emit('click', event)
}

onMounted(() => {
  if (cardRef.value) {
    attachListeners(cardRef.value)
  }
})
</script>

<style scoped>
.liquid-glass-card {
  position: relative;
  width: var(--card-width);
  max-width: var(--card-max-width);
  
  /* Enhanced Apple-style glass morphism */
  background: var(--surface-primary, rgba(255, 255, 255, 0.08));
  border-radius: 28px;
  border: 1px solid var(--border-primary, rgba(255, 255, 255, 0.15));
  padding: 40px 36px;
  
  /* Advanced backdrop filter stack - with fallback */
  backdrop-filter: 
    blur(20px) 
    saturate(1.8)
    contrast(1.1)
    brightness(1.05);
  -webkit-backdrop-filter: 
    blur(20px) 
    saturate(1.8)
    contrast(1.1)
    brightness(1.05);

  /* Premium shadows */
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    0 1px 2px rgba(255, 255, 255, 0.1) inset,
    0 -1px 2px rgba(0, 0, 0, 0.1) inset;
  
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

/* Enhanced glass when SVG filter is available */
.liquid-glass-card:has(.svg-filters) {
  backdrop-filter: 
    blur(20px) 
    saturate(1.8)
    contrast(1.1)
    brightness(1.05)
    url(#ios26-liquid-distortion);
  -webkit-backdrop-filter: 
    blur(20px) 
    saturate(1.8)
    contrast(1.1)
    brightness(1.05)
    url(#ios26-liquid-distortion);
}

.liquid-glass-card:hover {
  border-color: var(--border-hover, rgba(255, 255, 255, 0.25));
  background: var(--surface-secondary, rgba(255, 255, 255, 0.12));
  transform: scale(1.02);
  box-shadow: 
    0 12px 48px rgba(0, 0, 0, 0.4),
    0 1px 2px rgba(255, 255, 255, 0.15) inset,
    0 -1px 2px rgba(0, 0, 0, 0.1) inset;
}

/* Enhanced Apple-style caustic light effect */
.liquid-glass-card::before {
  content: '';
  position: absolute;
  top: var(--mouse-y, 50%);
  left: var(--mouse-x, 50%);
  transform: translate(-50%, -50%);
  width: var(--glow-size, 400px);
  height: var(--glow-size, 400px);
  background: radial-gradient(circle at center, 
    rgba(255, 255, 255, 0.2) 0%, 
    rgba(0, 122, 255, 0.1) 25%,
    rgba(175, 82, 222, 0.05) 50%,
    transparent 70%);
  opacity: var(--mouse-active, 0);
  transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), 
             top 0.15s cubic-bezier(0.4, 0, 0.2, 1), 
             left 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
  mix-blend-mode: soft-light;
}

/* Apple-style edge highlight */
.liquid-glass-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 28px;
  padding: 1px;
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.3) 0%,
    rgba(255, 255, 255, 0.1) 25%,
    transparent 50%,
    transparent 75%,
    rgba(255, 255, 255, 0.2) 100%);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: xor;
  -webkit-mask-composite: xor;
  opacity: var(--mouse-active, 0.3);
  transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
}

.card-content h2 {
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--text-primary, rgba(255, 255, 255, 0.98));
  letter-spacing: -0.02em;
  line-height: 1.1;
  background: linear-gradient(135deg, 
    var(--text-primary, rgba(255, 255, 255, 0.98)) 0%,
    rgba(255, 255, 255, 0.8) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.card-content p {
  font-size: 17px;
  font-weight: 400;
  line-height: 1.5;
  color: var(--text-secondary, rgba(255, 255, 255, 0.75));
  letter-spacing: -0.01em;
}

.accent-dot {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 12px;
  height: 12px;
  background: linear-gradient(135deg, var(--apple-blue, #007AFF), var(--apple-purple, #AF52DE));
  border-radius: 50%;
  opacity: 0.6;
  animation: pulse 3s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.1); }
}

/* Variant styles */
.variant-secondary {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.1);
}

.variant-accent {
  background: linear-gradient(135deg, 
    rgba(0, 122, 255, 0.1) 0%,
    rgba(175, 82, 222, 0.1) 100%);
  border-color: rgba(0, 122, 255, 0.3);
}

.svg-filters {
  position: absolute;
  width: 0;
  height: 0;
  overflow: hidden;
}
</style>
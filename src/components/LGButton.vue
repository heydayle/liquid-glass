<template>
  <button
    ref="buttonRef"
    class="liquid-glass-button"
    :class="[
      `variant-${variant}`,
      `size-${size}`,
      { 'is-loading': loading, 'is-disabled': disabled }
    ]"
    :style="buttonStyles"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <span v-if="loading" class="loading-spinner"></span>
    <slot v-else>{{ label }}</slot>
  </button>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useMouseTracking } from '../composables'

interface Props {
  label?: string
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost'
  size?: 'small' | 'medium' | 'large'
  loading?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'medium',
  loading: false,
  disabled: false
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const buttonRef = ref<HTMLElement>()
const { mousePosition, attachListeners } = useMouseTracking()

const buttonStyles = computed(() => ({
  '--mouse-x': `${mousePosition.value.x}px`,
  '--mouse-y': `${mousePosition.value.y}px`,
  '--mouse-active': mousePosition.value.active ? 1 : 0
}))

const handleClick = (event: MouseEvent) => {
  emit('click', event)
}

onMounted(() => {
  if (buttonRef.value) {
    attachListeners(buttonRef.value)
  }
})
</script>

<style scoped>
.liquid-glass-button {
  position: relative;
  border: 1px solid var(--border-primary, rgba(255, 255, 255, 0.15));
  background: var(--surface-primary, rgba(255, 255, 255, 0.08));
  color: var(--text-primary, rgba(255, 255, 255, 0.98));
  border-radius: 20px;
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(20px) saturate(1.8);
  -webkit-backdrop-filter: blur(20px) saturate(1.8);
  overflow: hidden;
}

.liquid-glass-button:not(.is-disabled):hover {
  background: var(--surface-secondary, rgba(255, 255, 255, 0.12));
  border-color: var(--border-hover, rgba(255, 255, 255, 0.25));
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

.liquid-glass-button:not(.is-disabled):active {
  transform: translateY(0);
}

/* Size variants */
.size-small {
  padding: 8px 16px;
  font-size: 14px;
  border-radius: 16px;
}

.size-medium {
  padding: 12px 24px;
  font-size: 16px;
}

.size-large {
  padding: 16px 32px;
  font-size: 18px;
  border-radius: 24px;
}

/* Color variants */
.variant-primary {
  background: linear-gradient(135deg, 
    rgba(0, 122, 255, 0.8) 0%,
    rgba(0, 122, 255, 0.6) 100%);
  border-color: rgba(0, 122, 255, 0.5);
}

.variant-accent {
  background: linear-gradient(135deg, 
    rgba(175, 82, 222, 0.8) 0%,
    rgba(255, 45, 146, 0.6) 100%);
  border-color: rgba(175, 82, 222, 0.5);
}

.variant-ghost {
  background: transparent;
  border-color: rgba(255, 255, 255, 0.2);
}

/* Mouse glow effect */
.liquid-glass-button::before {
  content: '';
  position: absolute;
  top: var(--mouse-y, 50%);
  left: var(--mouse-x, 50%);
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, 
    rgba(255, 255, 255, 0.1) 0%, 
    transparent 70%);
  opacity: var(--mouse-active, 0);
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.loading-spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
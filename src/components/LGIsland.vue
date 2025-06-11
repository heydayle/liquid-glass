<template>
  <Teleport to="body">
    <Transition
      name="lg-island"
      @enter="onEnter"
      @after-enter="onAfterEnter"
      @leave="onLeave"
      @after-leave="onAfterLeave"
    >
      <div
        v-if="modelValue"
        :class="islandClasses"
        :style="islandStyles"
        @click="handleClick"
        ref="islandRef"
        role="dialog"
        :aria-label="ariaLabel"
      >
        <!-- Glass container -->
        <div class="lg-island__container">
          <!-- Content slot -->
          <div class="lg-island__content">
            <slot />
          </div>
          
          <!-- Refined glass effects -->
          <div class="lg-island__shine"></div>
          <div class="lg-island__border"></div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: true
  },
  position: {
    type: String,
    default: 'top',
    validator: (value) => ['top', 'bottom'].includes(value)
  },
  transparency: {
    type: String,
    default: 'thick',
    validator: (value) => ['ultra-thin', 'thin', 'regular', 'thick', 'ultra-thick'].includes(value)
  },
  elevation: {
    type: String,
    default: 'floating',
    validator: (value) => ['none', 'subtle', 'soft', 'elevated', 'floating'].includes(value)
  },
  size: {
    type: String,
    default: 'auto',
    validator: (value) => ['compact', 'comfortable', 'spacious', 'auto'].includes(value)
  },
  clickable: {
    type: Boolean,
    default: false
  },
  persistent: {
    type: Boolean,
    default: false
  },
  autoHide: {
    type: Number,
    default: 0 // 0 means no auto-hide
  },
  ariaLabel: {
    type: String,
    default: 'Floating island notification'
  }
})

const emit = defineEmits(['update:modelValue', 'click', 'show', 'hide'])

// Template refs
const islandRef = ref(null)

// State
const isAnimating = ref(false)
let autoHideTimer = null

const islandClasses = computed(() => [
  'lg-island',
  `lg-island--position-${props.position}`,
  `lg-island--transparency-${props.transparency}`,
  `lg-island--elevation-${props.elevation}`,
  `lg-island--size-${props.size}`,
  {
    'lg-island--clickable': props.clickable,
    'lg-island--animating': isAnimating.value
  }
])

const islandStyles = computed(() => ({
  '--island-position': props.position === 'top' ? 'var(--lg-space-6)' : 'var(--lg-space-6)',
  '--island-transform-start': props.position === 'top' ? 'translateY(-100%)' : 'translateY(100%)',
}))

// Event handlers
const handleClick = (event) => {
  if (props.clickable) {
    emit('click', event)
  }
}

const hide = () => {
  emit('update:modelValue', false)
  emit('hide')
}

// Auto-hide functionality
const setupAutoHide = () => {
  if (props.autoHide > 0 && !props.persistent) {
    clearTimeout(autoHideTimer)
    autoHideTimer = setTimeout(() => {
      hide()
    }, props.autoHide)
  }
}

const clearAutoHide = () => {
  if (autoHideTimer) {
    clearTimeout(autoHideTimer)
    autoHideTimer = null
  }
}

// Transition hooks
const onEnter = (el) => {
  isAnimating.value = true
  emit('show')
  
  // Set initial state
  el.style.opacity = '0'
  el.style.transform = 'translateX(-50%) scale(0.8)' + 
    (props.position === 'top' ? ' translateY(-20px)' : ' translateY(20px)')
  
  // Animate in
  requestAnimationFrame(() => {
    el.style.transition = 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
    el.style.opacity = '1'
    el.style.transform = 'translateX(-50%) scale(1) translateY(0)'
  })
}

const onAfterEnter = () => {
  isAnimating.value = false
  setupAutoHide()
}

const onLeave = (el) => {
  isAnimating.value = true
  clearAutoHide()
  
  // Animate out
  el.style.transition = 'all 0.25s cubic-bezier(0.4, 0, 0.6, 1)'
  el.style.opacity = '0'
  el.style.transform = 'translateX(-50%) scale(0.9)' + 
    (props.position === 'top' ? ' translateY(-10px)' : ' translateY(10px)')
}

const onAfterLeave = () => {
  isAnimating.value = false
}

// Watch for modelValue changes
watch(() => props.modelValue, (newValue) => {
  if (newValue) {
    nextTick(() => {
      setupAutoHide()
    })
  } else {
    clearAutoHide()
  }
})

// Cleanup on unmount
const cleanup = () => {
  clearAutoHide()
}

// Handle mouse enter/leave for auto-hide pause
const handleMouseEnter = () => {
  if (props.autoHide > 0) {
    clearAutoHide()
  }
}

const handleMouseLeave = () => {
  if (props.autoHide > 0 && props.modelValue) {
    setupAutoHide()
  }
}

// Expose cleanup for parent components
defineExpose({
  hide,
  clearAutoHide,
  setupAutoHide,
  cleanup
})
</script>

<style scoped>
.lg-island {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3000;
  max-width: calc(100vw - 2rem);
  pointer-events: auto;
}

.lg-island--position-top {
  top: var(--island-position);
}

.lg-island--position-bottom {
  bottom: var(--island-position);
}

/* Glass Container */
.lg-island__container {
  position: relative;
  border-radius: var(--lg-radius-full);
  overflow: hidden;
  backdrop-filter: blur(12px) saturate(125%) brightness(106%);
  -webkit-backdrop-filter: blur(12px) saturate(125%) brightness(106%);
  background: var(--lg-glass-thick);
  border: 1px solid var(--lg-edge-subtle);
  min-height: 44px;
  display: flex;
  align-items: center;
}

/* Transparency Variants */
.lg-island--transparency-ultra-thin .lg-island__container {
  backdrop-filter: blur(6px) saturate(110%) brightness(102%);
  -webkit-backdrop-filter: blur(6px) saturate(110%) brightness(102%);
  background: var(--lg-glass-ultra-thin);
  border-color: var(--lg-edge-minimal);
}

.lg-island--transparency-thin .lg-island__container {
  backdrop-filter: blur(8px) saturate(115%) brightness(103%);
  -webkit-backdrop-filter: blur(8px) saturate(115%) brightness(103%);
  background: var(--lg-glass-thin);
  border-color: var(--lg-edge-soft);
}

.lg-island--transparency-regular .lg-island__container {
  backdrop-filter: blur(10px) saturate(120%) brightness(105%);
  -webkit-backdrop-filter: blur(10px) saturate(120%) brightness(105%);
  background: var(--lg-glass-regular);
  border-color: var(--lg-edge-soft);
}

.lg-island--transparency-thick .lg-island__container {
  backdrop-filter: blur(12px) saturate(125%) brightness(106%);
  -webkit-backdrop-filter: blur(12px) saturate(125%) brightness(106%);
  background: var(--lg-glass-thick);
  border-color: var(--lg-edge-subtle);
}

.lg-island--transparency-ultra-thick .lg-island__container {
  backdrop-filter: blur(16px) saturate(135%) brightness(108%);
  -webkit-backdrop-filter: blur(16px) saturate(135%) brightness(108%);
  background: var(--lg-glass-ultra-thick);
  border-color: var(--lg-edge-highlight);
}

/* Elevation Variants */
.lg-island--elevation-none .lg-island__container {
  box-shadow: var(--lg-shadow-none);
}

.lg-island--elevation-subtle .lg-island__container {
  box-shadow: var(--lg-shadow-subtle);
}

.lg-island--elevation-soft .lg-island__container {
  box-shadow: var(--lg-shadow-soft);
}

.lg-island--elevation-elevated .lg-island__container {
  box-shadow: var(--lg-shadow-medium);
}

.lg-island--elevation-floating .lg-island__container {
  box-shadow: var(--lg-shadow-floating);
}

/* Size Variants */
.lg-island--size-compact .lg-island__container {
  min-height: 36px;
  padding: var(--lg-space-2) var(--lg-space-5);
}

.lg-island--size-comfortable .lg-island__container {
  min-height: 44px;
  padding: var(--lg-space-3) var(--lg-space-6);
}

.lg-island--size-spacious .lg-island__container {
  min-height: 52px;
  padding: var(--lg-space-4) var(--lg-space-8);
}

.lg-island--size-auto .lg-island__container {
  min-height: 44px;
  padding: var(--lg-space-3) var(--lg-space-6);
}

/* Interactive States */
.lg-island--clickable .lg-island__container {
  cursor: pointer;
  transition: all 0.2s var(--lg-ease-natural);
}

.lg-island--clickable:hover .lg-island__container {
  transform: scale(1.02);
  box-shadow: var(--lg-shadow-floating);
}

.lg-island--clickable:active .lg-island__container {
  transform: scale(0.98);
}

/* Content */
.lg-island__content {
  position: relative;
  z-index: 3;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--lg-text-primary);
  font-family: var(--lg-font-family);
  font-size: var(--lg-font-size-base);
  font-weight: 500;
  letter-spacing: -0.01em;
  text-align: center;
  line-height: 1.4;
}

/* Glass Effects */
.lg-island__container::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, 
    var(--lg-edge-highlight) 0%,
    transparent 25%,
    transparent 75%,
    var(--lg-edge-subtle) 100%);
  border-radius: inherit;
  pointer-events: none;
  opacity: 0.6;
  z-index: 1;
}

.lg-island__container::after {
  content: '';
  position: absolute;
  inset: 0.5px;
  background: linear-gradient(180deg, 
    rgba(255, 255, 255, 0.08) 0%,
    rgba(255, 255, 255, 0.02) 30%,
    rgba(255, 255, 255, 0.01) 70%,
    rgba(255, 255, 255, 0.03) 100%);
  border-radius: inherit;
  pointer-events: none;
  z-index: 2;
}

.lg-island__shine {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, 
    transparent 0%,
    rgba(255, 255, 255, 0.04) 40%,
    rgba(255, 255, 255, 0.08) 50%,
    rgba(255, 255, 255, 0.04) 60%,
    transparent 100%);
  border-radius: inherit;
  opacity: 0;
  transition: opacity 0.3s var(--lg-ease-natural);
  pointer-events: none;
  z-index: 2;
}

.lg-island:hover .lg-island__shine {
  opacity: 1;
}

.lg-island__border {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.15) 0%,
    transparent 25%,
    transparent 75%,
    rgba(255, 255, 255, 0.08) 100%);
  padding: 1px;
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.4s var(--lg-ease-natural);
  z-index: 1;
}

.lg-island:hover .lg-island__border {
  opacity: 1;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .lg-island {
    max-width: calc(100vw - 1rem);
  }
  
  .lg-island--position-top {
    top: var(--lg-space-4);
  }
  
  .lg-island--position-bottom {
    bottom: var(--lg-space-4);
  }
  
  .lg-island--size-compact .lg-island__container,
  .lg-island--size-comfortable .lg-island__container,
  .lg-island--size-spacious .lg-island__container,
  .lg-island--size-auto .lg-island__container {
    padding: var(--lg-space-3) var(--lg-space-5);
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .lg-island,
  .lg-island__container,
  .lg-island__shine,
  .lg-island__border {
    animation: none !important;
    transition: none !important;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .lg-island__container {
    border: 2px solid;
    background: var(--lg-glass-ultra-thick);
  }
}
</style>
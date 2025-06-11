<template>
  <Teleport to="body">
    <Transition name="modal" appear>
      <div v-if="modelValue" class="modal-overlay" @click="handleOverlayClick">
        <div 
          ref="modalRef"
          class="liquid-glass-modal"
          :class="[`size-${size}`]"
          :style="modalStyles"
          @click.stop
        >
          <div v-if="showHeader" class="modal-header">
            <h3 v-if="title" class="modal-title">{{ title }}</h3>
            <button v-if="closable" class="close-button" @click="handleClose">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </button>
          </div>
          
          <div class="modal-body">
            <slot>
              <p v-if="content">{{ content }}</p>
            </slot>
          </div>
          
          <div v-if="$slots.footer" class="modal-footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useMouseTracking } from '../composables'

interface Props {
  modelValue: boolean
  title?: string
  content?: string
  size?: 'small' | 'medium' | 'large' | 'fullscreen'
  closable?: boolean
  closeOnOverlay?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'medium',
  closable: true,
  closeOnOverlay: true
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  close: []
}>()

const modalRef = ref<HTMLElement>()
const { mousePosition, attachListeners } = useMouseTracking()

const showHeader = computed(() => props.title || props.closable)

const modalStyles = computed(() => ({
  '--mouse-x': `${mousePosition.value.x}px`,
  '--mouse-y': `${mousePosition.value.y}px`,
  '--mouse-active': mousePosition.value.active ? 1 : 0
}))

const handleClose = () => {
  emit('update:modelValue', false)
  emit('close')
}

const handleOverlayClick = () => {
  if (props.closeOnOverlay) {
    handleClose()
  }
}

watch(() => props.modelValue, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

onMounted(() => {
  if (modalRef.value) {
    attachListeners(modalRef.value)
  }
})
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.liquid-glass-modal {
  position: relative;
  background: var(--surface-primary, rgba(255, 255, 255, 0.08));
  border: 1px solid var(--border-primary, rgba(255, 255, 255, 0.15));
  border-radius: 28px;
  backdrop-filter: blur(20px) saturate(1.8) contrast(1.1) brightness(1.05);
  -webkit-backdrop-filter: blur(20px) saturate(1.8) contrast(1.1) brightness(1.05);
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.4),
    0 1px 2px rgba(255, 255, 255, 0.1) inset;
  max-height: 90vh;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Size variants */
.size-small {
  width: 100%;
  max-width: 400px;
}

.size-medium {
  width: 100%;
  max-width: 600px;
}

.size-large {
  width: 100%;
  max-width: 800px;
}

.size-fullscreen {
  width: 95%;
  height: 95%;
  max-width: none;
  max-height: none;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 32px 0;
}

.modal-title {
  font-size: 24px;
  font-weight: 600;
  color: var(--text-primary, rgba(255, 255, 255, 0.98));
  letter-spacing: -0.02em;
  margin: 0;
}

.close-button {
  background: none;
  border: none;
  color: var(--text-secondary, rgba(255, 255, 255, 0.75));
  cursor: pointer;
  padding: 8px;
  border-radius: 12px;
  transition: all 0.2s ease;
}

.close-button:hover {
  background: var(--surface-secondary, rgba(255, 255, 255, 0.12));
  color: var(--text-primary, rgba(255, 255, 255, 0.98));
}

.modal-body {
  padding: 24px 32px;
  max-height: 60vh;
  overflow-y: auto;
}

.modal-footer {
  padding: 0 32px 24px;
  border-top: 1px solid var(--border-primary, rgba(255, 255, 255, 0.15));
  margin-top: 24px;
  padding-top: 24px;
}

/* Mouse glow effect */
.liquid-glass-modal::before {
  content: '';
  position: absolute;
  top: var(--mouse-y, 50%);
  left: var(--mouse-x, 50%);
  transform: translate(-50%, -50%);
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, 
    rgba(255, 255, 255, 0.1) 0%, 
    rgba(0, 122, 255, 0.05) 25%,
    transparent 70%);
  opacity: var(--mouse-active, 0);
  transition: opacity 0.6s ease;
  pointer-events: none;
  mix-blend-mode: soft-light;
}

/* Transitions */
.modal-enter-active, .modal-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-enter-from, .modal-leave-to {
  opacity: 0;
}

.modal-enter-from .liquid-glass-modal {
  transform: scale(0.9) translateY(20px);
}

.modal-leave-to .liquid-glass-modal {
  transform: scale(0.95) translateY(-10px);
}
</style>
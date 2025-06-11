<template>
  <div class="liquid-glass-input-wrapper">
    <label v-if="label" class="input-label">{{ label }}</label>
    <div 
      ref="inputWrapperRef"
      class="liquid-glass-input"
      :class="{ 'is-focused': isFocused, 'has-error': error }"
      :style="inputStyles"
    >
      <input
        v-model="inputValue"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        class="input-field"
        @focus="handleFocus"
        @blur="handleBlur"
        @input="handleInput"
      />
      <div v-if="$slots.suffix || suffixIcon" class="input-suffix">
        <slot name="suffix">
          <i v-if="suffixIcon" :class="suffixIcon"></i>
        </slot>
      </div>
    </div>
    <span v-if="error" class="error-message">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useMouseTracking } from '../composables'

interface Props {
  modelValue?: string | number
  label?: string
  placeholder?: string
  type?: string
  disabled?: boolean
  error?: string
  suffixIcon?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text'
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  input: [event: Event]
}>()

const inputWrapperRef = ref<HTMLElement>()
const isFocused = ref(false)
const { mousePosition, attachListeners } = useMouseTracking()

const inputValue = computed({
  get: () => props.modelValue || '',
  set: (value) => emit('update:modelValue', value)
})

const inputStyles = computed(() => ({
  '--mouse-x': `${mousePosition.value.x}px`,
  '--mouse-y': `${mousePosition.value.y}px`,
  '--mouse-active': mousePosition.value.active ? 1 : 0
}))

const handleFocus = (event: FocusEvent) => {
  isFocused.value = true
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  isFocused.value = false
  emit('blur', event)
}

const handleInput = (event: Event) => {
  emit('input', event)
}

onMounted(() => {
  if (inputWrapperRef.value) {
    attachListeners(inputWrapperRef.value)
  }
})
</script>

<style scoped>
.liquid-glass-input-wrapper {
  position: relative;
  margin-bottom: 16px;
}

.input-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary, rgba(255, 255, 255, 0.75));
  margin-bottom: 8px;
  letter-spacing: -0.01em;
}

.liquid-glass-input {
  position: relative;
  display: flex;
  align-items: center;
  background: var(--surface-primary, rgba(255, 255, 255, 0.08));
  border: 1px solid var(--border-primary, rgba(255, 255, 255, 0.15));
  border-radius: 16px;
  padding: 12px 16px;
  backdrop-filter: blur(20px) saturate(1.8);
  -webkit-backdrop-filter: blur(20px) saturate(1.8);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.liquid-glass-input:hover {
  border-color: var(--border-hover, rgba(255, 255, 255, 0.25));
  background: var(--surface-secondary, rgba(255, 255, 255, 0.12));
}

.liquid-glass-input.is-focused {
  border-color: var(--apple-blue, #007AFF);
  box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.2);
}

.liquid-glass-input.has-error {
  border-color: var(--apple-pink, #FF2D92);
  box-shadow: 0 0 0 3px rgba(255, 45, 146, 0.2);
}

.input-field {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: var(--text-primary, rgba(255, 255, 255, 0.98));
  font-size: 16px;
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
}

.input-field::placeholder {
  color: var(--text-secondary, rgba(255, 255, 255, 0.75));
}

.input-suffix {
  margin-left: 8px;
  color: var(--text-secondary, rgba(255, 255, 255, 0.75));
}

.error-message {
  position: absolute;
  bottom: -20px;
  left: 0;
  font-size: 12px;
  color: var(--apple-pink, #FF2D92);
}

/* Mouse glow effect */
.liquid-glass-input::before {
  content: '';
  position: absolute;
  top: var(--mouse-y, 50%);
  left: var(--mouse-x, 50%);
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, 
    rgba(255, 255, 255, 0.05) 0%, 
    transparent 70%);
  opacity: var(--mouse-active, 0);
  transition: opacity 0.3s ease;
  pointer-events: none;
}
</style>
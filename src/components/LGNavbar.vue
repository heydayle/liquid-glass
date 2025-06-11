<template>
  <nav class="lg-navbar">
    <div class="lg-navbar__content">
      <div v-if="$slots.brand" class="lg-navbar__brand">
        <slot name="brand" />
      </div>
      <div class="lg-navbar__items">
        <slot />
      </div>
      <div v-if="$slots.actions" class="lg-navbar__actions">
        <slot name="actions" />
      </div>
    </div>
  </nav>
</template>

<script setup>
defineProps({
  sticky: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.lg-navbar {
  @apply liquid-glass-base;
  background: var(--lg-glass-bg);
  border-radius: 0;
  border-left: none;
  border-right: none;
  border-top: none;
  backdrop-filter: blur(20px) saturate(180%);
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: var(--lg-glass-shadow);
}

.lg-navbar__content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--lg-spacing-md) var(--lg-spacing-lg);
  max-width: 1200px;
  margin: 0 auto;
}

.lg-navbar__brand {
  font-weight: 600;
  font-size: 18px;
  color: var(--lg-text-primary);
}

.lg-navbar__items {
  display: flex;
  align-items: center;
  gap: var(--lg-spacing-lg);
  flex: 1;
  justify-content: center;
}

.lg-navbar__actions {
  display: flex;
  align-items: center;
  gap: var(--lg-spacing-sm);
}
</style>
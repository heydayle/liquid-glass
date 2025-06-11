export { default as LGCard } from './components/LGCard.vue'
export { default as LGButton } from './components/LGButton.vue'
export { default as LGModal } from './components/LGModal.vue'
export { default as LGInput } from './components/LGInput.vue'
// export { default as LGContainer } from './components/LGContainer.vue'
// export { default as BackgroundWorld } from './components/BackgroundWorld.vue'

// export * from './composables'
// export * from './types'
// export { LGTheme } from './theme'

// Plugin installation
import type { App } from 'vue'
import LGCard from './components/LGCard.vue'
import LGButton from './components/LGButton.vue'
import LGModal from './components/LGModal.vue'
import LGInput from './components/LGInput.vue'
// import LGContainer from './components/LGContainer.vue'
// import BackgroundWorld from './components/BackgroundWorld.vue'

const components = {
  LGCard,
  LGButton,
  LGModal,
  LGInput
}

export default {
  install(app: App) {
    Object.entries(components).forEach(([name, component]) => {
      app.component(name, component)
    })
  }
}
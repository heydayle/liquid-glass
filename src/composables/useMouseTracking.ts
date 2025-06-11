import { ref, onMounted, onUnmounted } from 'vue'
import type { MousePosition } from '../types'

export function useMouseTracking(element?: HTMLElement) {
    const mousePosition = ref<MousePosition>({
        x: 0,
        y: 0,
        active: false
    })

    const handleMouseMove = (e: MouseEvent) => {
        if (!element) return

        const rect = element.getBoundingClientRect()
        mousePosition.value = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
            active: true
        }
    }

    const handleMouseLeave = () => {
        mousePosition.value.active = false
    }

    const attachListeners = (el: HTMLElement) => {
        el.addEventListener('mousemove', handleMouseMove)
        el.addEventListener('mouseleave', handleMouseLeave)
    }

    const removeListeners = (el: HTMLElement) => {
        el.removeEventListener('mousemove', handleMouseMove)
        el.removeEventListener('mouseleave', handleMouseLeave)
    }

    onMounted(() => {
        if (element) {
            attachListeners(element)
        }
    })

    onUnmounted(() => {
        if (element) {
            removeListeners(element)
        }
    })

    return {
        mousePosition,
        attachListeners,
        removeListeners
    }
}
import { ref, onMounted, onUnmounted } from 'vue'

export function useScrollEffects() {
    const scrollY = ref(0)
    const backgroundHue = ref(220)
    const lastScrollY = ref(0)

    const handleScroll = () => {
        scrollY.value = window.scrollY
        const scrollDelta = scrollY.value - lastScrollY.value

        const maxScroll = document.body.scrollHeight - window.innerHeight
        const scrollPercent = scrollY.value / maxScroll
        backgroundHue.value = 220 + scrollPercent * 140

        lastScrollY.value = scrollY.value

        // Update CSS custom property
        document.documentElement.style.setProperty('--background-hue', backgroundHue.value.toString())
    }

    onMounted(() => {
        window.addEventListener('scroll', handleScroll, { passive: true })
    })

    onUnmounted(() => {
        window.removeEventListener('scroll', handleScroll)
    })

    return {
        scrollY,
        backgroundHue
    }
}
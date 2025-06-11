import { ref, onMounted, onUnmounted } from 'vue'

export function useLiquidAnimation() {
    const frame = ref(0)
    let animationId: number

    const animateLoop = () => {
        const time = frame.value * 0.008
        const newBaseFrequencyX = 0.012 + Math.sin(time) * 0.003
        const newBaseFrequencyY = 0.028 + Math.cos(time * 1.3) * 0.004

        const turbulence = document.querySelector('#ios26-liquid-distortion feTurbulence')
        if (turbulence) {
            turbulence.setAttribute('baseFrequency', `${newBaseFrequencyX} ${newBaseFrequencyY}`)
        }

        frame.value++
        animationId = requestAnimationFrame(animateLoop)
    }

    onMounted(() => {
        animateLoop()
    })

    onUnmounted(() => {
        if (animationId) {
            cancelAnimationFrame(animationId)
        }
    })

    return {
        frame
    }
}
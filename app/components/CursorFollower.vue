<template>
    <div
        ref="cursorGlow"
        class="fixed pointer-events-none z-52 transform -translate-x-1/2 -translate-y-1/2 blur"
        :class="glowClass"
        :style="glowStyle"
    ></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'

const cursorGlow = ref(null)
const glowClass = 'w-10 h-10 rounded-full blur-sm'
const glowStyle = ref({
    background: 'linear-gradient(to right, #3182ce95, #e53e3e95)',
})

const LERP_FACTOR = 0.1
const MAGNETIC_RADIUS = 40
const DISSOLVE_RADIUS = 40
const RELEASE_RADIUS_MULTIPLIER = 1.1
const ATTRACTION_CURVE = 3
const PULSE_SPEED = 0.03
const PULSE_AMPLITUDE = 0.08

const mouse = ref({ x: 0, y: 0 })
const glowProps = ref({
    x: 0,
    y: 0,
    width: 40,
    height: 40,
    opacity: 0,
    scale: 1,
})
const hasMoved = ref(false)
const attractedElement = ref(null)
let animationFrameId = null
let magneticElements = []
let pulseTime = 0

const updateMousePosition = e => {
    if (!hasMoved.value) {
        hasMoved.value = true
        glowProps.value.x = e.clientX
        glowProps.value.y = e.clientY
        gsap.to(glowProps.value, { opacity: 1, duration: 0.3 })
    }
    mouse.value = { x: e.clientX, y: e.clientY }
}

const handleMouseLeave = () => {
    gsap.to(glowProps.value, { opacity: 0, duration: 0.3, ease: 'power2.out' })
}

const handleMouseEnter = () => {
    if (hasMoved.value) {
        gsap.to(glowProps.value, { opacity: 1, duration: 0.3, ease: 'power2.in' })
    }
}

const tick = () => {
    pulseTime += PULSE_SPEED
    if (!attractedElement.value) {
        let closestElement = null
        let minDistance = Infinity
        for (const el of magneticElements) {
            const rect = el.getBoundingClientRect()
            const center = {
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2,
            }
            const distance = Math.hypot(
                mouse.value.x - center.x,
                mouse.value.y - center.y
            )
            if (distance < minDistance) {
                minDistance = distance
                closestElement = el
            }
        }
        if (closestElement && minDistance < MAGNETIC_RADIUS) {
            attractedElement.value = closestElement
        }
    } else {
        const rect = attractedElement.value.getBoundingClientRect()
        const center = {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
        }
        const distance = Math.hypot(
            mouse.value.x - center.x,
            mouse.value.y - center.y
        )
        if (distance > MAGNETIC_RADIUS * RELEASE_RADIUS_MULTIPLIER) {
            attractedElement.value = null
        }
    }

    let targetX = mouse.value.x
    let targetY = mouse.value.y
    let targetWidth = 40
    let targetHeight = 40
    let targetBorderRadius = '9999px'
    let targetScale = 1

    if (attractedElement.value) {
        const rect = attractedElement.value.getBoundingClientRect()
        const center = {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
        }
        const distance = Math.hypot(
            mouse.value.x - center.x,
            mouse.value.y - center.y
        )

        if (distance <= DISSOLVE_RADIUS) {
            targetX = center.x
            targetY = center.y
            targetWidth = rect.width
            targetHeight = rect.height

            const arrivalDistance = Math.hypot(
                glowProps.value.x - targetX,
                glowProps.value.y - targetY
            )
            if (arrivalDistance < 1) {
                const pulse = Math.sin(pulseTime) * PULSE_AMPLITUDE
                targetScale = 1 + pulse
            } else {
                targetScale = 1
            }
        } else {
            const pullFactor =
                1 - distance / (MAGNETIC_RADIUS * RELEASE_RADIUS_MULTIPLIER)
            const clampedPullFactor = Math.max(0, Math.min(1, pullFactor))
            const easedPullFactor = Math.pow(
                clampedPullFactor,
                ATTRACTION_CURVE
            )

            targetX =
                mouse.value.x + (center.x - mouse.value.x) * easedPullFactor
            targetY =
                mouse.value.y + (center.y - mouse.value.y) * easedPullFactor
            targetWidth = rect.width + 20
            targetHeight = rect.height + 20
            targetScale = 1
        }
    }

    glowProps.value.x += (targetX - glowProps.value.x) * LERP_FACTOR
    glowProps.value.y += (targetY - glowProps.value.y) * LERP_FACTOR
    glowProps.value.width += (targetWidth - glowProps.value.width) * LERP_FACTOR
    glowProps.value.height +=
        (targetHeight - glowProps.value.height) * LERP_FACTOR
    glowProps.value.scale += (targetScale - glowProps.value.scale) * LERP_FACTOR

    gsap.set(cursorGlow.value, {
        x: glowProps.value.x,
        y: glowProps.value.y,
        width: glowProps.value.width,
        height: glowProps.value.height,
        borderRadius: targetBorderRadius,
        scale: glowProps.value.scale,
        opacity: glowProps.value.opacity,
    })

    animationFrameId = requestAnimationFrame(tick)
}

onMounted(() => {
    window.addEventListener('mousemove', updateMousePosition)
    document.documentElement.addEventListener('mouseleave', handleMouseLeave)
    document.documentElement.addEventListener('mouseenter', handleMouseEnter)
    magneticElements = document.querySelectorAll('[data-glow-magnetic]')
    animationFrameId = requestAnimationFrame(tick)
})

onUnmounted(() => {
    window.removeEventListener('mousemove', updateMousePosition)
    document.documentElement.removeEventListener(
        'mouseleave',
        handleMouseLeave
    )
    document.documentElement.removeEventListener(
        'mouseenter',
        handleMouseEnter
    )
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
    }
})
</script>

<style scoped>
.fixed {
    position: fixed;
    top: 0;
    left: 0;
}
.transform {
    will-change: transform;
}
@media (max-width: 768px) {
    div {
        display: none;
    }
}
</style>

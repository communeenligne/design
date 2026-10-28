// Discreet animations (motion.css), without a library: taken from the shared module of the landing.
//
// Rules: nothing is hidden without the cel-motion class (js/motion-boot.js), never with reduced motion; only
// opacity, translate and scale change; the h1 title is never transparent; 150 to 400 ms, no loop; no animation delays
// typing, the submission of a form or a focus move.

export const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Motion allowed: cel-motion set on load, and no reduced motion asked since.
export const motionAllowed = () => document.documentElement.classList.contains('cel-motion') && !prefersReducedMotion()

const MAX_DELAY = 7

// Visible part that reveals an element: 15 % of its area, or 160 px high for a block taller than the screen.
const VISIBLE_RATIO = 0.15
const VISIBLE_HEIGHT = 160

const reveal = (element, rank = null) => {
    if (element.classList.contains('cel-revealed')) {
        return
    }

    if (rank !== null && ![...element.classList].some((name) => name.startsWith('cel-delay-'))) {
        element.classList.add(`cel-delay-${Math.min(rank, MAX_DELAY)}`)
    }

    element.classList.add('cel-revealing')
    element.addEventListener('transitionend', () => element.classList.remove('cel-revealing'), { once: true })
    element.classList.add('cel-revealed')
}

// Each [data-cel-reveal] appears once, when it enters the screen; those entering together arrive staggered. Focus
// shows the element that receives it at once.
export const initReveals = () => {
    const observer = new IntersectionObserver((entries) => {
        entries
            .filter((entry) => entry.isIntersecting && (entry.intersectionRatio >= VISIBLE_RATIO || entry.intersectionRect.height >= VISIBLE_HEIGHT))
            .map((entry) => entry.target)
            .sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1))
            .forEach((element, rank) => {
                observer.unobserve(element)
                reveal(element, rank)
            })
    }, { threshold: [0, 0.05, 0.1, VISIBLE_RATIO], rootMargin: '0px 0px -5% 0px' })

    document.querySelectorAll('[data-cel-reveal]').forEach((element) => observer.observe(element))

    document.addEventListener('focusin', (event) => {
        const element = event.target instanceof Element ? event.target.closest('[data-cel-reveal]:not(.cel-revealed)') : null

        if (element) {
            observer.unobserve(element)
            element.classList.add('cel-instant', 'cel-revealed')
        }
    })
}

// Short fade of a block that has just appeared (hidden attribute removed); no effect without cel-motion.
export const fadeIn = (element) => {
    if (!element || !motionAllowed()) {
        return
    }

    element.classList.remove('cel-fade-out', 'cel-fade-in')
    void element.offsetWidth
    element.classList.add('cel-fade-in')
    element.addEventListener('animationend', () => element.classList.remove('cel-fade-in'), { once: true })
}

// Hides a block after a short fade; at once without cel-motion. A fadeIn() during the fade cancels it.
export const fadeOut = (element) => {
    if (!element || element.hidden) {
        return
    }

    if (!motionAllowed()) {
        element.hidden = true

        return
    }

    element.classList.remove('cel-fade-in')
    element.classList.add('cel-fade-out')
    element.addEventListener('animationend', () => {
        if (element.classList.contains('cel-fade-out')) {
            element.hidden = true
            element.classList.remove('cel-fade-out')
        }
    }, { once: true })
}

// Replays a light fade on a block whose content changes.
export const refresh = (element) => {
    if (!element || !motionAllowed()) {
        return
    }

    element.classList.remove('cel-refresh')
    void element.offsetWidth
    element.classList.add('cel-refresh')
    element.addEventListener('animationend', () => element.classList.remove('cel-refresh'), { once: true })
}

// To call once the page is loaded: tells the boot script that this script runs, then starts the reveals.
export const initMotion = () => {
    const root = document.documentElement

    if (!root.classList.contains('cel-motion')) {
        return
    }

    root.classList.add('cel-motion-ready')
    initReveals()
}

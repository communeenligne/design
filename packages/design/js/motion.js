// Discreet animations (motion.css), without a library: taken from the shared module of the landing.
//
// Rules: nothing is hidden without the cel-motion class (js/motion-boot.js), never with reduced motion; only
// opacity, translate and scale change; the h1 title is never transparent; 150 to 400 ms, no loop; no animation delays
// typing, the submission of a form or a focus move. Single exception to the loop rule: the scrolling strip
// (initMarquee()), slow, always stopped by the visitor, with a pause button.

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

// Entrance of a screen ([data-cel-enter]): its blocks fade in as soon as it is shown, one after the other.
export const initEnter = () => {
    const screens = document.querySelectorAll('[data-cel-enter]')

    if (screens.length > 0) {
        requestAnimationFrame(() => requestAnimationFrame(() => screens.forEach((screen) => screen.classList.add('cel-entered'))))
    }
}

// Anchor links a[data-cel-smooth-anchor]: smooth scrolling to the section (at once with reduced motion), which then
// receives the focus for screen readers (give it tabindex="-1"); the address takes the anchor.
export const initSmoothAnchors = () => {
    document.querySelectorAll('a[data-cel-smooth-anchor]').forEach((link) => {
        link.addEventListener('click', (event) => {
            const target = document.getElementById(decodeURIComponent(link.hash.slice(1)))

            if (!target) {
                return
            }

            event.preventDefault()
            target.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' })
            target.focus({ preventScroll: true })
            history.pushState(null, '', link.hash)
        })
    })
}

// ---------- Scrolling strip: [data-cel-marquee] (references strip) ----------
//
// The strip is a real scrolling container ([data-cel-marquee-viewport]): the visitor scrolls it with a finger, the
// wheel or the keyboard, with card snapping. When the cards do not fit and motion is allowed, it moves slowly and
// continuously (class cel-marquee-auto on the viewport); to loop without a jump, the cards are copied after
// themselves, copies hidden from screen readers (aria-hidden) and out of the tab order (tabindex="-1"). It stops on
// hover, touch, focus, when the visitor scrolls it (resumes a few seconds later), off screen, and until "Resume" is
// clicked with the pause button ([data-cel-marquee-toggle], aria-pressed, its text in [data-cel-marquee-label], from
// data-cel-label-pause and data-cel-label-play). Cards that all fit: no scrolling, no copy, no button, centered
// cards (class cel-marquee-static). Without this script, the strip is scrolled by hand.

const MARQUEE_SPEED = 28
const MARQUEE_RESUME_DELAY = 3000
const MARQUEE_MAX_COPIES = 4
const MARQUEE_SCROLL_KEYS = ['ArrowLeft', 'ArrowRight', 'Home', 'End', 'PageUp', 'PageDown']

const setupMarquee = (section) => {
    const viewport = section.querySelector('[data-cel-marquee-viewport]')
    const track = section.querySelector('[data-cel-marquee-track]')
    const toggle = section.querySelector('[data-cel-marquee-toggle]')
    const label = toggle?.querySelector('[data-cel-marquee-label]')

    if (!viewport || !track) {
        return
    }

    const originals = [...track.children]
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    let copies = []
    let loopWidth = 0
    let position = 0
    let frame = null
    let last = null
    let enabled = false
    let paused = false
    let hovered = false
    let touching = false
    let focused = false
    let visible = false
    let userUntil = 0
    let resumeTimer = null
    let width = 0

    const stop = () => {
        if (frame !== null) {
            cancelAnimationFrame(frame)
            frame = null
        }
    }

    const tick = (time) => {
        if (last !== null) {
            position += (MARQUEE_SPEED * Math.min(time - last, 100)) / 1000

            while (loopWidth > 0 && position >= loopWidth) {
                position -= loopWidth
            }

            viewport.scrollLeft = position
        }

        last = time
        frame = requestAnimationFrame(tick)
    }

    const shouldRun = () => enabled && !paused && !hovered && !touching && !focused && visible && Date.now() >= userUntil && !motionQuery.matches

    const update = () => {
        if (shouldRun()) {
            if (frame === null) {
                position = viewport.scrollLeft
                last = null
                viewport.classList.add('cel-marquee-auto')
                frame = requestAnimationFrame(tick)
            }
        } else {
            stop()
        }
    }

    // The visitor scrolls the strip: card snapping comes back, the restart waits until they are done.
    const holdForUser = () => {
        viewport.classList.remove('cel-marquee-auto')
        userUntil = Date.now() + MARQUEE_RESUME_DELAY
        stop()
        clearTimeout(resumeTimer)
        resumeTimer = setTimeout(function resume() {
            const remaining = userUntil - Date.now()

            if (remaining > 0) {
                resumeTimer = setTimeout(resume, remaining)

                return
            }

            update()
        }, MARQUEE_RESUME_DELAY)
    }

    const addCopy = () => {
        originals.forEach((item) => {
            const copy = item.cloneNode(true)
            copy.setAttribute('aria-hidden', 'true')
            copy.querySelectorAll('a, button, input, select, textarea, [tabindex]').forEach((element) => element.setAttribute('tabindex', '-1'))
            copy.querySelectorAll('[id]').forEach((element) => element.removeAttribute('id'))
            track.append(copy)
            copies.push(copy)
        })
    }

    const layout = () => {
        stop()
        copies.forEach((copy) => copy.remove())
        copies = []
        width = viewport.clientWidth

        const fits = track.offsetWidth <= viewport.clientWidth
        viewport.classList.toggle('cel-marquee-static', fits)
        enabled = !fits && motionAllowed()

        if (toggle) {
            toggle.hidden = !enabled
        }

        if (!enabled) {
            viewport.classList.remove('cel-marquee-auto')

            return
        }

        addCopy()
        loopWidth = copies[0].offsetLeft - originals[0].offsetLeft

        // Enough copies for a whole loop to fit in the scrolling range.
        for (let count = 1; count < MARQUEE_MAX_COPIES && viewport.scrollWidth - viewport.clientWidth < loopWidth; count++) {
            addCopy()
        }

        update()
    }

    toggle?.addEventListener('click', () => {
        paused = !paused
        toggle.setAttribute('aria-pressed', String(paused))

        if (label) {
            label.textContent = paused ? toggle.dataset.celLabelPlay : toggle.dataset.celLabelPause
        }

        if (paused) {
            viewport.classList.remove('cel-marquee-auto')
        }

        update()
    })

    viewport.addEventListener('pointerenter', (event) => {
        if (event.pointerType !== 'touch') {
            hovered = true
            update()
        }
    })
    viewport.addEventListener('pointerleave', () => {
        hovered = false
        update()
    })
    viewport.addEventListener('touchstart', () => {
        touching = true
        holdForUser()
    }, { passive: true })
    viewport.addEventListener('touchend', () => {
        touching = false
        holdForUser()
    }, { passive: true })
    viewport.addEventListener('touchcancel', () => {
        touching = false
        holdForUser()
    }, { passive: true })
    viewport.addEventListener('wheel', (event) => {
        if (event.shiftKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
            holdForUser()
        }
    }, { passive: true })
    // Scrollbar grabbed with the mouse, or dragged with a pen; a click on a link does not count.
    viewport.addEventListener('pointerdown', (event) => {
        if (event.target === viewport || event.pointerType === 'pen') {
            holdForUser()
        }
    })
    viewport.addEventListener('keydown', (event) => {
        if (MARQUEE_SCROLL_KEYS.includes(event.key)) {
            holdForUser()
        }
    })
    // Momentum of a gesture after release: the restart waits for the end of the movement.
    viewport.addEventListener('scroll', () => {
        if (Date.now() < userUntil) {
            userUntil = Date.now() + MARQUEE_RESUME_DELAY
        }
    }, { passive: true })
    viewport.addEventListener('focusin', () => {
        focused = true
        update()
    })
    viewport.addEventListener('focusout', (event) => {
        if (!viewport.contains(event.relatedTarget)) {
            focused = false
            update()
        }
    })

    if ('IntersectionObserver' in window) {
        new IntersectionObserver((entries) => {
            visible = entries.some((entry) => entry.isIntersecting)
            update()
        }).observe(viewport)
    }

    if ('ResizeObserver' in window) {
        new ResizeObserver(() => {
            if (viewport.clientWidth !== width) {
                layout()
            }
        }).observe(viewport)
    }

    motionQuery.addEventListener?.('change', layout)

    layout()
}

// To call once on a page with a [data-cel-marquee] strip; no effect on the others. Call it after initMotion().
export const initMarquee = () => {
    document.querySelectorAll('[data-cel-marquee]').forEach(setupMarquee)
}

// To call once the page is loaded: tells the boot script that this script runs, then starts the reveals and the
// entrance of the screens.
export const initMotion = () => {
    const root = document.documentElement

    if (!root.classList.contains('cel-motion')) {
        return
    }

    root.classList.add('cel-motion-ready')
    initReveals()
    initEnter()
}

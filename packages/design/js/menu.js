// Phone menu (.cel-menu, components/menu.css). Without script, the panel is a list at the top of the page. With it,
// the menu button opens the panel as a full-screen modal dialog: aria-expanded on the button, focus moved into the
// panel and kept there (Tab and Shift+Tab loop), the rest of the page inert and its scrolling blocked. Escape, the
// close button or the choice of a link close it; the focus then goes back to the menu button (except after a link,
// which leaves the page). Going back above the tablet breakpoint closes it.
//
// Markup: <div class="cel-menu" data-cel-menu>
//   <button type="button" class="cel-menu__toggle" aria-expanded="false" aria-controls="menu" aria-label="Ouvrir le menu">…</button>
//   <div class="cel-menu__panel" id="menu" aria-labelledby="menu-title">
//     <div class="cel-menu__top"><p class="cel-menu__title" id="menu-title">Menu</p><button type="button" class="cel-menu__close">…</button></div>
//     … links …
//   </div>
// </div>

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

// Same value as --cel-breakpoint-tablet (var() is not available in media queries).
const WIDE = '(width >= 860px)'

export const initMenu = (root = document) => {
    root.querySelectorAll('[data-cel-menu]').forEach((menu) => {
        const toggle = menu.querySelector('.cel-menu__toggle')
        const panel = menu.querySelector('.cel-menu__panel')
        const close = menu.querySelector('.cel-menu__close')

        if (!toggle || !panel || menu.classList.contains('cel-menu--enhanced')) {
            return
        }

        const page = document.documentElement
        let inert = []

        const isOpen = () => menu.classList.contains('cel-menu--open')
        const focusables = () => [...panel.querySelectorAll(FOCUSABLE)].filter((element) => element.getClientRects().length > 0)

        const open = () => {
            menu.classList.add('cel-menu--open')
            toggle.setAttribute('aria-expanded', 'true')
            page.classList.add('cel-scroll-locked')
            // Everything outside the branch that holds the menu becomes inert: neither clickable nor reachable.
            inert = [...document.body.children].filter((element) => !element.contains(menu) && !element.inert)
            inert.forEach((element) => {
                element.inert = true
            })
            ;(close ?? focusables()[0] ?? panel).focus()
        }

        const shut = ({ restoreFocus = true } = {}) => {
            if (!isOpen()) {
                return
            }

            menu.classList.remove('cel-menu--open')
            toggle.setAttribute('aria-expanded', 'false')
            page.classList.remove('cel-scroll-locked')
            inert.forEach((element) => {
                element.inert = false
            })
            inert = []

            if (restoreFocus) {
                toggle.focus()
            }
        }

        if (!panel.id) {
            panel.id = 'cel-menu-panel'
        }
        panel.setAttribute('role', 'dialog')
        panel.setAttribute('aria-modal', 'true')
        panel.tabIndex = -1
        toggle.setAttribute('aria-controls', panel.id)
        toggle.setAttribute('aria-expanded', 'false')
        menu.classList.add('cel-menu--enhanced')

        toggle.addEventListener('click', () => (isOpen() ? shut() : open()))
        close?.addEventListener('click', () => shut())

        panel.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                event.preventDefault()
                shut()

                return
            }

            if (event.key !== 'Tab') {
                return
            }

            const elements = focusables()
            const first = elements[0]
            const last = elements[elements.length - 1]

            if (!first) {
                event.preventDefault()
            } else if (event.shiftKey && (document.activeElement === first || document.activeElement === panel)) {
                event.preventDefault()
                last.focus()
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault()
                first.focus()
            }
        })

        // Choosing a page closes the menu; the browser then follows the link.
        panel.addEventListener('click', (event) => {
            if (event.target instanceof Element && event.target.closest('a[href]')) {
                shut({ restoreFocus: false })
            }
        })

        window.matchMedia(WIDE).addEventListener('change', (event) => {
            if (event.matches) {
                shut({ restoreFocus: false })
            }
        })
    })
}

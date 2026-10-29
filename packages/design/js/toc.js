// Table of contents (.cel-toc): marks the part of the page being read. Each link leads to a heading of the page
// (href="#id"); the link of the last heading above the top third of the window gets aria-current="location", the
// first one before any heading is reached, the last one at the bottom of the page. Without script, a plain list of
// links.
//
// Markup: <aside class="cel-toc" data-cel-toc><nav aria-labelledby="toc-title">…<a href="#steps">Les étapes</a>…</nav></aside>

export const initToc = (root = document) => {
    root.querySelectorAll('[data-cel-toc]').forEach((toc) => {
        const parts = [...toc.querySelectorAll('a[href^="#"]')]
            .map((link) => [link, document.getElementById(decodeURIComponent(link.hash.slice(1)))])
            .filter(([, heading]) => heading)
        let pending = false

        if (parts.length === 0) {
            return
        }

        const update = () => {
            pending = false
            const line = window.innerHeight / 3
            const bottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
            let current = 0

            parts.forEach(([, heading], rank) => {
                if (heading.getBoundingClientRect().top <= line) {
                    current = rank
                }
            })

            if (bottom) {
                current = parts.length - 1
            }

            parts.forEach(([link], rank) => {
                if (rank === current) {
                    link.setAttribute('aria-current', 'location')
                } else {
                    link.removeAttribute('aria-current')
                }
            })
        }

        const schedule = () => {
            if (!pending) {
                pending = true
                requestAnimationFrame(update)
            }
        }

        window.addEventListener('scroll', schedule, { passive: true })
        window.addEventListener('resize', schedule)
        update()
    })
}

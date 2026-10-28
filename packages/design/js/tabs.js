// Tabs (.cel-tabs, ARIA tablist pattern). Without script, the links lead to the panels shown one under the other.
// With it, each link becomes a tab: a single panel shown, announced politely; left and right arrows, Home and End;
// only the selected tab is reachable with Tab. The hash of the address picks the starting tab.
//
// Markup: <div class="cel-tabs" data-cel-tabs>
//   <ul class="cel-tabs__list" aria-label="…"><li><a class="cel-tabs__tab" href="#panel-1">…</a></li>…</ul>
//   <div class="cel-tabs__panels"><section class="cel-tabs__panel" id="panel-1">…</section>…</div>
// </div>

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const initTabs = (root = document) => {
    root.querySelectorAll('[data-cel-tabs]').forEach((group) => {
        const list = group.querySelector('.cel-tabs__list')
        const container = group.querySelector('.cel-tabs__panels')
        const panels = [...group.querySelectorAll('.cel-tabs__panel')]
        const tabs = [...list.querySelectorAll('a.cel-tabs__tab')].map((link) => {
            const target = decodeURIComponent(link.hash.slice(1))
            const tab = document.createElement('button')
            tab.type = 'button'
            tab.className = link.className
            tab.id = `tab-${target}`
            tab.setAttribute('role', 'tab')
            tab.setAttribute('aria-controls', target)
            tab.replaceChildren(...link.childNodes)
            link.parentElement.setAttribute('role', 'presentation')
            link.replaceWith(tab)

            return tab
        })

        const select = (rank, focus = false) => {
            tabs.forEach((tab, i) => {
                tab.setAttribute('aria-selected', String(i === rank))
                tab.tabIndex = i === rank ? 0 : -1
            })
            panels.forEach((panel, i) => {
                panel.hidden = i !== rank
            })

            if (focus) {
                tabs[rank].focus()
                tabs[rank].scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: reduced() ? 'auto' : 'smooth' })
            }
        }

        list.setAttribute('role', 'tablist')
        panels.forEach((panel) => {
            panel.setAttribute('role', 'tabpanel')
            panel.setAttribute('aria-labelledby', `tab-${panel.id}`)
            panel.tabIndex = 0
        })
        group.classList.add('cel-tabs--active')

        tabs.forEach((tab, rank) => {
            tab.addEventListener('click', () => select(rank))
            tab.addEventListener('keydown', (event) => {
                const last = tabs.length - 1
                const target = { ArrowRight: rank === last ? 0 : rank + 1, ArrowLeft: rank === 0 ? last : rank - 1, Home: 0, End: last }[event.key]

                if (target !== undefined) {
                    event.preventDefault()
                    select(target, true)
                }
            })
        })

        const fromHash = panels.findIndex((panel) => `#${panel.id}` === window.location.hash)
        select(Math.max(fromHash, 0))
        // After the first render: only tab changes are announced.
        container?.setAttribute('aria-live', 'polite')
    })
}

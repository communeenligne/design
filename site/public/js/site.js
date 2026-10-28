// Script of the documentation site: theme, tabs, phone menu, animations and combobox of the package, copy buttons,
// live search, demonstrations.

import { initTheme } from '/design/js/theme.js'
import { initTabs } from '/design/js/tabs.js'
import { initMenu } from '/design/js/menu.js'
import { initMarquee, initMotion, initSmoothAnchors } from '/design/js/motion.js'
import { initCombobox } from '/design/js/combobox.js'

initTheme()
initTabs()
initMenu()
initMotion()
initSmoothAnchors()
initMarquee()

// ---------- Combobox demonstration: a few municipalities, searched in the page (never a remote service) ----------

const COMMUNES = [
    ['57702', 'Veckersviller', 'Moselle · 57370 · 480 habitants'],
    ['57606', 'Saint-Avold', 'Moselle · 57500 · 15 600 habitants'],
    ['15187', 'Saint-Flour', 'Cantal · 15100 · 6 500 habitants'],
    ['64483', 'Saint-Jean-de-Luz', 'Pyrénées-Atlantiques · 64500 · 14 000 habitants'],
    ['67437', 'Saverne', 'Bas-Rhin · 67700 · 11 000 habitants'],
    ['88413', 'Saint-Dié-des-Vosges', 'Vosges · 88100 · 19 000 habitants'],
    ['55545', 'Verdun', 'Meuse · 55100 · 16 000 habitants'],
    ['70550', 'Vesoul', 'Haute-Saône · 70000 · 15 000 habitants'],
    ['54578', 'Vandœuvre-lès-Nancy', 'Meurthe-et-Moselle · 54500 · 29 000 habitants'],
].map(([id, label, details]) => ({ id, label, details }))

const fold = (text) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()

document.querySelectorAll('[data-cel-combobox][data-doc-communes]').forEach((element) => {
    initCombobox(element, {
        search: async (query) => COMMUNES.filter((commune) => fold(commune.label).includes(fold(query))).slice(0, 6),
    })
})

// ---------- Entrance demonstration: replays the entrance of the screen ----------

document.querySelectorAll('[data-doc-enter-replay]').forEach((button) => {
    const screen = button.parentElement.querySelector('[data-doc-enter]')

    if (!document.documentElement.classList.contains('cel-motion')) {
        return
    }

    button.hidden = false
    button.addEventListener('click', () => {
        screen.classList.remove('cel-entered')
        void screen.offsetWidth
        requestAnimationFrame(() => screen.classList.add('cel-entered'))
    })
})

// The theme switch only makes sense with this script: it is hidden without it.
document.querySelectorAll('[data-cel-theme][hidden]').forEach((groupe) => groupe.removeAttribute('hidden'))

// ---------- Copy the code of an example ----------

document.querySelectorAll('.cel-code').forEach((block) => {
    if (!navigator.clipboard) {
        return
    }

    const button = document.createElement('button')
    button.type = 'button'
    button.className = 'cel-code__copy'
    button.innerHTML = '<svg class="cel-icon cel-icon--18" aria-hidden="true" focusable="false"><use></use></svg>'
    const icon = button.querySelector('use')
    // "Duplicate" icon at rest, check mark for two seconds after copying; the accessible name follows.
    const setCopied = (copied) => {
        const label = copied ? 'Code copié' : 'Copier le code'
        icon.setAttribute('href', `/design/icons/sprite.svg#${copied ? 'check' : 'document-duplicate'}`)
        button.setAttribute('aria-label', label)
        button.title = label
    }
    setCopied(false)
    button.addEventListener('click', async () => {
        await navigator.clipboard.writeText(block.querySelector('code').textContent)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    })
    block.append(button)
})

// ---------- Live search: Ctrl+K (⌘K on Mac), or the button of the header ----------
// Modal window (<dialog>): field as a combobox, results as a listbox (aria-activedescendant); arrows to choose, Enter to
// open, Escape to close. The index (/search-index.json) is loaded at the first opening. Without script, the button
// stays hidden: the navigation and the breadcrumb are enough.

const dialog = document.querySelector('[data-search]')
const openButton = document.querySelector('[data-search-open]')

if (dialog && openButton && typeof dialog.showModal === 'function') {
    const field = dialog.querySelector('input')
    const list = dialog.querySelector('[data-search-results]')
    const status = dialog.querySelector('[data-search-status]')
    const mac = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent)
    const MAX = 12
    let searchIndex = null
    let results = []
    let active = -1

    openButton.querySelector('[data-search-shortcut]').textContent = mac ? '⌘ K' : 'Ctrl K'
    openButton.setAttribute('aria-keyshortcuts', mac ? 'Meta+K' : 'Control+K')
    openButton.hidden = false

    const normalize = (text) => text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

    const load = async () => {
        if (searchIndex === null) {
            searchIndex = fetch('/search-index.json')
                .then((response) => response.json())
                .then(({ entries }) => entries.map((entry) => ({ ...entry, _title: normalize(entry.title), _text: normalize(`${entry.page ?? ''} ${entry.summary} ${entry.words}`) })))
                .catch(() => [])
        }

        return searchIndex
    }

    const excerpt = (entry, word) => {
        if (entry.summary) {
            return entry.summary
        }

        const position = normalize(entry.words).indexOf(word)

        return position === -1 ? '' : `…${entry.words.slice(Math.max(0, position - 50), position + 90)}…`
    }

    const select = (rank) => {
        active = rank
        ;[...list.children].forEach((element, i) => element.setAttribute('aria-selected', String(i === rank)))

        if (rank >= 0) {
            field.setAttribute('aria-activedescendant', `search-result-${rank}`)
            list.children[rank].scrollIntoView({ block: 'nearest' })
        } else {
            field.removeAttribute('aria-activedescendant')
        }
    }

    const search = async () => {
        const entries = await load()
        const query = field.value.trim()
        const words = normalize(query).split(/\s+/).filter(Boolean)

        results = words.length === 0 ? [] : entries
            .map((entry) => {
                let score = 0

                for (const word of words) {
                    const inTitle = entry._title.includes(word)

                    if (!inTitle && !entry._text.includes(word)) {
                        return null
                    }

                    score += (entry._title.startsWith(word) ? 30 : inTitle ? 20 : 2) + (entry.page ? 0 : 5)
                }

                return { entry, score }
            })
            .filter(Boolean)
            .sort((a, b) => b.score - a.score)
            .slice(0, MAX)
            .map(({ entry }) => entry)

        list.replaceChildren(...results.map((entry, rank) => {
            const element = document.createElement('li')
            element.id = `search-result-${rank}`
            element.setAttribute('role', 'option')
            element.setAttribute('aria-selected', 'false')
            element.className = 'doc-search__result'

            const link = document.createElement('a')
            link.href = entry.url
            link.tabIndex = -1
            const path = document.createElement('span')
            path.className = 'doc-search__path'
            path.textContent = [entry.section, entry.page].filter(Boolean).join(' › ') || 'Accueil'
            const title = document.createElement('span')
            title.className = 'doc-search__title'
            title.textContent = entry.title
            link.append(path, title)

            const summary = excerpt(entry, words[0])
            if (summary) {
                const text = document.createElement('span')
                text.className = 'doc-search__excerpt'
                text.textContent = summary
                link.append(text)
            }

            element.append(link)
            element.addEventListener('mousemove', () => active !== rank && select(rank))

            return element
        }))

        field.setAttribute('aria-expanded', String(results.length > 0))
        status.textContent = words.length === 0 ? '' : results.length === 0 ? `Aucun résultat pour « ${query} ».` : `${results.length} résultat${results.length > 1 ? 's' : ''}`
        select(results.length > 0 ? 0 : -1)
    }

    const show = () => {
        if (dialog.open) {
            return
        }

        dialog.showModal()
        field.select()
        load()
    }

    openButton.addEventListener('click', show)
    dialog.querySelector('[data-search-close]').addEventListener('click', () => dialog.close())
    // A click on the backdrop (outside the frame) closes the window.
    dialog.addEventListener('click', (event) => event.target === dialog && dialog.close())
    dialog.addEventListener('close', () => openButton.focus())

    document.addEventListener('keydown', (event) => {
        if ((event.ctrlKey || event.metaKey) && !event.altKey && event.key.toLowerCase() === 'k') {
            event.preventDefault()
            dialog.open ? dialog.close() : show()
        }
    })

    field.addEventListener('input', search)
    field.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault()

            if (results.length > 0) {
                const step = event.key === 'ArrowDown' ? 1 : -1
                select((active + step + results.length) % results.length)
            }
        } else if (event.key === 'Enter' && active >= 0) {
            event.preventDefault()
            window.location.href = results[active].url
            dialog.close()
        }
    })
}

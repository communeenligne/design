// Script of the documentation site: theme, tabs, phone menu, animations, combobox, table of contents and feedback of
// the package, search palette of the package on the index of the site, copy buttons, demonstrations.

import { initTheme } from '/design/js/theme.js'
import { initTabs } from '/design/js/tabs.js'
import { initMenu } from '/design/js/menu.js'
import { initMarquee, initMotion, initSmoothAnchors } from '/design/js/motion.js'
import { initCombobox } from '/design/js/combobox.js'
import { initToc } from '/design/js/toc.js'
import { initFeedback } from '/design/js/feedback.js'
import { endpointSearch, indexSearch, initSearch } from '/design/js/search.js'
import { initVideo } from '/design/js/video.js'
import { simulatedServer } from '/js/simulated-server.js'

initTheme()
initTabs()
initMenu()
initMotion()
initSmoothAnchors()
initMarquee()
initToc()
initVideo()
// Demonstration of the feedback: nothing is sent (no server behind the site).
initFeedback(document, { onAnswer: async () => {} })

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

// ---------- Search palette of the package: the static index of the site (/search-index.json) ----------

initSearch(document.querySelector('#search'), { search: indexSearch('/search-index.json', { fallbackSection: 'Accueil' }) })

// Demonstration of the endpoint adapter (page of the palette): a second palette, without shortcuts, on a simulated
// server.
initSearch(document.querySelector('#demo-search'), { search: endpointSearch('/aide/recherche', { request: simulatedServer }), delay: 200, shortcuts: false })

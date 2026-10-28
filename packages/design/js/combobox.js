// Combobox (.cel-combobox): a text field that proposes results while typing, ARIA combobox pattern with a list
// popup. Without script, a plain text field that the server reads. With it: role="combobox", aria-expanded,
// aria-controls, aria-activedescendant; Down and Up arrows move in the list, Enter chooses, Escape closes; the number
// of results is announced in a polite live region. The list fades in and out (js/motion.js); the ARIA state changes
// without waiting for the fade. The results come from the project (search option), never from this script.
//
// Markup:
// <div class="cel-field cel-combobox" data-cel-combobox data-cel-message-none="Aucune commune trouvée"
//      data-cel-message-one="1 commune trouvée" data-cel-message-many="# communes trouvées"
//      data-cel-message-selected="# choisie" data-cel-message-unavailable="Recherche indisponible">
//   <label for="commune">Commune</label>
//   <div class="cel-combobox__control">
//     <svg class="cel-icon cel-combobox__icon" aria-hidden="true">…</svg>
//     <input id="commune" class="cel-combobox__input" type="text" autocomplete="off" data-cel-combobox-input>
//   </div>
//   <ul id="communes" class="cel-combobox__list" aria-label="Communes trouvées" hidden data-cel-combobox-list></ul>
//   <p class="cel-visually-hidden" aria-live="polite" data-cel-combobox-status></p>
// </div>
//
// initCombobox(element, {
//     search: async (query, { signal }) => [{ id: '57702', label: 'Veckersviller', details: 'Moselle · 57370' }],
//     onChoose: (item) => {},  // a result is chosen: the field shows its label
//     onInput: (text) => {},   // the text changes: a result chosen before no longer applies
// })

import { fadeIn, fadeOut } from './motion.js'

export const initCombobox = (root, { search, onChoose = () => {}, onInput = () => {}, minLength = 2, delay = 200 } = {}) => {
    const input = root.querySelector('[data-cel-combobox-input]')
    const list = root.querySelector('[data-cel-combobox-list]')
    const status = root.querySelector('[data-cel-combobox-status]')
    const messages = root.dataset

    if (!input || !list || typeof search !== 'function') {
        return null
    }

    let results = []
    let active = -1
    let timer = null
    let controller = null

    input.setAttribute('role', 'combobox')
    input.setAttribute('aria-autocomplete', 'list')
    input.setAttribute('aria-expanded', 'false')
    input.setAttribute('aria-controls', list.id)
    list.setAttribute('role', 'listbox')

    const announce = (message = '') => {
        if (status) {
            status.textContent = message
        }
    }

    const isOpen = () => !list.hidden && !list.classList.contains('cel-fade-out') && results.length > 0

    const open = () => {
        const wasHidden = list.hidden || list.classList.contains('cel-fade-out')
        list.hidden = false

        if (wasHidden) {
            fadeIn(list)
        }

        input.setAttribute('aria-expanded', 'true')
    }

    const close = () => {
        fadeOut(list)
        input.setAttribute('aria-expanded', 'false')
        input.removeAttribute('aria-activedescendant')
        active = -1
    }

    const highlight = (index) => {
        active = index
        ;[...list.children].forEach((option, i) => option.setAttribute('aria-selected', String(i === index)))

        if (index < 0) {
            input.removeAttribute('aria-activedescendant')

            return
        }

        const option = list.children[index]
        input.setAttribute('aria-activedescendant', option.id)
        option.scrollIntoView({ block: 'nearest' })
    }

    const choose = (index) => {
        const item = results[index]

        if (!item) {
            return
        }

        input.value = item.label
        close()
        announce((messages.celMessageSelected ?? '#').replace('#', item.label))
        onChoose(item)
    }

    const render = () => {
        list.replaceChildren(...results.map((item, index) => {
            const option = document.createElement('li')
            const name = document.createElement('span')

            option.id = `${list.id}-${item.id}`
            option.className = 'cel-combobox__option'
            option.setAttribute('role', 'option')
            option.setAttribute('aria-selected', 'false')
            name.className = 'cel-combobox__name'
            name.textContent = item.label
            option.append(name)

            if (item.details) {
                const details = document.createElement('span')
                details.className = 'cel-combobox__details'
                details.textContent = item.details
                option.append(details)
            }

            // mousedown rather than click: the choice is made before the field loses the focus.
            option.addEventListener('mousedown', (event) => {
                event.preventDefault()
                choose(index)
            })

            return option
        }))

        if (results.length > 0) {
            open()
            highlight(-1)
            announce(results.length > 1 ? (messages.celMessageMany ?? '#').replace('#', String(results.length)) : messages.celMessageOne)
        } else {
            close()
            announce(messages.celMessageNone)
        }
    }

    const run = async (query) => {
        controller?.abort()
        controller = new AbortController()

        try {
            results = (await search(query, { signal: controller.signal })) ?? []
            render()
        } catch (error) {
            if (error?.name !== 'AbortError') {
                results = []
                close()
                announce(messages.celMessageUnavailable)
            }
        }
    }

    const clear = () => {
        controller?.abort()
        clearTimeout(timer)
        results = []
        list.replaceChildren()
        close()
        announce()
    }

    input.addEventListener('input', () => {
        clearTimeout(timer)
        onInput(input.value)

        const query = input.value.trim()

        if (query.length < minLength) {
            clear()

            return
        }

        timer = setTimeout(() => run(query), delay)
    })

    input.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowDown' && results.length > 0) {
            event.preventDefault()

            if (!isOpen()) {
                open()
            }

            highlight(Math.min(active + 1, results.length - 1))
        } else if (event.key === 'ArrowUp' && isOpen()) {
            event.preventDefault()
            highlight(Math.max(active - 1, 0))
        } else if (event.key === 'Enter' && isOpen() && active >= 0) {
            event.preventDefault()
            choose(active)
        } else if (event.key === 'Escape' && isOpen()) {
            event.preventDefault()
            close()
        }
    })

    input.addEventListener('blur', close)

    // For a "Change" button: empties the field and the list, gives the focus back to the field.
    return {
        clear: () => {
            input.value = ''
            clear()
            onInput('')
            input.focus()
        },
    }
}

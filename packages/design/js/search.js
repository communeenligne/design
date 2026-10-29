// Search palette (.cel-search): a modal window to search a site, opened by its trigger (.cel-search-trigger), by
// Ctrl K (⌘ K on a Mac) or by the / key, except when the focus is already in a text field. ARIA combobox pattern with
// a listbox: the field keeps the focus, aria-activedescendant follows the active result; Down and Up arrows move,
// Enter opens, Escape closes. The number of results is announced in a polite live region (the status line); an empty
// state and a loading state. The focus stays in the window (modal <dialog>) and goes back to the trigger when it
// closes. Without script, the trigger is a link to the search page of the site and the window never opens.
//
// The results come from the project: initSearch() receives a function (query, { signal }) => [{ url, title, section,
// excerpt }]. Two adapters build one: indexSearch(url), a static index searched in the page (documentation site), and
// endpointSearch(url), a JSON address that a server answers (help center).
//
// Markup:
// <a class="cel-search-trigger" href="/recherche/" data-cel-search-open="search">
//   <svg class="cel-icon" aria-hidden="true">…</svg><span class="cel-search-trigger__label">Rechercher</span>
//   <kbd class="cel-kbd" data-cel-search-shortcut>Ctrl K</kbd>
// </a>
// <dialog class="cel-search" id="search" aria-labelledby="search-title" data-cel-search
//         data-cel-message-none="Aucun résultat pour « # »" data-cel-message-one="1 résultat"
//         data-cel-message-many="# résultats" data-cel-message-loading="Recherche en cours…"
//         data-cel-message-error="La recherche est indisponible pour le moment.">
//   <div class="cel-search__header">
//     <h2 class="cel-visually-hidden" id="search-title">Rechercher dans l'aide</h2>
//     <svg class="cel-icon cel-search__icon" aria-hidden="true">…</svg>
//     <label class="cel-visually-hidden" for="search-field">Mots recherchés</label>
//     <input id="search-field" class="cel-search__input" type="search" autocomplete="off" data-cel-search-input>
//     <button type="button" class="cel-search__close" data-cel-search-close><kbd class="cel-kbd">Échap</kbd>…</button>
//   </div>
//   <p class="cel-search__status" role="status" data-cel-search-status></p>
//   <div class="cel-search__empty" hidden data-cel-search-empty>… <span data-cel-search-query></span> …</div>
//   <ul class="cel-search__results" id="search-results" aria-label="Résultats" data-cel-search-results></ul>
//   <p class="cel-search__help">…</p>
// </dialog>
//
// initSearch(document.querySelector('[data-cel-search]'), { search: indexSearch('/search-index.json') })
// Options: minLength (1), delay before searching (0 ms; 200 for a server), shortcuts (true: Ctrl K, ⌘ K and /; false
// for a second palette in the same page). Returns { open, close }.

// Lowercase, without accents: "Délibération" and "deliberation" match. Each character keeps its place.
export const fold = (text = '') => [...text].map((character) => character.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().slice(0, 1) || character).join('')

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'

const isMac = () => /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent)

const isEditable = (element) => Boolean(element) && (element.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(element.tagName))

// ---------- Adapters ----------

// A static index, loaded once (at the first opening, or the first search): { entries: [{ url, title, section, page,
// summary, words }] }. Each word of the query must be in the entry; the title counts more, its start even more.
// The excerpt is the summary, or the passage of the words around the first word searched.
export const indexSearch = (url, { limit = 12, fallbackSection = '' } = {}) => {
    let entries = null

    const load = () => {
        entries ??= fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Search index: ${response.status}`)
                }

                return response.json()
            })
            .then(({ entries: list }) => list.map((entry) => ({ ...entry, folded: { title: fold(entry.title), text: fold(`${entry.page ?? ''} ${entry.summary ?? ''} ${entry.words ?? ''}`) } })))
            .catch((error) => {
                entries = null
                throw error
            })

        return entries
    }

    const excerptOf = (entry, word) => {
        if (entry.summary) {
            return entry.summary
        }

        const position = fold(entry.words ?? '').indexOf(word)

        return position === -1 ? '' : `…${entry.words.slice(Math.max(0, position - 50), position + 90)}…`
    }

    const search = async (query) => {
        const list = await load()
        const words = fold(query).split(/\s+/).filter(Boolean)

        if (words.length === 0) {
            return []
        }

        return list
            .map((entry) => {
                let score = 0

                for (const word of words) {
                    const inTitle = entry.folded.title.includes(word)

                    if (!inTitle && !entry.folded.text.includes(word)) {
                        return null
                    }

                    score += (entry.folded.title.startsWith(word) ? 30 : inTitle ? 20 : 2) + (entry.page ? 0 : 5)
                }

                return { entry, score }
            })
            .filter(Boolean)
            .sort((a, b) => b.score - a.score)
            .slice(0, limit)
            .map(({ entry }) => ({
                url: entry.url,
                title: entry.title,
                section: [entry.section, entry.page].filter(Boolean).join(' › ') || fallbackSection,
                excerpt: excerptOf(entry, words[0]),
            }))
    }

    search.preload = () => load().catch(() => {})

    return search
}

// A JSON address answered by a server: GET url?q=… (param), answer [{ url, title, section, excerpt }] or
// { results: [...] }. The previous request is cancelled at each keystroke (signal). request: the fetch function
// (headers of a session, a server simulated in a demonstration).
export const endpointSearch = (url, { param = 'q', headers = {}, request = (...args) => fetch(...args) } = {}) => async (query, { signal } = {}) => {
    const address = new URL(url, window.location.href)
    address.searchParams.set(param, query)

    const response = await request(address, { signal, headers: { Accept: 'application/json', ...headers } })

    if (!response.ok) {
        throw new Error(`Search: ${response.status}`)
    }

    const data = await response.json()

    return (Array.isArray(data) ? data : data.results ?? []).map(({ url: target, title, section = '', excerpt = '' }) => ({ url: target, title, section, excerpt }))
}

// ---------- Palette ----------

// The text, with the searched words in <mark class="cel-search__mark">: DOM nodes, never HTML.
const highlight = (text, words) => {
    const folded = fold(text)
    const marked = new Array(text.length).fill(false)

    for (const word of words) {
        for (let start = folded.indexOf(word); start !== -1 && word; start = folded.indexOf(word, start + word.length)) {
            marked.fill(true, start, start + word.length)
        }
    }

    const nodes = []
    let from = 0

    for (let index = 1; index <= text.length; index++) {
        if (index === text.length || marked[index] !== marked[from]) {
            const part = text.slice(from, index)

            if (marked[from]) {
                const mark = document.createElement('mark')
                mark.className = 'cel-search__mark'
                mark.textContent = part
                nodes.push(mark)
            } else {
                nodes.push(document.createTextNode(part))
            }

            from = index
        }
    }

    return nodes
}

export const initSearch = (dialog, { search, minLength = 1, delay = 0, shortcuts = true } = {}) => {
    const input = dialog?.querySelector('[data-cel-search-input]')
    const list = dialog?.querySelector('[data-cel-search-results]')
    const status = dialog?.querySelector('[data-cel-search-status]')
    const empty = dialog?.querySelector('[data-cel-search-empty]')
    const messages = dialog?.dataset ?? {}

    if (!input || !list || typeof search !== 'function' || typeof dialog.showModal !== 'function' || dialog.classList.contains('cel-search--enhanced')) {
        return null
    }

    const mac = isMac()
    const shortcut = mac ? '⌘ K' : 'Ctrl K'
    let results = []
    let active = -1
    let timer = null
    let controller = null
    let opener = null

    dialog.classList.add('cel-search--enhanced')
    list.id ||= `${dialog.id || 'cel-search'}-results`
    input.setAttribute('role', 'combobox')
    input.setAttribute('aria-autocomplete', 'list')
    input.setAttribute('aria-expanded', 'false')
    input.setAttribute('aria-controls', list.id)
    list.setAttribute('role', 'listbox')

    if (status?.id && !(input.getAttribute('aria-describedby') ?? '').split(' ').includes(status.id)) {
        input.setAttribute('aria-describedby', [input.getAttribute('aria-describedby'), status.id].filter(Boolean).join(' '))
    }

    const message = (name, value = '') => (messages[name] ?? '').replace('#', value)

    const select = (rank) => {
        active = rank
        ;[...list.children].forEach((element, index) => element.setAttribute('aria-selected', String(index === rank)))

        if (rank >= 0) {
            input.setAttribute('aria-activedescendant', list.children[rank].id)
            list.children[rank].scrollIntoView({ block: 'nearest' })
        } else {
            input.removeAttribute('aria-activedescendant')
        }
    }

    const setLoading = (loading) => {
        dialog.classList.toggle('cel-search--loading', loading)
        list.setAttribute('aria-busy', String(loading))
    }

    const render = (found, query, failed = false) => {
        const words = fold(query).split(/\s+/).filter(Boolean)
        results = found

        list.replaceChildren(...found.map((result, rank) => {
            const item = document.createElement('li')
            item.id = `${list.id}-${rank}`
            item.className = 'cel-search__result'
            item.setAttribute('role', 'option')
            item.setAttribute('aria-selected', 'false')

            const link = document.createElement('a')
            link.href = result.url
            link.tabIndex = -1

            if (result.section) {
                const path = document.createElement('span')
                path.className = 'cel-search__path'
                path.textContent = result.section
                link.append(path)
            }

            const title = document.createElement('span')
            title.className = 'cel-search__title'
            title.append(...highlight(result.title, words))
            link.append(title)

            if (result.excerpt) {
                const excerpt = document.createElement('span')
                excerpt.className = 'cel-search__excerpt'
                excerpt.append(...highlight(result.excerpt, words))
                link.append(excerpt)
            }

            link.addEventListener('click', () => dialog.close())
            item.append(link)
            item.addEventListener('mousemove', () => active !== rank && select(rank))

            return item
        }))

        setLoading(false)
        input.setAttribute('aria-expanded', String(found.length > 0))

        if (status) {
            status.textContent = !query ? '' : failed ? message('celMessageError') : found.length === 0 ? message('celMessageNone', query) : found.length === 1 ? message('celMessageOne', '1') : message('celMessageMany', String(found.length))
        }

        if (empty) {
            empty.hidden = !query || failed || found.length > 0
            empty.querySelectorAll('[data-cel-search-query]').forEach((element) => {
                element.textContent = query
            })
        }

        select(found.length > 0 ? 0 : -1)
    }

    const run = () => {
        const query = input.value.trim()

        controller?.abort()
        clearTimeout(timer)

        if (query.length < minLength) {
            render([], '')
            return
        }

        controller = new AbortController()
        const { signal } = controller
        setLoading(true)

        if (status && messages.celMessageLoading) {
            status.textContent = messages.celMessageLoading
        }

        timer = setTimeout(async () => {
            try {
                const found = await search(query, { signal })

                if (!signal.aborted) {
                    render(found ?? [], query)
                }
            } catch (error) {
                if (!signal.aborted && error.name !== 'AbortError') {
                    render([], query, true)
                }
            }
        }, delay)
    }

    const triggers = () => [...document.querySelectorAll('[data-cel-search-open]')].filter((trigger) => !dialog.id || !trigger.dataset.celSearchOpen || trigger.dataset.celSearchOpen === dialog.id)

    const open = (from = document.activeElement) => {
        if (dialog.open) {
            return
        }

        opener = from instanceof HTMLElement && from !== document.body ? from : triggers()[0] ?? null
        dialog.showModal()
        input.select()
        search.preload?.()
    }

    const close = () => dialog.open && dialog.close()

    // The links become buttons: they open a window, they do not lead to another page.
    triggers().forEach((trigger) => {
        const button = trigger instanceof HTMLButtonElement ? trigger : document.createElement('button')

        if (button !== trigger) {
            button.type = 'button'
            button.className = trigger.className
            button.dataset.celSearchOpen = trigger.dataset.celSearchOpen
            button.replaceChildren(...trigger.childNodes)
            if (trigger.hasAttribute('aria-label')) {
                button.setAttribute('aria-label', trigger.getAttribute('aria-label'))
            }
            trigger.replaceWith(button)
        }

        button.setAttribute('aria-haspopup', 'dialog')
        button.setAttribute('aria-keyshortcuts', mac ? 'Meta+K /' : 'Control+K /')
        if (dialog.id) {
            button.setAttribute('aria-controls', dialog.id)
        }
        button.addEventListener('click', () => open(button))
    })

    document.querySelectorAll('[data-cel-search-shortcut]').forEach((element) => {
        element.textContent = shortcut
    })
    document.querySelectorAll('[data-cel-search-hint][hidden]').forEach((element) => {
        element.hidden = false
    })

    dialog.querySelector('[data-cel-search-close]')?.addEventListener('click', close)
    // Tab and Shift+Tab loop in the window: a modal <dialog> would let the focus leave for the browser.
    dialog.addEventListener('keydown', (event) => {
        if (event.key !== 'Tab') {
            return
        }

        const focusable = [...dialog.querySelectorAll(FOCUSABLE)].filter((element) => element.tabIndex >= 0 && element.getClientRects().length > 0)
        const first = focusable[0]
        const last = focusable.at(-1)

        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault()
            last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault()
            first.focus()
        }
    })
    // A click on the backdrop (outside the frame) closes the window.
    dialog.addEventListener('click', (event) => event.target === dialog && close())
    dialog.addEventListener('close', () => {
        controller?.abort()
        setLoading(false)
        opener?.focus()
    })

    document.addEventListener('keydown', (event) => {
        if (!shortcuts) {
            return
        }

        const command = (event.ctrlKey || event.metaKey) && !event.altKey && event.key.toLowerCase() === 'k'
        const slash = event.key === '/' && !event.ctrlKey && !event.metaKey && !event.altKey

        if (dialog.open) {
            if (command) {
                event.preventDefault()
                close()
            }
            return
        }

        if ((command || slash) && !isEditable(document.activeElement)) {
            event.preventDefault()
            open()
        }
    })

    input.addEventListener('input', run)
    input.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault()

            if (results.length > 0) {
                const step = event.key === 'ArrowDown' ? 1 : -1
                select((active + step + results.length) % results.length)
            }
        } else if (event.key === 'Escape') {
            // A search field would only clear its text: Escape closes at once.
            event.preventDefault()
            close()
        } else if (event.key === 'Enter') {
            event.preventDefault()

            if (active >= 0) {
                const { url } = results[active]
                close()
                window.location.href = url
            }
        }
    })

    return { open, close }
}

// List filter: a group of aria-pressed buttons (the segmented control .cel-segmented, or .cel-filter on the strong
// surface) that keeps, in a list, the items whose tags contain the pressed value (topics of a help center by role).
// Without script, the group stays hidden (hidden attribute) and the whole list shows. With it, the group appears; a
// button pressed hides the other items (hidden attribute), shows the message when nothing is left, and announces the
// number of items kept in a polite live region. An item without tags always shows; the value "" keeps everything.
//
// Markup:
// <div class="cel-segmented" role="group" aria-label="Filtrer par rôle" hidden data-cel-list-filter="topics"
//      data-cel-message-none="Aucune rubrique pour ce rôle." data-cel-message-one="1 rubrique"
//      data-cel-message-many="# rubriques">
//   <button type="button" class="cel-segmented__option" aria-pressed="true" data-cel-list-filter-value="">Tous</button>
//   <button type="button" class="cel-segmented__option" aria-pressed="false" data-cel-list-filter-value="mayor">Maire</button>
// </div>
// <ul id="topics">
//   <li data-cel-list-filter-tags="mayor office">…</li>
// </ul>
// <p hidden data-cel-list-filter-empty="topics">Aucune rubrique pour ce rôle pour l'instant.</p>
// <p class="cel-visually-hidden" role="status" data-cel-list-filter-status="topics"></p>
//
// initListFilter(document, { onChange: (value, count) => {} }) — onChange: to keep the choice in the address, say.

// Whether an item with these tags (space separated) shows for this value.
export const matchesFilter = (tags, value) => !value || tags === undefined || tags.split(/\s+/).includes(value)

export const initListFilter = (root = document, { onChange = () => {} } = {}) => {
    const groups = root instanceof Element && root.matches('[data-cel-list-filter]') ? [root] : [...root.querySelectorAll('[data-cel-list-filter]')]

    groups.forEach((group) => {
        const id = group.dataset.celListFilter
        const list = document.getElementById(id)
        const buttons = [...group.querySelectorAll('[data-cel-list-filter-value]')]

        if (!list || buttons.length === 0 || group.classList.contains('cel-list-filter--enhanced')) {
            return
        }

        const empty = document.querySelector(`[data-cel-list-filter-empty="${id}"]`)
        const status = document.querySelector(`[data-cel-list-filter-status="${id}"]`)
        const messages = group.dataset

        const apply = (value, announce) => {
            let count = 0

            buttons.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.celListFilterValue === value)))
            ;[...list.children].forEach((item) => {
                item.hidden = !matchesFilter(item.dataset.celListFilterTags, value)
                count += item.hidden ? 0 : 1
            })

            if (empty) {
                empty.hidden = count > 0
            }

            if (status && announce) {
                const message = count === 0 ? messages.celMessageNone : count === 1 ? messages.celMessageOne : messages.celMessageMany
                status.textContent = (message ?? '').replace('#', String(count))
            }

            return count
        }

        group.classList.add('cel-list-filter--enhanced')
        group.hidden = false
        buttons.forEach((button) => {
            button.addEventListener('click', () => {
                const value = button.dataset.celListFilterValue
                onChange(value, apply(value, true))
            })
        })

        const pressed = buttons.find((button) => button.getAttribute('aria-pressed') === 'true') ?? buttons[0]
        apply(pressed.dataset.celListFilterValue, false)
    })
}

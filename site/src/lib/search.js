// Markup of the search palette of the package (js/search.js), written once for this site, the help center
// demonstrations and the component page: the trigger (a link to the search page without script) and the window.

const icon = (name, classes = '') => `<svg class="cel-icon${classes ? ` ${classes}` : ''}" aria-hidden="true" focusable="false"><use href="/design/icons/sprite.svg#${name}"></use></svg>`

export const searchTrigger = ({ id = 'search', href = '/search/', label = 'Rechercher', name } = {}) => `<a class="cel-search-trigger" href="${href}" data-cel-search-open="${id}"${name ? ` aria-label="${name}"` : ''}>${icon('magnifying-glass')}<span class="cel-search-trigger__label">${label}</span><kbd class="cel-kbd" data-cel-search-shortcut>Ctrl K</kbd></a>`

export const searchPalette = ({ id = 'search', title, placeholder, empty = 'Essayez un autre mot, ou parcourez les rubriques.' }) => `<dialog class="cel-search" id="${id}" aria-labelledby="${id}-title" data-cel-search
        data-cel-message-none="Aucun résultat pour « # »." data-cel-message-one="1 résultat" data-cel-message-many="# résultats"
        data-cel-message-loading="Recherche en cours…" data-cel-message-error="La recherche est indisponible pour le moment. Réessayez dans un instant.">
    <div class="cel-search__header">
        <h2 class="cel-visually-hidden" id="${id}-title">${title}</h2>
        ${icon('magnifying-glass', 'cel-icon--20 cel-icon--bold cel-search__icon')}
        <label class="cel-visually-hidden" for="${id}-field">Mots recherchés</label>
        <input id="${id}-field" class="cel-search__input" type="search" placeholder="${placeholder}" autocomplete="off" spellcheck="false" data-cel-search-input>
        <button type="button" class="cel-search__close" data-cel-search-close><kbd class="cel-kbd">Échap</kbd><span class="cel-visually-hidden">Fermer la recherche</span></button>
    </div>
    <p class="cel-search__status" id="${id}-status" role="status" data-cel-search-status></p>
    <div class="cel-search__empty" hidden data-cel-search-empty>
        <strong>Aucun résultat pour « <span data-cel-search-query></span> »</strong>
        <p>${empty}</p>
    </div>
    <ul class="cel-search__results" id="${id}-results" aria-label="Résultats" data-cel-search-results></ul>
    <p class="cel-search__help"><span><kbd class="cel-kbd">↑</kbd> <kbd class="cel-kbd">↓</kbd> pour choisir</span><span><kbd class="cel-kbd">Entrée</kbd> pour ouvrir</span><span><kbd class="cel-kbd">Échap</kbd> pour fermer</span></p>
</dialog>`

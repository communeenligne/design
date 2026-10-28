// Previews of the components for the section index: a small rendering, made of the classes of the package, set in an
// inert container and hidden from screen readers (only the title of the tile is a link). background: surface of the
// preview (muted by default, strong, deep); full: edge to edge.

const icon = (name, classes = '') => `<svg class="cel-icon${classes ? ` ${classes}` : ''}" aria-hidden="true"><use href="/design/icons/sprite.svg#${name}"></use></svg>`

export const PREVIEWS = {
    '/components/button/': { html: `<span class="cel-button">J'inscris ma commune</span>` },
    '/components/link/': { html: `<span class="cel-link cel-link--arrow">Voir le détail du tarif ${icon('arrow-right', 'cel-icon--16 cel-icon--bold')}</span>` },
    '/components/field/': { html: `<div class="cel-field"><span>Nom de la commune</span><input type="text" value="Veckersviller"></div>` },
    '/components/badge/': { html: `<span class="cel-badge cel-badge--success">Inclus dans l'offre</span><span class="cel-badge cel-badge--outline">Bientôt</span>` },
    '/components/pill/': { html: `<span class="cel-pill">Informer <span class="cel-pill__count">8</span></span><span class="cel-pill"><span class="cel-dot"></span>En ligne</span>` },
    '/components/banner/': { full: true, html: `<div class="cel-banner"><div class="cel-banner__inner">${icon('help-video', 'cel-icon--20 cel-banner__icon')}<span>Tutoriels sur <span class="cel-banner__link">l'aide en ligne</span></span></div></div>` },
    '/components/callout/': { html: `<div class="cel-callout">${icon('scale', 'cel-icon--22 cel-callout__icon')}<div class="cel-callout__body"><span class="cel-callout__title">Publication des actes</span><span>Obligatoire depuis 2022.</span></div></div>` },
    '/components/tabs/': { html: `<div class="cel-tabs__list"><span class="cel-tabs__tab" aria-selected="true">Actualités</span><span class="cel-tabs__tab">Agenda</span><span class="cel-tabs__tab">Documents</span></div>` },
    '/components/table/': { html: `<table class="cel-table"><thead><tr><th>Population</th><th>Par an</th></tr></thead><tbody><tr><td>Moins de 500</td><td>360 €</td></tr><tr><td>De 500 à 999</td><td>480 €</td></tr></tbody></table>` },
    '/components/breadcrumb/': { html: `<div class="cel-breadcrumb"><ol><li><span class="cel-link">Accueil</span><span>›</span></li><li><span class="cel-link">Fonctionnalités</span><span>›</span></li><li><span>Agenda</span></li></ol></div>` },
    '/components/theme-switch/': { background: 'deep', html: `<div class="cel-theme"><span>Thème :</span><span class="cel-theme__options"><span class="cel-theme__option" aria-pressed="true">${icon('sun')}Clair</span><span class="cel-theme__option">${icon('moon')}Sombre</span></span></div>` },
    '/components/faq/': { html: `<div class="cel-faq"><div class="cel-faq__item"><span class="cel-faq__question">Faut-il lancer un marché public ?</span></div></div>` },
    '/components/segmented-control/': { html: `<div class="cel-segmented"><span class="cel-segmented__option" aria-pressed="true">Par an</span><span class="cel-segmented__option">Par mois</span><span class="cel-segmented__option">Sur 4 ans</span></div>` },
    '/components/filter/': { background: 'strong', html: `<span class="cel-filter" aria-pressed="true">Tout</span><span class="cel-filter">Informer</span><span class="cel-filter">Démarches</span>` },
    '/components/card/': { html: `<div class="cel-card"><span class="cel-card__title"><span class="cel-card__link">Publier les actes</span></span><span class="cel-card__meta">Lecture : 4 minutes</span></div>` },
    '/components/checklist/': { html: `<ul class="cel-checklist"><li>${icon('check')}<span>Toutes les fonctionnalités</span></li><li>${icon('check')}<span>Hébergement en France</span></li></ul>` },
    '/components/steps/': { html: `<ol class="cel-steps"><li class="cel-steps__step"><span class="cel-steps__number">1</span><span>Ouvrez Actualités</span></li><li class="cel-steps__step"><span class="cel-steps__number">2</span><span>Cliquez sur Publier</span></li></ol>` },
    '/components/skip-link/': { html: `<span class="cel-skip-link" data-cel-state="focus">Aller au contenu</span>` },
    '/components/select/': { html: `<div class="cel-field"><span>Mois de la collecte</span><span class="cel-select"><select tabindex="-1"><option>Mars</option></select></span></div>` },
    '/components/checkbox/': { html: `<div class="cel-choice-group"><span class="cel-choice"><input type="checkbox" checked tabindex="-1"> Fermetures de la mairie</span><span class="cel-choice"><input type="checkbox" tabindex="-1"> Collecte des déchets</span></div>` },
    '/components/radio/': { html: `<div class="cel-choice-group"><span class="cel-choice"><input type="radio" checked tabindex="-1"> Par courriel</span><span class="cel-choice"><input type="radio" tabindex="-1"> Par téléphone</span></div>` },
    '/components/pagination/': { html: `<div class="cel-pagination"><ul><li><span class="cel-pagination__link">‹</span></li><li><span class="cel-pagination__link">4</span></li><li><span class="cel-pagination__link" aria-current="page">5</span></li><li><span class="cel-pagination__link">6</span></li><li><span class="cel-pagination__link">›</span></li></ul></div>` },
    '/foundations/focus/': { html: `<span class="cel-button" data-cel-state="focus">Focus visible</span>` },
    '/components/feature-cards/': { html: `<div class="cel-feature cel-feature--ochre"><span class="cel-feature__icon">${icon('user-group', 'cel-icon--22')}</span><span class="cel-feature__title">Pour les habitants</span></div>` },
    '/components/price-grid/': { html: `<div class="cel-tiers"><div class="cel-tier"><span class="cel-tier__label">Moins de 500</span><span class="cel-tier__price">360 €</span></div><div class="cel-tier cel-tier--selected"><span class="cel-tier__label">500 à 999</span><span class="cel-tier__price">480 €</span></div></div>` },
    '/components/references/': { html: `<div class="cel-reference"><div class="cel-reference__banner"><div class="cel-reference__identity"><span class="cel-reference__name">Veckersviller</span><span class="cel-reference__meta">Moselle · 480 habitants</span></div></div></div>` },
    '/components/comparison/': { html: `<span class="cel-comparison__value"><span class="cel-mark cel-mark--good">${icon('check')}</span>Par la mairie</span><span class="cel-comparison__value"><span class="cel-mark cel-mark--bad">${icon('x-mark')}</span>À la main</span>` },
    '/components/menu/': { html: `<span class="cel-button cel-button--secondary">${icon('bars-3', 'cel-icon--20')}Menu</span>` },
}

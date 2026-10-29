// Markup of the help center, after the mockups of the home, of an article, of the page of the topics and of the page
// not found (AideAccueil, AideArticle, AideRubriques, Aide404), with the classes of the package only. Written once for the pattern pages (code and examples) and for the demonstration pages
// (/patterns/help-center/…/), which load the package and nothing else.

import { searchPalette, searchTrigger } from './search.js'

const icon = (name, classes = '') => `<svg class="cel-icon${classes ? ` ${classes}` : ''}" aria-hidden="true"><use href="/design/icons/sprite.svg#${name}"></use></svg>`

// Each topic: its tint, its sentence, all its articles, the roles it is meant for (tags of the list filter).
export const TOPICS = [
    { title: 'Mettre le site en ligne', icon: 'home-modern', tint: 'ochre', roles: ['office', 'mayor'], summary: 'La mise en route, le nom de domaine, l\'apparence et la page d\'accueil.', articles: ['La mise en route, étape par étape', 'Raccorder votre nom de domaine', 'Choisir l\'apparence du site', 'Composer la page d\'accueil', 'Le menu et le pied de page'] },
    { title: 'Publier', icon: 'newspaper', tint: 'blue', roles: ['office', 'councillors'], summary: 'Actualités, alertes, agenda, photos, lettre d\'information et bulletin.', articles: ['Publier une actualité', 'Annoncer une alerte', 'Ajouter un événement à l\'agenda', 'Envoyer la lettre d\'information', 'Créer un album photo'] },
    { title: 'Les actes de la commune', icon: 'document-check', tint: 'lilac', roles: ['office', 'mayor'], summary: 'Délibérations, arrêtés, procès-verbaux : publier, classer, corriger.', articles: ['Les types de documents', 'Publier une délibération', 'Publier un arrêté', 'Corriger un acte déjà publié'] },
    { title: 'Les habitants', icon: 'chat-bubble-left-right', tint: 'green', roles: ['office'], summary: 'Messages, signalements, propositions pour l\'annuaire et pour l\'agenda.', articles: ['Répondre à un message', 'Traiter un signalement', 'Valider une proposition d\'événement', 'Gérer les abonnés de la lettre'] },
    { title: 'Le conseil municipal', icon: 'user-group', tint: 'sky', roles: ['mayor', 'councillors'], summary: 'Séances, comptes rendus et présentation de l\'équipe municipale.', articles: ['Annoncer une séance', 'Publier le compte rendu', 'Présenter l\'équipe municipale'] },
    { title: 'Administration du site', icon: 'shield-check', tint: 'red', roles: ['mayor'], summary: 'Comptes, sécurité, adresses du site et données de la commune.', articles: ['Donner accès à une personne', 'Activer la double authentification', 'Les politiques de sécurité', 'Exporter les données de la commune', 'Mettre le site en maintenance'] },
]

export const ARTICLE_COUNT = TOPICS.reduce((total, topic) => total + topic.articles.length, 0)

const ROLES = [['', 'Tous'], ['mayor', 'Maire'], ['office', 'Secrétariat'], ['councillors', 'Élus']]

const FIRST_STEPS = [['Mettre votre site en ligne', '15 minutes'], ['Publier une première actualité', '2 minutes'], ['Inviter le secrétariat et les élus', '3 minutes']]

export const QUICK_LINKS = [
    { title: 'Publier une délibération', text: 'Déposer le PDF, le dater, le publier : il est figé.', duration: '2 minutes', icon: 'document-check', tint: 'lilac' },
    { title: 'Annoncer une coupure d\'eau', text: 'Une alerte en haut du site, qui disparaît toute seule.', duration: '1 minute', icon: 'exclamation-triangle', tint: 'red' },
    { title: 'Donner accès à un adjoint', text: 'Une invitation par courriel, avec le bon rôle.', duration: '1 minute', icon: 'user-group', tint: 'green' },
    { title: 'Changer les horaires de la mairie', text: 'Horaires d\'été, congés, jours fériés.', duration: '2 minutes', icon: 'clock', tint: 'ochre' },
    { title: 'Publier une actualité', text: 'Un titre, une image, et c\'est en ligne.', duration: '2 minutes', icon: 'newspaper', tint: 'blue' },
    { title: 'Répondre à un signalement', text: 'Changer son état : l\'habitant est prévenu.', duration: '2 minutes', icon: 'chat-bubble-left-right', tint: 'sky' },
]

const TOPICS_URL = '/patterns/help-center/topics/'

const NAV = [['Rubriques', TOPICS_URL], ['Vidéos', '#'], ['Contacter l\'assistance', '#']]

const BRAND = `<a href="#" class="cel-doc-header__brand">
            <img class="cel-logo-light" src="/design/brand/icon.svg" alt="" width="36" height="36">
            <img class="cel-logo-dark" src="/design/brand/icon-on-dark.svg" alt="" width="36" height="36">
            <span class="cel-doc-header__name cel-wordmark"><strong>commune</strong>enligne</span>
            <span class="cel-doc-header__product">Centre d'aide</span>
        </a>`

const MENU = `<div class="cel-menu" data-cel-menu>
            <button type="button" class="cel-menu__toggle" aria-expanded="false" aria-controls="help-menu" aria-label="Ouvrir le menu">${icon('bars-3', 'cel-icon--20 cel-icon--bold')}<span aria-hidden="true">Menu</span></button>
            <div class="cel-menu__panel" id="help-menu" aria-labelledby="help-menu-title">
                <div class="cel-menu__top">
                    <p class="cel-menu__title" id="help-menu-title">Menu</p>
                    <button type="button" class="cel-menu__close">${icon('x-mark', 'cel-icon--20 cel-icon--bold')}Fermer le menu</button>
                </div>
                <nav aria-label="Centre d'aide">
                    <ul class="cel-menu__list">
${NAV.map(([label, url]) => `                        <li><a class="cel-menu__link" href="${url}">${label}</a></li>`).join('\n')}
                    </ul>
                </nav>
            </div>
        </div>`

export const SEARCH_ID = 'help-search'

// Header of every page: the brand and "Centre d'aide", the links and the search trigger on the right, the phone menu.
// Below the tablet breakpoint, the links give way to the menu and the trigger goes on its own line.
export const HEADER = `<header class="cel-doc-header">
    <div class="cel-container cel-doc-header__top">
        ${BRAND}
        <div class="cel-doc-header__actions">
            <nav class="cel-nav cel-hide-below-tablet" aria-label="Centre d'aide">
                <ul class="cel-nav__links">
${NAV.map(([label, url]) => `                    <li><a href="${url}">${label}</a></li>`).join('\n')}
                </ul>
            </nav>
            ${searchTrigger({ id: SEARCH_ID, name: 'Rechercher dans le centre d\'aide' })}
        </div>
        ${MENU}
    </div>
</header>`

export const PALETTE = searchPalette({
    id: SEARCH_ID,
    title: 'Rechercher dans le centre d\'aide',
    placeholder: 'Par exemple : publier une délibération',
    empty: `Essayez un autre mot, ou <a href="${TOPICS_URL}">parcourez les rubriques</a>.`,
})

const hint = `<p class="cel-doc-hero__hint" hidden data-cel-search-hint>Une question précise ? <kbd class="cel-kbd cel-kbd--on-strong" data-cel-search-shortcut>Ctrl K</kbd> pour chercher.</p>`

export const PRESENTATION_VIDEO = `<figure class="cel-video" data-cel-video>
    <div class="cel-video__frame">
        <video class="cel-video__player" controls preload="none" poster="/images/help-center/presentation-poster.svg" width="1280" height="720" aria-label="Vidéo de présentation du centre d'aide">
            <source src="/images/help-center/publish-deliberation.mp4" type="video/mp4">
            <track kind="captions" src="/images/help-center/publish-deliberation.vtt" srclang="fr" label="Français" default>
            <p>Votre navigateur ne lit pas cette vidéo : <a href="/images/help-center/publish-deliberation.mp4">la télécharger</a>.</p>
        </video>
        <button type="button" class="cel-video__play" aria-label="Lire la vidéo de présentation (2 minutes, sous-titrée)" hidden data-cel-video-play>${icon('play')}</button>
        <span class="cel-video__duration" aria-hidden="true" hidden data-cel-video-duration>2:00</span>
    </div>
    <figcaption class="cel-video__caption"><span>Sous-titrée</span><span aria-hidden="true">·</span><a href="/patterns/help-center/transcript/">Lire la transcription</a></figcaption>
</figure>`

const heroText = (title, lead) => `<div class="cel-doc-hero__text">
            <p class="cel-doc-hero__eyebrow">Centre d'aide</p>
            <h1 class="cel-doc-hero__title" id="help-title">${title}</h1>
            <p class="cel-doc-hero__lead">${lead}</p>
            ${hint}
        </div>`

export const HERO = `<section class="cel-doc-hero" aria-labelledby="help-title">
    <span class="cel-doc-hero__illustration cel-illustration cel-illustration--village" aria-hidden="true"></span>
    <div class="cel-container cel-doc-hero__inner">
        ${heroText('Découvrez votre site en deux minutes.', 'Une courte visite de l\'administration : publier, répondre aux habitants, gérer les accès. Puis, ici, une réponse pour chaque geste du quotidien.')}
        <div class="cel-doc-hero__media">
            ${PRESENTATION_VIDEO.replaceAll('\n', '\n            ')}
        </div>
    </div>
</section>`

export const HERO_WITHOUT_VIDEO = `<section class="cel-doc-hero" aria-labelledby="help-title">
    <span class="cel-doc-hero__illustration cel-illustration cel-illustration--village" aria-hidden="true"></span>
    <div class="cel-container cel-doc-hero__inner">
        ${heroText('Comment pouvons-nous vous aider ?', 'Une réponse pour chaque geste du quotidien en mairie : publier, répondre aux habitants, gérer les accès.')}
    </div>
</section>`

export const QUICK_LINKS_LIST = `<ul class="cel-quick-links">
${QUICK_LINKS.map((link) => `    <li>
        <a class="cel-quick-link" href="#">
            <span class="cel-pictogram cel-pictogram--${link.tint}" aria-hidden="true">${icon(link.icon, 'cel-icon--26')}</span>
            <span class="cel-quick-link__body">
                <span class="cel-quick-link__title">${link.title}</span>
                <span class="cel-quick-link__text">${link.text}</span>
                <span class="cel-quick-link__meta">${link.duration}${icon('arrow-right')}</span>
            </span>
        </a>
    </li>`).join('\n')}
</ul>`

export const QUICK_LINKS_BAND = `<section class="cel-doc-band cel-doc-band--muted cel-doc-band--large" aria-labelledby="quick-title">
    <div class="cel-container">
        <div class="cel-doc-band__header">
            <div>
                <h2 class="cel-doc-band__title" id="quick-title">Accès rapides</h2>
                <p class="cel-doc-band__lead">Les gestes les plus fréquents en mairie, expliqués pas à pas.</p>
            </div>
            <a class="cel-link cel-link--strong" href="${TOPICS_URL}">Toutes les rubriques</a>
        </div>
        ${QUICK_LINKS_LIST.replaceAll('\n', '\n        ')}
    </div>
</section>`

export const FIRST_STEPS_BLOCK = `<div class="cel-first-steps">
    <div class="cel-first-steps__intro">
        <h2 class="cel-first-steps__title" id="first-steps-title">Premiers pas</h2>
        <p class="cel-first-steps__summary">Votre commune arrive sur Commune en ligne ? Commencez ici.</p>
    </div>
    <ol class="cel-first-steps__list" aria-labelledby="first-steps-title">
${FIRST_STEPS.map(([title, duration], rank) => `        <li class="cel-first-steps__step">
            <span class="cel-first-steps__number" aria-hidden="true">${rank + 1}</span>
            <a class="cel-first-steps__link" href="#">${title}</a>
            <span class="cel-first-steps__duration">${duration}</span>
        </li>`).join('\n')}
    </ol>
</div>`

// Compact (home): the first three articles and the link to all of them.
const topic = ({ title, icon: name, tint, articles }) => `    <li class="cel-topic">
        <div class="cel-topic__header">
            <span class="cel-pictogram cel-pictogram--small cel-pictogram--${tint}" aria-hidden="true">${icon(name, 'cel-icon--22')}</span>
            <h3 class="cel-topic__title"><a href="#">${title}</a></h3>
        </div>
        <ul class="cel-topic__articles">
${articles.slice(0, 3).map((article) => `            <li><a href="#">${article}</a></li>`).join('\n')}
        </ul>
        <a class="cel-topic__more" href="#">Les ${articles.length} articles<span class="cel-visually-hidden"> de la rubrique « ${title} »</span></a>
    </li>`

export const TOPICS_LIST = `<ul class="cel-topics">
${TOPICS.map(topic).join('\n')}
</ul>`

// Detailed (page of the topics): the sentence, the number, every article; tagged for the list filter.
const detailedTopic = ({ title, icon: name, tint, roles, summary, articles }) => `    <li class="cel-topic" data-cel-list-filter-tags="${roles.join(' ')}">
        <div class="cel-topic__header">
            <span class="cel-pictogram cel-pictogram--${tint}" aria-hidden="true">${icon(name, 'cel-icon--26')}</span>
            <div class="cel-topic__body">
                <h2 class="cel-topic__title"><a href="#">${title}</a></h2>
                <p class="cel-topic__summary">${summary}</p>
                <p class="cel-topic__count">${articles.length} articles</p>
            </div>
        </div>
        <ul class="cel-topic__articles" aria-label="Articles de la rubrique « ${title} »">
${articles.map((article) => `            <li><a href="#">${article}${icon('arrow-right')}</a></li>`).join('\n')}
        </ul>
    </li>`

export const topicsDetailed = (topics = TOPICS, id = 'help-topics') => `<ul class="cel-topics cel-topics--detailed" id="${id}">
${topics.map(detailedTopic).join('\n')}
</ul>`

export const TOPICS_DETAILED = topicsDetailed()

// Small (page not found): a link per topic.
export const TOPICS_SMALL = `<ul class="cel-topics cel-topics--small">
${TOPICS.map(({ title, icon: name, tint }) => `    <li class="cel-topic"><a class="cel-topic__link" href="#"><span class="cel-pictogram cel-pictogram--xsmall cel-pictogram--${tint}" aria-hidden="true">${icon(name)}</span>${title}</a></li>`).join('\n')}
</ul>`

// Role filter: the segmented control, hidden without script (js/list-filter.js shows it).
export const roleFilter = (id = 'help-topics') => `<div class="cel-segmented" role="group" aria-label="Filtrer par rôle" hidden data-cel-list-filter="${id}"
        data-cel-message-none="Aucune rubrique pour ce rôle." data-cel-message-one="1 rubrique affichée" data-cel-message-many="# rubriques affichées">
${ROLES.map(([value, label], rank) => `    <button type="button" class="cel-segmented__option" aria-pressed="${rank === 0}" data-cel-list-filter-value="${value}">${label}</button>`).join('\n')}
</div>`

export const ROLE_FILTER = roleFilter()

export const SUPPORT = `<ul class="cel-support">
    <li class="cel-support__option">
        <h2 class="cel-support__title">Vous ne trouvez pas la réponse ?</h2>
        <p>Écrivez à l'assistance depuis votre administration, rubrique « Assistance ». Réponse sous 2 jours ouvrés, incluse dans votre abonnement.</p>
    </li>
    <li class="cel-support__option">
        <h2 class="cel-support__title">Besoin d'une prise en main ?</h2>
        <p>Une heure d'accompagnement est comprise à la mise en service. Au-delà, sur devis.</p>
    </li>
</ul>`

const homeAfter = (hero) => `${hero}
${QUICK_LINKS_BAND}
<section class="cel-doc-band" aria-labelledby="first-steps-title">
    <div class="cel-container">
        ${FIRST_STEPS_BLOCK.replaceAll('\n', '\n        ')}
    </div>
</section>
<section class="cel-doc-band cel-doc-band--large" id="rubriques" aria-labelledby="topics-title">
    <div class="cel-container">
        <h2 class="cel-doc-band__title" id="topics-title">Les rubriques</h2>
        ${TOPICS_LIST.replaceAll('\n', '\n        ')}
    </div>
</section>
<section class="cel-doc-band" aria-label="Obtenir de l'aide">
    <div class="cel-container">
        ${SUPPORT.replaceAll('\n', '\n        ')}
    </div>
</section>`

export const HOME = homeAfter(HERO)

export const HOME_WITHOUT_VIDEO = homeAfter(HERO_WITHOUT_VIDEO)

export const FOOTER = `<footer class="cel-footer">
    <div class="cel-container">
        <div class="cel-footer__bottom">
            <div class="cel-footer__meta">
                <p>© 2026 · <span class="cel-footer__wordmark"><strong>commune</strong>enligne</span> · <a href="#">Mentions légales</a></p>
            </div>
            <div class="cel-theme" role="group" aria-labelledby="help-footer-theme" data-cel-theme>
                <span id="help-footer-theme">Thème :</span>
                <span class="cel-theme__options">
                    <a href="#" class="cel-theme__option" data-cel-theme-option="light">${icon('sun')}Clair</a>
                    <a href="#" class="cel-theme__option" data-cel-theme-option="dark">${icon('moon')}Sombre</a>
                </span>
            </div>
        </div>
    </div>
</footer>`

// ---------- Article ----------

const ARTICLE_TOPIC = TOPICS[2]

export const SIDENAV = `<nav class="cel-sidenav cel-hide-below-tablet" aria-labelledby="help-sidenav-title">
    <p class="cel-sidenav__title" id="help-sidenav-title">Rubriques</p>
    <ul>
${TOPICS.map((t) => (t === ARTICLE_TOPIC
        ? `        <li>
            <a href="#" aria-current="true">${t.title}</a>
            <ul>
                <li><a href="#">Les types de documents</a></li>
                <li><a href="#" aria-current="page">Publier une délibération</a></li>
                <li><a href="#">Publier un arrêté</a></li>
                <li><a href="#">Corriger un acte publié</a></li>
            </ul>
        </li>`
        : `        <li><a href="#">${t.title}</a></li>`)).join('\n')}
    </ul>
</nav>`

export const BREADCRUMB = `<nav class="cel-breadcrumb" aria-label="Fil d'Ariane">
    <ol>
        <li><a href="#">Aide</a><span aria-hidden="true">›</span></li>
        <li><a href="#">${ARTICLE_TOPIC.title}</a><span aria-hidden="true">›</span></li>
        <li><span aria-current="page">Publier une délibération</span></li>
    </ol>
</nav>`

export const META = `<ul class="cel-doc-meta">
    <li>${icon('clock')}<span><span class="cel-visually-hidden">Durée : </span>2 minutes</span></li>
    <li>${icon('user-group')}<span>Pour : maire, secrétariat</span></li>
    <li>${icon('calendar-days')}<span>Mis à jour le <time datetime="2026-10-24">24 octobre 2026</time></span></li>
</ul>`

export const CALLOUT_NOTE = `<div class="cel-callout cel-callout--note" role="note">
    <div class="cel-callout__body">
        <p class="cel-callout__title">À savoir</p>
        <p>Préparez le PDF signé avant de commencer. Les documents de plus de 20 Mo ne sont pas acceptés.</p>
    </div>
</div>`

export const CALLOUT_CAUTION = `<div class="cel-callout cel-callout--caution" role="note">
    ${icon('exclamation-triangle', 'cel-icon--20 cel-callout__icon')}
    <div class="cel-callout__body">
        <p class="cel-callout__title">Attention</p>
        <p>Une délibération publiée ne peut plus être modifiée. En cas d'erreur, publiez une nouvelle version et retirez l'ancienne.</p>
    </div>
</div>`

export const STEPS = `<ol class="cel-steps">
    <li class="cel-steps__step">
        <span class="cel-steps__number" aria-hidden="true">1</span>
        <div class="cel-steps__body">
            <p>Dans votre administration, ouvrez <strong>Documents officiels</strong>, puis cliquez sur <strong>Ajouter un document</strong>.</p>
            <figure class="cel-steps__figure">
                <img src="/images/help-center/add-document.svg" alt="L'écran « Documents officiels » : le bouton « Ajouter un document » est en haut à droite, au-dessus de la liste des documents." width="640" height="300" loading="lazy">
            </figure>
        </div>
    </li>
    <li class="cel-steps__step">
        <span class="cel-steps__number" aria-hidden="true">2</span>
        <p>Choisissez le type <strong>Délibération</strong>, indiquez son numéro et la date de la séance, puis déposez le PDF.</p>
    </li>
    <li class="cel-steps__step">
        <span class="cel-steps__number" aria-hidden="true">3</span>
        <p>Cliquez sur <strong>Publier</strong>. Le document apparaît aussitôt sur le site, avec sa date de mise en ligne.</p>
    </li>
</ol>`

export const VIDEO = `<figure class="cel-video" data-cel-video>
    <div class="cel-video__frame">
        <video class="cel-video__player" controls preload="none" poster="/images/help-center/video-poster.svg" width="1280" height="720" aria-label="Publier une délibération, en vidéo">
            <source src="/images/help-center/publish-deliberation.mp4" type="video/mp4">
            <track kind="captions" src="/images/help-center/publish-deliberation.vtt" srclang="fr" label="Français" default>
            <p>Votre navigateur ne lit pas cette vidéo : <a href="/images/help-center/publish-deliberation.mp4">la télécharger</a>.</p>
        </video>
        <button type="button" class="cel-video__play" aria-label="Lire la vidéo « Publier une délibération » (1 minute 30, sous-titrée)" hidden data-cel-video-play>${icon('play')}</button>
        <span class="cel-video__duration" aria-hidden="true" hidden data-cel-video-duration>1:30</span>
    </div>
    <figcaption class="cel-video__caption">
        <span class="cel-video__title">Publier une délibération</span>
        <span>Sous-titrée</span>
        <a href="#transcription">Lire la transcription</a>
    </figcaption>
</figure>`

export const FAQ = `<div class="cel-faq cel-faq--flat">
    <details class="cel-faq__item">
        <summary class="cel-faq__question">Faut-il publier toutes les délibérations ?</summary>
        <p class="cel-faq__answer">Toutes celles qui ont un caractère réglementaire, et celles que le conseil choisit de rendre publiques. En cas de doute, publiez-la.</p>
    </details>
    <details class="cel-faq__item">
        <summary class="cel-faq__question">Comment retirer une délibération publiée par erreur ?</summary>
        <p class="cel-faq__answer">Ouvrez-la dans « Documents officiels », puis cliquez sur « Retirer ». Elle reste dans le registre, marquée comme retirée, avec la date du retrait.</p>
    </details>
</div>`

export const FEEDBACK = `<form class="cel-feedback" action="#" method="post" data-cel-feedback>
    <p class="cel-feedback__question" id="feedback-question">Cette page vous a-t-elle aidé ?</p>
    <div class="cel-feedback__answers" role="group" aria-labelledby="feedback-question" data-cel-feedback-answers>
        <button type="submit" class="cel-feedback__answer" name="helpful" value="yes">Oui</button>
        <button type="submit" class="cel-feedback__answer" name="helpful" value="no">Non</button>
    </div>
    <div class="cel-feedback__result" role="status" tabindex="-1" data-cel-feedback-result>
        <p hidden data-cel-feedback-message="yes">Merci pour votre réponse.</p>
        <p hidden data-cel-feedback-message="no">Merci. Une question reste sans réponse ? <a href="#">Écrire à l'assistance</a></p>
    </div>
</form>`

export const PAGER = `<nav class="cel-pager" aria-label="Articles voisins">
    <a class="cel-pager__link" href="#" rel="prev"><span class="cel-pager__direction">Précédent</span><span class="cel-pager__title">Les types de documents</span></a>
    <a class="cel-pager__link cel-pager__link--next" href="#" rel="next"><span class="cel-pager__direction">Suivant</span><span class="cel-pager__title">Publier un arrêté</span></a>
</nav>`

export const TOC = `<aside class="cel-toc" data-cel-toc>
    <nav aria-labelledby="help-toc-title">
        <p class="cel-toc__title" id="help-toc-title">Sur cette page</p>
        <ul>
            <li><a href="#steps">Les étapes</a></li>
            <li><a href="#video">En vidéo</a></li>
            <li><a href="#questions">Questions fréquentes</a></li>
        </ul>
    </nav>
    <p class="cel-toc__related">Dans votre administration : <a href="#">Documents officiels</a></p>
</aside>`

const indent = (html, spaces) => html.replaceAll('\n', `\n${' '.repeat(spaces)}`)

export const ARTICLE = `<div class="cel-container cel-doc-layout">
    ${indent(SIDENAV, 4)}

    <main id="contenu" tabindex="-1" class="cel-doc-main">
        ${indent(BREADCRUMB, 8)}
        <h1 class="cel-doc-title">Publier une délibération</h1>
        ${indent(META, 8)}
        <p class="cel-lead cel-doc-lead">Une délibération publiée est datée, classée et figée : les habitants la retrouvent dans « Documents officiels », et elle ne peut plus être modifiée.</p>

        <div class="cel-doc-content">
            ${indent(CALLOUT_NOTE, 12)}

            <h2 id="steps">Les étapes</h2>
            ${indent(STEPS, 12)}

            <h2 id="video">En vidéo</h2>
            ${indent(VIDEO, 12)}
            <details class="cel-faq__item" id="transcription">
                <summary class="cel-faq__question">Transcription de la vidéo</summary>
                <div class="cel-faq__answer">
                    <p>Dans votre administration, ouvrez « Documents officiels » et cliquez sur « Ajouter un document ». Choisissez le type « Délibération », indiquez son numéro et la date de la séance, déposez le PDF signé, puis cliquez sur « Publier ». La délibération apparaît aussitôt sur le site.</p>
                </div>
            </details>

            ${indent(CALLOUT_CAUTION, 12)}

            <h2 id="questions">Questions fréquentes</h2>
            ${indent(FAQ, 12)}
        </div>

        ${indent(FEEDBACK, 8)}

        ${indent(PAGER, 8)}
    </main>

    ${indent(TOC, 4)}
</div>`

// ---------- Notice pages: page in progress, page not found ----------

export const IN_PROGRESS = `<main id="contenu" tabindex="-1">
    <section class="cel-doc-hero cel-doc-hero--compact" aria-labelledby="in-progress-title">
        <span class="cel-doc-hero__illustration cel-illustration cel-illustration--village" aria-hidden="true"></span>
        <div class="cel-container cel-doc-hero__inner">
            <div class="cel-doc-hero__text">
                <p class="cel-doc-hero__eyebrow">Les habitants</p>
                <h1 class="cel-doc-hero__title" id="in-progress-title">Traiter un signalement</h1>
                <p class="cel-doc-hero__lead">Cet article est en cours de création. En attendant, l'assistance répond à vos questions.</p>
            </div>
        </div>
    </section>
    <div class="cel-container cel-doc-notice">
        ${indent(SUPPORT, 8)}
        <p><a class="cel-link cel-link--arrow cel-link--back" href="#">${icon('arrow-left', 'cel-icon--16 cel-icon--bold')}Revenir à la rubrique « Les habitants »</a></p>
    </div>
</main>`

// Page not found (Aide404): the server prefills the field with the words of the address asked (here, as if it had
// been /aide/publier-deliberation) and picks the suggestions.
const SUGGESTIONS = [['Publier une délibération', 'Les actes de la commune'], ['Corriger un acte déjà publié', 'Les actes de la commune'], ['Publier un arrêté', 'Les actes de la commune']]

export const notFound = ({ query = '', suggestions = SUGGESTIONS } = {}) => `<main id="contenu" tabindex="-1" class="cel-doc-not-found">
    <span class="cel-doc-not-found__illustration cel-illustration cel-illustration--village" aria-hidden="true"></span>
    <div class="cel-container cel-doc-not-found__inner">
        <div class="cel-doc-not-found__main">
            <p class="cel-doc-not-found__eyebrow">Erreur 404</p>
            <h1 class="cel-doc-not-found__title">Cet article n'existe pas, ou il a changé de place.</h1>
            <p class="cel-doc-not-found__lead">Le lien est peut-être ancien, ou l'article a été renommé. Cherchez-le directement :</p>
            <form class="cel-doc-not-found__search" action="/search/" method="get" role="search" data-cel-search-form="${SEARCH_ID}">
                <div class="cel-field cel-combobox">
                    <label class="cel-visually-hidden" for="not-found-query">Rechercher dans le centre d'aide</label>
                    <div class="cel-combobox__control">
                        ${icon('magnifying-glass', 'cel-combobox__icon')}
                        <input class="cel-combobox__input" id="not-found-query" type="search" name="q" value="${query}" autocomplete="off" aria-describedby="not-found-query-hint" data-cel-search-from-path>
                    </div>
                    <p class="cel-field__hint" id="not-found-query-hint">La recherche est préremplie avec les mots de l'adresse demandée.</p>
                </div>
            </form>
            <ul class="cel-doc-not-found__links">
                <li><a href="/patterns/help-center/home/">Retour à l'accueil du centre d'aide</a></li>
                <li><a href="#">Contacter l'assistance</a></li>
            </ul>
        </div>
        <div class="cel-doc-not-found__aside">
            <h2 class="cel-doc-not-found__heading" id="not-found-suggestions">Vous cherchiez peut-être</h2>
            <ul class="cel-suggestions" aria-labelledby="not-found-suggestions">
${suggestions.map(([title, path]) => `                <li><a class="cel-suggestions__link" href="#"><span class="cel-suggestions__title">${title}</span><span class="cel-suggestions__path">${path}</span></a></li>`).join('\n')}
            </ul>
            <h2 class="cel-doc-not-found__heading" id="not-found-topics">Ou parcourez une rubrique</h2>
            ${indent(TOPICS_SMALL.replace('<ul class="cel-topics cel-topics--small">', '<ul class="cel-topics cel-topics--small" aria-labelledby="not-found-topics">'), 12)}
        </div>
    </div>
</main>`

export const NOT_FOUND = notFound({ query: 'publier deliberation' })

// ---------- Page of the topics ----------

export const TOPICS_PAGE = `<main id="contenu" tabindex="-1">
    <div class="cel-doc-intro">
        <div class="cel-container cel-doc-intro__inner">
            <nav class="cel-breadcrumb" aria-label="Fil d'Ariane">
                <ol>
                    <li><a href="/patterns/help-center/home/">Centre d'aide</a><span aria-hidden="true">›</span></li>
                    <li><span aria-current="page">Rubriques</span></li>
                </ol>
            </nav>
            <div class="cel-doc-intro__row">
                <div class="cel-doc-intro__text">
                    <h1 class="cel-doc-intro__title">Toutes les rubriques</h1>
                    <p class="cel-doc-intro__lead">${ARTICLE_COUNT} articles, rangés par usage. Filtrez selon votre rôle à la mairie.</p>
                </div>
                ${indent(ROLE_FILTER, 16)}
            </div>
        </div>
    </div>
    <div class="cel-container cel-doc-list">
        ${indent(TOPICS_DETAILED, 8)}
        <p class="cel-doc-list__empty" hidden data-cel-list-filter-empty="help-topics">Aucune rubrique pour ce rôle pour l'instant.</p>
        <p class="cel-visually-hidden" role="status" data-cel-list-filter-status="help-topics"></p>
    </div>
</main>`

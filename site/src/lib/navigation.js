// Site tree: sections and pages, in the order of the navigation. A single source for the header, the phone menu, the
// side navigation, the breadcrumb, the section indexes, the home page, the search and the footer. The description of a
// page is its short summary, shown in the indexes and the search results. In Components, each page belongs to a family
// (group), the same as in the package code (components/*.css).

export const SITE_NAME = 'Système de Design de communeenligne'

export const SECTIONS = [
    {
        title: 'Prise en main',
        url: '/getting-started/',
        icon: 'arrow-down-tray',
        description: 'Installer le paquet, l\'utiliser avec ou sans Tailwind, activer le thème sombre, suivre les versions.',
        pages: [
            { title: 'Installation', url: '/getting-started/installation/', icon: 'arrow-down-tray', description: 'Ajouter le paquet avec une version fixe, charger les styles et les scripts.' },
            { title: 'Avec ou sans Tailwind', url: '/getting-started/tailwind/', icon: 'swatch', description: 'Les classes cel- en CSS pur, ou les mêmes valeurs en utilitaires Tailwind 4.' },
            { title: 'Activer le thème sombre', url: '/getting-started/dark-theme/', icon: 'moon', description: 'Activer le thème sombre côté serveur ou par le script du paquet.' },
            { title: 'Versions', url: '/getting-started/versions/', icon: 'check-badge', description: 'Numérotation sémantique : ce qui fait une version majeure, mineure ou un correctif.' },
        ],
    },
    {
        title: 'Fondamentaux',
        url: '/foundations/',
        icon: 'swatch',
        description: 'Les variables du design system, nommées par rôle : couleurs en clair et en sombre, typographie, espacements, points de rupture, rayons, ombres, mouvement, focus, icônes.',
        pages: [
            { title: 'Couleurs', url: '/foundations/colors/', icon: 'swatch', description: 'Chaque couleur, ses valeurs claire et sombre, son nom dans la landing.' },
            { title: 'Typographie', url: '/foundations/typography/', icon: 'document-text', description: 'Manrope, l\'échelle des tailles, des graisses, des interlignes, et les titres fluides.' },
            { title: 'Espacements', url: '/foundations/spacing/', icon: 'arrows-left-right', description: 'L\'échelle des marges et des écarts, au pas de 4 px comme Tailwind.' },
            { title: 'Grille et points de rupture', url: '/foundations/grid/', icon: 'computer-desktop', description: 'Largeur du contenu, marges latérales et les quatre seuils de mise en page.' },
            { title: 'Rayons et ombres', url: '/foundations/radius-and-shadows/', icon: 'circle-stack', description: 'L\'échelle des rayons, les quatre rayons nommés et les ombres, transparentes en sombre.' },
            { title: 'Mouvement', url: '/foundations/motion/', icon: 'bolt', description: 'Durées, courbes, apparitions au défilement et réduction des animations.' },
            { title: 'Focus visible', url: '/foundations/focus/', icon: 'key', description: 'Le contour de 3 px qui suit le clavier, sur les fonds clairs et sur la surface forte.' },
            { title: 'Icônes', url: '/foundations/icons/', icon: 'photo', description: 'Les icônes au même format : 24 × 24, trait de 1,5, couleur héritée.' },
            { title: 'Thème sombre', url: '/foundations/dark-theme/', icon: 'moon', description: 'Ce qui change en sombre, ce qui ne change pas, et comment écrire une couleur.' },
        ],
    },
    {
        title: 'Composants',
        url: '/components/',
        icon: 'squares-2x2',
        description: 'Tous les composants, par famille : base, formulaires, navigation, contenu, sections de la landing, documentation.',
        pages: [
            { group: 'Base', title: 'Bouton', url: '/components/button/', description: 'L\'action principale d\'un écran ou d\'une section.' },
            { group: 'Base', title: 'Lien', url: '/components/link/', description: 'Mène à une autre page ou à une autre partie de la page.' },
            { group: 'Base', title: 'Badge', url: '/components/badge/', description: 'Une courte étiquette d\'état : neutre, succès, avertissement, erreur, à contour.' },
            { group: 'Base', title: 'Pastille', url: '/components/pill/', description: 'Étiquette arrondie, seule ou en liste, avec ou sans compteur.' },
            { group: 'Base', title: 'Lien d\'évitement', url: '/components/skip-link/', description: 'Le premier lien de la page, visible au clavier seulement.' },
            { group: 'Formulaires', title: 'Champ de formulaire', url: '/components/field/', description: 'Libellé, champ, aide et erreur reliés ; récapitulatif des erreurs.' },
            { group: 'Formulaires', title: 'Liste déroulante', url: '/components/select/', description: 'Un choix parmi une longue liste, avec le menu du système.' },
            { group: 'Formulaires', title: 'Recherche de commune', url: '/components/combobox/', icon: 'magnifying-glass', description: 'Un champ qui propose les communes pendant la saisie, choisies au clavier ou au pointeur.' },
            { group: 'Formulaires', title: 'Case à cocher', url: '/components/checkbox/', description: 'Un ou plusieurs choix indépendants, ou une acceptation.' },
            { group: 'Formulaires', title: 'Bouton radio', url: '/components/radio/', description: 'Un seul choix parmi quelques options, toutes visibles.' },
            { group: 'Formulaires', title: 'Contrôle segmenté', url: '/components/segmented-control/', description: 'Deux à quatre choix exclusifs qui changent l\'affichage sur place.' },
            { group: 'Formulaires', title: 'Filtre', url: '/components/filter/', description: 'Des boutons arrondis sur fond marine pour filtrer une liste.' },
            { group: 'Navigation', title: 'Menu sur téléphone', url: '/components/menu/', icon: 'bars-3', description: 'Un bouton qui ouvre la navigation en plein écran, sous le point de rupture des tablettes.' },
            { group: 'Navigation', title: 'Fil d\'Ariane', url: '/components/breadcrumb/', description: 'Situe la page dans l\'arborescence.' },
            { group: 'Navigation', title: 'Pagination', url: '/components/pagination/', description: 'Pages précédente et suivante d\'une longue liste, et leurs numéros.' },
            { group: 'Navigation', title: 'Onglets', url: '/components/tabs/', description: 'Plusieurs panneaux au même endroit ; sans script, ils se suivent.' },
            { group: 'Navigation', title: 'Sélecteur de thème', url: '/components/theme-switch/', description: 'Clair ou sombre, dans le pied de page.' },
            { group: 'Contenu', title: 'Tableau', url: '/components/table/', description: 'Un tableau de données simple, qui défile dans son bloc.' },
            { group: 'Contenu', title: 'Comparatif', url: '/components/comparison/', description: 'Tableau à critères collés et colonne mise en avant.' },
            { group: 'Contenu', title: 'Encart', url: '/components/callout/', description: 'Une précision importante mise à part dans le corps de la page.' },
            { group: 'Contenu', title: 'Bandeau', url: '/components/banner/', description: 'Une ligne pleine largeur vers l\'aide en ligne, ou qui signale un brouillon.' },
            { group: 'Contenu', title: 'Carte', url: '/components/card/', description: 'Un bloc qui résume une page et y mène tout entier.' },
            { group: 'Contenu', title: 'Liste cochée', url: '/components/checklist/', description: 'Ce qui est compris, chaque élément précédé d\'une coche.' },
            { group: 'Contenu', title: 'Étapes numérotées', url: '/components/steps/', description: 'Une marche à suivre courte, dans l\'ordre.' },
            { group: 'Contenu', title: 'Questions (accordéon)', url: '/components/faq/', description: 'Des questions dont la réponse s\'ouvre au clic, sans script.' },
            { group: 'Sections de la landing', title: 'Accroche', url: '/components/hero/', icon: 'megaphone', description: 'Le haut de l\'accueil : grand titre, chapô, actions, points forts et visuel.' },
            { group: 'Sections de la landing', title: 'Cartes de fonctionnalités', url: '/components/feature-cards/', description: 'Trois cartes colorées, une icône, un titre, un texte.' },
            { group: 'Sections de la landing', title: 'Cartes illustrées', url: '/components/feature-tiles/', icon: 'photo', description: 'Une carte-lien par fonctionnalité qui a sa page : illustration teintée, nom, phrase.' },
            { group: 'Sections de la landing', title: 'Liste des fonctionnalités', url: '/components/feature-list/', icon: 'clipboard-document-list', description: 'Une ligne sobre, sans lien, par fonctionnalité sans page, sur deux colonnes.' },
            { group: 'Sections de la landing', title: 'Grille de prix', url: '/components/price-grid/', description: 'Une carte par tranche de population ; celle de la commune ressort.' },
            { group: 'Sections de la landing', title: 'Règle des populations', url: '/components/ruler/', icon: 'arrows-left-right', description: 'Sous la grille de prix, les tranches côte à côte et un repère sur la commune choisie.' },
            { group: 'Sections de la landing', title: 'Colonnes de coût', url: '/components/cost-chart/', icon: 'calendar-days', description: 'Le coût année par année, mise en service au-dessus de l\'abonnement la première année.' },
            { group: 'Sections de la landing', title: 'Tarif', url: '/components/pricing/', icon: 'scale', description: 'Prix et tranches sur fond marine, ce qui est compris à droite.' },
            { group: 'Sections de la landing', title: 'Lignes de stockage', url: '/components/storage/', icon: 'server-stack', description: 'Le volume inclus, puis chaque extension avec son total et son prix.' },
            { group: 'Sections de la landing', title: 'Cartes d\'étapes', url: '/components/step-cards/', icon: 'check-badge', description: 'Une courte marche à suivre en cartes, sur une ligne ou l\'une sous l\'autre.' },
            { group: 'Sections de la landing', title: 'Bande des références', url: '/components/references/', description: 'Les communes qui ont choisi Commune en ligne, en cartes qui défilent.' },
            { group: 'Sections de la landing', title: 'Bande d\'appel', url: '/components/cta-band/', icon: 'megaphone', description: 'En fin de page, un titre, une phrase et les boutons, sur fond sable ou marine.' },
            { group: 'Documentation', title: 'Bloc de code', url: '/components/code/', icon: 'document-duplicate', description: 'Du code à copier, sans coloration, avec son bouton de copie.' },
            { group: 'Documentation', title: 'Exemple', url: '/components/example/', icon: 'computer-desktop', description: 'Un rendu vivant, son code HTML et, s\'il y a lieu, sa version Tailwind.' },
            { group: 'Documentation', title: 'À faire, à éviter', url: '/components/dos-donts/', icon: 'check-circle', description: 'Deux colonnes de règles d\'usage, l\'une cochée, l\'autre barrée.' },
            { group: 'Documentation', title: 'Tuiles', url: '/components/tiles/', icon: 'squares-2x2', description: 'Les pages d\'une rubrique en tuiles, avec un aperçu ou un pictogramme.' },
            { group: 'Documentation', title: 'Palette de recherche', url: '/components/search/', icon: 'magnifying-glass', description: 'Un déclencheur dans l\'en-tête, Ctrl K ou /, une fenêtre de résultats au clavier ; source branchable.' },
            { group: 'Documentation', title: 'Pictogramme et teintes douces', url: '/components/pictogram/', icon: 'swatch', description: 'Une icône sur une pastille en trois tailles, neutre ou dans l\'une des sept teintes douces.' },
            { group: 'Documentation', title: 'Illustration en filigrane', url: '/components/illustration/', icon: 'home-modern', description: 'La silhouette de village, décorative, qui prend la couleur de son bloc.' },
            { group: 'Documentation', title: 'En-tête d\'accueil', url: '/components/doc-hero/', icon: 'megaphone', description: 'La bande marine de l\'accueil du centre d\'aide : texte et vidéo, ou une seule colonne.' },
            { group: 'Documentation', title: 'Accès rapides', url: '/components/quick-links/', icon: 'bolt', description: 'Les gestes fréquents sur trois colonnes : pictogramme teinté, titre, phrase, durée.' },
            { group: 'Documentation', title: 'Premiers pas', url: '/components/first-steps/', icon: 'check-badge', description: 'Un parcours numéroté : étapes reliées par un trait, titre en lien et durée.' },
            { group: 'Documentation', title: 'Rubriques', url: '/components/topics/', icon: 'squares-2x2', description: 'Les rubriques du centre d\'aide en trois formats : compact, détaillé, en petit.' },
            { group: 'Documentation', title: 'Filtre par rôle', url: '/components/list-filter/', icon: 'user-group', description: 'Le contrôle segmenté qui garde les éléments d\'une liste pour un rôle, avec un message si rien ne correspond.' },
            { group: 'Documentation', title: 'Façons d\'être aidé', url: '/components/support/', icon: 'chat-bubble-left-right', description: 'Deux ou trois moyens d\'obtenir de l\'aide, en colonnes séparées par des filets.' },
            { group: 'Documentation', title: 'En-tête d\'article', url: '/components/article-meta/', icon: 'clock', description: 'Sous le titre d\'un article : durée, public et date de mise à jour.' },
            { group: 'Documentation', title: 'Vidéo', url: '/components/video/', icon: 'help-video', description: 'Image d\'aperçu, grand bouton de lecture, puis le lecteur du navigateur, sous-titré, et sa transcription.' },
            { group: 'Documentation', title: 'Avis sur la page', url: '/components/feedback/', icon: 'question-mark-circle', description: '« Cette page vous a-t-elle aidé ? » : une question, deux boutons, une réponse annoncée.' },
            { group: 'Documentation', title: 'Pages précédente et suivante', url: '/components/pager/', icon: 'arrows-left-right', description: 'En bas d\'un article, les pages voisines de la rubrique.' },
        ],
    },
    {
        title: 'Modèles',
        url: '/patterns/',
        icon: 'document-duplicate',
        description: 'Les assemblages de composants qui font une page : en-tête, pied de page, section, en-tête de page, page de fonctionnalité, page de documentation, centre d\'aide.',
        pages: [
            { title: 'En-tête', url: '/patterns/header/', icon: 'computer-desktop', description: 'Logo, navigation principale, action « J\'inscris ma commune » et menu sur téléphone.' },
            { title: 'Pied de page', url: '/patterns/footer/', icon: 'squares-2x2', description: 'Identité, colonnes de liens, liens légaux et choix du thème.' },
            { title: 'Section', url: '/patterns/section/', icon: 'document-duplicate', description: 'La brique des pages : marges fluides, titre, chapô, trois fonds.' },
            { title: 'En-tête de page', url: '/patterns/page-header/', icon: 'document-text', description: 'Le haut d\'une page intérieure : fil d\'Ariane, titre, chapô.' },
            { title: 'Page de fonctionnalité', url: '/patterns/feature-page/', icon: 'megaphone', description: 'Fil d\'Ariane, badge, titre, durée, actions, capture et bandeau d\'aide.' },
            { title: 'Page de documentation', url: '/patterns/documentation-page/', icon: 'book-open', description: 'L\'en-tête, la navigation par famille, le sommaire et le menu sur téléphone de ce site, pour le centre d\'aide.' },
            { title: 'Centre d\'aide', url: '/patterns/help-center/', icon: 'question-mark-circle', description: 'L\'accueil, avec ou sans vidéo, un article, les rubriques et la page introuvable, faits du paquet seul.' },
            { title: 'Page des rubriques', url: '/patterns/topics-page/', icon: 'squares-2x2', description: 'Fil d\'Ariane, titre, filtre par rôle, puis chaque rubrique avec tous ses articles.' },
            { title: 'Page en cours de création', url: '/patterns/page-in-progress/', icon: 'clock', description: 'Un article pas encore écrit : la même bande d\'en-tête, une phrase, deux façons d\'être aidé.' },
            { title: 'Page introuvable', url: '/patterns/not-found/', icon: 'exclamation-triangle', description: 'La page 404 d\'une documentation : la recherche préremplie, des suggestions, les rubriques.' },
        ],
    },
    { title: 'Accessibilité', url: '/accessibility/', icon: 'check-circle', description: 'Les règles tenues par tous les composants et le résultat du test de contraste.', pages: [] },
    { title: 'Journal des versions', url: '/changelog/', icon: 'clipboard-document-list', description: 'Ce qui change à chaque version du paquet, et la correspondance des noms pour migrer.', pages: [] },
]

// Addresses that changed: 1.0.0 site and the reorganisation drafts. Each one gets a page that redirects.
export const REDIRECTS = {
    '/patterns/pricing/': '/components/pricing/',
    '/create-a-theme/': '/foundations/colors/',
    '/core/': '/components/',
    '/core/typography/': '/foundations/typography/',
    '/core/spacing/': '/foundations/spacing/',
    '/core/grid/': '/foundations/grid/',
    '/core/icons/': '/foundations/icons/',
    '/core/motion/': '/foundations/motion/',
    '/core/focus/': '/foundations/focus/',
    '/theme/': '/foundations/',
    '/theme/colors/': '/foundations/colors/',
    '/theme/typography/': '/foundations/typography/',
    '/theme/radius-and-shadows/': '/foundations/radius-and-shadows/',
    '/theme/dark-theme/': '/foundations/dark-theme/',
    '/vitrine/': '/components/',
    ...Object.fromEntries(['button', 'link', 'badge', 'skip-link', 'field', 'select', 'checkbox', 'radio', 'breadcrumb', 'pagination', 'tabs', 'table']
        .map((name) => [`/core/${name}/`, `/components/${name}/`])),
    ...Object.fromEntries(['hero', 'feature-cards', 'price-grid', 'pricing', 'references', 'comparison', 'pill', 'banner', 'callout', 'card', 'checklist', 'steps', 'faq', 'segmented-control', 'filter', 'theme-switch']
        .map((name) => [`/vitrine/${name}/`, `/components/${name}/`])),
    ...Object.fromEntries(['header', 'footer', 'section', 'feature-page'].map((name) => [`/vitrine/${name}/`, `/patterns/${name}/`])),
}

export const slug = (text) => text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

export const PAGES = SECTIONS.flatMap((section) => [section, ...section.pages.map((page) => ({ ...page, section }))])

export const sectionOf = (path) => SECTIONS.find((section) => path.startsWith(section.url))

export const pageOf = (path) => PAGES.find((page) => page.url === path)

// Pages of a section by family, in the order of their first appearance; a single unnamed group when there is none.
export const groupsOf = (section) => [...new Set(section.pages.map((page) => page.group ?? null))]
    .map((name) => ({ name, pages: section.pages.filter((page) => (page.group ?? null) === name) }))

// Breadcrumb: home, section, page (the last one is the current page).
export const breadcrumbOf = (path, title) => {
    const section = sectionOf(path)
    const steps = [{ title: 'Accueil', url: '/' }]

    if (section && section.url !== path) {
        steps.push({ title: section.title, url: section.url })
    }

    if (path !== '/') {
        steps.push({ title, url: path })
    }

    return steps
}

// Previous and next pages in the section.
export const neighboursOf = (path) => {
    const section = sectionOf(path)
    const rank = section?.pages.findIndex((page) => page.url === path) ?? -1

    return rank === -1 ? {} : { previous: section.pages[rank - 1], next: section.pages[rank + 1] }
}

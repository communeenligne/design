// Arborescence du site : rubriques et pages, dans l'ordre de la navigation. Une seule source pour l'en-tête, la
// navigation latérale, le fil d'Ariane, les pages d'index des rubriques et le pied de page.

export const RUBRIQUES = [
    {
        titre: 'Prise en main',
        url: '/getting-started/',
        description: 'Installer le paquet, l\'utiliser avec ou sans Tailwind, activer le thème sombre, suivre les versions.',
        pages: [
            { titre: 'Installation', url: '/getting-started/installation/' },
            { titre: 'Avec ou sans Tailwind', url: '/getting-started/tailwind/' },
            { titre: 'Thème sombre', url: '/getting-started/dark-theme/' },
            { titre: 'Versions', url: '/getting-started/versions/' },
        ],
    },
    {
        titre: 'Fondamentaux',
        url: '/foundations/',
        description: 'Les valeurs de base, toutes lues dans tokens.css : couleurs, texte, espaces, grille, formes, icônes, mouvement.',
        pages: [
            { titre: 'Couleurs', url: '/foundations/colors/' },
            { titre: 'Typographie', url: '/foundations/typography/' },
            { titre: 'Espacements', url: '/foundations/spacing/' },
            { titre: 'Grille et points de rupture', url: '/foundations/grid/' },
            { titre: 'Rayons et ombres', url: '/foundations/radius-and-shadows/' },
            { titre: 'Icônes', url: '/foundations/icons/' },
            { titre: 'Mouvement', url: '/foundations/motion/' },
            { titre: 'Thème sombre', url: '/foundations/dark-theme/' },
        ],
    },
    {
        titre: 'Composants',
        url: '/components/',
        description: 'Une page par composant : usage, variantes et états, code à copier, accessibilité.',
        pages: [
            { titre: 'Bouton', url: '/components/button/' },
            { titre: 'Lien', url: '/components/link/' },
            { titre: 'Champ de formulaire', url: '/components/field/' },
            { titre: 'Badge', url: '/components/badge/' },
            { titre: 'Pastille', url: '/components/pill/' },
            { titre: 'Bandeau', url: '/components/banner/' },
            { titre: 'Encart', url: '/components/callout/' },
            { titre: 'Onglets', url: '/components/tabs/' },
            { titre: 'Tableau', url: '/components/table/' },
            { titre: 'Fil d\'Ariane', url: '/components/breadcrumb/' },
            { titre: 'Sélecteur de thème', url: '/components/theme-switch/' },
            { titre: 'Questions (accordéon)', url: '/components/faq/' },
            { titre: 'Contrôle segmenté', url: '/components/segmented-control/' },
            { titre: 'Filtre', url: '/components/filter/' },
            { titre: 'Carte', url: '/components/card/' },
            { titre: 'Liste cochée', url: '/components/checklist/' },
            { titre: 'Étapes numérotées', url: '/components/steps/' },
            { titre: 'Lien d\'évitement', url: '/components/skip-link/' },
        ],
    },
    {
        titre: 'Modèles',
        url: '/patterns/',
        description: 'Des assemblages de composants repris de la landing : en-tête, pied de page, section, page de fonctionnalité, tarif.',
        pages: [
            { titre: 'En-tête', url: '/patterns/header/' },
            { titre: 'Pied de page', url: '/patterns/footer/' },
            { titre: 'Section', url: '/patterns/section/' },
            { titre: 'Page de fonctionnalité', url: '/patterns/feature-page/' },
            { titre: 'Tarif', url: '/patterns/pricing/' },
        ],
    },
    { titre: 'Accessibilité', url: '/accessibility/', pages: [] },
    { titre: 'Journal des versions', url: '/changelog/', pages: [] },
]

export const rubriqueDe = (chemin) => RUBRIQUES.find((rubrique) => chemin.startsWith(rubrique.url))

export const pageDe = (chemin) => rubriqueDe(chemin)?.pages.find((page) => page.url === chemin)

// Fil d'Ariane : Accueil, rubrique, page (la dernière est la page en cours).
export const filDAriane = (chemin, titre) => {
    const rubrique = rubriqueDe(chemin)
    const etapes = [{ titre: 'Accueil', url: '/' }]

    if (rubrique && rubrique.url !== chemin) {
        etapes.push({ titre: rubrique.titre, url: rubrique.url })
    }

    if (chemin !== '/') {
        etapes.push({ titre, url: chemin })
    }

    return etapes
}

// Page précédente et suivante dans la rubrique.
export const voisines = (chemin) => {
    const rubrique = rubriqueDe(chemin)
    const rang = rubrique?.pages.findIndex((page) => page.url === chemin) ?? -1

    return rang === -1 ? {} : { precedente: rubrique.pages[rang - 1], suivante: rubrique.pages[rang + 1] }
}

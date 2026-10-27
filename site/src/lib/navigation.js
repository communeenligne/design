// Arborescence du site : rubriques et pages, dans l'ordre de la navigation. Une seule source pour l'en-tête, la
// navigation latérale, le fil d'Ariane, les pages d'index des rubriques, l'accueil, la recherche et le pied de page.
// La description d'une page est son résumé court, affiché dans les index et les résultats de recherche.

export const NOM = 'Système de Design de communeenligne'

export const RUBRIQUES = [
    {
        titre: 'Prise en main',
        url: '/getting-started/',
        icone: 'arrow-down-tray',
        description: 'Installer le paquet, l\'utiliser avec ou sans Tailwind, activer le thème sombre, suivre les versions.',
        pages: [
            { titre: 'Installation', url: '/getting-started/installation/', icone: 'arrow-down-tray', description: 'Ajouter le paquet avec une version fixe, charger les styles et les scripts.' },
            { titre: 'Avec ou sans Tailwind', url: '/getting-started/tailwind/', icone: 'swatch', description: 'Les classes cel- en CSS pur, ou les mêmes valeurs en utilitaires Tailwind 4.' },
            { titre: 'Thème sombre', url: '/getting-started/dark-theme/', icone: 'moon', description: 'Activer le thème sombre côté serveur ou par le script du paquet.' },
            { titre: 'Versions', url: '/getting-started/versions/', icone: 'check-badge', description: 'Numérotation sémantique : ce qui fait une version majeure, mineure ou un correctif.' },
        ],
    },
    {
        titre: 'Fondamentaux',
        url: '/foundations/',
        icone: 'squares-2x2',
        description: 'Les valeurs de base, toutes lues dans tokens.css : couleurs, texte, espaces, grille, formes, icônes, mouvement.',
        pages: [
            { titre: 'Couleurs', url: '/foundations/colors/', icone: 'swatch', description: 'Les 139 couleurs, en thème clair et en thème sombre, avec leur nom dans la landing.' },
            { titre: 'Typographie', url: '/foundations/typography/', icone: 'document-text', description: 'Manrope, les tailles, les titres fluides, les graisses, les interlignes et l\'approche.' },
            { titre: 'Espacements', url: '/foundations/spacing/', icone: 'arrows-left-right', description: 'L\'échelle des marges et des écarts, au pas de 4 px comme Tailwind.' },
            { titre: 'Grille et points de rupture', url: '/foundations/grid/', icone: 'computer-desktop', description: 'Largeur du contenu, marges latérales et les quatre seuils de mise en page.' },
            { titre: 'Rayons et ombres', url: '/foundations/radius-and-shadows/', icone: 'circle-stack', description: 'Les arrondis et les ombres, transparentes en thème sombre.' },
            { titre: 'Icônes', url: '/foundations/icons/', icone: 'photo', description: 'Les 56 icônes de la landing au même format : 24 × 24, trait de 1,5.' },
            { titre: 'Mouvement', url: '/foundations/motion/', icone: 'bolt', description: 'Durées, courbes, apparitions au défilement et réduction des animations.' },
            { titre: 'Thème sombre', url: '/foundations/dark-theme/', icone: 'moon', description: 'Ce qui change en sombre, ce qui ne change pas, et comment écrire une couleur.' },
        ],
    },
    {
        titre: 'Composants',
        url: '/components/',
        icone: 'squares-2x2',
        description: 'Une page par composant : usage, variantes et états, code à copier, accessibilité.',
        pages: [
            { titre: 'Bouton', url: '/components/button/', description: 'L\'action principale d\'un écran ou d\'une section.' },
            { titre: 'Lien', url: '/components/link/', description: 'Mène à une autre page ou à une autre partie de la page.' },
            { titre: 'Champ de formulaire', url: '/components/field/', description: 'Libellé, champ, aide et erreur reliés ; récapitulatif des erreurs.' },
            { titre: 'Badge', url: '/components/badge/', description: 'Une courte étiquette d\'état : inclus, bientôt, automatique, brouillon.' },
            { titre: 'Pastille', url: '/components/pill/', description: 'Étiquette arrondie, seule ou en liste, avec ou sans compteur.' },
            { titre: 'Bandeau', url: '/components/banner/', description: 'Une ligne pleine largeur vers l\'aide en ligne, ou qui signale un brouillon.' },
            { titre: 'Encart', url: '/components/callout/', description: 'Une précision importante mise à part dans le corps de la page.' },
            { titre: 'Onglets', url: '/components/tabs/', description: 'Plusieurs panneaux au même endroit ; sans script, ils se suivent.' },
            { titre: 'Tableau', url: '/components/table/', description: 'Tableau de données simple et comparatif à colonne collée.' },
            { titre: 'Fil d\'Ariane', url: '/components/breadcrumb/', description: 'Situe la page dans l\'arborescence.' },
            { titre: 'Sélecteur de thème', url: '/components/theme-switch/', description: 'Clair ou sombre, dans le pied de page.' },
            { titre: 'Questions (accordéon)', url: '/components/faq/', description: 'Des questions dont la réponse s\'ouvre au clic, sans script.' },
            { titre: 'Contrôle segmenté', url: '/components/segmented-control/', description: 'Deux à quatre choix exclusifs qui changent l\'affichage sur place.' },
            { titre: 'Filtre', url: '/components/filter/', description: 'Des boutons arrondis sur fond marine pour filtrer une liste.' },
            { titre: 'Carte', url: '/components/card/', description: 'Un bloc qui résume une page et y mène tout entier.' },
            { titre: 'Liste cochée', url: '/components/checklist/', description: 'Ce qui est compris, chaque élément précédé d\'une coche.' },
            { titre: 'Étapes numérotées', url: '/components/steps/', description: 'Une marche à suivre courte, dans l\'ordre.' },
            { titre: 'Lien d\'évitement', url: '/components/skip-link/', description: 'Le premier lien de la page, visible au clavier seulement.' },
        ],
    },
    {
        titre: 'Modèles',
        url: '/patterns/',
        icone: 'document-duplicate',
        description: 'Des assemblages de composants repris de la landing : en-tête, pied de page, section, page de fonctionnalité, tarif.',
        pages: [
            { titre: 'En-tête', url: '/patterns/header/', icone: 'computer-desktop', description: 'Logo, navigation principale et action « J\'inscris ma commune ».' },
            { titre: 'Pied de page', url: '/patterns/footer/', icone: 'squares-2x2', description: 'Identité, colonnes de liens, liens légaux et choix du thème.' },
            { titre: 'Section', url: '/patterns/section/', icone: 'document-duplicate', description: 'La brique des pages : marges fluides, titre, chapô, trois fonds.' },
            { titre: 'Page de fonctionnalité', url: '/patterns/feature-page/', icone: 'megaphone', description: 'Fil d\'Ariane, badge, titre, durée, actions, capture et bandeau d\'aide.' },
            { titre: 'Tarif', url: '/patterns/pricing/', icone: 'scale', description: 'Prix et tranches sur fond marine, ce qui est compris à droite.' },
        ],
    },
    { titre: 'Accessibilité', url: '/accessibility/', icone: 'check-circle', description: 'Les règles tenues par tous les composants et le résultat du test de contraste.', pages: [] },
    { titre: 'Journal des versions', url: '/changelog/', icone: 'clipboard-document-list', description: 'Ce qui change à chaque version du paquet.', pages: [] },
]

export const PAGES = RUBRIQUES.flatMap((rubrique) => [rubrique, ...rubrique.pages.map((page) => ({ ...page, rubrique }))])

export const rubriqueDe = (chemin) => RUBRIQUES.find((rubrique) => chemin.startsWith(rubrique.url))

export const pageDe = (chemin) => PAGES.find((page) => page.url === chemin)

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

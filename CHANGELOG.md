# Journal des versions

Toutes les versions de `@communeenligne/design`. Numérotation sémantique : un nom de variable, de classe, de fichier
exporté ou de fonction qui change, c'est une version majeure.

## 2.0.0 (28/10/2026)

Un seul design system, celui de Commune en ligne (landing, centre d'aide, puis panel), et tous les noms en anglais.
Version majeure : fichiers, variables, classes, attributs, fonctions et utilitaires Tailwind renommés. La
correspondance complète est dans « Migrer depuis 1.0.0 » ; un nom qui n'y figure pas ne change pas.

### Ajouté

- Organisation en trois parties, un fichier par sujet : `foundations/` (variables : `colors.css` en clair et en
  sombre, `typography.css`, `spacing.css`, `breakpoints.css`, `radius.css`, `shadows.css`, `motion.css`, `focus.css`,
  `icons.css`, et la police), `components/` (une feuille par famille : `base.css`, `forms.css`, `navigation.css`,
  `menu.css`, `content.css`, `landing.css`, `documentation.css`), `patterns/` (`header.css`, `footer.css`,
  `section.css`, `page-header.css`, `feature-page.css`, `documentation-page.css`). Exports `./foundations`,
  `./components`, `./patterns` et `./<partie>/*`. `index.css` importe toujours tout.
- Menu sur téléphone (`.cel-menu`, `js/menu.js`, `initMenu()`) : sous le point de rupture des tablettes, un bouton
  « Ouvrir le menu » (icône `bars-3`) remplace la navigation principale et la navigation latérale (marquées
  `.cel-hide-below-tablet`) et ouvre un panneau plein écran ; `aria-expanded`, `aria-controls`, focus gardé dans le
  panneau, fermeture par Échap, par « Fermer le menu » ou au choix d'une page, focus rendu au bouton, défilement
  bloqué (`.cel-scroll-locked`), animation coupée avec `prefers-reduced-motion`. Sans script, une liste en haut de page.
  Intégré aux modèles en-tête et page de documentation.
- Nouveaux composants : liste déroulante (`.cel-select`), case à cocher et bouton radio (`.cel-choice`,
  `.cel-choice-group`, `--inline`), pagination (`.cel-pagination`), badges `--error` ; accroche (`.cel-hero`), cartes
  de fonctionnalités (`.cel-features`, `.cel-feature`), grille de prix (`.cel-tiers`, `.cel-tier`), bande des
  références (`.cel-references`, `.cel-reference`) ; famille documentation (`.cel-code`, `.cel-example`,
  `.cel-dos-donts`, `.cel-tiles`, `.cel-tile`, `.cel-pictogram`) et modèle page de documentation (`.cel-doc-*`,
  `.cel-sidenav`, `.cel-sidenav__group`, `.cel-toc`, `.cel-pager`, `.cel-wordmark`).
- Variables de rôle : `--cel-font-heading`, `--cel-text-base`, `--cel-radius-sm`, `-md`, `-lg`, `-xl`,
  `--cel-breakpoint-wide` ; couleurs nommées par rôle (`--cel-color-primary`, `-action`, `-background`, `-text`,
  `-success-*`, `-warning-*`, `-error-*`…).
- Tests : aucune classe, variable, attribut, fonction ou nom de fichier exposé par le paquet ne contient un mot
  français ou un accent ; les fondamentaux ne posent que des variables ; composants et modèles n'emploient que les
  variables des fondamentaux (ou un point d'accroche avec valeur de repli, comme `--cel-reference-color`).
- Documentation : rubriques Prise en main, Fondamentaux, Composants (par famille : Base, Formulaires, Navigation,
  Contenu, Sections de la landing, Documentation), Modèles, Accessibilité, Journal des versions ; menu sur téléphone ;
  les adresses qui ont changé redirigent vers les nouvelles pages.

### Changé

- `tokens.css` est découpé en `foundations/*.css` ; `components.css` en `components/*.css` et `patterns/*.css`.
- Classe du thème sombre : `cel-sombre` devient `cel-dark`. `js/theme.js` et `js/theme-boot.js` lisent et écrivent
  `light` ou `dark` (stockage local `cel-theme`, cookie) au lieu de `clair` ou `sombre`.
- Composants de base et formulaires sur les couleurs de rôle : onglets inactifs et fil d'Ariane en
  `--cel-color-text-muted` (#4b5563 au lieu de #556270), badge à contour en `--cel-color-text` (#374151 au lieu de
  #3d4a5c), champ désactivé sur `--cel-color-background-muted`.
- Rayons ramenés aux rayons nommés : badge 10 px (12 avant), récapitulatif des erreurs 14 px (12 avant).
- `tools/tokens.mjs` : `readTokens()`, `resolve()`, `contrast()`, `isHex()` ; champs `name`, `light`, `dark`, `file`,
  `group`, `landing`, `note`.

### Migrer depuis 1.0.0

Remplacer chaque ancien nom par le nouveau, dans les vues, les feuilles et les scripts. Les tableaux sont complets :
fichiers, attributs, fonctions, classes, variables, utilitaires Tailwind.

#### Fichiers et exports

| 1.0.0 | 2.0.0 |
|---|---|
| `@communeenligne/design/tokens.css` | `@communeenligne/design/foundations` |
| `@communeenligne/design/components.css` | `@communeenligne/design/components et @communeenligne/design/patterns` |
| `brand/icone.svg` | `brand/icon.svg` |
| `brand/icone-fond-sombre.svg` | `brand/icon-on-dark.svg` |
| `brand/logo-fond-sombre.svg` | `brand/logo-on-dark.svg` |
| `brand/logo-noir.svg` | `brand/logo-black.svg` |


#### Attributs et valeurs

| 1.0.0 | 2.0.0 |
|---|---|
| `data-cel-etat` | `data-cel-state` |
| `data-cel-etat="survol"` | `data-cel-state="hover"` |
| `data-cel-apparition` | `data-cel-reveal` |
| `data-cel-apparition="gauche"` | `data-cel-reveal="left"` |
| `data-cel-apparition="droite"` | `data-cel-reveal="right"` |
| `data-cel-apparition="echelle"` | `data-cel-reveal="scale"` |
| `data-cel-apparition="glisse"` | `data-cel-reveal="slide"` |
| `data-cel-apparition="titre"` | `data-cel-reveal="title"` |
| `data-cel-apparition="remplissage"` | `data-cel-reveal="fill"` |
| `data-cel-barre` | `data-cel-bar` |
| `data-cel-barre="haut"` | `data-cel-bar="top"` |
| `data-cel-fondu` | `data-cel-fade` |
| `data-cel-onglets` | `data-cel-tabs` |
| `data-cel-theme-option="clair"` | `data-cel-theme-option="light"` |
| `data-cel-theme-option="sombre"` | `data-cel-theme-option="dark"` |


#### Fonctions JavaScript

| 1.0.0 | 2.0.0 |
|---|---|
| `theme.js : themeCourant()` | `currentTheme()` |
| `theme.js : appliquerTheme(theme, { cookie, jours })` | `applyTheme(theme, { cookie, days })` |
| `theme.js : valeurs 'clair', 'sombre'` | `'light', 'dark'` |
| `tabs.js : initOnglets(racine)` | `initTabs(root)` |
| `motion.js : animationsReduites()` | `prefersReducedMotion()` |
| `motion.js : animationsPermises()` | `motionAllowed()` |
| `motion.js : initApparitions()` | `initReveals()` |
| `motion.js : fonduEntrant()` | `fadeIn()` |
| `motion.js : fonduSortant()` | `fadeOut()` |
| `motion.js : rafraichir()` | `refresh()` |
| `motion.js : initMouvement()` | `initMotion()` |


#### Classes

| 1.0.0 | 2.0.0 |
|---|---|
| `cel-anim` | `cel-motion` |
| `cel-apparu` | `cel-revealed` |
| `cel-badge--automatique` | `cel-badge--auto` |
| `cel-badge--bientot` | `cel-badge--outline` |
| `cel-badge--brouillon` | `cel-badge--warning` |
| `cel-badge--inclus` | `cel-badge--success` |
| `cel-bandeau` | `cel-banner` |
| `cel-bandeau--ocre` | `cel-banner--warning` |
| `cel-bandeau__icone` | `cel-banner__icon` |
| `cel-bandeau__interieur` | `cel-banner__inner` |
| `cel-bandeau__lien` | `cel-banner__link` |
| `cel-bloc-tarif` | `cel-pricing` |
| `cel-bloc-tarif__a-partir` | `cel-pricing__from` |
| `cel-bloc-tarif__actions` | `cel-pricing__actions` |
| `cel-bloc-tarif__conditions` | `cel-pricing__terms` |
| `cel-bloc-tarif__cote` | `cel-pricing__side` |
| `cel-bloc-tarif__details` | `cel-pricing__details` |
| `cel-bloc-tarif__mensuel` | `cel-pricing__monthly` |
| `cel-bloc-tarif__mise-en-service` | `cel-pricing__setup` |
| `cel-bloc-tarif__montant` | `cel-pricing__amount` |
| `cel-bloc-tarif__principal` | `cel-pricing__main` |
| `cel-bloc-tarif__prix` | `cel-pricing__price` |
| `cel-bloc-tarif__titre` | `cel-pricing__title` |
| `cel-bloc-tarif__tranches` | `cel-pricing__tiers` |
| `cel-bouton` | `cel-button` |
| `cel-bouton--icone` | `cel-button--icon` |
| `cel-bouton--ocre` | `cel-button--accent` |
| `cel-bouton--secondaire` | `cel-button--secondary` |
| `cel-bouton--sur-fort` | `cel-button--on-strong` |
| `cel-carte` | `cel-card` |
| `cel-carte-mobile` | `cel-hover-card` |
| `cel-carte-mobile__fleche` | `cel-hover-card__arrow` |
| `cel-carte__lien` | `cel-card__link` |
| `cel-carte__meta` | `cel-card__meta` |
| `cel-carte__resume` | `cel-card__summary` |
| `cel-carte__titre` | `cel-card__title` |
| `cel-cascade` | `cel-stagger` |
| `cel-champ` | `cel-field` |
| `cel-champ__aide` | `cel-field__hint` |
| `cel-champ__erreur` | `cel-field__error` |
| `cel-champ__facultatif` | `cel-field__optional` |
| `cel-chapo` | `cel-lead` |
| `cel-chapo--sur-fort` | `cel-lead--on-strong` |
| `cel-choix-anime` | `cel-animated-choice` |
| `cel-comparatif` | `cel-comparison` |
| `cel-comparatif-indication` | `cel-comparison-hint` |
| `cel-comparatif__cellule` | `cel-comparison__cell` |
| `cel-comparatif__cellule--nous` | `cel-comparison__cell--us` |
| `cel-comparatif__coin` | `cel-comparison__corner` |
| `cel-comparatif__colonne--nous` | `cel-comparison__column--us` |
| `cel-comparatif__critere` | `cel-comparison__criterion` |
| `cel-comparatif__legende` | `cel-comparison__caption` |
| `cel-comparatif__note` | `cel-comparison__note` |
| `cel-comparatif__tableau` | `cel-comparison__table` |
| `cel-comparatif__valeur` | `cel-comparison__value` |
| `cel-conteneur` | `cel-container` |
| `cel-conteneur--etroit` | `cel-container--narrow` |
| `cel-en-cours` | `cel-revealing` |
| `cel-encart` | `cel-callout` |
| `cel-encart__corps` | `cel-callout__body` |
| `cel-encart__icone` | `cel-callout__icon` |
| `cel-encart__titre` | `cel-callout__title` |
| `cel-entete` | `cel-header` |
| `cel-entete-page` | `cel-page-header` |
| `cel-entete-page__chapo` | `cel-page-header__lead` |
| `cel-entete-page__interieur` | `cel-page-header__inner` |
| `cel-entete-page__titre` | `cel-page-header__title` |
| `cel-entete__interieur` | `cel-header__inner` |
| `cel-entete__marque` | `cel-header__brand` |
| `cel-erreurs` | `cel-error-summary` |
| `cel-erreurs__titre` | `cel-error-summary__title` |
| `cel-etapes` | `cel-steps` |
| `cel-etapes__etape` | `cel-steps__step` |
| `cel-etapes__numero` | `cel-steps__number` |
| `cel-fil-ariane` | `cel-breadcrumb` |
| `cel-filtre` | `cel-filter` |
| `cel-fin-de-page` | `cel-page-end` |
| `cel-fin-de-page__actions` | `cel-page-end__actions` |
| `cel-fin-de-page__texte` | `cel-page-end__text` |
| `cel-fonctionnalite` | `cel-feature-hero` |
| `cel-fonctionnalite__actions` | `cel-feature-hero__actions` |
| `cel-fonctionnalite__badge` | `cel-feature-hero__badge` |
| `cel-fonctionnalite__duree` | `cel-feature-hero__duration` |
| `cel-fonctionnalite__figure` | `cel-feature-hero__figure` |
| `cel-fonctionnalite__texte` | `cel-feature-hero__text` |
| `cel-fondu-entrant` | `cel-fade-in` |
| `cel-fondu-sortant` | `cel-fade-out` |
| `cel-glisse` | `cel-glide` |
| `cel-icone` | `cel-icon` |
| `cel-icone--14` | `cel-icon--14` |
| `cel-icone--16` | `cel-icon--16` |
| `cel-icone--18` | `cel-icon--18` |
| `cel-icone--20` | `cel-icon--20` |
| `cel-icone--22` | `cel-icon--22` |
| `cel-icone--26` | `cel-icon--26` |
| `cel-icone--28` | `cel-icon--28` |
| `cel-icone--56` | `cel-icon--56` |
| `cel-icone--appuyee` | `cel-icon--bold` |
| `cel-immediat` | `cel-instant` |
| `cel-intro--centree` | `cel-intro--centered` |
| `cel-lien` | `cel-link` |
| `cel-lien--discret` | `cel-link--subtle` |
| `cel-lien--fleche` | `cel-link--arrow` |
| `cel-lien--fort` | `cel-link--strong` |
| `cel-lien--sur-fort` | `cel-link--on-strong` |
| `cel-lien-evitement` | `cel-skip-link` |
| `cel-liste-coches` | `cel-checklist` |
| `cel-logo-clair` | `cel-logo-light` |
| `cel-logo-sombre` | `cel-logo-dark` |
| `cel-masque` | `cel-visually-hidden` |
| `cel-navigation` | `cel-nav` |
| `cel-navigation__action` | `cel-nav__action` |
| `cel-navigation__liens` | `cel-nav__links` |
| `cel-onglets` | `cel-tabs` |
| `cel-onglets--actif` | `cel-tabs--active` |
| `cel-onglets__liste` | `cel-tabs__list` |
| `cel-onglets__onglet` | `cel-tabs__tab` |
| `cel-onglets__panneau` | `cel-tabs__panel` |
| `cel-onglets__panneaux` | `cel-tabs__panels` |
| `cel-onglets__titre-panneau` | `cel-tabs__panel-title` |
| `cel-pastille` | `cel-pill` |
| `cel-pastille__compteur` | `cel-pill__count` |
| `cel-pastilles` | `cel-pills` |
| `cel-pied` | `cel-footer` |
| `cel-pied__bas` | `cel-footer__bottom` |
| `cel-pied__colonne` | `cel-footer__column` |
| `cel-pied__identite` | `cel-footer__identity` |
| `cel-pied__legal` | `cel-footer__legal` |
| `cel-pied__liens` | `cel-footer__links` |
| `cel-pied__marque` | `cel-footer__brand` |
| `cel-pied__meta` | `cel-footer__meta` |
| `cel-pied__mot-symbole` | `cel-footer__wordmark` |
| `cel-pied__plus` | `cel-footer__more` |
| `cel-pied__titre` | `cel-footer__title` |
| `cel-pile` | `cel-stack` |
| `cel-pile--10` | `cel-stack--10` |
| `cel-pile--7` | `cel-stack--7` |
| `cel-pile--9` | `cel-stack--9` |
| `cel-puce` | `cel-dot` |
| `cel-puce--verte` | `cel-dot--green` |
| `cel-questions` | `cel-faq` |
| `cel-questions__element` | `cel-faq__item` |
| `cel-questions__question` | `cel-faq__question` |
| `cel-questions__reponse` | `cel-faq__answer` |
| `cel-rafraichi` | `cel-refresh` |
| `cel-repere` | `cel-mark` |
| `cel-repere--bon` | `cel-mark--good` |
| `cel-repere--mauvais` | `cel-mark--bad` |
| `cel-repere--moyen` | `cel-mark--mid` |
| `cel-retard-1` | `cel-delay-1` |
| `cel-retard-2` | `cel-delay-2` |
| `cel-retard-3` | `cel-delay-3` |
| `cel-retard-4` | `cel-delay-4` |
| `cel-retard-5` | `cel-delay-5` |
| `cel-retard-6` | `cel-delay-6` |
| `cel-retard-7` | `cel-delay-7` |
| `cel-section--claire` | `cel-section--muted` |
| `cel-section--forte` | `cel-section--strong` |
| `cel-segmente` | `cel-segmented` |
| `cel-segmente__choix` | `cel-segmented__option` |
| `cel-sombre` | `cel-dark` |
| `cel-souleve` | `cel-lift` |
| `cel-souleve--douce` | `cel-lift--soft` |
| `cel-sur-fort` | `cel-on-strong` |
| `cel-tableau` | `cel-table` |
| `cel-tableau-defilant` | `cel-table-scroll` |
| `cel-tableau-defilant--telephone` | `cel-table-scroll--phone` |
| `cel-texte` | `cel-prose` |
| `cel-theme--clair` | `cel-theme--on-light` |
| `cel-titre-section` | `cel-section-title` |
| `cel-titre-section--grand` | `cel-section-title--large` |
| `cel-titre-section--marine` | `cel-section-title--primary` |
| `cel-trace-coche` | `cel-draw-check` |


#### Variables CSS

| 1.0.0 | 2.0.0 |
|---|---|
| `--cel-couleur-marine` | `--cel-color-navy` |
| `--cel-couleur-marine-fonce` | `--cel-color-navy-dark` |
| `--cel-couleur-marine-douce` | `--cel-color-navy-soft` |
| `--cel-couleur-ocre` | `--cel-color-ochre` |
| `--cel-couleur-or` | `--cel-color-gold` |
| `--cel-couleur-vert` | `--cel-color-green` |
| `--cel-couleur-foret` | `--cel-color-forest` |
| `--cel-couleur-sur-sombre` | `--cel-color-on-dark` |
| `--cel-couleur-encre` | `--cel-color-text-strong` |
| `--cel-couleur-texte` | `--cel-color-text` |
| `--cel-couleur-texte-2` | `--cel-color-text-2` |
| `--cel-couleur-texte-3` | `--cel-color-text-3` |
| `--cel-couleur-texte-discret` | `--cel-color-text-muted` |
| `--cel-couleur-texte-discret-2` | `--cel-color-text-muted-2` |
| `--cel-couleur-texte-discret-3` | `--cel-color-text-muted-3` |
| `--cel-couleur-texte-discret-4` | `--cel-color-text-muted-4` |
| `--cel-couleur-texte-discret-5` | `--cel-color-text-muted-5` |
| `--cel-couleur-texte-marine` | `--cel-color-primary` |
| `--cel-couleur-texte-marine-survol` | `--cel-color-primary-hover` |
| `--cel-couleur-texte-vert` | `--cel-color-text-green` |
| `--cel-couleur-texte-foret` | `--cel-color-text-forest` |
| `--cel-couleur-texte-ocre` | `--cel-color-text-ochre` |
| `--cel-couleur-erreur` | `--cel-color-error` |
| `--cel-couleur-erreur-encre` | `--cel-color-error-ink` |
| `--cel-couleur-ocre-titre` | `--cel-color-ochre-title` |
| `--cel-couleur-ocre-encre` | `--cel-color-ochre-ink` |
| `--cel-couleur-ocre-encre-2` | `--cel-color-ochre-ink-2` |
| `--cel-couleur-ocre-encre-3` | `--cel-color-warning-ink` |
| `--cel-couleur-ocre-icone` | `--cel-color-ochre-icon` |
| `--cel-couleur-bleu-titre` | `--cel-color-blue-title` |
| `--cel-couleur-bleu-texte` | `--cel-color-blue-text` |
| `--cel-couleur-bleu-encre` | `--cel-color-blue-ink` |
| `--cel-couleur-vert-titre` | `--cel-color-green-title` |
| `--cel-couleur-vert-texte` | `--cel-color-green-text` |
| `--cel-couleur-vert-encre` | `--cel-color-success-ink` |
| `--cel-couleur-vert-encre-2` | `--cel-color-green-ink-2` |
| `--cel-couleur-vert-encre-3` | `--cel-color-green-ink-3` |
| `--cel-couleur-fond-page` | `--cel-color-background` |
| `--cel-couleur-surface` | `--cel-color-surface` |
| `--cel-couleur-fond-clair` | `--cel-color-background-muted` |
| `--cel-couleur-surface-attenuee` | `--cel-color-surface-muted` |
| `--cel-couleur-surface-attenuee-2` | `--cel-color-surface-muted-2` |
| `--cel-couleur-surface-survol` | `--cel-color-surface-hover` |
| `--cel-couleur-surface-courante` | `--cel-color-surface-current` |
| `--cel-couleur-habillage` | `--cel-color-chrome` |
| `--cel-couleur-fond-segmente` | `--cel-color-segmented-background` |
| `--cel-couleur-puce` | `--cel-color-dot` |
| `--cel-couleur-regle-debut` | `--cel-color-ruler-start` |
| `--cel-couleur-regle-fin` | `--cel-color-ruler-end` |
| `--cel-couleur-regle-graduation` | `--cel-color-ruler-tick` |
| `--cel-couleur-teinte-ocre` | `--cel-color-tint-ochre` |
| `--cel-couleur-teinte-ocre-2` | `--cel-color-tint-ochre-2` |
| `--cel-couleur-teinte-ocre-3` | `--cel-color-tint-ochre-3` |
| `--cel-couleur-teinte-ocre-4` | `--cel-color-tint-ochre-4` |
| `--cel-couleur-teinte-ocre-5` | `--cel-color-tint-ochre-5` |
| `--cel-couleur-teinte-sable` | `--cel-color-warning-background` |
| `--cel-couleur-teinte-sable-clair` | `--cel-color-tint-sand-light` |
| `--cel-couleur-teinte-sable-image` | `--cel-color-tint-sand-image` |
| `--cel-couleur-teinte-bleu` | `--cel-color-tint-blue` |
| `--cel-couleur-teinte-bleu-2` | `--cel-color-tint-blue-2` |
| `--cel-couleur-teinte-ciel` | `--cel-color-tint-sky` |
| `--cel-couleur-teinte-vert` | `--cel-color-tint-green` |
| `--cel-couleur-teinte-vert-2` | `--cel-color-success-background` |
| `--cel-couleur-teinte-vert-3` | `--cel-color-tint-green-3` |
| `--cel-couleur-teinte-sauge` | `--cel-color-tint-sage` |
| `--cel-couleur-teinte-vert-image` | `--cel-color-tint-green-image` |
| `--cel-couleur-teinte-lilas` | `--cel-color-tint-lilac` |
| `--cel-couleur-teinte-rouge` | `--cel-color-error-background` |
| `--cel-couleur-filet` | `--cel-color-line` |
| `--cel-couleur-filet-doux` | `--cel-color-line-soft` |
| `--cel-couleur-filet-fort` | `--cel-color-line-strong` |
| `--cel-couleur-filet-3` | `--cel-color-line-3` |
| `--cel-couleur-filet-4` | `--cel-color-line-4` |
| `--cel-couleur-filet-5` | `--cel-color-line-5` |
| `--cel-couleur-filet-6` | `--cel-color-line-6` |
| `--cel-couleur-bordure-champ` | `--cel-color-field-border` |
| `--cel-couleur-filet-champ` | `--cel-color-field-line` |
| `--cel-couleur-filet-focus` | `--cel-color-focus-line` |
| `--cel-couleur-fond-fort` | `--cel-color-strong` |
| `--cel-couleur-fond-fort-profond` | `--cel-color-strong-deep` |
| `--cel-couleur-fond-fort-doux` | `--cel-color-strong-soft` |
| `--cel-couleur-bouton` | `--cel-color-action` |
| `--cel-couleur-bouton-survol` | `--cel-color-action-hover` |
| `--cel-couleur-or-survol` | `--cel-color-gold-hover` |
| `--cel-couleur-ombre-encre-10` | `--cel-color-shadow-ink-10` |
| `--cel-couleur-ombre-encre-12` | `--cel-color-shadow-ink-12` |
| `--cel-couleur-ombre-encre-15` | `--cel-color-shadow-ink-15` |
| `--cel-couleur-ombre-marine-06` | `--cel-color-shadow-navy-06` |
| `--cel-couleur-ombre-marine-07` | `--cel-color-shadow-navy-07` |
| `--cel-couleur-ombre-marine-08` | `--cel-color-shadow-navy-08` |
| `--cel-couleur-ombre-marine-10` | `--cel-color-shadow-navy-10` |
| `--cel-couleur-ombre-marine-12` | `--cel-color-shadow-navy-12` |
| `--cel-couleur-ombre-marine-16` | `--cel-color-shadow-navy-16` |
| `--cel-couleur-ombre-marine-28` | `--cel-color-shadow-navy-28` |
| `--cel-couleur-ombre-profonde-18` | `--cel-color-shadow-deep-18` |
| `--cel-couleur-ombre-profonde-35` | `--cel-color-shadow-deep-35` |
| `--cel-couleur-ombre-noire-08` | `--cel-color-shadow-black-08` |
| `--cel-couleur-ombre-noire-20` | `--cel-color-shadow-black-20` |
| `--cel-couleur-repere-bon-texte` | `--cel-color-mark-good-text` |
| `--cel-couleur-repere-moyen-fond` | `--cel-color-mark-mid-background` |
| `--cel-couleur-repere-moyen` | `--cel-color-mark-mid` |
| `--cel-couleur-repere-mauvais-fond` | `--cel-color-mark-bad-background` |
| `--cel-couleur-repere-mauvais` | `--cel-color-mark-bad` |
| `--cel-couleur-icone-douce` | `--cel-color-icon-soft` |
| `--cel-couleur-repere-bon` | `--cel-color-mark-good` |
| `--cel-couleur-sur-fort` | `--cel-color-on-strong` |
| `--cel-couleur-sur-fort-doux` | `--cel-color-on-strong-soft` |
| `--cel-couleur-sur-fort-2` | `--cel-color-on-strong-2` |
| `--cel-couleur-sur-fort-or` | `--cel-color-on-strong-gold` |
| `--cel-couleur-sur-fort-vert` | `--cel-color-on-strong-green` |
| `--cel-couleur-sur-foret` | `--cel-color-on-forest` |
| `--cel-couleur-sur-fort-filet` | `--cel-color-on-strong-line` |
| `--cel-couleur-sur-fort-separateur-12` | `--cel-color-on-strong-divider-12` |
| `--cel-couleur-sur-fort-separateur-16` | `--cel-color-on-strong-divider-16` |
| `--cel-couleur-sur-fort-separateur-18` | `--cel-color-on-strong-divider-18` |
| `--cel-couleur-sur-fort-anneau` | `--cel-color-on-strong-ring` |
| `--cel-couleur-sur-or` | `--cel-color-on-gold` |
| `--cel-couleur-sur-or-marine` | `--cel-color-on-gold-navy` |
| `--cel-couleur-lueur-or` | `--cel-color-glow-gold` |
| `--cel-couleur-lueur-or-0` | `--cel-color-glow-gold-0` |
| `--cel-couleur-pulsation-vert` | `--cel-color-pulse-green` |
| `--cel-couleur-pulsation-vert-0` | `--cel-color-pulse-green-0` |
| `--cel-couleur-scene-telephone` | `--cel-color-scene-phone` |
| `--cel-couleur-scene-texte` | `--cel-color-scene-text` |
| `--cel-couleur-scene-discret` | `--cel-color-scene-muted` |
| `--cel-couleur-scene-filet` | `--cel-color-scene-line` |
| `--cel-couleur-scene-etape` | `--cel-color-scene-step` |
| `--cel-couleur-scene-marine` | `--cel-color-scene-navy` |
| `--cel-couleur-scene-bleu` | `--cel-color-scene-blue` |
| `--cel-couleur-scene-lien` | `--cel-color-scene-link` |
| `--cel-couleur-scene-vert` | `--cel-color-scene-green` |
| `--cel-couleur-scene-vert-doux` | `--cel-color-scene-green-soft` |
| `--cel-couleur-scene-ocre` | `--cel-color-scene-ochre` |
| `--cel-couleur-scene-ocre-doux` | `--cel-color-scene-ochre-soft` |
| `--cel-couleur-scene-gris` | `--cel-color-scene-grey` |
| `--cel-couleur-scene-photo` | `--cel-color-scene-photo` |
| `--cel-couleur-scene-image` | `--cel-color-scene-picture` |
| `--cel-couleur-scene-carte` | `--cel-color-scene-card` |
| `--cel-couleur-scene-jaune` | `--cel-color-scene-yellow` |
| `--cel-espace-section` | `--cel-space-section` |
| `--cel-largeur-contenu` | `--cel-width-content` |
| `--cel-police-texte` | `--cel-font-body` |
| `--cel-police-code` | `--cel-font-code` |
| `--cel-taille-11` | `--cel-text-11` |
| `--cel-taille-12` | `--cel-text-12` |
| `--cel-taille-13` | `--cel-text-13` |
| `--cel-taille-14` | `--cel-text-14` |
| `--cel-taille-15` | `--cel-text-15` |
| `--cel-taille-16` | `--cel-text-16` |
| `--cel-taille-17` | `--cel-text-17` |
| `--cel-taille-18` | `--cel-text-18` |
| `--cel-taille-19` | `--cel-text-19` |
| `--cel-taille-20` | `--cel-text-20` |
| `--cel-taille-21` | `--cel-text-21` |
| `--cel-taille-22` | `--cel-text-22` |
| `--cel-taille-24` | `--cel-text-24` |
| `--cel-taille-26` | `--cel-text-26` |
| `--cel-taille-30` | `--cel-text-30` |
| `--cel-taille-34` | `--cel-text-34` |
| `--cel-graisse-normale` | `--cel-font-weight-regular` |
| `--cel-graisse-moyenne` | `--cel-font-weight-medium` |
| `--cel-graisse-demi` | `--cel-font-weight-semibold` |
| `--cel-graisse-forte` | `--cel-font-weight-bold` |
| `--cel-graisse-extra` | `--cel-font-weight-extrabold` |
| `--cel-interligne-100` | `--cel-leading-100` |
| `--cel-interligne-106` | `--cel-leading-106` |
| `--cel-interligne-110` | `--cel-leading-110` |
| `--cel-interligne-112` | `--cel-leading-112` |
| `--cel-interligne-115` | `--cel-leading-115` |
| `--cel-interligne-120` | `--cel-leading-120` |
| `--cel-interligne-125` | `--cel-leading-125` |
| `--cel-interligne-130` | `--cel-leading-130` |
| `--cel-interligne-135` | `--cel-leading-135` |
| `--cel-interligne-150` | `--cel-leading-150` |
| `--cel-interligne-155` | `--cel-leading-155` |
| `--cel-interligne-160` | `--cel-leading-160` |
| `--cel-interligne-texte` | `--cel-leading-body` |
| `--cel-interligne-titre` | `--cel-leading-title` |
| `--cel-interligne-titre-grand` | `--cel-leading-title-large` |
| `--cel-approche-titre` | `--cel-tracking-title` |
| `--cel-approche-titre-grand` | `--cel-tracking-title-large` |
| `--cel-approche-chiffre` | `--cel-tracking-figures` |
| `--cel-approche-capitales` | `--cel-tracking-caps` |
| `--cel-approche-capitales-large` | `--cel-tracking-caps-wide` |
| `--cel-espace-0-5` | `--cel-space-0-5` |
| `--cel-espace-1` | `--cel-space-1` |
| `--cel-espace-1-5` | `--cel-space-1-5` |
| `--cel-espace-2` | `--cel-space-2` |
| `--cel-espace-2-5` | `--cel-space-2-5` |
| `--cel-espace-3` | `--cel-space-3` |
| `--cel-espace-3-5` | `--cel-space-3-5` |
| `--cel-espace-4` | `--cel-space-4` |
| `--cel-espace-4-5` | `--cel-space-4-5` |
| `--cel-espace-5` | `--cel-space-5` |
| `--cel-espace-5-5` | `--cel-space-5-5` |
| `--cel-espace-6` | `--cel-space-6` |
| `--cel-espace-6-5` | `--cel-space-6-5` |
| `--cel-espace-7` | `--cel-space-7` |
| `--cel-espace-7-5` | `--cel-space-7-5` |
| `--cel-espace-8` | `--cel-space-8` |
| `--cel-espace-9` | `--cel-space-9` |
| `--cel-espace-10` | `--cel-space-10` |
| `--cel-espace-12` | `--cel-space-12` |
| `--cel-espace-13` | `--cel-space-13` |
| `--cel-espace-14` | `--cel-space-14` |
| `--cel-espace-16` | `--cel-space-16` |
| `--cel-espace-18` | `--cel-space-18` |
| `--cel-espace-20` | `--cel-space-20` |
| `--cel-espace-22` | `--cel-space-22` |
| `--cel-largeur-etroite` | `--cel-width-narrow` |
| `--cel-marge-laterale` | `--cel-gutter` |
| `--cel-marge-laterale-telephone` | `--cel-gutter-phone` |
| `--cel-largeur-lecture` | `--cel-width-reading` |
| `--cel-rupture-telephone` | `--cel-breakpoint-phone` |
| `--cel-rupture-tablette` | `--cel-breakpoint-tablet` |
| `--cel-rupture-bureau` | `--cel-breakpoint-desktop` |
| `--cel-rupture-large` | `--cel-breakpoint-wide` |
| `--cel-rayon-2` | `--cel-radius-2` |
| `--cel-rayon-3` | `--cel-radius-3` |
| `--cel-rayon-4` | `--cel-radius-4` |
| `--cel-rayon-5` | `--cel-radius-5` |
| `--cel-rayon-6` | `--cel-radius-6` |
| `--cel-rayon-8` | `--cel-radius-8` |
| `--cel-rayon-9` | `--cel-radius-9` |
| `--cel-rayon-10` | `--cel-radius-10` |
| `--cel-rayon-12` | `--cel-radius-12` |
| `--cel-rayon-14` | `--cel-radius-14` |
| `--cel-rayon-16` | `--cel-radius-16` |
| `--cel-rayon-18` | `--cel-radius-18` |
| `--cel-rayon-20` | `--cel-radius-20` |
| `--cel-rayon-pilule` | `--cel-radius-pill` |
| `--cel-rayon-cercle` | `--cel-radius-circle` |
| `--cel-rayon-petit` | `--cel-radius-sm` |
| `--cel-rayon-moyen` | `--cel-radius-md` |
| `--cel-rayon-grand` | `--cel-radius-lg` |
| `--cel-rayon-bloc` | `--cel-radius-xl` |
| `--cel-ombre-choix` | `--cel-shadow-choice` |
| `--cel-ombre-bouton` | `--cel-shadow-button` |
| `--cel-ombre-pastille` | `--cel-shadow-pill` |
| `--cel-ombre-carte` | `--cel-shadow-card` |
| `--cel-ombre-reference` | `--cel-shadow-reference` |
| `--cel-ombre-carte-survol` | `--cel-shadow-card-hover` |
| `--cel-ombre-notification` | `--cel-shadow-toast` |
| `--cel-ombre-liste` | `--cel-shadow-list` |
| `--cel-ombre-soulevee` | `--cel-shadow-lift` |
| `--cel-ombre-soulevee-douce` | `--cel-shadow-lift-soft` |
| `--cel-ombre-carte-lien` | `--cel-shadow-card-link` |
| `--cel-ombre-figure` | `--cel-shadow-figure` |
| `--cel-ombre-bloc` | `--cel-shadow-block` |
| `--cel-ombre-tranche-choisie` | `--cel-shadow-tier-selected` |
| `--cel-ombre-apercu` | `--cel-shadow-preview` |
| `--cel-ombre-recherche` | `--cel-shadow-search` |
| `--cel-ombre-repere-regle` | `--cel-shadow-ruler-pin` |
| `--cel-duree-tres-rapide` | `--cel-duration-xfast` |
| `--cel-duree-rapide` | `--cel-duration-fast` |
| `--cel-duree-moderee` | `--cel-duration-moderate` |
| `--cel-duree-normale` | `--cel-duration-normal` |
| `--cel-duree-posee` | `--cel-duration-steady` |
| `--cel-duree-lente` | `--cel-duration-slow` |
| `--cel-retard-cascade` | `--cel-delay-stagger` |
| `--cel-courbe-standard` | `--cel-ease-standard` |
| `--cel-courbe-sortie` | `--cel-ease-out` |
| `--cel-courbe-glisse` | `--cel-ease-glide` |
| `--cel-courbe-rebond` | `--cel-ease-bounce` |
| `--cel-taille-texte` | `--cel-text-base` |
| `--cel-taille-chapo` | `--cel-text-lead` |
| `--cel-taille-petit` | `--cel-text-small` |
| `--cel-taille-mention` | `--cel-text-note` |
| `--cel-taille-titre-accroche` | `--cel-text-title-hero` |
| `--cel-taille-titre-tarif` | `--cel-text-title-pricing` |
| `--cel-taille-titre-page` | `--cel-text-title-page` |
| `--cel-taille-titre-formulaire` | `--cel-text-title-form` |
| `--cel-taille-titre-scinde` | `--cel-text-title-split` |
| `--cel-taille-titre-section-grand` | `--cel-text-title-section-large` |
| `--cel-taille-titre-section` | `--cel-text-title-section` |
| `--cel-taille-titre-sous-section` | `--cel-text-title-subsection` |
| `--cel-taille-titre-confirmation` | `--cel-text-title-confirmation` |
| `--cel-taille-titre-message` | `--cel-text-title-message` |
| `--cel-taille-prix` | `--cel-text-price` |
| `--cel-taille-prix-total` | `--cel-text-price-total` |
| `--cel-taille-prix-tranche` | `--cel-text-price-tier` |
| `--cel-taille-prix-devis` | `--cel-text-price-quote` |
| `--cel-focus-epaisseur` | `--cel-focus-width` |
| `--cel-focus-decalage` | `--cel-focus-offset` |
| `--cel-focus-couleur` | `--cel-focus-color` |
| `--cel-focus-couleur-sur-fort` | `--cel-focus-color-on-strong` |
| `--cel-icone-taille` | `--cel-icon-size` |
| `--cel-icone-trait` | `--cel-icon-stroke` |


#### Thème Tailwind

Un utilitaire prend le nom de la clé du thème sans son préfixe : `--color-texte-marine` donne `text-texte-marine`, qui devient
`text-primary` ; `--radius-moyen` donne `rounded-moyen`, qui devient `rounded-md`.

| 1.0.0 | 2.0.0 |
|---|---|
| `--color-bleu-encre` | `--color-blue-ink` |
| `--color-bleu-texte` | `--color-blue-text` |
| `--color-bleu-titre` | `--color-blue-title` |
| `--color-bordure-champ` | `--color-field-border` |
| `--color-bouton` | `--color-action` |
| `--color-bouton-survol` | `--color-action-hover` |
| `--color-encre` | `--color-text-strong` |
| `--color-erreur` | `--color-error` |
| `--color-erreur-encre` | `--color-error-ink` |
| `--color-filet` | `--color-line` |
| `--color-filet-3` | `--color-line-3` |
| `--color-filet-4` | `--color-line-4` |
| `--color-filet-5` | `--color-line-5` |
| `--color-filet-6` | `--color-line-6` |
| `--color-filet-champ` | `--color-field-line` |
| `--color-filet-doux` | `--color-line-soft` |
| `--color-filet-focus` | `--color-focus-line` |
| `--color-filet-fort` | `--color-line-strong` |
| `--color-fond-clair` | `--color-background-muted` |
| `--color-fond-fort` | `--color-strong` |
| `--color-fond-fort-doux` | `--color-strong-soft` |
| `--color-fond-fort-profond` | `--color-strong-deep` |
| `--color-fond-page` | `--color-background` |
| `--color-fond-segmente` | `--color-segmented-background` |
| `--color-foret` | `--color-forest` |
| `--color-habillage` | `--color-chrome` |
| `--color-icone-douce` | `--color-icon-soft` |
| `--color-lueur-or` | `--color-glow-gold` |
| `--color-lueur-or-0` | `--color-glow-gold-0` |
| `--color-marine` | `--color-navy` |
| `--color-marine-douce` | `--color-navy-soft` |
| `--color-marine-fonce` | `--color-navy-dark` |
| `--color-ocre` | `--color-ochre` |
| `--color-ocre-encre` | `--color-ochre-ink` |
| `--color-ocre-encre-2` | `--color-ochre-ink-2` |
| `--color-ocre-encre-3` | `--color-warning-ink` |
| `--color-ocre-icone` | `--color-ochre-icon` |
| `--color-ocre-titre` | `--color-ochre-title` |
| `--color-ombre-encre-10` | `--color-shadow-ink-10` |
| `--color-ombre-encre-12` | `--color-shadow-ink-12` |
| `--color-ombre-encre-15` | `--color-shadow-ink-15` |
| `--color-ombre-marine-06` | `--color-shadow-navy-06` |
| `--color-ombre-marine-07` | `--color-shadow-navy-07` |
| `--color-ombre-marine-08` | `--color-shadow-navy-08` |
| `--color-ombre-marine-10` | `--color-shadow-navy-10` |
| `--color-ombre-marine-12` | `--color-shadow-navy-12` |
| `--color-ombre-marine-16` | `--color-shadow-navy-16` |
| `--color-ombre-marine-28` | `--color-shadow-navy-28` |
| `--color-ombre-noire-08` | `--color-shadow-black-08` |
| `--color-ombre-noire-20` | `--color-shadow-black-20` |
| `--color-ombre-profonde-18` | `--color-shadow-deep-18` |
| `--color-ombre-profonde-35` | `--color-shadow-deep-35` |
| `--color-or` | `--color-gold` |
| `--color-or-survol` | `--color-gold-hover` |
| `--color-puce` | `--color-dot` |
| `--color-pulsation-vert` | `--color-pulse-green` |
| `--color-pulsation-vert-0` | `--color-pulse-green-0` |
| `--color-regle-debut` | `--color-ruler-start` |
| `--color-regle-fin` | `--color-ruler-end` |
| `--color-regle-graduation` | `--color-ruler-tick` |
| `--color-repere-bon` | `--color-mark-good` |
| `--color-repere-bon-texte` | `--color-mark-good-text` |
| `--color-repere-mauvais` | `--color-mark-bad` |
| `--color-repere-mauvais-fond` | `--color-mark-bad-background` |
| `--color-repere-moyen` | `--color-mark-mid` |
| `--color-repere-moyen-fond` | `--color-mark-mid-background` |
| `--color-scene-bleu` | `--color-scene-blue` |
| `--color-scene-carte` | `--color-scene-card` |
| `--color-scene-discret` | `--color-scene-muted` |
| `--color-scene-etape` | `--color-scene-step` |
| `--color-scene-filet` | `--color-scene-line` |
| `--color-scene-gris` | `--color-scene-grey` |
| `--color-scene-image` | `--color-scene-picture` |
| `--color-scene-jaune` | `--color-scene-yellow` |
| `--color-scene-lien` | `--color-scene-link` |
| `--color-scene-marine` | `--color-scene-navy` |
| `--color-scene-ocre` | `--color-scene-ochre` |
| `--color-scene-ocre-doux` | `--color-scene-ochre-soft` |
| `--color-scene-telephone` | `--color-scene-phone` |
| `--color-scene-texte` | `--color-scene-text` |
| `--color-scene-vert` | `--color-scene-green` |
| `--color-scene-vert-doux` | `--color-scene-green-soft` |
| `--color-sur-foret` | `--color-on-forest` |
| `--color-sur-fort` | `--color-on-strong` |
| `--color-sur-fort-2` | `--color-on-strong-2` |
| `--color-sur-fort-anneau` | `--color-on-strong-ring` |
| `--color-sur-fort-doux` | `--color-on-strong-soft` |
| `--color-sur-fort-filet` | `--color-on-strong-line` |
| `--color-sur-fort-or` | `--color-on-strong-gold` |
| `--color-sur-fort-separateur-12` | `--color-on-strong-divider-12` |
| `--color-sur-fort-separateur-16` | `--color-on-strong-divider-16` |
| `--color-sur-fort-separateur-18` | `--color-on-strong-divider-18` |
| `--color-sur-fort-vert` | `--color-on-strong-green` |
| `--color-sur-or` | `--color-on-gold` |
| `--color-sur-or-marine` | `--color-on-gold-navy` |
| `--color-sur-sombre` | `--color-on-dark` |
| `--color-surface-attenuee` | `--color-surface-muted` |
| `--color-surface-attenuee-2` | `--color-surface-muted-2` |
| `--color-surface-courante` | `--color-surface-current` |
| `--color-surface-survol` | `--color-surface-hover` |
| `--color-teinte-bleu` | `--color-tint-blue` |
| `--color-teinte-bleu-2` | `--color-tint-blue-2` |
| `--color-teinte-ciel` | `--color-tint-sky` |
| `--color-teinte-lilas` | `--color-tint-lilac` |
| `--color-teinte-ocre` | `--color-tint-ochre` |
| `--color-teinte-ocre-2` | `--color-tint-ochre-2` |
| `--color-teinte-ocre-3` | `--color-tint-ochre-3` |
| `--color-teinte-ocre-4` | `--color-tint-ochre-4` |
| `--color-teinte-ocre-5` | `--color-tint-ochre-5` |
| `--color-teinte-rouge` | `--color-error-background` |
| `--color-teinte-sable` | `--color-warning-background` |
| `--color-teinte-sable-clair` | `--color-tint-sand-light` |
| `--color-teinte-sable-image` | `--color-tint-sand-image` |
| `--color-teinte-sauge` | `--color-tint-sage` |
| `--color-teinte-vert` | `--color-tint-green` |
| `--color-teinte-vert-2` | `--color-success-background` |
| `--color-teinte-vert-3` | `--color-tint-green-3` |
| `--color-teinte-vert-image` | `--color-tint-green-image` |
| `--color-texte` | `--color-text` |
| `--color-texte-2` | `--color-text-2` |
| `--color-texte-3` | `--color-text-3` |
| `--color-texte-discret` | `--color-text-muted` |
| `--color-texte-discret-2` | `--color-text-muted-2` |
| `--color-texte-discret-3` | `--color-text-muted-3` |
| `--color-texte-discret-4` | `--color-text-muted-4` |
| `--color-texte-discret-5` | `--color-text-muted-5` |
| `--color-texte-foret` | `--color-text-forest` |
| `--color-texte-marine` | `--color-primary` |
| `--color-texte-marine-survol` | `--color-primary-hover` |
| `--color-texte-ocre` | `--color-text-ochre` |
| `--color-texte-vert` | `--color-text-green` |
| `--color-vert` | `--color-green` |
| `--color-vert-encre` | `--color-success-ink` |
| `--color-vert-encre-2` | `--color-green-ink-2` |
| `--color-vert-encre-3` | `--color-green-ink-3` |
| `--color-vert-texte` | `--color-green-text` |
| `--color-vert-titre` | `--color-green-title` |
| `--container-contenu` | `--container-content` |
| `--container-etroite` | `--container-narrow` |
| `--container-lecture` | `--container-reading` |
| `--ease-glisse` | `--ease-glide` |
| `--ease-rebond` | `--ease-bounce` |
| `--ease-sortie` | `--ease-out` |
| `--font-texte` | `--font-body` |
| `--font-weight-demi` | `--font-weight-semibold` |
| `--font-weight-extra` | `--font-weight-extrabold` |
| `--font-weight-forte` | `--font-weight-bold` |
| `--font-weight-moyenne` | `--font-weight-medium` |
| `--font-weight-normale` | `--font-weight-regular` |
| `--leading-texte` | `--leading-body` |
| `--leading-titre` | `--leading-title` |
| `--leading-titre-grand` | `--leading-title-large` |
| `--radius-bloc` | `--radius-xl` |
| `--radius-cercle` | `--radius-circle` |
| `--radius-grand` | `--radius-lg` |
| `--radius-moyen` | `--radius-md` |
| `--radius-petit` | `--radius-sm` |
| `--radius-pilule` | `--radius-pill` |
| `--shadow-apercu` | `--shadow-preview` |
| `--shadow-bloc` | `--shadow-block` |
| `--shadow-bouton` | `--shadow-button` |
| `--shadow-carte` | `--shadow-card` |
| `--shadow-carte-lien` | `--shadow-card-link` |
| `--shadow-carte-survol` | `--shadow-card-hover` |
| `--shadow-choix` | `--shadow-choice` |
| `--shadow-liste` | `--shadow-list` |
| `--shadow-notification` | `--shadow-toast` |
| `--shadow-pastille` | `--shadow-pill` |
| `--shadow-recherche` | `--shadow-search` |
| `--shadow-repere-regle` | `--shadow-ruler-pin` |
| `--shadow-soulevee` | `--shadow-lift` |
| `--shadow-soulevee-douce` | `--shadow-lift-soft` |
| `--shadow-tranche-choisie` | `--shadow-tier-selected` |
| `--text-chapo` | `--text-lead` |
| `--text-mention` | `--text-note` |
| `--text-petit` | `--text-small` |
| `--text-prix` | `--text-price` |
| `--text-prix-devis` | `--text-price-quote` |
| `--text-prix-total` | `--text-price-total` |
| `--text-prix-tranche` | `--text-price-tier` |
| `--text-texte` | `--text-base` |
| `--text-titre-accroche` | `--text-title-hero` |
| `--text-titre-confirmation` | `--text-title-confirmation` |
| `--text-titre-formulaire` | `--text-title-form` |
| `--text-titre-message` | `--text-title-message` |
| `--text-titre-page` | `--text-title-page` |
| `--text-titre-scinde` | `--text-title-split` |
| `--text-titre-section` | `--text-title-section` |
| `--text-titre-section-grand` | `--text-title-section-large` |
| `--text-titre-sous-section` | `--text-title-subsection` |
| `--text-titre-tarif` | `--text-title-pricing` |
| `--tracking-capitales` | `--tracking-caps` |
| `--tracking-capitales-large` | `--tracking-caps-wide` |
| `--tracking-chiffre` | `--tracking-figures` |
| `--tracking-titre` | `--tracking-title` |
| `--tracking-titre-grand` | `--tracking-title-large` |
| `telephone:` | `phone:` |
| `max-telephone:` | `max-phone:` |
| `tablette:` | `tablet:` |
| `max-tablette:` | `max-tablet:` |
| `bureau:` | `desktop:` |
| `max-bureau:` | `max-desktop:` |
| `large:` | `wide:` |
| `max-large:` | `max-wide:` |

## 1.0.0 (27/10/2026)

Première version : reprise de la landing de communeenligne.fr, à l'identique.

### Ajouté

- `tokens.css` : 139 couleurs (thème clair sur `:root`, thème sombre sous `:root.cel-sombre`), avec leur nom dans
  `landing.css` ; polices, tailles (dont 14 tailles fluides), graisses, interlignes, approches, espacements au pas de
  4 px, largeurs, points de rupture, rayons, 17 ombres, focus, icônes, durées et courbes.
- `fonts/` : Manrope 500, 600, 700 et 800 (jeu latin), police de repli ajustée, licence SIL OFL 1.1.
- `components.css` : base sous `.cel-page` ; bouton, lien, champ et récapitulatif des erreurs, badge, pastille, puce,
  bandeau, encart, onglets, tableau et comparatif, repères, fil d'Ariane, sélecteur de thème, questions, contrôle
  segmenté, filtre, carte, liste cochée, étapes, lien d'évitement, élévation ; modèles en-tête, navigation, en-tête de
  page, page de fonctionnalité, fin de page, bloc tarif, pied de page. États survol, focus visible, désactivé, erreur ;
  `prefers-reduced-motion`.
- `motion.css` et `js/motion.js` : apparitions au défilement, fondus, changements d'état (module partagé de la
  landing) ; `js/motion-boot.js`.
- `js/theme.js`, `js/theme-boot.js`, `js/tabs.js`.
- `tailwind.css` : thème Tailwind 4 (`@theme inline`) généré depuis `tokens.css`.
- `icons/` : 56 icônes (41 Heroicons, 15 pictogrammes de la landing), 24 × 24, trait 1,5 ; planche `sprite.svg`.
- `brand/` : logo et icône de Commune en ligne (hors licence MIT).
- Tests : contrastes des deux thèmes (251 paires chacun), exports, ressources externes, couleurs écrites hors des
  jetons, préfixe `cel-`, fichiers générés à jour.

### Écarts connus

- Contour du filtre non choisi sur fond marine sous 3:1, bouton plein sur une carte sous 3:1 en sombre : repris de la
  landing, voir la page Accessibilité.

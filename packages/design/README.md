# @communeenligne/design

Design system de Commune en ligne (landing, centre d'aide, panel), en CSS pur, préfixe `cel-` :

- `foundations/` : les variables, nommées par rôle (couleurs en clair et en sombre sous `html.cel-dark`, typographie,
  espacements, points de rupture, rayons, ombres, mouvement, focus, icônes) et la police Manrope ;
- `components/` : les composants, une feuille par famille (base, formulaires, navigation, menu sur téléphone, contenu,
  sections de la landing, documentation) ;
- `patterns/` : les modèles (en-tête, pied de page, section, en-tête de page, page de fonctionnalité, page de
  documentation) ;
- `tailwind.css` : le thème Tailwind 4, branché sur les variables.

Plus les icônes, le logo, les scripts (`js/theme.js`, `js/tabs.js`, `js/menu.js`, `js/motion.js`, `js/combobox.js`)
et `tokens.json` (les valeurs principales, couleurs en clair et en sombre, pour les projets qui en ont besoin hors du
CSS). `without-documentation.css` : tout sauf la famille documentation.

- Documentation : https://design.communeenligne.fr
- Installation, imports avec et sans Tailwind, règles de version : README du dépôt.

```css
/* Sans Tailwind : fondamentaux, composants, modèles, animations */
@import '@communeenligne/design';

/* Avec Tailwind 4 */
@import 'tailwindcss';
@import '@communeenligne/design/tailwind.css';
@import '@communeenligne/design/components'; /* facultatif */
@import '@communeenligne/design/patterns';   /* facultatif */
```

Licence MIT, sauf la police Manrope (SIL OFL 1.1), les icônes Heroicons (MIT, Tailwind Labs) et le logo (`brand/`,
tous droits réservés) : voir `LICENSE`.

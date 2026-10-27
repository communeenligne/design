# @communeenligne/design

Design system de Commune en ligne : jetons (variables CSS), police Manrope hébergée, icônes, composants en CSS pur
(préfixe `cel-`), thème Tailwind 4, thème sombre sous `html.cel-sombre`.

- Documentation : https://design.communeenligne.fr
- Installation, imports avec et sans Tailwind, règles de version : README du dépôt.

```css
/* Sans Tailwind */
@import '@communeenligne/design';

/* Avec Tailwind 4 */
@import 'tailwindcss';
@import '@communeenligne/design/tailwind.css';
@import '@communeenligne/design/components.css'; /* facultatif */
```

Licence MIT, sauf la police Manrope (SIL OFL 1.1), les icônes Heroicons (MIT, Tailwind Labs) et le logo (`brand/`,
tous droits réservés) : voir `LICENSE`.

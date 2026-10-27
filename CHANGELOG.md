# Journal des versions

Toutes les versions de `@communeenligne/design`. Numérotation sémantique : un nom de variable, de classe, de fichier
exporté ou de fonction qui change, c'est une version majeure.

## 1.0.0 (non publiée)

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

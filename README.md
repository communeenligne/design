# Design system de Commune en ligne

Le paquet `@communeenligne/design` et son site de documentation, https://design.communeenligne.fr. Un seul design
system, celui de Commune en ligne : la landing, le centre d'aide, puis le panel. Les sites des communes ne l'utilisent
pas : ils ont leurs propres thèmes, en Tailwind, dans l'application.

Le paquet est rangé en trois parties : les fondamentaux (`foundations/`, toutes les variables, nommées par rôle :
couleurs en clair et en sombre, typographie, espacements, rayons, ombres, mouvement, points de rupture), les composants
(`components/`, une feuille par famille) et les modèles (`patterns/`, en-tête, pied de page, section, page de
documentation…). S'y ajoutent un thème Tailwind 4 (`tailwind.css`), la police, les icônes, le logo et les scripts.

```
packages/design/   le paquet @communeenligne/design
site/              le site de documentation (Astro), qui utilise le paquet du dépôt
```

## Lancer le site en local

Avec Docker (rien d'autre à installer) :

```bash
docker compose up            # http://localhost:4321, rechargé à chaque modification
docker compose run --rm node npm test          # tests du paquet (contrastes, exports)
docker compose run --rm node npm run check  # tests, construction du site, liens
docker compose --profile preview up --build preview   # site construit, servi par nginx sur http://localhost:8081
```

Ou avec Node 24 (`.nvmrc`) : `npm install`, puis `npm run dev`.

## Installer le paquet dans un projet

Chaque version est publiée comme une archive jointe à la publication GitHub (« release ») `vX.Y.Z` :

```json
{
    "dependencies": {
        "@communeenligne/design": "https://github.com/<organisation>/design/releases/download/v2.0.0/communeenligne-design-2.0.0.tgz"
    }
}
```

**Pourquoi pas `"github:<organisation>/design#v2.0.0"`.** Le paquet est dans le sous-dossier `packages/design`. npm sait
installer un dépôt Git, mais seulement le `package.json` placé à sa racine : il n'a aucune syntaxe pour un sous-dossier
(Yarn et pnpm en ont une, npm non). Une archive produite par `npm pack` dans le sous-dossier contient exactement les
fichiers publiés, s'installe sans Git (absent des images `node:alpine` de l'application), ne change jamais une fois
publiée, et npm en garde l'empreinte dans `package-lock.json`. Si le dépôt est privé, l'archive demande un jeton :
publier alors sur GitHub Packages (même archive, `npm publish`), ou rendre le dépôt public (le code est sous licence
MIT).

## Importer

Sans Tailwind :

```css
@import '@communeenligne/design';   /* fondamentaux, composants, modèles, animations */
```

Avec Tailwind 4 :

```css
@import 'tailwindcss';
@import '@communeenligne/design/tailwind.css';   /* fondamentaux et thème Tailwind */
@import '@communeenligne/design/components';     /* facultatif : composants, classes cel- */
@import '@communeenligne/design/patterns';       /* facultatif : modèles */
```

Puis `class="cel-page"` sur `<body>` pour les styles de base, et `class="cel-dark"` sur `<html>` pour le thème
sombre. Détails : https://design.communeenligne.fr/getting-started/installation/. Pour passer de 1.0.0 à 2.0.0 : la
correspondance des noms dans `CHANGELOG.md`.

## Règles de version

Numérotation sémantique, consignée dans `CHANGELOG.md` :

- **majeure** : un nom de variable (`--cel-…`), de classe (`.cel-…`), de fichier exporté, d'attribut `data-cel-` (ou
  de l'une de ses valeurs) ou de fonction de script change ou disparaît. **Un nom qui change, c'est une version majeure**, même sans changement visible ;
- **mineure** : un ajout, ou une valeur changée volontairement (une couleur ajustée) ;
- **correctif** : une erreur corrigée sans changement voulu de l'apparence.

## Publier une version

1. Mettre à jour `version` dans `packages/design/package.json` et le titre de la version dans `CHANGELOG.md` (date).
2. `docker compose run --rm node npm run check`.
3. Commit, puis étiquette : `git tag v2.0.0 && git push origin main v2.0.0`.
4. L'action « Release » vérifie que l'étiquette correspond à la version, lance les tests, construit l'archive
   (`npm pack -w @communeenligne/design`) et crée la publication GitHub avec l'archive jointe.

## Modifier le paquet

- Les valeurs ne s'écrivent que dans `packages/design/foundations/` : les couleurs dans `colors.css` (clair sur
  `:root`, sombre sous `:root.cel-dark`), le reste dans le fichier de son sujet. Format des titres de groupe et des
  commentaires à respecter : le site et les tests les lisent.
- Les fondamentaux ne posent que des variables ; les composants et les modèles n'écrivent aucune couleur et n'emploient
  que les variables des fondamentaux (vérifié par les tests).
- Un composant va dans la feuille de sa famille (`components/base.css`, `forms.css`, `navigation.css`, `menu.css`,
  `content.css`, `landing.css`, `documentation.css`), et sa page dans la même famille de la documentation.
- Tout ce que le paquet expose est en anglais, préfixé `cel-` : classes, variables, attributs `data-cel-` et leurs
  valeurs, fonctions, fichiers, commentaires. Un test échoue sur un mot français ou un accent. Les textes du site de
  documentation restent en français.
- Après une modification des variables ou des icônes : `npm run generate` (régénère `tailwind.css` et
  `icons/sprite.svg`).

## Licences

Code sous licence MIT (`LICENSE`). Exceptions : police Manrope (SIL OFL 1.1, `packages/design/fonts/OFL.txt`), icônes
Heroicons (MIT, Tailwind Labs, `packages/design/icons/LICENSES.md`), logo et icône de Commune en ligne
(`packages/design/brand/`, tous droits réservés).

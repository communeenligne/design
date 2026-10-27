# Design system de Commune en ligne

Le paquet `@communeenligne/design` (jetons, police, icônes, composants CSS, thème Tailwind 4) et son site de
documentation, https://design.communeenligne.fr. Utilisé par la landing et le panel (dépôt de l'application) et par le
site d'aide.

```
packages/design/   le paquet @communeenligne/design
site/              le site de documentation (Astro), qui utilise le paquet du dépôt
```

## Lancer le site en local

Avec Docker (rien d'autre à installer) :

```bash
docker compose up            # http://localhost:4321, rechargé à chaque modification
docker compose run --rm node npm test          # tests du paquet (contrastes, exports)
docker compose run --rm node npm run verifier  # tests, construction du site, liens
docker compose --profile preview up --build preview   # site construit, servi par nginx sur http://localhost:8081
```

Ou avec Node 24 (`.nvmrc`) : `npm install`, puis `npm run dev`.

## Installer le paquet dans un projet

Chaque version est publiée comme une archive jointe à la publication GitHub (« release ») `vX.Y.Z` :

```json
{
    "dependencies": {
        "@communeenligne/design": "https://github.com/<organisation>/design/releases/download/v1.0.0/communeenligne-design-1.0.0.tgz"
    }
}
```

**Pourquoi pas `"github:<organisation>/design#v1.0.0"`.** Le paquet est dans le sous-dossier `packages/design`. npm sait
installer un dépôt Git, mais seulement le `package.json` placé à sa racine : il n'a aucune syntaxe pour un sous-dossier
(Yarn et pnpm en ont une, npm non). Une archive produite par `npm pack` dans le sous-dossier contient exactement les
fichiers publiés, s'installe sans Git (absent des images `node:alpine` de l'application), ne change jamais une fois
publiée, et npm en garde l'empreinte dans `package-lock.json`. Si le dépôt est privé, l'archive demande un jeton :
publier alors sur GitHub Packages (même archive, `npm publish`), ou rendre le dépôt public (le code est sous licence
MIT).

## Importer

Sans Tailwind :

```css
@import '@communeenligne/design';                   /* jetons, polices, composants, animations */
```

Avec Tailwind 4 :

```css
@import 'tailwindcss';
@import '@communeenligne/design/tailwind.css';      /* jetons, polices, thème Tailwind */
@import '@communeenligne/design/components.css';    /* facultatif : classes cel- */
```

Puis `class="cel-page"` sur `<body>` pour les styles de base, et `class="cel-sombre"` sur `<html>` pour le thème
sombre. Détails : https://design.communeenligne.fr/getting-started/installation/.

## Règles de version

Numérotation sémantique, consignée dans `CHANGELOG.md` :

- **majeure** : un nom de variable (`--cel-…`), de classe (`.cel-…`), de fichier exporté, d'attribut `data-cel-` ou de
  fonction de script change ou disparaît. **Un nom qui change, c'est une version majeure**, même sans changement visible ;
- **mineure** : un ajout, ou une valeur changée volontairement (une couleur ajustée) ;
- **correctif** : une erreur corrigée sans changement voulu de l'apparence.

## Publier une version

1. Mettre à jour `version` dans `packages/design/package.json` et le titre de la version dans `CHANGELOG.md` (date).
2. `docker compose run --rm node npm run verifier`.
3. Commit, puis étiquette : `git tag v1.0.0 && git push origin main v1.0.0`.
4. L'action « Publication » vérifie que l'étiquette correspond à la version, lance les tests, construit l'archive
   (`npm pack -w @communeenligne/design`) et crée la publication GitHub avec l'archive jointe.

## Modifier le paquet

- Les valeurs ne s'écrivent que dans `packages/design/tokens.css` (format des titres de groupe et des commentaires à
  respecter : le site et les tests le lisent).
- Après une modification des jetons ou des icônes : `npm run generer` (régénère `tailwind.css` et `icons/sprite.svg`).
- `components.css` n'écrit aucune couleur : seulement des variables (vérifié par les tests).

## Licences

Code sous licence MIT (`LICENSE`). Exceptions : police Manrope (SIL OFL 1.1, `packages/design/fonts/OFL.txt`), icônes
Heroicons (MIT, Tailwind Labs, `packages/design/icons/LICENSES.md`), logo et icône de Commune en ligne
(`packages/design/brand/`, tous droits réservés).

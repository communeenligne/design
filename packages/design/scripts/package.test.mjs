// Vérifications du paquet : exports déclarés présents, imports de index.css résolus, aucune ressource d'un autre
// domaine, aucune couleur écrite hors de tokens.css, classes préfixées cel-, fichiers générés à jour.

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { generer as genererTailwind } from './tailwind.mjs'
import { generer as genererPlanche, icones } from './sprite.mjs'

const RACINE = fileURLToPath(new URL('..', import.meta.url))
const paquet = JSON.parse(readFileSync(join(RACINE, 'package.json'), 'utf8'))
const lire = (chemin) => readFileSync(join(RACINE, chemin), 'utf8')

const fichiers = (dossier) => readdirSync(join(RACINE, dossier)).flatMap((nom) => {
    const chemin = join(dossier, nom)

    return statSync(join(RACINE, chemin)).isDirectory() ? fichiers(chemin) : [chemin]
})

const publies = paquet.files.flatMap((entree) => (statSync(join(RACINE, entree)).isDirectory() ? fichiers(entree) : [entree]))

test('chaque export de package.json mène à un fichier publié', () => {
    for (const [cle, cible] of Object.entries(paquet.exports)) {
        const chemin = typeof cible === 'string' ? cible : cible.default

        if (chemin.includes('*')) {
            const [avant, apres] = chemin.slice(2).split('*')
            assert.ok(publies.some((fichier) => fichier.startsWith(avant) && fichier.endsWith(apres)), `${cle} ne mène à aucun fichier`)
        } else {
            assert.ok(existsSync(join(RACINE, chemin)), `${cle} → ${chemin} introuvable`)
            // package.json est toujours publié par npm.
            assert.ok(chemin === './package.json' || publies.includes(chemin.slice(2)), `${chemin} absent de « files »`)
        }
    }
})

test('les @import et url() des feuilles de style mènent à des fichiers publiés', () => {
    for (const feuille of publies.filter((fichier) => fichier.endsWith('.css'))) {
        const css = lire(feuille)
        const dossier = feuille.includes('/') ? feuille.slice(0, feuille.lastIndexOf('/') + 1) : ''

        for (const [, cible] of css.matchAll(/(?:@import\s+|url\()\s*'([^']+)'/g)) {
            const chemin = join(dossier, cible).replaceAll('\\', '/')
            assert.ok(publies.includes(chemin), `${feuille} : ${cible} n'est pas publié`)
        }
    }
})

test('index.css importe les jetons, les polices et les composants', () => {
    const index = lire('index.css')

    for (const fichier of ['./tokens.css', './fonts/fonts.css', './components.css', './motion.css']) {
        assert.ok(index.includes(`@import '${fichier}'`), `${fichier} manque`)
    }
})

test('aucune ressource chargée depuis un autre domaine', () => {
    for (const fichier of publies.filter((nom) => /\.(css|js|mjs|svg)$/.test(nom))) {
        const contenu = lire(fichier).replaceAll('http://www.w3.org/2000/svg', '')

        assert.doesNotMatch(contenu, /(https?:)?\/\/[a-z0-9.-]+\.[a-z]{2,}\//i, `${fichier} charge une ressource externe`)
        assert.doesNotMatch(contenu, /@import\s+url\(\s*['"]?https?:/i, fichier)
    }
})

test('aucune couleur écrite hors de tokens.css', () => {
    for (const feuille of ['components.css', 'motion.css', 'fonts/fonts.css']) {
        const sansCommentaires = lire(feuille).replace(/\/\*[\s\S]*?\*\//g, '')

        assert.doesNotMatch(sansCommentaires, /#[0-9a-f]{3,8}\b|rgba?\(|hsla?\(/i, feuille)
    }
})

test('toutes les classes et animations du paquet sont préfixées cel-', () => {
    for (const feuille of ['components.css', 'motion.css']) {
        const sansCommentaires = lire(feuille).replace(/\/\*[\s\S]*?\*\//g, '')
        const classes = [...sansCommentaires.matchAll(/\.(-?[a-z_][a-z0-9_-]*)/gi)].map(([, nom]) => nom).filter((nom) => !/^\d/.test(nom))
        const animations = [...sansCommentaires.matchAll(/@keyframes\s+([a-z0-9-]+)/g)].map(([, nom]) => nom)

        assert.deepEqual([...new Set([...classes, ...animations].filter((nom) => !nom.startsWith('cel-')))], [], feuille)
    }
})

test('aucun style en ligne requis : les scripts n\'écrivent pas d\'attribut style', () => {
    for (const script of publies.filter((nom) => nom.startsWith('js/'))) {
        assert.doesNotMatch(lire(script), /\.style\.|setAttribute\(\s*['"]style/, script)
    }
})

test('tailwind.css est à jour avec tokens.css', () => {
    assert.equal(lire('tailwind.css'), genererTailwind())
})

test('la planche d\'icônes est à jour et chaque icône a sa source', () => {
    assert.equal(lire('icons/sprite.svg'), genererPlanche())

    const manifeste = JSON.parse(lire('icons/icons.json')).map((icone) => icone.nom).sort()
    assert.deepEqual(manifeste, icones().map((fichier) => fichier.slice(0, -4)).sort())
})

test('les polices publiées ont leur licence', () => {
    assert.ok(publies.includes('fonts/OFL.txt'))
    assert.ok(publies.some((fichier) => fichier.endsWith('.woff2')))
})

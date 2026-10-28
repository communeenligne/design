// Package checks: declared exports present, imports resolved, no resource from another domain, no color written
// outside foundations/colors.css, foundations that only set variables, components and patterns built on known
// variables, classes prefixed cel-, no French word nor accent in an exposed name, generated files up to date.

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { generate as generateTailwind } from './tailwind.mjs'
import { generate as generateSprite, icons } from './sprite.mjs'
import { FOUNDATIONS, readTokens } from '../tools/tokens.mjs'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'))
const read = (path) => readFileSync(join(ROOT, path), 'utf8')
const withoutComments = (path) => read(path).replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '')

const files = (folder) => readdirSync(join(ROOT, folder)).flatMap((name) => {
    const path = join(folder, name)

    return statSync(join(ROOT, path)).isDirectory() ? files(path) : [path]
})

const published = pkg.files.flatMap((entry) => (statSync(join(ROOT, entry)).isDirectory() ? files(entry) : [entry]))
const stylesheets = published.filter((file) => file.endsWith('.css'))
const scripts = published.filter((file) => file.startsWith('js/'))
// Stylesheets with classes: everything but the foundations, the fonts and the generated Tailwind theme.
const componentSheets = stylesheets.filter((file) => /^(components|patterns)\//.test(file) || file === 'motion.css')

test('each export of package.json leads to a published file', () => {
    for (const [key, target] of Object.entries(pkg.exports)) {
        if (target.includes('*')) {
            const [before, after] = target.slice(2).split('*')
            assert.ok(published.some((file) => file.startsWith(before) && file.endsWith(after)), `${key} leads to no file`)
        } else {
            assert.ok(existsSync(join(ROOT, target)), `${key} → ${target} not found`)
            // package.json is always published by npm.
            assert.ok(target === './package.json' || published.includes(target.slice(2)), `${target} missing from "files"`)
        }
    }
})

test('the @import and url() of stylesheets lead to published files', () => {
    for (const sheet of stylesheets) {
        const folder = sheet.includes('/') ? sheet.slice(0, sheet.lastIndexOf('/') + 1) : ''

        for (const [, target] of read(sheet).matchAll(/(?:@import\s+|url\()\s*'([^']+)'/g)) {
            const path = join(folder, target).replaceAll('\\', '/')
            assert.ok(published.includes(path), `${sheet}: ${target} is not published`)
        }
    }
})

test('index.css imports the foundations, the components, the patterns and the animations', () => {
    const index = read('index.css')

    for (const file of ['./foundations/index.css', './components/index.css', './patterns/index.css', './motion.css']) {
        assert.ok(index.includes(`@import '${file}'`), `${file} missing`)
    }
})

test('each family index imports every file of its folder', () => {
    for (const folder of ['foundations', 'components', 'patterns']) {
        const index = read(`${folder}/index.css`)
        const missing = readdirSync(join(ROOT, folder)).filter((file) => file !== 'index.css' && !index.includes(`@import './${file}'`))

        assert.deepEqual(missing, [], `${folder}/index.css`)
    }
    assert.deepEqual(FOUNDATIONS.map((name) => `${name}.css`).sort(), readdirSync(join(ROOT, 'foundations')).filter((file) => file !== 'index.css').sort())
})

test('no resource loaded from another domain', () => {
    for (const file of published.filter((name) => /\.(css|js|mjs|svg)$/.test(name))) {
        const content = read(file).replaceAll('http://www.w3.org/2000/svg', '')

        assert.doesNotMatch(content, /(https?:)?\/\/[a-z0-9.-]+\.[a-z]{2,}\//i, `${file} loads an external resource`)
        assert.doesNotMatch(content, /@import\s+url\(\s*['"]?https?:/i, file)
    }
})

test('no color written outside foundations/colors.css', () => {
    for (const sheet of stylesheets.filter((file) => file !== 'foundations/colors.css')) {
        assert.doesNotMatch(withoutComments(sheet), /#[0-9a-f]{3,8}\b|rgba?\(|hsla?\(/i, sheet)
    }
})

test('the foundations only set variables, on :root (and :root.cel-dark for colors)', () => {
    for (const name of FOUNDATIONS) {
        const css = withoutComments(`foundations/${name}.css`)
        const rest = css.replace(name === 'colors' ? /:root(\.cel-dark)?\s*\{[^}]*\}/g : /:root\s*\{[^}]*\}/g, '')

        assert.doesNotMatch(rest, /\S/, `foundations/${name}.css sets something else than variables`)
        // colors.css also sets color-scheme, so that native controls follow the theme.
        assert.doesNotMatch(css.replace(/--[a-z0-9-]+:[^;]+;|color-scheme:\s*(light|dark);/g, '').replace(/:root(\.cel-dark)?\s*\{|\}/g, ''), /\S/, `foundations/${name}.css`)
    }
})

test('components, patterns and animations only use variables of the foundations or their own', () => {
    const defined = new Set(readTokens().tokens.map((token) => token.name))

    for (const sheet of componentSheets) {
        const css = withoutComments(sheet)
        // Local variables: set by a rule of the sheet itself (icon size, focus color, reveal delay).
        const local = new Set([...css.matchAll(/(?<![\w-])--([a-z0-9-]+):/g)].map(([, name]) => name))
        // Hooks: read with a fallback, set by the project that uses the component (colors of a reference).
        const hooks = new Set([...css.matchAll(/var\(--(cel-[a-z0-9-]+),/g)].map(([, name]) => name))
        const unknown = [...new Set([...css.matchAll(/var\(--([a-z0-9-]+)/g)].map(([, name]) => name))].filter((name) => !defined.has(name) && !local.has(name) && !hooks.has(name))

        assert.deepEqual(unknown, [], sheet)
    }
})

test('the foundations only refer to variables of the foundations', () => {
    const defined = new Set(readTokens().tokens.map((token) => token.name))

    for (const name of FOUNDATIONS) {
        for (const [, other] of withoutComments(`foundations/${name}.css`).matchAll(/var\(--([a-z0-9-]+)/g)) {
            assert.ok(defined.has(other), `foundations/${name}.css refers to --${other}, which is not defined`)
        }
    }
})

// Everything the package exposes: classes, keyframes, CSS variables, data- attributes and their values, JS exports
// and dataset keys, published file names.
const exposedNames = () => {
    const names = []
    const add = (kind, file, values) => values.forEach((name) => names.push({ kind, file, name }))

    for (const sheet of stylesheets) {
        const css = withoutComments(sheet).replace(/url\([^)]*\)|'[^']*'|"[^"]*"/g, (literal) => (literal.startsWith('url') ? '' : literal))
        add('class', sheet, [...css.replace(/url\([^)]*\)/g, '').matchAll(/\.(-?[a-z_][a-z0-9_-]*)/gi)].map(([, name]) => name).filter((name) => !/^\d/.test(name)))
        add('keyframes', sheet, [...css.matchAll(/@keyframes\s+([a-z0-9-]+)/gi)].map(([, name]) => name))
        add('variable', sheet, [...css.matchAll(/--([a-z0-9-]+)/gi)].map(([, name]) => name))
    }

    for (const file of [...stylesheets, ...scripts]) {
        const content = file.endsWith('.css') ? withoutComments(file) : read(file).replace(/^\s*\/\/.*$/gm, '')

        for (const [, name, value] of content.matchAll(/(data-cel-[a-z-]+)(?:~?=['"]([^'"]*)['"])?/g)) {
            add('attribute', file, [name, ...(value ? [value] : [])])
        }
    }

    for (const script of scripts) {
        const js = read(script)
        add('export', script, [...js.matchAll(/export\s+(?:const|function|let)\s+([A-Za-z0-9_]+)/g)].map(([, name]) => name))
        add('dataset', script, [...js.matchAll(/dataset\.([A-Za-z0-9_]+)/g)].map(([, name]) => name))
        add('class', script, [...js.matchAll(/['"`.](cel-[a-z0-9_-]+)/g)].map(([, name]) => name))
    }

    add('file', 'package.json', published)
    add('icon', 'icons/icons.json', JSON.parse(read('icons/icons.json')).flatMap((icon) => [icon.name, ...Object.keys(icon)]))

    return names
}

// Words of the former French names (and frequent French words), never English: a name made of one of them fails.
const FRENCH = new Set(`
    accroche accueil actif aide anime anneau apercu apparition apparu approche appuyee ariane attenue attenuee automatique
    avertissement bande bandeau barre bas bientot bleu bloc boite bon bordure bouton brouillon bureau capitales carte cartes
    cellule centree cercle champ chapo chemin chiffre choisie choix ciel citation clair claire coche coches colonne
    comparatif compte compteur conteneur contenu contrastes controle copier corps cote couleur couleurs courante courbe
    cours critere de debut decalage defilant demi depart deroulante des devis dialogue discret douce doux droite du duree
    ech echantillon echantillons echelle ellipse encart encre entete entrant epaisseur erreur erreurs espace etape etapes
    etat etroit etroite evitement eviter exemple extrait facultatif faire fenetre fermer fil filet filtre fleche fonce
    fonction fonctionnalite fonctions fond fondu foret formes formulaire fort forte gauche glisse graduation graisse grille
    gris groupe habillage haut icone icones identite immediat inclus interieur interligne jaune largeur lateral laterale
    le legende les lente libelle licences lien liens ligne lilas liste loupe lueur marge marque masque mauvais mensuel
    mise moderee montant mot mouvement moyen moyenne noire nom normale nous nuance nuancier numero ocre ombre onglet
    onglets ouvrir panneau panneaux partir pastille pastilles petit pictogramme pied plein plier police posee prete
    principale principes prix profond profonde puce pulsation raccourci raccourcis rafraichi rapide rayon rebond recherche
    regle regles remplissage rendu repere reponse resultat resultats resume retard rouge rubrique rubriques rupture sable
    sans sauge scinde secondaire segmente sens separateur sombre sommaire sortant sortie souleve soulevee sous succes
    suivant sur survol symbole tableau tablette taille tarif teinte telephone texte titre titres tranche tranches tres
    tuile tuiles valeur valeurs vert verte visuel voisines
`.trim().split(/\s+/))

test('no class, variable, attribute or other exposed name contains a French word or an accent', () => {
    const faults = []

    for (const { kind, file, name } of exposedNames()) {
        const words = name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase().split(/[^a-z0-9]+/).filter(Boolean)
        const french = words.filter((word) => FRENCH.has(word))

        if (/[^\x00-\x7f]/.test(name) || french.length > 0) {
            faults.push(`${file}: ${kind} "${name}"${french.length ? ` (${french.join(', ')})` : ''}`)
        }
    }

    assert.deepEqual([...new Set(faults)], [])
})

test('all classes and keyframes of the package are prefixed cel-', () => {
    for (const sheet of componentSheets) {
        const css = withoutComments(sheet).replace(/url\([^)]*\)|'[^']*'|"[^"]*"/g, '')
        const classes = [...css.matchAll(/\.(-?[a-z_][a-z0-9_-]*)/gi)].map(([, name]) => name).filter((name) => !/^\d/.test(name))
        const keyframes = [...css.matchAll(/@keyframes\s+([a-z0-9-]+)/g)].map(([, name]) => name)

        assert.deepEqual([...new Set([...classes, ...keyframes].filter((name) => !name.startsWith('cel-')))], [], sheet)
    }
})

test('no inline style required: scripts write no style attribute', () => {
    for (const script of scripts) {
        assert.doesNotMatch(read(script), /\.style\.|setAttribute\(\s*['"]style/, script)
    }
})

test('tailwind.css is up to date with the foundations', () => {
    assert.equal(read('tailwind.css'), generateTailwind())
})

test('the icon sheet is up to date and each icon has its source', () => {
    assert.equal(read('icons/sprite.svg'), generateSprite())

    const manifest = JSON.parse(read('icons/icons.json')).map((icon) => icon.name).sort()
    assert.deepEqual(manifest, icons().map((file) => file.slice(0, -4)).sort())
})

test('published fonts have their license', () => {
    assert.ok(published.includes('fonts/OFL.txt'))
    assert.ok(published.some((file) => file.endsWith('.woff2')))
})

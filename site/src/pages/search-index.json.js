// Index de la recherche en direct (Ctrl+K, ⌘K), servi en développement comme en production : une entrée par page et
// par intertitre. Lu dans les sources (pages MDX, tokens.css, icônes, journal), jamais recopié.

import GithubSlugger from 'github-slugger'
import icones from '@communeenligne/design/icons/icons.json'
import journal from '../../../CHANGELOG.md?raw'
import { NOM, PAGES } from '../lib/navigation.js'
import { jetons } from '../lib/tokens.js'

const sources = import.meta.glob('./**/*.mdx', { query: '?raw', import: 'default', eager: true })

// Mots-clés des pages générées depuis les jetons : leurs noms de variables.
const GENEREES = {
    '/foundations/colors/': jetons.filter((j) => j.nom.startsWith('cel-couleur-')).map((j) => `--${j.nom} ${j.landing ?? ''}`),
    '/foundations/typography/': jetons.filter((j) => /^cel-(taille|graisse|interligne|approche|police)-/.test(j.nom)).map((j) => `--${j.nom}`),
    '/foundations/spacing/': jetons.filter((j) => /^cel-(espace|largeur|marge)-/.test(j.nom)).map((j) => `--${j.nom}`),
    '/foundations/grid/': jetons.filter((j) => /^cel-(rupture|largeur|marge)-/.test(j.nom)).map((j) => `--${j.nom}`),
    '/foundations/radius-and-shadows/': jetons.filter((j) => /^cel-(rayon|ombre)-/.test(j.nom)).map((j) => `--${j.nom}`),
    '/foundations/motion/': [...jetons.filter((j) => /^cel-(duree|courbe|retard)-/.test(j.nom)).map((j) => `--${j.nom}`), 'data-cel-apparition', 'cel-anim', 'prefers-reduced-motion'],
    '/foundations/icons/': icones.map((i) => i.nom),
    '/changelog/': [journal],
}

const fichierDe = (url) => (url === '/' ? './index.mdx' : `.${url.replace(/\/$/, '')}.mdx`)

// Texte lisible d'une source MDX : sans en-tête, imports, balises ni expressions.
const texteDe = (source) => source
    .replace(/^---[\s\S]*?---/, ' ')
    .replace(/^import .*$/gm, ' ')
    .replace(/<[A-Z][\s\S]*?\/>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[`*_|#>]/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\s+/g, ' ')
    .trim()

export const GET = () => {
    const entrees = []

    for (const page of PAGES) {
        const source = sources[fichierDe(page.url)] ?? ''
        const classes = [...new Set(source.match(/cel-[a-z0-9_-]+/g) ?? [])]
        const rubrique = page.rubrique?.titre ?? ''

        entrees.push({
            url: page.url,
            titre: page.titre,
            rubrique,
            resume: page.description ?? '',
            mots: [texteDe(source), ...classes, ...(GENEREES[page.url] ?? [])].join(' ').slice(0, 6000),
        })

        // Une entrée par intertitre des pages MDX, avec l'ancre que produit Astro (github-slugger).
        const slugger = new GithubSlugger()
        for (const [, intertitre] of source.matchAll(/^## (.+)$/gm)) {
            entrees.push({ url: `${page.url}#${slugger.slug(intertitre)}`, titre: intertitre, page: page.titre, rubrique, resume: '', mots: '' })
        }
    }

    return new Response(JSON.stringify({ nom: NOM, entrees }), { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
}

// Index de la recherche, construit après « astro build » depuis les pages produites : titre, intertitres et texte de
// chaque page. Écrit dist/search-index.json, lu par public/js/site.js sur la page /search/.

import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const DIST = fileURLToPath(new URL('../dist/', import.meta.url))
const EXCLUES = ['/search/', '/control/', '/404/']

const pages = (dossier) => readdirSync(dossier).flatMap((nom) => {
    const chemin = join(dossier, nom)

    return statSync(chemin).isDirectory() ? pages(chemin) : nom === 'index.html' ? [chemin] : []
})

const texte = (html) => html.replace(/<(script|style|pre|figure)[\s\S]*?<\/\1>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ')
    .replace(/&#39;|&apos;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim()

const index = pages(DIST).map((fichier) => {
    const html = readFileSync(fichier, 'utf8')
    const url = `/${relative(DIST, fichier).replace(/index\.html$/, '').replaceAll('\\', '/')}`
    const principal = html.match(/<main[\s\S]*?<\/main>/)?.[0] ?? ''

    return {
        url,
        titre: texte(html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1] ?? ''),
        rubrique: texte(html.match(/<meta name="rubrique" content="([^"]*)"/)?.[1] ?? ''),
        intertitres: [...principal.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)].map(([, h]) => texte(h)),
        texte: texte(principal).slice(0, 4000),
    }
}).filter((page) => !EXCLUES.includes(page.url) && page.titre)

writeFileSync(join(DIST, 'search-index.json'), JSON.stringify(index))
console.log(`Index de recherche : ${index.length} pages.`)

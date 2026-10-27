// Vérifications du site construit (dist/) : liens internes et ancres, aucune ressource d'un autre domaine, aucun style
// ni script en ligne, robots noindex, nofollow sur chaque page, robots.txt qui refuse tout, aucun plan du site.

import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const DIST = fileURLToPath(new URL('../dist/', import.meta.url))
const erreurs = []

const fichiers = (dossier) => readdirSync(dossier).flatMap((nom) => {
    const chemin = join(dossier, nom)

    return statSync(chemin).isDirectory() ? fichiers(chemin) : [chemin]
})

const pages = fichiers(DIST).filter((fichier) => fichier.endsWith('.html'))
const ancres = new Map(pages.map((fichier) => [fichier, new Set([...readFileSync(fichier, 'utf8').matchAll(/\sid="([^"]+)"/g)].map(([, id]) => id))]))

const cibleDe = (chemin) => {
    const brut = decodeURIComponent(chemin)
    const candidats = brut.endsWith('/') ? [join(DIST, brut, 'index.html')] : [join(DIST, brut), join(DIST, brut, 'index.html')]

    return candidats.find((candidat) => existsSync(candidat) && statSync(candidat).isFile())
}

for (const page of pages) {
    const html = readFileSync(page, 'utf8')
    const nom = `/${relative(DIST, page).replaceAll('\\', '/')}`

    if (!/<meta name="robots" content="noindex, nofollow">/.test(html)) {
        erreurs.push(`${nom} : balise robots noindex, nofollow absente`)
    }

    if (/\sstyle="/.test(html) || /<style[\s>]/.test(html)) {
        erreurs.push(`${nom} : style en ligne`)
    }

    for (const [balise] of html.matchAll(/<script\b[^>]*>/g)) {
        if (!/\ssrc="/.test(balise)) {
            erreurs.push(`${nom} : script en ligne ${balise}`)
        }
    }

    for (const [, attribut, valeur] of html.matchAll(/\s(href|src|action)="([^"]*)"/g)) {
        if (/^(https?:)?\/\//.test(valeur)) {
            // Un lien vers un autre site est permis ; une ressource chargée (src, <link>) ne l'est pas : voir plus bas.
            if (attribut === 'src') {
                erreurs.push(`${nom} : ressource d'un autre domaine ${valeur}`)
            }
            continue
        }

        if (!valeur.startsWith('/') && !valeur.startsWith('#')) {
            continue
        }

        const [chemin, ancre] = valeur.split('#')
        const cible = chemin === '' ? page : cibleDe(chemin)

        if (!cible) {
            erreurs.push(`${nom} : lien cassé ${valeur}`)
        } else if (ancre && cible.endsWith('.html') && !ancres.get(cible)?.has(decodeURIComponent(ancre))) {
            erreurs.push(`${nom} : ancre introuvable ${valeur}`)
        }
    }
}

for (const [, valeur] of pages.flatMap((page) => [...readFileSync(page, 'utf8').matchAll(/<link[^>]+href="((?:https?:)?\/\/[^"]+)"/g)])) {
    erreurs.push(`ressource d'un autre domaine : ${valeur}`)
}

if (!/User-agent: \*\s+Disallow: \/\s*$/m.test(readFileSync(join(DIST, 'robots.txt'), 'utf8'))) {
    erreurs.push('robots.txt ne refuse pas tout')
}

if (fichiers(DIST).some((fichier) => /sitemap/i.test(fichier))) {
    erreurs.push('un plan du site a été produit')
}

if (readFileSync(join(DIST, 'CNAME'), 'utf8').trim() !== 'design.communeenligne.fr') {
    erreurs.push('CNAME absent ou incorrect')
}

// La feuille du site n'écrit aucune couleur : seulement les variables du paquet.
const feuille = readFileSync(fileURLToPath(new URL('../src/styles/site.css', import.meta.url)), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '')
for (const [couleur] of feuille.matchAll(/#[0-9a-f]{3,8}\b|rgba?\(|hsla?\(/gi)) {
    erreurs.push(`site.css : couleur écrite hors des jetons ${couleur}`)
}

if (erreurs.length > 0) {
    console.error(erreurs.join('\n'))
    process.exit(1)
}

console.log(`${pages.length} pages vérifiées : liens internes, ancres, aucun style ni script en ligne, noindex.`)

// Checks of the built site (dist/): internal links and anchors, no resource from another domain, no inline style or
// script, robots noindex, nofollow on each page, robots.txt that disallows everything, no sitemap.

import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const DIST = fileURLToPath(new URL('../dist/', import.meta.url))
const errors = []

const files = (folder) => readdirSync(folder).flatMap((name) => {
    const path = join(folder, name)

    return statSync(path).isDirectory() ? files(path) : [path]
})

const pages = files(DIST).filter((file) => file.endsWith('.html'))
const anchors = new Map(pages.map((file) => [file, new Set([...readFileSync(file, 'utf8').matchAll(/\sid="([^"]+)"/g)].map(([, id]) => id))]))

const targetOf = (path) => {
    const raw = decodeURIComponent(path)
    const candidates = raw.endsWith('/') ? [join(DIST, raw, 'index.html')] : [join(DIST, raw), join(DIST, raw, 'index.html')]

    return candidates.find((candidate) => existsSync(candidate) && statSync(candidate).isFile())
}

for (const page of pages) {
    const html = readFileSync(page, 'utf8')
    const name = `/${relative(DIST, page).replaceAll('\\', '/')}`

    if (!/<meta name="robots" content="noindex, nofollow">/.test(html)) {
        errors.push(`${name} : balise robots noindex, nofollow absente`)
    }

    if (/\sstyle="/.test(html) || /<style[\s>]/.test(html)) {
        errors.push(`${name} : style en ligne`)
    }

    for (const [tag] of html.matchAll(/<script\b[^>]*>/g)) {
        if (!/\ssrc="/.test(tag)) {
            errors.push(`${name} : script en ligne ${tag}`)
        }
    }

    for (const [, attribute, value] of html.matchAll(/\s(href|src|action)="([^"]*)"/g)) {
        if (/^(https?:)?\/\//.test(value)) {
            // A link to another site is allowed; a loaded resource (src, <link>) is not: see below.
            if (attribute === 'src') {
                errors.push(`${name} : ressource d'un autre domaine ${value}`)
            }
            continue
        }

        if (!value.startsWith('/') && !value.startsWith('#')) {
            continue
        }

        const [path, anchor] = value.split('#')
        const target = path === '' ? page : targetOf(path)

        if (!target) {
            errors.push(`${name} : lien cassé ${value}`)
        } else if (anchor && target.endsWith('.html') && !anchors.get(target)?.has(decodeURIComponent(anchor))) {
            errors.push(`${name} : ancre introuvable ${value}`)
        }
    }
}

for (const [, value] of pages.flatMap((page) => [...readFileSync(page, 'utf8').matchAll(/<link[^>]+href="((?:https?:)?\/\/[^"]+)"/g)])) {
    errors.push(`ressource d'un autre domaine : ${value}`)
}

if (!/User-agent: \*\s+Disallow: \/\s*$/m.test(readFileSync(join(DIST, 'robots.txt'), 'utf8'))) {
    errors.push('robots.txt ne refuse pas tout')
}

if (files(DIST).some((file) => /sitemap/i.test(file))) {
    errors.push('un plan du site a été produit')
}

if (readFileSync(join(DIST, 'CNAME'), 'utf8').trim() !== 'design.communeenligne.fr') {
    errors.push('CNAME absent ou incorrect')
}

// The stylesheet of the site writes no color: only the variables of the package.
const sheet = readFileSync(fileURLToPath(new URL('../src/styles/site.css', import.meta.url)), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '')
for (const [color] of sheet.matchAll(/#[0-9a-f]{3,8}\b|rgba?\(|hsla?\(/gi)) {
    errors.push(`site.css : couleur écrite hors des variables ${color}`)
}

if (errors.length > 0) {
    console.error(errors.join('\n'))
    process.exit(1)
}

console.log(`${pages.length} pages vérifiées : liens internes, ancres, aucun style ni script en ligne, noindex.`)

// Génère icons/sprite.svg (une planche de <symbol>) depuis les fichiers icons/*.svg, tous en 24 × 24, trait 1,5 et
// couleur héritée (currentColor). « node scripts/sprite.mjs --verifier » échoue si la planche n'est pas à jour, ou si
// une icône ne suit pas le format commun.

import { readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const DOSSIER = fileURLToPath(new URL('../icons/', import.meta.url))
const CIBLE = `${DOSSIER}sprite.svg`
const ENTETE = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'

export const icones = () => readdirSync(DOSSIER).filter((fichier) => fichier.endsWith('.svg') && fichier !== 'sprite.svg').sort()

export const generer = () => {
    const symboles = icones().map((fichier) => {
        const svg = readFileSync(DOSSIER + fichier, 'utf8').trim()

        if (!svg.startsWith(ENTETE) || !svg.endsWith('</svg>')) {
            throw new Error(`${fichier} ne suit pas le format commun (24 × 24, trait 1,5, currentColor).`)
        }

        if (/(fill|stroke)="#|stroke-width="(?!1\.5")/.test(svg.slice(ENTETE.length))) {
            throw new Error(`${fichier} : couleur ou épaisseur de trait propre à un tracé.`)
        }

        const corps = svg.slice(ENTETE.length, -'</svg>'.length)

        return `<symbol id="${fichier.slice(0, -4)}" viewBox="0 0 24 24">${corps}</symbol>`
    })

    return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">\n<!-- @communeenligne/design : planche générée par scripts/sprite.mjs (npm run generer), ne pas modifier. Licences : icons/LICENSES.md. -->\n${symboles.join('\n')}\n</svg>\n`
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    const contenu = generer()

    if (process.argv.includes('--verifier')) {
        if (readFileSync(CIBLE, 'utf8') !== contenu) {
            console.error('icons/sprite.svg n\'est pas à jour : lancer « npm run generer ».')
            process.exit(1)
        }
        console.log(`icons/sprite.svg est à jour (${icones().length} icônes).`)
    } else {
        writeFileSync(CIBLE, contenu)
        console.log(`icons/sprite.svg généré (${icones().length} icônes).`)
    }
}

// Feuille générée à chaque construction depuis tokens.css (src/styles/tokens.generated.css, non versionnée) : une
// classe par jeton, qui pose sa valeur dans --doc-v (et, pour une couleur, ses valeurs claire et sombre). Les pages des
// fondamentaux s'en servent pour leurs échantillons, sans attribut style et sans recopier une valeur.

import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { lireJetons, resoudre } from '@communeenligne/design/tools/tokens.mjs'

const { jetons } = lireJetons()
const regles = jetons.map((jeton) => {
    const couleur = jeton.nom.startsWith('cel-couleur-')
    const valeurs = couleur ? ` --doc-clair: ${resoudre(jetons, jeton.nom, 'clair')}; --doc-sombre: ${resoudre(jetons, jeton.nom, 'sombre')};` : ''

    return `.doc-v-${jeton.nom} { --doc-v: var(--${jeton.nom});${valeurs} }`
})

writeFileSync(fileURLToPath(new URL('../src/styles/tokens.generated.css', import.meta.url)), `/* Généré par scripts/token-classes.mjs depuis tokens.css : ne pas modifier. */\n${regles.join('\n')}\n`)
console.log(`Classes des jetons générées (${regles.length}).`)

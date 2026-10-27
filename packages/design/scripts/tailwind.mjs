// Génère tailwind.css (bloc @theme de Tailwind 4) depuis tokens.css : chaque utilitaire pointe vers la variable du
// paquet, jamais vers une valeur. « node scripts/tailwind.mjs --check » échoue si le fichier n'est pas à jour.

import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { lireJetons } from '../tools/tokens.mjs'

const CIBLE = fileURLToPath(new URL('../tailwind.css', import.meta.url))

// Préfixe du paquet → espace de noms de Tailwind 4.
const ESPACES = [
    ['cel-couleur-', 'color-'],
    ['cel-police-', 'font-'],
    ['cel-taille-', 'text-'],
    ['cel-graisse-', 'font-weight-'],
    ['cel-interligne-', 'leading-'],
    ['cel-approche-', 'tracking-'],
    ['cel-rayon-', 'radius-'],
    ['cel-ombre-', 'shadow-'],
    ['cel-courbe-', 'ease-'],
]

const LARGEURS = { 'cel-largeur-contenu': 'container-contenu', 'cel-largeur-etroite': 'container-etroite', 'cel-largeur-lecture': 'container-lecture', 'cel-espace-section': 'spacing-section' }

export const generer = () => {
    const { jetons } = lireJetons()
    const lignes = []

    for (const jeton of jetons) {
        const espace = ESPACES.find(([prefixe]) => jeton.nom.startsWith(prefixe))

        if (espace) {
            lignes.push(`    --${espace[1]}${jeton.nom.slice(espace[0].length)}: var(--${jeton.nom});`)
        } else if (LARGEURS[jeton.nom]) {
            lignes.push(`    --${LARGEURS[jeton.nom]}: var(--${jeton.nom});`)
        } else if (jeton.nom.startsWith('cel-rupture-')) {
            // Les points de rupture de Tailwind 4 sont en rem (16 px) ; var() n'est pas permis dans @media.
            lignes.push(`    --breakpoint-${jeton.nom.slice('cel-rupture-'.length)}: ${parseInt(jeton.clair, 10) / 16}rem;`)
        }
    }

    return `/*
 * @communeenligne/design : thème Tailwind 4. Fichier généré par scripts/tailwind.mjs depuis tokens.css : ne pas le
 * modifier à la main (npm run generate).
 *
 * @theme inline : chaque utilitaire écrit var(--cel-…) dans la page ; le thème sombre (.cel-sombre) s'applique donc sans
 * variante dark:. Exemples : bg-fond-page, text-texte-marine, border-filet, rounded-moyen, shadow-bouton, text-15,
 * font-extra, max-w-contenu, py-section ; points de rupture telephone: (640 px et plus), max-telephone:
 * (moins de 640 px).
 */

@import './tokens.css';
@import './fonts/fonts.css';

@theme inline {
${lignes.join('\n')}
}
`
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    const contenu = generer()

    if (process.argv.includes('--check')) {
        if (readFileSync(CIBLE, 'utf8') !== contenu) {
            console.error('tailwind.css n\'est pas à jour : lancer « npm run generate ».')
            process.exit(1)
        }
        console.log('tailwind.css est à jour.')
    } else {
        writeFileSync(CIBLE, contenu)
        console.log('tailwind.css généré.')
    }
}

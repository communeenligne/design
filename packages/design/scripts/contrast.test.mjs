// Contrastes du design system, dans les deux thèmes, lus dans tokens.css : 4,5:1 pour le texte, 3:1 pour les bordures
// des champs et éléments d'interface et pour le focus. Reprend les paires du test de la landing (LandingThemeTest),
// sous les noms du paquet, et y ajoute toute règle de components.css qui pose à la fois un texte et un fond.
// Lancer : npm test (node --test).

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { contraste, estHexa, lireJetons, resoudre } from '../tools/tokens.mjs'

const { jetons, sombresInconnus } = lireJetons()
const couleurs = jetons.filter((jeton) => jeton.nom.startsWith('cel-couleur-'))
const c = (nom) => `cel-couleur-${nom}`

const paires = []
const ajouter = (textes, fonds, minimum, raison) => {
    for (const texte of textes) {
        for (const fond of fonds) {
            paires.push({ texte: texte.startsWith('cel-') ? texte : c(texte), fond: fond.startsWith('cel-') ? fond : c(fond), minimum, raison })
        }
    }
}

// Texte courant sur les fonds de page.
ajouter(
    ['encre', 'texte', 'texte-discret', 'texte-2', 'texte-3', 'texte-discret-2', 'texte-discret-3', 'texte-discret-4', 'texte-discret-5', 'texte-marine', 'texte-marine-survol', 'texte-vert', 'texte-foret', 'texte-ocre', 'erreur', 'repere-bon-texte'],
    ['fond-page', 'surface', 'fond-clair', 'surface-attenuee', 'surface-attenuee-2'],
    4.5,
    'texte',
)
// Textes sur les teintes.
ajouter(['ocre-titre', 'ocre-encre', 'ocre-encre-2', 'ocre-encre-3', 'encre', 'texte', 'texte-marine'], ['teinte-ocre', 'teinte-ocre-2', 'teinte-ocre-3', 'teinte-ocre-4', 'teinte-ocre-5', 'teinte-sable'], 4.5, 'texte')
ajouter(['bleu-titre', 'bleu-texte', 'bleu-encre', 'texte-marine'], ['teinte-bleu', 'teinte-bleu-2', 'surface'], 4.5, 'texte')
ajouter(['vert-titre', 'vert-texte', 'vert-encre', 'vert-encre-2', 'vert-encre-3'], ['teinte-vert', 'teinte-vert-2', 'teinte-vert-3', 'surface'], 4.5, 'texte')
// Surfaces fortes et dorées.
ajouter(['sur-fort', 'sur-sombre', 'sur-fort-doux', 'sur-fort-2', 'sur-fort-or', 'or'], ['fond-fort', 'fond-fort-profond', 'fond-fort-doux'], 4.5, 'texte')
ajouter(['sur-fort'], ['bouton', 'bouton-survol', 'foret', 'vert', 'repere-bon'], 4.5, 'texte')
ajouter(['sur-or', 'sur-or-marine'], ['or', 'ocre', 'or-survol'], 4.5, 'texte')
ajouter(['texte-marine', 'encre'], ['surface-survol', 'surface-courante', 'habillage'], 4.5, 'texte')
ajouter(['erreur-encre'], ['teinte-rouge'], 4.5, 'texte')
ajouter(['sur-foret'], ['foret'], 4.5, 'texte')
ajouter(['texte-discret-5'], ['fond-segmente'], 4.5, 'texte')
ajouter(['texte'], ['teinte-bleu-2'], 4.5, 'texte')
ajouter(['texte-discret'], ['surface-survol'], 4.5, 'texte (bouton désactivé)')
// Bordures des champs et éléments d'interface, icônes porteuses de sens.
ajouter(['bordure-champ', 'texte-marine', 'ocre-icone', 'icone-douce', 'filet-focus'], ['fond-page', 'surface'], 3, 'interface')
ajouter(['bouton'], ['fond-page', 'surface'], 3, 'interface')
ajouter(['repere-moyen'], ['repere-moyen-fond'], 3, 'interface')
ajouter(['repere-mauvais'], ['repere-mauvais-fond'], 3, 'interface')
ajouter(['sur-fort-filet'], ['fond-fort'], 3, 'interface (filtre)')
// Focus visible : marine sur les fonds clairs, doré sur les surfaces fortes.
ajouter(['cel-focus-couleur'], ['fond-page', 'surface', 'fond-clair', 'surface-attenuee', 'teinte-bleu-2'], 3, 'focus')
ajouter(['cel-focus-couleur-sur-fort'], ['fond-fort', 'fond-fort-profond', 'fond-fort-doux'], 3, 'focus')

// Toute règle de components.css qui pose à la fois un texte et un fond opaque.
const composants = readFileSync(new URL('../components.css', import.meta.url), 'utf8')
for (const [, regle] of composants.matchAll(/\{([^{}]*)\}/g)) {
    const texte = regle.match(/(?<![-\w])color:\s*var\(--([a-z0-9-]+)\);/)
    const fond = regle.match(/background:\s*var\(--([a-z0-9-]+)\);/)

    if (texte && fond && estHexa(resoudre(jetons, fond[1]))) {
        paires.push({ texte: texte[1], fond: fond[1], minimum: 4.5, raison: 'règle de components.css' })
    }
}

test('chaque couleur thématisée a une valeur sombre, ou appartient à un groupe identique dans les deux thèmes', () => {
    const manquantes = couleurs.filter((jeton) => !jeton.fixe && !jeton.redefini).map((jeton) => jeton.nom)
    const fixesRedefinies = couleurs.filter((jeton) => jeton.fixe && jeton.redefini).map((jeton) => jeton.nom)

    assert.deepEqual(manquantes, [], 'sans valeur sombre')
    assert.deepEqual(fixesRedefinies, [], 'déclarées identiques mais redéfinies en sombre')
    assert.deepEqual(sombresInconnus, [], 'redéfinies en sombre sans valeur claire')
})

test('les ombres sont transparentes en sombre', () => {
    const visibles = couleurs.filter((jeton) => jeton.nom.startsWith('cel-couleur-ombre-') && jeton.sombre !== 'transparent')

    assert.deepEqual(visibles.map((jeton) => jeton.nom), [])
})

// Écarts connus, repris tels quels de la landing (version 1.0.0 : fidélité d'abord). Le composant reste identifié par son
// texte (WCAG 1.4.11 n'exige alors pas le contraste du contour) ; correction proposée pour une version suivante.
const ECARTS_CONNUS = {
    'sombre : cel-couleur-bouton sur cel-couleur-surface': 'bouton plein posé sur une carte en thème sombre (posé sur la page : 3:1 atteint)',
    'clair : cel-couleur-sur-fort-filet sur cel-couleur-fond-fort': 'contour du filtre non choisi sur fond marine (.chip de la landing)',
    'sombre : cel-couleur-sur-fort-filet sur cel-couleur-fond-fort': 'contour du filtre non choisi sur fond marine (.chip de la landing)',
}

for (const theme of ['clair', 'sombre']) {
    test(`contrastes du thème ${theme} : 4,5:1 pour le texte, 3:1 pour l'interface et le focus`, () => {
        const echecs = []
        const ecarts = []

        for (const { texte, fond, minimum, raison } of paires) {
            const avant = resoudre(jetons, texte, theme)
            const arriere = resoudre(jetons, fond, theme)

            assert.ok(estHexa(avant), `--${texte} n'est pas une couleur #rrggbb en ${theme} (${avant})`)
            assert.ok(estHexa(arriere), `--${fond} n'est pas une couleur #rrggbb en ${theme} (${arriere})`)

            const rapport = contraste(avant, arriere)
            const cle = `${theme} : ${texte} sur ${fond}`

            if (rapport < minimum) {
                const ligne = `--${texte} sur --${fond} = ${rapport.toFixed(2)} (${raison}, ${minimum}:1 attendu)`
                ;(ECARTS_CONNUS[cle] ? ecarts : echecs).push(ECARTS_CONNUS[cle] ? `${ligne} : ${ECARTS_CONNUS[cle]}` : ligne)
            }
        }

        assert.deepEqual(echecs, [])
        console.log(`  ${theme} : ${paires.length} paires vérifiées, ${paires.length - ecarts.length} conformes`)
        ecarts.forEach((ecart) => console.log(`  écart connu : ${ecart}`))
    })
}

test('chaque écart connu existe encore (sinon, le retirer de la liste)', () => {
    const presents = Object.keys(ECARTS_CONNUS).filter((cle) => {
        const [theme, reste] = cle.split(' : ')
        const [texte, fond] = reste.split(' sur ')
        const paire = paires.find((p) => p.texte === texte && p.fond === fond)

        return paire && contraste(resoudre(jetons, texte, theme), resoudre(jetons, fond, theme)) < paire.minimum
    })

    assert.deepEqual(presents, Object.keys(ECARTS_CONNUS))
})

// Lecture de tokens.css : groupes, valeurs claires et sombres, nom d'origine dans la landing. Utilisé par les tests du
// paquet, les générateurs (tailwind.css) et le site de documentation, pour qu'aucun d'eux ne recopie une valeur.

import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

export const CHEMIN_JETONS = fileURLToPath(new URL('../tokens.css', import.meta.url))

const bloc = (css, selecteur) => {
    const debut = css.indexOf(`\n${selecteur} {`)

    if (debut === -1) {
        throw new Error(`Bloc « ${selecteur} » introuvable dans tokens.css`)
    }

    return css.slice(debut, css.indexOf('\n}', debut))
}

const lignes = (texte) => {
    const resultat = []
    let groupe = null

    for (const ligne of texte.split('\n')) {
        const titre = ligne.match(/^\s*\/\*\s*-{4}\s*(.+?)\s*-{4}\s*\*\/\s*$/)

        if (titre) {
            groupe = titre[1]
            continue
        }

        const jeton = ligne.match(/^\s*--([a-z0-9-]+):\s*(.+?);\s*(?:\/\*\s*(.*?)\s*\*\/)?\s*$/)

        if (jeton) {
            resultat.push({ nom: jeton[1], valeur: jeton[2], note: jeton[3] ?? null, groupe })
        }
    }

    return resultat
}

// Couleurs d'un groupe « identiques dans les deux thèmes » : jamais redéfinies en sombre.
export const groupeFixe = (groupe) => /identiques dans les deux thèmes/.test(groupe ?? '')

export const lireJetons = (css = readFileSync(CHEMIN_JETONS, 'utf8')) => {
    const clairs = lignes(bloc(css, ':root'))
    const sombres = new Map(lignes(bloc(css, ':root.cel-sombre')).map((jeton) => [jeton.nom, jeton.valeur]))
    const jetons = clairs.map((jeton) => ({
        nom: jeton.nom,
        groupe: jeton.groupe,
        clair: jeton.valeur,
        sombre: sombres.get(jeton.nom) ?? jeton.valeur,
        redefini: sombres.has(jeton.nom),
        fixe: groupeFixe(jeton.groupe),
        landing: jeton.note?.startsWith('--') ? jeton.note : null,
        note: jeton.note?.startsWith('--') ? null : jeton.note,
    }))
    const groupes = [...new Set(jetons.map((jeton) => jeton.groupe))].map((nom) => ({
        nom,
        jetons: jetons.filter((jeton) => jeton.groupe === nom),
    }))

    return { jetons, groupes, sombresInconnus: [...sombres.keys()].filter((nom) => !clairs.some((jeton) => jeton.nom === nom)) }
}

// Valeur d'un jeton dans un thème, références var() résolues.
export const resoudre = (jetons, nom, theme = 'clair') => {
    const index = new Map(jetons.map((jeton) => [jeton.nom, jeton]))
    let valeur = index.get(nom)?.[theme]

    for (let tour = 0; valeur && tour < 10 && valeur.includes('var(--'); tour++) {
        valeur = valeur.replace(/var\(--([a-z0-9-]+)\)/g, (_, autre) => index.get(autre)?.[theme] ?? `var(--${autre})`)
    }

    return valeur
}

// Contraste WCAG 2 entre deux couleurs #rrggbb.
export const luminance = (hex) => {
    const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4))

    return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

export const contraste = (a, b) => {
    const [claire, foncee] = [luminance(a), luminance(b)].sort((x, y) => y - x)

    return (claire + 0.05) / (foncee + 0.05)
}

export const estHexa = (valeur) => /^#[0-9a-f]{6}$/i.test(valeur ?? '')

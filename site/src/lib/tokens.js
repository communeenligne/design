// Jetons du paquet pour les pages du site : lus dans tokens.css à la construction, jamais recopiés.
import { contraste, lireJetons, resoudre, estHexa } from '@communeenligne/design/tools/tokens.mjs'
import css from '@communeenligne/design/tokens.css?raw'

export const { jetons, groupes } = lireJetons(css)
export { contraste, resoudre }

export const slug = (texte) => texte.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

export const groupesDe = (prefixe) => groupes
    .map((groupe) => ({ ...groupe, jetons: groupe.jetons.filter((jeton) => jeton.nom.startsWith(prefixe)) }))
    .filter((groupe) => groupe.jetons.length > 0)

export const valeur = (nom, theme = 'clair') => resoudre(jetons, nom, theme)

// Écart de couleur CIE76 (Lab) : sert à repérer les couleurs presque identiques.
const lab = (hex) => {
    const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4))
    const f = (v) => (v > 0.008856 ? Math.cbrt(v) : 7.787 * v + 16 / 116)
    const [x, y, z] = [(0.4124 * r + 0.3576 * g + 0.1805 * b) / 0.95047, 0.2126 * r + 0.7152 * g + 0.0722 * b, (0.0193 * r + 0.1192 * g + 0.9505 * b) / 1.08883]

    return [116 * f(y) - 16, 500 * (f(x) - f(y)), 200 * (f(y) - f(z))]
}

export const ecart = (a, b) => Math.hypot(...lab(a).map((v, i) => v - lab(b)[i]))

// Paires de couleurs à moins de 2,5 d'écart dans les deux thèmes (à peine discernables) : candidates à la fusion.
export const quasiDoublons = (seuil = 2.5) => {
    const couleurs = jetons.filter((j) => j.nom.startsWith('cel-couleur-') && estHexa(j.clair) && estHexa(j.sombre))
    const paires = []

    couleurs.forEach((a, i) => couleurs.slice(i + 1).forEach((b) => {
        const pire = Math.max(ecart(a.clair, b.clair), ecart(a.sombre, b.sombre))

        if (pire < seuil) {
            paires.push({ a, b, ecart: pire })
        }
    }))

    return paires.sort((x, y) => x.ecart - y.ecart)
}

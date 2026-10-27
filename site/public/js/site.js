// Script du site de documentation : thème, onglets et animations du paquet, boutons « Copier », recherche.

import { initTheme } from '/design/js/theme.js'
import { initOnglets } from '/design/js/tabs.js'
import { initMouvement } from '/design/js/motion.js'

initTheme()
initOnglets()
initMouvement()

// Le choix du thème n'a de sens qu'avec ce script : il est masqué sans lui.
document.querySelectorAll('[data-cel-theme][hidden]').forEach((groupe) => groupe.removeAttribute('hidden'))

// ---------- Copier le code d'un exemple ----------

document.querySelectorAll('.doc-code').forEach((bloc) => {
    if (!navigator.clipboard) {
        return
    }

    const bouton = document.createElement('button')
    bouton.type = 'button'
    bouton.className = 'doc-code__copier'
    bouton.textContent = 'Copier'
    bouton.addEventListener('click', async () => {
        await navigator.clipboard.writeText(bloc.querySelector('code').textContent)
        bouton.textContent = 'Copié'
        setTimeout(() => (bouton.textContent = 'Copier'), 2000)
    })
    bloc.append(bouton)
})

// ---------- Recherche (/search/?q=…) ----------
// Sans script, la page liste toutes les pages. Avec, elle cherche chaque mot dans le titre, les intertitres et le texte
// de l'index construit après la construction du site (search-index.json).

const zone = document.querySelector('[data-recherche]')

if (zone) {
    const champ = zone.querySelector('input[name="q"]')
    const liste = zone.querySelector('[data-resultats]')
    const etat = zone.querySelector('[data-etat]')
    const toutes = document.querySelector('[data-toutes-les-pages]')
    const sansAccents = (texte) => texte.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
    const index = await fetch('/search-index.json').then((reponse) => reponse.json()).catch(() => [])

    const extrait = (texte, mot) => {
        const position = sansAccents(texte).indexOf(mot)

        return position === -1 ? texte.slice(0, 160) : `${position > 60 ? '…' : ''}${texte.slice(Math.max(0, position - 60), position + 100)}…`
    }

    const chercher = () => {
        const mots = sansAccents(champ.value).split(/\s+/).filter((mot) => mot.length > 1)
        liste.replaceChildren()

        if (mots.length === 0) {
            etat.textContent = ''
            toutes.hidden = false

            return
        }

        const resultats = index
            .map((page) => {
                const titre = sansAccents(page.titre)
                const intertitres = sansAccents(page.intertitres.join(' '))
                const texte = sansAccents(page.texte)
                const score = mots.reduce((total, mot) => (total === null || !(titre + intertitres + texte).includes(mot) ? null : total + (titre.includes(mot) ? 10 : 0) + (intertitres.includes(mot) ? 4 : 0) + (texte.includes(mot) ? 1 : 0)), 0)

                return { page, score }
            })
            .filter((resultat) => resultat.score !== null)
            .sort((a, b) => b.score - a.score)

        toutes.hidden = true
        etat.textContent = resultats.length === 0 ? `Aucune page ne contient « ${champ.value} ».` : `${resultats.length} page${resultats.length > 1 ? 's' : ''} pour « ${champ.value} ».`

        for (const { page } of resultats.slice(0, 30)) {
            const element = document.createElement('li')
            element.className = 'cel-carte'
            const titre = document.createElement('p')
            titre.className = 'cel-carte__titre'
            const lien = document.createElement('a')
            lien.className = 'cel-carte__lien'
            lien.href = page.url
            lien.textContent = page.titre
            titre.append(lien)
            const resume = document.createElement('p')
            resume.className = 'cel-carte__resume doc-resultats__extrait'
            resume.textContent = extrait(page.texte, mots[0])
            const rubrique = document.createElement('p')
            rubrique.className = 'cel-carte__meta'
            rubrique.textContent = page.rubrique || 'Accueil'
            element.append(titre, resume, rubrique)
            liste.append(element)
        }
    }

    champ.value = new URLSearchParams(window.location.search).get('q') ?? ''
    document.getElementById('recherche-entete').value = champ.value
    champ.addEventListener('input', () => {
        chercher()
        history.replaceState(null, '', champ.value ? `?q=${encodeURIComponent(champ.value)}` : window.location.pathname)
    })
    zone.querySelector('form').addEventListener('submit', (evenement) => evenement.preventDefault())
    chercher()
}

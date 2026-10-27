// Script du site de documentation : thème, onglets et animations du paquet, boutons de copie, recherche en direct.

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
    bouton.innerHTML = '<svg class="cel-icone cel-icone--18" aria-hidden="true" focusable="false"><use></use></svg>'
    const icone = bouton.querySelector('use')
    // Icône « dupliquer » au repos, coche pendant deux secondes après la copie ; le nom accessible suit.
    const etat = (copie) => {
        const libelle = copie ? 'Code copié' : 'Copier le code'
        icone.setAttribute('href', `/design/icons/sprite.svg#${copie ? 'check' : 'document-duplicate'}`)
        bouton.setAttribute('aria-label', libelle)
        bouton.title = libelle
    }
    etat(false)
    bouton.addEventListener('click', async () => {
        await navigator.clipboard.writeText(bloc.querySelector('code').textContent)
        etat(true)
        setTimeout(() => etat(false), 2000)
    })
    bloc.append(bouton)
})

// ---------- Recherche en direct : Ctrl+K (⌘K sur Mac), ou le bouton de l'en-tête ----------
// Fenêtre modale (<dialog>) : champ en combobox, résultats en listbox (aria-activedescendant) ; flèches pour choisir,
// Entrée pour ouvrir, Échap pour fermer. L'index (/search-index.json) est chargé à la première ouverture. Sans script,
// le bouton reste masqué : la navigation et le fil d'Ariane suffisent.

const dialogue = document.querySelector('[data-recherche]')
const ouvrir = document.querySelector('[data-recherche-ouvrir]')

if (dialogue && ouvrir && typeof dialogue.showModal === 'function') {
    const champ = dialogue.querySelector('input')
    const liste = dialogue.querySelector('[data-recherche-resultats]')
    const etat = dialogue.querySelector('[data-recherche-etat]')
    const mac = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent)
    const MAX = 12
    let index = null
    let resultats = []
    let actif = -1

    ouvrir.querySelector('[data-raccourci]').textContent = mac ? '⌘ K' : 'Ctrl K'
    ouvrir.setAttribute('aria-keyshortcuts', mac ? 'Meta+K' : 'Control+K')
    ouvrir.hidden = false

    const normaliser = (texte) => texte.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

    const charger = async () => {
        if (index === null) {
            index = fetch('/search-index.json')
                .then((reponse) => reponse.json())
                .then(({ entrees }) => entrees.map((entree) => ({ ...entree, _titre: normaliser(entree.titre), _texte: normaliser(`${entree.page ?? ''} ${entree.resume} ${entree.mots}`) })))
                .catch(() => [])
        }

        return index
    }

    const extrait = (entree, mot) => {
        if (entree.resume) {
            return entree.resume
        }

        const position = normaliser(entree.mots).indexOf(mot)

        return position === -1 ? '' : `…${entree.mots.slice(Math.max(0, position - 50), position + 90)}…`
    }

    const choisir = (rang) => {
        actif = rang
        ;[...liste.children].forEach((element, i) => element.setAttribute('aria-selected', String(i === rang)))

        if (rang >= 0) {
            champ.setAttribute('aria-activedescendant', `resultat-${rang}`)
            liste.children[rang].scrollIntoView({ block: 'nearest' })
        } else {
            champ.removeAttribute('aria-activedescendant')
        }
    }

    const chercher = async () => {
        const entrees = await charger()
        const requete = champ.value.trim()
        const mots = normaliser(requete).split(/\s+/).filter(Boolean)

        resultats = mots.length === 0 ? [] : entrees
            .map((entree) => {
                let score = 0

                for (const mot of mots) {
                    const dansTitre = entree._titre.includes(mot)

                    if (!dansTitre && !entree._texte.includes(mot)) {
                        return null
                    }

                    score += (entree._titre.startsWith(mot) ? 30 : dansTitre ? 20 : 2) + (entree.page ? 0 : 5)
                }

                return { entree, score }
            })
            .filter(Boolean)
            .sort((a, b) => b.score - a.score)
            .slice(0, MAX)
            .map(({ entree }) => entree)

        liste.replaceChildren(...resultats.map((entree, rang) => {
            const element = document.createElement('li')
            element.id = `resultat-${rang}`
            element.setAttribute('role', 'option')
            element.setAttribute('aria-selected', 'false')
            element.className = 'doc-dialogue__resultat'

            const lien = document.createElement('a')
            lien.href = entree.url
            lien.tabIndex = -1
            const chemin = document.createElement('span')
            chemin.className = 'doc-dialogue__chemin'
            chemin.textContent = [entree.rubrique, entree.page].filter(Boolean).join(' › ') || 'Accueil'
            const titre = document.createElement('span')
            titre.className = 'doc-dialogue__titre'
            titre.textContent = entree.titre
            lien.append(chemin, titre)

            const resume = extrait(entree, mots[0])
            if (resume) {
                const texte = document.createElement('span')
                texte.className = 'doc-dialogue__extrait'
                texte.textContent = resume
                lien.append(texte)
            }

            element.append(lien)
            element.addEventListener('mousemove', () => actif !== rang && choisir(rang))

            return element
        }))

        champ.setAttribute('aria-expanded', String(resultats.length > 0))
        etat.textContent = mots.length === 0 ? '' : resultats.length === 0 ? `Aucun résultat pour « ${requete} ».` : `${resultats.length} résultat${resultats.length > 1 ? 's' : ''}`
        choisir(resultats.length > 0 ? 0 : -1)
    }

    const afficher = () => {
        if (dialogue.open) {
            return
        }

        dialogue.showModal()
        champ.select()
        charger()
    }

    ouvrir.addEventListener('click', afficher)
    dialogue.querySelector('[data-recherche-fermer]').addEventListener('click', () => dialogue.close())
    // Un clic sur le fond (hors du cadre) ferme la fenêtre.
    dialogue.addEventListener('click', (evenement) => evenement.target === dialogue && dialogue.close())
    dialogue.addEventListener('close', () => ouvrir.focus())

    document.addEventListener('keydown', (evenement) => {
        if ((evenement.ctrlKey || evenement.metaKey) && !evenement.altKey && evenement.key.toLowerCase() === 'k') {
            evenement.preventDefault()
            dialogue.open ? dialogue.close() : afficher()
        }
    })

    champ.addEventListener('input', chercher)
    champ.addEventListener('keydown', (evenement) => {
        if (evenement.key === 'ArrowDown' || evenement.key === 'ArrowUp') {
            evenement.preventDefault()

            if (resultats.length > 0) {
                const pas = evenement.key === 'ArrowDown' ? 1 : -1
                choisir((actif + pas + resultats.length) % resultats.length)
            }
        } else if (evenement.key === 'Enter' && actif >= 0) {
            evenement.preventDefault()
            window.location.href = resultats[actif].url
            dialogue.close()
        }
    })
}

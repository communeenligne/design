// Animations discrètes (motion.css), sans bibliothèque : reprise du module partagé de la landing.
//
// Règles : rien n'est masqué sans la classe cel-anim (js/motion-boot.js), jamais avec la réduction des
// animations ; seules opacity, translate et scale changent ; le titre h1 n'est jamais transparent ; durées de 150 à
// 400 ms, sans boucle ; aucune animation ne retarde la saisie, l'envoi d'un formulaire ou le déplacement du focus.

export const animationsReduites = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Animations permises : cel-anim posée au chargement, et pas de réduction des animations demandée depuis.
export const animationsPermises = () => document.documentElement.classList.contains('cel-anim') && !animationsReduites()

const RETARD_MAX = 7

// Part visible qui révèle un élément : 15 % de sa surface, ou 160 px de haut pour un bloc plus grand que l'écran.
const PART_VISIBLE = 0.15
const HAUTEUR_VISIBLE = 160

const reveler = (element, rang = null) => {
    if (element.classList.contains('cel-apparu')) {
        return
    }

    if (rang !== null && ![...element.classList].some((nom) => nom.startsWith('cel-retard-'))) {
        element.classList.add(`cel-retard-${Math.min(rang, RETARD_MAX)}`)
    }

    element.classList.add('cel-en-cours')
    element.addEventListener('transitionend', () => element.classList.remove('cel-en-cours'), { once: true })
    element.classList.add('cel-apparu')
}

// Chaque [data-cel-apparition] apparaît une fois, à son entrée à l'écran ; ceux qui entrent ensemble arrivent en
// cascade. Le focus affiche tout de suite l'élément qui le reçoit.
export const initApparitions = () => {
    const observateur = new IntersectionObserver((entrees) => {
        entrees
            .filter((entree) => entree.isIntersecting && (entree.intersectionRatio >= PART_VISIBLE || entree.intersectionRect.height >= HAUTEUR_VISIBLE))
            .map((entree) => entree.target)
            .sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1))
            .forEach((element, rang) => {
                observateur.unobserve(element)
                reveler(element, rang)
            })
    }, { threshold: [0, 0.05, 0.1, PART_VISIBLE], rootMargin: '0px 0px -5% 0px' })

    document.querySelectorAll('[data-cel-apparition]').forEach((element) => observateur.observe(element))

    document.addEventListener('focusin', (evenement) => {
        const element = evenement.target instanceof Element ? evenement.target.closest('[data-cel-apparition]:not(.cel-apparu)') : null

        if (element) {
            observateur.unobserve(element)
            element.classList.add('cel-immediat', 'cel-apparu')
        }
    })
}

// Fondu court d'un bloc qui vient d'apparaître (attribut hidden retiré) ; sans effet sans cel-anim.
export const fonduEntrant = (element) => {
    if (!element || !animationsPermises()) {
        return
    }

    element.classList.remove('cel-fondu-sortant', 'cel-fondu-entrant')
    void element.offsetWidth
    element.classList.add('cel-fondu-entrant')
    element.addEventListener('animationend', () => element.classList.remove('cel-fondu-entrant'), { once: true })
}

// Masque un bloc après un fondu court ; tout de suite sans cel-anim. Un fonduEntrant() pendant le fondu l'annule.
export const fonduSortant = (element) => {
    if (!element || element.hidden) {
        return
    }

    if (!animationsPermises()) {
        element.hidden = true

        return
    }

    element.classList.remove('cel-fondu-entrant')
    element.classList.add('cel-fondu-sortant')
    element.addEventListener('animationend', () => {
        if (element.classList.contains('cel-fondu-sortant')) {
            element.hidden = true
            element.classList.remove('cel-fondu-sortant')
        }
    }, { once: true })
}

// Rejoue un fondu léger sur un bloc dont le contenu change.
export const rafraichir = (element) => {
    if (!element || !animationsPermises()) {
        return
    }

    element.classList.remove('cel-rafraichi')
    void element.offsetWidth
    element.classList.add('cel-rafraichi')
    element.addEventListener('animationend', () => element.classList.remove('cel-rafraichi'), { once: true })
}

// À appeler une fois la page chargée : signale à l'amorce que le script tourne, puis lance les apparitions.
export const initMouvement = () => {
    const racine = document.documentElement

    if (!racine.classList.contains('cel-anim')) {
        return
    }

    racine.classList.add('cel-anim-prete')
    initApparitions()
}

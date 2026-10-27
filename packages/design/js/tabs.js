// Onglets (.cel-onglets, motif ARIA tablist). Sans script, les liens mènent aux panneaux affichés l'un sous l'autre.
// Avec, chaque lien devient un onglet : un seul panneau affiché, annoncé poliment ; flèches gauche et droite, Début et
// Fin ; l'onglet choisi est seul atteignable par la tabulation. L'ancre de l'adresse choisit l'onglet de départ.
//
// Balisage : <div class="cel-onglets" data-cel-onglets>
//   <ul class="cel-onglets__liste" aria-label="…"><li><a class="cel-onglets__onglet" href="#panneau-1">…</a></li>…</ul>
//   <div class="cel-onglets__panneaux"><section class="cel-onglets__panneau" id="panneau-1">…</section>…</div>
// </div>

const reduit = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const initOnglets = (racine = document) => {
    racine.querySelectorAll('[data-cel-onglets]').forEach((groupe) => {
        const liste = groupe.querySelector('.cel-onglets__liste')
        const conteneur = groupe.querySelector('.cel-onglets__panneaux')
        const panneaux = [...groupe.querySelectorAll('.cel-onglets__panneau')]
        const onglets = [...liste.querySelectorAll('a.cel-onglets__onglet')].map((lien) => {
            const cible = decodeURIComponent(lien.hash.slice(1))
            const onglet = document.createElement('button')
            onglet.type = 'button'
            onglet.className = lien.className
            onglet.id = `onglet-${cible}`
            onglet.setAttribute('role', 'tab')
            onglet.setAttribute('aria-controls', cible)
            onglet.replaceChildren(...lien.childNodes)
            lien.parentElement.setAttribute('role', 'presentation')
            lien.replaceWith(onglet)

            return onglet
        })

        const choisir = (rang, focus = false) => {
            onglets.forEach((onglet, i) => {
                onglet.setAttribute('aria-selected', String(i === rang))
                onglet.tabIndex = i === rang ? 0 : -1
            })
            panneaux.forEach((panneau, i) => {
                panneau.hidden = i !== rang
            })

            if (focus) {
                onglets[rang].focus()
                onglets[rang].scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: reduit() ? 'auto' : 'smooth' })
            }
        }

        liste.setAttribute('role', 'tablist')
        panneaux.forEach((panneau) => {
            panneau.setAttribute('role', 'tabpanel')
            panneau.setAttribute('aria-labelledby', `onglet-${panneau.id}`)
            panneau.tabIndex = 0
        })
        groupe.classList.add('cel-onglets--actif')

        onglets.forEach((onglet, rang) => {
            onglet.addEventListener('click', () => choisir(rang))
            onglet.addEventListener('keydown', (evenement) => {
                const dernier = onglets.length - 1
                const cible = { ArrowRight: rang === dernier ? 0 : rang + 1, ArrowLeft: rang === 0 ? dernier : rang - 1, Home: 0, End: dernier }[evenement.key]

                if (cible !== undefined) {
                    evenement.preventDefault()
                    choisir(cible, true)
                }
            })
        })

        const depuisAncre = panneaux.findIndex((panneau) => `#${panneau.id}` === window.location.hash)
        choisir(Math.max(depuisAncre, 0))
        // Après le premier affichage : seuls les changements d'onglet sont annoncés.
        conteneur?.setAttribute('aria-live', 'polite')
    })
}

// Sélecteur de thème (.cel-theme) : sans script, deux liens (le serveur pose le choix) ; avec, deux boutons
// aria-pressed qui changent de thème sans recharger la page. Le choix est gardé dans le stockage local (clé
// « cel-theme », lue par theme-boot.js) et, si l'option cookie est donnée, dans ce cookie pour un rendu par le serveur.
//
// Balisage : <div class="cel-theme" data-cel-theme> … <a data-cel-theme-option="clair"> … <a data-cel-theme-option="sombre">.

const CLE = 'cel-theme'
const THEMES = ['clair', 'sombre']

export const themeCourant = () => (document.documentElement.classList.contains('cel-sombre') ? 'sombre' : 'clair')

export const appliquerTheme = (theme, { cookie = null, jours = 365 } = {}) => {
    if (!THEMES.includes(theme)) {
        return
    }

    document.documentElement.classList.toggle('cel-sombre', theme === 'sombre')

    try {
        window.localStorage.setItem(CLE, theme)
    } catch (erreur) {
        // Stockage indisponible : le choix vaut pour la page en cours.
    }

    if (cookie) {
        const securise = window.location.protocol === 'https:' ? '; secure' : ''
        document.cookie = `${cookie}=${theme}; path=/; max-age=${jours * 86400}; samesite=lax${securise}`
    }

    document.querySelectorAll('[data-cel-theme-option]').forEach((bouton) => {
        if (bouton instanceof HTMLButtonElement) {
            bouton.setAttribute('aria-pressed', String(bouton.dataset.celThemeOption === theme))
        }
    })
}

export const initTheme = (options = {}) => {
    document.querySelectorAll('[data-cel-theme]').forEach((groupe) => {
        groupe.querySelectorAll('a[data-cel-theme-option], button[data-cel-theme-option]').forEach((option) => {
            const bouton = option instanceof HTMLButtonElement ? option : document.createElement('button')

            if (bouton !== option) {
                bouton.type = 'button'
                bouton.className = option.className
                bouton.dataset.celThemeOption = option.dataset.celThemeOption
                bouton.replaceChildren(...option.childNodes)
                option.replaceWith(bouton)
            }

            bouton.setAttribute('aria-pressed', String(bouton.dataset.celThemeOption === themeCourant()))
            bouton.addEventListener('click', () => appliquerTheme(bouton.dataset.celThemeOption, options))
        })
    })
}

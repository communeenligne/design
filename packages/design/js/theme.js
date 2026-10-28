// Theme switch (.cel-theme): without script, two links (the server stores the choice); with it, two aria-pressed
// buttons that change the theme without reloading the page. Two ways to keep the choice:
// - static site: local storage (key "cel-theme", read by theme-boot.js), the default;
// - page rendered by a server: the cookie option, read by the server, and storage: false so that nothing is written
//   in local storage (the cookie is then the only trace of the choice).
//
// initTheme({ cookie: 'cel_theme', storage: false })
//
// Markup: <div class="cel-theme" data-cel-theme> … <a data-cel-theme-option="light"> … <a data-cel-theme-option="dark">.

const KEY = 'cel-theme'
const THEMES = ['light', 'dark']

export const currentTheme = () => (document.documentElement.classList.contains('cel-dark') ? 'dark' : 'light')

export const applyTheme = (theme, { cookie = null, days = 365, storage = true } = {}) => {
    if (!THEMES.includes(theme)) {
        return
    }

    document.documentElement.classList.toggle('cel-dark', theme === 'dark')

    if (storage) {
        try {
            window.localStorage.setItem(KEY, theme)
        } catch (error) {
            // Storage unavailable: the choice holds for the current page.
        }
    }

    if (cookie) {
        const secure = window.location.protocol === 'https:' ? '; secure' : ''
        document.cookie = `${cookie}=${theme}; path=/; max-age=${days * 86400}; samesite=lax${secure}`
    }

    document.querySelectorAll('[data-cel-theme-option]').forEach((button) => {
        if (button instanceof HTMLButtonElement) {
            button.setAttribute('aria-pressed', String(button.dataset.celThemeOption === theme))
        }
    })
}

export const initTheme = (options = {}) => {
    document.querySelectorAll('[data-cel-theme]').forEach((group) => {
        group.querySelectorAll('a[data-cel-theme-option], button[data-cel-theme-option]').forEach((option) => {
            const button = option instanceof HTMLButtonElement ? option : document.createElement('button')

            if (button !== option) {
                button.type = 'button'
                button.className = option.className
                button.dataset.celThemeOption = option.dataset.celThemeOption
                button.replaceChildren(...option.childNodes)
                option.replaceWith(button)
            }

            button.setAttribute('aria-pressed', String(button.dataset.celThemeOption === currentTheme()))
            button.addEventListener('click', () => applyTheme(button.dataset.celThemeOption, options))
        })
    })
}

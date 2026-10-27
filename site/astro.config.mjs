import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import tailwindcss from '@tailwindcss/vite'

// Site statique, publié sur GitHub Pages (design.communeenligne.fr). Aucun style ni script en ligne : feuilles de style
// externes, scripts dans public/js. Aucune coloration syntaxique (elle écrirait des couleurs en attribut style).
export default defineConfig({
    site: 'https://design.communeenligne.fr',
    trailingSlash: 'always',
    build: { format: 'directory', inlineStylesheets: 'never' },
    markdown: { syntaxHighlight: false },
    integrations: [mdx()],
    vite: { plugins: [tailwindcss()], build: { assetsInlineLimit: 0 } },
    devToolbar: { enabled: false },
})

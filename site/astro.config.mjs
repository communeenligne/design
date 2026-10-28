import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import tailwindcss from '@tailwindcss/vite'

// Static site, published on GitHub Pages (design.communeenligne.fr). No inline style or script: external stylesheets,
// scripts in public/js. No syntax highlighting (it would write colors in style attributes).
export default defineConfig({
    site: 'https://design.communeenligne.fr',
    trailingSlash: 'always',
    build: { format: 'directory', inlineStylesheets: 'never' },
    markdown: { syntaxHighlight: false },
    integrations: [mdx()],
    vite: { plugins: [tailwindcss()], build: { assetsInlineLimit: 0 } },
    devToolbar: { enabled: false },
})

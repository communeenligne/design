// Index of the live search (Ctrl+K, ⌘K), served in development as in production: one entry per page and per subheading.
// Read in the sources (MDX pages, variables of the foundations, icons, changelog), never copied.

import GithubSlugger from 'github-slugger'
import icons from '@communeenligne/design/icons/icons.json'
import changelog from '../../../CHANGELOG.md?raw'
import { PAGES, SITE_NAME } from '../lib/navigation.js'
import { startingWith } from '../lib/tokens.js'

const sources = import.meta.glob('./**/*.mdx', { query: '?raw', import: 'default', eager: true })

// Keywords of the pages generated from the variables: the names of their variables and their name in the landing.
const names = (...prefixes) => startingWith(...prefixes).map((token) => `--${token.name} ${token.landing ?? ''}`)
const GENERATED = {
    '/foundations/colors/': names('cel-color-'),
    '/foundations/typography/': names('cel-font-', 'cel-text-', 'cel-leading-', 'cel-tracking-'),
    '/foundations/spacing/': names('cel-space-', 'cel-width-', 'cel-gutter'),
    '/foundations/grid/': names('cel-breakpoint-', 'cel-width-', 'cel-gutter'),
    '/foundations/radius-and-shadows/': names('cel-radius-', 'cel-shadow-'),
    '/foundations/motion/': [...names('cel-duration-', 'cel-ease-', 'cel-delay-'), 'data-cel-reveal', 'cel-motion', 'prefers-reduced-motion'],
    '/foundations/icons/': [...icons.map((icon) => icon.name), ...names('cel-icon-')],
    '/changelog/': [changelog],
}

const fileOf = (url) => (url === '/' ? './index.mdx' : `.${url.replace(/\/$/, '')}.mdx`)

// Readable text of an MDX source: without front matter, imports, tags or expressions.
const textOf = (source) => source
    .replace(/^---[\s\S]*?---/, ' ')
    .replace(/^import .*$/gm, ' ')
    .replace(/<[A-Z][\s\S]*?\/>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[`*_|#>]/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\s+/g, ' ')
    .trim()

export const GET = () => {
    const entries = []

    for (const page of PAGES) {
        const source = sources[fileOf(page.url)] ?? ''
        const classes = [...new Set(source.match(/cel-[a-z0-9_-]+/g) ?? [])]
        const section = page.section?.title ?? ''

        entries.push({
            url: page.url,
            title: page.title,
            section,
            summary: page.description ?? '',
            words: [textOf(source), ...classes, ...(GENERATED[page.url] ?? [])].join(' ').slice(0, 6000),
        })

        // One entry per subheading of the MDX pages, with the anchor Astro makes (github-slugger).
        const slugger = new GithubSlugger()
        for (const [, subheading] of source.matchAll(/^## (.+)$/gm)) {
            entries.push({ url: `${page.url}#${slugger.slug(subheading)}`, title: subheading, page: page.title, section, summary: '', words: '' })
        }
    }

    return new Response(JSON.stringify({ name: SITE_NAME, entries }), { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
}

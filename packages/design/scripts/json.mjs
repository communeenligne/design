// Generates tokens.json from the foundations: the main variables with their values resolved (no var()), for projects
// that need a value outside CSS (color of the browser bar, e-mails, a chart drawn by a script, a breakpoint in
// matchMedia), so that none of them copies a color. "node scripts/json.mjs --check" fails if the file is not up to date.
//
// Colors in both themes ({ light, dark }); breakpoints in px, as numbers; the rest as written in CSS.

import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { readTokens, resolve } from '../tools/tokens.mjs'

const TARGET = fileURLToPath(new URL('../tokens.json', import.meta.url))

// Key of the JSON → prefix of the variables (removed from the names).
const SECTIONS = [
    ['colors', 'cel-color-'],
    ['fonts', ['cel-font-body', 'cel-font-heading', 'cel-font-code'], 'cel-font-'],
    ['fontWeights', 'cel-font-weight-'],
    ['breakpoints', 'cel-breakpoint-'],
    ['spacing', 'cel-space-'],
    ['layout', ['cel-width-content', 'cel-width-narrow', 'cel-width-reading', 'cel-gutter', 'cel-gutter-phone'], 'cel-'],
    ['radius', 'cel-radius-'],
    ['borders', 'cel-border-'],
]

export const generate = () => {
    const { tokens } = readTokens()
    const result = {}

    for (const [key, selection, prefix = selection] of SECTIONS) {
        const chosen = Array.isArray(selection)
            ? tokens.filter((token) => selection.includes(token.name))
            : tokens.filter((token) => token.name.startsWith(selection))

        result[key] = Object.fromEntries(chosen.map((token) => {
            const name = token.name.slice(prefix.length)

            if (key === 'colors') {
                return [name, { light: resolve(tokens, token.name, 'light'), dark: resolve(tokens, token.name, 'dark') }]
            }

            const value = resolve(tokens, token.name)

            return [name, key === 'breakpoints' ? parseInt(value, 10) : value]
        }))
    }

    return `${JSON.stringify(result, null, 4)}\n`
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    const content = generate()

    if (process.argv.includes('--check')) {
        if (readFileSync(TARGET, 'utf8') !== content) {
            console.error('tokens.json is not up to date: run "npm run generate".')
            process.exit(1)
        }
        console.log('tokens.json is up to date.')
    } else {
        writeFileSync(TARGET, content)
        console.log('tokens.json generated.')
    }
}

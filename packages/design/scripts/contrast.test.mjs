// Contrasts of the design system, in light and dark, read in the foundations: 4.5:1 for text, 3:1 for the borders of
// fields and interface elements and for the focus. The role pairs (text, primary, action, states, focus), those of the
// landing test (LandingThemeTest) under the package names, and every rule of the components and patterns that sets
// both a text color and a background.
// Run: npm test (node --test).

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { contrast, isHex, readTokens, resolve } from '../tools/tokens.mjs'

const { tokens, unknownDark } = readTokens()
const colors = tokens.filter((token) => token.name.startsWith('cel-color-'))
const c = (name) => (name.startsWith('cel-') ? name : `cel-color-${name}`)

const pairs = []
const add = (texts, backgrounds, minimum, reason) => {
    for (const text of texts) {
        for (const background of backgrounds) {
            pairs.push({ text: c(text), background: c(background), minimum, reason })
        }
    }
}

// Roles.
add(['text-strong', 'text', 'text-muted', 'primary', 'primary-hover', 'error'], ['background', 'surface', 'background-muted'], 4.5, 'text on page backgrounds')
add(['primary', 'text-strong', 'text-muted'], ['surface-hover'], 4.5, 'neutral badge, hovered pagination, disabled button')
add(['on-strong'], ['action', 'action-hover'], 4.5, 'main button')
add(['surface'], ['primary'], 4.5, 'current page of the pagination, check mark')
add(['on-strong'], ['strong'], 4.5, 'strong surface')
add(['error-ink'], ['error-background'], 4.5, 'error summary, error badge')
add(['success-ink'], ['success-background'], 4.5, 'success badge')
add(['warning-ink'], ['warning-background'], 4.5, 'warning badge, warning banner')
add(['field-border', 'primary'], ['background', 'surface'], 3, 'borders of fields and boxes, checked box')
// Body text on page backgrounds.
add(
    ['text-strong', 'text', 'text-muted', 'text-2', 'text-3', 'text-muted-2', 'text-muted-3', 'text-muted-4', 'text-muted-5', 'primary', 'primary-hover', 'text-green', 'text-forest', 'text-ochre', 'error', 'mark-good-text'],
    ['background', 'surface', 'background-muted', 'surface-muted', 'surface-muted-2'],
    4.5,
    'text',
)
// Text on tints.
add(['ochre-title', 'ochre-ink', 'ochre-ink-2', 'warning-ink', 'text-strong', 'text', 'primary'], ['tint-ochre', 'tint-ochre-2', 'tint-ochre-3', 'tint-ochre-4', 'tint-ochre-5', 'warning-background'], 4.5, 'text')
add(['blue-title', 'blue-text', 'blue-ink', 'primary'], ['tint-blue', 'tint-blue-2', 'surface'], 4.5, 'text')
add(['green-title', 'green-text', 'success-ink', 'green-ink-2', 'green-ink-3'], ['tint-green', 'success-background', 'tint-green-3', 'surface'], 4.5, 'text')
// Strong and gold surfaces.
add(['on-strong', 'on-dark', 'on-strong-soft', 'on-strong-2', 'on-strong-gold', 'gold'], ['strong', 'strong-deep', 'strong-soft'], 4.5, 'text')
add(['on-strong'], ['action', 'action-hover', 'forest', 'green', 'mark-good'], 4.5, 'text')
add(['on-gold', 'on-gold-navy'], ['gold', 'ochre', 'gold-hover'], 4.5, 'text')
add(['primary', 'text-strong'], ['surface-hover', 'surface-current', 'chrome'], 4.5, 'text')
add(['on-forest'], ['forest'], 4.5, 'text')
add(['text-muted-5'], ['segmented-background'], 4.5, 'text')
add(['text'], ['tint-blue-2'], 4.5, 'text')
// Borders of fields and interface elements, icons that carry meaning.
add(['field-border', 'primary', 'ochre-icon', 'icon-soft', 'focus-line', 'action'], ['background', 'surface'], 3, 'interface')
add(['mark-mid'], ['mark-mid-background'], 3, 'interface')
add(['mark-bad'], ['mark-bad-background'], 3, 'interface')
add(['on-strong-line'], ['strong'], 3, 'interface (filter)')
// Visible focus: navy on light backgrounds, gold on strong surfaces.
add(['cel-focus-color'], ['background', 'surface', 'background-muted', 'surface-muted', 'tint-blue-2'], 3, 'focus')
add(['cel-focus-color-on-strong'], ['strong', 'strong-deep', 'strong-soft'], 3, 'focus')

// Every rule of the components and patterns that sets both a text color and an opaque background.
for (const folder of ['components', 'patterns']) {
    for (const file of readdirSync(new URL(`../${folder}/`, import.meta.url)).filter((name) => name !== 'index.css')) {
        const css = readFileSync(new URL(`../${folder}/${file}`, import.meta.url), 'utf8')

        for (const [, rule] of css.matchAll(/\{([^{}]*)\}/g)) {
            const text = rule.match(/(?<![-\w])color:\s*var\(--([a-z0-9-]+)\);/)
            const background = rule.match(/background:\s*var\(--([a-z0-9-]+)\);/)

            if (text && background && isHex(resolve(tokens, background[1]))) {
                pairs.push({ text: text[1], background: background[1], minimum: 4.5, reason: `rule of ${folder}/${file}` })
            }
        }
    }
}

test('each themed color has a dark value, refers to another color, or belongs to a group that is the same in both themes', () => {
    const missing = colors.filter((token) => !token.fixed && !token.redefined && !token.light.startsWith('var(')).map((token) => token.name)
    const fixedRedefined = colors.filter((token) => token.fixed && token.redefined).map((token) => token.name)

    assert.deepEqual(missing, [], 'without dark value')
    assert.deepEqual(fixedRedefined, [], 'declared the same but redefined in dark')
    assert.deepEqual(unknownDark, [], 'redefined in dark without a light value')
})

test('shadow colors are transparent in dark', () => {
    const visible = colors.filter((token) => token.name.startsWith('cel-color-shadow-') && token.dark !== 'transparent')

    assert.deepEqual(visible.map((token) => token.name), [])
})

// Known gaps, kept as they are in the landing (fidelity first). The component stays identified by its text (WCAG
// 1.4.11 then does not require the contrast of its outline); a fix is proposed for a later version.
const KNOWN_GAPS = {
    'dark: cel-color-action on cel-color-surface': 'filled button on a card in the dark theme (on the page: 3:1 reached)',
    'light: cel-color-on-strong-line on cel-color-strong': 'outline of the unselected filter on navy (.chip of the landing)',
    'dark: cel-color-on-strong-line on cel-color-strong': 'outline of the unselected filter on navy (.chip of the landing)',
}

for (const mode of ['light', 'dark']) {
    test(`contrasts of the ${mode} theme: 4.5:1 for text, 3:1 for interface and focus`, () => {
        const failures = []
        const gaps = []

        for (const { text, background, minimum, reason } of pairs) {
            const front = resolve(tokens, text, mode)
            const back = resolve(tokens, background, mode)

            assert.ok(isHex(front), `--${text} is not a #rrggbb color in ${mode} (${front})`)
            assert.ok(isHex(back), `--${background} is not a #rrggbb color in ${mode} (${back})`)

            const ratio = contrast(front, back)
            const key = `${mode}: ${text} on ${background}`

            if (ratio < minimum) {
                const line = `--${text} on --${background} = ${ratio.toFixed(2)} (${reason}, ${minimum}:1 expected)`
                ;(KNOWN_GAPS[key] ? gaps : failures).push(KNOWN_GAPS[key] ? `${line}: ${KNOWN_GAPS[key]}` : line)
            }
        }

        assert.deepEqual(failures, [])
        console.log(`  ${mode}: ${pairs.length} pairs checked, ${pairs.length - gaps.length} compliant`)
        gaps.forEach((gap) => console.log(`  known gap: ${gap}`))
    })
}

test('each known gap still exists (otherwise, remove it from the list)', () => {
    const present = Object.keys(KNOWN_GAPS).filter((key) => {
        const [mode, rest] = key.split(': ')
        const [text, background] = rest.split(' on ')
        const pair = pairs.find((p) => p.text === text && p.background === background)

        return pair && contrast(resolve(tokens, text, mode), resolve(tokens, background, mode)) < pair.minimum
    })

    assert.deepEqual(present, Object.keys(KNOWN_GAPS))
})

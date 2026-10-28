// Reads the variables of the foundations (foundations/*.css): groups, light and dark values, original name in the
// landing. Used by the package tests, the generators (tailwind.css) and the documentation site, so that none of them
// copies a value.

import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

// Foundation files, in the order of foundations/index.css.
export const FOUNDATIONS = ['colors', 'typography', 'spacing', 'breakpoints', 'radius', 'shadows', 'motion', 'focus', 'icons']

export const foundationPath = (name) => fileURLToPath(new URL(`../foundations/${name}.css`, import.meta.url))

const block = (css, selector) => {
    const start = css.indexOf(`\n${selector} {`)

    return start === -1 ? '' : css.slice(start, css.indexOf('\n}', start))
}

const parse = (text) => {
    const result = []
    let group = null

    for (const line of text.split('\n')) {
        const title = line.match(/^\s*\/\*\s*-{4}\s*(.+?)\s*-{4}\s*\*\/\s*$/)

        if (title) {
            group = title[1]
            continue
        }

        const token = line.match(/^\s*--([a-z0-9-]+):\s*(.+?);\s*(?:\/\*\s*(.*?)\s*\*\/)?\s*$/)

        if (token) {
            result.push({ name: token[1], value: token[2], note: token[3] ?? null, group })
        }
    }

    return result
}

// Colors of a group "same in both themes": never redefined in dark.
export const isFixedGroup = (group) => /same in both themes/.test(group ?? '')

// sources: { colors: '…css…', typography: '…' } to read other texts than the package files (the documentation site
// passes the files it imports). Only colors.css has a dark block.
export const readTokens = (sources = {}) => {
    const texts = FOUNDATIONS.map((file) => [file, sources[file] ?? readFileSync(foundationPath(file), 'utf8')])
    const light = texts.flatMap(([file, css]) => parse(block(css, ':root')).map((token) => ({ ...token, file })))
    const dark = new Map(texts.flatMap(([, css]) => parse(block(css, ':root.cel-dark'))).map((token) => [token.name, token.value]))
    const tokens = light.map((token) => ({
        name: token.name,
        file: token.file,
        group: token.group,
        light: token.value,
        dark: dark.get(token.name) ?? token.value,
        redefined: dark.has(token.name),
        fixed: isFixedGroup(token.group),
        landing: token.note?.startsWith('--') ? token.note : null,
        note: token.note?.startsWith('--') ? null : token.note,
    }))
    const groups = [...new Set(tokens.map((token) => token.group))].map((name) => ({
        name,
        tokens: tokens.filter((token) => token.group === name),
    }))

    return { tokens, groups, unknownDark: [...dark.keys()].filter((name) => !light.some((token) => token.name === name)) }
}

// Value of a token in a mode (light or dark), var() references resolved.
export const resolve = (tokens, name, mode = 'light') => {
    const index = new Map(tokens.map((token) => [token.name, token]))
    let value = index.get(name)?.[mode]

    for (let turn = 0; value && turn < 10 && value.includes('var(--'); turn++) {
        value = value.replace(/var\(--([a-z0-9-]+)\)/g, (_, other) => index.get(other)?.[mode] ?? `var(--${other})`)
    }

    return value
}

// WCAG 2 contrast between two #rrggbb colors.
export const luminance = (hex) => {
    const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4))

    return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

export const contrast = (a, b) => {
    const [lighter, darker] = [luminance(a), luminance(b)].sort((x, y) => y - x)

    return (lighter + 0.05) / (darker + 0.05)
}

export const isHex = (value) => /^#[0-9a-f]{6}$/i.test(value ?? '')

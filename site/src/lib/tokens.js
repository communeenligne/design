// Variables of the package for the pages of the site: read at build time in the foundations (foundations/*.css),
// never copied.
import { contrast, isHex, readTokens, resolve } from '@communeenligne/design/tools/tokens.mjs'
import colors from '@communeenligne/design/foundations/colors.css?raw'
import typography from '@communeenligne/design/foundations/typography.css?raw'
import spacing from '@communeenligne/design/foundations/spacing.css?raw'
import breakpoints from '@communeenligne/design/foundations/breakpoints.css?raw'
import radius from '@communeenligne/design/foundations/radius.css?raw'
import shadows from '@communeenligne/design/foundations/shadows.css?raw'
import motion from '@communeenligne/design/foundations/motion.css?raw'
import focus from '@communeenligne/design/foundations/focus.css?raw'
import icons from '@communeenligne/design/foundations/icons.css?raw'

export const { tokens, groups } = readTokens({ colors, typography, spacing, breakpoints, radius, shadows, motion, focus, icons })
export { contrast, resolve }
export { slug } from './navigation.js'

export const startingWith = (...prefixes) => tokens.filter((token) => prefixes.some((prefix) => token.name.startsWith(prefix)))

export const inGroup = (name) => tokens.filter((token) => token.group === name)

export const groupsOf = (prefix) => groups
    .map((group) => ({ ...group, tokens: group.tokens.filter((token) => token.name.startsWith(prefix)) }))
    .filter((group) => group.tokens.length > 0)

export const valueOf = (name, mode = 'light') => resolve(tokens, name, mode)

// CIE76 color difference (Lab): finds colors that are almost the same.
const lab = (hex) => {
    const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4))
    const f = (v) => (v > 0.008856 ? Math.cbrt(v) : 7.787 * v + 16 / 116)
    const [x, y, z] = [(0.4124 * r + 0.3576 * g + 0.1805 * b) / 0.95047, 0.2126 * r + 0.7152 * g + 0.0722 * b, (0.0193 * r + 0.1192 * g + 0.9505 * b) / 1.08883]

    return [116 * f(y) - 16, 500 * (f(x) - f(y)), 200 * (f(y) - f(z))]
}

export const distance = (a, b) => Math.hypot(...lab(a).map((v, i) => v - lab(b)[i]))

// Pairs of colors less than 2.5 apart in both themes (hardly distinguishable): candidates for merging.
export const nearDuplicates = (threshold = 2.5) => {
    const colorTokens = tokens.filter((token) => token.name.startsWith('cel-color-') && isHex(token.light) && isHex(token.dark))
    const pairs = []

    colorTokens.forEach((a, i) => colorTokens.slice(i + 1).forEach((b) => {
        const worst = Math.max(distance(a.light, b.light), distance(a.dark, b.dark))

        if (worst < threshold) {
            pairs.push({ a, b, distance: worst })
        }
    }))

    return pairs.sort((x, y) => x.distance - y.distance)
}

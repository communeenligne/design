// Copies to public/design/ the files of the package served as they are (icon sprite, logo, scripts): the site takes
// them from @communeenligne/design, like any project, never from a copy of its own.

import { cpSync, rmSync } from 'node:fs'
import { dirname } from 'node:path'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'

const pkg = dirname(createRequire(import.meta.url).resolve('@communeenligne/design/package.json'))
const target = fileURLToPath(new URL('../public/design/', import.meta.url))

rmSync(target, { recursive: true, force: true })

for (const folder of ['icons', 'illustrations', 'brand', 'js']) {
    cpSync(`${pkg}/${folder}`, `${target}${folder}`, { recursive: true })
}

console.log('Package files copied to public/design/.')

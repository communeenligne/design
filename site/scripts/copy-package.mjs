// Copie dans public/design/ les fichiers du paquet servis tels quels (planche d'icônes, logo, scripts) : le site les
// prend dans @communeenligne/design, comme n'importe quel projet, jamais dans une copie à lui.

import { cpSync, rmSync } from 'node:fs'
import { dirname } from 'node:path'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'

const paquet = dirname(createRequire(import.meta.url).resolve('@communeenligne/design/package.json'))
const cible = fileURLToPath(new URL('../public/design/', import.meta.url))

rmSync(cible, { recursive: true, force: true })

for (const dossier of ['icons', 'brand', 'js']) {
    cpSync(`${paquet}/${dossier}`, `${cible}${dossier}`, { recursive: true })
}

console.log('Fichiers du paquet copiés dans public/design/.')

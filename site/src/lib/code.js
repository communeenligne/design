// Mise en forme du code des exemples : retire l'indentation commune et les lignes vides du début et de la fin.
export const desindenter = (code = '') => {
    const lignes = code.replace(/^\s*\n/, '').replace(/\n\s*$/, '').split('\n')
    const marge = Math.min(...lignes.filter((ligne) => ligne.trim()).map((ligne) => ligne.match(/^ */)[0].length))

    return lignes.map((ligne) => ligne.slice(marge)).join('\n')
}

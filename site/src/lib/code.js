// Formatting of the code of the examples: removes the common indentation and the empty lines at the start and the end.
export const dedent = (code = '') => {
    const lines = code.replace(/^\s*\n/, '').replace(/\n\s*$/, '').split('\n')
    const margin = Math.min(...lines.filter((line) => line.trim()).map((line) => line.match(/^ */)[0].length))

    return lines.map((line) => line.slice(margin)).join('\n')
}

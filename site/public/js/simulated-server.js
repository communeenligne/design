// A search server simulated in the page, for the demonstrations of the endpoint adapter (endpointSearch) on this
// static site: passed as its request function, it answers GET …?q= like a server would. It reads the articles of the
// help center demonstration (articles.json), keeps those that contain every word of the query, and answers after
// 300 ms, so that the loading state shows. A query containing "panne" fails, to show the error state.

import { fold } from '/design/js/search.js'

export const simulatedServer = async (address, { signal } = {}) => {
    const query = address.searchParams.get('q') ?? ''
    const words = fold(query).split(/\s+/).filter(Boolean)
    const articles = await (await fetch('/patterns/help-center/articles.json', { signal })).json()

    await new Promise((resolve, reject) => {
        const timer = setTimeout(resolve, 300)
        signal?.addEventListener('abort', () => {
            clearTimeout(timer)
            reject(new DOMException('Aborted', 'AbortError'))
        })
    })

    if (words.includes('panne')) {
        return new Response('', { status: 503 })
    }

    const results = articles.filter((article) => words.every((word) => fold(`${article.title} ${article.section} ${article.excerpt}`).includes(word)))

    return new Response(JSON.stringify({ results: results.slice(0, 8) }), { headers: { 'Content-Type': 'application/json' } })
}

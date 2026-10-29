// Script checks that need no page: the functions of js/ that only work on text (search words, address words, filter
// tags) and the static index adapter of the search palette, on a fetch replaced for the test.

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { fold, indexSearch, queryFromPath } from '../js/search.js'
import { matchesFilter } from '../js/list-filter.js'

test('fold() lowercases and removes accents, each character in its place', () => {
    assert.equal(fold('Délibération'), 'deliberation')
    assert.equal(fold('Œuvre à l\'été').length, 'Œuvre à l\'été'.length)
})

test('queryFromPath() gives the words of the last part of an address', () => {
    assert.equal(queryFromPath('/aide/publier-deliberation/'), 'publier deliberation')
    assert.equal(queryFromPath('/aide/les-actes/publier_un%20arr%C3%AAt%C3%A9.html?x=1#y'), 'publier un arrêté')
    assert.equal(queryFromPath('/'), '')
    assert.equal(queryFromPath('/%E0%A4%A'), '%E0%A4%A')
})

test('matchesFilter() keeps the items tagged with the value, untagged items, and everything for ""', () => {
    assert.ok(matchesFilter('mayor office', 'mayor'))
    assert.ok(!matchesFilter('mayor office', 'councillors'))
    assert.ok(matchesFilter(undefined, 'mayor'))
    assert.ok(matchesFilter('office', ''))
    assert.ok(!matchesFilter('mayors', 'mayor'))
})

test('indexSearch() finds every word, ranks the title first, loads the index once', async () => {
    const entries = [
        { url: '/a/', title: 'Bouton', section: 'Composants', summary: 'L\'action principale.', words: 'bouton action' },
        { url: '/b/', title: 'Lien', section: 'Composants', summary: 'Mène à une page.', words: 'lien bouton secondaire' },
        { url: '/c/', title: 'Couleurs', section: 'Fondamentaux', page: 'Thème', words: 'couleur du bouton en sombre' },
    ]
    let loads = 0
    const original = globalThis.fetch
    globalThis.fetch = async () => {
        loads += 1
        return new Response(JSON.stringify({ entries }))
    }

    try {
        const search = indexSearch('/index.json')

        assert.deepEqual((await search('bouton')).map((result) => result.url), ['/a/', '/b/', '/c/'])
        assert.deepEqual((await search('bouton sombre')).map((result) => result.url), ['/c/'])
        assert.equal((await search('bouton sombre'))[0].section, 'Fondamentaux › Thème')
        assert.match((await search('sombre'))[0].excerpt, /sombre/)
        assert.deepEqual(await search('   '), [])
        assert.equal(loads, 1)
    } finally {
        globalThis.fetch = original
    }
})

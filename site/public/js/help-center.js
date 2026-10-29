// Script of the help center demonstration pages: the package scripts only. The search goes through the endpoint
// adapter of the package (endpointSearch), as a help center rendered by a server would; on this static site, the
// server is simulated (simulated-server.js). The answer to "Cette page vous a-t-elle aidé ?" is not sent anywhere.

import { initTheme } from '/design/js/theme.js'
import { initMenu } from '/design/js/menu.js'
import { initMotion } from '/design/js/motion.js'
import { initToc } from '/design/js/toc.js'
import { initFeedback } from '/design/js/feedback.js'
import { initVideo } from '/design/js/video.js'
import { initListFilter } from '/design/js/list-filter.js'
import { endpointSearch, initSearch } from '/design/js/search.js'
import { simulatedServer } from '/js/simulated-server.js'

initTheme()
initMenu()
initMotion()
initToc()
initVideo()
initListFilter()
initFeedback(document, { onAnswer: async () => {} })

initSearch(document.querySelector('#help-search'), {
    search: endpointSearch('/aide/recherche', { request: simulatedServer }),
    delay: 200,
})

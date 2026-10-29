// Articles of the help center demonstration, for its simulated search server (public/js/help-center.js): what a
// server would search in its database.
import { QUICK_LINKS, TOPICS } from '../../../lib/help-center.js'

export const GET = () => {
    const articles = TOPICS.flatMap((topic) => topic.articles.map((title) => ({
        url: '/patterns/help-center/article/',
        title,
        section: topic.title,
        excerpt: QUICK_LINKS.find((link) => link.title.toLowerCase() === title.toLowerCase())?.text ?? `Rubrique « ${topic.title} », pas à pas.`,
    })))

    return new Response(JSON.stringify(articles), { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
}

// Aperçus des composants pour la page d'index de la rubrique : un rendu réduit, fait des classes du paquet, posé dans un
// conteneur inert et masqué aux lecteurs d'écran (seul le titre de la tuile est un lien). fond : surface de l'aperçu.

const icone = (nom, classes = '') => `<svg class="cel-icone${classes ? ` ${classes}` : ''}" aria-hidden="true"><use href="/design/icons/sprite.svg#${nom}"></use></svg>`

export const APERCUS = {
    '/components/button/': { html: `<span class="cel-bouton">J'inscris ma commune</span>` },
    '/components/link/': { html: `<span class="cel-lien cel-lien--fleche">Voir le détail du tarif ${icone('arrow-right', 'cel-icone--16 cel-icone--appuyee')}</span>` },
    '/components/field/': { html: `<div class="cel-champ"><span>Nom de la commune</span><input type="text" value="Veckersviller"></div>` },
    '/components/badge/': { html: `<span class="cel-badge cel-badge--inclus">Inclus dans l'offre</span><span class="cel-badge cel-badge--bientot">Bientôt</span>` },
    '/components/pill/': { html: `<span class="cel-pastille">Informer <span class="cel-pastille__compteur">8</span></span><span class="cel-pastille"><span class="cel-puce"></span>En ligne</span>` },
    '/components/banner/': { plein: true, html: `<div class="cel-bandeau"><div class="cel-bandeau__interieur">${icone('help-video', 'cel-icone--20 cel-bandeau__icone')}<span>Tutoriels sur <span class="cel-bandeau__lien">l'aide en ligne</span></span></div></div>` },
    '/components/callout/': { html: `<div class="cel-encart">${icone('scale', 'cel-icone--22 cel-encart__icone')}<div class="cel-encart__corps"><span class="cel-encart__titre">Publication des actes</span><span>Obligatoire depuis 2022.</span></div></div>` },
    '/components/tabs/': { html: `<div class="cel-onglets__liste"><span class="cel-onglets__onglet" aria-selected="true">Actualités</span><span class="cel-onglets__onglet">Agenda</span><span class="cel-onglets__onglet">Documents</span></div>` },
    '/components/table/': { html: `<table class="cel-tableau"><thead><tr><th>Population</th><th>Par an</th></tr></thead><tbody><tr><td>Moins de 500</td><td>360 €</td></tr><tr><td>De 500 à 999</td><td>480 €</td></tr></tbody></table>` },
    '/components/breadcrumb/': { html: `<div class="cel-fil-ariane"><ol><li><span class="cel-lien">Accueil</span><span>›</span></li><li><span class="cel-lien">Fonctionnalités</span><span>›</span></li><li><span>Agenda</span></li></ol></div>` },
    '/components/theme-switch/': { fond: 'profond', html: `<div class="cel-theme"><span>Thème :</span><span class="cel-theme__options"><span class="cel-theme__option" aria-pressed="true">${icone('sun')}Clair</span><span class="cel-theme__option">${icone('moon')}Sombre</span></span></div>` },
    '/components/faq/': { html: `<div class="cel-questions"><div class="cel-questions__element"><span class="cel-questions__question">Faut-il lancer un marché public ?</span></div></div>` },
    '/components/segmented-control/': { html: `<div class="cel-segmente"><span class="cel-segmente__choix" aria-pressed="true">Par an</span><span class="cel-segmente__choix">Par mois</span><span class="cel-segmente__choix">Sur 4 ans</span></div>` },
    '/components/filter/': { fond: 'fort', html: `<span class="cel-filtre" aria-pressed="true">Tout</span><span class="cel-filtre">Informer</span><span class="cel-filtre">Démarches</span>` },
    '/components/card/': { html: `<div class="cel-carte"><span class="cel-carte__titre"><span class="cel-carte__lien">Publier les actes</span></span><span class="cel-carte__meta">Lecture : 4 minutes</span></div>` },
    '/components/checklist/': { html: `<ul class="cel-liste-coches"><li>${icone('check')}<span>Toutes les fonctionnalités</span></li><li>${icone('check')}<span>Hébergement en France</span></li></ul>` },
    '/components/steps/': { html: `<ol class="cel-etapes"><li class="cel-etapes__etape"><span class="cel-etapes__numero">1</span><span>Ouvrez Actualités</span></li><li class="cel-etapes__etape"><span class="cel-etapes__numero">2</span><span>Cliquez sur Publier</span></li></ol>` },
    '/components/skip-link/': { html: `<span class="cel-lien-evitement" data-cel-etat="focus">Aller au contenu</span>` },
}

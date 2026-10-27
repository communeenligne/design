// Balisage des modèles, repris de la landing (resources/views/landing/components) avec les seules classes du paquet.
// Une seule écriture pour les pages des modèles et pour la page de contrôle (/control/). Montants d'exemple : la landing
// lit les siens dans ses réglages commerciaux.

const icone = (nom, classes = '') => `<svg class="cel-icone${classes ? ` ${classes}` : ''}" aria-hidden="true"><use href="/design/icons/sprite.svg#${nom}"></use></svg>`

export const ENTETE = `<header class="cel-entete">
    <div class="cel-conteneur cel-entete__interieur">
        <a href="#" class="cel-entete__marque">
            <img class="cel-logo-clair" src="/design/brand/logo.svg" alt="Commune en ligne, accueil" width="173" height="36">
            <img class="cel-logo-sombre" src="/design/brand/logo-fond-sombre.svg" alt="Commune en ligne, accueil" width="173" height="36">
        </a>
        <nav class="cel-navigation" aria-label="Navigation principale">
            <ul class="cel-navigation__liens">
                <li><a href="#">Fonctionnalités</a></li>
                <li><a href="#" aria-current="page">Tarif</a></li>
                <li><a href="#">Guides</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
            <a href="#" class="cel-navigation__action">J'inscris ma commune</a>
        </nav>
    </div>
</header>`

export const SECTION = `<section class="cel-section cel-section--claire" aria-labelledby="titre-questions">
    <div class="cel-conteneur cel-conteneur--etroit cel-pile cel-pile--7">
        <h2 id="titre-questions" class="cel-titre-section cel-titre-section--marine" data-cel-apparition>Vos questions</h2>
        <div class="cel-questions">
            <details class="cel-questions__element" data-cel-apparition>
                <summary class="cel-questions__question">Faut-il lancer un marché public ?</summary>
                <p class="cel-questions__reponse">Non. Pour ce montant, bien en dessous des seuils, un devis signé ou un bon de commande suffit. Nous vous envoyons un devis au nom de la commune.</p>
            </details>
            <details class="cel-questions__element" data-cel-apparition>
                <summary class="cel-questions__question">Comment se passe la facturation ?</summary>
                <p class="cel-questions__reponse">Une facture par an, déposée sur Chorus Pro, réglée par mandat administratif comme vos autres fournisseurs. La première année, la mise en service figure sur la même facture.</p>
            </details>
            <details class="cel-questions__element" data-cel-apparition>
                <summary class="cel-questions__question">Pourquoi n'y a-t-il pas de TVA ?</summary>
                <p class="cel-questions__reponse">Notre entreprise ne facture pas la TVA (article 293 B du code général des impôts). Le prix affiché est donc exactement celui que paie la commune.</p>
            </details>
        </div>
    </div>
</section>`

const COMPRIS = [
    'Toutes les fonctionnalités, présentes et à venir',
    'Hébergement, sécurité, sauvegarde chaque jour',
    'Votre propre nom de domaine',
    '10 Go de stockage pour vos documents et photos',
    'Un compte pour le maire, le secrétariat et les élus',
    'Support par la personne qui conçoit le site',
]

export const TARIF = `<section id="tarif" class="cel-section" aria-labelledby="titre-tarif">
    <div class="cel-conteneur cel-pile cel-pile--10">
        <div class="cel-intro cel-intro--centree" data-cel-apparition>
            <h2 id="titre-tarif" class="cel-titre-section cel-titre-section--marine cel-titre-section--grand">Une seule offre, tout compris.</h2>
            <p class="cel-chapo">Les mêmes fonctionnalités pour toutes les communes. Seul le prix suit le nombre d'habitants.</p>
        </div>
        <div class="cel-bloc-tarif" data-cel-apparition="echelle">
            <div class="cel-bloc-tarif__principal">
                <p class="cel-bloc-tarif__prix">
                    <span class="cel-bloc-tarif__a-partir">À partir de</span>
                    <span class="cel-bloc-tarif__montant"><strong>360 €</strong> <span>par an</span></span>
                    <span class="cel-bloc-tarif__mensuel">soit 30 € par mois</span>
                </p>
                <ul class="cel-bloc-tarif__tranches" aria-label="Prix selon le nombre d'habitants">
                    <li><span>Moins de 500 habitants</span><strong>360 € par an</strong></li>
                    <li><span>De 500 à 999 habitants</span><strong>480 € par an</strong></li>
                    <li><span>De 1 000 à 3 499 habitants</span><strong>720 € par an</strong></li>
                    <li><span>3 500 habitants et plus</span><strong>Sur devis</strong></li>
                </ul>
                <p class="cel-bloc-tarif__mise-en-service">Mise en service de 240 € à 480 €, une seule fois, selon la taille de la commune.</p>
                <div class="cel-bloc-tarif__actions">
                    <a href="#" class="cel-bouton cel-bouton--ocre">J'inscris ma commune</a>
                    <a href="#" class="cel-bloc-tarif__details">Voir le détail du tarif</a>
                </div>
            </div>
            <div class="cel-bloc-tarif__cote">
                <h3 class="cel-bloc-tarif__titre">Tout est compris</h3>
                <ul class="cel-liste-coches">
${COMPRIS.map((element) => `                    <li>${icone('check')}<span>${element}</span></li>`).join('\n')}
                </ul>
                <p class="cel-bloc-tarif__conditions">
                    <span>Résiliable à chaque échéance</span>
                    <span>Facture sur Chorus Pro</span>
                    <span>TVA non applicable, art. 293 B du CGI</span>
                </p>
            </div>
        </div>
    </div>
</section>`

export const PIED = `<footer class="cel-pied">
    <div class="cel-conteneur">
        <div class="cel-pied__liens">
            <div class="cel-pied__identite">
                <a href="#" class="cel-pied__marque"><img src="/design/brand/logo-fond-sombre.svg" alt="Commune en ligne" width="154" height="32" loading="lazy"></a>
                <p>Le site internet des petites communes : simple à tenir pour la mairie, clair et accessible pour les habitants.</p>
            </div>
            <nav class="cel-pied__colonne" aria-labelledby="pied-fonctionnalites">
                <p class="cel-pied__titre" id="pied-fonctionnalites">Fonctionnalités</p>
                <ul>
                    <li><a href="#">Publication des actes</a></li>
                    <li><a href="#">Actualités</a></li>
                    <li><a href="#">Horaires et fermetures</a></li>
                    <li><a href="#">Collecte des déchets</a></li>
                    <li><a href="#">Signalements</a></li>
                    <li><a href="#" class="cel-pied__plus">Toutes les fonctionnalités</a></li>
                </ul>
            </nav>
            <nav class="cel-pied__colonne" aria-labelledby="pied-ressources">
                <p class="cel-pied__titre" id="pied-ressources">Ressources</p>
                <ul>
                    <li><a href="#">Guides</a></li>
                    <li><a href="#">Questions fréquentes</a></li>
                    <li><a href="#">Aide</a></li>
                </ul>
            </nav>
            <nav class="cel-pied__colonne" aria-labelledby="pied-projet">
                <p class="cel-pied__titre" id="pied-projet">Votre projet</p>
                <ul>
                    <li><a href="#">Tarif</a></li>
                    <li><a href="#">Contact</a></li>
                    <li><a href="#">J'inscris ma commune</a></li>
                </ul>
            </nav>
        </div>
        <div class="cel-pied__bas">
            <div class="cel-pied__meta">
                <p>© 2026 · <span class="cel-pied__mot-symbole"><strong>commune</strong>enligne</span></p>
                <nav class="cel-pied__legal" aria-labelledby="pied-legal">
                    <p class="cel-masque" id="pied-legal">Liens légaux</p>
                    <ul>
                        <li><a href="#">Mentions légales</a></li>
                        <li><a href="#">Conditions générales</a></li>
                        <li><a href="#">Confidentialité</a></li>
                    </ul>
                </nav>
            </div>
            <div class="cel-theme" role="group" aria-labelledby="pied-theme-modele">
                <span id="pied-theme-modele">Thème :</span>
                <span class="cel-theme__options">
                    <a href="#" class="cel-theme__option" aria-current="true">${icone('sun')}Clair</a>
                    <a href="#" class="cel-theme__option">${icone('moon')}Sombre</a>
                </span>
            </div>
        </div>
    </div>
</footer>`

export const ENTETE_PAGE = `<div class="cel-entete-page">
    <div class="cel-conteneur cel-entete-page__interieur">
        <nav class="cel-fil-ariane" aria-label="Fil d'Ariane">
            <ol>
                <li><a href="#">Accueil</a><span aria-hidden="true">›</span></li>
                <li><a href="#">Fonctionnalités</a><span aria-hidden="true">›</span></li>
                <li><span aria-current="page">Agenda</span></li>
            </ol>
        </nav>
        <div class="cel-fonctionnalite">
            <div class="cel-fonctionnalite__texte">
                <span class="cel-badge cel-badge--inclus cel-fonctionnalite__badge">Inclus dans l'offre</span>
                <h1 class="cel-entete-page__titre" data-cel-apparition="titre">Un agenda des événements de la commune</h1>
                <p class="cel-entete-page__chapo">Fêtes, réunions publiques, ramassages : la mairie ajoute un événement en deux minutes, il s'affiche sur l'accueil du site.</p>
                <span class="cel-fonctionnalite__duree">${icone('clock', 'cel-icone--18')}2 minutes pour ajouter un événement</span>
                <div class="cel-fonctionnalite__actions">
                    <a href="#" class="cel-bouton cel-bouton--ocre">J'inscris ma commune</a>
                    <a href="#" class="cel-bouton cel-bouton--secondaire">Voir le tarif</a>
                </div>
            </div>
            <figure class="cel-fonctionnalite__figure">
                <img src="/design/brand/icone.svg" alt="" width="64" height="64">
            </figure>
        </div>
    </div>
</div>
<aside class="cel-bandeau" aria-label="Aide">
    <div class="cel-conteneur cel-bandeau__interieur">
        ${icone('help-video', 'cel-icone--22 cel-bandeau__icone')}
        <p>Tutoriels et vidéos de prise en main : <a href="#" class="cel-bandeau__lien">aide.communeenligne.fr</a></p>
    </div>
</aside>`

export const FIN_DE_PAGE = `<section class="cel-section cel-section--forte" aria-labelledby="titre-fin">
    <div class="cel-conteneur cel-fin-de-page">
        <div class="cel-fin-de-page__texte">
            <h2 id="titre-fin" class="cel-titre-section">Une idée pour votre commune ?</h2>
            <p class="cel-chapo cel-chapo--sur-fort">Les prochaines fonctionnalités se choisissent avec les mairies qui utilisent le site. Dites-nous ce qui vous servirait.</p>
        </div>
        <div class="cel-fin-de-page__actions">
            <a href="#" class="cel-bouton cel-bouton--ocre">J'inscris ma commune</a>
            <a href="#" class="cel-bouton cel-bouton--sur-fort">Nous écrire</a>
        </div>
    </div>
</section>`

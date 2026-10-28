// Markup of the patterns, taken from the landing (resources/views/landing/components) with the classes of the package
// only. Written once for the pattern pages and for the control page (/control/). Example amounts: the landing reads its
// own in its commercial settings.

const icon = (name, classes = '') => `<svg class="cel-icon${classes ? ` ${classes}` : ''}" aria-hidden="true"><use href="/design/icons/sprite.svg#${name}"></use></svg>`

const LINKS = [['Fonctionnalités'], ['Tarif', true], ['Guides'], ['Contact']]

export const HEADER = `<header class="cel-header">
    <div class="cel-container cel-header__inner">
        <a href="#" class="cel-header__brand">
            <img class="cel-logo-light" src="/design/brand/logo.svg" alt="Commune en ligne, accueil" width="173" height="36">
            <img class="cel-logo-dark" src="/design/brand/logo-on-dark.svg" alt="Commune en ligne, accueil" width="173" height="36">
        </a>
        <nav class="cel-nav cel-hide-below-tablet" aria-label="Navigation principale">
            <ul class="cel-nav__links">
${LINKS.map(([label, current]) => `                <li><a href="#"${current ? ' aria-current="page"' : ''}>${label}</a></li>`).join('\n')}
            </ul>
            <a href="#" class="cel-nav__action">J'inscris ma commune</a>
        </nav>
        <div class="cel-menu" data-cel-menu>
            <button type="button" class="cel-menu__toggle" aria-expanded="false" aria-controls="landing-menu" aria-label="Ouvrir le menu">${icon('bars-3', 'cel-icon--20 cel-icon--bold')}<span aria-hidden="true">Menu</span></button>
            <div class="cel-menu__panel" id="landing-menu" aria-labelledby="landing-menu-title">
                <div class="cel-menu__top">
                    <p class="cel-menu__title" id="landing-menu-title">Menu</p>
                    <button type="button" class="cel-menu__close">${icon('x-mark', 'cel-icon--20 cel-icon--bold')}Fermer le menu</button>
                </div>
                <nav aria-label="Navigation principale">
                    <ul class="cel-menu__list">
${LINKS.map(([label, current]) => `                        <li><a class="cel-menu__link" href="#"${current ? ' aria-current="page"' : ''}>${label}</a></li>`).join('\n')}
                    </ul>
                </nav>
                <div class="cel-menu__actions"><a href="#" class="cel-button cel-button--accent">J'inscris ma commune</a></div>
            </div>
        </div>
    </div>
</header>`

export const SECTION = `<section class="cel-section cel-section--muted" aria-labelledby="faq-title">
    <div class="cel-container cel-container--narrow cel-stack cel-stack--7">
        <h2 id="faq-title" class="cel-section-title cel-section-title--primary" data-cel-reveal>Vos questions</h2>
        <div class="cel-faq">
            <details class="cel-faq__item" data-cel-reveal>
                <summary class="cel-faq__question">Faut-il lancer un marché public ?</summary>
                <p class="cel-faq__answer">Non. Pour ce montant, bien en dessous des seuils, un devis signé ou un bon de commande suffit. Nous vous envoyons un devis au nom de la commune.</p>
            </details>
            <details class="cel-faq__item" data-cel-reveal>
                <summary class="cel-faq__question">Comment se passe la facturation ?</summary>
                <p class="cel-faq__answer">Une facture par an, déposée sur Chorus Pro, réglée par mandat administratif comme vos autres fournisseurs. La première année, la mise en service figure sur la même facture.</p>
            </details>
            <details class="cel-faq__item" data-cel-reveal>
                <summary class="cel-faq__question">Pourquoi n'y a-t-il pas de TVA ?</summary>
                <p class="cel-faq__answer">Notre entreprise ne facture pas la TVA (article 293 B du code général des impôts). Le prix affiché est donc exactement celui que paie la commune.</p>
            </details>
        </div>
    </div>
</section>`

const INCLUDED = [
    'Toutes les fonctionnalités, présentes et à venir',
    'Hébergement, sécurité, sauvegarde chaque jour',
    'Votre propre nom de domaine',
    '10 Go de stockage pour vos documents et photos',
    'Un compte pour le maire, le secrétariat et les élus',
    'Support par la personne qui conçoit le site',
]

export const PRICING = `<section id="tarif" class="cel-section" aria-labelledby="pricing-title">
    <div class="cel-container cel-stack cel-stack--10">
        <div class="cel-intro cel-intro--centered" data-cel-reveal>
            <h2 id="pricing-title" class="cel-section-title cel-section-title--primary cel-section-title--large">Une seule offre, tout compris.</h2>
            <p class="cel-lead">Les mêmes fonctionnalités pour toutes les communes. Seul le prix suit le nombre d'habitants.</p>
        </div>
        <div class="cel-pricing" data-cel-reveal="scale">
            <div class="cel-pricing__main">
                <p class="cel-pricing__price">
                    <span class="cel-pricing__from">À partir de</span>
                    <span class="cel-pricing__amount"><strong>360 €</strong> <span>par an</span></span>
                    <span class="cel-pricing__monthly">soit 30 € par mois</span>
                </p>
                <ul class="cel-pricing__tiers" aria-label="Prix selon le nombre d'habitants">
                    <li><span>Moins de 500 habitants</span><strong>360 € par an</strong></li>
                    <li><span>De 500 à 999 habitants</span><strong>480 € par an</strong></li>
                    <li><span>De 1 000 à 3 499 habitants</span><strong>720 € par an</strong></li>
                    <li><span>3 500 habitants et plus</span><strong>Sur devis</strong></li>
                </ul>
                <p class="cel-pricing__setup">Mise en service de 240 € à 480 €, une seule fois, selon la taille de la commune.</p>
                <div class="cel-pricing__actions">
                    <a href="#" class="cel-button cel-button--accent">J'inscris ma commune</a>
                    <a href="#" class="cel-pricing__details">Voir le détail du tarif</a>
                </div>
            </div>
            <div class="cel-pricing__side">
                <h3 class="cel-pricing__title">Tout est compris</h3>
                <ul class="cel-checklist">
${INCLUDED.map((item) => `                    <li>${icon('check')}<span>${item}</span></li>`).join('\n')}
                </ul>
                <p class="cel-pricing__terms">
                    <span>Résiliable à chaque échéance</span>
                    <span>Facture sur Chorus Pro</span>
                    <span>TVA non applicable, art. 293 B du CGI</span>
                </p>
            </div>
        </div>
    </div>
</section>`

export const FOOTER = `<footer class="cel-footer">
    <div class="cel-container">
        <div class="cel-footer__links">
            <div class="cel-footer__identity">
                <a href="#" class="cel-footer__brand"><img src="/design/brand/logo-on-dark.svg" alt="Commune en ligne" width="154" height="32" loading="lazy"></a>
                <p>Le site internet des petites communes : simple à tenir pour la mairie, clair et accessible pour les habitants.</p>
            </div>
            <nav class="cel-footer__column" aria-labelledby="footer-features">
                <p class="cel-footer__title" id="footer-features">Fonctionnalités</p>
                <ul>
                    <li><a href="#">Publication des actes</a></li>
                    <li><a href="#">Actualités</a></li>
                    <li><a href="#">Horaires et fermetures</a></li>
                    <li><a href="#">Collecte des déchets</a></li>
                    <li><a href="#">Signalements</a></li>
                    <li><a href="#" class="cel-footer__more">Toutes les fonctionnalités</a></li>
                </ul>
            </nav>
            <nav class="cel-footer__column" aria-labelledby="footer-resources">
                <p class="cel-footer__title" id="footer-resources">Ressources</p>
                <ul>
                    <li><a href="#">Guides</a></li>
                    <li><a href="#">Questions fréquentes</a></li>
                    <li><a href="#">Aide</a></li>
                </ul>
            </nav>
            <nav class="cel-footer__column" aria-labelledby="footer-project">
                <p class="cel-footer__title" id="footer-project">Votre projet</p>
                <ul>
                    <li><a href="#">Tarif</a></li>
                    <li><a href="#">Contact</a></li>
                    <li><a href="#">J'inscris ma commune</a></li>
                </ul>
            </nav>
        </div>
        <div class="cel-footer__bottom">
            <div class="cel-footer__meta">
                <p>© 2026 · <span class="cel-footer__wordmark"><strong>commune</strong>enligne</span></p>
                <nav class="cel-footer__legal" aria-labelledby="footer-legal">
                    <p class="cel-visually-hidden" id="footer-legal">Liens légaux</p>
                    <ul>
                        <li><a href="#">Mentions légales</a></li>
                        <li><a href="#">Conditions générales</a></li>
                        <li><a href="#">Confidentialité</a></li>
                    </ul>
                </nav>
            </div>
            <div class="cel-theme" role="group" aria-labelledby="footer-theme-pattern">
                <span id="footer-theme-pattern">Thème :</span>
                <span class="cel-theme__options">
                    <a href="#" class="cel-theme__option" aria-current="true">${icon('sun')}Clair</a>
                    <a href="#" class="cel-theme__option">${icon('moon')}Sombre</a>
                </span>
            </div>
        </div>
    </div>
</footer>`

export const FEATURE_HERO = `<div class="cel-page-header">
    <div class="cel-container cel-page-header__inner">
        <nav class="cel-breadcrumb" aria-label="Fil d'Ariane">
            <ol>
                <li><a href="#">Accueil</a><span aria-hidden="true">›</span></li>
                <li><a href="#">Fonctionnalités</a><span aria-hidden="true">›</span></li>
                <li><span aria-current="page">Agenda</span></li>
            </ol>
        </nav>
        <div class="cel-feature-hero">
            <div class="cel-feature-hero__text">
                <span class="cel-badge cel-badge--success cel-feature-hero__badge">Inclus dans l'offre</span>
                <h1 class="cel-page-header__title" data-cel-reveal="title">Un agenda des événements de la commune</h1>
                <p class="cel-page-header__lead">Fêtes, réunions publiques, ramassages : la mairie ajoute un événement en deux minutes, il s'affiche sur l'accueil du site.</p>
                <span class="cel-feature-hero__duration">${icon('clock', 'cel-icon--18')}2 minutes pour ajouter un événement</span>
                <div class="cel-feature-hero__actions">
                    <a href="#" class="cel-button cel-button--accent">J'inscris ma commune</a>
                    <a href="#" class="cel-button cel-button--secondary">Voir le tarif</a>
                </div>
            </div>
            <figure class="cel-feature-hero__figure">
                <img src="/design/brand/icon.svg" alt="" width="64" height="64">
            </figure>
        </div>
    </div>
</div>
<aside class="cel-banner" aria-label="Aide">
    <div class="cel-container cel-banner__inner">
        ${icon('help-video', 'cel-icon--22 cel-banner__icon')}
        <p>Tutoriels et vidéos de prise en main : <a href="#" class="cel-banner__link">aide.communeenligne.fr</a></p>
    </div>
</aside>`

export const PAGE_END = `<section class="cel-section cel-section--strong" aria-labelledby="page-end-title">
    <div class="cel-container cel-page-end">
        <div class="cel-page-end__text">
            <h2 id="page-end-title" class="cel-section-title">Une idée pour votre commune ?</h2>
            <p class="cel-lead cel-lead--on-strong">Les prochaines fonctionnalités se choisissent avec les mairies qui utilisent le site. Dites-nous ce qui vous servirait.</p>
        </div>
        <div class="cel-page-end__actions">
            <a href="#" class="cel-button cel-button--accent">J'inscris ma commune</a>
            <a href="#" class="cel-button cel-button--on-strong">Nous écrire</a>
        </div>
    </div>
</section>`

export const PAGE_HEADER = `<div class="cel-page-header">
    <div class="cel-container cel-page-header__inner">
        <nav class="cel-breadcrumb" aria-label="Fil d'Ariane">
            <ol>
                <li><a href="#">Accueil</a><span aria-hidden="true">›</span></li>
                <li><span aria-current="page">Guides</span></li>
            </ol>
        </nav>
        <h1 class="cel-page-header__title" data-cel-reveal="title">Guides pour les mairies</h1>
        <p class="cel-page-header__lead">Des réponses courtes aux questions des secrétaires de mairie : publier un acte, annoncer une fermeture, ajouter un événement.</p>
    </div>
</div>`

// Amorce des animations : à charger dans <head>, sans defer ni async, avant toute feuille de style
// (<script src=".../motion-boot.js"></script>). Pose la classe cel-anim sur <html> avant le premier affichage,
// seulement si le navigateur sait animer et que les animations ne sont pas réduites ; si initMouvement() ne s'est pas
// exécutée dans les 3 secondes, la retire : tout reste visible. Fichier externe : aucun script en ligne à autoriser.
;(function () {
    var racine = document.documentElement
    if (!('IntersectionObserver' in window) || !window.matchMedia || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return
    }
    racine.classList.add('cel-anim')
    setTimeout(function () {
        if (!racine.classList.contains('cel-anim-prete')) {
            racine.classList.remove('cel-anim')
        }
    }, 3000)
})()

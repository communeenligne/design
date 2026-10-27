// Amorce du thème : à charger dans <head>, sans defer ni async (<script src=".../theme-boot.js"></script>). Pose la
// classe cel-sombre sur <html> avant le premier affichage si le visiteur a choisi le thème sombre (stockage local,
// clé « cel-theme »). Le thème clair reste celui par défaut : la préférence du système n'est jamais lue. Un site rendu
// par un serveur peut poser la classe lui-même (cookie) et se passer de ce fichier.
;(function () {
    try {
        if (window.localStorage.getItem('cel-theme') === 'sombre') {
            document.documentElement.classList.add('cel-sombre')
        }
    } catch (erreur) {
        // Stockage indisponible (navigation privée stricte) : thème clair.
    }
})()

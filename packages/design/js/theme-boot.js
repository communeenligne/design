// Theme boot: load in <head>, without defer or async (<script src=".../theme-boot.js"></script>). Sets the cel-dark
// class on <html> before the first paint if the visitor chose the dark theme (local storage, key "cel-theme", value
// "dark"). The light theme stays the default one: the system preference is never read. A site rendered by a server
// can set the class itself (cookie) and do without this file.
;(function () {
    try {
        if (window.localStorage.getItem('cel-theme') === 'dark') {
            document.documentElement.classList.add('cel-dark')
        }
    } catch (error) {
        // Storage unavailable (strict private browsing): light theme.
    }
})()

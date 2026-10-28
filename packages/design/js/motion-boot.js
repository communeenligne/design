// Motion boot: load in <head>, without defer or async, before any stylesheet
// (<script src=".../motion-boot.js"></script>). Sets the cel-motion class on <html> before the first paint, only if
// the browser can animate and motion is not reduced; if initMotion() has not run within 3 seconds, removes it:
// everything stays visible. External file: no inline script to allow.
;(function () {
    var root = document.documentElement
    if (!('IntersectionObserver' in window) || !window.matchMedia || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return
    }
    root.classList.add('cel-motion')
    setTimeout(function () {
        if (!root.classList.contains('cel-motion-ready')) {
            root.classList.remove('cel-motion')
        }
    }, 3000)
})()

// Presentation video (.cel-video): the native player of the browser, captions in <track>, never autoplay. Without
// script, the player and its controls. With it, the controls wait behind a preview: the poster, a large play button
// whose accessible name gives the duration ("Lire la vidéo de présentation (2 minutes, sous-titrée)"), the duration.
// The button starts the video, gives the player its controls and the focus.
//
// Markup: <figure class="cel-video" data-cel-video>
//   <div class="cel-video__frame">
//     <video class="cel-video__player" controls preload="none" poster="…"><source …><track kind="captions" …></video>
//     <button type="button" class="cel-video__play" aria-label="Lire la vidéo de présentation (2 minutes, sous-titrée)" hidden data-cel-video-play>…</button>
//     <span class="cel-video__duration" aria-hidden="true" hidden data-cel-video-duration>2:00</span>
//   </div>
//   <figcaption class="cel-video__caption">…</figcaption>
// </figure>

export const initVideo = (root = document) => {
    root.querySelectorAll('[data-cel-video]').forEach((figure) => {
        const video = figure.querySelector('video')
        const play = figure.querySelector('[data-cel-video-play]')
        const duration = figure.querySelector('[data-cel-video-duration]')

        if (!video || !play || figure.classList.contains('cel-video--enhanced')) {
            return
        }

        figure.classList.add('cel-video--enhanced')
        video.controls = false
        video.tabIndex = -1
        play.hidden = false

        if (duration) {
            duration.hidden = false
        }

        play.addEventListener('click', () => {
            video.controls = true
            video.removeAttribute('tabindex')
            play.hidden = true

            if (duration) {
                duration.hidden = true
            }

            video.focus()
            video.play()?.catch(() => {})
        })
    })
}

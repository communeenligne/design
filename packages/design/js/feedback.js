// Feedback (.cel-feedback): "Cette page vous a-t-elle aidé ?", a question and two buttons. Without script, a form that
// the server reads: the buttons submit the answer (name and value). With it, the answer is sent without leaving the
// page (onAnswer option; by default, the form is posted with fetch to its action), the buttons are hidden and the
// message of the answer appears in the live region (role="status"), which then takes the focus: the button that had it
// is gone. The answer is thanked even if sending fails: it is a nicety, never a blocking step.
//
// Markup: <form class="cel-feedback" action="/aide/avis" method="post" data-cel-feedback>
//   <p class="cel-feedback__question" id="feedback-question">Cette page vous a-t-elle aidé ?</p>
//   <div class="cel-feedback__answers" role="group" aria-labelledby="feedback-question" data-cel-feedback-answers>
//     <button type="submit" class="cel-feedback__answer" name="helpful" value="yes">Oui</button>
//     <button type="submit" class="cel-feedback__answer" name="helpful" value="no">Non</button>
//   </div>
//   <div class="cel-feedback__result" role="status" tabindex="-1" data-cel-feedback-result>
//     <p hidden data-cel-feedback-message="yes">Merci pour votre réponse.</p>
//     <p hidden data-cel-feedback-message="no">Merci. <a href="…">Écrire à l'assistance</a></p>
//   </div>
// </form>
//
// initFeedback(document, { onAnswer: async (value, form) => {} })

const post = async (value, form) => {
    if (!form.getAttribute('action')) {
        return
    }

    const data = new FormData(form)
    data.set('helpful', value)

    await fetch(form.action, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
}

export const initFeedback = (root = document, { onAnswer = post } = {}) => {
    const forms = root instanceof Element && root.matches('[data-cel-feedback]') ? [root] : [...root.querySelectorAll('[data-cel-feedback]')]

    forms.forEach((form) => {
        const answers = form.querySelector('[data-cel-feedback-answers]')
        const result = form.querySelector('[data-cel-feedback-result]')

        if (!answers || !result || form.classList.contains('cel-feedback--enhanced')) {
            return
        }

        form.classList.add('cel-feedback--enhanced')
        form.addEventListener('submit', async (event) => {
            event.preventDefault()

            const value = event.submitter?.value ?? ''

            answers.hidden = true
            result.querySelectorAll('[data-cel-feedback-message]').forEach((message) => {
                message.hidden = message.dataset.celFeedbackMessage !== value
            })
            result.focus()

            try {
                await onAnswer(value, form)
            } catch (error) {
                // Not sent: the reader has been thanked all the same.
            }
        })
    })
}

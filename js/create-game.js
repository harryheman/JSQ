const createGame = array => {
    if (document.querySelector('.game-box') !== null) {
        document.querySelector('.game-box').remove()
    }

    const gameBox = document.createElement('div')
    gameBox.className = 'game-box'
    document.querySelector('details').append(gameBox)

    const score = document.createElement('output')
    gameBox.append(score)

    const progress = document.createElement('output')
    gameBox.append(progress)

    const questionBox = document.createElement('div')
    gameBox.append(questionBox)

    let rightAnswers = 0
    let wrongAnswers = 0
    let i = 0

    updateScoreAndProgress()

    function updateScoreAndProgress() {
        score.innerHTML = `<span class="right">${rightAnswers}</span> - <span class="wrong">${wrongAnswers}</span>`

        progress.innerHTML = `${i + 1} / ${array.length}`
    }

    createQuestion()

    function createQuestion() {
        if (i === array.length) {
            showResult()
            return
        }

        const {
            question,
            rightAnswer,
            explanation
        } = array[i]

        const answers = array[i].answers
            .split('\n')
            .slice(1, -1)
            .map(i => i.trim())

        const template = `
            <code>${question}</code>
    
            <ul>
                ${answers.reduce((html, i) => html += `<li class="answer">${i}</li>`, '')}
            </ul>
    
            <button>Ответить</button>
    
            <details>
                <summary>Показать правильный ответ</summary>
                <article>
                    <h3>Правильный ответ: ${rightAnswer}</h3>
                    <p>${explanation}</p>
                </article>
            </details>
        `

        questionBox.innerHTML = template

        questionBox.querySelector('.answer').classList.add('checked')

        questionBox.addEventListener('click', e => {
            if (e.target.className === 'answer') {
                questionBox.querySelectorAll('.answer')
                    .forEach(a => a.classList.remove('checked'))
                
                e.target.classList.add('checked')
            } else return
        })

        const button = questionBox.querySelector('button')

        button.addEventListener('click', () => {
            const answers = Array.from(questionBox.querySelectorAll('.answer'))

            const userAnswerEl = answers.find(a => a.classList.contains('checked'))
            const rightAnswerEl = answers.find(a => a.textContent[0] === rightAnswer)

            const userAnswer = userAnswerEl.textContent.substr(0, 1)

            checkAnswer(userAnswerEl, rightAnswerEl, userAnswer, rightAnswer, button)
        }, {
            once: true
        })
    }

    function checkAnswer(userAnswerEl, rightAnswerEl, userAnswer, rightAnswer, button) {
        let isRight = true

        if (userAnswer === rightAnswer) {
            rightAnswers++
        } else {
            wrongAnswers++
            isRight = false
        }

        if (isRight) {
            userAnswerEl.classList.add('right')
        } else {
            userAnswerEl.classList.add('wrong')
            rightAnswerEl.click()
            rightAnswerEl.classList.add('right')
            questionBox.querySelector('details').open = true
        }

        button.textContent = 'Дальше'

        button.addEventListener('click', () => {
            i++
            updateScoreAndProgress()
            createQuestion()
        }, {
            once: true
        })
    }

    function showResult() {
        const per = (rightAnswers / array.length * 100).toFixed()

        let result

        if (per >= 80) {
            result = `Отличный результат! Вы прекрасно знаете JavaScript.`
        } else if (per > 50) {
            result = `Неплохой результат, но есть к чему стремиться. Дерзайте!`
        } else {
            result = `Вероятно, вы только начали изучать JavaScript. Удачи!`
        }

        gameBox.innerHTML = `
            <h3>Ваш результат</h3>
            <div>
                <p>Правильных ответов: <span class="right">${rightAnswers}</span></p>
                <p>Неправильных ответов: <span class="wrong">${wrongAnswers}</span></p>
                <p>Процент правильных ответов: ${per}</p>
                <p>${result}</p>
            </div>
        `
    }
}

export default createGame

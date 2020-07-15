// импортируем массив объектов - исходники
import assets from './assets.js'

// IIFE
;((D, B) => {
    // заголовок - вопрос
    const title = D.createElement('h1')
    B.append(title)

    // рейтинг: количество правильных и неправильных ответов
    const score = D.createElement('output')
    score.className = 'score'
    B.append(score)

    // прогресс: порядковый номер вопроса
    const progress = D.createElement('output')
    progress.className = 'progress'
    B.append(progress)

    // контейнер для вопроса, вариантов ответа и кнопки для отправки формы
    const div = D.createElement('div')
    B.append(div)

    // получаем значения правильных и неправильных ответов из локального хранилища
    // или присваиваем переменным 0
    let rightAnswers = +localStorage.getItem('rightAnswers') || 0
    let wrongAnswers = +localStorage.getItem('wrongAnswers') || 0

    // получаем значение счетчика из локального хранилища
    // или присваиваем ему 0
    let i = +localStorage.getItem('i') || 0

    // рендерим вопрос
    showQuestion()

    // обновляем рейтинг и прогресс
    updateScoreAndProgress()

    function showQuestion() {
        // если значение счетчика равняется количеству вопросов
        // значит, игра окончена,
        // показываем результат
        console.log(assets.length)
        if (i === assets.length) {
            return showResult()
        }

        // заголовок-вопрос зависит от значения счетчика - номера вопроса
        const titleText = {
            4: `Что не является валидным?`,
            9: `Что произойдет?`,
            12: `Назовите три фазы распространения событий`,
            13: `Все ли объекты имеют прототипы?`,
            14: `Каким будет результат?`,
            20: `Чему равно sum?`,
            21: `Как долго будет доступен cool_secret?`,
            23: `Каким будет результат?`,
            25: `Глобальный контекст исполнения создает две вещи: глобальный объект и this`,
            27: `Каким будет результат?`,
            29: `Каким будет результат?`,
            30: `Что будет в event.target после нажатия на кнопку?`,
            33: `Каким будет результат?`,
            34: `Какие из значений являются "ложными"?`,
            38: `Все в JavaScript это`,
            39: `Каким будет результат?`,
            40: `Каким будет результат?`,
            41: `Что возвращает setInterval?`,
            42: `Каким будет результат?`,
            48: `Каково значение num?`,
            49: `Каким будет результат?`,
            65: `С помощью какого конструктора мы можем расширить класс Dog?`,
            70: `Как мы можем вывести в консоль значения, которые закомментированы после console.log?`,
            76: `Это чистая функция?`,
            85: `Что позволяет установить hasName значение true, если мы не можем передать true в качестве аргумента?`,
            93: `Каким будет результат?`,
            103: `Каким будет результат?`,
            107: `Какой метод модицифирует исходный массив?`,
            107: `Что делает этот метод?`,
            113: `Что произойдет?`,
            114: `Какие методы вернут 'Hello world!'?`,
            116: `Какой вызов вернет 6?`,
            133: `Как вызвать sum в index.js из sum.js?`,
            135: `Какой из вариантов изменит объект person?`,
            135: `Какой из вариантов изменит объект person?`,
            139: `Что здесь пропущено?`,
            142: `Какой вариант вызовет ошибку?`,
            143: `Что необходимо добавить к объекту person, чтобы получить ["Lydia Hallie, 21"] в качестве результата [...person]?`,
            152: `Каким должно быть значение method, чтобы в консоль вывелось { name: "Lydia", age: 22 }?`,
        }
        title.textContent = titleText[i] || `Что будет выведено в консоль?`

        // поскольку каждый элемент массива - это объект,
        // мы можем его деструктурировать, получив вопрос, правильный ответ и объяснение
        const {
            question,
            rightAnswer,
            explanation
        } = assets[i]

        // поскольку варианты ответа - это input type="radio",
        // строку необходимо преобразовать в массив (критерием является перенос строки - \n)
        // первый и последний элементы - пустые строки,
        // избавляемся от них с помощью slice(1, -1),
        // также удаляем пробелы
        const answers = assets[i].answers
            .split('\n')
            .slice(1, -1)
            .map(i => i.trim())

        // HTML-шаблон
        const template = `
        <form action="#">
            <h3>Вопрос:</h3>
            <pre class="language-js"><code>${question.slice(1)}</code></pre>

            <h3>Варианты ответов:</h3>
            ${answers.reduce((html, item) => html += `<label><input type="radio" name="answer" value="${item}">${item}</label><br>`, '')}

            <button type="submit">Ответить</button>
        </form>
        <details>
            <summary>Показать правильный ответ</summary>
            <section>
                <h3>Правильный ответ: ${rightAnswer}</h3>
                <p>${explanation}</p>
            </section>
        </details>`

        // помещаем шаблон в контейнер
        div.innerHTML = template

        // находим HTML-элемент с кодом и раскрашиваем js-код
        let code = document.getElementsByTagName('code')[0];
        window.Prism.highlightElement(code);


        // находим форму
        const form = div.querySelector('form')

        // выбираем первый инпут
        form.querySelector('input').setAttribute('checked', '')

        // обрабатываем отправку формы
        form.addEventListener('submit', ev => {
            // предотвращаем перезагрузку страницы
            ev.preventDefault()

            // определяем выбранный вариант ответа
            const chosenAnswer = form.querySelector('input:checked').value.substr(0, 1)

            // проверяем ответ
            checkAnswer(chosenAnswer, rightAnswer)
        })
    }

    function checkAnswer(chosenAnswer, rightAnswer) {
        // индикатор правильного ответа
        let isRight = true

        // если выбранный ответ совпадает с правильным,
        // увеличиваем количество правильных ответов,
        // записываем количество правильных ответов в локальное хранилище,
        // иначе увеличиваем количество неправильных ответов,
        // записываем количество неправильных ответов в локальное хранилище
        // и присваиваем индикатору false
        if (chosenAnswer === rightAnswer) {
            rightAnswers++
            localStorage.setItem('rightAnswers', rightAnswers)
        } else {
            wrongAnswers++
            localStorage.setItem('wrongAnswers', wrongAnswers)
            isRight = false
        }

        // находим кнопку
        const button = div.querySelector('button')

        // если ответ был правильным
        if (isRight) {
            // сообщаем об этом
            title.innerHTML = `<h1 class="right">Верно!</h1>`

            // выключаем кнопку
            button.disabled = true

            // через секунду вызываем функции
            // обновления рейтинга и прогресса и рендеринга следующего вопроса
            // отключаем таймер
            const timer = setTimeout(() => {
                updateScoreAndProgress()
                showQuestion()
                clearTimeout(timer)
            }, 1000)

            // если ответ был неправильным
        } else {
            // сообщаем об этом
            title.innerHTML = `<h1 class="wrong">Неверно!</h1>`

            // выключаем инпуты
            div.querySelectorAll('input').forEach(input => input.disabled = true)

            // раскрываем объяснение
            div.querySelector('details').setAttribute('open', '')

            // меняем текст кнопки
            button.textContent = 'Понятно'

            // по клику на кнопке вызываем функции
            // обновления рейтинга и прогресса и рендеринга следующего вопроса
            // удаляем обработчик
            button.addEventListener('click', () => {
                updateScoreAndProgress()
                showQuestion()
            }, {
                once: true
            })
        }

        // увеличиваем значение счетчика
        i++

        // записываем значение счетчика в локальное хранилище
        localStorage.setItem('i', i)
    }

    function updateScoreAndProgress() {
        // обновляем рейтинг
        score.innerHTML = `<span class="right">${rightAnswers}</span> - <span class="wrong">${wrongAnswers}</span>`

        // обновляем прогресс
        progress.innerHTML = `${i + 1} / ${assets.length}`
    }

    function showResult() {
        // определяем процент правильных ответов
        const percent = (rightAnswers / assets.length * 100).toFixed()

        // объявляем переменную для результата
        let result

        // в зависимости от процента правильных ответов
        // присваиваем result соответствующее значение
        if (percent >= 80) {
            result = `Отличный результат! Вы прекрасно знаете JavaScript.`
        } else if (percent > 50) {
            result = `Неплохой результат, но есть к чему стремиться.`
        } else {
            result = `Вероятно, вы только начали изучать JavaScript.`
        }

        // рендерим результаты
        B.innerHTML = `
        <h1>Ваш результат</h1>
        <div>
            <p>Правильных ответов: <span class="right">${rightAnswers}</span></p>
            <p>Неправильных ответов: <span class="wrong">${wrongAnswers}</span></p>
            <p>Процент правильных ответов: ${percent}</p>
            <p>${result}</p>
            <button>Заново</button>
        </div>
        `

        // при нажатии на кнопку
        // очищаем хранилище
        // и перезагружаем страницу,
        // удаляем обработчик
        B.querySelector('button').addEventListener('click', () => {
            localStorage.clear()
            location.reload()
        }, {
            once: true
        })
    }

    // сервис-воркер
    navigator.serviceWorker
        .register('./sw.js')
        .catch(er => {
            console.error(er)
        })
})(document, document.body)
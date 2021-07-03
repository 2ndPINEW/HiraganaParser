const MAX = 20

let typing
let isGaming
let score
let startTime
let missCount

(function() {
    addKeyEventListener()
    console.log('main.js ready')
})()

function Start () {
    if (isGaming) return
    isGaming = true
    startTime = Date.now()
    score = 0
    missCount = 0
    nextQuestion()
}

function Pose () {
    isGaming = false
    updateQuestionArea('停止', 'えんたーきーでさいしょから', '')
}

function getRandomInt(max) {
    return Math.floor(Math.random() * (max))
}

function nextQuestion () {
    updateCountBar()
    score += 1
    if (score > MAX) {
        isGaming = false
        const diff = (Date.now() - startTime) / 1000
        updateQuestionArea('終了!', diff + '秒', ' : ' + missCount + 'みす')
        return
    }
    question = questions[getRandomInt(questions.length)]
    typing = new Typing({hiragana: question.hiragana, question: question.question})
    updateQuestionArea(typing.ans.question, typing.inputed, typing.notInputed)
}

function updateQuestionArea (ans, inputed, not_inputed) {
    const question_text = document.querySelector('.question_text')
    const question_inputed = document.querySelector('.inputed')
    const question_not_inputed = document.querySelector('.not_inputed')

    question_text.innerHTML = ans
    question_inputed.innerHTML = inputed
    question_not_inputed.innerHTML = not_inputed
}

function addKeyEventListener () {
    document.body.addEventListener('keydown',
    event => {
        console.log(event.key)
        if (event.key == 'Enter') {
            Start()
            return
        }
        if (event.key == 'Escape') {
            Pose()
            return
        }
        if (isGaming) {
            typing.newInput(event.key)
            if (!typing.isAcceptInput) {
                missCount ++
            }
            updateQuestionArea(typing.ans.question, typing.inputed, typing.notInputed)
            if (typing.notInputed.length == 0) {
                nextQuestion()
            }
        }
    });
}

function updateCountBar () {
    const cat_hand = document.querySelector('.cat_hand')
    const wwidth = window.innerWidth
    const padding = wwidth * 0.1 + 80
    const width = wwidth - padding * 2
    const scorePercent = score / MAX
    const position = width * scorePercent + padding
    cat_hand.style.left = position + 'px'
}
const MAX = 350

let typing
let isGaming
let score
let startTime
let missCount

let count
let diff

let nextQuestionText

(function() {
    addKeyEventListener()
    diff = 9999999999999999999999999999999999999999999
    const btn = document.querySelector('.ranking_upload_button')
    btn.style.display = 'none'
    console.log('main.js ready')
})()

function Start () {
    if (isGaming) return
    const btn = document.querySelector('.ranking_upload_button')
    btn.style.display = 'none'
    isGaming = true
    startTime = Date.now()
    score = 0
    count = 0
    nextQuestionText = null
    missCount = 0
    nextQuestion()
}

function Pose () {
    isGaming = false
    updateQuestionArea('停止', 'えんたーきーでさいしょから', '', '')
}

function getRandomInt(max) {
    return Math.floor(Math.random() * (max))
}

function nextQuestion () {

    updateCountBar()
    
    score += 1
    
    if (count > MAX) {
        isGaming = false
        diff = (Date.now() - startTime) / 1000
        updateQuestionArea('終了!', diff + '秒', ' : ' + missCount + 'みす', '')
        const btn = document.querySelector('.ranking_upload_button')
        btn.style.display = 'block'
        return
    }

    if(questions.length == 0) {
        questions = master_questions.slice(0, master_questions.length)
    }

    question = nextQuestionText

    if (!nextQuestionText) {
        number = getRandomInt(questions.length)
        question = questions[number]
        questions.splice(number, 1)
    }
    number = getRandomInt(questions.length)
    nextQuestionText = questions[number]
    questions.splice(number, 1)
    
    typing = new Typing({hiragana: question.hiragana, question: question.question})
    
    updateQuestionArea(typing.ans.question, typing.inputed, typing.notInputed, nextQuestionText.question)
}

function updateQuestionArea (ans, inputed, not_inputed, next_question_text) {
    const question_text = document.querySelector('.question_text')
    const question_inputed = document.querySelector('.inputed')
    const question_not_inputed = document.querySelector('.not_inputed')
    const next_question　= document.querySelector('.next_question_text')

    question_text.innerHTML = ans
    question_inputed.innerHTML = inputed
    question_not_inputed.innerHTML = not_inputed
    next_question.innerHTML = next_question_text
}

function addKeyEventListener () {

    document.body.addEventListener('keydown', event => {
        
        console.log(event.key)
        
        if (event.key == 'Enter') {
            Start()
            return
        }
        
        if (event.key == 'Escape') {
            if (!isGaming) {
                event.preventDefault()
                location.href = '../'
                return
            }
            Pose()
            return
        }
        
        if (isGaming) {
            typing.newInput(event.key.toLocaleLowerCase())
            if (typing.isAcceptInput) {
                count ++
            } else {
                missCount ++
            }
            updateQuestionArea(typing.ans.question, typing.inputed, typing.notInputed, nextQuestionText.question)
            updateCountBar()
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
    const scorePercent = count / MAX
    const position = width * scorePercent + padding
    cat_hand.style.left = position + 'px'
}

function goUploadRankingPage () {
    localStorage.setItem('time', diff)
    location.href = './upload.html'
}

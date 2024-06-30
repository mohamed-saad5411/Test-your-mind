
let questionCategory = ''
let questionDifficulty = ''
let questionNumber = ''
let userAnswer = ''
let correctAnswer = ''
let questionContainer = []
let answerContainer
let category = document.querySelectorAll('#category p')
let difficulty = document.querySelectorAll("#difficulty input")
let numberInput = document.querySelector("#number input")
let startBtn = document.querySelector("#startBtn")
let correctBtn = document.querySelector("#correctBtn")
let inCorrectBtn = document.querySelector("#inCorrectBtn")
let scoreBtn = document.querySelector("#scoreBtn")
let submitBtn = document.querySelector("#submitBtn")
let correctAnsInput = document.querySelector('#correctAnsInput')
let questions = document.getElementById('questions')
let i = 0
let score = 0

for (let i = 0; i < category.length; i++) {
    category[i].addEventListener('click', function () {
        questionCategory = category[i].getAttribute('data-value')
    })
}

for (let i = 0; i < difficulty.length; i++) {
    difficulty[i].addEventListener('click', function () {
        questionDifficulty = difficulty[i].value.toLocaleLowerCase()
        // console.log(questionDifficulty);
    })
}

function startQuiz() {
    getQuestions()
    $('#startPage').fadeOut(1000, function () {
        $('#quizPage').fadeIn(1000);
    });

}

async function getQuestions() {
    let fristRespons = await fetch(`https://opentdb.com/api.php?amount=${numberInput}&category=${questionCategory}&difficulty=${questionDifficulty}`)
    let finalRespons = (await fristRespons.json()).results
    questionContainer.push(finalRespons)
    displayQuestion()

}

function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    while (currentIndex != 0) {

        randomIndex = Math.floor(Math.random() * currentIndex); // 1
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
}


function displayQuestion() {

    let fristQuestion = questionContainer[i][i].question
    correctAnswer = questionContainer[i][i].correct_answer
    let inCorrectAnswers = questionContainer[i][i].incorrect_answers
    answerContainer = [correctAnswer, ...inCorrectAnswers]
    shuffle(answerContainer)

    console.log(answerContainer);
    console.log(correctAnswer);



    document.getElementById('categoryOfQuestion').innerHTML = `${questionContainer[i][i].category} Quiz`
    document.getElementById('fQuestion').innerHTML = `Q${i + 1}` + ` : ` + fristQuestion
    document.getElementById('noOfQuestions').innerHTML = `${i + 1} Of ${numberInput} Question`
    let cartoona = ``
    for (let index = 0; index < answerContainer.length; index++) {
        cartoona += `<label class='d-block'>
    <input name="contract_duration" type="radio" value="${answerContainer[index]}" />
    <span>${answerContainer[index]}</span>
</label>`
    }

    questions.innerHTML = cartoona

    if (document.querySelector('input[name="contract_duration"]')) {
        let answers = document.querySelectorAll('input[name="contract_duration"]')
        answers.forEach((answer) => {
            answer.addEventListener('change', function (info) {
                userAnswer = info.target.value;
                if (userAnswer == correctAnswer) {
                    score++
                }
            })
        })
    }
}


function checkAnswers() {
    if (userAnswer == correctAnswer) {
        score++
        $('#correctBtn').fadeIn(500, function () {
            $('#correctBtn').fadeOut(500);
        });
    } else {
        $('#inCorrectBtn').fadeIn(500, function () {
            $('#inCorrectBtn').fadeOut(500);
        });
    }
}

function ShowNextQuestion() {
    $('#quizPage').fadeOut(500, function () {
        $('#quizPage').fadeIn(500);
    });
    checkAnswers()
    i++
    if (i == numberInput - 1) {
        submitBtn.classList.add('d-none')
        scoreBtn.classList.add('d-block')
    }


    let nextQuestion = questionContainer[0][i].question
    correctAnswer = questionContainer[0][i].correct_answer
    let inCorrectAnswers = questionContainer[0][i].incorrect_answers
    answerContainer = [correctAnswer, ...inCorrectAnswers]
    shuffle(answerContainer)
    document.getElementById('categoryOfQuestion').innerHTML = `${questionContainer[0][i].category} Quiz`
    document.getElementById('fQuestion').innerHTML = `Q${i + 1}` + ` : ` + nextQuestion
    document.getElementById('noOfQuestions').innerHTML = `${i + 1} Of ${numberInput} Question`

    console.log(answerContainer);
    console.log(correctAnswer);
    let cartoona = ``
    for (let index = 0; index < answerContainer.length; index++) {
        cartoona += `<label class='d-block'>
    <input name="contract_duration" type="radio" value="${answerContainer[index]}" />
    <span>${answerContainer[index]}</span>
</label>`
    }
    questions.innerHTML = cartoona

    if (document.querySelector('input[name="contract_duration"]')) {
        let answers = document.querySelectorAll('input[name="contract_duration"]')
        answers.forEach((answer) => {
            answer.addEventListener('change', function (info) {
                userAnswer = info.target.value;
            })
        })
    }

}

function showScore() {
    document.getElementById('score').innerHTML = `<span class="mainColor h6"> ${score} / ${numberInput}</span>`
    checkAnswers()
    $('#quizPage').fadeOut(1000, function () {
        $('#finishPage').fadeIn(1000);
    });

}


numberInput.addEventListener('blur', function () {
    numberInput = numberInput.value
})
startBtn.addEventListener('click', startQuiz)
submitBtn.addEventListener('click', ShowNextQuestion)
scoreBtn.addEventListener('click', showScore)

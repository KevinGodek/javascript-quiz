const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')


let shuffleQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++ 
  setNextQuestion()
})

function startGame() {
  console.log('started')
  startButton.classList.add('hide')
  shuffleQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
} 

function setNextQuestion() {
  resetState()
  showQuestion(shuffleQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnser)
    answerButtonsElement.appendChild(button)
  })
}

function resetState () {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild
    (answerButtonsElement.firstChild)
  }
}

function selectAnser(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffleQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'Is Javascript fun?',
    answers: [
      {text: 'Yes', correct: true},
      {text: 'No', correct: false}
    ]
  },

  {
    question: 'If a variable is declared outside of a function is it globally scoped or locally scoped?',
    answers: [
      {text: 'Globally', correct: true},
      {text: 'Locally', correct: false},
    ]
  },

  {
    question: 'The let variable declaration is blocked scoped or gloablly scoped?',
    answers: [
      {text: 'Globally', correct: false},
      {text: 'Blocked', correct: true},
    ]
  },

  {
    question: 'Can const declarations be accessed outside the block they were created in?',
    answers: [
      {text: 'Yes', correct: false},
      {text: 'No', correct: true},
    ]
  },

  {
    question: 'Can var variables be updated and re-declared within its scope?',
    answers: [
      {text: 'Yes', correct: true},
      {text: 'No', correct: false},
    ]
  },
]
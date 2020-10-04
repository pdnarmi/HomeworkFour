var quizDiv = document.getElementById('quizDiv');
var startButton = document.getElementById('startQuiz');
let currentSlide = 0;
var slides;
var timer = document.getElementById('quizTimer');
var timerDisplay = document.getElementById('time')
var score = document.getElementById("scoreTxt");
var highscoreDiv = document.getElementById('userScore');
var userInitals = document.getElementById('userInitials');
var interval;
var timer;
// Timer function
function startTimer(duration, display){

    var minutes, seconds;
    
    timer = duration;

    interval = setInterval(function(){
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        console.log(timer);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            clearQuiz();
            initialsInput();
            display.textContent = '';
            clearInterval(interval);
        }
    }, 1000)
}


// Array of quiz questions stored as an array of nested objects
var questions = [
  {
    title: 'Commonly used data types DO NOT include:',
    choices: {
      a: ' strings',
      b: ' booleans',
      c: ' alerts',
      d: ' numbers',
    },
    answer: 'c',
  },

  {
    title: 'The condition in an if / else statement is enclosed within ____.',
    choices: {
      a: ' quotes',
      b: ' curly brackets',
      c: ' parentheses',
      d: ' square brackets',
    },
    answer: 'c',
  },

  {
    title: 'What is the purpose of console.log?',
    choices: {
      a: ' prompt a user',
      b: ' to split wood',
      c: ' alert a user',
      d: ' print text to console',
    },
    answer: 'd',
  },

  {
    title: 'How do we perform a task in Javascript?',
    choices: {
      a: ' for loop',
      b: ' a function',
      c: ' an array',
      d: ' math.random',
    },
    answer: 'b',
  },

  {
    title:
      'What word is used to state if a condition is true, do this, else, do something else?',
    choices: {
      a: ' if',
      b: ' alert',
      c: ' while',
      d: ' loop',
    },
    answer: 'a',
  },

  {
    title: 'How do you check if your code is working in the browser',
    choices: {
      a: ' console log',
      b: ' asking the teacher',
      c: ' dev tools',
      d: ' guessing',
    },
    answer: 'a',
  },
]
// Clears content of quizDiv
function clearQuiz(){
    quizDiv.innerHTML = ``;
}

// Creates input for player initials
function initialsInput() {
  var submitBtn = document.getElementById("submit")
    quizDiv.innerHTML = `<form action="javascript:void(0)" onSubmit="saveScore()">
                            <label>
                                Please input your intials! <input id = "initials" name = "userInitials" type = "text" required><button id = "submit" type="submit">Submit!</button>
                            </label>
                        </form>`;
  clearInterval(interval);
}

// Function saves intials and scores; also combines into an array of objects in localstorage
function saveScore(){
  alert("Score has been saved to High Scores page!");
    var userInitials = document.querySelector("#initials");
    var storedScores = localStorage.getItem("scores");
// Null Check within saveScore func 
    if(storedScores === null){
        var scores = [];
        var newScore = {
            "player": userInitials.value,
            "highScore": score.innerText,
        };
        scores.push(newScore);

        localStorage.setItem("scores", JSON.stringify(scores));
    } else {
        storedScores = JSON.parse(storedScores);
        storedScores.push({
            "player": userInitials.value,
            "highScore": score.innerText,
        });

        localStorage.setItem("scores", JSON.stringify(storedScores));
    }
    localStorage.setItem("Player Initials", userInitials.value);
    localStorage.setItem("Player Score", score.innerText);
    
}

//Builds quiz that displays question slides
function quizBuild() {

  const output = []

  questions.forEach((currentQuestion, questionNumber) => {
    var possibleAnswers = []

    for (letter in currentQuestion.choices) {
      possibleAnswers.push(
                    `<label>
                        <input name = "question${questionNumber}" value = "${letter}" type= "radio" onclick="showNextSlide()">
                            ${letter}:${currentQuestion.choices[letter]}
                    </label>`,
      )
    }

    output.push(
                    `<div class = "slide">
                        <div class = "question">${currentQuestion.title}</div>
                        <div class = "choices">${possibleAnswers.join('')}</div>
                        <div><button = "submit" onclick = "initialsInput()">Submit Results</button></div>
                    </div>`,
    )
  })
  quizDiv.innerHTML = output.join('')

  slides = document.querySelectorAll('.slide')

  
  showSlide(0);

  startButton.classList.add("hidden");
  timer.classList.remove("hidden");
  startTimer(120, timerDisplay)
  score.innerText = 0;
}

// Function that controls which question slide is displayed
function showSlide(n) {
  slides[currentSlide].classList.remove('activeSlide')
  slides[n].classList.add('activeSlide')
  currentSlide = n
}



// Quiz game rules
function showNextSlide() {
    
    const selector = `input[name=question${currentSlide}]:checked`;
    const answerList = quizDiv.querySelectorAll('.choices');
    var minutes = parseInt("#time");

    if (answerList[currentSlide].querySelector(`input:checked`).value === questions[currentSlide].answer){
        score.innerText = parseInt(score.innerText) + 10;
        console.log(minutes);
    } else if (answerList[currentSlide].querySelector(`input:checked`).value != questions[currentSlide].answer){
        score.innerText = parseInt(score.innerText) - 5;
        timer = timer+3;
    }    
    if (answerList[currentSlide].querySelector(`input:checked`).value != questions[currentSlide].answer){
        timer = timer-25;
     }


    
    console.log(answerList[currentSlide].querySelector(`input:checked`).value);


    if (currentSlide + 1 < slides.length) {
        showSlide(currentSlide + 1);
    
    }
}

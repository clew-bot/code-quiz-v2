
var answerBtn1 = document.getElementById('answer1');
var answerBtn2 = document.getElementById('answer2');
var answerBtn3 = document.getElementById('answer3');
var answerBtn4 = document.getElementById('answer4');
var btnContainer = document.getElementById('buttonContainer');
var timer = document.getElementById('timer');
var startingButton = document.getElementById('startBtn');
var scoreBoard = document.getElementById('score');
var displayQuestion = document.getElementById('actualQuestion');
var nextButton = document.getElementById('nextButton');

var score;
var secondsLeft = 60;
var QuestionTimer;

var shuffledQuestions, currentQuestion;
var myQuestions = [
    //Array index 0 
    {
    questions: "What programming language builds on top of Javascript adding tools static type definitions?",
    answers: [
        {text: "ActionScript", correct: false},
        {text: "TypeScript", correct: true},
        {text: "React Native", correct: false},
        {text: "PureScript", correct: false}
    ]
    },
   
    

    //Array index 1
    {
    questions: "Who is the Founder of Apple?",
    answers: [
        {text: "Steve Wozniak", correct: false},
        {text: "Steve Jobs", correct: false},
        {text: "Ronald Wayne", correct: false},
        {text: "All of the above", correct: true}
    ]    
    },


    //Array index 2
    {
    questions: "What languages does Amazon code in? HINT: BACK-END",
    answers: [
        {text: "HTML, CSS, Javascript", correct: false},
        {text: "Java, Scala, Ruby", correct: false},
        {text: "Java, C++, Perl", correct: true},
        {text: "Python (Django), Erlang", correct: false}
      ]    
    },


    //Array index 3
    {
    questions: "What is the famous Algorithm used by Google?",
    answers: [
        {text: "Google Matrix", correct: false},
        {text: "CheiRank", correct: false},
        {text: "PageRank", correct: true},
        {text: "HITS algorithm", correct: false}
    ]    
    },


    //Array index 4
    {
    questions: "How many possible Rubik's cube combinations can there be?",
    answers: [
        {text: "43,252,003,274,489,956,000", correct: false},
        {text: "43,252,004,271,456,954,000", correct: false},
        {text: "43,252,003,281,457,954,000", correct: false},
        {text: "43,252,003,274,489,856,000", correct: true}
    ]
    },


    //Array index 5
    {
    questions: "Which continent has hosted the Olympics the most times?",
    answers: [
        {text: "Africa", correct: false}, 
        {text: "Europe", correct: true},
        {text: "Asia", correct: false},
        {text: "North America", correct: false}
    ]
    },


    //Array index 6
    {
    questions: "What is the latest version of JavaScript?",
    answers: [
        {text: "ES4", correct: false},
        {text: "ES5", correct: false},
        {text: "ES6", correct: true},
        {text: "ES7", correct: false}
    ]
    },


    //Array index 7
    {
    questions: "What are the main components that make up a webpage?",
    answers: [
        {text: "Google, Google Chrome, Internet", correct: false},
        {text: "Computer, Monitor, Mouse, Keyboard", correct: false},
        {text: "HTML, CSS, Javascript", correct: true},
        {text: "Java, PHP, HTML", correct: false}
    ]   
    }
];
//Mainly code will consist of a function on an AddEventlistener, once that is called, we will be calling more functions //
// hideBtn = document.getElementById("questionContainer").setAttribute("style", "display:none;")
btnContainer.setAttribute("style","display:none;");
startingButton.addEventListener("click", startGame)
btnContainer.addEventListener("click", () => {
    console.log(currentQuestion);
    setNextQuestion()})

    scoreBoard.textContent = score;
function startGame() {
    
    console.log(score);
    var heading = document.getElementById('h2El');
    heading.setAttribute("style", "display:none;")  //Hide the start button since we don't need it using setAttribute //
    startingButton.setAttribute("style", "display:none;")
    btnContainer.setAttribute("style","display:block;");
    shuffledQuestions = myQuestions.sort(() => Math.floor(Math.random() - 5))
    //Let's get the timer started with another function we'll call getTimer //
    currentQuestion = 0;
    score = 0;
    gameTimer();        //Now that we have the board setup, let's start the show! Next question function! //
    setNextQuestion();
    
}


function gameTimer() {
    //Set the interval to create a timer //
    questionTimer = setInterval(() => {
        secondsLeft--;
    //set the timer display to the string and how many seconds left. //
        timer.textContent = `You currently have ${secondsLeft} seconds left in the Quiz. Good Luck.`
        if(secondsLeft <= 1) {
        
        //Clear the timer once we hit below 1. //
        clearInterval(questionTimer);
        highScore();
        }
        //Give em second each.
    }, 1000);
}

function setNextQuestion() {
    console.log(currentQuestion)
    if(currentQuestion >= 8) {
        highScore();
        return;
        } else {
   
    // This parameter is going to take the shuffled question which we defined earlier with Math.random then use bracket notation to get the current question in the index. //
    resetBoard();
    showQuestion(shuffledQuestions[currentQuestion]);
        }
}

function showQuestion(quest) {
    displayQuestion.textContent = quest.questions;
    // We will display out question with dot notation (remember quest is shuffledQuestions[currentQuestion]
    // at this point. So we are grabbing a random number that is whatever index of the questions object. //
    

    // quest is the random question, dot notation grabbing our corresponding answers and forEach method grabbing each array element in the .answers
    quest.answers.forEach(answer => {
        //for each answer we are going to create a new button element //
        var makeButton = document.createElement('button')
        
        //makeButton should have the answers of the corresponding question in their button using dot notation. //
        makeButton.innerText = answer.text
        //Adding the class btn to our newly formed buttons //
        makeButton.classList.add('btn')
        if (answer.correct) {
          console.log(answer);
          
            makeButton.dataset.correct = answer.correct;
            
        }
        makeButton.addEventListener("click", selectAnswer);
        //Append each makeButtons to the button container we made to hold all the buttons //
        btnContainer.appendChild(makeButton);
    });
}



function resetBoard() {
    while (btnContainer.firstChild) {
    btnContainer.removeChild(btnContainer.firstChild);
}
 
}

function selectAnswer(click) {
    var getAnswer = click.target;
    var correctAnswer = getAnswer.dataset.correct;    
    if (correctAnswer) {        
        console.log("Testing");
        score++
        scoreBoard.textContent = score;
        console.log("the scoreboard is: " + score);
        currentQuestion++;        
    } else if 
        (correctAnswer != true) {
          currentQuestion++;
          console.log("false");        
          secondsLeft-=5;
        }
   
}

 function highScore() {
     console.log("testing highscorefunction");
     clearInterval(questionTimer);
     timer.setAttribute("style", "display:none;");
   
     displayQuestion.setAttribute("style", "display:none;");
     btnContainer.setAttribute("style", "display:none;");
     var inInitials = document.createElement('input');
     console.log(inInitials + "initials")
     var highBody = document.getElementsByTagName('BODY')[0].appendChild(inInitials);
     
     
     if (highBody.firstChild) {
         highBody.removeChild;
     }
     localStorage.setItem("score", score);
     getScore();
 }

 function getScore() {
    var x = localStorage.getItem("score", score)
    document.getElementById('highScore').textContent = `Your score is ${x}, nice!`;
    
 }


let playerName = "";
let pointCount = 0;

const soundEffect = document.createElement("audio");

const playerNameInput = document.getElementById("name-input");

const gameStart = document.getElementById("game-start");
const gameInProgress = document.getElementById("game-in-progress");
const gameOver = document.getElementById("game-feedback");

const question = document.getElementById("question-field");
const ans1 = document.getElementById("answer-1-field");
const ans2 = document.getElementById("answer-2-field");
const ans3 = document.getElementById("answer-3-field");

const ansOption1 = document.getElementById("answer1");
const ansOption2 = document.getElementById("answer2");
const ansOption3 = document.getElementById("answer3");

const questionNumber = document.getElementById("question-number");
const playerNameVisual = document.getElementById("player-name");
const pointCountVisual = document.getElementById("player-points");
const muteButton = document.getElementById("mute-btn");

const nameFeedback = document.getElementById("playerNameFeedback");
const gameFeedback = document.getElementById("gamePointFeedback");
const totalPoints = document.getElementById("total-player-points");


let currentQuestion = 0;
const geoQuiz = [
  {
    question: "Vilket är världens största hav?",
    options: ["Atlanten", "Indiska oceanen", "Stilla havet"],
    correctAnswer: "Stilla havet"
  },
  {
    question: "I vilket land ligger staden Paris?",
    options: ["Frankrike", "Italien", "Spanien"],
    correctAnswer: "Frankrike"
  },
  {
    question: "Vad heter Sveriges huvudstad?",
    options: ["Göteborg", "Stockholm", "Malmö"],
    correctAnswer: "Stockholm"
  },
  {
    question: "Vilken är världens längsta flod?",
    options: ["Amazonfloden", "Nilen", "Mississippi"],
    correctAnswer: "Nilen"
  },
  {
    question: "På vilken kontinent ligger pyramiderna i Giza?",
    options: ["Asien", "Afrika", "Sydamerika"],
    correctAnswer: "Afrika"
  },
  {
    question: "Vilket berg är världens högsta?",
    options: ["K2", "Mont Blanc", "Mount Everest"],
    correctAnswer: "Mount Everest"
  },
  {
    question: "Vilket land har formen av en stövel?",
    options: ["Grekland", "Italien", "Portugal"],
    correctAnswer: "Italien"
  },
  {
    question: "Vilket är världens största land till ytan?",
    options: ["Kanada", "USA", "Ryssland"],
    correctAnswer: "Ryssland"
  },
  {
    question: "Vad heter det stora havet som ligger mellan Europa och USA?",
    options: ["Atlanten", "Stilla havet", "Indiska oceanen"],
    correctAnswer: "Atlanten"
  },
  {
    question: "I vilken världsdel ligger Australien?",
    options: ["Asien", "Oceanien", "Antarktis"],
    correctAnswer: "Oceanien"
  }
];

const feedback = ["Grattis, du är lika smart som en tredjeklassist", "Kämpa hårdare nästa gång", "Jag vet inte vad jag ska säga.."]


// startar spelet
function startGame() {
    gameStart.style.display = "none";
    gameInProgress.style.display = "block";

    playerName = playerNameInput.value;
    nextQuestion();
    playerNameVisual.innerHTML = playerName;
    pointCountVisual.innerHTML = pointCount;

}

// byter fråga
function nextQuestion() {

    if(currentQuestion != 0) {
        let playerAnswer = document.querySelector('input[name="answers"]:checked').value;
        
        if (playerAnswer === geoQuiz[currentQuestion-1].correctAnswer) {
            pointCount++;
            pointCountVisual.innerHTML = pointCount;
            soundEffect.src = "assets/success.mp3";
            soundEffect.play();
        }
        else {
            soundEffect.src = "assets/failure.mp3";
            soundEffect.play();
        }
    }

    if(currentQuestion < geoQuiz.length) {
    question.innerHTML = geoQuiz[currentQuestion].question;
    ans1.innerHTML = geoQuiz[currentQuestion].options[0];
    ans2.innerHTML = geoQuiz[currentQuestion].options[1];
    ans3.innerHTML = geoQuiz[currentQuestion].options[2];
    ansOption1.value = geoQuiz[currentQuestion].options[0];
    ansOption2.value = geoQuiz[currentQuestion].options[1];
    ansOption3.value = geoQuiz[currentQuestion].options[2];

    currentQuestion++;
    questionNumber.innerHTML = "Fråga " + currentQuestion;
}

    else {
        gameIsOver();
    }

}

// game end screen
function gameIsOver() {
    gameInProgress.style.display = "none";
    gameOver.style.display = "block";
    totalPoints.innerHTML = pointCount;

    if(pointCount === 10) {
        feedbackValue = 0;
        fireworks();
    } else if(pointCount > 8) {
        feedbackValue = 1;
    } else {
        feedbackValue = 2;
    }

    gameFeedback.innerHTML = feedback[feedbackValue];
    nameFeedback.innerHTML = playerName +  " har fått " + pointCount + " poäng.";
}

// mute knappen
function toggleMute() {
    if (soundEffect.muted === false) {
  soundEffect.muted = true;
  muteButton.textContent = "🔇";
    } else {
        soundEffect.muted = false;
        muteButton.textContent = "🔊";
    }
}

//starta över
function resetQuiz() {
    window.location.reload();
}


// importerad "fireworks" funktion
function fireworks() {
const duration = 15e3,
  animationEnd = Date.now() + duration,
  defaults = {
    startVelocity: 30,
    spread: 360,
    ticks: 60,
    zIndex: 0
  };

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}
const interval = setInterval(function() {
  const timeLeft = animationEnd - Date.now();
  if (timeLeft <= 0) return clearInterval(interval);
  const particleCount = 50 * (timeLeft / duration);
  confetti(Object.assign({}, defaults, {
    particleCount,
    origin: {
      x: randomInRange(.1, .3),
      y: Math.random() - .2
    }
  }));
  confetti(Object.assign({}, defaults, {
    particleCount,
    origin: {
      x: randomInRange(.7, .9),
      y: Math.random() - .2
    }
  }));
}, 250);
}
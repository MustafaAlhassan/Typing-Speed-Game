/*
  Advices
  - Always Check The Console
  - Take Your Time To Name The Identifiers
  - DRY

  Your Trainings To Add Features
  ---- [01] Save Score To Local Storage With Date
  ---- [02] Write Game Instruction With Dynamic Values
*/

let levels = {
  Easy: 5,
  Normal: 4,
  Hard: 3,
};

const easyWords = [
  "hello",
  "world",
  "apple",
  "happy",
  "sunny",
  "water",
  "music",
  "light",
  "green",
  "smile",
];

const normalWords = [
  "elephant",
  "keyboard",
  "adventure",
  "mountain",
  "sunshine",
  "chocolate",
  "calendar",
  "dinosaur",
  "butterfly",
  "hospital",
];

const hardWords = [
  "extravaganza",
  "quintessential",
  "xylophone",
  "juxtaposition",
  "asymmetrical",
  "phenomenon",
  "onomatopoeia",
  "unprecedented",
  "exacerbate",
  "mnemonic",
];

let words = [];

let defaultLevel = "Normal";
let defaultLevelSecond = levels[defaultLevel];

let levelName = document.querySelector(".message .lvl");
let levelSecond = document.querySelector(".message .seconds");
let startButton = document.querySelector(".start");
let theWord = document.querySelector(".the-word");
let input = document.querySelector(".input");
let upcomingWords = document.querySelector(".upcoming-words");
let time = document.querySelector(".real-info .time span");
let score = document.querySelector(".real-info .score .got");
let tatolScore = document.querySelector(".real-info .score .total");
let finishMessage = document.querySelector(".finish");
let restart = document.querySelector(".restart");

let timerInterval;

restart.onclick = function () {
  document.querySelector(".buttons").appendChild(startButton);
  theWord.innerHTML = "";
  upcomingWords.innerHTML = "Words Will Show Here";
  score.innerHTML = 0;
  clearInterval(timerInterval);
  setValues();
};

function setValues() {
  levelName.innerHTML = defaultLevel;
  levelSecond.innerHTML = levels[defaultLevel];
  time.innerHTML = levels[defaultLevel];
  tatolScore.innerHTML = 10;
  if (defaultLevel === "Normal") words = [...normalWords];
  else if (defaultLevel === "Hard") words = [...hardWords];
  else words = [...easyWords];
}
setValues();

levelName.onclick = function () {
  if (defaultLevel === "Normal") defaultLevel = "Hard";
  else if (defaultLevel === "Hard") defaultLevel = "Easy";
  else defaultLevel = "Normal";
  setValues();
};

input.onpaste = () => false;

startButton.onclick = function () {
  this.remove();
  input.focus();
  generateWord();
};

function generateWord() {
  let index = Math.floor(Math.random() * words.length);
  theWord.innerHTML = words[index];
  words.splice(index, 1);

  upcomingWords.innerHTML = "";
  for (let i = 0; i < words.length; i++) {
    let div = document.createElement("div");
    let txt = document.createTextNode(words[i]);
    div.appendChild(txt);
    upcomingWords.appendChild(div);
  }

  startPlay();
}

function startPlay() {
  if (words.length >= 9) {
    time.innerHTML = defaultLevelSecond + 3;
  } else {
    time.innerHTML = defaultLevelSecond;
  }
  timerInterval = setInterval(() => {
    time.innerHTML--;
    if (time.innerHTML == 0) {
      clearInterval(timerInterval);
      if (input.value.toLowerCase() === theWord.innerHTML.toLocaleLowerCase()) {
        input.value = "";
        score.innerHTML++;
        if (words.length > 0) {
          generateWord();
        } else {
          finalMessage("good");
          upcomingWords.remove();
        }
      } else {
        finalMessage("bad");
      }
    }
  }, 1000);
}

function finalMessage(className) {
  let span = document.createElement("span");
  span.className = className;
  if (className === "bad")
    span.appendChild(document.createTextNode("Game Over"));
  if (className === "good")
    span.appendChild(document.createTextNode("Congratulations"));
  finishMessage.appendChild(span);
}

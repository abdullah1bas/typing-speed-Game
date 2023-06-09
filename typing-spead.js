/*
  Advices
  - Always Check The Console
  - Take Your Time To Name The Identifiers
  - DRY

  Steps To Create The Project
  [01] Create HTML Markup
  [02] Add Styling And Separate From Logic
  [03] Create The App Logic
  ---- [01] Add Levels
  ---- [02] Show Level And Seconds
  ---- [03] Add Array Of Words
  ---- [04] ِAdd Start Game Button
  ---- [05] Generate Upcoming Words
  ---- [06] Disable Copy Word And Paste Event + Focus On Input
  ---- [07] Start Play Function
  ---- [08] Start The Time And Count Score
  ---- [09] Add The Error And Success Messages
  [04] Your Trainings To Add Features
  ---- [01] Save Score To Local Storage With Date
  ---- [02] Choose Levels From Select Box
  ---- [03] Break The Logic To More Functions
  ---- [04] Choose Array Of Words For Every Level
  ---- [05] Write Game Instruction With Dynamic Values
  ---- [06] Add 3 Seconds For The First Word
*/

const easyWords = [
  "Hello", "Code", "Town", "Country", "Testing", "ASCII", "Bug", "Data", "Youtube", "Twitter", "Github", "True", "False", "Ruby", 
  "Java", "OOP", "Class", "Types", "Coding", "Funny", "Working", "Task", "PHP", "CSS", "HTML", "Array", "Loop", "Runner", "Python", 
  "Scala", "Styling", "Roles", "Test", "Rust", "Playing", "Endless", "Null", "HLL", "Pascal", "Markup", "SGML", "XML", "Perl", "ASP", "Syntax",
];
const normalWords = [
  "Computer", "Leetcode", "Pointer", "Operator", "Variable", "Paradigm", "Boolean", "Internet", "Operand", "Linkedin",
  "Interface", "Compilation", "Conditionals", "Constants", "Exception", "Declaration", "Expression", "Framework", "Hardcode",
  "Iteration", "Keywords", "Language", "Prologue", "Machine", "Runtime", "Package", "Backend", "Cascade", "Statement",
];
const hardWords = [
  "Programming", "Documentation", "Dependencies", "Destructuring", "Alchemized","Javascript","permissions",
  "Information","Technology","administrator", "Development", "Applications", "Administration", "Azobenzene", "Abashments",
];
const veryHardWords = [ 
  "Antidisestablishmentarianism", "Floccinaucinihilipilification",
  "Otorhinolaryngological", "Immunoelectrophoretically", "Psychophysicotherapeutics", "Thyroparathyroidectomized",
  "Spectrophotofluorometrically", "Pneumoencephalographically", "Pneumonoultramicroscopicsilicovolcanoconiosis",
];

let startButton = document.querySelector(".start"),
  lvlNameSpan = document.querySelector(".message .lvl"),
  secondsSpan = document.querySelector(".message .seconds"),
  levelsSpan = document.getElementById("levels"),
  theWord = document.querySelector(".the-word"),
  upcomingWords = document.querySelector(".upcoming-words"),
  input = document.querySelector(".input"),
  timeLeftSpan = document.querySelector(".time span"),
  scoreGot = document.querySelector(".score .got"),
  scoreTotal = document.querySelector(".score .total"),
  finishMessage = document.querySelector(".finish");

const lvls = {
  Easy: 4,
  Normal: 5,
  Hard: 4,
  VeryHard: 15,
};

let defaultLevelName = levelsSpan.value;
let defaultLevelSeconds = lvls[defaultLevelName];
let localArr = [];
let arrSelect = easyWords;
let oneTime = 1;

levelsSpan.onchange = function () {
  levelsSpan.value == "Normal"
    ? (arrSelect = normalWords)
    : levelsSpan.value == "Hard"
    ? (arrSelect = hardWords)
    : levelsSpan.value == "VeryHard"
    ? (arrSelect = veryHardWords)
    : (arrSelect = easyWords);

  defaultLevelName = levelsSpan.value;
  defaultLevelSeconds = lvls[defaultLevelName];
  dynamicPage(defaultLevelName, defaultLevelSeconds, arrSelect.length);
};

// Setting Level Name + Seconds + Score
dynamicPage(defaultLevelName, defaultLevelSeconds, arrSelect.length);


if (localStorage.getItem(defaultLevelName)) {
  localArr = JSON.parse(localStorage.getItem(defaultLevelName));
}

// de y3ne mynf3sh y3mel paste fe al input
input.onpaste = function () {
  return false;
};

startButton.onclick = function () {
  this.remove();
  levelsSpan.remove();
  input.focus();
  genWords(arrSelect);
  console.log(arrSelect.length);
};

function dynamicPage(name , seconds, lengthArr) {
  lvlNameSpan.innerHTML = name,
  secondsSpan.innerHTML = seconds,
  timeLeftSpan.innerHTML = seconds,
  scoreTotal.innerHTML = lengthArr;
}
function genWords(arrSelect) {
  console.log(arrSelect.length);
  let randomWord = arrSelect[Math.floor(Math.random() * arrSelect.length)];
  let wordIndex = arrSelect.indexOf(randomWord);
  // Remove WordFrom arrSelectay
  arrSelect.splice(wordIndex, 3);
  theWord.innerHTML = randomWord;
  upcomingWords.innerHTML = "";
  showWordsInPage(arrSelect);
  startPlay(arrSelect);
}

function showWordsInPage(arrSelect){
  arrSelect.forEach((word) => {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(word));
    upcomingWords.appendChild(div);
  });
};

function startPlay(arrSelect) {
  if (oneTime == 1){
    timeLeftSpan.innerHTML = defaultLevelSeconds += 3;
    defaultLevelSeconds-=3;
    oneTime--;
  }else {
    timeLeftSpan.innerHTML = defaultLevelSeconds;
  }
  let start = setInterval(() => {
    timeLeftSpan.innerHTML--;
    if (timeLeftSpan.innerHTML === "0") {
      clearInterval(start);
      if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
        input.value = "";
        scoreGot.innerHTML++;
        if (arrSelect.length > 0) {
          genWords(arrSelect);
        } else {
          goodLuck();
          upcomingWords.remove();
          saveData();
        }
      } else {
        badLuck();
      }
    }
  }, 1000);
}

function goodLuck() {
  let span = document.createElement("span");
  span.className = "good";
  span.appendChild(document.createTextNode("Congratulations"));
  finishMessage.appendChild(span);
}
function badLuck() {
  let span = document.createElement("span");
  span.className = "bad";
  span.appendChild(document.createTextNode("Game Over"));
  finishMessage.appendChild(span);
}

function saveData() {
  let myDate = new Date();
  const data = {
    date: {
      Hour: myDate.getHours(),
      day: myDate.getDate(),
      month: myDate.getMonth() + 1,
      year: myDate.getFullYear(),
    },
    level: defaultLevelName,
    score: scoreGot.innerHTML,
  };
  localArr.push(data);
  localStorage.setItem(defaultLevelName, JSON.stringify(localArr));
}
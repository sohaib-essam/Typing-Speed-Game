const words = [
  [
    // 3
    "Php",

    // 4
    "Code",
    "Town",
    "Task",
    "Test",
    "Rust",
    "Html",
  ],

  [
    // 5
    "Hello",
    "Scala",
    "Funny",
    "Roles",
    
    // 6
    "Github",
    "Coding",
    "Object",
    "Python",
    "Runner",
  ],
  
  [  // 7
    "Playing",
    "Country",
    "Testing",
    "Youtube",
    "Styling",
    "Cascade",
    "Working",
    "Twitter",
    // 8
    "Paradigm",
    "Linkedin",
    "Internet",
    "Leetcode",
  ],

  [
    // Equal To 10 Or more 
    "Programming",
    "Javascript",
    "Destructuring",
    "Documentation",
    "Dependencies",
    "Ecmascript"
  ]
];

const levels = {
  "Very Easy": 5,
  "Easy": 4,
  "Normal": 3,
  "Hard": 2
};

// Get Elements
let button = document.querySelector(".start");
let levelSpan = document.querySelector(".notes span.level");
let secondsSpan = document.querySelector(".notes span.seconds");
let currentWord = document.querySelector(".current-word")
let input = document.querySelector(".input");
let comingWordsDiv = document.querySelector(".coming-words");
let selectBox = document.querySelector("#select-box")
let timeLeft = document.querySelector(".time-left span");
let score = document.querySelector(".score span.acquired");
let maxScore = document.querySelector(".score span.max");
let message = document.querySelector(".message");
let rolesSpans = document.querySelectorAll(".message span.roles span");

let objKeys = Object.keys(levels);
// Add Options To Select Box
for (let i = 0; i < objKeys.length; i++) {
  let newOption = new Option(objKeys[i], objKeys[i]);
  if (newOption.value === "Normal") {
    // Add Selected Attr To Normal Option
    newOption.setAttribute("selected", "")
  }
  selectBox.add(newOption);
}

// Add Levels Time To Roles Div
let i = 0;
rolesSpans.forEach(span => {
  span.append(`${levels[objKeys[i]]}s Per Word`)
  i++;
});

let level =  selectBox.value;
let levelSeconds = levels[level];
let levelWords = words[objKeys.indexOf(level)];

levelSpan.innerHTML = `[ ${level} ]`;
secondsSpan.innerHTML = `[ ${levelSeconds} ]`;
timeLeft.innerHTML = levelSeconds + 3;
maxScore.innerHTML = levelWords.length;

function changeLevelsData(){
  level =  selectBox.value;
  levelSeconds = levels[level];
  levelWords = words[objKeys.indexOf(level)];

  levelSpan.innerHTML = `[ ${level} ]`;
  secondsSpan.innerHTML = `[ ${levelSeconds} ]`;
  timeLeft.innerHTML = levelSeconds + 3;
  maxScore.innerHTML = levelWords.length;
}

selectBox.addEventListener("change", changeLevelsData)

// Disable Pastinig On The Input
input.onpaste = () => false;

button.addEventListener("click", function () {
  this.remove();
  input.focus();
  generateWord()
})

let generateWord = () => {
  let randomWord = levelWords[Math.floor(Math.random() * levelWords.length)];
  let randomWordIndex = levelWords.indexOf(randomWord);

  currentWord.innerHTML = randomWord;

  // Remove Word From The Array
  levelWords.splice(randomWordIndex, 1);

  comingWordsDiv.innerHTML = '';
  for (let i = 0; i < levelWords.length; i++) {
    comingWordsDiv.append(typeClassContent("div", "", levelWords[i]))
  }

  game()
}

let game  = () => {
  let start = setInterval(() => {
    timeLeft.innerHTML--;
    // If Time Ended
    if (timeLeft.innerHTML <= 0) {
      clearInterval(start);

      // If The Word Is Correct
      if (currentWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {

        input.value = '';
        score.innerHTML++;

        // If words remain
        if (levelWords.length > 0) {
          generateWord();
          timeLeft.innerHTML = levelSeconds;
        }

        // If All Words Are Finished
        else {
          message.innerHTML = '';
          message.append(typeClassContent("span", "win", "You Win"));
          comingWordsDiv.innerHTML = "<span><span>Good Job</span> <i class='icon-fighter-jet'></i></span>";
          comingWordsDiv.style.alignItems = "center";
        }

      }

      // If Word Is False
      else {
        message.innerHTML = '';
        message.append(typeClassContent("span", "lose", "Game Over"));
      }

    }
  }, 1000)
}

let typeClassContent = (eleType, Class, Text = "") => {
  if (eleType === "" || eleType === undefined) eleType = "div";
  let ele = document.createElement(eleType.toLowerCase());
  let eleValue = document.createTextNode(Text);
  
  Class === undefined || Class === "" ? ele.className = Class : ele.classList.add(Class);
  ele.append(eleValue);
  return ele;
}
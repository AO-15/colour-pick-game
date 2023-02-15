const colourDisplay = document.querySelector("#colourDisplay");
const optionsContainer = document.querySelector("#optionsContainer");
const timerDisplay = document.querySelector("#timer");
const resetButton = document.querySelector("#resetButton");
const startButton = document.querySelector("#startButton");
const scoreDisplay = document.querySelector("#score");
const rules = document.querySelector(".rules")
const options = optionsContainer.querySelectorAll(".option");

const colours = [
  "red",
  "blue",
  "green",
  "purple",
  "orange",
  "brown",
  "pink",
  "yellow",
];

let score = 0;
let totalQuestions = 0;
let duration = 0;
let startTime;
let intervalId;
let matchCount = 0;

function startTimer() {
  startTime = new Date();
  intervalId = setInterval(updateTimer, 50);
}

function updateTimer() {
  const currentTime = new Date();
  duration = (currentTime - startTime) / 1000;
  timerDisplay.textContent = `Duration: ${duration} seconds`;
}

function stopTimer() {
  clearInterval(intervalId);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function shuffleArray(array) {
  // Fisher-Yates Shuffle Algorithm
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function resetOptions() {
  const options = optionsContainer.querySelectorAll(".option");
  let displayColour = colours[getRandomInt(0, colours.length - 1)];
  let colourOptions = [displayColour];

  // Select three more unique, random colours from the colours array and add it to the colourOptions
  while (colourOptions.length < 4) {
    let colour = colours[getRandomInt(0, colours.length - 1)];
    if (!colourOptions.includes(colour)) {
      colourOptions.push(colour);
    }
  }

  // Shuffle the colourOptions so they are in random options
  colourOptions = shuffleArray(colourOptions);

  // Render the colourOptions
  options.forEach((option, index) => {
    option.style.color = "black";
    option.textContent = colourOptions[index];
  });

  let match = false;
  const rand = Math.random();
  if (matchCount < 5 && rand < 0.5) {
    match = true;
    matchCount++;
  }

  // If there is a match, render the display option to have the same colour for the text and text colour
  if (match) {
    colourDisplay.style.color = displayColour;
    colourDisplay.textContent = displayColour;
  } else {
    // Else, the colour a random colour that is in the colourOptions should be selected that is NOT the same colour as the displayOption
    colourDisplay.textContent = displayColour
    let displayOptionColour = colourOptions.filter(c => c !== displayColour)[getRandomInt(0, 2)];
    colourDisplay.style.color = displayOptionColour;
  }
}


function resetGame() {
  totalQuestions++;
  if (totalQuestions === 16) {
    alert(`You have finished the game in ${duration} seconds and got ${score}/15!`);
    stopTimer();
    totalQuestions = 0;
    score = 0;
    timerDisplay.textContent = "Duration: 0 seconds";
    
  }
  scoreDisplay.textContent = `Score: ${score}`;
}

startButton.addEventListener("click", function () {
  rules.style.display = "none";
  startTimer();
  resetGame();
  resetOptions();

  options.forEach((option) => {
    option.addEventListener("click", function () {
      if (colourDisplay.style.color === option.textContent) {
        option.style.backgroundColor = 'green';
        score++;
        setTimeout(() => {
          option.style.backgroundColor = '';
          resetGame();
          resetOptions();
        }, 100);
      } else {
        option.style.backgroundColor = 'red';
        setTimeout(() => {
          option.style.backgroundColor = '';
          resetGame();
          resetOptions();
        }, 100);
      }
    });
  });
});

resetButton.addEventListener("click", function () {
  stopTimer();
  totalQuestions = 0;
  score = 0;
  timerDisplay.textContent = "Duration: 0 seconds";
  colourDisplay.textContent = ""
  colourDisplay.style.color = ""
  colourDisplay.innerHTML = "Display colour";
  optionsContainer.innerHTML = `
    <div class="option">Option 1</div>
    <div class="option">Option 2</div>
    <div class="option">Option 3</div>
    <div class="option">Option 4</div>
  `;

});




const letterButtons = document.querySelectorAll("#letters button");
const spans = document.querySelectorAll("span");
const playButton = document.getElementById("play");
const image = document.getElementById("img");
const result = document.getElementById("result");
const newWordContainer = document.getElementById("new-word");

let wordToFigure;
let userChosenLetter = "";
let missedShots = 0;
let rightShots = 0;
let goodCall = false;

const listOfGods = [
  "Dionysus",
  "Hermes",
  "Hephaestus",
  "Athena",
  "Zeus",
  "Hera",
  "Poseidon",
  "Demeter",
  "Dionysus",
  "Aphrodite",
  "Apollo",
  "Ares",
  "Artemis",
];

const getRandomValue = (arr) => arr[Math.floor(Math.random() * arr.length)];

const disableButton = (btn) => {
  btn.setAttribute("disabled", true);
};

const enableButton = (btn) => {
  btn.removeAttribute("disabled");
};

const gameOver = () => {
  enableButton(playButton);
  letterButtons.forEach((button) => disableButton(button));
};

const cleanResult = () => {
  console.clear();
  result.innerHTML = "";
  disableButton(playButton);
  missedShots = 0;
  rightShots = 0;
  letterButtons.forEach((button) => enableButton(button));
  const emptyLowDash = document.querySelectorAll("#new-word span");
  emptyLowDash.forEach((dash) => {
    dash.innerHTML = "";
    dash.remove();
  });
  setHangmanBodyPart(0);
};

const createGaps = () => {
  const randomGod = getRandomValue(listOfGods);
  for (let i = 0; i < randomGod.length; i++) {
    const span = document.createElement("span");
    newWordContainer.appendChild(span);
  }
  wordToFigure = randomGod;
};

const setHangmanBodyPart = (value) => {
  const source = `assets/img${value}.jpg`;
  image.setAttribute("src", source);
};

const saveUserChoice = () => {
  letterButtons.forEach((button) => {
    button.onclick = () => {
      const letter = button.textContent.toLowerCase();
      userChosenLetter = letter;
      // console.log(userChosenLetter);
      disableButton(button);

      for (let i = 0; i < wordToFigure.length; i++) {
        if (userChosenLetter !== wordToFigure[i]) {
          goodCall = false;
        }
      }

      fillInBlank();
    };
  });
};

const setRightCall = () => {
  rightShots++;
  goodCall = true;
  console.log("rightShots", rightShots);
};

const setBadCall = () => {
  missedShots++;
  console.log("missedShots", missedShots);
  setHangmanBodyPart(missedShots);
};

const defineScore = () => {
  if (missedShots === 7) {
    result.innerHTML = "You lose! The right word was " + wordToFigure;
    gameOver();
  }
  if (rightShots === wordToFigure.length) {
    result.innerHTML = "You win!";
    gameOver();
  }
};

const fillInBlank = () => {
  for (let i = 0; i < wordToFigure.length; i++) {
    if (wordToFigure[i].toLowerCase() === userChosenLetter.toLowerCase()) {
      const emptyLowDash = document.querySelectorAll("#new-word span");
      console.log(wordToFigure[i], "es igual a", userChosenLetter);
      emptyLowDash[i].innerHTML =
        userChosenLetter === wordToFigure[i].charAt(0)
          ? userChosenLetter
          : userChosenLetter.toUpperCase();
      setRightCall();
    }
  }
  if (goodCall == false) {
    setBadCall();
  }

  defineScore();
};

const start = () => {
  cleanResult();
  createGaps();
  saveUserChoice();
};

start();

playButton.onclick = () => {
  start();
};

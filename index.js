let chosenWord;
let missedShots = 0;
let rightShots = 0;
const listOfGods = ['Dionysus', 'Hermes', 'Hephaestus', 'Athena', 'Zeus', 'Hera', 'Poseidon', 'Demeter', 'Dionysus', 'Aphrodite', 'Apollo', 'Ares', 'Artemis'];
const btn = id('play');
const image = id('missed-img');
const btn_letters = document.querySelectorAll("#letters button");

btn.addEventListener('click', start);

function id(str) {
    return document.getElementById(str);
}

function get_random(num_min, num_max) {
    const range = num_max - num_min; 
    const randomValue = Math.floor(Math.random() * range) + num_min;
    return randomValue;
}

function start(event) {
    id('result').innerHTML = "";
    image.src = 'assets/img0.jpg';
    btn.disabled = true;
    missedShots = 0;
    rightShots = 0;

    const newWordSlot = id('new-word');
    newWordSlot.innerHTML = '';

    const numberOfGods = listOfGods.length;
    const randomValue = get_random(0, numberOfGods);

    chosenWord = listOfGods[randomValue];
    console.log(chosenWord);
    const cant_letters = chosenWord.length;
    
    for (let i = 0; i < btn_letters.length; i++) {
        btn_letters[i].disabled = false;
    }

    for (let i = 0; i < cant_letters; i++) {
        const span = document.createElement('span');
        newWordSlot.appendChild(span);
    }
}

for (let i = 0; i < btn_letters.length; i++) {
    btn_letters[i].addEventListener('click', click_letters);
}

function click_letters(event) {
    const spans = document.querySelectorAll('#new-word span');
    const button = event.target; //cuál letter llamó a la fx
    button.disabled = true;
    
    const letter = button.innerHTML.toLowerCase(); //contenido entre que abre y cierra tag
    const word = chosenWord.toLowerCase();

    let goodCall = false;
    for (let i = 0; i < word.length; i++) {
        if (letter == word[i]) {
            //la var i es la posición de la letter en la word
            //que coincide c el span al que hay que mostrar la letter
            spans[i].innerHTML = letter;
            rightShots++;
            goodCall = true;
        }
    }
    if (goodCall == false) {
        missedShots++;
        const source = `assets/img${missedShots}.jpg`;
        image.src = source;
    }

    if (missedShots == 7) {
        id('result').innerHTML = "You lose! The right word was " + chosenWord;
        game_over();

    } else if (rightShots == chosenWord.length) {
        id('result').innerHTML = "You win!";
        game_over();
    }
}

function game_over() {
    for (let i = 0; i < btn_letters.length; i++) {
        btn_letters[i].disabled = true;       
    }
    btn.disabled = false;
}

game_over();
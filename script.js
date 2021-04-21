var MAX_NUMBER;
var BOMBS_NUMBER = 16;
var bombsList = [];
var userNumbers = [];

// selettore difficoltà
var difficulty = parseInt(prompt("Inserisci un livello di difficoltà (0-1-2):"));
switch (difficulty) {
    case 0:
        MAX_NUMBER = 100;
        break;
    case 1:
        MAX_NUMBER = 80;
        break;
    case 2:
        MAX_NUMBER = 50;
        break;
    default:
        alert("Valore inserito non valido, difficoltà impostata atomaticamente a 0.")
        MAX_NUMBER = 100;
}

// creo le bombe
do {
    var randomNumber = Math.ceil(Math.random() * MAX_NUMBER);
    if (bombsList.indexOf(randomNumber) === -1) {
        bombsList.push(randomNumber);
    }
} while (bombsList.length < BOMBS_NUMBER)


var userLengthMax = MAX_NUMBER - BOMBS_NUMBER;
var gameOver = false;

while (userNumbers.length < userLengthMax && !gameOver) {
    var userInput = prompt("Inserisci un numero tra 1 e " + MAX_NUMBER + " senza ripetizioni: (" + userNumbers.length + " già inseriti)");

    // se esci dal prompt termina la partita
    if (userInput == null) {
        gameOver = true;
    }

    // controlla la validità dell'input
    var inputIsValid = checkUserInput(userInput);
    if (!inputIsValid && inputIsValid !== "game over") {
        alert("Numero inserito non valido!");
    } else if (inputIsValid === "game over") {
        gameOver = true;
    } else {
        userNumbers.push(parseInt(userInput));
    }

    // controlla se la partita è finita
    if (userNumbers.length === userLengthMax) {
        alert("Hai vinto!");
    } else if (gameOver === true) {
        alert("BOOM! Hai perso dopo aver inserito " + userNumbers.length + " numeri!");
    }
}

// dandogli un numero come input controlla che sia valido e non sia una bomba
function checkUserInput (num) {
    var result = true;
    var numberToCheck = parseInt(num);

    if (isNaN(numberToCheck)) {
        result = false;
    } else if (numberToCheck < 1 || numberToCheck > MAX_NUMBER) {
        result = false;
    } else if (userNumbers.indexOf(numberToCheck) > -1) {
        result = false;
    } else if (bombsList.indexOf(numberToCheck) > -1) {
        result = "game over";
    }
    return result;
}
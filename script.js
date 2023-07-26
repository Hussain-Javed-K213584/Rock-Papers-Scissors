// Main function will always be called
let playerScore = 0;
let computerScore = 0;
let roundsCompleted = 0;
let playerChoice = "";
let computerChoice = "";
const TOTAL_ROUNDS = 5;

const choices = ["Rock", "Paper", "Scissors"];
const buttonClassNames = ["rock-btn", "paper-btn", "scissor-btn"]
const buttonContainer = document.querySelector(".game-btn-container")
const winnerDisplayContainer = document.querySelector(".winner-display");
const winnerDisplayText = document.createElement("h1");
const loserDisplayText = document.createElement("h1");
const tieDisplayText = document.createElement("h1");

// Used to get buttons
let gameButtonArray = [];
for (let i = 0; i < 3; i++) {
    gameButtonArray.push(document.querySelector("."+buttonClassNames[i]))
}

// Here the player will choose any of the 3 buttons
playerSelection(gameButtonArray);

function decideWinner() {
    if (playerScore > computerScore) {
        winnerDisplayText.textContent = "Congratulations🥳 You Win 🎉";
        winnerDisplayContainer.appendChild(winnerDisplayText);
    }
    else if (computerScore > playerScore) {
        loserDisplayText.textContent = "Unlucky, You Lost 💀"
        winnerDisplayContainer.appendChild(loserDisplayText);
    }
    else {
        tieDisplayText.textContent = "😐 Tie 😐";
        winnerDisplayContainer.appendChild(tieDisplayText);
    }
}

function resetGame() {
    playerChoice = "";
    computerChoice = "";
    playerScore = 0;
    computerScore = 0;
    roundsCompleted = 0;
    if (document.contains(document.querySelector(".score-display"))) {
        removeNodeIfExists(document.querySelector(".score-display").className);
    }
    if (document.contains(document.querySelector(".tie-display"))) {
        removeNodeIfExists(document.querySelector(".tie-display").className);
    }
    const generateNewPara = document.createElement("p");
    const gameContainer = document.querySelector(".score-display-container");
    generateNewPara.className = "para prompt";
    generateNewPara.textContent = "Click on any of the choices to restart";
    gameContainer.appendChild(generateNewPara);

}

// Helper function to remove node if it exists

function removeNodeIfExists(nodeClassName) {
    if (document.contains(document.querySelector('.' + nodeClassName))) {
        document.querySelector('.' + nodeClassName).remove();
    }
}

function game(playerChoice, computerChoice) {
    if (document.contains(winnerDisplayText)) {
        winnerDisplayText.remove();
    }
    else if (document.contains(loserDisplayText)) {
        loserDisplayText.remove();
    }
    else if (document.contains(tieDisplayText)) {
        tieDisplayText.remove();
    }
    const gameContainer = document.querySelector(".score-display-container");
    if (document.contains(document.querySelector(".prompt"))) {
        document.querySelector(".prompt").remove();
    }
    const paragraph = document.createElement("p");
    const displayTie = document.createElement("p");
    paragraph.className = "score-display";
    displayTie.className = "tie-display";
    displayTie.textContent = "Tie, you both chose " + playerChoice;
    switch (true) {
        case (playerChoice == "rock" && computerChoice == "scissors"):
        case (playerChoice == "scissors" && computerChoice == "paper"):
        case (playerChoice == "paper" && computerChoice == "rock"):
        case (playerChoice == "scissors" && computerChoice == "paper"):
            playerScore++;
            paragraph.innerHTML = `Computer Score: ${computerScore}
            <br>Player Score: ${playerScore}<br>
            Rounds Completed: ${roundsCompleted + 1} out of ${TOTAL_ROUNDS}`;
            removeNodeIfExists(paragraph.className);
            gameContainer.appendChild(paragraph);
            removeNodeIfExists(displayTie.className);
            break;
        case (computerChoice == "rock" && playerChoice == "scissors"):
        case (computerChoice == "scissors" && playerChoice == "paper"):
        case (computerChoice == "paper" && playerChoice == "rock"):
        case (computerChoice == "scissors" && playerChoice == "paper"):
            computerScore++;
            paragraph.innerHTML = `Computer Score: ${computerScore}
            <br>Player Score: ${playerScore}<br>
            Rounds Completed: ${roundsCompleted + 1} out of ${TOTAL_ROUNDS}`;
            removeNodeIfExists(paragraph.className);
            gameContainer.appendChild(paragraph);
            removeNodeIfExists(displayTie.className);
            break;
        case (playerChoice == computerChoice):
            removeNodeIfExists(displayTie.className);
            removeNodeIfExists(paragraph.className);
            paragraph.innerHTML = `Computer Score: ${computerScore}
            <br>Player Score: ${playerScore}<br>
            Rounds Completed: ${roundsCompleted + 1} out of ${TOTAL_ROUNDS}`;
            gameContainer.appendChild(paragraph);
            gameContainer.appendChild(displayTie);
            break;
    }
    roundsCompleted++;
}

// Function to get player selection

function playerSelection(gameButtonArray) {
    gameButtonArray[0].addEventListener("click", () => {
        playerChoice = "rock";
        computerChoice = getComputerChoice();
        //Start the game after getting both computer and player choices
        game(playerChoice, computerChoice);
        console.log(playerChoice.concat(" ") + computerChoice)
        console.log("rounds compelted: ".concat(roundsCompleted));
        if (roundsCompleted == TOTAL_ROUNDS) {
            decideWinner();
            resetGame();
            return;
        }
    });
    gameButtonArray[1].addEventListener("click", () => {
        playerChoice = "paper";
        computerChoice = getComputerChoice();
        game(playerChoice, computerChoice);
        console.log(playerChoice.concat(" ") + computerChoice)
        console.log("rounds compelted: ".concat(roundsCompleted));
        if (roundsCompleted == TOTAL_ROUNDS) {
            decideWinner();
            resetGame();
            return;
        }
    });
    gameButtonArray[2].addEventListener("click", () => {
        playerChoice = "scissors";
        computerChoice = getComputerChoice();
        game(playerChoice, computerChoice);
        console.log(playerChoice.concat(" ") + computerChoice)
        console.log("rounds compelted: ".concat(roundsCompleted));
        if (roundsCompleted == TOTAL_ROUNDS) {
            decideWinner();
            resetGame();
            return;
        }
    });
}

// Function to get computer choice

function getComputerChoice() {
    let random = new Math.seedrandom();
    console.log(`Random value: ${random()}`)
    let choices = ["rock", "paper", "scissors"];
    let randomChoice = Math.floor(random() * 100); // return a random number from 0 - 3
    return choices[randomChoice % 3];
}
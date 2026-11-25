
// Rock Paper Scissors Game

// 1. Available moves

const moves = {

    rock: {
        name: "Rock",
        icon: "#hand-rock"
    },

    paper: {
        name: "Paper",
        icon: "#hand-paper"
    },

    scissors: {
        name: "Scissors",
        icon: "#hand-scissors"
    }

};


// 2. Game score

const score = {
    wins: 0,
    losses: 0,
    draws: 0
};


// 3. Select HTML elements

function getElement(id) {

    return document.getElementById(id);

}


// 4. Display hand illustrations

function showHand(containerId, move) {

    const container = getElement(containerId);

    container.innerHTML = `
        <svg class="hand-icon"
             viewBox="0 0 160 120"
             aria-hidden="true">

            <use href="${moves[move].icon}"></use>

        </svg>
    `;


    // Restart animation

    container.classList.remove("animate");

    void container.offsetWidth;

    container.classList.add("animate");

}


// 5. Calculate game result

function getRoundResult(playerMove, computerMove) {

    if (playerMove === computerMove) {

        return "draw";

    }


    const playerWins =

        (playerMove === "rock" &&
         computerMove === "scissors") ||

        (playerMove === "paper" &&
         computerMove === "rock") ||

        (playerMove === "scissors" &&
         computerMove === "paper");


    return playerWins ? "win" : "lose";

}


// 6. Main game function

function playGame(playerMove) {


    // Computer selects a random move

    const availableMoves = Object.keys(moves);

    const randomIndex = Math.floor(
        Math.random() * availableMoves.length
    );

    const computerMove = availableMoves[randomIndex];


    // Display both hands

    showHand("playerHand", playerMove);

    showHand("computerHand", computerMove);


    // Display selected moves

    getElement("playerMove").textContent =
        moves[playerMove].name;

    getElement("computerMove").textContent =
        moves[computerMove].name;


    // Calculate winner

    const outcome = getRoundResult(
        playerMove,
        computerMove
    );


    const resultBox = getElement("result");

    let heading = "";

    let description = "";


    // Win, Lose or Draw

    if (outcome === "win") {

        score.wins++;

        heading = "You win!";

        description =
            `${moves[playerMove].name} beats ${moves[computerMove].name}. Great move!`;

    }

    else if (outcome === "lose") {

        score.losses++;

        heading = "You lose!";

        description =
            `${moves[computerMove].name} beats ${moves[playerMove].name}. Try again!`;

    }

    else {

        score.draws++;

        heading = "It's a draw!";

        description =
            "You both selected the same weapon.";

    }


    // Display result

    resultBox.className = `result ${outcome}`;

    resultBox.innerHTML = `

        <h2>${heading}</h2>

        <p>${description}</p>

    `;


    // Update scoreboard

    updateScoreboard();

}


// 7. Update scoreboard

function updateScoreboard() {

    getElement("wins").textContent =
        score.wins;

    getElement("losses").textContent =
        score.losses;

    getElement("draws").textContent =
        score.draws;

}


// 8. Reset game

function resetGame() {


    // Reset all scores

    score.wins = 0;

    score.losses = 0;

    score.draws = 0;


    // Update scoreboard

    updateScoreboard();


    // Reset player hand

    getElement("playerHand").innerHTML = `

        <svg class="hand-icon" viewBox="0 0 160 120">

            <use href="#hand-rock"></use>

        </svg>

    `;


    // Reset computer hand

    getElement("computerHand").innerHTML = `

        <svg class="hand-icon" viewBox="0 0 160 120">

            <use href="#hand-rock"></use>

        </svg>

    `;


    // Reset move labels

    getElement("playerMove").textContent =
        "Waiting for your move";

    getElement("computerMove").textContent =
        "Ready to play";


    // Reset result message

    const resultBox = getElement("result");

    resultBox.className = "result";

    resultBox.innerHTML = `

        <h2>Choose your weapon</h2>

        <p>Make the first move to start the game.</p>

    `;

}


// 9. Add click events to game buttons

document.querySelectorAll(".weapon-btn").forEach(

    (button) => {

        button.addEventListener("click", () => {

            const playerMove = button.dataset.move;

            playGame(playerMove);

        });

    }

);


// 10. Reset button event

getElement("resetBtn").addEventListener(

    "click",

    resetGame

);

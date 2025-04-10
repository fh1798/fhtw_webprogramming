"use strict";
var GameState;
(function (GameState) {
    GameState[GameState["Waiting"] = 0] = "Waiting";
    GameState[GameState["FirstCardFlipped"] = 1] = "FirstCardFlipped";
    GameState[GameState["SecondCardFlipped"] = 2] = "SecondCardFlipped";
    GameState[GameState["CheckingMatch"] = 3] = "CheckingMatch";
    GameState[GameState["GameOver"] = 4] = "GameOver";
})(GameState || (GameState = {}));
let gameState = GameState.Waiting;
let firstCard = null;
let secondCard = null;
let flippedCards = [];
let matchedCards = 0;
let players = [];
let currentPlayerIndex = 0; // Tracks whose turn it is
let cards = []; // Array holding the cards
function shuffleCards(cards) {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]]; // Swap
    }
    return cards;
}
function flipCard(cardId) {
    if (gameState === GameState.CheckingMatch || flippedCards.length === 2) {
        return; // Ignore if already checking for a match or two cards flipped
    }
    const card = cards[parseInt(cardId.split('-')[1])]; // Find the card object
    if (card.isFlipped || card.isMatched) {
        return; // Don't flip if already flipped or matched
    }
    card.isFlipped = true;
    flippedCards.push(cardId);
    // Update the card view
    const cardElement = document.getElementById(cardId);
    if (cardElement) {
        cardElement.textContent = card.symbol;
        cardElement.classList.add('flipped'); // Add flipped class for styling
    }
    // Check for match after two cards are flipped
    if (flippedCards.length === 2) {
        gameState = GameState.CheckingMatch;
        checkForMatch();
    }
    else {
        gameState = GameState.FirstCardFlipped;
    }
}
function checkForMatch() {
    const [firstCardId, secondCardId] = flippedCards;
    const firstCardIndex = parseInt(firstCardId.split('-')[1]);
    const secondCardIndex = parseInt(secondCardId.split('-')[1]);
    if (cards[firstCardIndex].symbol === cards[secondCardIndex].symbol) {
        // If matched, mark as matched
        cards[firstCardIndex].isMatched = true;
        cards[secondCardIndex].isMatched = true;
        matchedCards++;
        // Update score for current player
        players[currentPlayerIndex].score++;
        // Check if the game is over
        if (matchedCards === cards.length / 2) {
            gameState = GameState.GameOver;
            showEndGame();
        }
    }
    else {
        // If no match, flip cards back after a short delay
        setTimeout(() => {
            cards[firstCardIndex].isFlipped = false;
            cards[secondCardIndex].isFlipped = false;
            updateBoard();
        }, 1000);
    }
    flippedCards = [];
    switchPlayer();
}
function updateBoard() {
    const gameBoard = document.getElementById('game-board');
    if (!gameBoard)
        return;
    gameBoard.innerHTML = ''; // Clear the board
    cards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.setAttribute('id', `card-${index}`);
        // Display symbol if the card is flipped or matched
        cardElement.textContent = card.isFlipped || card.isMatched ? card.symbol : '?';
        // Add event listener for flipping the card
        cardElement.addEventListener('click', () => flipCard(`card-${index}`));
        // Add flipped class if card is flipped
        if (card.isFlipped) {
            cardElement.classList.add('flipped');
        }
        // Add matched class if card is matched
        if (card.isMatched) {
            cardElement.classList.add('matched');
        }
        gameBoard.appendChild(cardElement);
    });
}
function switchPlayer() {
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    updateActivePlayer();
}
function updateActivePlayer() {
    const playerDisplay = document.getElementById('current-player');
    if (playerDisplay) {
        playerDisplay.textContent = `Current Player: ${players[currentPlayerIndex].name}`;
    }
}
function initializeGame(playerNames, numberOfPairs) {
    players = playerNames.map(name => ({ name, score: 0 }));
    gameState = GameState.Waiting;
    matchedCards = 0;
    flippedCards = [];
    // Create the deck of cards
    cards = [];
    const symbols = ['🍎', '🍌', '🍇', '🍍', '🍓', '🍉', '🍒', '🍊'];
    const selectedSymbols = symbols.slice(0, numberOfPairs);
    selectedSymbols.forEach(symbol => {
        cards.push({ symbol, isFlipped: false, isMatched: false });
        cards.push({ symbol, isFlipped: false, isMatched: false });
    });
    shuffleCards(cards);
    updateBoard();
}
function showEndGame() {
    const congratulationsMessage = document.getElementById('congratulations-message');
    const resetButtonContainer = document.getElementById('reset-button-container');
    if (congratulationsMessage) {
        congratulationsMessage.style.display = 'block';
        congratulationsMessage.textContent = `Game Over! Player ${players[currentPlayerIndex].name} wins!`;
    }
    if (resetButtonContainer) {
        resetButtonContainer.style.display = 'block';
    }
    const scoreBoard = document.getElementById('score-board');
    if (scoreBoard) {
        scoreBoard.innerHTML = ''; // Clear the old score board
        players.forEach(player => {
            const playerScoreElement = document.createElement('div');
            playerScoreElement.textContent = `${player.name}: ${player.score} points`;
            scoreBoard.appendChild(playerScoreElement);
        });
    }
}
// Start the game with default settings
initializeGame(['Player 1', 'Player 2'], 4); // Example with 4 pairs

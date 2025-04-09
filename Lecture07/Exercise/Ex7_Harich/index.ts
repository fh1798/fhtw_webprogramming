interface Card {
    symbol: string; // Card symbol, e.g., 🍎, 🍌
    isFlipped: boolean;
    isMatched: boolean;
}

interface Player {
    name: string;
    score: number;
}

enum GameState {
    Waiting,
    FirstCardFlipped,
    SecondCardFlipped,
    CheckingMatch,
    GameOver,
}

let gameState: GameState = GameState.Waiting;
let firstCard: Card | null = null;
let secondCard: Card | null = null;
let flippedCards: string[] = [];
let matchedCards: number = 0;
let players: Player[] = [];
let currentPlayerIndex: number = 0; // Tracks whose turn it is
let cards: Card[] = []; // Array holding the cards

// Function to handle the start of the game with the selected number of pairs
function setupGame(): void {
    const cardPairsSelect = document.getElementById('card-pairs') as HTMLSelectElement;
    const selectedPairs = parseInt(cardPairsSelect.value, 10);

    // Ensure that at least 2 pairs are selected, otherwise default to 4 pairs.
    if (selectedPairs < 2) {
        alert('Please select at least 2 card pairs.');
        return;
    }

    // Call initializeGame with selected number of pairs
    const playerNames = ['Player 1', 'Player 2']; // Default players for now (you could add more functionality for this)
    initializeGame(playerNames, selectedPairs);
}

// Add event listener for the "Start Game" button
const startGameButton = document.getElementById('start-game');
if (startGameButton) {
    startGameButton.addEventListener('click', setupGame);
}

function shuffleCards(cards: Card[]): Card[] {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]]; // Swap
    }
    return cards;
}

function flipCard(cardId: string): void {
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
    } else {
        gameState = GameState.FirstCardFlipped;
    }
}

function checkForMatch(): void {
    const [firstCardId, secondCardId] = flippedCards;
    const firstCardIndex = parseInt(firstCardId.split('-')[1]);
    const secondCardIndex = parseInt(secondCardId.split('-')[1]);

    const firstCardElement = document.getElementById(firstCardId);
    const secondCardElement = document.getElementById(secondCardId);

    if (cards[firstCardIndex].symbol === cards[secondCardIndex].symbol) {
        // If matched, mark as matched
        cards[firstCardIndex].isMatched = true;
        cards[secondCardIndex].isMatched = true;
        matchedCards++;

        // Update score for current player
        players[currentPlayerIndex].score++;

        // Update the card view to show it's a match
        if (firstCardElement) firstCardElement.classList.add('matched');
        if (secondCardElement) secondCardElement.classList.add('matched');

        // Check if the game is over
        if (matchedCards === cards.length / 2) {
            gameState = GameState.GameOver;
            showEndGame();
        } else {
            // Proceed to the next player's turn if game is not over
            setTimeout(() => {
                flippedCards = [];
                switchPlayer();
                gameState = GameState.Waiting; // Reset to waiting state
                updateBoard();
            }, 1000);
        }
    } else {
        // If no match, flip cards back after a short delay
        setTimeout(() => {
            cards[firstCardIndex].isFlipped = false;
            cards[secondCardIndex].isFlipped = false;

            // Update the board and remove flipped styles
            flippedCards = [];
            gameState = GameState.Waiting; // Reset to waiting state
            updateBoard();
        }, 1000);
    }
}

function updateBoard(): void {
    const gameBoard = document.getElementById('game-board');
    if (!gameBoard) return;
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

function switchPlayer(): void {
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    updateActivePlayer();
}

function updateActivePlayer(): void {
    const playerDisplay = document.getElementById('current-player');
    if (playerDisplay) {
        playerDisplay.textContent = `Current Player: ${players[currentPlayerIndex].name}`;
    }
}

function initializeGame(playerNames: string[], numberOfPairs: number): void {
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

function showEndGame(): void {
    const congratulationsMessage = document.getElementById('congratulations-message');
    const resetButtonContainer = document.getElementById('reset-button-container');

    if (congratulationsMessage) {
        congratulationsMessage.style.display = 'block';
        congratulationsMessage.textContent = `Game Over! Player ${players[currentPlayerIndex].name} wins!`;
    }

    if (resetButtonContainer) {
        resetButtonContainer.style.display = 'block';
    }

    // Optionally, show the final score of each player
    const scoreBoard = document.getElementById('score-board');
    if (scoreBoard) {
        scoreBoard.innerHTML = ''; // Clear the old score board
        players.forEach(player => {
            const playerScoreElement = document.createElement('div');
            playerScoreElement.textContent = `${player.name}: ${player.score} points`;
            scoreBoard.appendChild(playerScoreElement);
        });
    }

    // Optionally, you can disable further game interactions here (e.g., disable clicking cards)
}

function createBoard() {
    const gameBoard = document.getElementById('game-board');
    if (!gameBoard) return;

    gameBoard.innerHTML = '';

    cards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.setAttribute('id', `card-${index}`);
        cardElement.textContent = '?';

        // Add proper event listener instead of setAttribute
        cardElement.addEventListener('click', () => flipCard(`card-${index}`));

        gameBoard.appendChild(cardElement);
    });
}

// Make sure to initialize the game before creating the board.
initializeGame(['Player 1', 'Player 2'], 4);  // Example with 4 pairs

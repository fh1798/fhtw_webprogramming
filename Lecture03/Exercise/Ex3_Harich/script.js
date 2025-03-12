// Task 1
const cardSymbols = ['🍎', '🍌', '🍇', '🍍', '🍓', '🍉', '🍒', '🍊'];
const cards = [...cardSymbols, ...cardSymbols]; 

// Task 2: Shuffling
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
}

// Task 2: dynamic generation
function createBoard() {
    const gameBoard = document.getElementById('game-board');
    // Clear any existing cards before rendering new ones
    gameBoard.innerHTML = '';
    // Create card divs dynamically based on the shuffled card data
    cards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.setAttribute('id', `card-${index}`);
        cardElement.setAttribute('onclick', `flipCard('card-${index}')`);
        cardElement.textContent = '?'; // Initial hidden state
        // Append the card element to the game board
        gameBoard.appendChild(cardElement);
    });
}

// Task 3: array
let flippedCards = [];
let matchedCards = 0;

function flipCard(cardId) {
    if (flippedCards.length === 2) {
        return; // T3: flip max
    }
    let cardElement = document.getElementById(cardId);
    // Prevent flipping a card that's already flipped
    if (cardElement.classList.contains('flipped')) {
        return; 
    }

    // Flip the card by displaying its symbol
    const cardSymbol = cards[parseInt(cardId.split('-')[1])];
    cardElement.textContent = cardSymbol; // Show the symbol on the card
    cardElement.classList.add('flipped'); // Add a class to indicate it's flipped
    flippedCards.push(cardId); // Add the card to the flippedCards array

    // Check if two cards are flipped and need to be checked for a match
    if (flippedCards.length === 2) {
        checkForMatch();
    }
}

// Task 3
function checkForMatch() {
    const [firstCardId, secondCardId] = flippedCards;
    const firstCard = document.getElementById(firstCardId);
    const secondCard = document.getElementById(secondCardId);

    // Compare the values of the flipped cards
    if (cards[parseInt(firstCardId.split('-')[1])] === cards[parseInt(secondCardId.split('-')[1])]) {
        matchedCards++; // If matched, increase the matched pair count
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        if (matchedCards === cards.length / 2) {
            // If all pairs are matched, show the congratulations message
            document.getElementById('congratulations-message').style.display = 'block';
            document.getElementById('reset-button-container').style.display = 'block';
        }
    } else {
        // If no match, flip the cards back after 1 second
        setTimeout(() => {
            firstCard.textContent = '?';
            secondCard.textContent = '?';
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
        }, 1000); // 1-second delay before flipping back
    }

    flippedCards = []; // Reset flipped cards array
}

// Task 4
function resetGame() {
    // Reset matched cards count and flipped cards array
    matchedCards = 0;
    flippedCards = [];

    // Shuffle the cards to randomize them for a new game
    shuffle(cards);

    // Create the board with shuffled cards
    createBoard();

    // Hide the congratulations message and reset button
    document.getElementById('congratulations-message').style.display = 'none';
    document.getElementById('reset-button-container').style.display = 'none';
}

// Call the createBoard function to generate the game board dynamically after shuffling
createBoard();

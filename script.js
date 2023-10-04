const board = document.getElementById('board');
const winnerElement = document.getElementById('winner');
let currentPlayer = 'x';
let fields = [null, null, null, null, null, null, null, null, null];
let gameActive = true;

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function render() {
    board.innerHTML = '';
    fields.forEach((field, idx) => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        if (field) {
            cell.classList.add(field);
            cell.innerText = field.toUpperCase();
        }
        // Füge den Event-Listener nur hinzu, wenn das Spiel aktiv ist und das Feld noch nicht gesetzt wurde
        if (gameActive && !fields[idx]) {
            cell.addEventListener('click', () => handleClick(idx));
        }
        board.appendChild(cell);
    });
}


function checkWinner() {
    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
            gameActive = false;
            announceWinner(fields[a]);
            return;
        }
    }
}


function announceWinner(winner) {
    winnerElement.textContent = `The winner is: ${winner.toUpperCase()}`;
    winnerElement.style.display = 'block';
}

const currentPlayerDisplay = document.getElementById('currentPlayerDisplay');

function handleClick(index) {
    if (gameActive && !fields[index]) {
        fields[index] = currentPlayer;
        render();
        checkWinner();
        if(gameActive) {
            currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
            updateCurrentPlayerDisplay();
        }
    }
}

function updateCurrentPlayerDisplay() {
    currentPlayerDisplay.textContent = `Current Player: ${currentPlayer.toUpperCase()}`;
}


updateCurrentPlayerDisplay();
render();



let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const checkWinner = () => {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return gameBoard[a];
        }
    }

    return gameBoard.includes('') ? null : 'T';
};

const handleMove = (index) => {
    if (gameBoard[index] || !gameActive) return;

    gameBoard[index] = currentPlayer;
    document.getElementById(`cell${index}`).textContent = currentPlayer;

    playSound('boxClickSound');

    const winner = checkWinner();
    if (winner) {
        playSound('gameOverSound');
        alert(winner === 'T' ? 'It\'s a Tie!' : `Player ${winner} wins!`);
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
};

const resetGame = () => {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;

    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.textContent = '';
    });

    playSound('boxClickSound');
};

const playSound = (soundId) => {
    const sound = document.getElementById(soundId);
    sound.currentTime = 0;
    sound.play();
};

document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.id = `cell${i}`;
        cell.addEventListener('click', () => handleMove(i));
        board.appendChild(cell);
    }

    const resetButton = document.getElementById('resetButton');
    resetButton.addEventListener('click', resetGame);

    const footer = document.createElement('div');
    footer.classList.add('footer');
    footer.innerHTML = 'Coded and Created By Pranav Gaikwad</a>';
    document.body.appendChild(footer);
});
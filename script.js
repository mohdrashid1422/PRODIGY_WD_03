document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const restartButton = document.getElementById('restart-button');
    const gameMessageElement = document.getElementById('status');
    const player1Input = document.getElementById('player1');
    const player2Input = document.getElementById('player2');
    const popup = document.getElementById('popup');
    const popupMessage = document.getElementById('popup-message');

    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let gameActive = true;

    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]            // Diagonals
    ];

    function handleCellClick(event) {
        const cell = event.target;
        const index = parseInt(cell.dataset.index);

        if (board[index] !== '' || !gameActive) return;

        board[index] = currentPlayer;
        cell.innerHTML = `<span class="player-symbol">${currentPlayer}</span>`;

        checkResult();
        if (gameActive) {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            updateGameMessage();
        }
    }

    function checkResult() {
        let roundWon = false;
        let winningCombination;

        for (let condition of winningConditions) {
            let [a, b, c] = condition;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                roundWon = true;
                winningCombination = condition;
                break;
            }
        }

        if (roundWon) {
            gameActive = false;
            const winnerName = currentPlayer === 'X' ? (player1Input.value || 'Player 1') : (player2Input.value || 'Player 2');
            displayPopupMessage(`${winnerName} (${currentPlayer}) wins!`);
            return;
        }

        if (!board.includes('')) {
            gameActive = false;
            displayPopupMessage(`It's a draw!`);
        }
    }

    function displayPopupMessage(message) {
        popupMessage.textContent = message;
        popup.style.display = 'block';
    }

    function updateGameMessage() {
        gameMessageElement.textContent = `${currentPlayer === 'X' ? (player1Input.value || 'Player 1') : (player2Input.value || 'Player 2')}'s turn`;
    }

    function restartGame() {
        board = ['', '', '', '', '', '', '', '', ''];
        cells.forEach(cell => cell.innerHTML = '');
        popup.style.display = 'none';
        currentPlayer = 'X';
        gameActive = true;
        gameMessageElement.textContent = 'Game in progress...';
    }

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartButton.addEventListener('click', restartGame);
});

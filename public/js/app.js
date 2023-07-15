const squares = document.querySelectorAll('.square');
const reset = document.querySelector('.tic-button');
const playerOne = document.querySelector('#player-one');
const playerTwo = document.querySelector('#player-two');
let currentPlayer = 'X';
let currentPlayerName = playerOne.value;
const winPot = [
    [1, 2, 3], [4, 5, 6],
    [7, 8, 9], [1, 4, 7],
    [2, 5, 8], [3, 6, 9],
    [1, 5, 9], [3, 5, 7]
];

function checkTheWinner(player) {
    const playerSquares = [];
    squares.forEach((square, index) => {
        if (square.textContent === player) {
            playerSquares.push(index + 1);
        }
    });

    for (let winCondition of winPot) {
        if (winCondition.every(val => playerSquares.includes(val))) {
            return true;
        }
    }
    return false;
}

function highlightWinningLine(player) {
    const playerSquares = [];
    squares.forEach((square, index) => {
        if (square.textContent === player) {
            playerSquares.push(index + 1);
        }
    });

    for (let winCondition of winPot) {
        if (winCondition.every(val => playerSquares.includes(val))) {
            winCondition.forEach(index => {
                squares[index - 1].style.backgroundColor = '#f49c90df';
            });
            break;
        }
    }
}

squares.forEach(square => {
    square.addEventListener('click', () => {
        switch (true) {
            case square.textContent === '':
                square.textContent = currentPlayer;
                square.style.color = currentPlayer === 'X' ? 'rgb(40, 40, 212)' : 'black';
                if (checkTheWinner(currentPlayer)) {
                    setTimeout(() => {
                        highlightWinningLine(currentPlayer);
                        alert(currentPlayerName + ' wins!');
                    }, 100);
                } else {
                    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                    currentPlayerName = currentPlayer === 'X' ? playerOne.value : playerTwo.value;
                }
                break;
            default:
                break;
        }
    });
});

reset.addEventListener('click', () => {
    squares.forEach(square => {
        square.textContent = '';
        square.style.backgroundColor = '';
    });
    currentPlayer = 'X';
    currentPlayerName = playerOne.value;
});

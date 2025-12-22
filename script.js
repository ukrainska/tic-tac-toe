const buttons = document.querySelectorAll(".board button");
const resetB = document.querySelector("#resetG");

let gameOver = false;
let turnTables = false;

//IIFE module
const gameboard = (() => {
    let board = [
        ["_", "_", "_"],
        ["_", "_", "_"],
        ["_", "_", "_"],
    ];

    const get = () => board;
    const setCell = (r, c, val) => board[r][c] = val;
    const hasEmpty = () => board.some(row=> row.includes("_"));
    return {get, setCell, hasEmpty};
})();

//factory function
function GetSign () {
    return turnTables ? "o" : "x"; 
}

function GetRow(row) {
    switch(row) {
        case "first-line":
            return 0;
        case "second-line":
            return 1;
        case "third-line":
            return 2;
        default:
            break;
    }
}

function GetCol(col){
    switch(col) {
        case "left":
            return 0;
        case "center":
            return 1;
        case "right":
            return 2;
        default:
            break;
    }
}

function addToBoard(line, position) {
    const row = GetRow(line);
    const col = GetCol(position);
    const board = gameboard.get();
    if (board[row][col] !== "_") return null;
    const sign = GetSign();
    gameboard.setCell(row, col, sign);
    turnTables = (turnTables) ? false : true;
    return sign;
}

function getWinner(sign) {
    const board = gameboard.get();
    return checkRows(board, sign) || 
        checkColumns(board, sign) ||
        checkDiagonals(board, sign)
}

function checkRows (board, sign) {
    for (let i = 0; i < board.length; i++) {
        let points = 0;
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === sign) points++;
        }
        if (points === 3) return true;
    }
}

function checkColumns (board, sign) {
    for (let j = 0;j < board.length; j++) {
        let points = 0;
        for (let i = 0; i < board.length; i++) {
            if (board[i][j] === sign) points++;
        }
        if (points === 3) return true;
    }
}

function checkDiagonals(board, sign) {
    let d1 = 0, d2 = 0;
    for (let i = 0; i < board.length; i++) {
        if (board[i][i] === sign) d1++;
        if (board[i][2-i] === sign) d2++;
    }
    if (d1 === 3 || d2 === 3) return true; 
}

function ResetGame () {
    let board = gameboard.get();
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++)
        {
            board[i][j] = "_";
        }
    }
}


buttons.forEach(button => {
    button.addEventListener("click", function () {
        const row = this.parentElement.classList[0];
        const col = this.classList[0];
        sign = addToBoard(row, col);

        if (sign) {
            this.textContent = sign;
        }

        const message = "Congratulations, you won!";
        if (getWinner(sign)) alert(message);;
    });
});

resetB.addEventListener("click", function () {
    ResetGame();
    buttons.forEach(button => {
        button.textContent = null;
    })
})

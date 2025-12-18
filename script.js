const buttons = document.querySelectorAll(".board button");

let gameOver = false;
let turnTables = false;

//IIFE module
const gameboard = (() => {
    let board = [
        ["_", "_", "_"],
        ["_", "_", "_"],
        ["_", "_", "_"],
    ];
    return board;
})();

//factory function
function getSign () {
    const sign = (turnTables) ? "o" : "x"; 
    return {sign};
}

function getRow(row) {
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

function getCol(col){
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
    const row = getRow(line);
    const col = getCol(position);
    const sign = getSign().sign;
    gameboard[row][col] = sign;
    turnTables = (turnTables) ? false : true;
    return sign;
}

function checkTheGame() {
    const hasEmptyCell = gameboard.some(row => row.includes("_"));
    if (!hasEmptyCell ) {
        gameOver = true;
        console.log("over");
    }
}

buttons.forEach(button => {
    button.addEventListener("click", function () {
        const row = this.parentElement.classList[0];
        const col = this.classList[0];
        this.textContent = addToBoard(row, col);
    });
});


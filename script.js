
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
function createPlayer (name, number) {
    const playerName = name;
    const sign = (number === "1") ? "x" : "o";
    return {playerName, sign};
}

let gameOver = false;

const signX = "x";
const signO = "o";

function refreshGame () {
    gameboard.forEach ((row) => {
    console.log(row);
    });
}    

let turnTables = false;

/*while (!gameOver) {
    let sign = (turnTables) ? "o" : "x"; 
    let row = prompt("Please choose the row");
    let position = prompt("Please now choose the position");
    gameboard[row-1][position-1] = sign;
    refreshGame();
    turnTables = (turnTables) ? false : true;

    const hasEmptyCell = gameboard.some(row => row.includes("_"));
    if (!hasEmptyCell ) {
        gameOver = true;
        console.log("over");
    }
    console.log("**********");
}
*/
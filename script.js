
// Select all elements with class "cell"
const cells = document.querySelectorAll(".cell");

// Select the element with ID "statusText" 
const statusText = document.querySelector("#statusText");

// Select the element with ID "restartBtn"
const restartBtn = document.querySelector("#restartBtn");

// Define the winning conditions for the game
const winCondition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Initialize the game board and variables
let gameBoard = ["", "", "", "", "", "","", "", ""];
let currentPlayer = "X";
let running = false;

// Initialize the game with event listeners and status text
initializeGame();

// Function to initialize the game
function initializeGame(){
  // Add event listeners to each cell for click events
  cells.forEach(cell => cell.addEventListener("click", cellClicked));
  // Add event listeners to the restart button for click events
  restartBtn.addEventListener("click", restartGame);
  // Set the status text to display the current player's turn
  statusText.textContent = `${currentPlayer}'s turn`;
  // Set game to running
  running = true;
};

// Function to handle the click events on a cell
function cellClicked(){
  // Get the index of the clicked cell
  const cellIndex = this.getAttribute("cellIndex");

  // Check if the cell is already filled or the game is not running
  if(gameBoard[cellIndex] != "" ||!running){
     return;
  }

  // Update the cell and the game board
  updateCell(this, cellIndex);
  // Check if the current player has won the game
  checkWinner();
};

// Function to update the cell with the current player's symbol
function updateCell(cell, index){
  gameBoard[index] = currentPlayer;
  cell.textContent = currentPlayer;
};

// Fucntion to change the current player after each turn
function changePlayer(){
  currentPlayer = (currentPlayer == "X") ? "O" : "X";
  statusText.textContent = `${currentPlayer}'s turn`
};

// Function to check if there is a winner or if the game is a draw
function checkWinner(){
  let roundWon = false;

  // Iterate through each winning condition
  for(let i = 0; i < winCondition.length; i++){
    const condition = winCondition[i];
    const cellA = gameBoard[condition[0]];
    const cellB = gameBoard[condition[1]];
    const cellC = gameBoard[condition[2]];

    // Check if any cell in the current condition is empty

    if(cellA == "" || cellB == "" || cellC == ""){
      continue
    }
    // Check if all cells in the current condition have the same value
    if(cellA == cellB && cellB == cellC){
      roundWon = true;
      break;
    }
  }

  // Update the status text based on the game outcome
  if(roundWon){
    statusText.textContent = `${currentPlayer} wins!`;
    running = false;
  }
  else if(!gameBoard.includes("")){
    statusText.textContent = `Draw!`;
    running = false;
  }
  else{
    changePlayer();
  }
};

// Function to restart the game
function restartGame(){
  // Reset the current player to "X"
  currentPlayer = "X";
  // Reset the game board 
  gameBoard = ["", "", "", "", "", "","", "", ""];
  // Set the status tuext to display the current player's turn
  statusText.textContent = `${currentPlayer}'s turn`;
  // Clear the text content of all cells
  cells.forEach(cell => cell.textContent = "");
  // Set the game to running
  running = true;

};

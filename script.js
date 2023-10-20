document.addEventListener("DOMContentLoaded", () => {
  // Constants
  const gridSizeInput = document.getElementById("gridSize");
  const startGameButton = document.getElementById("startGame");
  const resetBoardButton = document.getElementById("resetBoard");
  const playerXScoreDisplay = document.getElementById("playerXScore");
  const playerOScoreDisplay = document.getElementById("playerOScore");
  const gameGrid = document.getElementById("gameGrid");

  let gridSize = 3; // Default grid size
  let currentPlayer = "X";
  let board = [];
  let playerXScore = 0;
  let playerOScore = 0;

  // Function to initialize the game
  function initializeGame() {
    gridSize = parseInt(gridSizeInput.value);
    resetBoard();
    createGrid();
  }

  // Function to create the game grid
  function createGrid() {
    gameGrid.innerHTML = "";
    gameGrid.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    for (let i = 0; i < gridSize; i++) {
      board[i] = [];
      for (let j = 0; j < gridSize; j++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.dataset.row = i;
        cell.dataset.col = j;
        cell.addEventListener("click", handleCellClick);
        gameGrid.appendChild(cell);
      }
    }
  }

  // Function to handle cell click
  function handleCellClick(event) {
    const cell = event.target;
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);

    if (!board[row][col]) {
      board[row][col] = currentPlayer;
      cell.innerText = currentPlayer;
      cell.classList.add(currentPlayer);

      if (checkWinner(row, col)) {
        if (currentPlayer === "X") {
          playerXScore++;
          playerXScoreDisplay.textContent = playerXScore;
        } else {
          playerOScore++;
          playerOScoreDisplay.textContent = playerOScore;
        }
        resetBoard();
      } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
      }
    }
  }

  // Function to check for a winner
  // Function to check for a winner
  function checkWinner(row, col) {
    const symbol = board[row][col];

    // Define the winning patterns
    const winPatterns = [
      [
        [0, 0],
        [0, 1],
        [0, 2],
      ], // Top row
      [
        [1, 0],
        [1, 1],
        [1, 2],
      ], // Middle row
      [
        [2, 0],
        [2, 1],
        [2, 2],
      ], // Bottom row
      [
        [0, 0],
        [1, 0],
        [2, 0],
      ], // Left column
      [
        [0, 1],
        [1, 1],
        [2, 1],
      ], // Middle column
      [
        [0, 2],
        [1, 2],
        [2, 2],
      ], // Right column
      [
        [0, 0],
        [1, 1],
        [2, 2],
      ], // Diagonal from top-left to bottom-right
      [
        [0, 2],
        [1, 1],
        [2, 0],
      ], // Diagonal from top-right to bottom-left
    ];

    for (const pattern of winPatterns) {
      const [a, b] = pattern[0];
      const [c, d] = pattern[1];
      const [e, f] = pattern[2];

      if (
        board[a][b] === symbol &&
        board[c][d] === symbol &&
        board[e][f] === symbol
      ) {
        return true; // Found a winning pattern
      }
    }

    return false; // No winning pattern found
  }

  // Function to reset the board
  function resetBoard() {
    board = [];
    currentPlayer = "X";
    gameGrid.innerHTML = "";
  }

  // Event listeners
  startGameButton.addEventListener("click", initializeGame);
  resetBoardButton.addEventListener("click", resetBoard);
});

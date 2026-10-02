// Short Circuit - keyboard controls
// Reads the maze that is already written in index.html and moves a "signal" through it.

(function () {
  const COLS = 15;

  const maze = document.querySelector(".maze");
  const cells = Array.from(maze.querySelectorAll(".cell"));
  const winScreen = maze.querySelector(".win");
  const resultText = document.getElementById("result");
  const movesText = document.getElementById("moves");
  const bumpsText = document.getElementById("bumps");

  const startIndex = cells.findIndex((c) => c.classList.contains("start"));
  const finishIndex = cells.findIndex((c) => c.classList.contains("finish"));
  const rows = cells.length / COLS;

  let position = startIndex;
  let moves = 0;
  let bumps = 0;
  let finished = false;

  // Turn on "JavaScript mode": CSS shows the key controls and ignores mouse hover.
  document.body.classList.add("js");

  function draw() {
    cells.forEach((c) => c.classList.remove("player"));
    cells[position].classList.add("player");
    movesText.textContent = moves;
    bumpsText.textContent = bumps;
  }

  function move(rowStep, colStep) {
    if (finished) return;

    const row = Math.floor(position / COLS) + rowStep;
    const col = (position % COLS) + colStep;

    // Ignore moves that leave the board.
    if (row < 0 || row >= rows || col < 0 || col >= COLS) return;

    const target = row * COLS + col;

    // Walls block the move and flash red.
    if (cells[target].classList.contains("wall")) {
      bumps++;
      cells[target].classList.add("hit");
      setTimeout(() => cells[target].classList.remove("hit"), 250);
      draw();
      return;
    }

    position = target;
    moves++;
    draw();

    if (position === finishIndex) {
      finished = true;
      resultText.textContent =
        "The lamp is lit in " + moves + " moves with " + bumps + " bumps.";
      winScreen.classList.add("show");
    }
  }

  function restart() {
    position = startIndex;
    moves = 0;
    bumps = 0;
    finished = false;
    winScreen.classList.remove("show");
    draw();
  }

  const keys = {
    ArrowUp: [-1, 0], w: [-1, 0], W: [-1, 0],
    ArrowDown: [1, 0], s: [1, 0], S: [1, 0],
    ArrowLeft: [0, -1], a: [0, -1], A: [0, -1],
    ArrowRight: [0, 1], d: [0, 1], D: [0, 1],
  };

  document.addEventListener("keydown", (event) => {
    if (event.key === "r" || event.key === "R") {
      restart();
      return;
    }
    const step = keys[event.key];
    if (step) {
      event.preventDefault(); // stops the arrow keys from scrolling the page
      move(step[0], step[1]);
    }
  });

  // On-screen buttons (for phones and tablets)
  const buttons = { up: [-1, 0], down: [1, 0], left: [0, -1], right: [0, 1] };
  document.querySelectorAll(".pad button").forEach((button) => {
    button.addEventListener("click", () => {
      const step = buttons[button.dataset.dir];
      move(step[0], step[1]);
    });
  });

  // The "Play again" link restarts without reloading the page.
  winScreen.querySelector(".btn").addEventListener("click", (event) => {
    event.preventDefault();
    restart();
  });

  draw();
})();

export const cells = ["", "", "", "", "", "", "", "", ""];

export const patterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const checkWin = (board) => {
  let result = "";
  patterns.forEach((pattern) => {
    const firstPlayer = board[pattern[0]];
    if (firstPlayer == "") return;
    let foundWinningPattern = true;
    pattern.forEach((idx) => {
      if (board[idx] != firstPlayer) {
        foundWinningPattern = false;
      }
    });
    if (foundWinningPattern) {
      result = { winner: board[pattern[0]], state: "won" };
    }
  });
  return result;
};

export const checkTie = (board) => {
  console.log(board);
  let filled = true;
  for (let cell in board) {
    if (board[cell] == "") {
      filled = false;
    }
  }
  return filled;
};

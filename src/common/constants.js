export const GAME_NAME = 'collab-sketch';
export const MIN_PLAYERS_REQUIRED = 3;
export const GameStatus = {
  WAITING: 0,
  STARTED: 1,
  ENDED: 2
}

export const Stage = {
  CHOOSE: 0,
  GUESS: 1,
  DRAW_CANVAS_ONE: 2,
  DRAW_CANVAS_TWO: 3,
  INACTIVE: 4
}

export const MessageType = {
  GUESS: "guess",
  GUESSED: "guessed",
  REVEAL: "reveal"
}
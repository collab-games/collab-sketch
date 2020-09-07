import find from 'lodash/find';
import some from "lodash/some";
import size from "lodash/size";
import {Stage} from "./constants";

export const firstCanvasPlayerIdFrom = (players) => firstCanvasPlayerFrom(players) && firstCanvasPlayerFrom(players).id;

export const firstCanvasPlayerFrom = (players) => find(players, ['stage', Stage.DRAW_CANVAS_ONE]);

export const secondCanvasPlayerFrom = (players) => find(players, ['stage', Stage.DRAW_CANVAS_TWO]);

export const artistIdFrom = (players) => {
  if (choosingPlayerIdFrom(players) !== undefined) {
    return choosingPlayerIdFrom(players);
  } else if (firstCanvasPlayerIdFrom(players) !== undefined) {
    return firstCanvasPlayerIdFrom(players);
  }
}

export const choosingPlayerIdFrom = (players) => choosingPlayerFrom(players) && choosingPlayerFrom(players).id;

export const choosingPlayerFrom = (players) => find(players, ['stage', Stage.CHOOSE]);

export const playerNames = players => Object.values(players).map(player => ({
  playerId: player.id,
  playerName: player.name
}));

export const nextChoosePlayer = (players) => {
  const currArtistId = artistIdFrom(players);
  if (currArtistId === undefined) {
    return 0;
  }
  const playerIds = Object.values(players).map(player => player.id).sort((prev, next) => prev-next);
  return playerIds[(playerIds.indexOf(currArtistId) + 1) % size(playerIds)];
};

export const resetStages = (players) => {
  Object.values(players).forEach(player => player.stage = Stage.INACTIVE);
}

export const isChoosingStage = players => some(Object.values(players), player => player.stage === Stage.CHOOSE);

export const isChoosingPlayer = (players, playerId) => isChoosingStage(players) && playerId === artistIdFrom(players);

export const playerFrom = (players, playerId) => find(players, ['id', playerId]);
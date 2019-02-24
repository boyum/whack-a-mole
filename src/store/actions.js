export const SET_GAME_STATE = 'SET_GAME_STATE';

export const SPAWN_MOLE = 'SPAWN_MOLE';
export const WHACK_MOLE = 'WHACK_MOLE';

export const RESET_ALL_MOLES = 'RESET_ALL_MOLES';
export const RESET_EXPIRED_MOLES = 'RESET_EXPIRED_MOLES';

export const SET_SPAWN_RATE = 'SET_SPAWN_RATE';
export const SET_GAME_SCORE = 'SET_GAME_SCORE';

export const GameStates = {
  RUNNING: 'RUNNING',
  PAUSED: 'PAUSED',
  PRE_START: 'PRE_START'
};

export function setGameState(gameState) {
  return {
    type: SET_GAME_STATE,
    gameState
  };
}

export function spawnMole(index, aliveUntil) {
  return {
    type: SPAWN_MOLE,
    index,
    aliveUntil
  };
}

export function whackMole(index) {
  return {
    type: WHACK_MOLE,
    index
  };
}

export function resetAllMoles() {
  return {
    type: RESET_ALL_MOLES
  };
}

export function resetExpiredMoles(currentTimeInMillis) {
  return {
    type: RESET_EXPIRED_MOLES,
    currentTimeInMillis
  };
}

export function setSpawnRate(spawnRate) {
  return {
    type: SET_SPAWN_RATE,
    spawnRate
  };
}

export function setGameScore(gameScore) {
  return {
    type: SET_GAME_SCORE,
    gameScore
  };
}

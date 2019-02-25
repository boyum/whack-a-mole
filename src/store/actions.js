export const SET_GAME_STATE = 'SET_GAME_STATE';

export const SPAWN_MOLE = 'SPAWN_MOLE';
export const WHACK_MOLE = 'WHACK_MOLE';
export const SET_MOLE_ACTIVE_ICON = 'SET_MOLE_ACTIVE_ICON';

export const RESET_ALL_MOLES = 'RESET_ALL_MOLES';
export const RESET_EXPIRED_MOLES = 'RESET_EXPIRED_MOLES';

export const SET_SPAWN_RATE = 'SET_SPAWN_RATE';
export const SET_MAX_LIFE_TIME = 'SET_MAX_LIFE_TIME';

export const SET_GAME_SCORE = 'SET_GAME_SCORE';
export const SET_TIME_WHEN_GAME_IS_OVER = 'SET_TIME_WHEN_GAME_IS_OVER';
export const SET_MAX_MOLES_ALIVE = 'SET_MAX_MOLES_ALIVE';

export const GameStates = {
  RUNNING: 'RUNNING',
  PAUSED: 'PAUSED',
  PRE_START: 'PRE_START',
  GAME_OVER: 'GAME_OVER'
};

export const MoleIcons = {
  DEFAULT: 'DEFAULT',
  WHACKED: 'WHACKED'
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

export function setMoleActiveIcon(activeIcon, index) {
  return {
    type: SET_MOLE_ACTIVE_ICON,
    activeIcon,
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

export function setMaxLifeTime(maxLifeTime) {
  return {
    type: SET_MAX_LIFE_TIME,
    maxLifeTime
  };
}

export function setTimeWhenGameIsOver(timeWhenGameIsOver) {
  return {
    type: SET_TIME_WHEN_GAME_IS_OVER,
    timeWhenGameIsOver
  };
}

export function setMaxMolesAlive(maxMolesAlive) {
  return {
    type: SET_MAX_MOLES_ALIVE,
    maxMolesAlive
  };
}

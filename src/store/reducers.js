import { combineReducers } from 'redux';
import {
  GameStates,
  SET_GAME_STATE,
  SPAWN_MOLE,
  WHACK_MOLE,
  RESET_ALL_MOLES,
  RESET_EXPIRED_MOLES,
  SET_SPAWN_RATE,
  SET_GAME_SCORE
} from './actions';

import Mole from '../models/mole';

const initialMoles = () => {
  return new Array(9).fill(new Mole());
};
const { PRE_START } = GameStates;

function gameState(state = PRE_START, action) {
  switch (action.type) {
    case SET_GAME_STATE:
      return action.gameState;
    default:
      return state;
  }
}

function moles(state = initialMoles(), action) {
  switch (action.type) {
    case SPAWN_MOLE:
      return state.map((mole, index) => {
        const isSpawnedMole = index === action.index;

        if (isSpawnedMole) {
          return {
            ...mole,
            isAlive: true,
            aliveUntil: action.aliveUntil
          };
        }

        return mole;
      });
    case WHACK_MOLE:
      return state.map((mole, index) => {
        const isWhackedMole = index === action.index;

        if (isWhackedMole) {
          return {
            ...mole,
            isAlive: false
          };
        }

        return mole;
      });
    case RESET_ALL_MOLES:
      return state.map(mole => ({
        ...mole,
        isAlive: false
      }));
    case RESET_EXPIRED_MOLES:
      return state.map(mole => {
        const moleIsExpired = mole.aliveUntil < action.currentTimeInMillis;

        if (moleIsExpired) {
          return {
            ...mole,
            isAlive: false
          };
        }

        return mole;
      });
    default:
      return state;
  }
}

function spawnRate(state = 2000, action) {
  switch (action.type) {
    case SET_SPAWN_RATE:
      return action.spawnRate;
    default:
      return state;
  }
}

function gameScore(state = 0, action) {
  switch (action.type) {
    case SET_GAME_SCORE:
      return action.gameScore;
    default:
      return state;
  }
}

const WhackAMoleGame = combineReducers({
  gameState,
  moles,
  spawnRate,
  gameScore
});

export default WhackAMoleGame;
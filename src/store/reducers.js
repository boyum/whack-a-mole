import { combineReducers } from 'redux';
import {
  GameStates,
  MoleIcons,
  SET_GAME_STATE,
  SPAWN_MOLE,
  WHACK_MOLE,
  RESET_ALL_MOLES,
  RESET_EXPIRED_MOLES,
  SET_SPAWN_RATE,
  SET_GAME_SCORE,
  SET_MAX_LIFE_TIME,
  SET_TIME_WHEN_GAME_IS_OVER,
  SET_MOLE_ACTIVE_ICON
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
    case SET_MOLE_ACTIVE_ICON:
      return state.map((mole, index) => {
        const updateThisMolesIcon = index === action.index;
        if (updateThisMolesIcon) {
          switch (action.activeIcon) {
            case MoleIcons.DEFAULT:
              return {
                ...mole,
                activeIcon: Mole.defaultIcon
              };
            case MoleIcons.WHACKED:
              return {
                ...mole,
                activeIcon: Mole.whackedIcon
              };
            default:
              return mole;
          }
        }

        return mole;
      });
    default:
      return state;
  }
}

function spawnRate(state = 1, action) {
  switch (action.type) {
    case SET_SPAWN_RATE:
      return action.spawnRate;
    default:
      return state;
  }
}

function maxLifeTime(state = 1500, action) {
  switch (action.type) {
    case SET_MAX_LIFE_TIME:
      return action.maxLifeTime;
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

function timeWhenGameIsOver(state = 0, action) {
  switch (action.type) {
    case SET_TIME_WHEN_GAME_IS_OVER:
      return action.timeWhenGameIsOver;
    default:
      return state;
  }
}

const WhackAMoleGame = combineReducers({
  gameState,
  moles,
  spawnRate,
  gameScore,
  maxLifeTime,
  timeWhenGameIsOver
});

export default WhackAMoleGame;

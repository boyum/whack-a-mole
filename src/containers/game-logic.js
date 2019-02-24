import { connect } from 'react-redux';

import {
  spawnMole,
  whackMole,
  resetAllMoles,
  GameStates,
  setGameState,
  resetExpiredMoles,
  setSpawnRate,
  setGameScore
} from '../store/actions';
import Game from '../components/game';

const mapStateToProps = state => {
  return {
    moles: state.moles,
    gameState: state.gameState,
    pauseButtonText: state.pauseButtonText,
    spawnRate: state.spawnRate,
    gameScore: state.gameScore
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onMoleClick: (index, gameScore) => {
      dispatch(whackMole(index));
      dispatch(setGameScore(gameScore));
    },
    spawnMole: (randomMoleIndex, aliveUntil) => {
      dispatch(spawnMole(randomMoleIndex, aliveUntil));
    },
    resetExpiredMoles: currentTimeInMills => {
      dispatch(resetExpiredMoles(currentTimeInMills));
    },
    onResetClick: () => {
      dispatch(setGameState(GameStates.PRE_START));
      dispatch(resetAllMoles());
      dispatch(setGameScore(0));
    },
    onPauseClick: () => {
      dispatch(setGameState(GameStates.PAUSED));
    },
    onStartClick: () => {
      dispatch(setGameState(GameStates.RUNNING));
    },
    setSpawnRate: spawnRate => {
      dispatch(setSpawnRate(spawnRate));
    }
  };
};

const GameLogic = connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);

export default GameLogic;

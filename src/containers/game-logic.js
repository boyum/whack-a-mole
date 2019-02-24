import { connect } from 'react-redux';

import {
  GameStates,
  MoleIcons,
  spawnMole,
  whackMole,
  resetAllMoles,
  setGameState,
  resetExpiredMoles,
  setSpawnRate,
  setGameScore,
  setMaxLifeTime,
  setTimeWhenGameIsOver,
  setMoleActiveIcon
} from '../store/actions';
import Game from '../components/game';

const mapStateToProps = state => {
  return {
    moles: state.moles,
    gameState: state.gameState,
    pauseButtonText: state.pauseButtonText,
    spawnRate: state.spawnRate,
    gameScore: state.gameScore,
    maxLifeTime: state.maxLifeTime,
    timeWhenGameIsOver: state.timeWhenGameIsOver
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onMoleClick: (index, gameScore) => {
      dispatch(setMoleActiveIcon(MoleIcons.WHACKED, index));
      dispatch(whackMole(index));
      dispatch(setGameScore(gameScore));
    },
    spawnMole: (index, aliveUntil) => {
      dispatch(setMoleActiveIcon(MoleIcons.DEFAULT, index));
      dispatch(spawnMole(index, aliveUntil));
    },
    resetExpiredMoles: currentTimeInMills => {
      dispatch(resetExpiredMoles(currentTimeInMills));
    },
    onRestartClick: timeWhenGameIsOver => {
      dispatch(resetAllMoles());
      dispatch(setGameScore(0));
      dispatch(setTimeWhenGameIsOver(timeWhenGameIsOver));
      dispatch(setGameState(GameStates.RUNNING));
    },
    onPauseClick: () => {
      dispatch(setGameState(GameStates.PAUSED));
    },
    onStartClick: timeWhenGameIsOver => {
      dispatch(setGameState(GameStates.RUNNING));
    },
    onGameOver: () => {
      dispatch(resetAllMoles());
      dispatch(setGameState(GameStates.GAME_OVER));
    },
    setSpawnRate: spawnRate => {
      dispatch(setSpawnRate(spawnRate));
    },
    setMaxLifeTime: maxLifeTime => {
      dispatch(setMaxLifeTime(maxLifeTime));
    },
    setTimeWhenGameIsOver: timeWhenGameIsOver => {
      dispatch(setTimeWhenGameIsOver(timeWhenGameIsOver));
    }
  };
};

const GameLogic = connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);

export default GameLogic;

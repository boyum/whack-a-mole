import React from 'react';
import PropTypes from 'prop-types';

import MoleView from './mole';
import GameTimer from './game-timer';
import GameScore from './game-score';

import { GameStates } from '../store/actions';

export default class Game extends React.Component {
  static propTypes = {
    moles: PropTypes.arrayOf(
      PropTypes.shape({
        isAlive: PropTypes.bool.isRequired
      }).isRequired
    ).isRequired,
    onMoleClick: PropTypes.func.isRequired,
    spawnMole: PropTypes.func.isRequired,
    resetExpiredMoles: PropTypes.func.isRequired,
    gameState: PropTypes.string.isRequired,
    onRestartClick: PropTypes.func.isRequired,
    onPauseClick: PropTypes.func.isRequired,
    onStartClick: PropTypes.func.isRequired,
    spawnRate: PropTypes.number.isRequired,
    setSpawnRate: PropTypes.func.isRequired,
    maxLifeTime: PropTypes.number.isRequired,
    setMaxLifeTime: PropTypes.func.isRequired,
    gameScore: PropTypes.number.isRequired,
    onGameOver: PropTypes.func.isRequired,
    timeWhenGameIsOver: PropTypes.number.isRequired,
    setTimeWhenGameIsOver: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.props = props;

    this.init();
  }

  init() {
    this.props.setSpawnRate(1);

    const doGameTick = () => {
      const gameIsPaused = this.props.gameState === GameStates.PAUSED;

      if (gameIsPaused) {
        return;
      }

      this.spawnMole();
      this.props.resetExpiredMoles(Date.now());
      this.checkIfGameOver();

      requestAnimationFrame(doGameTick);
    };

    doGameTick();
  }

  spawnMole() {
    const shouldSpawnMole =
      Math.random() < this.props.spawnRate * 0.015 &&
      this.props.gameState === GameStates.RUNNING;

    if (shouldSpawnMole) {
      const numberOfMoles = this.props.moles.length;
      const randomMoleIndex = Math.floor(Math.random() * numberOfMoles);
      const aliveUntil = Date.now() + this.props.maxLifeTime;

      this.props.spawnMole(randomMoleIndex, aliveUntil);
    }
  }

  checkIfGameOver() {
    const gameIsOver = this.props.timeWhenGameIsOver < Date.now();

    if (gameIsOver) {
      this.props.onGameOver();
    }
  }

  renderMoles() {
    const onClick = (index, isAlive) => {
      if (isAlive) {
        this.props.onMoleClick(index, this.props.gameScore + 1);
        this.props.setTimeWhenGameIsOver(this.props.timeWhenGameIsOver + 500);
      }
    };
    return this.props.moles.map((mole, index) => (
      <MoleView
        key={'mole-' + index}
        onClick={onClick.bind(null, index, mole.isAlive)}
        {...mole}
        isAlive={mole.isAlive}
        icon={mole.activeIcon}
      />
    ));
  }

  getGameClassName() {
    return `whack-a-mole whack-a-mole--${this.props.gameState.toLowerCase()}`;
  }

  render() {
    return (
      <div className={this.getGameClassName()}>
        <GameTimer
          timeLeft={Math.floor(
            (this.props.timeWhenGameIsOver - Date.now()) / 1000
          )}
          maxTime={20}
        />
        <button
          type="button"
          className="start-button"
          onClick={this.props.onStartClick}
        >
          Start
        </button>
        <button
          type="button"
          className="pause-button"
          onClick={this.props.onPauseClick}
        >
          Pause
        </button>
        <button
          type="button"
          className="restart-button"
          onClick={this.props.onRestartClick.bind(null, Date.now() + 20 * 1000)}
        >
          Restart
        </button>
        <div className="moles">{this.renderMoles()}</div>
        <GameScore score={this.props.gameScore} />
      </div>
    );
  }
}

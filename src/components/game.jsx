import React from 'react';
import PropTypes from 'prop-types';

import MoleView from './mole';

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
    onResetClick: PropTypes.func.isRequired,
    onPauseClick: PropTypes.func.isRequired,
    onStartClick: PropTypes.func.isRequired,
    spawnRate: PropTypes.number.isRequired,
    setSpawnRate: PropTypes.func.isRequired,
    gameScore: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);
    this.props = props;

    this.init();
  }

  init() {
    this.props.setSpawnRate(1500);

    const doGameTick = () => {
      this.spawnMole();
      this.props.resetExpiredMoles(Date.now());

      requestAnimationFrame(doGameTick);
    };

    doGameTick();
  }

  spawnMole() {
    const shouldSpawnMole =
      Math.random() < 0.01 && this.props.gameState === GameStates.RUNNING;

    if (shouldSpawnMole) {
      const numberOfMoles = this.props.moles.length;
      const randomMoleIndex = Math.floor(Math.random() * numberOfMoles);
      const aliveUntil = Date.now() + this.props.spawnRate;

      this.props.spawnMole(randomMoleIndex, aliveUntil);
    }
  }

  renderMoles() {
    const onClick = (index, isAlive) => {
      if (isAlive) {
        this.props.onMoleClick(index, this.props.gameScore + 1);
      }
    };
    return this.props.moles.map((mole, index) => (
      <MoleView
        key={'mole-' + index}
        onClick={onClick.bind(null, index, mole.isAlive)}
        {...mole}
        isAlive={mole.isAlive}
      />
    ));
  }

  getGameClassName() {
    return `whack-a-mole whack-a-mole--${this.props.gameState.toLowerCase()}`;
  }

  render() {
    return (
      <div className={this.getGameClassName()}>
        <div className="score">Score: {this.props.gameScore}</div>
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
          className="reset-button"
          onClick={this.props.onResetClick}
        >
          Reset
        </button>
        <div className="moles">{this.renderMoles()}</div>
      </div>
    );
  }
}

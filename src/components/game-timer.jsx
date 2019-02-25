import React from 'react';
import PropTypes from 'prop-types';

export default class GameTime extends React.Component {
  static propTypes = {
    timeLeft: PropTypes.number.isRequired,
    maxTime: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    const notYetStarted = this.props.timeLeft < 0;

    if (notYetStarted) {
      return null;
    }

    const scale = this.props.timeLeft / this.props.maxTime;

    let containerClassName = 'game-timer__container';
    const timeIsNearlyOver = scale < 0.25;
    if (timeIsNearlyOver) {
      containerClassName += ' game-timer__container--intense';
    }

    return (
      <div className={containerClassName}>
        <div
          className="game-timer__inner"
          style={{
            transform: `scaleX(${scale})`
          }}
        />
      </div>
    );
  }
}

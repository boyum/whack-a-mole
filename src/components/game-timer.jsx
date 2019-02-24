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

    return (
      <div className="game-timer__container">
        <div
          className="game-timer__inner"
          style={{
            transform: `scaleX(${this.props.timeLeft / this.props.maxTime})`
          }}
        />
      </div>
    );
  }
}

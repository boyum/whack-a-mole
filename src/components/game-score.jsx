import React from 'react';
import PropTypes from 'prop-types';

export default class GameScore extends React.Component {
  static propTypes = {
    score: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return <div className="score">Score: {this.props.score}</div>;
  }
}

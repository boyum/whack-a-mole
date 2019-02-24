import React from 'react';
import PropTypes from 'prop-types';

export default class MoleView extends React.Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    isAlive: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    let className = 'mole';

    if (this.props.isAlive) {
      className += ' mole--alive';
    }

    return (
      <button className={className} type="button" onClick={this.props.onClick}>
        <span className="mole__inner">
          <span role="img" aria-label="Mole">
            🎈
          </span>
        </span>
      </button>
    );
  }
}

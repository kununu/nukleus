import React, {Component, PropTypes} from 'react';

import styles from './index.scss';

export default class Button extends Component {
  static propTypes = {
    buttonStyle: PropTypes.oneOf(['default', 'primary', 'secondary', 'info', 'danger', 'link']),
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    outline: PropTypes.bool,
    text: PropTypes.string.isRequired
  };

  static defaultProps = {
    buttonStyle: 'primary',
    disabled: false,
    outline: false
  };

  onClickHandler = e => {
    e.preventDefault();

    if (this.props.disabled) return;

    this.props.onClick();
  }


  render () {
    return (
      <button
        className={`${styles.button} ${styles[this.props.buttonStyle]} ${this.props.outline && styles.outline} `}
        disabled={this.props.disabled}
        onClick={this.onClickHandler}>
        {this.props.text}
      </button>
    );
  }
}

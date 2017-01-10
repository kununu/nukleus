import React, {Component, PropTypes} from 'react';

import styles from './index.scss';

import {lighten, darken} from '../../utils/colorChanger';

export default class Button extends Component {
  static propTypes = {
    buttonStyle: PropTypes.object,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    outline: PropTypes.bool,
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['default', 'primary', 'secondary', 'info', 'danger', 'link', 'custom'])
  };

  static defaultProps = {
    disabled: false,
    outline: false,
    type: 'primary'
  };

  state = {
    isActive: false,
    isHovering: false
  }

  onClickHandler = e => {
    e.preventDefault();

    if (this.props.disabled) return;

    this.props.onClick();
  }

  onMouseOverHandler = e => {
    e.preventDefault();

    if (this.props.disabled) return;

    this.setState({isHovering: true});
  }

  onMouseOutHandler = e => {
    e.preventDefault();

    if (this.props.disabled) return;

    this.setState({isHovering: false});
  }

  onMouseDownHandler = e => {
    e.preventDefault();

    if (this.props.disabled) return;

    this.setState({isActive: true});
  }

  onMouseUpHandler = e => {
    e.preventDefault();

    if (this.props.disabled) return;

    this.setState({isActive: false});
  }

  render () {
    let style;
    if (this.props.type === 'custom') {
      style = {
        backgroundColor: this.props.buttonStyle.backgroundColor,
        color: this.props.buttonStyle.color
      };
      if (this.props.outline) {
        style.border = `1px solid ${this.props.buttonStyle.color}`;
      }

      if (!this.props.disabled) {
        if (this.state.isActive) {
          if (this.props.outline) {
            const color = lighten(this.props.buttonStyle.color, 5);
            style.border = `1px solid ${color}`;
            style.color = color;
          } else {
            const background = darken(this.props.buttonStyle.backgroundColor, 5);
            style.backgroundColor = background;
          }
        } else if (this.state.isHovering) {
          if (this.props.outline) {
            const color = darken(this.props.buttonStyle.color, 5);
            style.border = `1px solid ${color}`;
            style.color = color;
          } else {
            const background = lighten(this.props.buttonStyle.backgroundColor, 5);
            style.backgroundColor = background;
          }
        }
      }
    } else {
      style = {};
    }

    return (
      <button
        className={`${styles.button} ${styles[this.props.type]}${this.props.outline ? ` ${styles.outline}` : ''}`}
        style={style}
        disabled={this.props.disabled}
        onClick={this.onClickHandler}
        onMouseOver={this.onMouseOverHandler}
        onMouseOut={this.onMouseOutHandler}
        onMouseDown={this.onMouseDownHandler}
        onMouseUp={this.onMouseUpHandler}>
        {this.props.text}
      </button>
    );
  }
}

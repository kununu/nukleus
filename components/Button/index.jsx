import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import styles from './index.scss';

import {lighten, darken} from '../../utils/colorChanger';

export default class Button extends Component {
  static propTypes = {
    buttonStyle: PropTypes.object,
    disabled: PropTypes.bool,
    fullWidth: PropTypes.bool,
    link: PropTypes.string,
    mobileFullWidth: PropTypes.bool,
    onClick: PropTypes.func,
    outline: PropTypes.bool,
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['default', 'primary', 'secondary', 'info', 'danger', 'link', 'custom'])
  };

  static defaultProps = {
    disabled: false,
    fullWidth: false,
    mobileFullWidth: false,
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

    const props = {
      className: `${styles.button} ${styles[this.props.type]}${this.props.outline ? ` ${styles.outline}` : ''}${this.props.fullWidth ? ` ${styles.fullWidth}` : ''}${this.props.mobileFullWidth ? ` ${styles.mobileFullWidth}` : ''}`,
      disabled: this.props.disabled,
      onClick: this.props.onClick && this.onClickHandler,
      onMouseDown: this.props.type === 'custom' && this.onMouseDownHandler,
      onMouseOut: this.props.type === 'custom' && this.onMouseOutHandler,
      onMouseOver: this.props.type === 'custom' && this.onMouseOverHandler,
      onMouseUp: this.props.type === 'custom' && this.onMouseUpHandler,
      style
    };

    if (this.props.link && !this.props.disabled) {
      return (
        <Link
          {...props}
          to={this.props.link}>
          {this.props.text}
        </Link>
      );
    }
    return (
      <button
        {...props}>
        {this.props.text}
      </button>
    );
  }
}

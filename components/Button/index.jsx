import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import classNames from 'classnames';

import {lighten, darken} from 'utils/colorChanger';

import styles from './index.scss';

export default class Button extends Component {
  static propTypes = {
    customTheme: PropTypes.object,
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
    type: 'primary'
  };

  state = {
    isActive: false,
    isHovering: false
  }

  onClick = e => {
    e.preventDefault();

    if (this.props.disabled) return;

    this.props.onClick();
  }

  onMouseOver = () => {
    if (this.hasCustomMouseEvents()) return;

    this.setState({isHovering: true});
  }

  onMouseOut = () => {
    if (this.hasCustomMouseEvents()) return;

    this.setState({isHovering: false});
  }

  onMouseDown = () => {
    if (this.hasCustomMouseEvents()) return;

    this.setState({isActive: true});
  }

  onMouseUp = () => {
    if (this.hasCustomMouseEvents()) return;

    this.setState({isActive: false});
  }

  getCustomStyles = () => {
    const {
      customTheme,
      disabled,
      outline
    } = this.props;

    const {
      isActive,
      isHovering
    } = this.state;

    const style = {};

    style.backgroundColor = customTheme.backgroundColor;
    style.color = customTheme.color;

    if (outline) {
      style.border = `1px solid ${customTheme.color}`;
    }

    if (disabled) {
      return style;
    }

    if (isActive) {
      if (outline) {
        const color = lighten(customTheme.color, 5);
        style.border = `1px solid ${color}`;
        style.color = color;
      } else {
        style.backgroundColor = darken(customTheme.backgroundColor, 5);
      }
      return style;
    }

    if (isHovering) {
      if (outline) {
        const color = darken(customTheme.color, 5);
        style.border = `1px solid ${color}`;
        style.color = color;
      } else {
        style.backgroundColor = lighten(customTheme.backgroundColor, 5);
      }
    }

    return style;
  }

  hasCustomMouseEvents = () => this.props.disabled || this.props.type !== 'custom'

  render () {
    const {
      disabled,
      fullWidth,
      link,
      mobileFullWidth,
      outline,
      text,
      type
    } = this.props;

    const style = type === 'custom' ? this.getCustomStyles() : {};

    const classes = classNames({
      [styles.button]: true,
      [styles.fullWidth]: fullWidth,
      [styles.mobileFullWidth]: mobileFullWidth,
      [styles.outline]: outline,
      [styles[type]]: true
    });

    const props = {
      className: classes,
      disabled,
      onClick: this.props.onClick && this.onClick,
      onMouseDown: this.onMouseDown,
      onMouseOut: this.onMouseOut,
      onMouseOver: this.onMouseOver,
      onMouseUp: this.onMouseUp,
      style
    };

    if (link && !disabled) {
      return (
        <Link
          {...props}
          to={link}>
          {text}
        </Link>
      );
    }

    return (
      <button
        {...props}>
        {text}
      </button>
    );
  }
}

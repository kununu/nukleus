import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import classNames from 'classnames';

import styles from './index.scss';

export default class Button extends Component {
  static propTypes = {
    customTheme: PropTypes.string,
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

  render () {
    const {
      customTheme,
      disabled,
      fullWidth,
      link,
      mobileFullWidth,
      outline,
      text,
      type
    } = this.props;

    const classes = classNames({
      [styles.button]: true,
      [styles.fullWidth]: fullWidth,
      [styles.mobileFullWidth]: mobileFullWidth,
      [styles.outline]: outline,
      [type === 'custom' ? customTheme : styles[type]]: true
    });

    const props = {
      className: classes,
      disabled,
      onClick: this.props.onClick && this.onClick
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

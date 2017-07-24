import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './index.scss';

export default class Button extends React.Component {
  static propTypes = {
    customTheme: PropTypes.string,
    disabled: PropTypes.bool,
    fullWidth: PropTypes.bool,
    htmlType: PropTypes.oneOf([
      'button',
      'submit',
      'reset'
    ]),
    link: PropTypes.element,
    mobileFullWidth: PropTypes.bool,
    onClick: PropTypes.func,
    outline: PropTypes.bool,
    text: PropTypes.string,
    type: PropTypes.oneOf(['default', 'primary', 'secondary', 'info', 'danger', 'link', 'custom'])
  };

  static defaultProps = {
    customTheme: '',
    disabled: false,
    fullWidth: false,
    htmlType: 'submit',
    link: null,
    mobileFullWidth: false,
    onClick: null,
    outline: false,
    text: '',
    type: 'primary'
  };

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
      htmlType,
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

    if (link) {
      return (
        <div className={disabled ? styles.disabledLink : ''}>
          {React.cloneElement(link, props)}
        </div>
      );
    }

    return (
      <button
        {...props}
        type={htmlType}>
        {text}
      </button>
    );
  }
}

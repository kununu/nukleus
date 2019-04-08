import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import ThemeContext from 'utils/themeContext';
import themeable from 'utils/theming';

import styles from './index.scss';

export default class Button extends React.Component {
  static propTypes = {
    customTheme: PropTypes.string,
    disabled: PropTypes.bool,
    fullWidth: PropTypes.bool,
    htmlType: PropTypes.oneOf([
      'button',
      'submit',
      'reset',
    ]),
    link: PropTypes.element,
    mobileFullWidth: PropTypes.bool,
    onClick: PropTypes.func,
    outline: PropTypes.bool,
    text: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.string,
    ]),
    title: PropTypes.string,
    type: PropTypes.oneOf(['default', 'primary', 'secondary', 'info', 'danger', 'link', 'custom']),
    id: PropTypes.string,
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
    title: null,
    type: 'primary',
    id: null,
  };

  onClick = (e) => {
    const {
      disabled,
      onClick,
    } = this.props;

    e.preventDefault();

    if (disabled) return;

    onClick();
  }

  render () {
    const {
      customTheme,
      disabled,
      fullWidth,
      link,
      mobileFullWidth,
      onClick,
      outline,
      text,
      htmlType,
      title,
      type,
      id,
    } = this.props;

    const classes = classNames({
      button: true,
      fullWidth: fullWidth,
      mobileFullWidth: mobileFullWidth,
      outline: outline,
      [type === 'custom' ? customTheme : type]: true,
    }).split(' ')

    return (
      <ThemeContext.Consumer>
        {(context) => {
          const theme = themeable({...styles, ...context})

          const props = {
            className: theme(...classes),
            disabled,
            title,
            onClick: onClick && this.onClick,
            id,
          };

          if (link) {
            return (
              <div className={disabled ? styles.disabledLink : ''}>
                {React.cloneElement(link, props)}
              </div>
            );
          }

          return (
            <button // eslint-disable-line react/button-has-type
              {...props}
              type={htmlType}
            >
              {text}
            </button>
          );
        }}
      </ThemeContext.Consumer>
    );
  }
}

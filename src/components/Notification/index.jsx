import React from 'react';
import PropTypes from 'prop-types';

import ThemeContext from 'utils/themeContext';
import themeable from 'utils/theming';

import styles from './index.module.scss';

export default class Notification extends React.Component {
  static propTypes = {
    closeIcon: PropTypes.element,
    closeMethod: PropTypes.oneOf(['onClick', 'onTimeout']),
    duration: PropTypes.number,
    icon: PropTypes.element,
    message: PropTypes.string.isRequired,
    onClose: PropTypes.func,
    onCloseClick (props, propName) { // eslint-disable-line
      if (props[propName]) {
        return new Error('This prop is marked as deprecated and will be removed on upcoming release. ' +
          'Please use `onClose` instead.');
      }
    },
    type: PropTypes.oneOf([
      'error',
      'success',
    ]),
    visible: PropTypes.bool,
  };

  static defaultProps = {
    closeIcon: (
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 68.3 61.2"
        xmlSpace="preserve"
      >
        <path
          d="M55,43.3c0,0.9-0.3,1.7-1,2.4l-4.8,4.8c-0.7,0.7-1.5,1-2.4,1c-0.9,0-1.7-0.3-2.4-1L34.1,40.2L23.8,50.5
            c-0.7,0.7-1.5,1-2.4,1c-0.9,0-1.7-0.3-2.4-1l-4.8-4.8c-0.7-0.7-1-1.5-1-2.4s0.3-1.7,1-2.4l10.3-10.3L14.2,20.3
            c-0.7-0.7-1-1.5-1-2.4s0.3-1.7,1-2.4l4.8-4.8c0.7-0.7,1.5-1,2.4-1c0.9,0,1.7,0.3,2.4,1L34.1,21l10.3-10.3c0.7-0.7,1.5-1,2.4-1
            c0.9,0,1.7,0.3,2.4,1l4.8,4.8c0.7,0.7,1,1.5,1,2.4s-0.3,1.7-1,2.4L43.7,30.6L54,40.9C54.7,41.6,55,42.4,55,43.3z"
        />
      </svg>
    ),
    closeMethod: 'onClick',
    duration: 5000,
    icon: null,
    onClose: () => {},
    type: 'success',
    visible: false,
  };

  state = {visible: this.props.visible}; // eslint-disable-line react/destructuring-assignment

  UNSAFE_componentWillReceiveProps (nextProps) { // eslint-disable-line
    if (this.newNotificationWillOverrideExisting(nextProps.message)) {
      // Briefly set visible state to false to show animation again
      this.setState({visible: false});
      setTimeout(() => this.setState({visible: true}), 100);
    } else {
      this.setState({visible: nextProps.visible});
    }
  }

  componentWillUnmount () {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  onClickClose = () => {
    const {onClose} = this.props;

    this.hideNotification();
    onClose();
  };

  onTimeout () {
    const {
      closeMethod,
      onClose,
    } = this.props;

    if (closeMethod === 'onTimeout') {
      this.hideNotification();
      onClose();
    }
  }

  newNotificationWillOverrideExisting (message) {
    const {
      message: pmessage,
      visible,
    } = this.props;

    return (
      visible &&
      pmessage !== message
    );
  }

  hideNotification () {
    this.setState({visible: false});
  }

  isError () {
    const {type} = this.props;

    return type === 'error';
  }

  render () {
    const {
      closeIcon,
      closeMethod,
      duration,
      icon,
      message,
    } = this.props;

    const {visible} = this.state;

    if (visible) {
      this.timeout = setTimeout(() => {
        this.onTimeout();
      }, duration);
    }

    return (
      <ThemeContext.Consumer>
        {(context) => {
          const theme = themeable({...styles, ...context});

          return (
            <div
              className={theme('notificationContainer', `${visible ? 'visible' : 'hidden'}`, `${this.isError() ? 'notificationError' : ''}`)}
            >

              <p>
                {closeMethod === 'onClick' && (
                <button
                  className={theme('notificationCloseButton')}
                  onClick={this.onClickClose}
                  type="button"
                >
                  {closeIcon}
                </button>
                )}

                {icon && (
                <span className={theme('notificationIcon')}>
                  {icon}
                </span>
                )}

                {message}
              </p>
            </div>
          );
        }}
      </ThemeContext.Consumer>
    );
  }
}

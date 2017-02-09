import React, {Component, PropTypes} from 'react';

import styles from './index.scss';

export default class Notification extends Component {
  static propTypes = {
    closeMethod: PropTypes.oneOf(['onClick', 'onTimeout']),
    duration: PropTypes.number,
    icons: React.PropTypes.shape({
      error: React.PropTypes.element,
      success: React.PropTypes.element
    }),
    message: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['ERROR', 'SUCCESS']),
    visible: PropTypes.bool
  };

  static defaultProps = {
    closeMethod: 'onClick',
    duration: 5000,
    icons: {},
    message: '',
    type: 'SUCCESS',
    visible: false
  }

  state = {
    visible: this.props.visible
  };

  componentWillReceiveProps (nextProps) {
    if (this.newNotificationWillOverrideExisting(
      nextProps.message
    )) {
      // Briefly set visible state to false to show animation again
      this.setState({visible: false});
      setTimeout(() => this.setState({visible: true}), 100);
    } else {
      this.setState({visible: nextProps.visible});
    }
  }

  onClickClose = () => {
    this.hideNotification();
  };

  onTimeout () {
    if (this.props.closeMethod === 'onTimeout') this.hideNotification();
  }

  newNotificationWillOverrideExisting (message) {
    return (
      this.props.visible &&
      this.props.message !== message
    );
  }

  hideNotification () {
    this.setState({visible: false});
  }

  isError () {
    return this.props.type === 'ERROR';
  }

  render () {
    const {
      duration,
      icons,
      message,
      visible
    } = this.props;

    if (visible && !this.isError()) {
      setTimeout(() => {
        this.onTimeout();
      }, duration);
    }

    return (
      <div
        className={`
          ${styles.container}
          ${styles[this.state.visible ? 'visible' : 'hidden']}
          ${this.isError() && styles.error}
        `}>

        <p>
          {this.props.closeMethod === 'onClick' &&
            <button
              className={styles.closeButton}
              onClick={this.onClickClose}>
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                viewBox="0 0 68.3 61.2"
                xmlSpace="preserve">
                <path
                  d="M55,43.3c0,0.9-0.3,1.7-1,2.4l-4.8,4.8c-0.7,0.7-1.5,1-2.4,1c-0.9,0-1.7-0.3-2.4-1L34.1,40.2L23.8,50.5
                    c-0.7,0.7-1.5,1-2.4,1c-0.9,0-1.7-0.3-2.4-1l-4.8-4.8c-0.7-0.7-1-1.5-1-2.4s0.3-1.7,1-2.4l10.3-10.3L14.2,20.3
                    c-0.7-0.7-1-1.5-1-2.4s0.3-1.7,1-2.4l4.8-4.8c0.7-0.7,1.5-1,2.4-1c0.9,0,1.7,0.3,2.4,1L34.1,21l10.3-10.3c0.7-0.7,1.5-1,2.4-1
                    c0.9,0,1.7,0.3,2.4,1l4.8,4.8c0.7,0.7,1,1.5,1,2.4s-0.3,1.7-1,2.4L43.7,30.6L54,40.9C54.7,41.6,55,42.4,55,43.3z" />
              </svg>
            </button>}

          {!this.isError() && icons.success &&
            <span className={styles.success}>
              {icons.success}
            </span>
          }

          {this.isError() && icons.error &&
            <span className={styles.error}>
              {icons.error}
            </span>
          }

          {message}
        </p>
      </div>
    );
  }
}

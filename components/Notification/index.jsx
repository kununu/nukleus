import React, {Component, PropTypes} from 'react';

import styles from './index.scss';

export default class Notification extends Component {
  static propTypes = {
    closeMethod: PropTypes.oneOf(['onClick', 'onTimeout']),
    duration: PropTypes.number,
    message: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['ERROR', 'SUCCESS']),
    visible: PropTypes.bool
  };

  static defaultProps = {
    closeMethod: 'onClick',
    duration: 5000,
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
      visible,
      message,
      duration
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
              className={`fa fa-times ${styles.closeButton}`}
              onClick={this.onClickClose} />}

          <span>
            {!this.isError() &&
              <i className={`fa fa-check ${styles.success}`} />}
          </span>

          {message}
        </p>
      </div>
    );
  }
}

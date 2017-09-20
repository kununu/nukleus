import React from 'react';
import PropTypes from 'prop-types';
import AriaModal from 'react-aria-modal';
import classNames from 'classnames';

import styles from './index.scss';

import Button from '../Button';

export default class Modal extends React.Component {

  static propTypes = {
    actionText: PropTypes.string,
    cancelText: PropTypes.string,
    children: PropTypes.element.isRequired,
    closeText: PropTypes.string,
    onAction: PropTypes.func, // This should be a promise, so that onExit can be executed on success (nicer animation)
    onExit: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    titleText: PropTypes.string.isRequired
  }

  static defaultProps = {
    actionText: '',
    cancelText: '',
    closeText: 'Close',
    onAction: () => {},
    verticallyCenter: true
  };

  state = {
    modalHasEntered: false
  };

  onAction = ev => {
    this.props.onAction(ev)
      .then(() => this.onExit());
  }

  onExit = ev => {
    // First set state for nicer animation
    this.setState({
      modalHasEntered: false
    }, () => {
      setTimeout(() => {
        // Call parent onExit
        this.props.onExit(ev);
      }, 300);
    });
  }

  onModalEnter = () => {
    this.setState({modalHasEntered: true});
  }

  renderFooter () {
    const {
      actionText,
      cancelText
    } = this.props;

    if (actionText || cancelText) {
      return (
        <footer className={styles.modalFooter}>
          {actionText && <Button
            type="primary"
            text={actionText}
            onClick={this.onAction} />}
          {cancelText && <Button
            type="secondary"
            text={cancelText}
            onClick={this.onExit} />}
        </footer>
      );
    }

    return null;
  }

  render () {
    return (
      this.props.open ? <AriaModal
        {...this.props}
        onExit={this.onExit}
        underlayClass={
          classNames(
            styles.underlay,
            {
              [styles.underlayHasEntered]: this.state.modalHasEntered
            }
          )
        }
        onEnter={this.onModalEnter}>
        <section className={
          classNames(
            styles.modal,
            {
              [styles.modalHasEntered]: this.state.modalHasEntered
            }
          )}>
          <header className={styles.modalHeader}>
            <span className={styles.modalTitle}>
              {this.props.titleText}
            </span>
            <button
              type="button"
              className={styles.closeButton}
              onClick={this.onExit}>
              <span role="presentation">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.closeIcon}
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  xmlSpace="preserve"
                  version="1.1"
                  width="100%"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 16 16">
                  <title>{this.props.closeText}</title>
                  <path d="M9,7 L9,3.55271368e-15 L7,3.55271368e-15 L7,7 L7.10542736e-15,7 L7.10542736e-15,9 L7,9 L7,16 L9,16 L9,9 L16,9 L16,7 L9,7 Z" transform="translate(8.000000, 8.000000) rotate(-45.000000) translate(-8.000000, -8.000000) " />
                </svg>
              </span>
            </button>
          </header>
          <div className={styles.modalBody}>{this.props.children}</div>
          {this.renderFooter()}
        </section>
      </AriaModal> : null
    );
  }
}

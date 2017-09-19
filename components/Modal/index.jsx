import React from 'react';
import PropTypes from 'prop-types';
import AriaModal from 'react-aria-modal';

import styles from './index.scss';

import Button from '../Button';

export default class Modal extends React.Component {

  static propTypes = {
    children: PropTypes.element.isRequired,
    onClose: PropTypes.func.isRequired,
    onSuccess: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    titleText: PropTypes.string.isRequired
  }

  static defaultProps = {
    focusDialog: true,
    verticallyCenter: true
  };

  render () {
    return (
      this.props.open ? <AriaModal
        {...this.props}>
        <section className={styles.modal}>
          <header>
            <span className={styles.modalTitle}>
              {this.props.titleText}
            </span>

            <button
              className={styles.closeButton}
              onClick={this.props.onClose}>
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
                  <path d="M9,7 L9,3.55271368e-15 L7,3.55271368e-15 L7,7 L7.10542736e-15,7 L7.10542736e-15,9 L7,9 L7,16 L9,16 L9,9 L16,9 L16,7 L9,7 Z" transform="translate(8.000000, 8.000000) rotate(-45.000000) translate(-8.000000, -8.000000) " />
                </svg>
              </span>
            </button>
          </header>
          <div className={styles.modalBody}>{this.props.children}</div>
          <footer className={styles.modalFooter}>
            <Button
              type="primary"
              text="Annehmen"
              onClick={this.props.onSuccess} />
            <Button
              type="secondary"
              text="Abbrechen"
              onClick={this.props.onClose} />
          </footer>
        </section>
      </AriaModal> : null
    );
  }
}

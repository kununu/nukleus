import React from 'react';
import PropTypes from 'prop-types';
import AriaModal from 'react-aria-modal';

import ThemeContext from 'utils/themeContext';
import themeable from 'utils/theming';

import Button from '../Button';

import styles from './index.module.scss';


export default class Modal extends React.Component {
  static propTypes = {
    actionText: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
    ]),
    cancelText: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
    ]),
    children: PropTypes.element.isRequired,
    closeText: PropTypes.string,
    onAction: PropTypes.func, // This should be a promise, so that onExit can be executed on success (nicer animation)
    onExit: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    titleText: PropTypes.string.isRequired,
  }

  static defaultProps = {
    actionText: '',
    cancelText: '',
    closeText: 'Close',
    onAction: () => {},
  };

  constructor (props) {
    super(props);

    this.state = {isOpen: false};

    // needed to have real binding to get tests working
    this.onExit = this.onExit.bind(this);
    this.onAction = this.onAction.bind(this);
    this.onEnter = this.onEnter.bind(this);
  }

  onAction (ev) {
    const {onAction} = this.props;

    onAction(ev)
      .then(() => this.onExit());
  }

  onExit (ev) {
    // First set state for nicer animation
    this.setState({isOpen: false}, () => {
      setTimeout(() => {
        // Call parent onExit
        const {onExit} = this.props;

        onExit(ev);
      }, 250); // Time until animation has finished
    });
  }

  onEnter () {
    this.setState({isOpen: true});
  }

  renderFooter (theme) {
    const {
      actionText,
      cancelText,
    } = this.props;

    if (actionText || cancelText) {
      return (
        <footer className={theme('modalFooter')}>
          {actionText && (
          <Button
            htmlType="button"
            onClick={this.onAction}
            text={actionText}
            type="primary"
            id="nukleus-modal-action-btn"
          />
          )}
          {cancelText && (
          <Button
            htmlType="button"
            onClick={this.onExit}
            text={cancelText}
            type="secondary"
            id="nukleus-modal-cancel-btn"
          />
          )}
        </footer>
      );
    }

    return null;
  }

  render () {
    const {
      isOpen,
    } = this.state;
    const {
      children,
      closeText,
      open,
      titleText,
    } = this.props;

    const titleId = 'nukleus-modal-title'; // will be used for aria-labelledby
    const underlayClass = isOpen ? 'underlayHasEntered' : '';
    const isOpenClass = isOpen ? 'modalIsOpen' : '';
    const overrideProps = {
      ...this.props,
      titleId,
      verticallyCenter: true, // here we override react-aria-modal defaults
    };

    return (
      <ThemeContext.Consumer>
        {(context) => {
          const theme = themeable({...styles, ...context});

          return (
            open ? (
              <AriaModal
                {...overrideProps}
                onExit={this.onExit}
                underlayClass={theme('underlay', underlayClass)}
                onEnter={this.onEnter}
              >
                <section className={theme('modal', isOpenClass)}>
                  <header className={theme('modalHeader')}>
                    <h1
                      id={titleId}
                      className={theme('modalTitle')}
                    >
                      {titleText}
                    </h1>
                    <button
                      className={theme('modalCloseButton')}
                      id="nukleus-modal-close"
                      onClick={this.onExit}
                      title={closeText}
                      type="button"
                    >
                      <span role="presentation">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={theme('modalCloseIcon')}
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          xmlSpace="preserve"
                          version="1.1"
                          width="100%"
                          preserveAspectRatio="xMidYMid meet"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M9,7 L9,3.55271368e-15 L7,3.55271368e-15 L7,7 L7.10542736e-15,7 L7.10542736e-15,9 L7,9 L7,16 L9,16 L9,9 L16,9 L16,7 L9,7 Z"
                            transform="translate(8.000000, 8.000000) rotate(-45.000000) translate(-8.000000, -8.000000) "
                          />
                        </svg>
                      </span>
                    </button>
                  </header>
                  <div className={theme('modalBody')}>{children}</div>
                  {this.renderFooter(theme)}
                </section>
              </AriaModal>
            ) : null
          );
        }}
      </ThemeContext.Consumer>
    );
  }
}

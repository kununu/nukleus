import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {isBrowser} from 'utils/executionEnvironment';

import styles from './index.scss';

export default class DropDown extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.element),
      PropTypes.element
    ]).isRequired,
    direction: PropTypes.oneOf(['up', 'down']),
    pullRight: PropTypes.bool,
    showOnHover: PropTypes.bool,
    title: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ]).isRequired,
    type: PropTypes.oneOf(['default', 'countrySwitcher'])
  }

  static defaultProps = {
    direction: 'down',
    pullRight: false,
    showOnHover: true,
    type: 'default'
  }

  state = {isOpen: false}

  componentDidMount () {
    if (!isBrowser) return;

    document.addEventListener('click', this.handleClickOutside, false);
    document.addEventListener('touchend', this.handleClickOutside, false);
  }

  componentWillUnmount () {
    if (!isBrowser) return;

    document.removeEventListener('click', this.handleClickOutside, false);
    document.removeEventListener('touchend', this.handleClickOutside, false);
  }

  onMouseEnter = () => {
    const {showOnHover} = this.props;

    if (!showOnHover) return;

    this.open();
  }

  onMouseLeave = () => {
    const {showOnHover} = this.props;

    if (!showOnHover) return;

    this.close();
  }

  onClick = () => this.setState({isOpen: !this.state.isOpen});

  handleClickOutside = e => {
    if (this.node.contains(e.target)) return;

    setTimeout(() => {
      this.close();
    }, 100);
  }

  open = () => this.setState({isOpen: true});

  close = () => this.setState({isOpen: false});

  render () {
    const {
      children,
      direction,
      pullRight,
      title,
      type
    } = this.props;
    const {isOpen} = this.state;

    return (
      <div className={`${styles.container} ${styles[direction]} ${pullRight ? styles.pullRight : ''} ${type === 'countrySwitcher' ? styles.countrySwitcher : ''}`}>
        <button
          type="button"
          id="dropdown"
          className={styles.toggleButton}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
          onClick={this.onClick}
          ref={node => this.node = node}
          aria-haspopup="listbox"
          aria-expanded={isOpen}>
          {title}
        </button>

        {isOpen &&
          <ul
            className={styles.itemsList}
            onMouseEnter={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}
            aria-labelledby="dropdown"
            role="listbox"
            tabIndex={0}>
            {children}
          </ul>
        }
      </div>
    );
  }
}

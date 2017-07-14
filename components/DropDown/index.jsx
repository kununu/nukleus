import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.scss';

import {isBrowser} from '../../utils/executionEnvironment';
import {
  clearfix
} from '../index.scss';

export default class Dropdown extends React.Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
      active: PropTypes.boolean,
      icon: PropTypes.element,
      link: PropTypes.element.isRequired,
      value: PropTypes.string.isRequired
    })).isRequired,
    position: PropTypes.oneOf(['top', 'bottom']),
    shade: PropTypes.oneOf(['light', 'dark'])
  };

  static defaultProps = {
    position: 'top',
    shade: 'light'
  };

  state = {
    isOpen: false
  };

  componentWillMount () {
    if (!isBrowser) return;
    document.addEventListener('click', this.onClickDocument, false);
    document.addEventListener('touchend', this.onClickDocument, false);
  }

  componentWillUnmount () {
    if (!isBrowser) return;
    document.removeEventListener('click', this.onClickDocument, false);
    document.removeEventListener('touchend', this.onClickDocument, false);
  }

  onButtonClick = () => {
    this.setState({isOpen: !this.state.isOpen});
  }

  onClickDocument = e => {
    if (this.isButtonElement(e)) return;
    this.setState({isOpen: false});
  }

  getActiveItem () {
    return this.props.items.filter(item => item.active)[0];
  }

  getItem = item => (
    <span className={clearfix}>
      <span className={styles.pullLeft}>
        {item.value}
      </span>
      {item.icon ?
        <span className={styles.pullRight}>
          {item.icon}
        </span>
        : ''}
    </span>
  )

  isButtonElement (e) {
    return this.node.contains(e.target);
  }

  render () {
    const {
      items,
      position,
      shade
    } = this.props;
    const activeItem = this.getActiveItem();

    return (
      <div className={`${styles.container} ${styles[position]}`}>
        <button
          ref={node => this.node = node}
          className={`${styles.selection} ${clearfix} ${styles[shade]}`}
          onClick={this.onButtonClick}>
          {activeItem.value}
          {activeItem.icon ?
            <span className={styles.pullRight}>
              {activeItem.icon}
            </span>
            : ''}
        </button>
        <ul className={`${styles.menu} ${this.state.isOpen ? styles.open : ''}`}>
          {items.map(item =>
            <li // eslint-disable-line
              key={item.value}
              className={`${styles.item} ${clearfix}`}>
              {React.cloneElement(item.link, [], this.getItem(item))}
            </li>
          )}
        </ul>
      </div>
    );
  }
}

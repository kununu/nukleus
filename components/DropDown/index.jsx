import React, {PropTypes, Component} from 'react';

import styles from './index.scss';

import {
  clearfix
} from '../index.scss';

export default class Dropdown extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
      active: PropTypes.Bool,
      icon: PropTypes.element,
      link: PropTypes.element,
      value: PropTypes.string.isRequired
    })).isRequired,
    position: PropTypes.oneOf(['top', 'bottom']),
    shade: PropTypes.oneOf(['light', 'dark'])
  };

  static defaultProps = {
    position: 'top',
    shade: 'light'
  }

  state = {
    isMounted: true,
    isOpen: false,
    selected: this.getSelection()
  }

  componentWillMount () {
    document.addEventListener('click', this.onClickDocument, false);
    document.addEventListener('touchend', this.onClickDocument, false);
  }

  componentWillUnmount () {
    document.removeEventListener('click', this.onClickDocument, false);
    document.removeEventListener('touchend', this.onClickDocument, false);
  }

  onButtonClick = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  onItemClick = item => {
    this.setState({
      selected: item
    });
  }

  onClickDocument = e => {
    if (this.state.isMounted && !this.isButtonElement(e)) {
      this.setState({
        isOpen: false
      });
    }
  }

  getSelection () {
    const selected = this.props.items.filter(item => item.active);
    return selected[0] ? selected[0] : this.props.items[0];
  }

  getItem = item => (
    <span>
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

    return (
      <div className={`${styles.container} ${styles[position]}`}>
        <button
          ref={node => this.node = node}
          className={`${styles.selection} ${clearfix} ${styles[shade]}`}
          onClick={this.onButtonClick}>
          {this.state.selected.value}
          {this.state.selected.icon ?
            <span className={styles.pullRight}>
              {this.state.selected.icon}
            </span>
          : ''}
        </button>
        <ul className={`${styles.menu} ${this.state.isOpen ? styles.open : ''}`}>
          {items.map(item =>
            <li // eslint-disable-line
              key={item.value}
              className={`${styles.item} ${clearfix}`}
              onClick={() => this.onItemClick(item)}>
              {item.link ?
                  React.cloneElement(item.link, [], this.getItem(item))
                  : this.getItem(item)
                }
            </li>
          )}
        </ul>
      </div>
    );
  }
}

import React, {PropTypes, Component} from 'react';

import styles from './index.scss';

import {
  clearfix
} from '../index.scss';

export default class Dropdown extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
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
    document.addEventListener('click', this.handleDocumentClick, false);
    document.addEventListener('touchend', this.handleDocumentClick, false);
  }

  componentWillUnmount () {
    document.removeEventListener('click', this.handleDocumentClick, false);
    document.removeEventListener('touchend', this.handleDocumentClick, false);
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

  handleDocumentClick = e => {
    if (this.state.isMounted && !this.isButtonElement(e)) {
      this.setState({
        isOpen: false
      });
    }
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

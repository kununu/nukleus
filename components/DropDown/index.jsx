import React, {PropTypes, Component} from 'react';

import styles from './index.scss';

import {isBrowser} from '../../utils/executionEnvironment';
import {
  clearfix
} from '../index.scss';

export default class Dropdown extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
      icon: PropTypes.element,
      link: PropTypes.element.isRequired,
      value: PropTypes.string.isRequired
    })).isRequired,
    pathname: PropTypes.string.isRequired,
    position: PropTypes.oneOf(['top', 'bottom']),
    shade: PropTypes.oneOf(['light', 'dark'])
  };

  static defaultProps = {
    position: 'top',
    shade: 'light'
  }

  state = {
    isOpen: false
  }

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
    const {pathname, items} = this.props;
    return items.filter(item => {
      const {props} = item.link;
      // Depending on which link it is (from react-router, from react-server, simple link) we need to access the local pathname according to the respective API
      const localPathname = props.href || props.path || props.to.pathname;
      return (pathname === localPathname);
    })[0];
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

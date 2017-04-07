import React, {Component, PropTypes} from 'react';

import styles from './index.scss';

import {clearfix} from '../index.scss';


export default class Tabs extends Component {
  static propTypes = {
    hash: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.element).isRequired,
    pathname: PropTypes.string.isRequired
  };

  static defaultProps = {
    hash: ''
  };

  getNewProps (item) {
    const {props} = item;
    const itemHash = props.to && props.to.hash ? props.to.hash : '';
    const rootHash = this.props.hash;

    // Depending on which link it is (from react-router, from react-server, simple link) we need to access the local pathname according to the respective API
    const localPathname = props.href || props.path || props.to.pathname;

    const newProps = `${localPathname}${itemHash}` === `${this.props.pathname}${rootHash}` ? {className: styles.active} : {};

    return newProps;
  }

  render () {
    const {items} = this.props;
    return (
      <ul className={`${styles.tabs} ${clearfix}`}>
        {items.map((item, key) => (
          <li
            key={key} // eslint-disable-line react/no-array-index-key
            className={items.length > 1 ? '' : styles.pointerDisabled}>
            {React.cloneElement(item, this.getNewProps(item))}
          </li>
        ))}
      </ul>
    );
  }
}

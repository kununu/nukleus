import React, {Component, PropTypes} from 'react';

import styles from './index.scss';

import {clearfix} from '../index.scss';


export default class Tabs extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.element).isRequired,
    pathname: PropTypes.string.isRequired
  };

  getNewProps (item) {
    const {props} = item;

    // Depending on which link it is (from react-router, from react-server, simple link) we need to access the local pathname according to the respective API
    const hash = props.to ? props.to.hash : '';
    const localPathname = props.href || props.path || props.to.pathname;

    const newProps = `${localPathname}${hash}` === `${this.props.pathname}${hash}` ? {className: styles.active} : {};

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

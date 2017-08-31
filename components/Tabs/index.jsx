import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.scss';

import {clearfix} from '../index.scss';

/**
 * Remove all classes that are undefined or empty strings from array
 *
 * @param {Array} classNames
 */
function getValidClassNames (classNames) {
  return classNames.reduce((acc, className) => {
    if (className) {
      acc.push(className);
    }

    return acc;
  }, []);
}

function getTabLinkClassName (item, additionalClass) {
  return getValidClassNames(
    [
      item.props.className,
      styles.tabLink,
      additionalClass
    ],
  ).join(' ');
}

function getTabItemClassName (additionalClass) {
  return getValidClassNames(
    [
      styles.tabItem,
      additionalClass
    ]
  ).join(' ');
}

export default class Tabs extends React.Component {
  static propTypes = {
    hash: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.element).isRequired,
    pathname: PropTypes.string.isRequired,
    theme: PropTypes.oneOf(['default', 'block'])
  };

  static defaultProps = {
    hash: '',
    theme: 'default'
  };

  getNewProps (item) {
    const {props} = item;
    const itemHash = props.to && props.to.hash ? props.to.hash : '';
    const rootHash = this.props.hash;
    console.log(props);

    // Depending on which link it is (from react-router, from react-server, simple link) we need to access the local pathname according to the respective API
    const localPathname = props.href || props.path || (props.to && props.to.pathname);

    const newProps = `${localPathname}${itemHash}` === `${this.props.pathname}${rootHash}` ?
      {className: getTabLinkClassName(item, styles.active)} :
      {className: getTabLinkClassName(item)};

    return newProps;
  }


  render () {
    const {items, theme} = this.props;
    const styleName = `${theme}Tabs`;

    return (
      <ul className={`${styles[styleName]} ${clearfix}`}>
        {items.map((item, key) => (
          <li
            key={key} // eslint-disable-line react/no-array-index-key
            className={items.length > 1 ? getTabItemClassName() : getTabItemClassName(styles.pointerDisabled)}>
            {React.cloneElement(item, this.getNewProps(item))}
          </li>
        ))}
      </ul>
    );
  }
}

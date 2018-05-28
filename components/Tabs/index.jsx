import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './index.scss';

import {clearfix} from '../index.scss';

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

    // Depending on which link it is (from react-router, from react-server, simple link) we need to access the local pathname according to the respective API
    const localPathname = props.href || props.path || (props.to && props.to.pathname);

    return {
      className: classNames(
        props.className,
        styles.tabLink,
        {
          [styles.active]: `${localPathname}${itemHash}` === `${this.props.pathname}${rootHash}`
        }
      )
    };
  }


  render () {
    const {items, theme} = this.props;
    const styleName = `${theme}Tabs`;

    return (
      <ul className={`${styles[styleName]} ${clearfix}`}>
        {items.map((item, key) => (
          <li
            key={key} // eslint-disable-line react/no-array-index-key
            className={classNames(
              styles.tabItem,
              {
                [styles.pointerDisabled]: items.length <= 1
              }
)}>
            {React.cloneElement(item, this.getNewProps(item))}
          </li>
        ))}
      </ul>
    );
  }
}

import React from 'react';
import PropTypes from 'prop-types';

import ThemeContext from 'utils/themeContext';
import themeable from 'utils/theming';

import sharedStyles from '../index.scss';

import styles from './index.scss';

export default class Tabs extends React.Component {
  static propTypes = {
    hash: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.element).isRequired,
    pathname: PropTypes.string.isRequired,
    theme: PropTypes.oneOf(['default', 'block']),
  };

  static defaultProps = {
    hash: '',
    theme: 'default',
  };

  getNewProps (item, theme) {
    const {props} = item;
    const {hash: rootHash, pathname} = this.props;
    const itemHash = props.to && props.to.hash ? props.to.hash : '';

    // Option to manually set tab active on TNP
    const isTabActive = props.active;

    // Depending on which link it is (from react-router, from react-server, simple link) we need to access the local pathname according to the respective API
    const localPathname = `${props.href || props.path || (props.to && props.to.pathname)}${itemHash}`;
    const actualPathname = `${pathname}${rootHash}`;
    const isActive = localPathname === actualPathname;

    return {
      className: theme(props.className, 'tabLink', `${isTabActive || isActive && 'tabActive'}`),
    };
  }

  render () {
    const {items, theme: type} = this.props;
    const styleName = `${type}Tabs`;

    return (
      <ThemeContext.Consumer>
        {(context) => {
          const theme = themeable({...sharedStyles, ...styles, ...context});

          return (
            <ul className={theme('clearfix', 'tabs', styleName)}>
              {items.map((item, key) => (
                <li
                  key={key} // eslint-disable-line react/no-array-index-key
                  className={theme('tabItem', `${items.length <= 1 ? 'tabPointerDisabled' : ''}`)}
                >
                  {React.cloneElement(item, this.getNewProps(item, theme))}
                </li>
              ))}
            </ul>
          );
        }}
      </ThemeContext.Consumer>
    );
  }
}

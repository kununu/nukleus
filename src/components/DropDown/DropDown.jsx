import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {isBrowser} from 'utils/executionEnvironment';
import ThemeContext from 'utils/themeContext';
import themeable from 'utils/theming';

import styles from './index.scss';
export default class DropDown extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.element),
      PropTypes.element,
    ]).isRequired,
    direction: PropTypes.oneOf(['up', 'down']),
    pullRight: PropTypes.bool,
    shade: PropTypes.oneOf(['dark', 'light']),
    showOnHover: PropTypes.bool,
    title: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
    ]).isRequired,
  }

  static defaultProps = {
    direction: 'down',
    pullRight: false,
    shade: 'dark',
    showOnHover: true,
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

  onClick = () => {
    const {isOpen} = this.state;

    this.setState({isOpen: !isOpen});
  };

  handleClickOutside = (e) => {
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
      shade,
      title,
    } = this.props;
    const {isOpen} = this.state;

    return (
      <ThemeContext.Consumer>
        {(context) => {
          const allStyles = {
            ...styles,
            ...context,
          };
          const theme = themeable(allStyles);

          return (
            <div className={theme('dropDownContainer', [direction], [shade], `${pullRight ? 'pullRight' : ''}`)}>
              <button
                type="button"
                id="dropdown"
                className={theme('dropDownToggle')}
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}
                onClick={this.onClick}
                ref={(node) => { this.node = node; }}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
              >
                {title}
              </button>

              {isOpen && (
              <ul
                className={theme('dropDownItemList')}
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}
                aria-labelledby="dropdown"
                role="listbox"
                tabIndex={0}
              >
                {children}
              </ul>
              )}
            </div>
          )
        }}
      </ThemeContext.Consumer>
    );
  }
}

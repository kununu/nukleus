import React, {Component} from 'react';
import PropTypes from 'prop-types';

import ThemeContext from 'utils/themeContext';
import themeable from 'utils/theming';

import styles from './index.module.scss';

export default class DropDownItem extends Component {
  getItem = ({props: {children}}, theme) => {
    const {icon} = this.props;

    return (
      <>
        {children}

        {icon && (
        <span className={theme('dropDownIcon')}>
          {icon}
        </span>
        )}
      </>
    );
  }

  render () {
    const {
      children,
      isActive,
    } = this.props;

    return (
      <ThemeContext.Consumer>
        {(context) => {
          const allStyles = {
            ...styles,
            ...context,
          };
          const theme = themeable(allStyles);

          return (
            <li className={theme('dropDownItem', `${isActive ? 'active' : ''}`)}>
              {React.cloneElement(children, [], this.getItem(children, theme))}
            </li>
          );
        }}
      </ThemeContext.Consumer>
    );
  }
}

DropDownItem.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]).isRequired,
  icon: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.bool,
  ]),
  isActive: PropTypes.bool,
};

DropDownItem.defaultProps = {
  icon: false,
  isActive: false,
};

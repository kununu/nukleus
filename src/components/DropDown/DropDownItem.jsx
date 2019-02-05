import React, {Component} from 'react';
import PropTypes from 'prop-types';

import styles from './index.scss';

export default class DropDownItem extends Component {
  getItem = children => {
    const {icon} = this.props;
    const {props} = children;

    return (
      <>
        {props.children}

        {icon &&
          <span className={styles.icon}>
            {icon}
          </span>
        }
      </>
    );
  }

  render () {
    const {
      children,
      isActive
    } = this.props;

    return (
      <li className={`${styles.item} ${isActive ? styles.active : ''}`}>
        {React.cloneElement(children, [], this.getItem(children))}
      </li>
    );
  }
}

DropDownItem.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element
  ]).isRequired,
  icon: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.bool
  ]),
  isActive: PropTypes.bool
};

DropDownItem.defaultProps = {
  icon: false,
  isActive: false
};

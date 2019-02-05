import React, {Component} from 'react';
import PropTypes from 'prop-types';

import styles from './index.scss';

export default class DropDownItem extends Component {
  getItem = ({props: {children}}) => {
    const {icon} = this.props;

    return (
      <>
        {children}

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

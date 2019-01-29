import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.scss';

export default function DropDownItem ({children, icon, isActive}) {
  return (
    <li className={`${styles.item} ${isActive ? styles.active : ''}`}>
      {children}

      {icon &&
        <span className={styles.icon}>
          {icon}
        </span>
      }
    </li>
  );
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

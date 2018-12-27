import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.scss';

export default function DropDownItem ({children, icon, isActive}) {
  return (
    <div className={`${styles.item} ${isActive && styles.active} ${icon && styles.hasIcon}`}>
      {children}

      {icon &&
        <span className={styles.icon}>
          {icon}
        </span>
      }
    </div>
  );
}

DropDownItem.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element
  ]).isRequired,
  icon: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.bool,
  ]),
  isActive: PropTypes.bool
};

DropDownItem.defaultProps = {
  icon: false,
  isActive: false
};

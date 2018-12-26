import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.scss';

export default function DropDownSelector ({children, isActive}) {
  return (
    <div className={`${styles.selectedItem} ${isActive && styles.activeHeader}`}>
      {children}
    </div>
  );
}

DropDownSelector.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element
  ]).isRequired,
  isActive: PropTypes.bool
};

DropDownSelector.defaultProps = {isActive: false};

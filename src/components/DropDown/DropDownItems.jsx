import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.scss';

export default function DropDownItems ({children}) {
  return (
    <div className={styles.items}>
      {children}
    </div>
  );
}

DropDownItems.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element
  ]).isRequired
};

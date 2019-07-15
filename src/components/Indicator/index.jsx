import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.scss';

const Indicator = ({title}) => {
  const mainIndicator = {value: 90};
  const secondaryIndicator = {value: 50};

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        {title}
      </div>
      <div className={styles.indicator}>
        <span
          style={{
            transform: `translateX(-${mainIndicator.value}%)`,
            left: `${mainIndicator.value}%`,
          }}
          className={styles.mainIndicator}
        >
          <svg
            viewBox="0 0 12 13"
          >
            <path d="M4.8,12.3L-0.2,1.8C-0.5,1,0.1,0,1,0h9.1c0.9,0,1.5,0.9,1.2,1.8L7.1,12.3C6.7,13.3,5.2,13.3,4.8,12.3z"/>
          </svg>
        </span>
        <span
          style={{
            transform: `translateX(-${secondaryIndicator.value}%)`,
            left: `${secondaryIndicator.value}%`,
          }}
          className={styles.secondaryIndicator}
        >
          <svg
            viewBox="0 0 12 13"
          >
            <path d="M4.8,12.3L-0.2,1.8C-0.5,1,0.1,0,1,0h9.1c0.9,0,1.5,0.9,1.2,1.8L7.1,12.3C6.7,13.3,5.2,13.3,4.8,12.3z"/>
          </svg>
        </span>
        <div className={styles.bar} />
      </div>
    </div>
  );
};

Indicator.propTypes = {
  title: PropTypes.string,
}

Indicator.defaultProps = {
  title: '',
}

export default Indicator;

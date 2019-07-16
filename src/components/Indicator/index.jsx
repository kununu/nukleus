import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.scss';

const Indicator = ({
    maxLabel,
    mainIndicator,
    minLabel,
    secondaryIndicator,
    title,
  }) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        {title}
      </div>
      <div className={styles.indicatorWrapper}>
        <svg className={styles.primaryIndicator}>
          <linearGradient
            className={styles.gradient}
            spreadMethod="pad"
            id="gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" style={{stopColor: "#095ac6"}} />
            <stop offset="100%" style={{stopColor: "#afca5d"}} />
          </linearGradient>
          <defs>
            <clipPath id="indicator">
              <path
                className={styles.clipPath}
                style={{
                  transform: `translateX(${mainIndicator}%)`,
                }}
                d="M4.8,12.3L-0.2,1.8C-0.5,1,0.1,0,1,0h9.1c0.9,0,1.5,0.9,1.2,1.8L7.1,12.3C6.7,13.3,5.2,13.3,4.8,12.3z"/>

            </clipPath>
          </defs>

          <rect fill="url(#gradient)" x="0" y="0" className={styles.block} clip-path="url(#indicator)"></rect>
        </svg>

        <span
          style={{
            transform: `translateX(-${mainIndicator}%)`,
            left: `${mainIndicator}%`,
          }}
          className={styles.secondaryIndicator}
        >
          <svg>
            <path d="M4.8,12.3L-0.2,1.8C-0.5,1,0.1,0,1,0h9.1c0.9,0,1.5,0.9,1.2,1.8L7.1,12.3C6.7,13.3,5.2,13.3,4.8,12.3z" />
          </svg>
        </span>

        <span
          style={{
            transform: `translateX(-${secondaryIndicator}%)`,
            left: `${secondaryIndicator}%`,
          }}
          className={styles.secondaryIndicator}
        >
          <svg>
            <path d="M4.8,12.3L-0.2,1.8C-0.5,1,0.1,0,1,0h9.1c0.9,0,1.5,0.9,1.2,1.8L7.1,12.3C6.7,13.3,5.2,13.3,4.8,12.3z" />
          </svg>
        </span>
        <svg className={styles.line}>
          <line
            x1="0"
            x2="100%"
            y1="2"
            y2="2"
          />
        </svg>
        <div className={styles.indicatorBar} />
      </div>
      <div className={styles.legend}>
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
};

Indicator.propTypes = {
  mainIndicator: PropTypes.number,
  maxLabel: PropTypes.string.isRequired,
  minLabel: PropTypes.string.isRequired,
  secondaryIndicator: PropTypes.number,
  title: PropTypes.string,
}

Indicator.defaultProps = {
  mainIndicator: 50,
  secondaryIndicator: 40,
  title: '',
}

export default Indicator;
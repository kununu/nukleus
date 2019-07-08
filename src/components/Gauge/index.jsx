import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.scss';

const Gauge = ({smallHand, bigHand}) => {
  return (
    <div className={styles.container}>
      <svg
        viewBox="0 0 275 146"
        className={styles.meter}
      >
        <linearGradient
          id="gradient"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="73"x2="275"
          y2="73"
        >
          <stop 
            offset="0"
            style={{stopColor: '#0059CD'}}
          />
          <stop offset="0.2457" style={{stopColor: '#2681B0'}}/>
          <stop offset="0.4921" style={{stopColor: '#48A695'}}/>
          <stop offset="0.7045" style={{stopColor: '#76B96F'}}/>
          <stop offset="0.8927" style={{stopColor: '#98C753'}}/>
          <stop offset="0.9944" style={{stopColor: '#A5CC48'}}/>
        </linearGradient>

        <path fill="url(#gradient)" d="M51.6,146c3.1,0,5.6-2.6,5.5-5.7c0-1.1-0.1-2.2-0.1-3.3c0-44.2,35.8-80,80-80s80,35.8,80,80
	      c0,1.1,0,2.2-0.1,3.3c-0.1,3.1,2.3,5.7,5.5,5.7h47.1c3,0,5.4-2.3,5.5-5.3c0-1.1,0-2.1,0-3.2C275,61.6,213.4,0,137.5,0
	      S0,61.6,0,137.5c0,1.1,0,2.1,0,3.2c0.1,3,2.5,5.3,5.5,5.3H51.6z"/>
      </svg>

      <div
        style={{transform: `rotate(${smallHand}deg)`}}
        className={styles.smallHand}>
        <svg
          className={styles.arm}
          viewBox="0 0 84 17"
        >
          <path
            d="M2.5,6.4C0.4,7,0.4,9.9,3.2,9.9c2,0,72.8,6,72.8,6l0-0.1c1.8,0,3.6-0.6,5-2c2.8-2.7 2.8-7.1,0.1-9.9c-1.3-1.4-3.1-2.1-4.9-2.1l0-0.1C76.2,1.8,3.5,6.1,2.5,6.4z"
          />
        </svg>
      </div>

      <div
        style={{transform: `rotate(${bigHand}deg)`}}
        className={styles.bigHand}>
        <svg
          className={styles.arm}
          viewBox="0 0 84 17"
        >
          <path
            d="M2.5,6.4C0.4,7,0.4,9.9,3.2,9.9c2,0,72.8,6,72.8,6l0-0.1c1.8,0,3.6-0.6,5-2c2.8-2.7 2.8-7.1,0.1-9.9c-1.3-1.4-3.1-2.1-4.9-2.1l0-0.1C76.2,1.8,3.5,6.1,2.5,6.4z"
          />
        </svg>
      </div>
    </div>
  );
};

Gauge.propTypes = {
  smallHand: PropTypes.number,
  bigHand: PropTypes.number,
}

Gauge.defaultProps = {
  smallHand: 30,
  bigHand: 110,
}

export default Gauge;

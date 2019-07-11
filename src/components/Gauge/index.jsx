import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.scss';


const Gauge = ({smallHand, bigHand}) => {  
  const hex2rgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
    ] : null;
  };

  // Inverse of the above
  const rgb2hex = (rgb) => {
    return "#" + ((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2]).toString(16).slice(1);
  };

  const interpolateColor = (color1, color2, factor = .5) => {
    const result = color1.slice();
    for (var i=0;i<3;i++) {
      result[i] = Math.round(result[i] + factor*(color2[i]-color1[i]));
    }
    return result;
  };
  const beginColor =hex2rgb('#2681B0');
  const endColor = hex2rgb('#A5CC48');
  // debugger
  // console.log('inerpolate', interpolateColor(beginColor, endColor, 1));

  const getFillColor = (val) => {
    console.log('MEOW', val);
    if (val <= 30) return '#006DC0';
    if (val <= 60) return '#007CB5';
    if (val <= 90) return '#3A9D9C';
    if (val <= 120) return '#5EAD85';
    if (val <= 150) return '#85BE68';
    return '#93C45C';
  }

  return (
    <div className={styles.container}>
      <div className={styles.meterContainer}>
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
            fill={getFillColor(smallHand)}
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
            fill={getFillColor(bigHand)}
            className={styles.arm}
            viewBox="0 0 84 17"
          >
            <path
              d="M2.5,6.4C0.4,7,0.4,9.9,3.2,9.9c2,0,72.8,6,72.8,6l0-0.1c1.8,0,3.6-0.6,5-2c2.8-2.7 2.8-7.1,0.1-9.9c-1.3-1.4-3.1-2.1-4.9-2.1l0-0.1C76.2,1.8,3.5,6.1,2.5,6.4z"
            />
          </svg>
        </div>
      </div>

      <div className={styles.labels}>
        <div>meow</div>
        <div>meow</div>
      </div>
      <div>
        legend
      </div>
    </div>
  );
};

Gauge.propTypes = {
  smallHand: PropTypes.number,
  bigHand: PropTypes.number,
}

Gauge.defaultProps = {
  smallHand: 100,
  bigHand: 120,
}

export default Gauge;

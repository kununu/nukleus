import React from 'react';

import styles from './index.scss';

const Gauge = () => {
  const strokeCapOffset = 10;
  const radius = 150;
  const value = 100;
  const offsetValue = value - strokeCapOffset;
  const compValue = 20 - strokeCapOffset;

  const cirumference = Math.ceil((radius * Math.PI) * 2);
  const semiCirumference = Math.floor(cirumference / 2);
  const semiCirumferenceValue = Math.floor((semiCirumference * offsetValue)/100);

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.outsideWrapper}>
          <div className={styles.svgwrapper}>
            <svg className={styles.svgmeter}>
              <defs>
                <linearGradient className={styles.gradient} spreadMethod="pad" id="gradient" x1="100%" y1="0%" x2="0%" y2="0%">
                  <stop offset="0%" />
                  <stop offset="100%" />
                </linearGradient>
              </defs>
              <circle
                className={styles.low}
                r="150"
                cx="50%"
                cy="50%"
                strokeLinecap="butt"
                stroke="url(#gradient)"
                strokeWidth="60"
                strokeDasharray={`${semiCirumference}, ${cirumference}`}
                fill="none"
              />
              <circle
                className={styles.low2}
                r="150"
                cx="50%"
                cy="50%"
                strokeLinecap="round"
                stroke="#000000"
                strokeWidth="50"
                strokeDasharray={`${semiCirumferenceValue}, ${cirumference}`}
                fill="none"
              />
              <circle
                r="195"
                cx="50%"
                cy="50%"
                strokeLinecap="butt"
                stroke="#dcdcdc"
                strokeWidth="2"
                strokeDasharray="2, 4"
                fill="none"
              />
            </svg>
          </div>
        </div>
        <div className={styles.pointerWrapper}>
          <div className={styles.pointerContainer2} style={{transform: `rotate(${compValue}deg)`}}>
            <svg
              className={styles.pointer2}
              viewBox="0 0 148 515"
            >
              <path class="test" d="M50.4,45.3c0,0-17.8,343-22.8,388c-10.6,95.1,86.2,86.6,86.9,19.4c0.8-81.5-22.6-378-23.1-405.5
              C90.7,13.1,52.9,8.7,50.4,45.3z"/>
            </svg>
            <svg
              className={styles.arrow}
              viewBox="0 0 528 406">
              <path class="st0" d="M57.5,0h269.1c46.4,0,73.6,68.9,47,119.1L239,373.9c-22.8,43.2-71.2,           43.2-94.1,0L10.4,119.1
	              C-16.1,68.9,11.1,0,57.5,0z"
              />
            </svg>
          </div>
          <div className={styles.pointerContainer} style={{transform: `rotate(${offsetValue}deg)`}}>
            <svg
              className={styles.pointer}
              viewBox="0 0 148 515"
            >
              <path class="test" d="M50.4,45.3c0,0-17.8,343-22.8,388c-10.6,95.1,86.2,86.6,86.9,19.4c0.8-81.5-22.6-378-23.1-405.5
              C90.7,13.1,52.9,8.7,50.4,45.3z"/>
            </svg>
            <svg
              className={styles.arrow2}
              viewBox="0 0 528 406">
              <path class="st0" d="M57.5,0h269.1c46.4,0,73.6,68.9,47,119.1L239,373.9c-22.8,43.2-71.2,           43.2-94.1,0L10.4,119.1
	              C-16.1,68.9,11.1,0,57.5,0z"
              />
            </svg>
          </div>
        </div>
      </div>
    </>
  )
};

export default Gauge;

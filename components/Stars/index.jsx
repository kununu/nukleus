import React, {Component, PropTypes} from 'react';

import styles from './index.scss';

function isWholeNumber (number) {
  return number % 1 === 0;
}

function roundToHalves (number) {
  return Math.round(number * 2) / 2;
}

function formatValue (number) {
  return Math.round(number * 100) / 100;
}

export default class Stars extends Component {
  static propTypes = {
    color: PropTypes.string,
    fillColors: PropTypes.array,
    selectable: PropTypes.bool,
    name: PropTypes.string.isRequired,
    totalStars: PropTypes.number,
    value: PropTypes.number
  }

  static defaultProps = {
    color: 'currentColor',
    fillColors: [],
    selectable: false,
    totalStars: 5,
    value: 0
  }

  state = {
    hoverValue: 0,
    value: formatValue(this.props.value)
  }

  onClick = e => {
    const newVal = e.target.value;

    if (newVal === this.state.value) {
      return this.deselectStar();
    }

    return this.updateValue(newVal);
  }

  onMouseEnter = value => {
    this.setHoverValue(value);
  }

  onMouseLeave = () => {
    this.setHoverValue(0);
  }

  setHoverValue (value) {
    this.setState({
      hoverValue: value
    });
  }

  getFillValue = starNumber => {
    const value = roundToHalves(this.state.value);
    const wholeStarFill = this.props.color;
    const halfStarFill = 'url(#half)';
    const emptyStarFill = 'transparent';

    if (this.isFullStar(starNumber)) {
      return wholeStarFill;
    }

    if (this.isHalfStar(starNumber, value)) {
      return halfStarFill;
    }

    return emptyStarFill;
  }

  isFullStar (key) {
    if (this.state.hoverValue && this.state.hoverValue > this.state.value && this.state.hoverValue >= key) {
      return true;
    }

    if (this.state.value && this.state.value >= key) {
      return true;
    }

    return false;
  }

  isHalfStar (starNumber, value) {
    if (!this.props.selectable && value + 1 >= starNumber && !isWholeNumber(value)) {
      return true;
    }

    return false;
  }

  deselectStar () {
    this.updateValue(0);
    this.setHoverValue(0);
  }

  updateValue (newValue) {
    this.setState({
      value: newValue
    });
  }

  render () {
    const {
      color,
      fillColors,
      selectable,
      name,
      totalStars
    } = this.props;

    return (
      <div className={styles.starsContainer}>
        {[...Array(totalStars)].map((star, key) =>
          <div
            key={key}
            className={styles.starsGroup}
            onMouseEnter={selectable && (() => this.onMouseEnter(key + 1))}
            onMouseLeave={selectable && this.onMouseEnter}>

            {selectable &&
              <input
                className={styles.hiddenInput}
                type="radio"
                name={name}
                value={key + 1}
                onChange={this.onClick}
                id={`star${key}`} />
            }

            <label htmlFor={`star${key}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                xmlSpace="preserve"
                viewBox="-20 -20 541.8 518.6"
                width="100%"
                stroke={color}
                preserveAspectRatio="none"
                className={`${styles.star} ${selectable && styles.ratingStar}`}
                x="0" y="0">
                {!selectable &&
                  <defs>
                    <linearGradient id="half">
                      <stop offset="0%" stopColor={color} />
                      <stop offset="50%" stopColor={color} />
                      <stop offset="50%" stopColor="white" />
                      <stop offset="100%" stopColor="white" />
                    </linearGradient>
                  </defs>
                }
                <path
                  className={`${styles.path} ${styles[this.isFullStar(key + 1) && 'fill']}`}
                  fill={this.getFillValue(key + 1)}
                  stroke={color}
                  d="M501.8,185.5c0,4.4-2.6,9.3-7.8,14.5L384.5,306.7l25.9,150.8c0.2,1.4,0.3,3.4,0.3,6c0,4.2-1.1,7.8-3.2,10.7
                c-2.1,2.9-5.2,4.4-9.2,4.4c-3.8,0-7.8-1.2-12.1-3.6l-135.4-71.2L115.5,475c-4.4,2.4-8.4,3.6-12.1,3.6c-4.2,0-7.4-1.5-9.5-4.4
                c-2.1-2.9-3.2-6.5-3.2-10.7c0-1.2,0.2-3.2,0.6-6l25.9-150.8L7.5,200c-5-5.4-7.5-10.3-7.5-14.5c0-7.4,5.6-12.1,16.9-13.9l151.4-22
                l67.9-137.2C240,4.1,244.9,0,250.9,0c6,0,11,4.1,14.8,12.4l67.9,137.2l151.4,22C496.2,173.4,501.8,178,501.8,185.5z" />
              </svg>
              <span className="sr-only">
                5
              </span>
            </label>
          </div>
        )}
      </div>
    );
  }
}

import React from 'react';
import PropTypes from 'prop-types';

import ThemeContext from 'utils/themeContext';
import themeable from 'utils/theming';

import sharedStyles from '../index.scss';

import styles from './index.scss';


function roundToHalves (number) {
  return Math.round(number * 2) / 2;
}

function formatValue (number) {
  return roundToHalves(Math.round(number * 100) / 100);
}

export default class Stars extends React.Component {
  static propTypes = {
    colors: PropTypes.arrayOf(PropTypes.string),
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    onClick: PropTypes.func,
    selectable: PropTypes.bool,
    strokeColor: PropTypes.string,
    totalStars: (props, propName) => {
      const totalStars = props[propName];

      if (totalStars < 1 || totalStars > 10) {
        return new Error('Prop totalStars must be a number between 1 and 10');
      }
      return null;
    },
    value: (props, propName) => {
      if (props[propName] > props.totalStars) {
        return new Error('Prop value cannot be greater than prop totalStars');
      }
      return null;
    },
  };

  static defaultProps = {
    colors: ['currentColor'],
    onChange: () => {},
    onClick: () => {},
    selectable: false,
    strokeColor: 'currentColor',
    totalStars: 5,
    value: 0,
  };

  /* eslint-disable react/destructuring-assignment */
  state = {
    color: this.props.colors[this.props.value - 1] || this.props.strokeColor,
    value: formatValue(this.props.value),
  };
  /* eslint-enable react/destructuring-assignment */

  onClick = (e) => {
    const {
      onChange,
      onClick,
    } = this.props;
    const {value} = this.state;

    onChange(e);
    onClick(e);

    const newVal = Number(e.target.value);

    if (newVal === value) {
      return this.deselectStar();
    }

    this.setCurrentColor(newVal);

    return this.updateValue(newVal);
  }

  setCurrentColor (value) {
    const {
      colors,
      strokeColor,
    } = this.props;

    this.setState({color: colors[value - 1] || strokeColor});
  }

  getFillValue = (starNumber) => {
    const {name} = this.props;
    const {color} = this.state;

    const halfStarFill = `url(#${name}-half)`;
    const emptyStarFill = 'transparent';

    if (this.isFullStar(starNumber)) {
      return color;
    }

    if (this.isHalfStar(starNumber)) {
      return halfStarFill;
    }

    return emptyStarFill;
  }

  isWholeNumber = number => number % 1 === 0

  isFullStar = (starNumber) => {
    const {value} = this.state;

    if (value && value >= starNumber) {
      return true;
    }

    return false;
  }

  isHalfStar (starNumber) {
    const {selectable} = this.props;
    const {value} = this.state;

    if (!selectable && value + 1 >= starNumber && !this.isWholeNumber(value)) {
      return true;
    }

    return false;
  }

  deselectStar () {
    this.updateValue(0);
  }

  updateValue (newValue) {
    this.setState({value: newValue});
  }

  render () {
    const {
      selectable,
      name,
      totalStars,
      strokeColor,
    } = this.props;
    const {color, value} = this.state;

    return (
      <ThemeContext.Consumer>
        {(context) => {
          const theme = themeable({...sharedStyles, ...styles, ...context});

          return (
            <div
              className={theme('starsContainer', `${!selectable ? 'starsStatic' : ''}`)}
              id={`${name}-container`}
            >
              <div className={theme('starsRow')}>
                {[...Array(totalStars + 1)].map((star, key) => (
                  <div
                    key={key} // eslint-disable-line react/no-array-index-key
                    className={key ? theme('starsGroup') : theme('starsGroupHidden')}
                  >

                    {selectable && (
                      <input
                        checked={key === value}
                        className={theme('starInputHidden')}
                        id={`${name}-${key}`}
                        name={name}
                        onChange={this.onClick}
                        onClick={this.onClick}
                        type="radio"
                        value={key}
                      />
                    )}

                    {Boolean(key) && (
                      <label htmlFor={selectable ? `${name}-${key}` : undefined}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          xmlSpace="preserve"
                          version="1.1"
                          viewBox="-20 -20 541.8 518.6"
                          width="100%"
                          stroke={strokeColor}
                          preserveAspectRatio="xMidYMid meet"
                          className={theme('star', `${selectable && 'ratingStar'}`)}
                          x="0"
                          y="0"
                        >
                          {!selectable && key === 1 && !this.isWholeNumber(value) && (
                          <defs>
                            <linearGradient id={`${name}-half`}>
                              <stop
                                offset="50%"
                                stopColor={color}
                              />
                              <stop
                                offset="50%"
                                stopColor="white"
                              />
                            </linearGradient>
                          </defs>
                          )}
                          <path
                            className={theme('starPath', `${this.isFullStar(key) && 'starFill'}`)}
                            fill={this.getFillValue(key)}
                            stroke={this.isFullStar(key) ? color : strokeColor}
                            d="M501.8,185.5c0,4.4-2.6,9.3-7.8,14.5L384.5,306.7l25.9,150.8c0.2,1.4,0.3,3.4,0.3,6c0,4.2-1.1,7.8-3.2,10.7
                            c-2.1,2.9-5.2,4.4-9.2,4.4c-3.8,0-7.8-1.2-12.1-3.6l-135.4-71.2L115.5,475c-4.4,2.4-8.4,3.6-12.1,3.6c-4.2,0-7.4-1.5-9.5-4.4
                            c-2.1-2.9-3.2-6.5-3.2-10.7c0-1.2,0.2-3.2,0.6-6l25.9-150.8L7.5,200c-5-5.4-7.5-10.3-7.5-14.5c0-7.4,5.6-12.1,16.9-13.9l151.4-22
                            l67.9-137.2C240,4.1,244.9,0,250.9,0c6,0,11,4.1,14.8,12.4l67.9,137.2l151.4,22C496.2,173.4,501.8,178,501.8,185.5z"
                          />
                        </svg>
                        <span className={theme('srOnly')}>
                          {key}
                        </span>
                      </label>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        }}
      </ThemeContext.Consumer>
    );
  }
}

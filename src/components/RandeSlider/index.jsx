import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.scss';

export default class RangeSlider extends React.Component {
  static propTypes = {
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    min: 10000,
    max: 150000,
    step: 10,
    onChange: null,
  };

  state = {
    value: 10000,
  }

  handleInput = (e) => {
    this.setState({
      value: Number(e.target.value).toFixed(0),
    });

    this.props.onChange;
  };

  isIe = () => {
    const msie = window.navigator.userAgent.indexOf("MSIE ");
    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
      return true;
    }

    return false;
  }

  render () {
    const {step, min, max} = this.props;
    const {value} = this.state;

    return (
      <span className={styles.sliderWrapper}>
        <label
          htmlFor="slider"
          className={styles.sliderLabel}
        >{value}</label>
        <input
          id="slider"
          type="range"
          step={step}
          min={min}
          max={max}
          name="slider"
          className={styles.slider}
          onInput={this.handleInput}
          onChange={this.handleInput}
        />
      </span>
    );
  }
}

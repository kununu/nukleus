import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.scss';

export default class RangeSlider extends React.Component {
  static propTypes = {
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    step: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  state = {
    value: 10000,
  }

  handleInput = (e) => {
    // set value on the label above the slider
    const {onChange} = this.props;

    this.setState({value: Number(e.target.value)});
    onChange();
  };

  render () {
    const {step, min, max} = this.props;
    const {value} = this.state;
    const labelValue = `${value.toLocaleString('de')} €`;

    return (
      <div className={styles.sliderWrapper}>
        <label
          htmlFor="range-slider"
          className={styles.sliderLabel}
        >
          {labelValue}
        </label>
        <input
          id="range-slider"
          type="range"
          step={step}
          min={min}
          max={max}
          name="range-slider"
          value={value}
          onChange={this.handleInput}
          className={styles.slider}
        />
      </div>
    );
  }
}

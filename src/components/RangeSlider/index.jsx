import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.scss';

export default class RangeSlider extends React.Component {
  static propTypes = {
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    step: PropTypes.number.isRequired,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    onChange: () => { },
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
        <span className={styles.sliderMinLimit}>{min}</span>
        <input
          id="range-slider"
          type="range"
          step={step}
          min={min}
          max={max}
          name="range-slider"
          value={value}
          onInput={this.handleInput}
          onChange={this.handleInput}
          className={styles.slider}
        />
        <span className={styles.sliderMaxLimit}>{max}</span>
      </div>
    );
  }
}

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
    onChange: () => {},
  };

  state = {
    value: 75000,
  }

  handleInput = (e) => {
    // set value on the label above the slider
    console.log("update");
    this.setState({value: Number(e.target.value).toFixed(0)});
    this.props.onChange();
  };

  render () {
    const {step, min, max} = this.props;
    const {value} = this.state;
    const labelValue = `${value} €`;

    return (
      <div className={styles.sliderWrapper}>
        <label
          htmlFor="range-slider"
          className={styles.sliderLabel}
        >{labelValue}
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
          className={styles.slider}
          onInput={this.handleInput}
          onChange={this.handleInput}
        />
        <span className={styles.sliderMaxLimit}>{max}</span>
      </div>
    );
  }
}

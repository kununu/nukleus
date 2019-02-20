import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

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

  isSafari = () => !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/);

  render () {
    const {step, min, max} = this.props;
    const {value} = this.state;
    const labelValue = `${value.toLocaleString('de')} €`;

    // safari got a bug with rendering of boxshadow used for slider progress, add fix class
    const safariClass = this.isSafari() ? styles.safari : '';

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
          className={`${styles.slider} ${safariClass}`}
        />
      </div>
    );
  }
}

/* eslint-disable no-useless-escape */
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

  constructor (props) {
    super(props);
    const {min} = this.props;

    this.state = {value: min};
  }

  handleInput = (e) => {
    const {onChange} = this.props;
    const value = Number(e.target.value);

    this.setState({value});

    onChange(value);
  };


  render () {
    const {step, min, max} = this.props;
    const {value} = this.state;

    // safari got a bug with rendering of boxshadow used for slider progress, add fix class
    // const safariClass = this.isSafari() ? styles.safari : '';

    return (
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
    );
  }
}

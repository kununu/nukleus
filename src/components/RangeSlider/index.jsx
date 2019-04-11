import React from 'react';
import PropTypes from 'prop-types';

import Error from '../Error';

import styles from './index.scss';

const RangeSliderComponent = ({
  id,
  step,
  min,
  max,
  name,
  onBlur,
  meta: {
    touched,
    error,
    value,
  },
  onChange,
  label,
  containerClass,
  onFocus,
}) => (
  <>
    <div className={containerClass}>
      <label htmlFor={id}>
        {label}
        <input
          id={id}
          type="range"
          step={step}
          min={min}
          max={max}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          className={styles.slider}
        />
      </label>
    </div>
    {(touched && error) && (
      <div className={styles.sliderErrorContainer}>
        <Error
          id={`${id}_error`}
          info={error}
        />
      </div>
    )}
  </>
);

RangeSliderComponent.propTypes = {
  id: PropTypes.string.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  meta: PropTypes.shape({
    value: PropTypes.number.isRequired,
    touched: PropTypes.bool,
    error: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
  }).isRequired,
  label: PropTypes.string,
  containerClass: PropTypes.string,
};

RangeSliderComponent.defaultProps = {
  label: '',
  containerClass: styles.sliderWrapper,
  onFocus: null,
};


export default RangeSliderComponent;

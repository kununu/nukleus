import React from 'react';
import PropTypes from 'prop-types';

import ThemeContext from 'utils/themeContext';
import themeable from 'utils/theming';

import Error from '../Error';

import IncreaseAmountBtn from './icons/icn-increase-btn';
import DecreaseAmountBtn from './icons/icn-decrease-btn';
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
  onFocus,
}) => {
  const dispatchSyntheticEvent = (val) => {
    onChange({
      target: {
        name: id,
        value: String(val),
      },
    });
  };

  return (
    <ThemeContext.Consumer>
      {(context) => {
        const theme = themeable({...styles, ...context});

        return (
          <>
            <label htmlFor={id}>{label}</label>
            <div
              className={theme('sliderGridContainer')}
              id="salary-slider-container"
            >
              <button
                type="button"
                id="decreaseSalaryAmountBtn"
                className={theme('modifyAmountBtn')}
                onClick={() => {
                  const currentValue = Number(value);

                  if (currentValue > min) {
                    const updatedValue = currentValue - step;

                    dispatchSyntheticEvent(updatedValue);
                  }
                }}
              >
                <DecreaseAmountBtn />
              </button>
              <div className={theme('rangeSliderWrapper')}>
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
                  className={theme('slider')}
                />
              </div>
              <button
                type="button"
                id="increaseSalaryAmountBtn"
                className={theme('modifyAmountBtn')}
                onClick={() => {
                  const currentValue = Number(value);

                  if (currentValue < max) {
                    const updatedValue = currentValue + step;

                    dispatchSyntheticEvent(updatedValue);
                  }
                }}
              >
                <IncreaseAmountBtn />
              </button>
            </div>
            {(touched && error) && (
            <div className={theme('sliderErrorContainer')}>
              <Error
                id={`${id}_error`}
                info={error}
              />
            </div>
            )}
          </>
        );
      }
      }
    </ThemeContext.Consumer>
  );
};


RangeSliderComponent.propTypes = {
  id: PropTypes.string.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
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
};

RangeSliderComponent.defaultProps = {
  label: '',
  onFocus: null,
  onBlur: null,
};


export default RangeSliderComponent;

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import ThemeContext from 'utils/themeContext';
import themeable from 'utils/theming';

import Error from '../Error';
import Label from '../Label';
import sharedStyles from '../index.scss';

import styles from './index.scss';

const Choice = ({
  customTheme,
  disabled,
  error,
  errorSubInfo,
  heading,
  headingStyle,
  isRequired,
  label,
  labelHidden,
  mobileSingleCol,
  name,
  onBlur,
  onChange,
  onClick,
  onFocus,
  options,
  optionsPerRow,
  reference,
  requiredLabel,
}) => (
  <ThemeContext.Consumer>
    {(context) => {
      const allStyles = {
        ...sharedStyles,
        ...styles,
        ...context,
      };
      const theme = themeable(allStyles);

      return (
        <div
          className={classnames(theme('formGroup'), {
            [theme('mobileSingleCol')]: mobileSingleCol,
          })}
          id={`${name}-container`}
        >

          {requiredLabel && (
          <span className={theme('controlNote', 'controlLabelRequired')}>
            {requiredLabel}
          </span>
          )}

          {label || heading ? (
            <Label
              htmlFor={heading}
              value={label || heading}
              labelHidden={labelHidden}
              classNames={theme(headingStyle)}
              isTitle
            />
          ) : null}

          <div
            className={theme('choiceContainer', `${options.length > 3 && optionsPerRow === null && 'choiceFlexible'}`)}
            data-options-per-row={optionsPerRow}
          >
            {options.map((item, idx) => (
              <div
                className={theme('choiceButton')}
                key={item.id}
              >
                <input
                  type="radio"
                  value={item.value}
                  id={`${name}${item.id}`}
                  name={name}
                  checked={item.value}
                  onBlur={onBlur}
                  onChange={onChange}
                  onFocus={onFocus}
                  onClick={onClick}
                  ref={reference}
                  required={isRequired}
                  disabled={disabled}
                />
                <label
                  disabled={disabled}
                  id={idx}
                  htmlFor={`${name}${item.id}`}
                  className={theme(customTheme)}
                >
                  {item.label}
                </label>
              </div>
            ))}
          </div>
          {error && (
            <Error
              info={error}
              subInfo={errorSubInfo}
            />
          )}
        </div>
      );
    }}
  </ThemeContext.Consumer>
);

Choice.propTypes = {
  customTheme: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  errorSubInfo: PropTypes.string,
  heading: PropTypes.string,
  headingStyle: PropTypes.string,
  isRequired: PropTypes.bool,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  labelHidden: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    value: PropTypes.string,
  })).isRequired,
  optionsPerRow: PropTypes.oneOf(['3', '4', '5', '6', '7', 3, 4, 5, 6, 7, null]),
  reference: PropTypes.func,
  requiredLabel: PropTypes.string,
  mobileSingleCol: PropTypes.bool,
};

Choice.defaultProps = {
  customTheme: '',
  disabled: false,
  error: null,
  errorSubInfo: null,
  heading: null,
  headingStyle: 'control-label',
  isRequired: false,
  label: null,
  labelHidden: false,
  onBlur: () => {},
  onChange: () => {},
  onClick: () => {},
  onFocus: () => {},
  optionsPerRow: null,
  reference: () => {},
  requiredLabel: '',
  mobileSingleCol: false,
};

export default Choice;

import React from 'react';
import PropTypes from 'prop-types';

import {queryParamsToObject} from 'utils/params';


import Error from '../Error';
import Label from '../Label';
import {
  controlLabelRequired,
  controlNote,
  formGroup,
} from '../index.scss';

import styles from './index.scss';

export default class Choice extends React.Component {
  static propTypes = {
    checked: PropTypes.string,
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
    query: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    reference: PropTypes.func,
    requiredLabel: PropTypes.string,
  };

  static defaultProps = {
    checked: '',
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
    query: {},
    reference: () => {},
    requiredLabel: '',
  };

  state = {
    checked: this.props.checked, // eslint-disable-line react/destructuring-assignment
    showError: false,
  };

  componentWillMount () {
    const {
      error,
      name,
      query,
    } = this.props;
    const queryObject = queryParamsToObject(query);

    // Show error, if already set
    if (error !== null) this.showError();

    if (!queryObject[name]) return;

    this.setState({checked: queryObject[name]});
  }

  componentWillReceiveProps (nextProps) {
    const {
      checked,
      error,
      name,
      query,
    } = this.props;
    const queryNextObject = queryParamsToObject(nextProps.query);
    const queryPropsObject = queryParamsToObject(query);

    if (error) this.showError();
    if (nextProps.query === query && nextProps.checked === checked) return;

    if (queryNextObject[name] && queryNextObject[name] !== queryPropsObject[name]) {
      this.setState({checked: queryNextObject[name]});
    } else if (nextProps.checked !== checked) {
      this.setState({checked: nextProps.checked});
    }
  }

  onChange = (option, e) => {
    const {value} = e.target;
    const {checked} = this.state;
    const {onChange} = this.props;

    if (this.isOptionDisabled(option) || value === checked) return;

    onChange(e);
    this.setState({checked: value});
  };

  onClick = (option, e) => {
    if (this.isOptionDisabled(option)) return;

    const {value} = e.target;
    const {checked} = this.state;
    const {
      onClick,
      isRequired,
    } = this.props;

    onClick(e);
    // As long as the component is not required and the component is deselected set to null.
    if (!isRequired && value === checked) {
      this.setState({checked: null});
    }
  }

  get label () {
    const {
      heading,
      headingStyle,
      label,
      labelHidden,
    } = this.props;

    if (!label && !heading) return null;

    const value = label || heading;

    return (
      <Label
        htmlFor={heading}
        value={value}
        labelHidden={labelHidden}
        classNames={headingStyle}
        isTitle
      />
    );
  }

  isOptionDisabled (option) {
    const {disabled} = this.props;

    return disabled || (typeof (option.disabled) === 'boolean' ? option.disabled : disabled);
  }

  hasError () {
    const {error} = this.props;
    const {showError} = this.state;

    return showError && error;
  }

  hideError () {
    this.setState({showError: false});
  }

  showError () {
    this.setState({showError: true});
  }

  render () {
    const {
      customTheme,
      error,
      errorSubInfo,
      isRequired,
      name,
      onBlur,
      onFocus,
      options,
      optionsPerRow,
      reference,
      requiredLabel,
    } = this.props;
    const {checked} = this.state;

    return (
      <div
        className={formGroup}
        id={`${name}-container`}
      >

        {requiredLabel && (
        <span className={`${controlNote} ${controlLabelRequired}`}>
          {requiredLabel}
        </span>
        )}

        {this.label}

        <div
          className={`${styles.radioContainer} ${options.length > 3 && optionsPerRow === null && styles.flexible}`}
          data-options-per-row={optionsPerRow}
        >
          {options.map((item, idx) => (
            <div
              className={styles.radioButton}
              key={item.id}
            >
              <input
                type="radio"
                value={item.value}
                id={`${name}${item.id}`}
                name={name}
                checked={checked === item.value}
                onBlur={onBlur}
                onChange={e => this.onChange(item, e)}
                onFocus={onFocus}
                onClick={e => this.onClick(item, e)}
                ref={reference}
                required={isRequired}
              />
              <label
                disabled={this.isOptionDisabled(item)}
                id={idx}
                htmlFor={`${name}${item.id}`}
                className={customTheme}
              >
                {item.label}
              </label>
            </div>
          ))}
        </div>

        {this.hasError() && (
        <Error
          info={error}
          subInfo={errorSubInfo}
        />
        )}
      </div>
    );
  }
}

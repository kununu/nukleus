/* eslint-disable jsx-a11y/no-autofocus */
// Read more about controlled components
// https://facebook.github.io/react/docs/forms.html#controlled-components
import React from 'react';
import PropTypes from 'prop-types';

import ThemeContext from 'utils/themeContext';
import themeable from 'utils/theming';

import Error from '../Error';
import Label from '../Label';
import sharedStyles from '../index.scss';

import styles from './index.scss';

export default class Select extends React.Component {
  static propTypes = {
    autoFocus: PropTypes.bool,
    defaultItem: PropTypes.string,
    defaultRequired: PropTypes.string,
    disabled: PropTypes.bool,
    error: PropTypes.string,
    errorSubInfo: PropTypes.string,
    id: PropTypes.string.isRequired,
    inputStyle: PropTypes.string,
    isRequired: PropTypes.bool,
    items: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
        ]),
        value: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
        ]),
      })),
    ]),
    label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    labelHidden: PropTypes.bool,
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    options: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
        ]),
        value: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
        ]),
      })),
    ]),
    query: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    reference: PropTypes.func,
    requiredLabel: PropTypes.string,
    sort: PropTypes.func,
    title: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  };

  static defaultProps = {
    autoFocus: false,
    defaultItem: '',
    defaultRequired: '',
    disabled: false,
    error: null,
    errorSubInfo: null,
    inputStyle: 'inline',
    isRequired: false,
    items: [],
    label: null,
    labelHidden: false,
    onBlur: () => {},
    onChange: null,
    onFocus: () => {},
    options: [],
    query: {},
    reference: () => {},
    requiredLabel: '',
    sort: null,
    title: null,
    value: '',
  };

  state = {
    showError: false,
    value: this.props.value || '', // eslint-disable-line react/destructuring-assignment
  };

  UNSAFE_componentWillMount () { //eslint-disable-line
    const {
      error,
      name,
      query,
      value,
    } = this.props;

    this.updateValue(query[name] || value || '');

    // Show error, if already set
    if (error !== null) this.showError();
  }

  UNSAFE_componentWillReceiveProps (nextProps) { //eslint-disable-line
    const {name} = this.props;

    if (nextProps.error) this.showError();
    if (!this.needsUpdate(nextProps)) return;
    this.updateValue(nextProps.query[name] || nextProps.value || '');
  }

  // Property initializer binds method to class instance
  onChange = (...args) => {
    const {onChange} = this.props;

    this.updateValue(args[0].target.value);
    if (onChange) onChange(...args);
    this.hideError();
  };

  /**
   * determines which classNames should be added to the container div of
   * the component
   *
   * @return {string} [list of classNames split by space]
   */
  get containerClassNames () {
    const {inputStyle, requiredLabel} = this.props;
    const classNames = ['formGroup', inputStyle, 'selectContainer'];

    if (requiredLabel) classNames.push('paddingTop');

    return classNames;
  }

  get options () {
    const {
      options,
      items,
      sort,
    } = this.props;
    const allOptions = (Object.keys(options).length && options) || items;

    const mappedOptions = Object.keys(allOptions)
      .map(key => ({
        key: (allOptions)[key].key || key,
        value: (allOptions)[key].value || (allOptions)[key],
      }));

    if (sort) {
      return mappedOptions.sort(sort);
    }

    return mappedOptions;
  }

  needsUpdate ({value, query}) {
    const {
      value: pValue,
      query: pQuery,
    } = this.props;

    return (
      value !== pValue ||
        query !== pQuery
    );
  }

  updateValue (value) {
    this.setState({value});
  }

  showError () {
    this.setState({showError: true});
  }

  hideError () {
    this.setState({showError: false});
  }

  hasError () {
    const {showError} = this.state;
    const {error} = this.props;

    return showError && error;
  }

  render () {
    const {
      autoFocus,
      defaultItem,
      defaultRequired,
      disabled,
      error,
      errorSubInfo,
      id,
      label,
      labelHidden,
      isRequired,
      name,
      onBlur,
      onFocus,
      reference,
      requiredLabel,
      title,
    } = this.props;
    const {value} = this.state;

    const errorClass = this.hasError() ? 'controlLabelError' : '';
    const mappedOptions = this.options;

    return (
      <ThemeContext.Consumer>
        {(context) => {
          const theme = themeable({...sharedStyles, ...styles, ...context});

          return (
            <div
              className={theme(...this.containerClassNames)}
              id={`${name}-container`}
            >

              {requiredLabel && (
              <span className={theme('controlNote', 'controlLabelRequired')}>
                {requiredLabel}
              </span>
              )}

              {label || title ? (
                <Label
                  classNames={theme(errorClass)}
                  id={id}
                  labelHidden={labelHidden}
                  value={label || title}
                />
              ) : null}

              <div className={theme('innerSelectContainer')}>
                <select
                  autoFocus={autoFocus}
                  className={theme('select', 'formControl', `${this.hasError() ? 'formControlError' : ''}`)}
                  disabled={disabled}
                  id={id}
                  name={name}
                  onBlur={onBlur}
                  onChange={this.onChange}
                  onFocus={onFocus}
                  ref={reference}
                  required={isRequired}
                  value={value}
                >

                  {defaultRequired && (
                  <option
                    hidden
                    value=""
                  >
                    {defaultRequired}
                  </option>
                  )}

                  {defaultItem &&
                    <option value="">{defaultItem}</option>}

                  {mappedOptions.map(item => (
                    <option
                      key={item.key}
                      value={item.key}
                    >
                      {item.value}
                    </option>
                  ))}
                </select>

                {this.hasError() && (
                <Error
                  info={error}
                  subInfo={errorSubInfo}
                />
                )}

                <span className={theme('selectCaret')}>
                  <svg
                    x="0px"
                    y="0px"
                    viewBox="-248 252.9 13.4 9.1"
                  >
                    <path
                      fill="#20292D"
                      d="M-235,255.7l-5.9,5.8c-0.1,0.1-0.2,0.2-0.3,0.2c-0.1,0-0.3-0.1-0.4-0.2l-5.9-5.8c-0.1-0.2-0.1-0.3-0.1-0.4
          c0-0.1,0-0.3,0.2-0.4l1.3-1.3c0.1-0.1,0.2-0.2,0.4-0.2s0.3,0.1,0.4,0.2l4.2,4.2l4.1-4.2c0.1-0.1,0.2-0.2,0.4-0.2
          c0.1,0,0.3,0.1,0.4,0.2l1.2,1.3c0.1,0.1,0.2,0.2,0.2,0.4C-234.8,255.4-234.9,255.5-235,255.7z"
                    />
                  </svg>
                </span>
              </div>
            </div>
          );
        }}
      </ThemeContext.Consumer>
    );
  }
}

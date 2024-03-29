/* eslint-disable import/order, import/no-unresolved */
import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import isDate from 'date-fns/isDate';
import 'react-datepicker/dist/react-datepicker.css';
import ThemeContext from 'utils/themeContext';
import themeable from 'utils/theming';

import Error from '../Error';
import sharedStyles from '../index.scss';

import styles from './index.scss';

export default class DatePickerComponent extends React.Component {
  static propTypes = {
    dateFormat: PropTypes.string,
    disabled: PropTypes.bool,
    error: PropTypes.string,
    errorSubInfo: PropTypes.string,
    icon: PropTypes.element,
    id: PropTypes.string.isRequired,
    inputStyle: PropTypes.string,
    isRequired: PropTypes.bool,
    label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    labelHidden: PropTypes.bool,
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    query: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    requiredLabel: PropTypes.string,
    showAbbreviatedMonthDropdown: PropTypes.bool,
    showMonthDropdown: PropTypes.bool,
    showYearDropdown: PropTypes.bool,
    title: PropTypes.string,
    value: PropTypes.instanceOf(Date),
  };

  static defaultProps = {
    dateFormat: 'dd/MM/yyyy',
    disabled: false,
    error: null,
    errorSubInfo: null,
    icon: null,
    inputStyle: 'inline',
    isRequired: false,
    label: null,
    labelHidden: false,
    onBlur: () => {},
    onChange: () => {},
    onFocus: () => {},
    query: {},
    requiredLabel: '',
    showAbbreviatedMonthDropdown: false,
    showMonthDropdown: false,
    showYearDropdown: false,
    title: null,
    value: null,
  };

  state = {
    showError: false,
    value: this.props.value, // eslint-disable-line react/destructuring-assignment
  }

  componentWillMount () {
    const {
      error,
      query,
      name,
      value,
    } = this.props;

    this.updateValue(query[name] || value || '');

    // Show error, if already set
    if (error !== null) this.showError();
  }

  componentWillReceiveProps (nextProps) {
    const {name} = this.props;

    if (nextProps.error) this.showError();
    this.updateValue(nextProps.query[name] ||
      nextProps.value ||
      '');
  }

  // Property initializer binds method to class instance
  onChange = (value) => {
    const {
      onChange,
      name,
    } = this.props;

    this.updateValue(value);
    this.hideError();

    /*
     * react-datepicker won't return a native DOM event
     * on their onChange callback, so we need to create
     * a fake one, because React form libraries will
     * expect a DOM event object to process this field
     */
    onChange({
      target: {
        name,
        value,
      },
    });
  };

  getLabel (theme) {
    const {
      id,
      title,
      label,
      labelHidden,
    } = this.props;

    if (!label && !title) return null;

    if (labelHidden) return <span className={theme('srOnly')}>{label || title}</span>;

    /**
     * generates the TextField label based on the Textfield label prop
     *
     * @return {ReactElement} [Either returns a label or a react element with the added css class labelContainer]
    */
    if (typeof label === 'string' || typeof title === 'string') {
      return (
        <label
          className={theme('controlLabel', `${this.hasError() ? 'controlLabelError' : ''}`)}
          htmlFor={id}
        >
          {label || title}
        </label>
      );
    }

    // We don't simply put a more complex element inside a label to prevent a
    // clickable element like a link or button inside a label
    // However to also add the labelContainer class, we need to return a cloned
    // element and not just the label - element itself
    return React.cloneElement(
      label,
      {
        ...label.props,
        className: theme('controlLabel'),
      },
    );
  }

  showError () {
    this.setState({showError: true});
  }

  hideError () {
    this.setState({showError: false});
  }

  updateValue (value) {
    this.setState({value});
  }

  hasError () {
    const {error} = this.props;
    const {showError} = this.state;

    return showError && error;
  }

  render () {
    const {
      dateFormat,
      disabled,
      error,
      errorSubInfo,
      icon,
      id,
      inputStyle,
      isRequired,
      name,
      onBlur,
      onFocus,
      requiredLabel,
      showAbbreviatedMonthDropdown,
      showMonthDropdown,
      showYearDropdown,
    } = this.props;

    const {value} = this.state;

    return (
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
              className={theme('formGroup', inputStyle, 'datePickerContainer', `${requiredLabel ? 'paddingTop' : ''}`)}
              id={`${name}-container`}
            >
              {requiredLabel && (
              <span className={theme('controlNote', 'controlLabelRequired')}>
                {requiredLabel}
              </span>
              )}

              {this.getLabel(theme)}

              <div className={theme('datePickerInnerContainer')}>
                <DatePicker
                  className={theme('formControl', `${this.hasError() ? 'formControlError' : ''}`)}
                  dateFormat={dateFormat}
                  disabled={disabled}
                  id={id}
                  name={name}
                  onBlur={onBlur}
                  onChange={this.onChange}
                  onFocus={onFocus}
                  required={isRequired}
                  selected={isDate(value) ? value : null}
                  showMonthDropdown={showMonthDropdown}
                  showYearDropdown={showYearDropdown}
                  useShortMonthInDropdown={showAbbreviatedMonthDropdown}
                />

                {icon ? (
                  <span className={theme('dropDownIcon')}>
                    {icon}
                  </span>
                ) : ''}

                {this.hasError() && (
                <Error
                  info={error}
                  subInfo={errorSubInfo}
                />
                )}
              </div>
            </div>
          );
        }}
      </ThemeContext.Consumer>
    );
  }
}

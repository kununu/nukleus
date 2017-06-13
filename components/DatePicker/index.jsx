import React, {Component, PropTypes} from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

import styles from './index.scss';

import Error from '../Error';
import {
  controlLabel,
  controlLabelError,
  controlLabelRequired,
  controlNote,
  formControl,
  formControlError,
  formGroup
} from '../index.scss';

export default class DatePickerComponent extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    error: PropTypes.string,
    errorSubInfo: PropTypes.string,
    icon: PropTypes.element,
    id: PropTypes.string.isRequired,
    inputStyle: PropTypes.string,
    isClearable: PropTypes.bool,
    isRequired: PropTypes.bool,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    query: PropTypes.object,
    requiredLabel: PropTypes.string,
    title: PropTypes.string.isRequired,
    value: PropTypes.string
  };

  static defaultProps = {
    disabled: false,
    error: null,
    errorSubInfo: null,
    icon: null,
    inputStyle: 'inline',
    isClearable: true,
    isRequired: false,
    placeholder: '',
    query: {},
    requiredLabel: '',
    value: ''
  };

  state = {
    showError: false,
    value: this.props.value
  }

  componentWillMount () {
    this.updateValue(
      this.props.query[this.props.name] ||
      this.props.value ||
      ''
    );

    // Show error, if already set
    if (this.props.error !== null) this.showError();
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.error) this.showError();
    this.updateValue(
      nextProps.query[this.props.name] ||
      nextProps.value ||
      ''
    );
  }

  // Property initializer binds method to class instance
  onChange = date => {
    this.updateValue(date);
    this.hideError();
  };

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
    return this.state.showError && this.props.error;
  }

  render () {
    const {
      title,
      name,
      icon,
      id,
      error,
      errorSubInfo,
      inputStyle,
      disabled,
      isClearable,
      placeholder,
      isRequired,
      requiredLabel
    } = this.props;

    return (
      <div className={`${formGroup} ${styles[inputStyle]} ${styles.datePickerContainer} ${requiredLabel ? styles.paddingTop : ''}`}>
        {requiredLabel &&
          <span className={`${controlNote} ${controlLabelRequired}`}>
            {requiredLabel}
          </span>
        }

        <label
          className={`${controlLabel} ${this.hasError() ? controlLabelError : ''}`}
          htmlFor={id}>

          {title}
        </label>

        <div className={styles.innerContainer}>
          <DatePicker
            className={`${formControl} ${this.hasError() ? formControlError : ''}`}
            name={name}
            id={id}
            disabled={disabled}
            placeholderText={placeholder}
            selected={this.state.value ? moment(this.state.value) : null}
            isClearable={isClearable}
            showYearDropdown
            required={isRequired}
            onChange={this.onChange} />
          {icon ?
            <span className={styles.icon}>
              {icon}
            </span>
          : ''}

          {this.hasError() &&
            <Error
              info={error}
              subInfo={errorSubInfo} />
            }
        </div>

      </div>
    );
  }
}

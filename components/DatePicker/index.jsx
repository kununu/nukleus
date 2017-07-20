import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

import styles from './index.scss';

import Error from '../Error';
import {
  controlLabel,
  controlLabelRequired,
  controlNote,
  formControl,
  formControlError,
  formGroup
} from '../index.scss';

export default class DatePickerComponent extends React.Component {
  static propTypes = {
    disabled: PropTypes.bool,
    error: PropTypes.string,
    errorSubInfo: PropTypes.string,
    icon: PropTypes.element,
    id: PropTypes.string.isRequired,
    inputStyle: PropTypes.string,
    isRequired: PropTypes.bool,
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
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
    isRequired: false,
    onBlur: () => {},
    onChange: () => {},
    onFocus: () => {},
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
    this.props.onChange(date);
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
          className={`${controlLabel} ${this.hasError() ? styles.controlLabelError : ''}`}
          htmlFor={id}>

          {title}
        </label>

        <div className={styles.innerContainer}>
          <DatePicker
            className={`${formControl} ${this.hasError() ? formControlError : ''}`}
            name={name}
            id={id}
            disabled={disabled}
            selected={this.state.value ? moment(this.state.value) : null}
            required={isRequired}
            onBlur={this.props.onBlur}
            onChange={this.onChange}
            onFocus={this.props.onFocus} />
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

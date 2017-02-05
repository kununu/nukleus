import React, {Component, PropTypes} from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

import styles from './index.scss';

import {
  errorStyles,
  controlLabel,
  formControl,
  formGroup
} from '../index.scss';

export default class DatePickerComponent extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    error: PropTypes.string,
    id: PropTypes.string.isRequired,
    inputStyle: PropTypes.string,
    isClearable: PropTypes.bool,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    query: PropTypes.object,
    required: PropTypes.bool,
    title: PropTypes.string.isRequired,
    value: PropTypes.string
  };

  static defaultProps = {
    disabled: false,
    error: null,
    inputStyle: 'inline',
    isClearable: true,
    placeholder: '',
    query: {},
    required: false
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

  render () {
    const {
      title,
      name,
      id,
      error,
      inputStyle,
      disabled,
      isClearable,
      placeholder,
      required
    } = this.props;

    return (
      <div className={`${formGroup} ${styles[inputStyle]} ${styles.datePickerContainer}`}>
        <label
          className={controlLabel}
          htmlFor={id}>

          {title}
        </label>

        <div className={styles.innerContainer}>
          <DatePicker
            className={formControl}
            name={name}
            id={id}
            disabled={disabled}
            placeholderText={placeholder}
            selected={this.state.value ? moment(this.state.value) : null}
            isClearable={isClearable}
            showYearDropdown
            required={required}
            onChange={this.onChange} />

          <span className={styles.icon}>
            <i className="fa fa-calendar" aria-hidden="true" />
          </span>
        </div>

        {this.state.showError &&
          <span className={errorStyles}>
            {error}
          </span>}
      </div>
    );
  }
}

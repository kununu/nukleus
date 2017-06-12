// Read more about controlled components
// https://facebook.github.io/react/docs/forms.html#controlled-components
import React, {Component, PropTypes} from 'react';

import styles from './index.scss';

import Error from '../Error';
import {
  controlLabel,
  controlLabelError,
  controlNote,
  hidden,
  formControl,
  formControlError,
  formGroup,
  srOnly,
  controlLabelRequired
} from '../index.scss';

export default class TextField extends Component {
  static propTypes = {
    autoComplete: PropTypes.string,
    autoFocus: PropTypes.bool,
    disable: PropTypes.bool,
    error: PropTypes.string,
    errorSubInfo: PropTypes.string,
    id: PropTypes.string.isRequired,
    inputStyle: PropTypes.string,
    isRequired: PropTypes.bool,
    label: PropTypes.string.isRequired,
    labelHidden: PropTypes.bool,
    maxLength: PropTypes.number,
    multiLine: PropTypes.bool,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    pattern: PropTypes.string,
    placeholder: PropTypes.string,
    query: PropTypes.object,
    requiredLabel: PropTypes.string,
    rows: PropTypes.number,
    title: PropTypes.string,
    type: PropTypes.oneOf([
      'email',
      'password',
      'text',
      'url'
    ]),
    value: PropTypes.string
  };

  static defaultProps = {
    autoComplete: 'off',
    autoFocus: false,
    disable: false,
    error: null,
    errorSubInfo: null,
    inputStyle: 'inline',
    isRequired: false,
    labelHidden: false,
    maxLength: 500,
    multiLine: false,
    onChange: null,
    pattern: '',
    placeholder: '',
    query: {},
    requiredLabel: '',
    rows: 5,
    title: '',
    type: 'text',
    value: ''
  };

  state = {
    showError: false,
    value: this.props.value || ''
  };

  componentWillMount () {
    this.updateValue(this.props.query[this.props.name] || this.props.value || '');

    // Show error, if already set
    if (this.props.error !== null) this.showError();
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.error) {
      this.showError();
    } else {
      if (!this.needsUpdate(nextProps)) return;
      this.updateValue(
        nextProps.query[this.props.name] ||
        nextProps.value ||
        ''
      );
    }
  }

  // Property initializer binds method to class instance
  onChange = (...args) => {
    this.updateValue(args[0].target.value);
    if (this.props.onChange) this.props.onChange(...args);
    this.hideError();
  };

  needsUpdate ({value, query}) {
    return (
      value !== this.props.value ||
      query !== this.props.query
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
    return this.state.showError && this.props.error;
  }

  render () {
    const {
      autoComplete,
      autoFocus,
      disable,
      error,
      errorSubInfo,
      id,
      inputStyle,
      label,
      labelHidden,
      maxLength,
      name,
      multiLine,
      pattern,
      placeholder,
      isRequired,
      rows,
      requiredLabel,
      title,
      type
    } = this.props;

    return (
      <div className={`${formGroup} ${styles[inputStyle]} ${requiredLabel ? styles.paddingTop : ''}`}>
        {requiredLabel && <span className={`${controlNote} ${controlLabelRequired}`}>{requiredLabel}</span>}
        {labelHidden && <span className={srOnly}>{label}</span>}

        <label
          className={`${controlLabel} ${labelHidden && hidden} ${this.hasError() ? controlLabelError : ''}`}
          htmlFor={id}>{label}</label>

        <div className={styles.inputContainer}>
          {
            multiLine ?
              <textarea
                autoFocus={autoFocus}
                className={`${formControl} ${styles.textarea} ${this.hasError() ? formControlError : ''}`}
                disabled={disable}
                id={id}
                name={name}
                maxLength={maxLength}
                onChange={this.onChange}
                pattern={pattern}
                placeholder={placeholder}
                required={isRequired}
                rows={rows}
                value={this.state.value} /> :
              <input
                autoComplete={autoComplete}
                autoFocus={autoFocus}
                className={`${formControl} ${this.hasError() ? formControlError : ''}`}
                disabled={disable}
                id={id}
                name={name}
                maxLength={maxLength}
                onChange={this.onChange}
                pattern={pattern}
                placeholder={placeholder}
                required={isRequired}
                title={title}
                type={type}
                value={this.state.value} />
          }

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

// Read more about controlled components
// https://facebook.github.io/react/docs/forms.html#controlled-components
import React, {Component, PropTypes} from 'react';

import styles from './index.scss';

import Error from '../Error';
import {
  controlLabel,
  controlLabelError,
  controlLabelRequired,
  controlNote,
  hidden,
  formControl,
  formControlError,
  formGroup,
  srOnly
} from '../index.scss';


export default class Select extends Component {
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
    items: PropTypes.object,
    labelHidden: PropTypes.bool,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    query: PropTypes.object,
    requiredLabel: PropTypes.string,
    title: PropTypes.string.isRequired,
    value: PropTypes.any
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
    items: {},
    labelHidden: false,
    onChange: null,
    query: {},
    requiredLabel: '',
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
    if (nextProps.error) this.showError();
    if (!this.needsUpdate(nextProps)) return;
    this.updateValue(nextProps.query[this.props.name] || nextProps.value || '');
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
      autoFocus,
      defaultItem,
      defaultRequired,
      disabled,
      error,
      errorSubInfo,
      id,
      inputStyle,
      items,
      labelHidden,
      name,
      isRequired,
      requiredLabel,
      title
    } = this.props;

    return (
      <div className={`${formGroup} ${styles[inputStyle]} ${requiredLabel ? styles.paddingTop : ''}`}>
        {labelHidden && <span className={srOnly}>{title}</span>}

        {requiredLabel &&
          <span className={`${controlNote} ${controlLabelRequired}`}>
            {requiredLabel}
          </span>
        }

        <label
          className={`${controlLabel} ${labelHidden && hidden} ${this.hasError() ? controlLabelError : ''}`}
          htmlFor={id}>{title}</label>

        <div className={styles.inputContainer}>

          <select
            name={name}
            value={this.state.value}
            id={id}
            required={isRequired}
            autoFocus={autoFocus}
            onChange={this.onChange}
            className={`${formControl} ${styles.select} ${this.hasError() ? formControlError : ''}`}
            disabled={disabled}>

            {defaultRequired &&
              <option value="" hidden>{defaultRequired}</option>}

            {defaultItem &&
              <option value="">{defaultItem}</option>}

            {Object.keys(items).map(value =>
              <option
                key={value}
                value={value}>{items[value]}</option>
            )}
          </select>

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

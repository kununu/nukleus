// Read more about controlled components
// https://facebook.github.io/react/docs/forms.html#controlled-components
import React, {Component, PropTypes} from 'react';

import styles from './index.scss';

import Error from '../Error';
import InfoLabel from '../InfoLabel';
import {
  controlLabel,
  hidden,
  formControl,
  formControlError,
  formGroup,
  srOnly
} from '../index.scss';

export default class TextField extends Component {
  static propTypes = {
    autoComplete: PropTypes.string,
    autoFocus: PropTypes.bool,
    disable: PropTypes.bool,
    displayLength: PropTypes.bool,
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
    onBlur: PropTypes.func,
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
    displayLength: false,
    error: null,
    errorSubInfo: null,
    inputStyle: 'inline',
    isRequired: false,
    labelHidden: false,
    maxLength: 500,
    multiLine: false,
    onBlur: null,
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

  get inputStyleClassNames () {
    const {
      inputStyle,
      requiredLabel,
      displayLength
    } = this.props;
    const classNames = [formGroup];

    // Add all styles that are added via inputStyles
    const inputStyles = inputStyle.split(' ');
    inputStyles.map(style => classNames.push(styles[style]));

    if (requiredLabel || displayLength) classNames.push(styles.paddingTop);

    return classNames.join(' ');
  }

  get labelClassNames () {
    const {
      inputStyle,
      labelHidden
    } = this.props;
    const classNames = [controlLabel];

    const inputStyles = inputStyle.split(' ');

    // Check if label should be hidden
    if (labelHidden) classNames.push(hidden);

    // Check if TextField contains an error
    if (this.hasError()) classNames.push(styles.controlLabelError);

    if (inputStyles.includes('mediumSize')) classNames.push(styles.controlLabelMediumSize);

    return classNames.join(' ');
  }

  get textFieldClassNames () {
    const {multiLine} = this.props;
    const classNames = [formControl];

    // Check if textarea styles need to be added
    if (multiLine) classNames.push(styles.textarea);

    // Check if error styles need to be added
    if (this.hasError()) classNames.push(formControlError);

    return classNames.join(' ');
  }

  hasError () {
    return this.state.showError && this.props.error;
  }

  render () {
    const {
      autoComplete,
      autoFocus,
      disable,
      displayLength,
      error,
      errorSubInfo,
      id,
      isRequired,
      label,
      labelHidden,
      maxLength,
      name,
      multiLine,
      onBlur,
      pattern,
      placeholder,
      requiredLabel,
      rows,
      title,
      type
    } = this.props;

    return (
      <div className={this.inputStyleClassNames}>
        <InfoLabel
          requiredLabel={requiredLabel}
          inputValue={this.state.value}
          displayLength={displayLength}
          maxLength={maxLength} />
        {labelHidden && <span className={srOnly}>{label}</span>}

        <label className={this.labelClassNames} htmlFor={id}>{label}</label>

        <div className={styles.inputContainer}>
          {
            multiLine ?
              <textarea
                autoFocus={autoFocus}
                className={this.textFieldClassNames}
                disabled={disable}
                id={id}
                name={name}
                maxLength={maxLength}
                onChange={this.onChange}
                onBlur={onBlur}
                pattern={pattern}
                placeholder={placeholder}
                required={isRequired}
                rows={rows}
                value={this.state.value} /> :
              <input
                autoComplete={autoComplete}
                autoFocus={autoFocus}
                className={this.textFieldClassNames}
                disabled={disable}
                id={id}
                name={name}
                maxLength={maxLength}
                onChange={this.onChange}
                onBlur={onBlur}
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

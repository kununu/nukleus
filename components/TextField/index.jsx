// Read more about controlled components
// https://facebook.github.io/react/docs/forms.html#controlled-components
import React, {Component, PropTypes} from 'react';

import styles from './index.scss';

import Error from '../Error';
import InfoLabel from '../InfoLabel';
import sharedStyles, {
  controlLabel,
  formControl,
  formControlError,
  formGroup,
  hidden,
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
    label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]).isRequired,
    labelHidden: PropTypes.bool,
    maxLength: PropTypes.number,
    multiLine: PropTypes.bool,
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    pattern: PropTypes.string,
    placeholder: PropTypes.string,
    query: PropTypes.object,
    reference: PropTypes.func,
    requiredLabel: PropTypes.string,
    rows: PropTypes.number,
    sanitizeValue: PropTypes.func,
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
    reference: () => {},
    requiredLabel: '',
    rows: 5,
    sanitizeValue: value => value,
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
    this.updateValue(this.props.sanitizeValue(args[0].target.value));
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

  /**
   * determines which classNames should be added to the container of
   * the component
   *
   * @return {string} [list of classNames split by space]
   */
  get containerClassNames () {
    const {
      inputStyle,
      requiredLabel,
      displayLength
    } = this.props;
    const classNames = [formGroup];

    // Add all styles that are added via inputStyles
    const inputStyles = inputStyle.split(' ');
    inputStyles.map(style => classNames.push(sharedStyles[style]));

    if (requiredLabel || displayLength) classNames.push(sharedStyles.paddingTop);

    return classNames.join(' ');
  }

  /**
   * determines which classNames should be added to the label of
   * the component
   *
   * @return {string} [list of classNames split by space]
   */
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
    if (this.hasError()) classNames.push(sharedStyles.controlLabelError);

    if (inputStyles.includes('mediumSize')) classNames.push(sharedStyles.controlLabelMediumSize);

    return classNames.join(' ');
  }

  /**
   * determines which classNames should be added to the input of
   * the component
   *
   * @return {string} [list of classNames split by space]
   */
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

  /**
   * determines which classNames should be added to the label of
   * the component
   *
   * @return {ReactElement} [list of classNames split by space]
   */
  get label () {
    const {
      id,
      label
    } = this.props;

    if (typeof label === 'string') {
      return <label className={this.labelClassNames} htmlFor={id}>{label}</label>;
    }

    // We don't simply put a more complex element inside a label to prevent a
    // clickable element like a link or button inside a label
    // However to also add the labelContainer class, we need to return a cloned
    // element and not just the label - element itself
    return React.cloneElement(
      label,
      {
        ...label.props,
        className: `${label.props.className} ${sharedStyles.labelContainer}`
      }
    );
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
      reference,
      requiredLabel,
      rows,
      title,
      type
    } = this.props;

    return (
      <div className={this.containerClassNames}>
        <InfoLabel
          requiredLabel={requiredLabel}
          inputValue={this.state.value}
          displayLength={displayLength}
          maxLength={maxLength} />
        {labelHidden && <span className={srOnly}>{label}</span>}

        {this.label}

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
                ref={reference}
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
                ref={reference}
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

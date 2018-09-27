/* eslint "react/no-array-index-key": 0 */

// Read more about controlled components
// https://facebook.github.io/react/docs/forms.html#controlled-components
import React from 'react';
import PropTypes from 'prop-types';
import {queryParamsToObject} from 'utils/params';

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

export default class TextField extends React.Component {
  static propTypes = {
    autoComplete: PropTypes.string,
    autoFocus: PropTypes.bool,
    disable: PropTypes.bool,
    displayLength: PropTypes.bool,
    dynamicTextareaHeight: PropTypes.bool,
    error: PropTypes.string,
    errorSubInfo: PropTypes.string,
    highlightList: PropTypes.object,
    id: PropTypes.string.isRequired,
    inputStyle: PropTypes.string,
    isRequired: PropTypes.bool,
    label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]).isRequired,
    labelHidden: PropTypes.bool,
    maxLength: PropTypes.number,
    minHeight: PropTypes.number,
    multiLine: PropTypes.bool,
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onHighlight: PropTypes.func,
    pattern: PropTypes.string,
    placeholder: PropTypes.string,
    query: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),
    reference: PropTypes.func,
    requiredLabel: PropTypes.string,
    rows: PropTypes.number,
    sanitizeValue: PropTypes.func,
    title: PropTypes.string,
    type: PropTypes.oneOf([
      'email',
      'password',
      'text',
      'url',
      'number',
      'hidden'
    ]),
    value: PropTypes.string
  };

  static defaultProps = {
    autoComplete: 'off',
    autoFocus: false,
    disable: false,
    displayLength: false,
    dynamicTextareaHeight: true,
    error: null,
    errorSubInfo: null,
    highlightList: null,
    inputStyle: 'inline',
    isRequired: false,
    labelHidden: false,
    maxLength: 500,
    minHeight: null,
    multiLine: false,
    onBlur: () => {},
    onChange: null,
    onFocus: () => {},
    onHighlight: () => {},
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
    highlightedContent: '',
    showError: false,
    textAreaHeight: null,
    value: this.props.value || ''
  };

  componentWillMount () {
    const {query} = this.props;
    const queryObject = queryParamsToObject(query);

    this.updateValue(queryObject[this.props.name] || this.props.value || '');

    // Show error, if already set
    if (this.props.error !== null) this.showError();
  }

  componentWillReceiveProps (nextProps) {
    const queryObject = queryParamsToObject(nextProps.query);

    if (nextProps.error) {
      this.showError();
    } else {
      if (!this.needsUpdate(nextProps)) return;
      this.updateValue(queryObject[this.props.name] ||
        nextProps.value ||
        '');
    }
  }

  // Property initializer binds method to class instance
  onChange = (...args) => {
    const {target} = args[0];
    const {
      dynamicTextareaHeight,
      highlightList,
      multiLine,
      onChange
    } = this.props;

    this.updateValue(this.props.sanitizeValue(target.value));
    if (onChange) this.props.onChange(...args);

    if (dynamicTextareaHeight && multiLine) {
      this.setDynamicTextAreaHeight(target);
    }

    if (highlightList) {
      this.setState({
        highlightedContent: this.getHighlightedContent(target.value)
      });
    }

    this.hideError();
  };

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

    if (inputStyles.indexOf('mediumSize') !== -1) classNames.push(sharedStyles.controlLabelMediumSize);

    return classNames.join(' ');
  }

  /**
   * determines which classNames should be added to the input of
   * the component
   *
   * @return {string} [list of classNames split by space]
   */
  get textFieldClassNames () {
    const {
      multiLine,
      highlightList
    } = this.props;
    const classNames = [formControl];

    // Check if textarea styles need to be added
    if (multiLine) classNames.push(styles.textarea);

    if (multiLine && highlightList) classNames.push(styles.dynamicHeight);

    // Check if error styles need to be added
    if (this.hasError()) classNames.push(formControlError);

    return classNames.join(' ');
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
   * generates the TextField label based on the Textfield label prop
   *
   * @return {ReactElement} [Either returns a label or a react element with the added css class labelContainer]
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
    const classNames = [sharedStyles.labelContainer];

    if (label.props.className) classNames.push(label.props.className);

    return React.cloneElement(
      label,
      {
        ...label.props,
        className: classNames.join(' ')
      }
    );
  }

  getHighlightedContent = contents => {
    const contentRegex = /([^a-zA-Z]+)/;
    const userInputArray = contents.split(contentRegex);

    const {
      highlightList,
      onHighlight
    } = this.props;

    return userInputArray.map((part, i) => {
      if (highlightList[part.toLowerCase()]) {
        onHighlight();
        return <span className={styles.highlighted} key={i}>{part}</span>;
      }
      return part;
    });
  }

  setDynamicTextAreaHeight = target => {
    const oldHeight = Number(this.state.textAreaHeight);
    const currentHeight = target.scrollHeight;

    // Fix so when you backspace it will reduce the correct height
    const newHeight = oldHeight > currentHeight ? currentHeight - 20 : currentHeight;

    if (newHeight > (this.props.minHeight || 134)) {
      this.setState({
        textAreaHeight: newHeight
      });
    }
  }

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
   * determines which styles should be applied to the textarea
   *
   * @return {object} [object with camelCased properties]
   */
  textAreaStyles = () => {
    const {
      highlightList,
      minHeight
    } = this.props;
    const textAreaStyles = {};

    if (highlightList && minHeight) textAreaStyles.minHeight = minHeight;
    if (this.state.textAreaHeight) textAreaStyles.height = `${this.state.textAreaHeight}px`;

    return textAreaStyles;
  }

  hasError () {
    return this.state.showError && this.props.error;
  }

  render () {
    const {
      autoComplete,
      autoFocus,
      highlightList,
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
      onFocus,
      pattern,
      placeholder,
      reference,
      requiredLabel,
      rows,
      title,
      type
    } = this.props;

    const {highlightedContent} = this.state;

    return (
      <div className={this.containerClassNames} id={`${name}-container`}>
        {this.state.highlightContent}
        <InfoLabel
          requiredLabel={requiredLabel}
          inputValue={this.state.value}
          displayLength={displayLength}
          maxLength={maxLength} />
        {labelHidden && <span className={srOnly}>{label}</span>}

        {this.label}

        <div className={styles.inputContainer}>
          {highlightList ?
            <div className={`${styles.highlightOverlay} ${this.textFieldClassNames}`}>
              {highlightedContent}
            </div>
            : null
          }
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
                onFocus={onFocus}
                pattern={pattern}
                placeholder={placeholder}
                required={isRequired}
                ref={reference}
                rows={rows}
                style={this.textAreaStyles()}
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
                onFocus={onFocus}
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

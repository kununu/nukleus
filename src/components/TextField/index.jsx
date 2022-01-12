/* eslint-disable jsx-a11y/no-autofocus */
// Read more about controlled components
// https://facebook.github.io/react/docs/forms.html#controlled-components
import React from 'react';
import PropTypes from 'prop-types';

import {queryParamsToObject} from 'utils/params';
import ThemeContext from 'utils/themeContext';
import themeable from 'utils/theming';

import Error from '../Error';
import InfoLabel from '../InfoLabel';
import sharedStyles from '../index.scss';

import styles from './index.scss';

export default class TextField extends React.Component {
  static propTypes = {
    autoComplete: PropTypes.string,
    autoFocus: PropTypes.bool,
    disable: PropTypes.bool,
    displayLength: PropTypes.bool,
    dynamicTextareaHeight: PropTypes.bool,
    error: PropTypes.string,
    errorSubInfo: PropTypes.string,
    highlightList: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    id: PropTypes.string.isRequired,
    inputStyle: PropTypes.string,
    isRequired: PropTypes.bool,
    label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
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
      PropTypes.object,
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
      'hidden',
    ]),
    value: PropTypes.string,
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
    value: '',
  };

  state = {
    highlightedContent: '',
    showError: false,
    textAreaHeight: null,
    value: this.props.value || '', // eslint-disable-line react/destructuring-assignment
  };

  UNSAFE_componentWillMount () { // eslint-disable-line
    const {
      error,
      name,
      query,
      value,
    } = this.props;
    const queryObject = queryParamsToObject(query);

    this.updateValue(queryObject[name] || value || '');

    // Show error, if already set
    if (error !== null) this.showError();
  }

  UNSAFE_componentWillReceiveProps (nextProps) { // eslint-disable-line
    const {name} = this.props;
    const queryObject = queryParamsToObject(nextProps.query);

    if (nextProps.error) {
      this.showError();
    } else {
      if (!this.needsUpdate(nextProps)) return;
      this.updateValue(queryObject[name] ||
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
      onChange,
      sanitizeValue,
    } = this.props;

    this.updateValue(sanitizeValue(target.value));
    if (onChange) onChange(...args);

    if (dynamicTextareaHeight && multiLine) {
      this.setDynamicTextAreaHeight(target);
    }

    if (highlightList) {
      this.setState({highlightedContent: this.getHighlightedContent(target.value)});
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
      labelHidden,
    } = this.props;
    const inputStyles = inputStyle.split(' ');
    const classNames = ['controlLabel', 'labelContainer', ...inputStyles];

    // Check if label should be hidden
    if (labelHidden) classNames.push('hidden');

    // Check if TextField contains an error
    if (this.hasError()) classNames.push('controlLabelError');

    return classNames;
  }

  /**
   * determines which classNames should be added to the input of
   * the component
   *
   * @return {string} [list of classNames split by space]
   */
  get textFieldClassNames () {
    const {
      highlightList,
      multiLine,
    } = this.props;
    const classNames = ['formControl'];

    // Check if textarea styles need to be added
    if (multiLine) classNames.push('textarea');

    if (multiLine && highlightList) classNames.push('dynamicHeight');

    // Check if error styles need to be added
    if (this.hasError()) classNames.push('formControlError');

    return classNames;
  }

  /**
   * determines which classNames should be added to the container of
   * the component
   *
   * @return {string} [list of classNames split by space]
   */
  get containerClassNames () {
    const {
      displayLength,
      inputStyle,
      requiredLabel,
    } = this.props;
    const inputStyles = inputStyle.split(' ');
    const classNames = ['textFieldContainer', 'formGroup', ...inputStyles];

    if (requiredLabel || displayLength) classNames.push('paddingTop');

    return classNames;
  }

  getItem = ({props: {children}}) => {
    const {
      displayLength,
      maxLength,
      requiredLabel,
      value,
    } = this.props;

    if (maxLength || requiredLabel) {
      return (
        <>
          {children}

          <InfoLabel
            displayLength={displayLength}
            inputValue={value}
            maxLength={maxLength}
            requiredLabel={requiredLabel}
          />
        </>
      );
    }

    return children;
  }

  /**
   * generates the TextField label based on the Textfield label prop
   *
   * @return {ReactElement} [Either returns a label or a react element with the added css class labelContainer]
   */
  getLabel = (theme) => {
    const {
      displayLength,
      id,
      label,
      maxLength,
      requiredLabel,
      value,
    } = this.props;
    const flexStyles = (maxLength || requiredLabel) ? 'textFieldLabelFlex' : '';

    if (typeof label === 'string') {
      return (
        <label
          className={theme(flexStyles, ...this.labelClassNames)}
          htmlFor={id}
        >
          {label}

          <InfoLabel
            displayLength={displayLength}
            inputValue={value}
            maxLength={maxLength}
            requiredLabel={requiredLabel}
          />
        </label>
      );
    }

    // We don't simply put a more complex element inside a label to prevent a
    // clickable element like a link or button inside a label
    // However to also add the labelContainer class, we need to return a cloned
    // element and not just the label - element itself
    const classNames = [flexStyles, ...this.labelClassNames];

    if (label.props.className) classNames.push(label.props.className);

    return React.cloneElement(
      label,
      {
        ...label.props,
        className: theme(...classNames),
      },
      this.getItem(label),
    );
  }

  getHighlightedContent = (contents) => {
    const {
      highlightList,
      onHighlight,
    } = this.props;

    // returning all 3 possible capture groups ($1, $2 and $3)
    const getHighlightedWord = () => `$1<span class="${styles.highlighted}">$2</span>$3`;

    // escape special characters, e.g.: * = \*
    // $& means the whole matched string
    const escapeRegExp = string => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    return Object.keys(highlightList).reduce((acc, highlightWord) => {
      // Regex:
      // Basically we want to replace all occurrences in this string by wrapping them with a span tag
      // (^|\s) beginning of string or whitespace
      // ($|\s) end of string or whitespace
      // g all occurrences
      // i case insensitive
      // the two surrounding groups make sure that we don't have false positives because word is inside other word, e.g.: matching for "ly" should not lead to positive match in "positively"
      //
      const replacedAcc = acc.replace(new RegExp(`(^|\\s)(${escapeRegExp(highlightWord)})($|\\s)`, 'gi'), getHighlightedWord());

      // check if there was a new match, in that case call onHighlight
      if (replacedAcc !== acc) onHighlight();

      return replacedAcc;
    }, contents);
  }

  setDynamicTextAreaHeight = (target) => {
    const {minHeight} = this.props;
    const {textAreaHeight} = this.state;
    const oldHeight = Number(textAreaHeight);
    const currentHeight = target.scrollHeight;

    // Fix so when you backspace it will reduce the correct height
    const newHeight = oldHeight > currentHeight ? currentHeight - 20 : currentHeight;

    if (newHeight > (minHeight || 134)) {
      this.setState({textAreaHeight: newHeight});
    }
  }

  /**
   * determines which styles should be applied to the textarea
   *
   * @return {object} [object with camelCased properties]
   */
  textAreaStyles = () => {
    const {
      highlightList,
      minHeight,
    } = this.props;
    const {textAreaHeight} = this.state;
    const textAreaStyles = {};

    if (highlightList && minHeight) textAreaStyles.minHeight = minHeight;
    if (textAreaHeight) textAreaStyles.height = `${textAreaHeight}px`;

    return textAreaStyles;
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

  hasError () {
    const {showError} = this.state;
    const {error} = this.props;

    return showError && error;
  }

  render () {
    const {
      autoComplete,
      autoFocus,
      disable,
      error,
      errorSubInfo,
      highlightList,
      id,
      isRequired,
      label,
      labelHidden,
      maxLength,
      multiLine,
      name,
      onBlur,
      onFocus,
      pattern,
      placeholder,
      reference,
      rows,
      title,
      type,
    } = this.props;

    const {
      highlightedContent,
      value,
    } = this.state;

    return (
      <ThemeContext.Consumer>
        {(context) => {
          const theme = themeable({...sharedStyles, ...styles, ...context});

          return (
            <div
              className={theme(...this.containerClassNames)}
              id={`${name}-container`}
            >
              {labelHidden && <span className={theme('srOnly')}>{label}</span>}

              {this.getLabel(theme)}

              <div className={theme('innerTextFieldContainer')}>
                {highlightList ? (
                  <div
                    className={theme('highlightOverlay', ...this.textFieldClassNames)}
                    dangerouslySetInnerHTML={{
                      __html: highlightedContent,
                    }}
                  />
                ) : null
                }
                {
                  multiLine ? (
                    <textarea
                      autoFocus={autoFocus}
                      className={theme(...this.textFieldClassNames)}
                      disabled={disable}
                      id={id}
                      maxLength={maxLength}
                      name={name}
                      onBlur={onBlur}
                      onChange={this.onChange}
                      onFocus={onFocus}
                      pattern={pattern}
                      placeholder={placeholder}
                      ref={reference}
                      required={isRequired}
                      rows={rows}
                      style={this.textAreaStyles()}
                      value={value}
                    />
                  ) : (
                    <input
                      autoComplete={autoComplete}
                      autoFocus={autoFocus}
                      className={theme(...this.textFieldClassNames)}
                      disabled={disable}
                      id={id}
                      maxLength={maxLength}
                      name={name}
                      onBlur={onBlur}
                      onChange={this.onChange}
                      onFocus={onFocus}
                      pattern={pattern}
                      placeholder={placeholder}
                      ref={reference}
                      required={isRequired}
                      title={title}
                      type={type}
                      value={value}
                    />
                  )}

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

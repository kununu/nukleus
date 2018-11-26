import React from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import Scroll from 'react-scroll';
import debounce from 'debounce';

import getElementPositionY from 'utils/elementPosition';
import {queryParamsToObject} from 'utils/params';
import isMobile from 'utils/mobileDetection';

import styles from './index.scss';

import Error from '../Error';
import sharedStyles from '../index.scss';


export default class Autocomplete extends React.Component {
  static propTypes = {
    autoFocus: PropTypes.bool,
    data: PropTypes.object,
    debounceRate: PropTypes.number,
    disabled: PropTypes.bool,
    error: PropTypes.string,
    errorSubInfo: PropTypes.string,
    id: PropTypes.string.isRequired,
    inputStyle: PropTypes.string,
    isRequired: PropTypes.bool,
    label: PropTypes.string.isRequired,
    labelHidden: PropTypes.bool,
    name: PropTypes.string.isRequired,
    noSuggestionText: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ]),
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onGetSuggestions: PropTypes.func,
    onSelectSuggestion: PropTypes.func,
    placeholder: PropTypes.string,
    query: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),
    requiredLabel: PropTypes.string,
    scrollOffset: PropTypes.number,
    scrollTo: PropTypes.bool,
    spinner: PropTypes.element,
    submitOnEnter: PropTypes.bool,
    value: PropTypes.string
  };

  static defaultProps = {
    autoFocus: false,
    data: {},
    debounceRate: 500,
    disabled: false,
    error: null,
    errorSubInfo: null,
    inputStyle: 'inline',
    isRequired: false,
    labelHidden: false,
    noSuggestionText: 'No results found',
    onBlur: () => {},
    onChange: () => {},
    onFocus: () => {},
    onGetSuggestions: null,
    onSelectSuggestion: null,
    placeholder: '',
    query: {},
    requiredLabel: '',
    scrollOffset: 0,
    scrollTo: false,
    spinner: null,
    submitOnEnter: false,
    value: ''
  };

  state = {
    hasInitialized: false,
    showError: false,
    showNoSuggestionsText: false,
    suggestions: this.props.data.items || [],
    value: ''
  };

  componentWillMount () {
    const {query} = this.props;
    const queryObject = queryParamsToObject(query);
    this.updateValue(queryObject[this.props.name] || this.props.value || '');

    // Show error, if already set
    if (this.props.error !== null) this.showError();
  }

  componentWillReceiveProps (nextProps) {
    const {query} = this.props;
    const queryObject = queryParamsToObject(query);

    if (JSON.stringify(nextProps.data.items) !== JSON.stringify(this.props.data.items)) {
      this.setState({suggestions: nextProps.data.items});
    }

    if (nextProps.error) this.showError();
    if (!this.needsUpdate(nextProps)) return;
    this.updateValue(queryObject[this.props.name] || nextProps.value || '');
  }

  onChange = (event, {newValue}) => {
    this.setState({
      value: newValue
    });
    this.props.onChange(event);
    this.hideError();
  }

  onFocus = ev => {
    this.setState({
      showNoSuggestionsText: true
    });

    // Prevents autoscroll if element is not
    // in the DOM
    if (this.node) {
      this.scrollToElement();
    }

    this.props.onFocus(ev);
  }

  onBlur = ev => {
    this.hideNoSuggestionsText();
    this.setState({hasInitialized: false});
    this.props.onBlur(ev);
  }

  onSuggestionsFetchRequested = ({value}) => {
    this.debouncedLoadSuggestions(value);
  }

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  onSuggestionSelected = (e, {method, suggestion}) => {
    this.hideNoSuggestionsText();

    if (method === 'enter' && !this.props.submitOnEnter) {
      e.preventDefault();
    }

    if (this.props.onSelectSuggestion) {
      this.props.onSelectSuggestion(suggestion);
    }
  }

  /**
   * determines which classNames should be added to the container div of
   * the component
   *
   * @return {string} [list of classNames split by space]
   */
  get containerClassNames () {
    const {inputStyle, requiredLabel} = this.props;
    const classNames = [sharedStyles.formGroup, sharedStyles[inputStyle]];

    if (requiredLabel) classNames.push(styles.paddingTop);

    return classNames.join(' ');
  }

  /**
   * determines which classNames should be added to the label of
   * the component
   *
   * @return {string} [list of classNames split by space]
   */
  get labelClassNames () {
    const {labelHidden} = this.props;
    const classNames = [sharedStyles.controlLabel];

    if (labelHidden) classNames.push(sharedStyles.hidden);

    if (this.hasError()) classNames.push(sharedStyles.controlLabelError);

    return classNames.join(' ');
  }

  getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    if (inputValue) {
      this.setState({hasInitialized: true});

      if (this.props.onGetSuggestions) {
        this.props.onGetSuggestions(inputValue);
        return this.props.data.items;
      }

      return this.props.data.items.filter(data => data.item.toLowerCase().slice(0, inputLength) === inputValue);
    }

    return [];
  }

  getSuggestionValue = suggestion => suggestion.item;

  getSpinner () {
    const {
      spinner
    } = this.props;

    return spinner || (
      <span className={styles.spinner}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 50 51.9"
          aria-hidden="true">
          <path d="M46.7,12.2c0,4.1-3.1,7.2-7.1,7.2c-4,0-7.1-3.1-7.2-7c-0.1-4,3.1-7.3,7.1-7.3C43.5,5,46.7,8.2,46.7,12.2z" />
          <path d="M25.1,12.5c-3.5,0-6.3-2.6-6.3-6.1C18.7,2.8,21.4,0,24.9,0c3.5,0,6.3,2.6,6.3,6.1C31.3,9.6,28.6,12.4,25.1,12.5z" />
          <path d="M10.3,17.6c-2.9,0-5.3-2.4-5.2-5.4c0-2.9,2.5-5.3,5.4-5.3c2.9,0,5.3,2.5,5.3,5.4C15.7,15.3,13.3,17.6,10.3,17.6z" />
          <path d="M4.5,22.5c2.4,0,4.3,1.9,4.3,4.3c0,2.4-2,4.4-4.5,4.4c-2.4,0-4.3-1.9-4.3-4.3C0,24.4,1.9,22.5,4.5,22.5z" />
          <path d="M45.8,22.5c2.4,0.1,4.3,2,4.2,4.4c-0.1,2.5-2,4.4-4.5,4.3c-2.4-0.1-4.3-2.1-4.2-4.4C41.3,24.3,43.3,22.5,45.8,22.5z" />
          <path d="M6.1,41.4c0-2.5,1.9-4.3,4.3-4.3c2.5,0,4.4,2,4.4,4.4c0,2.4-2,4.3-4.4,4.3C8,45.9,6.1,43.8,6.1,41.4z" />
          <path d="M43.9,41.6c-0.1,2.4-2.1,4.3-4.4,4.3c-2.4,0-4.4-2.1-4.3-4.5c0.1-2.4,2-4.2,4.4-4.2C42.2,37.1,44,39,43.9,41.6z" />
          <path d="M25,43.2c2.5,0,4.5,2,4.4,4.4c-0.1,2.4-2,4.3-4.4,4.3c-2.4,0-4.3-1.9-4.4-4.3C20.5,45.1,22.5,43.2,25,43.2z" />
        </svg>
      </span>
    );
  }

  loadSuggestions (value) {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  }

  debouncedLoadSuggestions = debounce(this.loadSuggestions, this.props.debounceRate);

  hideNoSuggestionsText = () => {
    this.setState({
      showNoSuggestionsText: false
    });
  }

  showError () {
    this.setState({
      showError: true
    });
  }

  hideError () {
    this.setState({
      showError: false
    });
  }

  hasError () {
    return this.state.showError && this.props.error;
  }

  scrollToElement = () => {
    if (this.props.scrollTo && isMobile) {
      const elementPos = getElementPositionY(this.node, this.props.scrollOffset);
      const scroll = Scroll.animateScroll;
      scroll.scrollTo(elementPos);
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

  renderSuggestion = suggestion =>
    (
      <span>
        {suggestion.item}
        {(suggestion.itemInfo !== undefined && suggestion.itemInfo !== null && suggestion.itemInfo.length > 0) &&
          <span className={styles.suggestionInfo}>&nbsp;({suggestion.itemInfo})</span>
        }
      </span>
    );

  renderSuggestionsContainer = ({containerProps, children}) => {
    if (this.state.suggestions.length) {
      return (
        <div {...containerProps} className={styles.suggestionsContainer}>
          {children}
        </div>
      );
    }

    return null;
  }

  render () {
    const {
      autoFocus,
      data: {isFetching},
      disabled,
      error,
      errorSubInfo,
      label,
      labelHidden,
      id,
      isRequired,
      name,
      noSuggestionText,
      placeholder,
      requiredLabel
    } = this.props;

    const {
      hasInitialized,
      showNoSuggestionsText,
      suggestions,
      value
    } = this.state;

    const inputProps = {
      autoFocus,
      className: `${sharedStyles.formControl} ${this.hasError() ? sharedStyles.formControlError : ''}`,
      disabled,
      id,
      name,
      onBlur: this.onBlur,
      onChange: this.onChange,
      onFocus: this.onFocus,
      placeholder,
      required: isRequired,
      value
    };

    return (
      <div
        ref={node => this.node = node}
        className={this.containerClassNames}
        id={`${name}-container`}>

        {requiredLabel &&
          <span className={`${sharedStyles.controlNote} ${sharedStyles.controlLabelRequired}`}>
            {requiredLabel}
          </span>
        }

        {labelHidden &&
          <span className={sharedStyles.srOnly}>
            {label}
          </span>
        }

        <label
          className={this.labelClassNames}
          htmlFor={id}>
          {label}
        </label>

        <div className={styles.autoCompleteContainer}>
          <Autosuggest
            id={id}
            focusFirstSuggestion
            focusInputOnSuggestionClick={!isMobile}
            getSuggestionValue={this.getSuggestionValue}
            inputProps={inputProps}
            onSuggestionSelected={this.onSuggestionSelected}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            renderSuggestion={this.renderSuggestion}
            renderSuggestionsContainer={this.renderSuggestionsContainer}
            suggestions={suggestions}
            theme={styles} />

          {isFetching && this.getSpinner()}

          {hasInitialized && showNoSuggestionsText && !isFetching && !suggestions.length && value ?
            <div className={styles.suggestionsContainer}>
              <ul>
                <li className={styles.suggestion}>
                  {noSuggestionText}
                </li>
              </ul>
            </div>
            : ''
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

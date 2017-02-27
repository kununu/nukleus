import React, {PropTypes} from 'react';
import Autosuggest from 'react-autosuggest';
import Scroll from 'react-scroll';

import styles from './index.scss';

import getElementPositionY from '../../utils/elementPosition';
import isMobile from '../../utils/mobileDetection';
import {
  controlLabel,
  controlNote,
  errorStyles,
  formControl,
  hidden,
  formGroup,
  srOnly
} from '../index.scss';

export default class Autocomplete extends React.Component {
  static propTypes = {
    data: PropTypes.object,
    disabled: PropTypes.bool,
    error: PropTypes.string,
    id: PropTypes.string.isRequired,
    inputStyle: PropTypes.string,
    label: PropTypes.string.isRequired,
    labelHidden: PropTypes.bool,
    name: PropTypes.string.isRequired,
    noSuggestionText: PropTypes.string,
    onGetSuggestions: PropTypes.func,
    placeholder: PropTypes.string,
    query: PropTypes.object,
    required: PropTypes.bool,
    requiredLabel: PropTypes.string,
    scrollOffset: PropTypes.number,
    scrollTo: PropTypes.bool,
    submitOnEnter: PropTypes.bool,
    value: PropTypes.string
  };

  static defaultProps = {
    data: {},
    disabled: false,
    error: null,
    inputStyle: 'inline',
    labelHidden: false,
    noSuggestionText: 'No results found',
    onGetSuggestions: null,
    placeholder: '',
    query: {},
    required: false,
    requiredLabel: '',
    scrollOffset: 0,
    scrollTo: false,
    submitOnEnter: false,
    value: ''
  }

  state = {
    showError: false,
    showNoSuggestionsText: false,
    suggestions: this.props.data.items || [],
    value: ''
  };

  componentWillMount () {
    this.updateValue(this.props.query[this.props.name] || this.props.value || '');
  }

  componentWillReceiveProps (nextProps) {
    if (!this.needsUpdate(nextProps)) return;
    if (nextProps.error) this.showError();
    this.updateValue(this.props.query[this.props.name] || nextProps.value || '');
  }

  onChange = (event, {newValue}) => {
    this.setState({
      showNoSuggestionsText: true,
      value: newValue
    });
    this.hideError();
  }

  onFocus = () => {
    this.scrollToElement();
  }

  onBlur = () => {
    this.hideNoSuggestionsText();
  }

  onSuggestionsFetchRequested = ({value}) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  }

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  onSuggestionSelected = (e, {method}) => {
    this.setState({
      showNoSuggestionsText: false
    });

    if (method === 'enter' && !this.props.submitOnEnter) {
      e.preventDefault();
    }
  }

  getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    if (inputValue) {
      if (this.props.onGetSuggestions) {
        this.props.onGetSuggestions(inputValue);
        return this.props.data.items;
      }

      return this.props.data.items.filter(data => data.item.toLowerCase().slice(0, inputLength) === inputValue);
    }

    return [];
  }

  getSuggestionValue = suggestion => suggestion.item;

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

  renderSuggestion = suggestion => <span>{suggestion.item}<span className={styles.suggestionInfo}>&nbsp;({suggestion.itemInfo})</span></span>;

  render () {
    const {
      data: {isFetching},
      disabled,
      error,
      label,
      labelHidden,
      id,
      name,
      noSuggestionText,
      placeholder,
      required,
      requiredLabel
    } = this.props;

    const {
      showError,
      showNoSuggestionsText,
      suggestions,
      value
    } = this.state;

    const inputProps = {
      className: formControl,
      disabled,
      id,
      name,
      onBlur: this.onBlur,
      onChange: this.onChange,
      onFocus: this.onFocus,
      placeholder,
      required,
      value
    };

    return (
      <div
        ref={node => this.node = node}
        className={`${formGroup} ${styles[this.props.inputStyle]}`}>

        {requiredLabel &&
          <span className={`${controlNote} ${styles.requiredLabel}`}>
            {requiredLabel}
          </span>
        }

        {labelHidden &&
          <span className={srOnly}>
            {label}
          </span>
        }

        <label
          className={`${controlLabel} ${labelHidden && hidden}`}
          htmlFor={id}>
          {label}
        </label>

        <div className={styles.autoCompleteContainer}>
          <Autosuggest
            focusFirstSuggestion
            focusInputOnSuggestionClick={!isMobile}
            getSuggestionValue={this.getSuggestionValue}
            inputProps={inputProps}
            onSuggestionSelected={this.onSuggestionSelected}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            renderSuggestion={this.renderSuggestion}
            suggestions={suggestions}
            theme={styles} />

          {isFetching &&
            <span className={styles.spinner}>
              <i
                className="fa fa-spinner fa-pulse fa-3x fa-fw"
                aria-hidden="true" />
            </span>
          }

          {!isFetching && !suggestions.length && value && showNoSuggestionsText ?
            <div className={styles.suggestionsContainer}>
              <ul>
                <li className={styles.suggestion}>
                  {noSuggestionText}
                </li>
              </ul>
            </div>
            : ''
          }

          {showError &&
            <span className={errorStyles}>
              {error}
            </span>
          }
        </div>
      </div>
    );
  }
}

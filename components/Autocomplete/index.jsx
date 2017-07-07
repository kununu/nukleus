import React, {PropTypes} from 'react';
import Autosuggest from 'react-autosuggest';
import Scroll from 'react-scroll';
import debounce from 'debounce';

import styles from './index.scss';

import Error from '../Error';
import getElementPositionY from '../../utils/elementPosition';
import isMobile from '../../utils/mobileDetection';
import sharedStyles, {
  controlLabel,
  controlLabelRequired,
  controlNote,
  formControl,
  formControlError,
  hidden,
  formGroup,
  srOnly
} from '../index.scss';

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
    noSuggestionText: PropTypes.string,
    onGetSuggestions: PropTypes.func,
    onSelectSuggestion: PropTypes.func,
    placeholder: PropTypes.string,
    query: PropTypes.object,
    requiredLabel: PropTypes.string,
    scrollOffset: PropTypes.number,
    scrollTo: PropTypes.bool,
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
    onGetSuggestions: null,
    onSelectSuggestion: null,
    placeholder: '',
    query: {},
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

    // Show error, if already set
    if (this.props.error !== null) this.showError();
  }

  componentWillReceiveProps (nextProps) {
    if (JSON.stringify(nextProps.data.items) !== JSON.stringify(this.props.data.items)) {
      this.setState({suggestions: nextProps.data.items});
    }
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
    this.debouncedLoadSuggestions(value);
  }

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  onSuggestionSelected = (e, {method, suggestion}) => {
    this.setState({
      showNoSuggestionsText: false
    });

    if (method === 'enter' && !this.props.submitOnEnter) {
      e.preventDefault();
    }

    if (this.props.onSelectSuggestion) {
      this.props.onSelectSuggestion(suggestion);
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

  /**
   * determines which classNames should be added to the container div of
   * the component
   *
   * @return {string} [list of classNames split by space]
   */
  get containerClassNames () {
    const {inputStyle, requiredLabel} = this.props;
    const classNames = [formGroup, sharedStyles[inputStyle]];

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
    const classNames = [controlLabel];

    if (labelHidden) classNames.push(hidden);

    if (this.hasError()) classNames.push(sharedStyles.controlLabelError);

    return classNames.join(' ');
  }

  renderSuggestion = suggestion => <span>{suggestion.item}<span className={styles.suggestionInfo}>&nbsp;({suggestion.itemInfo})</span></span>;

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
      showNoSuggestionsText,
      suggestions,
      value
    } = this.state;

    const inputProps = {
      autoFocus,
      className: `${formControl} ${this.hasError() ? formControlError : ''}`,
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
        className={this.containerClassNames}>

        {requiredLabel &&
          <span className={`${controlNote} ${controlLabelRequired}`}>
            {requiredLabel}
          </span>
        }

        {labelHidden &&
          <span className={srOnly}>
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

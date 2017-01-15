import React, {PropTypes} from 'react';
import Autosuggest from 'react-autosuggest';
import Scroll from 'react-scroll';

import styles from './index.scss';

const isMobile = window.outerWidth < 550;

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
    scrollTo: PropTypes.bool,
    submitOnEnter: PropTypes.bool,
    value: PropTypes.string
  };

  static defaultProps = {
    error: null,
    inputStyle: 'inline',
    noSuggestionText: 'No results found',
    placeholder: '',
    query: {},
    scrollTo: false
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
    this.checkIfHasSuggestions(nextProps);
    if (!this.needsUpdate(nextProps)) return;
    if (nextProps.error) this.showError();
    this.updateValue(this.props.query[this.props.name] || nextProps.value || '');
  }

  onChange = (event, {newValue}) => {
    this.setState({
      showNoSuggestionsText: false,
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
    this.getSuggestions(value);

    this.setState({
      suggestions: this.props.data
    });
  }

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();

    return inputValue.length ?
      this.props.onGetSuggestions(inputValue) :
      [];
  }

  getSuggestionValue = suggestion => suggestion.item;

  checkIfHasSuggestions (nextProps) {
    const showNoSuggestionsText = !nextProps.data.items.length && this.state.value.length;

    this.setState({showNoSuggestionsText});
  }

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

  // TODO: Move this function into utilities so other components can use it
  scrollToElement = () => {
    if (this.props.scrollTo && isMobile) {
      const box = this.node.getBoundingClientRect();
      const body = document.body;
      const docElem = document.documentElement;
      const scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
      const clientTop = docElem.clientTop || body.clientTop || 0;
      const elementPos = (box.top + scrollTop) - clientTop;
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

  handleSelection = (e, {method}) => {
    if (method === 'enter' && !this.props.submitOnEnter) {
      e.preventDefault();
    }
  }

  updateValue (value) {
    this.setState({value});
  }

  renderSuggestion = suggestion => <span>{suggestion.item}<span className={styles.suggestionInfo}>({suggestion.itemInfo})</span></span>;

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
      showNoSuggestionsText,
      showError,
      value
    } = this.state;

    const inputProps = {
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

    const suggestions = this.props.data.items.length ? this.props.data.items : [];

    return (
      <div
        className={`form-group ${styles[this.props.inputStyle]}`}>

        {requiredLabel &&
          <span className={`control-note ${styles.requiredLabel}`}>
            {requiredLabel}
          </span>
        }

        {labelHidden &&
          <span className="sr-only">
            {label}
          </span>
        }

        <label
          ref={node => this.node = node}
          className={`control-label ${labelHidden && 'hidden'}`}
          htmlFor={id}>
          {label}
        </label>

        <div className={styles.autoCompleteContainer}>
          <Autosuggest
            focusFirstSuggestion
            focusInputOnSuggestionClick={!isMobile}
            getSuggestionValue={this.getSuggestionValue}
            inputProps={inputProps}
            onSuggestionSelected={this.handleSelection}
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

          {!isFetching && showNoSuggestionsText ?
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
            <span className={`${styles.error} label-danger`}>
              {error}
            </span>
          }
        </div>
      </div>
    );
  }
}

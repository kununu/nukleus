import React from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import debounce from 'debounce';

import ThemeContext from 'utils/themeContext';
import themeable from 'utils/theming';

import Error from '../Error';
import sharedStyles from '../index.scss';

import styles from './index.scss';

export default class ComboboxComponent extends React.Component {
  static propTypes = {
    debounceRate: PropTypes.number,
    disabled: PropTypes.bool,
    error: PropTypes.string,
    errorSubInfo: PropTypes.string,
    handle: PropTypes.element,
    id: PropTypes.string.isRequired,
    inputProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    inputStyles: PropTypes.string,
    inputValue: PropTypes.string,
    isRequired: PropTypes.bool,
    isSearchable: PropTypes.bool,
    items: PropTypes.arrayOf(PropTypes.string),
    label: PropTypes.string,
    labelHidden: PropTypes.bool,
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onSelect: PropTypes.func,
    placeholder: PropTypes.string,
    requiredLabel: PropTypes.string,
  };

  static defaultProps = {
    debounceRate: 500,
    disabled: false,
    error: null,
    errorSubInfo: null,
    handle: null,
    inputProps: {},
    inputStyles: 'inline',
    inputValue: '',
    isRequired: false,
    isSearchable: true,
    items: [],
    label: '',
    labelHidden: false,
    onBlur: () => {},
    onChange: () => {},
    onFocus: () => {},
    onSelect: null,
    placeholder: '',
    requiredLabel: '',
  };

  state = {
    showError: false,
    suggestions: this.getSuggestions('', this.props.items), // eslint-disable-line react/destructuring-assignment
    value: this.props.inputValue, // eslint-disable-line react/destructuring-assignment
  };

  debouncedLoadSuggestions = debounce(this.loadSuggestions, this.props.debounceRate); // eslint-disable-line react/destructuring-assignment

  UNSAFE_componentWillMount () { //eslint-disable-line
    const {error} = this.props;

    // Show error, if already set
    if (error !== null) this.showError();
  }

  UNSAFE_componentWillReceiveProps (nextProps) { //eslint-disable-line
    const {inputValue} = this.props;

    if (nextProps.error) this.showError();
    if (nextProps.inputValue !== inputValue) {
      this.setState({value: nextProps.inputValue});
    }
  }

  onSuggestionsFetchRequested = ({value}) => {
    this.debouncedLoadSuggestions(value);
  };

  onChange = (event, {newValue}) => {
    const {
      isSearchable,
      items,
      onChange,
    } = this.props;

    onChange(event);
    if (!isSearchable && items.indexOf(newValue) === -1) {
      event.preventDefault();
      return;
    }
    this.hideError();
    this.setState({value: newValue});
  };

  getSuggestions (value, items = []) {
    const {isSearchable} = this.props;

    if (isSearchable) {
      const inputValue = value.trim().toLowerCase();
      const inputLength = inputValue.length;

      return items
        .filter(item => item && item.toLowerCase().slice(0, inputLength) === inputValue)
        .map(item => ({value: item}));
    }
    return items.map(item => ({value: item}));
  }

  getSuggestionValue = suggestion => suggestion.value;

  handleSelection = (e, {method, suggestionIndex, suggestionValue}) => {
    const {onSelect} = this.props;

    if (onSelect) onSelect(suggestionIndex, suggestionValue);
    if (method === 'enter') {
      e.preventDefault();
    }
  };

  loadSuggestions (value) {
    const {items} = this.props;

    this.setState({suggestions: this.getSuggestions(value, items)});
  }

  showError () {
    this.setState({showError: true});
  }

  hideError () {
    this.setState({showError: false});
  }

  hasError () {
    const {error} = this.props;
    const {showError} = this.state;

    return showError && error;
  }

  renderSuggestion = suggestion => <span>{suggestion.value}</span>;

  render () {
    const {
      name,
      id,
      label,
      labelHidden,
      error,
      errorSubInfo,
      handle,
      isRequired,
      requiredLabel,
      inputStyles,
      placeholder,
      disabled,
      isSearchable,
      inputProps,
      onBlur,
      onFocus,
    } = this.props;
    const {
      suggestions,
      value,
    } = this.state;

    return (
      <ThemeContext.Consumer>
        {(context) => {
          const allStyles = {
            ...sharedStyles,
            ...styles,
            ...context,
          };
          const theme = themeable(allStyles);

          return (
            <div
              className={theme('formGroup', inputStyles, `${requiredLabel ? 'paddingTop' : ''}`)}
              id={`${name}-container`}
            >
              {requiredLabel && (
              <span className={theme('controlNote', 'controlLabelRequired')}>
                {requiredLabel}
              </span>
              )}

              <label
                className={theme('controlLabel', `${labelHidden && 'hidden'}`, `${this.hasError() ? 'controlLabelError' : ''}`)}
                htmlFor={id}
              >
                {label}
              </label>

              <div className={theme('comboboxContainer')}>
                <Autosuggest
                  suggestions={suggestions}
                  theme={allStyles}
                  error={error}
                  errorSubInfo={errorSubInfo}
                  onSuggestionSelected={this.handleSelection}
                  onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                  shouldRenderSuggestions={() => true}
                  onSuggestionsClearRequested={() => true}
                  getSuggestionValue={this.getSuggestionValue}
                  renderSuggestion={this.renderSuggestion}
                  focusInputOnSuggestionClick={isSearchable}
                  inputProps={{
                    ...inputProps,
                    className: theme('formControl', `${!isSearchable && 'isNotSearchable'}`, `${this.hasError() ? 'formControlError' : ''}`),
                    disabled,
                    id,
                    name,
                    onBlur,
                    onChange: this.onChange,
                    onFocus,
                    placeholder,
                    required: isRequired,
                    value,
                  }}
                />

                {handle ? (
                  <span className={theme('comboboxHandle')}>
                    {handle}
                  </span>
                ) : ''}

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

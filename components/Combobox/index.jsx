// NOTE: we make extensive use of property initialiser for binding methods to the class instance:
// onChange, getSuggestionValue etc.

import React, {Component, PropTypes} from 'react';
import Autosuggest from 'react-autosuggest';

import styles from './index.scss';

import Error from '../Error';
import {
  controlLabel,
  controlLabelError,
  controlNote,
  formControl,
  formControlError,
  formGroup,
  controlLabelRequired,
  hidden
} from '../index.scss';


export default class ComboboxComponent extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    error: PropTypes.string,
    errorSubInfo: PropTypes.string,
    handle: PropTypes.element,
    id: PropTypes.string.isRequired,
    inputProps: PropTypes.object,
    inputStyles: PropTypes.string,
    inputValue: PropTypes.string,
    isRequired: PropTypes.bool,
    isSearchable: PropTypes.bool,
    items: PropTypes.array,
    label: PropTypes.string,
    labelHidden: PropTypes.bool,
    name: PropTypes.string.isRequired,
    onSelect: PropTypes.func,
    placeholder: PropTypes.string,
    requiredLabel: PropTypes.string
  };

  static defaultProps = {
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
    onSelect: null,
    placeholder: '',
    requiredLabel: ''
  };

  state = {
    showError: false,
    suggestions: this.getSuggestions('', this.props.items),
    value: this.props.inputValue
  };

  componentWillMount () {
    // Show error, if already set
    if (this.props.error !== null) this.showError();
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.error) this.showError();
    if (nextProps.inputValue !== this.props.inputValue) {
      this.setState({
        value: nextProps.inputValue
      });
    }
  }

  onSuggestionsFetchRequested = ({value}) => {
    this.setState({
      suggestions: this.getSuggestions(value, this.props.items)
    });
  };

  onChange = (event, {newValue}) => {
    if (!this.props.isSearchable && this.props.items.indexOf(newValue) === -1) {
      event.preventDefault();
      return;
    }
    this.hideError();
    this.setState({
      value: newValue
    });
  };

  getSuggestions (value, items = []) {
    if (this.props.isSearchable) {
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
    if (this.props.onSelect) this.props.onSelect(suggestionIndex, suggestionValue);
    if (method === 'enter') {
      e.preventDefault();
    }
  };

  showError () {
    this.setState({showError: true});
  }

  hideError () {
    this.setState({showError: false});
  }

  hasError () {
    return this.state.showError && this.props.error;
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
      disabled
    } = this.props;

    return (
      <div className={`${formGroup} ${styles[inputStyles]} ${requiredLabel ? styles.paddingTop : ''}`}>
        {requiredLabel &&
          <span className={`${controlNote} ${controlLabelRequired}`}>
            {requiredLabel}
          </span>
        }

        <label
          className={`${controlLabel} ${labelHidden && hidden} ${this.hasError() ? controlLabelError : ''}`}
          htmlFor={id}>{label}</label>

        <div className={styles.container}>
          <Autosuggest
            suggestions={this.state.suggestions}
            theme={styles}
            error={error}
            errorSubInfo={errorSubInfo}
            onSuggestionSelected={this.handleSelection}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            shouldRenderSuggestions={() => true}
            onSuggestionsClearRequested={() => true}
            getSuggestionValue={this.getSuggestionValue}
            renderSuggestion={this.renderSuggestion}
            focusInputOnSuggestionClick={this.props.isSearchable}
            inputProps={{
              ...this.props.inputProps,
              className: `${formControl} ${!this.props.isSearchable && styles.isNotSearchable} ${this.hasError() ? formControlError : ''}`,
              disabled,
              id,
              name,
              onChange: this.onChange,
              placeholder,
              required: isRequired,
              value: this.state.value
            }} />

          {handle ?
            <span className={styles.handle}>
              {handle}
            </span>
          : ''}

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

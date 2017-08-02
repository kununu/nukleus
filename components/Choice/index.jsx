import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.scss';

import Error from '../Error';
import {
  controlLabel,
  controlLabelRequired,
  controlNote,
  formGroup
} from '../index.scss';

export default class Choice extends React.Component {
  static propTypes = {
    checked: PropTypes.string,
    customTheme: PropTypes.string,
    disabled: PropTypes.bool,
    error: PropTypes.string,
    errorSubInfo: PropTypes.string,
    heading: PropTypes.string,
    headingStyle: PropTypes.string,
    isRequired: PropTypes.bool,
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onClick: PropTypes.func,
    onFocus: PropTypes.func,
    options: PropTypes.array.isRequired,
    optionsPerRow: PropTypes.oneOf(['3', '4', '5', '6', '7', null]),
    query: PropTypes.object,
    reference: PropTypes.func,
    requiredLabel: PropTypes.string
  };

  static defaultProps = {
    checked: '',
    customTheme: '',
    disabled: false,
    error: null,
    errorSubInfo: null,
    heading: '',
    headingStyle: 'control-label',
    isRequired: false,
    onBlur: () => {},
    onChange: () => {},
    onClick: () => {},
    onFocus: () => {},
    optionsPerRow: null,
    query: {},
    reference: () => {},
    requiredLabel: ''
  };

  state = {
    checked: this.props.checked,
    showError: false
  };

  componentWillMount () {
    // Show error, if already set
    if (this.props.error !== null) this.showError();

    const {query, name} = this.props;
    if (!query[name]) return;
    this.setState({
      checked: query[name]
    });
  }

  componentWillReceiveProps (nextProps) {
    const {query, name, error} = nextProps;
    if (error) this.showError();
    if (nextProps.query === this.props.query && nextProps.checked === this.props.checked) return;
    if (query[name] && query[name] !== this.props.query[name]) {
      this.setState({
        checked: query[name]
      });
    } else if (nextProps.checked !== this.props.checked) {
      this.setState({
        checked: nextProps.checked
      });
    }
  }

  onChange = e => {
    const value = e.target.value;
    if (this.props.disabled || value === this.state.checked) return;

    this.props.onChange(e);
    this.setState({
      checked: value
    });
  };

  onClick = e => {
    const value = e.target.value;
    if (this.props.disabled) return;

    this.props.onClick(e);
    // As long as the component is not required and the component is deselected set to null.
    if (!this.props.isRequired && value === this.state.checked) {
      this.setState({
        checked: null
      });
    }
  }

  showError () {
    this.setState({showError: true});
  }

  hideError () {
    this.setState({showError: false});
  }

  hasError () {
    return this.state.showError && this.props.error;
  }

  render () {
    const {
      customTheme,
      disabled,
      error,
      errorSubInfo,
      heading,
      isRequired,
      name,
      onBlur,
      onFocus,
      options,
      reference,
      requiredLabel
    } = this.props;

    const optionsPerRow = this.props.optionsPerRow && parseInt(this.props.optionsPerRow, 10);

    const {
      checked
    } = this.state;

    return (
      <div className={formGroup}>

        {requiredLabel &&
          <span className={`${controlNote} ${controlLabelRequired}`}>
            {requiredLabel}
          </span>
        }

        {heading && <div className={`${this.props.headingStyle} ${controlLabel}`}>{heading}</div>}

        <div className={`${styles.radioContainer} ${options.length > 3 && optionsPerRow === null && styles.flexible}`} data-options-per-row={optionsPerRow}>
          {options.map((item, idx) =>
            (<div className={styles.radioButton} key={item.id}>
              <input
                type="radio"
                value={item.value}
                id={`${name}${item.id}`}
                name={name}
                checked={checked === item.value}
                onBlur={onBlur}
                onChange={this.onChange}
                onFocus={onFocus}
                onClick={this.onClick}
                ref={reference}
                required={isRequired} />
              <label
                disabled={disabled}
                id={idx}
                htmlFor={`${name}${item.id}`}
                className={customTheme}>
                {item.label}
              </label>
            </div>)
          )}
        </div>

        {this.hasError() &&
          <Error
            info={error}
            subInfo={errorSubInfo} />
        }
      </div>
    );
  }
}

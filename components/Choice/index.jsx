import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.scss';

import Error from '../Error';
import {
  controlLabel,
  controlLabelRequired,
  controlNote,
  formGroup,
  srOnly
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
    label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),
    labelHidden: PropTypes.bool,
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
    heading: null,
    headingStyle: 'control-label',
    isRequired: false,
    label: null,
    labelHidden: false,
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

  onChange = (option, e) => {
    const value = e.target.value;
    if (this.isOptionDisabled(option) || value === this.state.checked) return;

    this.props.onChange(e);
    this.setState({
      checked: value
    });
  };

  onClick = (option, e) => {
    if (this.isOptionDisabled(option)) return;

    const value = e.target.value;

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

  isOptionDisabled (option) {
    const disabled = this.props.disabled;
    return disabled || (typeof (option.disabled) === 'boolean' ? option.disabled : disabled);
  }

  get label () {
    const {
      heading,
      headingStyle,
      label,
      labelHidden
    } = this.props;

    if (!label && !heading) return null;

    if (labelHidden) return <span className={srOnly}>{label || heading}</span>;

    /**
     * generates the TextField label based on the Textfield label prop
     *
     * @return {ReactElement} [Either returns a label or a react element with the added css class labelContainer]
    */
    if (typeof label === 'string' || typeof heading === 'string') {
      return <div className={`${controlLabel} ${headingStyle}`}>{label || heading}</div>;
    }

    // We don't simply put a more complex element inside a label to prevent a
    // clickable element like a link or button inside a label
    // However to also add the labelContainer class, we need to return a cloned
    // element and not just the label - element itself
    return React.cloneElement(
      label,
      {
        ...label.props,
        className: controlLabel
      }
    );
  }

  render () {
    const {
      customTheme,
      error,
      errorSubInfo,
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

        {this.label}

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
                onChange={e => this.onChange(item, e)}
                onFocus={onFocus}
                onClick={e => this.onClick(item, e)}
                ref={reference}
                required={isRequired} />
              <label
                disabled={this.isOptionDisabled(item)}
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

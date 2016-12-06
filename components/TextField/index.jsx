// Read more about controlled components
// https://facebook.github.io/react/docs/forms.html#controlled-components
import React, {Component, PropTypes} from 'react';

import styles from './index.scss';

export default class TextField extends Component {
  static propTypes = {
    autoComplete: PropTypes.string,
    autoFocus: PropTypes.bool,
    disable: PropTypes.bool,
    error: PropTypes.string,
    id: PropTypes.string.isRequired,
    inputStyle: PropTypes.string,
    label: PropTypes.string.isRequired,
    labelHidden: PropTypes.bool,
    maxLength: PropTypes.number,
    multiLine: PropTypes.bool,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    pattern: PropTypes.string,
    placeholder: PropTypes.string,
    query: PropTypes.object,
    required: PropTypes.bool,
    requiredLabel: PropTypes.bool,
    rows: PropTypes.number,
    title: PropTypes.string,
    type: PropTypes.oneOf([
      'email',
      'password',
      'text',
      'url'
    ]),
    value: PropTypes.string
  };

  static defaultProps = {
    autoComplete: 'off',
    error: null,
    inputStyle: 'inline',
    multiLine: false,
    placeholder: '',
    query: {},
    rows: 5,
    type: 'text'
  };

  state = {
    showError: false,
    value: this.props.value || ''
  };

  componentWillMount () {
    this.updateValue(this.props.query[this.props.name] || this.props.value || '');
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.error) {
      this.showError();
    } else {
      if (!this.needsUpdate(nextProps)) return;
      this.updateValue(
        nextProps.query[this.props.name] ||
        nextProps.value ||
        ''
      );
    }
  }

  // Property initializer binds method to class instance
  onChange = (...args) => {
    this.updateValue(args[0].target.value);
    if (this.props.onChange) this.props.onChange(...args);
    this.hideError();
  };

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

  render () {
    const {
      autoComplete,
      autoFocus,
      disable,
      error,
      id,
      inputStyle,
      label,
      labelHidden,
      maxLength,
      name,
      multiLine,
      pattern,
      placeholder,
      required,
      rows,
      requiredLabel,
      title,
      type
    } = this.props;

    return (
      <div className={`form-group ${styles[inputStyle]}`}>
        {requiredLabel && <span className={`control-note ${styles.requiredLabel}`}>Required</span>}
        {labelHidden && <span className="sr-only">{label}</span>}

        <label
          className={`control-label ${labelHidden && 'hidden'}`}
          htmlFor={id}>{label}</label>

        <div className={styles.inputContainer}>
          {
            multiLine ?
              <textarea
                autoFocus={autoFocus}
                className={`form-control ${styles.textarea}`}
                disabled={disable}
                id={id}
                name={name}
                maxLength={maxLength}
                onChange={this.onChange}
                pattern={pattern}
                placeholder={placeholder}
                required={required}
                rows={rows}
                value={this.state.value} /> :
              <input
                autoComplete={autoComplete}
                autoFocus={autoFocus}
                className="form-control"
                disabled={disable}
                id={id}
                name={name}
                maxLength={maxLength}
                onChange={this.onChange}
                pattern={pattern}
                placeholder={placeholder}
                required={required}
                title={title}
                type={type}
                value={this.state.value} />
          }

          {this.state.showError && error &&
            <span className={`${styles.error} label-danger`}>{error}</span>
          }
        </div>
      </div>
    );
  }
}

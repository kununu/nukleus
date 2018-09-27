import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

import styles from './index.scss';

import Error from '../Error';
import {
  controlLabel,
  controlLabelRequired,
  controlNote,
  formControl,
  formControlError,
  formGroup,
  srOnly
} from '../index.scss';

export default class DatePickerComponent extends React.Component {
  static propTypes = {
    disabled: PropTypes.bool,
    error: PropTypes.string,
    errorSubInfo: PropTypes.string,
    icon: PropTypes.element,
    id: PropTypes.string.isRequired,
    inputStyle: PropTypes.string,
    isRequired: PropTypes.bool,
    label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),
    labelHidden: PropTypes.bool,
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    query: PropTypes.object,
    requiredLabel: PropTypes.string,
    title: PropTypes.string,
    value: PropTypes.string
  };

  static defaultProps = {
    disabled: false,
    error: null,
    errorSubInfo: null,
    icon: null,
    inputStyle: 'inline',
    isRequired: false,
    label: null,
    labelHidden: false,
    onBlur: () => {},
    onChange: () => {},
    onFocus: () => {},
    query: {},
    requiredLabel: '',
    title: null,
    value: ''
  };

  state = {
    showError: false,
    value: this.props.value
  }

  componentWillMount () {
    const {
      query,
      name,
      value
    } = this.props;

    this.updateValue(query[name] || value || '');

    // Show error, if already set
    if (this.props.error !== null) this.showError();
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.error) this.showError();
    this.updateValue(nextProps.query[this.props.name] ||
      nextProps.value ||
      '');
  }

  // Property initializer binds method to class instance
  onChange = date => {
    this.updateValue(date);
    this.props.onChange(date);
    this.hideError();
  };

  get label () {
    const {
      id,
      title,
      label,
      labelHidden
    } = this.props;

    if (!label && !title) return null;

    if (labelHidden) return <span className={srOnly}>{label || title}</span>;

    /**
     * generates the TextField label based on the Textfield label prop
     *
     * @return {ReactElement} [Either returns a label or a react element with the added css class labelContainer]
    */
    if (typeof label === 'string' || typeof title === 'string') {
      return <label className={`${controlLabel} ${this.hasError() ? styles.controlLabelError : ''}`} htmlFor={id}>{label || title}</label>;
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

  showError () {
    this.setState({showError: true});
  }

  hideError () {
    this.setState({showError: false});
  }

  updateValue (value) {
    this.setState({value});
  }

  hasError () {
    return this.state.showError && this.props.error;
  }

  render () {
    const {
      name,
      icon,
      id,
      error,
      errorSubInfo,
      inputStyle,
      disabled,
      isRequired,
      requiredLabel
    } = this.props;

    return (
      <div className={`${formGroup} ${styles[inputStyle]} ${styles.datePickerContainer} ${requiredLabel ? styles.paddingTop : ''}`} id={`${name}-container`}>
        {requiredLabel &&
          <span className={`${controlNote} ${controlLabelRequired}`}>
            {requiredLabel}
          </span>
        }

        {this.label}

        <div className={styles.innerContainer}>
          <DatePicker
            className={`${formControl} ${this.hasError() ? formControlError : ''}`}
            name={name}
            id={id}
            disabled={disabled}
            selected={this.state.value ? moment(this.state.value) : null}
            required={isRequired}
            onBlur={this.props.onBlur}
            onChange={this.onChange}
            onFocus={this.props.onFocus} />
          {icon ?
            <span className={styles.icon}>
              {icon}
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

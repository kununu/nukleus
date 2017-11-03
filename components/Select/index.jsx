// Read more about controlled components
// https://facebook.github.io/react/docs/forms.html#controlled-components
import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.scss';

import Error from '../Error';
import sharedStyles, {
  controlLabel,
  controlLabelRequired,
  controlNote,
  formControl,
  formControlError,
  formGroup,
  hidden,
  srOnly
} from '../index.scss';


export default class Select extends React.Component {
  static propTypes = {
    autoFocus: PropTypes.bool,
    defaultItem: PropTypes.string,
    defaultRequired: PropTypes.string,
    disabled: PropTypes.bool,
    error: PropTypes.string,
    errorSubInfo: PropTypes.string,
    id: PropTypes.string.isRequired,
    inputStyle: PropTypes.string,
    isRequired: PropTypes.bool,
    items: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number
        ]),
        value: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number
        ])
      }))
    ]),
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
    reference: PropTypes.func,
    requiredLabel: PropTypes.string,
    sort: PropTypes.func,
    title: PropTypes.string.isRequired,
    value: PropTypes.any
  };

  static defaultProps = {
    autoFocus: false,
    defaultItem: '',
    defaultRequired: '',
    disabled: false,
    error: null,
    errorSubInfo: null,
    inputStyle: 'inline',
    isRequired: false,
    items: {},
    label: null,
    labelHidden: false,
    onBlur: () => {},
    onChange: null,
    onFocus: () => {},
    query: {},
    reference: () => {},
    requiredLabel: '',
    sort: null,
    value: ''
  };

  state = {
    showError: false,
    value: this.props.value || ''
  };

  componentWillMount () {
    this.updateValue(this.props.query[this.props.name] || this.props.value || '');

    // Show error, if already set
    if (this.props.error !== null) this.showError();
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.error) this.showError();
    if (!this.needsUpdate(nextProps)) return;
    this.updateValue(nextProps.query[this.props.name] || nextProps.value || '');
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

  hasError () {
    return this.state.showError && this.props.error;
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
      return <label htmlFor={id} className={this.labelClassNames}>{label || title}</label>;
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
      autoFocus,
      defaultItem,
      defaultRequired,
      disabled,
      error,
      errorSubInfo,
      id,
      isRequired,
      items,
      name,
      onBlur,
      onFocus,
      reference,
      requiredLabel,
      sort
    } = this.props;

    let options = Object.keys(items)
      .map(key => ({
        key: items[key].key || key,
        value: items[key].value || items[key]
      }));

    if (sort) {
      options = options.sort(sort);
    }

    return (
      <div className={this.containerClassNames}>

        {requiredLabel &&
          <span className={`${controlNote} ${controlLabelRequired}`}>
            {requiredLabel}
          </span>
        }

        {this.label}

        <div className={styles.inputContainer}>
          <select
            name={name}
            value={this.state.value}
            id={id}
            ref={reference}
            required={isRequired}
            autoFocus={autoFocus}
            onBlur={onBlur}
            onFocus={onFocus}
            onChange={this.onChange}
            className={`${formControl} ${styles.select} ${this.hasError() ? formControlError : ''}`}
            disabled={disabled}>

            {defaultRequired &&
              <option value="" hidden>{defaultRequired}</option>}

            {defaultItem &&
              <option value="">{defaultItem}</option>}

            {options.map(item =>
              (<option
                key={item.key}
                value={item.key}>
                {item.value}
              </option>),
            )}
          </select>

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

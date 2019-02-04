import React from 'react';
import PropTypes from 'prop-types';


import Error from '../Error';
import Label from '../Label';
import sharedStyles from '../index.scss';

import styles from './index.scss';

export default class MultipleChoice extends React.Component {
  static propTypes = {
    choices: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      isChecked: PropTypes.bool,
      label: PropTypes.string,
    })),
    error: PropTypes.string,
    errorSubInfo: PropTypes.string,
    heading: PropTypes.string,
    inputStyle: PropTypes.oneOf(['inline', 'buttons']),
    isRequired: PropTypes.bool,
    label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    labelHidden: PropTypes.bool,
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    options: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      isChecked: PropTypes.bool,
      label: PropTypes.string,
    })),
    query: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    reference: PropTypes.func,
    requiredLabel: PropTypes.string,
  };

  static defaultProps = {
    choices: [],
    error: null,
    errorSubInfo: null,
    heading: null,
    inputStyle: 'inline',
    isRequired: false,
    label: null,
    labelHidden: false,
    onBlur: () => {},
    onChange: () => {},
    onFocus: () => {},
    options: [],
    query: {},
    reference: () => {},
    requiredLabel: '',
  };

  state = {
    choices: (this.props.options.length && this.props.options) || this.props.choices, // eslint-disable-line react/destructuring-assignment
    showError: false,
  };

  componentWillMount () {
    // Show error, if already set
    const {query, name, error} = this.props;

    if (error !== null) this.showError();

    if (!query[name]) return;
    this.updateValue(this.getChoicesToUpdate(query[name]), 'checked');
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.error) this.showError();
    const {query} = this.props;
    const {choices} = this.state;

    // We do not yet control the state when the query does not change,
    // for instance when updates are triggered by tweaking with other components.
    if (nextProps.query === query) return;
    if (!nextProps.query[nextProps.name]) {
      this.updateValue(choices, 'unchecked');
    } else {
      this.updateValue(this.getChoicesToUpdate(nextProps.query[nextProps.name]), 'checked');
    }
  }

  onChange (choice) {
    const {onChange} = this.props;
    const {choices} = this.state;

    this.updateValue([choice], 'toggle', () => {
      onChange(choice, choices);
    });
  }

  get containerClassNames () {
    const {inputStyle, requiredLabel} = this.props;

    const inputStyles = inputStyle.split(' ');

    const classNames = [sharedStyles.formGroup, sharedStyles.formGroupMultipleChoice];

    // Inline Styles is shared in global index.scss, buttons is a local style
    if (inputStyles.includes('buttons')) classNames.push(styles.buttons);
    if (inputStyles.includes('inline')) classNames.push(sharedStyles.inline);

    if (requiredLabel) classNames.push(styles.paddingTop);

    return classNames.join(' ');
  }

  get label () {
    const {
      heading,
      inputStyle,
      label,
      labelHidden,
    } = this.props;

    if (!label && !heading) return null;

    const value = label || heading;
    const classNames = inputStyle === 'inline' ? styles.inlineLabel : '';

    return (
      <Label
        classNames={classNames}
        isTitle
        labelHidden={labelHidden}
        value={value}
      />
    );
  }

  getChoicesToUpdate (newChoices) {
    const {choices} = this.state;

    return choices.filter(choice => [].concat(newChoices).some(value => value === choice.value));
  }

  updateValue (newChoices, status, cb = () => {}) {
    const {choices} = this.state;

    // cb get's fired when setState is finished
    this.setState({
      choices: choices.map((choice) => {
        if (newChoices.some(newChoice => newChoice === choice)) {
          const newStatus = {
            checked: true,
            unchecked: false,
            toggle: !choice.isChecked,
          }[status];

          return {
            ...choice,
            isChecked: newStatus,
          };
        }
        return choice;
      }),
    }, cb);
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

  render () {
    const {choices} = this.state;
    const {
      error,
      errorSubInfo,
      isRequired,
      name,
      onBlur,
      onFocus,
      reference,
      requiredLabel,
    } = this.props;

    return (
      <div
        className={this.containerClassNames}
        id={`${name}-container`}
      >
        {requiredLabel && (
        <span className={`${sharedStyles.controlNote} ${sharedStyles.controlLabelRequired}`}>
          {requiredLabel}
        </span>
        )}

        {this.label}

        <div className={styles.inputContainer}>
          {choices.map(choice => (
            <div
              className={styles.choice}
              key={choice.id}
            >
              <input
                checked={choice.isChecked}
                className={sharedStyles.formControl}
                id={`${name}${choice.id}`}
                key={choice.id}
                name={name}
                onBlur={onBlur}
                onChange={() => this.onChange(choice)}
                onFocus={onFocus}
                ref={reference}
                required={isRequired}
                type="checkbox"
                value={choice.value}
              />

              <label htmlFor={`${name}${choice.id}`}>{choice.label}</label>
            </div>
          ))}
        </div>
        {this.hasError() && (
        <Error
          info={error}
          subInfo={errorSubInfo}
        />
        )}
      </div>
    );
  }
}

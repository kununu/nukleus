import React from 'react';
import PropTypes from 'prop-types';

import ThemeContext from 'utils/themeContext';
import themeable from 'utils/theming';

import Error from '../Error';
import Label from '../Label';
import sharedStyles from '../index.module.scss';

import styles from './index.module.scss';

export default class MultipleChoice extends React.Component {
  static propTypes = {
    choices: PropTypes.arrayOf(PropTypes.shape({ // eslint-disable-line react/no-unused-prop-types
      id: PropTypes.string,
      isChecked: PropTypes.bool,
      label: PropTypes.string,
    })),
    disabled: PropTypes.oneOf(['none', 'all', 'uncheckedOnly', 'checkedOnly']),
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
    options: PropTypes.arrayOf(PropTypes.shape({ // eslint-disable-line react/no-unused-prop-types
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
    disabled: 'none',
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
    choices: MultipleChoice.getCorrectChoiceValues(this.props),
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
    const newChoiceValues = MultipleChoice.getCorrectChoiceValues(nextProps);
    const oldChoiceValues = MultipleChoice.getCorrectChoiceValues(this.props);

    const {query} = this.props;
    const {choices} = this.state;

    // If new options props are passed to the component
    // We replace the current options with the new ones.
    if (JSON.stringify(newChoiceValues) !== JSON.stringify(oldChoiceValues)) {
      this.setState({
        choices: newChoiceValues,
      });
    }

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

    this.updateValue([choice], 'toggle', () => {
      const {choices} = this.state;

      onChange(choice, choices);
    });
  }

  get containerClassNames () {
    const {inputStyle, requiredLabel} = this.props;

    const inputStyles = inputStyle.split(' ');

    const classNames = ['formGroup', 'choiceContainer', ...inputStyles];

    if (requiredLabel) classNames.push('paddingTop');

    return classNames;
  }

  static getCorrectChoiceValues ({options, choices}) {
    return (options.length && options) || choices;
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

  isDisabled (checked) {
    const {disabled} = this.props;

    if (disabled === 'all' || (disabled === 'uncheckedOnly' && !checked) || (disabled === 'checkedOnly' && checked)) return true;
    return false;
  }

  render () {
    const {choices} = this.state;
    const {
      error,
      errorSubInfo,
      isRequired,
      inputStyle,
      label,
      labelHidden,
      heading,
      name,
      onBlur,
      onFocus,
      reference,
      requiredLabel,
    } = this.props;

    const labelStyles = inputStyle === 'inline' ? 'inlineLabel' : '';

    return (
      <ThemeContext.Consumer>
        {(context) => {
          const theme = themeable({...sharedStyles, ...styles, ...context});

          return (
            <div
              className={theme(...this.containerClassNames)}
              id={`${name}-container`}
            >
              {requiredLabel && (
              <span className={theme('controlNote', 'controlLabelRequired')}>
                {requiredLabel}
              </span>
              )}

              {label || heading ? (
                <Label
                  classNames={theme(labelStyles)}
                  isTitle
                  labelHidden={labelHidden}
                  value={label || heading}
                />
              ) : null }

              <div className={theme('choiceInnerContainer')}>
                {choices.map(choice => (
                  <div
                    className={theme('choice')}
                    key={choice.id}
                  >
                    <input
                      checked={choice.isChecked}
                      className={theme('formControl')}
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
                      disabled={this.isDisabled(choice.isChecked)}
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
        }}
      </ThemeContext.Consumer>
    );
  }
}

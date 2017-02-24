import React, {Component, PropTypes} from 'react';

import styles from './index.scss';

import {
  controlLabel,
  controlLabelRequired,
  controlNote,
  formControl,
  formGroup
} from '../index.scss';


export default class MultipleChoice extends Component {
  static propTypes = {
    choices: PropTypes.array.isRequired,
    heading: PropTypes.string,
    inputStyle: PropTypes.oneOf(['inline', 'buttons']),
    name: PropTypes.string.isRequired,
    query: PropTypes.object,
    required: PropTypes.bool,
    requiredLabel: PropTypes.string
  };

  static defaultProps = {
    heading: '',
    headingStyle: 'control-label',
    inputStyle: 'inline',
    query: {},
    required: false,
    requiredLabel: ''
  };

  state = {
    choices: this.props.choices || []
  };

  componentWillMount () {
    const {query, name} = this.props;
    if (!query[name]) return;
    this.updateValue(this.getChoicesToUpdate(query[name]), 'checked');
  }

  componentWillReceiveProps (nextProps) {
    const {query, name} = nextProps;
    // We do not yet control the state when the query does not change,
    // for instance when updates are triggered by tweaking with other components.
    if (nextProps.query === this.props.query) return;
    if (!query[name]) {
      this.updateValue(this.state.choices, 'unchecked');
    } else {
      this.updateValue(this.getChoicesToUpdate(query[name]), 'checked');
    }
  }

  onChange (choice) {
    this.updateValue([choice]);
  }

  getChoicesToUpdate (newChoices) {
    return this.state.choices.filter(choice => [].concat(newChoices).some(value => value === choice.value));
  }

  updateValue (newChoices, status = 'toggle') {
    this.setState({
      choices: this.state.choices.map(choice => {
        if (newChoices.some(newChoice => newChoice === choice)) {
          /* eslint-disable sorting/sort-object-props */
          const newStatus = {
            checked: true,
            unchecked: false,
            toggle: !choice.isChecked
          }[status];
          /* eslint-enable sorting/sort-object-props */
          return {
            ...choice,
            isChecked: newStatus
          };
        }
        return choice;
      })
    });
  }

  render () {
    const {choices} = this.state;

    return (
      <div className={`${styles[this.props.inputStyle]} ${formGroup}`}>
        {this.props.requiredLabel &&
          <span className={`${controlNote} ${controlLabelRequired}`}>
            {this.props.requiredLabel}
          </span>
        }

        {this.props.heading && <div className={controlLabel}>{this.props.heading}</div>}

        <div className={styles.inputContainer}>
          {choices.map(choice =>
            <div className={`${styles.choice}`} key={choice.id}>
              <input
                className={formControl}
                id={`${this.props.name}${choice.id}`}
                name={this.props.name}
                key={choice.id}
                value={choice.value}
                type="checkbox"
                checked={choice.isChecked}
                required={this.props.required}
                onChange={() => this.onChange(choice)} />

              <label htmlFor={`${this.props.name}${choice.id}`}>{choice.label}</label>
            </div>
          )}
        </div>
      </div>
    );
  }
}

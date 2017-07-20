import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.scss';

import Error from '../Error';
import sharedStyles, {
  controlLabel,
  controlLabelRequired,
  controlNote,
  formControl,
  formGroup,
  formGroupMultipleChoice
} from '../index.scss';


export default class MultipleChoice extends React.Component {
  static propTypes = {
    choices: PropTypes.array.isRequired,
    error: PropTypes.string,
    errorSubInfo: PropTypes.string,
    heading: PropTypes.string,
    inputStyle: PropTypes.oneOf(['inline', 'buttons']),
    isRequired: PropTypes.bool,
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    query: PropTypes.object,
    reference: PropTypes.func,
    requiredLabel: PropTypes.string
  };

  static defaultProps = {
    error: null,
    errorSubInfo: null,
    heading: '',
    headingStyle: 'control-label',
    inputStyle: 'inline',
    isRequired: false,
    onBlur: () => {},
    onChange: () => {},
    onFocus: () => {},
    query: {},
    reference: () => {},
    requiredLabel: ''
  };

  state = {
    choices: this.props.choices || [],
    showError: false
  };

  componentWillMount () {
    // Show error, if already set
    if (this.props.error !== null) this.showError();
    const {query, name} = this.props;
    if (!query[name]) return;
    this.updateValue(this.getChoicesToUpdate(query[name]), 'checked');
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.error) this.showError();
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
    this.updateValue([choice], 'toggle', () => {
      this.props.onChange(choice, this.state.choices);
    });
  }

  getChoicesToUpdate (newChoices) {
    return this.state.choices.filter(choice => [].concat(newChoices).some(value => value === choice.value));
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

  updateValue (newChoices, status, cb = () => {}) {
    // cb get's fired when setState is finished
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
    }, cb);
  }

  get containerClassNames () {
    const {inputStyle, requiredLabel} = this.props;

    const inputStyles = inputStyle.split(' ');

    const classNames = [formGroup, formGroupMultipleChoice];

    // Inline Styles is shared in global index.scss, buttons is a local style
    if (inputStyles.includes('buttons')) classNames.push(styles.buttons);
    if (inputStyles.includes('inline')) classNames.push(sharedStyles.inline);

    if (requiredLabel) classNames.push(styles.paddingTop);

    return classNames.join(' ');
  }

  render () {
    const {choices} = this.state;

    return (
      <div className={this.containerClassNames}>
        {this.props.requiredLabel &&
          <span className={`${controlNote} ${controlLabelRequired}`}>
            {this.props.requiredLabel}
          </span>
        }

        {this.props.heading && <label htmlFor={this.props.name} className={controlLabel}>{this.props.heading}</label>}

        <div className={styles.inputContainer}>
          {choices.map(choice =>
            (<div className={`${styles.choice}`} key={choice.id}>
              <input
                className={formControl}
                id={`${this.props.name}${choice.id}`}
                name={this.props.name}
                key={choice.id}
                value={choice.value}
                type="checkbox"
                checked={choice.isChecked}
                ref={this.props.reference}
                required={this.props.isRequired}
                onBlur={this.props.onBlur}
                onChange={() => this.onChange(choice)}
                onFocus={this.props.onFocus} />

              <label htmlFor={`${this.props.name}${choice.id}`}>{choice.label}</label>
            </div>)
          )}
        </div>
        {this.hasError() &&
          <Error
            info={this.props.error}
            subInfo={this.props.errorSubInfo} />
        }
      </div>
    );
  }
}

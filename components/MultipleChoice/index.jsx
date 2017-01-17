import React, {Component, PropTypes} from 'react';

import styles from './index.scss';

export default class MultipleChoice extends Component {
  static propTypes = {
    checkboxes: PropTypes.array.isRequired,
    heading: PropTypes.string,
    headingStyle: PropTypes.string,
    inputStyle: PropTypes.string,
    name: PropTypes.string.isRequired,
    query: PropTypes.object
  };

  static defaultProps = {
    headingStyle: 'control-label',
    inputStyle: 'inline',
    query: {}
  };

  state = {
    checkboxes: this.props.checkboxes || []
  };

  componentWillMount () {
    const {query, name} = this.props;
    if (!query[name]) return;
    this.updateValue(this.getCheckboxesToUpdate(query[name]), 'checked');
  }

  componentWillReceiveProps (nextProps) {
    const {query, name} = nextProps;
    // We do not yet control the state when the query does not change,
    // for instance when updates are triggered by tweaking with other components.
    if (nextProps.query === this.props.query) return;
    if (!query[name]) {
      this.updateValue(this.state.checkboxes, 'unchecked');
    } else {
      this.updateValue(this.getCheckboxesToUpdate(query[name]), 'checked');
    }
  }

  onChange (checkbox) {
    this.updateValue([checkbox]);
  }

  getCheckboxesToUpdate (newCheckboxes) {
    return this.state.checkboxes.filter(checkbox => [].concat(newCheckboxes).some(value => value === checkbox.value));
  }

  updateValue (newCheckboxes, status = 'toggle') {
    this.setState({
      checkboxes: this.state.checkboxes.map(checkbox => {
        if (newCheckboxes.some(newCheckbox => newCheckbox === checkbox)) {
          /* eslint-disable sorting/sort-object-props */
          const newStatus = {
            checked: true,
            unchecked: false,
            toggle: !checkbox.isChecked
          }[status];
          /* eslint-enable sorting/sort-object-props */
          return {
            ...checkbox,
            isChecked: newStatus
          };
        }
        return checkbox;
      })
    });
  }

  render () {
    const {checkboxes} = this.state;

    return (
      <div className={`${styles[this.props.inputStyle]} form-group`}>
        {this.props.heading && <div className={this.props.headingStyle}>{this.props.heading}</div>}

        <div className={styles.inputContainer}>
          {checkboxes.map((checkbox, key) =>
            <div className={`checkbox ${styles.checkbox}`} key={key}>
              <input
                className="form-control"
                id={`${this.props.name}${checkbox.id}`}
                name={this.props.name}
                key={checkbox.id}
                value={checkbox.value}
                type="checkbox"
                checked={checkbox.isChecked}
                onChange={() => this.onChange(checkbox)} />

              <label htmlFor={`${this.props.name}${checkbox.id}`}>{checkbox.label}</label>
            </div>
          )}
        </div>
      </div>
    );
  }
}

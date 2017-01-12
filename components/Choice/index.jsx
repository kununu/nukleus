import React, {Component, PropTypes} from 'react';

import styles from './index.scss';


export default class Choice extends Component {
  static propTypes = {
    checked: PropTypes.string,
    disabled: PropTypes.bool,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    options: PropTypes.object.isRequired
  };

  static defaultProps = {
    checked: '',
    disabled: false
  };

  state = {
    checked: this.props.checked
  };


  // add state.checked to save current checked option (it should be initialized from props.checked)
  // add onclickhandler method to change state.checked and to call props.onclick
  // add disabled prop
  // TODO:
  // add props.choiceStyle to define style, default one should be like primary kununu buttons


  onChangeHandler = e => {
    if (this.props.disabled) return;

    this.props.onChange(e);
    this.setState({
      checked: e.target.value
    });
  };

  render () {
    return (
      <div className={styles.radioContainer}>
        {Object.keys(this.props.options).map((key, idx) =>
          <div className={styles.radioButton} key={idx}>
            <input
              type="radio"
              value={key}
              id={this.props.name + key}
              name={this.props.name}
              checked={this.state.checked === key}
              onChange={this.onChangeHandler} />
            <label
              disabled={this.props.disabled}
              htmlFor={this.props.name + key}>
              {this.props.options[key]}
            </label>
          </div>
        )}
      </div>
    );
  }
}

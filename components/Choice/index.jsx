import React, {Component, PropTypes} from 'react';

import styles from './index.scss';


export default class Choice extends Component {
  static propTypes = {
    checked: PropTypes.string,
    choiceStyle: PropTypes.object,
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
    checked: this.props.checked,
    isHovering: (new Array(Object.keys(this.props.options).length)).fill(false)
  };

  onChangeHandler = e => {
    if (this.props.disabled) return;

    this.props.onChange(e);
    this.setState({
      checked: e.target.value
    });
  };

  onMouseOverHandler = e => {
    if (this.props.disabled) return;

    this.state.isHovering[e.target.id] = true;
    this.setState(this.state);
  }

  onMouseOutHandler = e => {
    if (this.props.disabled) return;

    this.state.isHovering[e.target.id] = false;
    this.setState(this.state);
  }

  render () {
    const labelsStyle = [];
    if (this.props.choiceStyle) {
      Object.keys(this.props.options).forEach((key, idx) => {
        if (this.state.isHovering[idx] && !this.props.disabled) {
          labelsStyle[idx] = {backgroundColor: this.props.choiceStyle.hoverColor};
        } else if (this.state.checked === key) {
          labelsStyle[idx] = {backgroundColor: this.props.choiceStyle.checkedColor};
        } else {
          labelsStyle[idx] = {backgroundColor: this.props.choiceStyle.uncheckedColor};
        }
      });
    }

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
              id={idx}
              htmlFor={this.props.name + key}
              onMouseOver={this.props.choiceStyle && this.onMouseOverHandler}
              onMouseOut={this.props.choiceStyle && this.onMouseOutHandler}
              style={labelsStyle[idx]}>
              {this.props.options[key]}
            </label>
          </div>
        )}
      </div>
    );
  }
}

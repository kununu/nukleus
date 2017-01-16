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
    checked: ''
  };

  state = {
    checked: this.props.checked,
    isHovering: (new Array(Object.keys(this.props.options).length)).fill(false)
  };

  onChange = e => {
    if (this.props.disabled) return;

    this.props.onChange(e);
    this.setState({
      checked: e.target.value
    });
  };

  onMouseOver = e => {
    if (this.props.disabled) return;

    this.state.isHovering[e.target.id] = true;
    this.setState(this.state);
  }

  onMouseOut = e => {
    if (this.props.disabled) return;

    this.state.isHovering[e.target.id] = false;
    this.setState(this.state);
  }

  render () {
    const labelsStyle = [];
    const {
      choiceStyle,
      disabled,
      name,
      options
    } = this.props;
    const {
      checked,
      isHovering
    } = this.state;

    if (choiceStyle) {
      Object.keys(options).forEach((key, idx) => {
        if (isHovering[idx] && !disabled) {
          labelsStyle[idx] = {backgroundColor: choiceStyle.hoverColor};
        } else if (checked === key) {
          labelsStyle[idx] = {backgroundColor: choiceStyle.checkedColor};
        } else {
          labelsStyle[idx] = {backgroundColor: choiceStyle.uncheckedColor};
        }
      });
    }

    return (
      <div className={styles.radioContainer}>
        {Object.keys(options).map((key, idx) =>
          <div className={styles.radioButton} key={idx}>
            <input
              type="radio"
              value={key}
              id={name + key}
              name={name}
              checked={checked === key}
              onChange={this.onChange} />
            <label
              disabled={disabled}
              id={idx}
              htmlFor={name + key}
              onMouseOver={choiceStyle && this.onMouseOver}
              onMouseOut={choiceStyle && this.onMouseOut}
              style={labelsStyle[idx]}>
              {options[key]}
            </label>
          </div>
        )}
      </div>
    );
  }
}

import React, {Component, PropTypes} from 'react';

import styles from './index.scss';

import {
  controlLabel,
  controlLabelRequired,
  controlNote,
  formGroup
} from '../index.scss';

export default class Choice extends Component {

  static propTypes = {
    checked: PropTypes.string,
    customTheme: PropTypes.string,
    disabled: PropTypes.bool,
    heading: PropTypes.string,
    headingStyle: PropTypes.string,
    isRequired: PropTypes.bool,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    options: PropTypes.array.isRequired,
    optionsPerRow: PropTypes.string,
    query: PropTypes.object,
    requiredLabel: PropTypes.string
  };

  static defaultProps = {
    checked: '',
    customTheme: '',
    disabled: false,
    heading: '',
    headingStyle: 'control-label',
    isRequired: false,
    onChange: null,
    optionsPerRow: null,
    query: {},
    requiredLabel: ''
  };

  state = {
    checked: this.props.checked
  };

  componentWillMount () {
    const {query, name} = this.props;
    if (!query[name]) return;
    this.setState({
      checked: query[name]
    });
  }

  componentWillReceiveProps (nextProps) {
    const {query, name} = nextProps;
    if (nextProps.query === this.props.query && nextProps.checked === this.props.checked) return;
    if (query[name] && query[name] !== this.props.query[name]) {
      this.setState({
        checked: query[name]
      });
    } else if (nextProps.checked !== this.props.checked) {
      this.setState({
        checked: nextProps.checked
      });
    }
  }

  onChange = e => {
    if (this.props.disabled) return;

    this.props.onChange(e);
    this.setState({
      checked: e.target.value
    });
  };

  // Unfortunately there is no css selector to check if an element would be the
  // last one of the right side, if it isn't the last child
  isLastRightCol (idx) {
    const {options, optionsPerRow} = this.props;

    // First check if optionsPerRow is set and count of options is no multiple of optionsPerRow
    if (!optionsPerRow) return false;

    // Check if index is the last right col
    if ((idx + 1) % optionsPerRow === 0 && (idx + 1 + optionsPerRow) > options.length) return true;

    return false;
  }

  render () {
    const {
      customTheme,
      disabled,
      heading,
      isRequired,
      name,
      options,
      requiredLabel
    } = this.props;

    const optionsPerRow = this.props.optionsPerRow && parseInt(this.props.optionsPerRow, 10);

    const {
      checked
    } = this.state;

    return (
      <div className={formGroup}>

        {requiredLabel &&
          <span className={`${controlNote} ${controlLabelRequired}`}>
            {requiredLabel}
          </span>
        }

        {heading && <div className={`${this.props.headingStyle} ${controlLabel}`}>{heading}</div>}

        <div className={`${styles.radioContainer} ${options.length > 3 && styles.flexible}`} data-options-per-row={optionsPerRow}>
          {options.map((item, idx) =>
            <div className={`${styles.radioButton} ${this.isLastRightCol(idx) ? styles.lastRightCol : ''}`} key={item.id}>
              <input
                type="radio"
                value={item.value}
                id={`${name}${item.id}`}
                name={name}
                checked={checked === item.value}
                onChange={this.onChange}
                required={isRequired} />
              <label
                disabled={disabled}
                id={idx}
                htmlFor={`${name}${item.id}`}
                className={customTheme}>
                {item.label}
              </label>
            </div>
          )}
        </div>
      </div>
    );
  }
}

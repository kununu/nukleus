import React, {Component, PropTypes} from 'react';

import styles from './index.scss';


export default class Choice extends Component {
  static propTypes = {
    checked: PropTypes.string,
    customTheme: PropTypes.string,
    disabled: PropTypes.bool,
    heading: PropTypes.string,
    headingStyle: PropTypes.string,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    options: PropTypes.array.isRequired,
    query: PropTypes.object,
    required: PropTypes.bool
  };

  static defaultProps = {
    checked: '',
    customTheme: '',
    headingStyle: 'control-label',
    query: {}
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

  render () {
    const {
      customTheme,
      disabled,
      name,
      options,
      required
    } = this.props;
    const {
      checked
    } = this.state;


    return (
      <div className="form-group">
        {this.props.heading && <div className={this.props.headingStyle}>{this.props.heading}</div>}
        <div className={styles.radioContainer}>
          {options.map((item, idx) =>
            <div className={styles.radioButton} key={idx}>
              <input
                type="radio"
                value={item.value}
                id={`${name}${item.id}`}
                name={name}
                checked={checked === item.value}
                onChange={this.onChange}
                required={required} />
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

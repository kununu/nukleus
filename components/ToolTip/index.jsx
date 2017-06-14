import React, {PropTypes, Component} from 'react';

import styles from './index.scss';

export default class ToolTip extends Component {
  static propTypes = {
    content: PropTypes.string,
    label: PropTypes.string.isRequired,
    position: PropTypes.oneOf([
      'topLeft',
      'topMiddle',
      'topRight',
      'leftMiddle',
      'rightMiddle',
      'bottomLeft',
      'bottomCenter',
      'bottomRight'
    ])
  };

  static defaultProps = {
    content: '',
    position: 'bottomLeft'
  }

  state = {
    active: false
  }

  onMouseOver = () => {
    this.setState({
      active: true
    });
  }

  onMouseOut = () => {
    this.setState({
      active: false
    });
  }

  get infoBoxClassNames () {
    return [styles.infoBox, styles[this.props.position]].join(' ');
  }

  get infoBox () {
    if (!this.state.active) return null;

    return (
      <p className={this.infoBoxClassNames}>{this.props.content}</p>
    );
  }

  render () {
    const {label} = this.props;
    return (
      <div className={styles.toolTip}>
        <button
          title={label}
          onMouseOver={this.onMouseOver}
          onMouseOut={this.onMouseOut}>
          <i className="fa fa-info" aria-hidden="true" />
        </button>
        {this.infoBox()}
      </div>
    );
  }
}

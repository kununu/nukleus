import React, {PropTypes, Component} from 'react';

import styles from './index.scss';

import InfoBox from '../InfoBox';
import {unstyledButton} from '../index.scss';

export default class ToolTip extends Component {
  static propTypes = {
    content: PropTypes.string,
    label: PropTypes.string.isRequired
  };

  static defaultProps = {
    content: '',
    position: 'bottomLeft'
  }

  state = {
    active: false,
    clickActivated: false
  }

  componentDidMount () {
    document.addEventListener('click', this.detectClickInside);
  }

  componentWillUnmount () {
    document.removeEventListener('click', this.detectClickInside);
  }

  onMouseEnter = () => {
    this.showInfoBox();
  }

  onMouseLeave = () => {
    // Hide Info Box if it wasn't activated via click or touch
    if (!this.state.clickActivated) {
      this.hideInfoBox();
    }
  }

  onClick = ev => {
    ev.target.blur();
    // Hide Info Box if it was activated via click
    if (this.state.active && this.state.clickActivated) {
      this.hideInfoBox();
      return;
    }
    this.showInfoBox(true);
  }

  detectClickInside = ev => {
    if (!this.state.active) return;

    let node = ev.target;
    let clickInside = node === this.container;

    while (!clickInside && node.parentNode) {
      node = node.parentNode;
      clickInside = node === this.container;
    }

    if (!clickInside) {
      this.hideInfoBox();
    }
  }

  hideInfoBox () {
    this.setState({
      active: false,
      clickActivated: false
    });
  }

  showInfoBox (clickActivated = this.state.clickActivated) {
    this.setState({
      active: true,
      clickActivated
    });
  }

  render () {
    const {
      content,
      label
    } = this.props;

    return (
      <div ref={container => { this.container = container; }} className={styles.toolTip}>
        <button
          className={unstyledButton}
          title={label}
          type="button"
          onClick={this.onClick}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}>
          <i className="fa fa-info-circle" aria-hidden="true" />
        </button>
        { this.state.active && <InfoBox content={content} /> }
      </div>
    );
  }
}

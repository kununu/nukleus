import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.scss';

import InfoBox from '../InfoBox';
import {unstyledButton} from '../index.scss';

export default class ToolTip extends React.Component {
  static propTypes = {
    content: PropTypes.string,
    icon: PropTypes.element,
    label: PropTypes.string.isRequired,
    position: PropTypes.oneOf([
      'topLeft',
      'topRight',
      'bottomLeft',
      'bottomRight'
    ])
  };

  static defaultProps = {
    content: '',
    icon: (
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 36 37"
        xmlSpace="preserve">
        <path
          d="M24,29.3928571 L24,25.6428571 C24,25.424106 23.9296882,25.2444203 23.7890625,25.1037946 C23.6484368,24.9631689 23.4687511,24.8928571 23.25,24.8928571 L21,24.8928571 L21,12.8928571 C21,12.674106 20.9296882,12.4944203 20.7890625,12.3537946 C20.6484368,12.2131689 20.4687511,12.1428571 20.25,12.1428571 L12.75,12.1428571 C12.5312489,12.1428571 12.3515632,12.2131689 12.2109375,12.3537946 C12.0703118,12.4944203 12,12.674106 12,12.8928571 L12,16.6428571 C12,16.8616082 12.0703118,17.0412939 12.2109375,17.1819196 C12.3515632,17.3225453 12.5312489,17.3928571 12.75,17.3928571 L15,17.3928571 L15,24.8928571 L12.75,24.8928571 C12.5312489,24.8928571 12.3515632,24.9631689 12.2109375,25.1037946 C12.0703118,25.2444203 12,25.424106 12,25.6428571 L12,29.3928571 C12,29.6116082 12.0703118,29.7912939 12.2109375,29.9319196 C12.3515632,30.0725453 12.5312489,30.1428571 12.75,30.1428571 L23.25,30.1428571 C23.4687511,30.1428571 23.6484368,30.0725453 23.7890625,29.9319196 C23.9296882,29.7912939 24,29.6116082 24,29.3928571 L24,29.3928571 Z M21,8.39285714 L21,4.64285714 C21,4.42410605 20.9296882,4.24442035 20.7890625,4.10379464 C20.6484368,3.96316894 20.4687511,3.89285714 20.25,3.89285714 L15.75,3.89285714 C15.5312489,3.89285714 15.3515632,3.96316894 15.2109375,4.10379464 C15.0703118,4.24442035 15,4.42410605 15,4.64285714 L15,8.39285714 C15,8.61160824 15.0703118,8.79129394 15.2109375,8.93191964 C15.3515632,9.07254535 15.5312489,9.14285714 15.75,9.14285714 L20.25,9.14285714 C20.4687511,9.14285714 20.6484368,9.07254535 20.7890625,8.93191964 C20.9296882,8.79129394 21,8.61160824 21,8.39285714 L21,8.39285714 Z M36,18.1428571 C36,21.4084985 35.1953205,24.4201871 33.5859375,27.1780134 C31.9765545,29.9358397 29.7929825,32.1194116 27.0351562,33.7287946 C24.27733,35.3381777 21.2656413,36.1428571 18,36.1428571 C14.7343587,36.1428571 11.72267,35.3381777 8.96484375,33.7287946 C6.20701746,32.1194116 4.02344555,29.9358397 2.4140625,27.1780134 C0.804679453,24.4201871 0,21.4084985 0,18.1428571 C0,14.8772158 0.804679453,11.8655272 2.4140625,9.10770089 C4.02344555,6.3498746 6.20701746,4.16630269 8.96484375,2.55691964 C11.72267,0.947536596 14.7343587,0.142857143 18,0.142857143 C21.2656413,0.142857143 24.27733,0.947536596 27.0351562,2.55691964 C29.7929825,4.16630269 31.9765545,6.3498746 33.5859375,9.10770089 C35.1953205,11.8655272 36,14.8772158 36,18.1428571 L36,18.1428571 Z" />
      </svg>
    ),
    position: 'topLeft'
  };

  state = {
    active: false,
    clickActivated: false
  };

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
      icon,
      label,
      position
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
          {icon}
        </button>
        { this.state.active && <InfoBox content={content} position={position} /> }
      </div>
    );
  }
}

import React, {Component, PropTypes} from 'react';

import styles from './index.scss';

import {getPositionRight, getPositionLeft} from '../helpers';

export default class InfoBox extends Component {
  static propTypes = {
    content: PropTypes.string.isRequired,
    position: PropTypes.oneOf([
      'topLeft',
      'topRight',
      'bottomLeft',
      'bottomRight'
    ])
  };

  static defaultProps = {
    position: 'topLeft'
  };

  componentDidMount () {
    this.needsLayoutUpdate = true;
    this.update();
  }

  needsLayoutUpdate = false;

  get translatedXByScreenEdge () {
    // Check if rect is outside right window border
    if (getPositionRight(this.container) > window.innerWidth) return (getPositionRight(this.container) - window.innerWidth) * -1;

    // Check if rect is outside left window border
    if (getPositionLeft(this.container) < 0) return getPositionLeft(this.container) * -1;

    return 0;
  }

  set transform (value) {
    this.container.style.transform = value;
  }

  updateLayout = () => {
    /**
    * since the floating info box is positioned absolutely,
    * there might be a case (especially on mobile devices), where
    * the box is outside the right or left edge of the window.
    */
    if (this.translatedXByScreenEdge !== 0) {
      this.transform = `translate(${this.translatedXByScreenEdge}px, 0)`;
    } else {
      this.transform = '';
    }
  }

  windowResize = () => {
    this.needsLayoutUpdate = true;
  }

  /**
   * Update function that checks every animationframe, if there needs to be a
   * layout update
   */
  update () {
    if (this.needsLayoutUpdate) {
      this.updateLayout();
      this.needsLayoutUpdate = false;
    }
    window.requestAnimationFrame(() => this.update());
  }

  render () {
    return (
      <p
        ref={container => { this.container = container; }}
        className={`${styles.infoBox} ${styles[this.props.position]}`}>
        {this.props.content}
      </p>
    );
  }
}

import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.scss';

export default class InfoBox extends React.Component {
  static propTypes = {
    content: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]).isRequired,
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

  componentWillMount () {
    window.addEventListener('resize', this.windowResize);
  }

  componentDidMount () {
    this.needsLayoutUpdate = true;
    this.update();
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.windowResize);
  }

  needsLayoutUpdate = false;
  currentTranslateX = 0;

  get translatedXByScreenEdge () {
    // Check if rect is outside right window border
    if (this.positionRight > window.innerWidth) return (this.positionRight - window.innerWidth) * -1;

    // Check if rect is outside left window border
    if (this.positionLeft < 0) return this.positionLeft * -1;

    return 0;
  }

  get positionRight () {
    return this.container.getBoundingClientRect().right - this.translateX;
  }

  get positionLeft () {
    return this.container.getBoundingClientRect().left - this.translateX;
  }

  set translateX (x) {
    this.currentTranslateX = x;
    if (x === 0) {
      this.container.style.transform = '';
    } else {
      this.container.style.transform = `translateX(${this.currentTranslateX}px)`;
    }
  }

  get translateX () {
    return this.currentTranslateX;
  }

  updateLayout = () => {
    /**
    * since the floating info box is positioned absolutely,
    * there might be a case (especially on mobile devices), where
    * the box is outside the right or left edge of the window.
    */
    this.translateX = this.translatedXByScreenEdge;
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
    const CustomTag = typeof (this.props.content) === 'object' ? 'div' : 'p';
    return (
      <CustomTag
        ref={container => { this.container = container; }}
        className={`${styles.infoBox} ${styles[this.props.position]}`}>
        {this.props.content}
      </CustomTag>
    );
  }
}

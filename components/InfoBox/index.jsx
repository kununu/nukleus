import React, {Component, PropTypes} from 'react';

import styles from './index.scss';

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

  componentWillMount () {
    window.addEventListener('resize', this.checkPosition);
  }

  componentDidMount () {
    this.needsUpdate = true;
    this.update();
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.checkPosition);
  }

  needsUpdate = false;

  get computedLeft () {
    const styleLeft = window.getComputedStyle(this.container).getPropertyValue('left');
    return parseInt(styleLeft.replace('px', ''), 10);
  }

  get normalizedLeft () {
    const rect = this.container.getBoundingClientRect();

    // Check if rect is outside right window border
    if (rect.right > window.innerWidth) return this.computedLeft - (rect.right - window.innerWidth);

    // Check if rect is outside left window border
    if (rect.left < 0) return rect.left * -1;

    return 0;
  }

  set transformX (xPos) {
    if (xPos !== 0) {
      this.container.style.transform = `translateX(${xPos}px)`;
    } else {
      this.container.style.transform = '';
    }
  }

  checkPosition = () => {
    this.transformX = this.normalizedLeft;
  }

  windowResize = () => {
    this.needsUpdate = true;
  }

  update () {
    // Prevent this from happening more often than once per animationframe and while last positioning is still going on
    if (this.needsUpdate) {
      this.checkPosition();
      this.needsUpdate = false;
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

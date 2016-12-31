import React, {Component, PropTypes} from 'react';

import styles from './index.scss';


export default class RatingStars extends Component {
  static propTypes = {
    color: PropTypes.string,
    name: PropTypes.string.isRequired,
    totalStars: PropTypes.number,
    value: PropTypes.number
  }

  static defaultProps = {
    color: 'currentColor',
    totalStars: 5,
    value: 0
  }

  state = {
    hoverValue: 0,
    value: this.props.value
  }

  onClick = e => {
    const newVal = e.target.value;

    if (newVal === this.state.value) {
      return this.deselectStar();
    }

    return this.updateValue(newVal);
  }

  onMouseEnter = value => {
    this.setHoverValue(value);
  }

  onMouseLeave = () => {
    this.setHoverValue(0);
  }

  setHoverValue (value) {
    this.setState({
      hoverValue: value
    });
  }

  deselectStar () {
    this.updateValue(0);
    this.setHoverValue(0);
  }

  isEmptyStar = key => {
    if (this.state.hoverValue && this.state.hoverValue > this.state.value && this.state.hoverValue >= key) {
      return false;
    }

    if (this.state.value && this.state.value >= key) {
      return false;
    }

    return true;
  }

  updateValue (newValue) {
    this.setState({
      value: newValue
    });
  }

  render () {
    const {
      color,
      name,
      totalStars
    } = this.props;

    return (
      <div className={styles.ratingStarsContainer}>
        {[...Array(totalStars)].map((star, key) =>
          <div
            key={key}
            className={styles.ratingStar}
            onMouseEnter={() => this.onMouseEnter(key + 1)}
            onMouseLeave={this.onMouseEnter}>
            <input
              className={styles.hiddenInput}
              type="radio"
              name={name}
              value={key + 1}
              onChange={this.onClick}
              id={`star${key}`} />

            <label htmlFor={`star${key}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                xmlSpace="preserve"
                viewBox="0 0 501.8 478.6"
                width="100%"
                fill={color}
                preserveAspectRatio="none"
                className={styles.star}
                x="0" y="0">
                <g>
                  <path
                    className={`${styles.full} ${styles[!this.isEmptyStar(key + 1) && 'visible']}`}
                    d="M501.8,185.5c0,4.4-2.6,9.3-7.8,14.5L384.5,306.7l25.9,150.8c0.2,1.4,0.3,3.4,0.3,6c0,4.2-1.1,7.8-3.2,10.7
                  c-2.1,2.9-5.2,4.4-9.2,4.4c-3.8,0-7.8-1.2-12.1-3.6l-135.4-71.2L115.5,475c-4.4,2.4-8.4,3.6-12.1,3.6c-4.2,0-7.4-1.5-9.5-4.4
                  c-2.1-2.9-3.2-6.5-3.2-10.7c0-1.2,0.2-3.2,0.6-6l25.9-150.8L7.5,200c-5-5.4-7.5-10.3-7.5-14.5c0-7.4,5.6-12.1,16.9-13.9l151.4-22
                  l67.9-137.2C240,4.1,244.9,0,250.9,0c6,0,11,4.1,14.8,12.4l67.9,137.2l151.4,22C496.2,173.4,501.8,178,501.8,185.5z" />

                  <path
                    className={`${styles[this.isEmptyStar(key + 1) && 'visible']}`}
                    d="M500,184.8c0,4.4-2.6,9.2-7.8,14.4L383.1,305.6L409,455.8c0.2,1.4,0.3,3.4,0.3,6c0,10-4.1,15-12.3,15
                    c-3.8,0-7.8-1.2-12-3.6L250,402.4l-134.9,70.9c-4.4,2.4-8.4,3.6-12,3.6c-4.2,0-7.4-1.5-9.5-4.4c-2.1-2.9-3.2-6.5-3.2-10.7
                    c0-1.2,0.2-3.2,0.6-6l25.8-150.2L7.5,199.2C2.5,193.8,0,189,0,184.8c0-7.4,5.6-12,16.8-13.8L167.7,149l67.6-136.7
                    C239.1,4.1,244,0,250,0c6,0,10.9,4.1,14.7,12.3L332.3,149L483.2,171C494.4,172.8,500,177.4,500,184.8z M341.7,292.1l92-89.2
                    l-126.8-18.6L250,69.4l-56.8,114.8L66.4,202.8l92,89.2l-21.9,126.5L250,358.8l113.3,59.8L341.7,292.1z" />
                </g>
              </svg>
              <span className="sr-only">
                5
              </span>
            </label>
          </div>
        )}
      </div>
    );
  }
}

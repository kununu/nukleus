import React, {Component, PropTypes} from 'react';

import styles from './index.scss';

export default class RatingStars extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    totalStars: PropTypes.number,
    value: PropTypes.number
  }

  static defaultProps = {
    totalStars: 5,
    value: 0
  }

  state = {
    hoverValue: 0,
    value: this.props.value
  }

  onClick = e => {
    this.updateValue(e.target.value);
  }

  onMouseEnter = value => {
    this.setHoverValue(value);
  }

  onMouseLeave = () => {
    this.setHoverValue(0);
  }

  getStarClassFromValue = (value, hoverValue, key) => {
    if (hoverValue && hoverValue > value && hoverValue >= key) {
      return 'star';
    }

    if (value && value >= key) {
      return 'star';
    }

    return 'star-o';
  }

  setHoverValue (value) {
    this.setState({
      hoverValue: value
    });
  }

  updateValue (newValue) {
    this.setState({
      value: newValue
    });
  }


  render () {
    const {
      name,
      totalStars
    } = this.props;

    return (
      <div className={styles.ratingStarsContainer}>
        {[...Array(totalStars)].map((star, key) =>
          <div key={key} className={styles.ratingStar} onMouseEnter={() => this.onMouseEnter(key + 1)} onMouseLeave={this.onMouseEnter}>
            <input
              className={styles.hiddenInput}
              type="radio"
              name={name}
              value={key + 1}
              onChange={this.onClick}
              id={`star${key}`} />
            <label htmlFor={`star${key}`}>
              <i className={`fa fa-${this.getStarClassFromValue(this.state.value, this.state.hoverValue, key + 1)} ${styles.star}`} aria-hidden="true" />
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

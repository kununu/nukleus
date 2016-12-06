import React, {Component, PropTypes} from 'react';

function roundToHalves (number) {
  return Math.round(number * 2) / 2;
}

function getClassFrom (value) {
  return `rating-${roundToHalves(value).toString().replace('.', '-')}`;
}

export default class Stars extends Component {
  static propTypes = {
    value: PropTypes.number.isRequired
  };

  constructor ({value}) {
    super();
    this.starValue = getClassFrom(value);
    this.value = Math.round(value * 100) / 100;
  }

  render () {
    return (
      <rating className="rating rate-inline">
        <div className={this.starValue}>
          <span className="sr-only">Rating {this.value}</span>
          {[...Array(5)].map((item, key) =>
            <i
              key={key}
              className={`rating-star rating-star-${key + 1} fa`} />
          )}
        </div>
      </rating>
    );
  }
}

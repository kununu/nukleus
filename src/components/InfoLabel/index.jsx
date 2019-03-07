import React from 'react';
import PropTypes from 'prop-types';

import {
  controlNote,
} from '../index.scss';

import styles from './index.scss';

const InfoLabel = ({
  displayLength,
  inputValue,
  maxLength,
  requiredLabel,
}) => {

  if (requiredLabel && (!displayLength || (!inputValue || inputValue.trim() === ''))) {
    return (<span className={`${controlNote} ${styles.label}`}>{requiredLabel}</span>);
  }

  // Show requiredLabel if available and user hasn't typed any inputValues
  return displayLength ? (
    <span className={`${controlNote} ${styles.label}`}>
      <strong>{inputValue.length}</strong>
      /
      {maxLength}
    </span>
  ) : null;
};

InfoLabel.propTypes = {
  displayLength: PropTypes.bool,
  inputValue: PropTypes.string,
  maxLength: PropTypes.number,
  requiredLabel: PropTypes.string,
};

InfoLabel.defaultProps = {
  displayLength: false,
  inputValue: '',
  maxLength: 500,
  requiredLabel: '',
};

export default InfoLabel;

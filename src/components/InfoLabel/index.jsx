import React from 'react';
import PropTypes from 'prop-types';

import {
  controlLabelRequired,
  controlNote,
} from '../index.scss';

const InfoLabel = ({
  displayLength,
  inputValue,
  maxLength,
  requiredLabel,
}) => {
  if (requiredLabel && (!displayLength || inputValue.trim() === '')) {
    return (<span className={`${controlNote} ${controlLabelRequired}`}>{requiredLabel}</span>);
  }

  // Show requiredLabel if available and user hasn't typed any inputValues
  return displayLength ? (
    <span className={`${controlNote} ${controlLabelRequired}`}>
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

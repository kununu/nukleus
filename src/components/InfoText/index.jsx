import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.scss';

export default function InfoText ({text, infoStyle}) {
  return (
    <div className={`${styles.infoText} ${styles[infoStyle]}`}>
      {text}
    </div>
  );
}

InfoText.propTypes = {
  infoStyle: PropTypes.oneOf(['inline']),
  text: PropTypes.string.isRequired,
};

InfoText.defaultProps = {infoStyle: 'inline'};

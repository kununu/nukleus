import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.scss';

const ErrorComponent = ({info, subInfo}) => (
  <span className={`${styles.error}`}>
    <strong className={styles.info}>{info}</strong>
    {subInfo}
  </span>
);

ErrorComponent.propTypes = {
  info: PropTypes.string.isRequired,
  subInfo: PropTypes.string
};

ErrorComponent.defaultProps = {
  subInfo: ''
};

export default ErrorComponent;

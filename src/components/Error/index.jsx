import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.scss';

const Error = ({info, subInfo}) => (
  <span className={styles.error}>
    <strong className={styles.info}>{info}</strong>
    {subInfo}
  </span>
);

Error.propTypes = {
  info: PropTypes.string.isRequired,
  subInfo: PropTypes.string,
};

Error.defaultProps = {
  subInfo: '',
};

export default Error;

import React, {PropTypes} from 'react';

import styles from './index.scss';

const Error = ({errorStyle, info, subInfo}) => (
  <span className={`${styles.error} ${styles[errorStyle]}`}>
    <strong className={styles.info}>{info}</strong>
    {subInfo}
  </span>
);

Error.propTypes = {
  errorStyle: PropTypes.oneOf(['inline']),
  info: PropTypes.string.isRequired,
  subInfo: PropTypes.string
};

Error.defaultProps = {
  errorStyle: 'inline',
  subInfo: ''
};

export default Error;

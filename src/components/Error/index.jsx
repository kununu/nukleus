import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.scss';

const Error = ({info, subInfo, id}) => (
  <span
    className={styles.error}
    id={id}
  >
    <strong className={styles.info}>{info}</strong>
    {subInfo}
  </span>
);


Error.propTypes = {
  info: PropTypes.string.isRequired,
  subInfo: PropTypes.string,
  id: PropTypes.string,
};

Error.defaultProps = {
  subInfo: '',
  id: null,
};

export default Error;

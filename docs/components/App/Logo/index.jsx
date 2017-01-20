import React from 'react';
import {Link} from 'react-router';

import styles from './index.scss';

export default () => (
  <Link to={''} className={styles.logo}>
    <h1 className="sr-only">kununu Gmbh</h1>

    <span
      className={styles.starSpinner}
      aria-hidden="true" />
  </Link>
);

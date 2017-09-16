import * as React from 'react';

const styles = require('./Logo.scss');

export default () => (
  <div className={styles.container}>
    <div className={styles.logo}>
      <i className="fa fa-play-circle" aria-hidden="true" />
    </div>
    <div>
      <div className={styles.line1}><strong>nukleus</strong> components</div>
      <div className={styles.line2}>playground</div>
    </div>
  </div>
);

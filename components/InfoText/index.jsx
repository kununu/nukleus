import React, {PropTypes} from 'react';

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
  text: PropTypes.string.isRequired
};

InfoText.defaultProps = {
  infoStyle: 'inline'
};

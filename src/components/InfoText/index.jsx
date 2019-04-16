import React from 'react';
import PropTypes from 'prop-types';

import ThemeContext from 'utils/themeContext';
import themeable from 'utils/theming';

import styles from './index.scss';

export default function InfoText ({text, infoStyle}) {
  return (
    <ThemeContext.Consumer>
      {(context) => {
        const theme = themeable({...styles, ...context});

        return (
          <div className={theme('infoText', [infoStyle])}>
            {text}
          </div>
        );
      }}
    </ThemeContext.Consumer>
  );
}

InfoText.propTypes = {
  infoStyle: PropTypes.oneOf(['inline', 'block']),
  text: PropTypes.string.isRequired,
};

InfoText.defaultProps = {infoStyle: 'inline'};

import React from 'react';
import PropTypes from 'prop-types';

import ThemeContext from 'utils/themeContext';
import themeable from 'utils/theming';

import styles from './index.scss';

const Error = ({info, subInfo, id}) => (
  <ThemeContext.Consumer>
    {(context) => {
      const theme = themeable({...styles, ...context});

      return (
        <span
          className={theme('errorContainer')}
          id={id}
        >
          <strong className={theme('errorInfo')}>{info}</strong>
          {subInfo}
        </span>
      );
    }}
  </ThemeContext.Consumer>
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

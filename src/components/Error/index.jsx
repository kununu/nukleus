import React from 'react';
import PropTypes from 'prop-types';

import ThemeContext from 'utils/themeContext';
import themeable from 'utils/theming';

import styles from './index.module.scss';

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
  info: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]).isRequired,
  subInfo: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  id: PropTypes.string,
};

Error.defaultProps = {
  subInfo: '',
  id: null,
};

export default Error;

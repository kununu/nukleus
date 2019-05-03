/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

import ThemeContext from 'utils/themeContext';

function ThemeProvider (props) {
  const {
    children,
    theme,
  } = props;

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

ThemeProvider.propTypes = {
  children: PropTypes.any.isRequired,
  theme: PropTypes.any.isRequired,
};

export default ThemeProvider;

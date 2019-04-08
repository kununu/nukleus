import React from 'react';

import ThemeContext from 'utils/themeContext';

function ThemeProvider (props) {
  const {
    children,
    theme,
  } = props;

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

export default ThemeProvider;
import React from 'react';
import PropTypes from 'prop-types';

import ThemeContext from 'utils/themeContext';
import themeable from 'utils/theming';

import sharedStyles from '../index.module.scss';

import styles from './index.module.scss';

const InfoLabel = ({
  displayLength,
  inputValue,
  maxLength,
  requiredLabel,
}) => (
  <ThemeContext.Consumer>
    {(context) => {
      const theme = themeable({...sharedStyles, ...styles, ...context});

      if (requiredLabel && (!displayLength || (!inputValue || inputValue.trim() === ''))) {
        return (<span className={theme('controlNote', 'infoLabel')}>{requiredLabel}</span>);
      }

      // Show requiredLabel if available and user hasn't typed any inputValues
      return displayLength ? (
        <span className={theme('controlNote', 'infoLabel', 'infoLabelCount')}>
          <strong>{inputValue.length}</strong>
            /
          {maxLength}
        </span>
      ) : null;
    }}
  </ThemeContext.Consumer>
);

InfoLabel.propTypes = {
  displayLength: PropTypes.bool,
  inputValue: PropTypes.string,
  maxLength: PropTypes.number,
  requiredLabel: PropTypes.string,
};

InfoLabel.defaultProps = {
  displayLength: false,
  inputValue: '',
  maxLength: 500,
  requiredLabel: '',
};

export default InfoLabel;

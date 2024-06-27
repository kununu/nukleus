import React from 'react';
import PropTypes from 'prop-types';

import ThemeContext from 'utils/themeContext';
import themeable from 'utils/theming';

import sharedStyles from '../index.module.scss';

export default function Label ({
  classNames,
  id,
  isTitle,
  labelHidden,
  value,
}) {
  return (
    <ThemeContext.Consumer>
      {(context) => {
        const theme = themeable({...sharedStyles, ...context});
        const hidden = labelHidden ? 'srOnly' : '';
        const allClassNames = `${classNames} controlLabel ${hidden}`.split(' ');

        /**
         * For checkbox groups or radio button groups you may want
         * to have a title that looks like a label
         *
         * @return {ReactElement} [Returns a div with the label styles]
         */
        if (isTitle) {
          return <div className={theme(...allClassNames)}>{value}</div>;
        }

        /**
         * generates a label or div representing the label of a group of fields
         *
         * @return {ReactElement} [Either returns a label or div or a react element]
         */
        if (typeof value === 'string') {
          return (
            <label
              htmlFor={id}
              className={theme(...allClassNames)}
            >
              {value}
            </label>
          );
        }

        // We don't simply put a more complex element inside a label to prevent a
        // clickable element like a link or button inside a label
        // However to also add the labelContainer class, we need to return a cloned
        // element and not just the label - element itself
        return React.cloneElement(
          value,
          {
            ...value.props,
            className: theme(...allClassNames),
          },
        );
      }}
    </ThemeContext.Consumer>
  );
}

Label.propTypes = {
  classNames: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  id: PropTypes.string,
  isTitle: PropTypes.bool,
  labelHidden: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
};

Label.defaultProps = {
  classNames: '',
  id: '',
  isTitle: false,
  labelHidden: false,
};

import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.scss';

const DocsRoot = ({
  title, component, example, propsDefinition, propsDefault
}) => (
  <div>
    <h2 className={styles.title}>{title}</h2>
    <div className={`${styles.tile} clearfix`}>
      {component}
    </div>

    <div className={`${styles.flexContainer} clearfix`}>
      <div className={styles.flexChild}>
        <pre>
          <code className="language-jsx">{example}</code>
        </pre>
      </div>

      <div className={styles.flexChild}>
        <div className={styles.propsDefinitions}>
          <pre>
            <code className="language-javascript">{propsDefinition}</code>
          </pre>
        </div>

        <div className={styles.defaultProps}>
          <pre>
            <code className="language-javascript">{propsDefault}</code>
          </pre>
        </div>
      </div>
    </div>
  </div>
);

DocsRoot.propTypes = {
  component: PropTypes.element.isRequired,
  example: PropTypes.string.isRequired,
  propsDefault: PropTypes.string.isRequired,
  propsDefinition: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default DocsRoot;

import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import {Tabs} from 'nukleus';
import DocsRoot from 'components/DocsRoot';

import {default as propsDefinition} from './props-definition.txt';
import {default as propsDefault} from './props-default.txt';
import styles from './index.scss';

const theme = 'default';

const TabsDocs = ({location: {pathname}}) => {
  const example = `${'<'}Tabs${'\n  '}items={[${'\n    <'}Link to={{pathname: '/tabs'}}>First Tab</Link>,${'\n    <'}Link to={{pathname: '/tabs/2'}}>Second Tab</Link>,${'\n    <'}Link to={{pathname: '/tabs/3'}}>Third Tab</Link>${'\n  '}]}${'\n  '}pathname="${pathname}"${'\n  '}theme="${theme}" ${'/>'}`;

  return (
    <DocsRoot
      title="Tabs"
      component={
        <div className={styles.tabsContainer}>
          <Tabs
            items={[
              <Link to={{pathname: '/tabs'}}>First Tab</Link>,
              <Link to={{pathname: '/tabs/2'}}>Second Tab</Link>,
              <Link to={{pathname: '/tabs/3'}}>Third Tab</Link>
            ]}
            pathname={pathname}
            theme={theme} />
        </div>
      }
      example={example}
      propsDefinition={propsDefinition}
      propsDefault={propsDefault} />
  );
};

TabsDocs.propTypes = {
  location: PropTypes.object.isRequired
};

export default TabsDocs;

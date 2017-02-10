import React, {PropTypes} from 'react';
import {Link} from 'react-router';

import {Tabs} from 'nukleus';
import DocsRoot from 'components/DocsRoot';

import {default as propsDefinition} from './props-definition.txt';
import {default as propsDefault} from './props-default.txt';
import styles from './index.scss';

const TabsDocs = ({location: {pathname}}) => {
  const example = `${'<'}Tabs${'\n  '}items={[${'\n    <'}Link to={{pathname: '/tabs'}}>First Tab</Link>,${'\n    <'}Link to={{pathname: '/tabs/2'}}>Second Tab</Link>,${'\n    <'}Link to={{pathname: '/tabs/3'}}>Third Tab</Link>${'\n  '}]}${'\n  '}pathname="${pathname}" ${'/>'}`;

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
            pathname={pathname} />
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

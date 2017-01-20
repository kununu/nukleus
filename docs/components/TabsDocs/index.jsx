import React, {PropTypes} from 'react';

import {Tabs} from 'nukleus';
import DocsRoot from 'components/DocsRoot';

import {default as propsDefinition} from './props-definition.txt';
import {default as propsDefault} from './props-default.txt';
import styles from './index.scss';

const TabsDocs = ({location: {pathname}}) => {
  const example = `${'<'}Tabs${'\n  '}pages={[${'\n    '}{title: 'First tab', path: '/'},${'\n    '}{title: 'Second tab', path: '/2'},${'\n    '}{title: 'Third tab', path: '/3'}${'\n  '}]}${'\n  '}pathname="${pathname}" ${'/>'}`;

  return (
    <DocsRoot
      title="Tabs"
      component={
        <div className={styles.tabsContainer}>
          <Tabs
            pages={[
              {path: '/tabs', title: 'First tab'},
              {path: '/tabs/2', title: 'Second tab'},
              {path: '/tabs/3', title: 'Third tab'}
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
  location: PropTypes.object
};

export default TabsDocs;

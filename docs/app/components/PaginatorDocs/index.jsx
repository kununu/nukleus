import React, {PropTypes} from 'react';

import {Paginator} from 'nukleus';
import DocsRoot from 'components/DocsRoot';

import {default as propsDefinition} from './props-definition.txt';
import {default as propsDefault} from './props-default.txt';
import styles from './index.scss';

const PaginatorDocs = ({location: {pathname, query}}) => {
  const example = `<Paginator${'\n  '}totalPages={10}${'\n  '}pathname="${pathname}" />`;

  return (
    <DocsRoot
      title="Paginator"
      component={
        <div className={styles.paginator} >
          <Paginator
            totalPages={10}
            pathname={pathname}
            query={query} />
        </div>
      }
      example={example}
      propsDefinition={propsDefinition}
      propsDefault={propsDefault} />
  );
};

PaginatorDocs.propTypes = {
  location: PropTypes.object
};

export default PaginatorDocs;

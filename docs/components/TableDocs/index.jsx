import React from 'react';
import {Link} from 'react-router-dom';

import {Table} from 'nukleus';
import DocsRoot from 'components/DocsRoot';

import {default as example} from './example.txt';
import {default as propsDefinition} from './props-definition.txt';
import {default as propsDefault} from './props-default.txt';
import styles from './index.scss';

const TableDocs = () => (
  <DocsRoot
    title="Table"
    component={
      <div className={styles.tableContainer}>
        <Table
          items={{
            id: [1, 2, 3, 4, 5],
            'in hiragana': ['いち', 'に', 'さん', 'よん', 'ご'],
            'in kanji': ['一', '二', '三', '四', '五'],
            link: [
              <Link to="/table">One</Link>,
              <Link to="/table">Two</Link>,
              <Link to="/table">Three</Link>,
              'Four',
              <Link to="/table">Five</Link>
            ]
          }} />
      </div>
    }
    example={example}
    propsDefinition={propsDefinition}
    propsDefault={propsDefault} />
);

export default TableDocs;

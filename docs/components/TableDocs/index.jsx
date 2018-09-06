import React from 'react';

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
          dataRows={[
            {
              age: 11,
              color: 'red',
              name: 'Joe'
            },
            {
              age: 20,
              color: 'blue',
              name: 'Merry'
            }
          ]}
          columns={[
            {
              accessor: 'name',
              header: 'Name',
              sortable: true
            },
            {
              accessor: 'age',
              header: 'Age',
              sortable: false
            },
            {
              accessor: 'color',
              cell: val => <span>custom cell: {val}</span>,
              header: 'color',
              sortable: true
            }
          ]} />
      </div>
    }
    example={example}
    propsDefinition={propsDefinition}
    propsDefault={propsDefault} />
);

export default TableDocs;

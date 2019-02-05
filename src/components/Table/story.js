import React from 'react';
import {storiesOf} from '@storybook/react';
import {defaultOptions} from 'defaultOptions'; // eslint-disable-line import/no-unresolved
import {withOptions} from '@storybook/addon-options';
import {withInfo} from '@storybook/addon-info';

import Table from './index';

storiesOf('Table', module)
  .addDecorator(withOptions({...defaultOptions}))
  .addDecorator((story, context) => withInfo("The MultipleChoice component! It's a pretty basic table component that accepts an array of data and is setup via columns. The accessor prop is used to match the data key to the column. The cell is only required if you want to wrap the data in that column in something special like a link or a span. The header is pretty self explanatory - you can use any type of prop here including elements. The sortable prop is either true or false.")(story)(context))
  .add('basics', () => (
    <Table
      dataRows={[
        {
          age: 11,
          color: 'red',
          name: 'Joe',
        },
        {
          age: 20,
          color: 'blue',
          name: 'Merry',
        },
        {
          age: 24,
          color: 'green',
          name: 'Paul',
        },
      ]}
      columns={[
        {
          accessor: 'name',
          header: 'Name',
          sortable: true,
        },
        {
          accessor: 'age',
          header: 'Age',
          sortable: false,
        },
        {
          accessor: 'color',
          cell: val => (
            <span style={{color: 'red'}}>
              custom cell:
              {val}
            </span>
          ),
          header: 'Fav color',
          sortable: true,
        },
      ]}
    />
  ));

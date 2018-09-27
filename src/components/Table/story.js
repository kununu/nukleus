import React from 'react';
import {storiesOf} from '@storybook/react';
import {defaultOptions} from 'defaultOptions';
import {withOptions} from '@storybook/addon-options';
// import {action} from '@storybook/addon-actions';
// import {withNotes} from '@storybook/addon-notes';
// import {withInfo} from '@storybook/addon-info';
// import {withKnobs, text, boolean} from '@storybook/addon-knobs/react';
// import backgrounds from '@storybook/addon-backgrounds';

import Table from './index';

storiesOf('Table', module)
  .addDecorator(withOptions({...defaultOptions}))
  .add('with some emoji', () => (
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
  ));

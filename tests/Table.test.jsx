import React from 'react';
import {Link} from 'react-router-dom';
import {StaticRouter} from 'react-router';
import renderer from 'react-test-renderer';
import Table from 'Table'; // eslint-disable-line import/no-unresolved, import/extensions, import/no-extraneous-dependencies


test('Renders basic Table without crashing', () => {
  const component = renderer.create((
    <StaticRouter location="test" context={{}}>
      <Table
        dataRows={[
          {
            test: 'test',
            test2: 'test2'
          }
        ]}
        columns={[
          {
            accessor: 'test',
            header: 'testHeader',
            sortable: false
          },
          {
            accessor: 'test2',
            header: 'testHeader2',
            sortable: false
          }
        ]} />
    </StaticRouter>
  ));

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders basic Table with custom cells', () => {
  const component = renderer.create((
    <StaticRouter location="test" context={{}}>
      <Table
        dataRows={[
          {
            test: 'test',
            test2: 'test2'
          }
        ]}
        columns={[
          {
            accessor: 'test',
            header: 'testHeader',
            sortable: true,
            cell: val => <Link to='/'>{val}</Link>
          },
          {
            accessor: 'test2',
            header: 'testHeader2',
            sortable: true,
            cell: val => <span>{val}$ - extra text</span>
          }
        ]} />
    </StaticRouter>
  ));

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders basic Table with sorting', () => {
  const component = renderer.create((
    <StaticRouter location="test" context={{}}>
      <Table
        dataRows={[
          {
            test: 'test',
            test2: 'test2'
          }
        ]}
        columns={[
          {
            accessor: 'test',
            header: 'testHeader',
            sortable: true
          },
          {
            accessor: 'test2',
            header: 'testHeader2',
            sortable: true
          }
        ]} />
    </StaticRouter>
  ));

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});


import React from 'react';
import {Link} from 'react-router-dom';
import {StaticRouter} from 'react-router';
import renderer from 'react-test-renderer';
import toJson from 'enzyme-to-json';
import {mount} from 'enzyme';
import Table from 'Table'; // eslint-disable-line

import * as themeable from '../utils/theming';

themeable.default = () => (...args) => Array.isArray(args) ? args.join(' ') : args;

test('Renders basic Table without crashing', () => {
  const component = renderer.create((
    <StaticRouter
      location="test"
      context={{}}
    >
      <Table
        dataRows={[
          {
            test: 'amanda',
            test2: 'brian',
          },
          {
            test: 'brian',
            test2: 'amanda',
          },
        ]}
        columns={[
          {
            accessor: 'test',
            header: 'testHeader',
            sortable: false,
          },
          {
            accessor: 'test2',
            header: 'testHeader2',
            sortable: false,
          },
        ]}
      />
    </StaticRouter>
  ));

  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});

test('Renders basic Table with initial sorting', () => {
  const component = renderer.create((
    <StaticRouter
      location="test"
      context={{}}
    >
      <Table
        initialSortingColumn={1}
        dataRows={[
          {
            test: 'amanda',
            test2: 'brian',
          },
          {
            test: 'brian',
            test2: 'amanda',
          },
        ]}
        columns={[
          {
            accessor: 'test',
            header: 'testHeader',
            sortable: false,
          },
          {
            accessor: 'test2',
            header: 'testHeader2',
            sortable: false,
          },
        ]}
      />
    </StaticRouter>
  ));

  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});

test('Renders basic Table with custom cells', () => {
  const component = renderer.create((
    <StaticRouter
      location="test"
      context={{}}
    >
      <Table
        dataRows={[
          {
            test: 'test',
            test2: 'test2',
          },
        ]}
        columns={[
          {
            accessor: 'test',
            cell: val => <Link to="/">{val}</Link>,
            header: 'testHeader',
            sortable: true,
          },
          {
            accessor: 'test2',
            cell: val => (
              <span>
                {val}
$ - extra text
              </span>
            ),
            header: 'testHeader2',
            sortable: true,
          },
        ]}
      />
    </StaticRouter>
  ));

  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});

test('Renders basic Table with sorting', () => {
  const component = mount(<Table
    dataRows={[
      {
        test: 'a',
        test2: 'a',
      },
      {
        test: 'b',
        test2: 'b',
      },
    ]}
    columns={[
      {
        accessor: 'test',
        header: 'testHeader',
        sortable: true,
      },
      {
        accessor: 'test2',
        header: 'testHeader2',
        sortable: true,
      },
    ]}
  />);

  component.find('#button-desc').first().simulate('click');
  expect(toJson(component)).toMatchSnapshot();
});

test('Sort table correctly based on comma seperated numbers within strings', () => {
  const component = mount(<Table
    dataRows={[
      {
        name: 'first',
        value: '3,50',
      },
      {
        name: 'second',
        value: '3,20',
      },
    ]}
    initialSortingColumn={1}
    columns={[
      {
        accessor: 'name',
        header: 'Name',
        sortable: true,
      },
      {
        accessor: 'value',
        header: 'Value',
        sortable: true,
      },
    ]}
  />);

  expect(toJson(component)).toMatchSnapshot();
});

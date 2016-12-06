import React from 'react';
import renderer from 'react-test-renderer';
import Tabs from 'Tabs'; // eslint-disable-line import/no-unresolved, import/extensions, import/no-extraneous-dependencies

test('Renders Tabs without crashing', () => {
  const component = renderer.create(
    <Tabs
      pages={[
        {path: 'test', query: 'test', title: 'Fist tab'},
        {path: '/test/2', query: 'test', title: 'Second tab'},
        {path: '/test/3', query: 'test', title: 'Third tab'}
      ]}
      pathname={'test'} />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

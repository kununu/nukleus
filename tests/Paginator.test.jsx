import React from 'react';
import renderer from 'react-test-renderer';
import Paginator from 'Paginator'; // eslint-disable-line import/no-unresolved, import/extensions, import/no-extraneous-dependencies

test('Renders Paginator without crashing', () => {
  const component = renderer.create(
    <Paginator
      totalPages={10}
      pathname="2" />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

import React from 'react';
import renderer from 'react-test-renderer';
import Stars from 'Stars'; // eslint-disable-line import/no-unresolved, import/extensions, import/no-extraneous-dependencies

test('Renders Stars without crashing', () => {
  const component = renderer.create(
    <Stars value={2.5} />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

import React from 'react';
import renderer from 'react-test-renderer';
import Logo from 'Logo'; // eslint-disable-line import/no-unresolved, import/extensions, import/no-extraneous-dependencies

test('Renders Logo without crashing', () => {
  const component = renderer.create(
    <Logo
      duration={3000}
      href="/playground/"
      shade="light"
      title="kununu" />
  );
  expect(component.toJSON()).toMatchSnapshot();
});

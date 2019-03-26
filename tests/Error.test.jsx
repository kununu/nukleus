import React from 'react';
import renderer from 'react-test-renderer';
import Error from 'Error'; // eslint-disable-line import/no-unresolved

test('Renders an Error component without crashing', () => {
  const component = renderer.create(<Error info="Error" />);

  expect(component.toJSON()).toMatchSnapshot();
});

test('Renders an Error with a subInfo Text component without crashing', () => {
  const component = renderer.create(<Error
    info="Error"
    subInfo="Helpful hint"
  />);

  expect(component.toJSON()).toMatchSnapshot();
});

test('it can have an optional ID attribute', () => {
  const component = renderer.create(<Error
    info="Error"
    subInfo="Helpful hint"
    id="error-message"
  />);

  expect(component.toJSON()).toMatchSnapshot();
});

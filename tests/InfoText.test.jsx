import React from 'react';
import renderer from 'react-test-renderer';
import InfoText from 'InfoText'; // eslint-disable-line import/no-unresolved, import/extensions, import/no-extraneous-dependencies

test('Renders InfoText without crashing', () => {
  const component = renderer.create(<InfoText
    text="test" />);

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

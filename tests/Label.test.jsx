import React from 'react';
import renderer from 'react-test-renderer';
import Label from 'Label'; // eslint-disable-line import/no-unresolved

test('Renders a label without crashing', () => {
  const component = renderer.create(<Label
    id="2"
    value="Test label"
    classNames="test-class"
  />);

  expect(component.toJSON()).toMatchSnapshot();
});

test('Renders a title instead of a label', () => {
  const component = renderer.create(<Label
    value="Test label"
    classNames="test-class"
    isTitle
  />);

  expect(component.toJSON()).toMatchSnapshot();
});

test('Renders a hidden label', () => {
  const component = renderer.create(<Label
    id="2"
    value="Test label"
    labelHidden
    classNames="test-class"
    isTitle
  />);

  expect(component.toJSON()).toMatchSnapshot();
});

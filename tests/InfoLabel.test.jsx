import React from 'react';
import renderer from 'react-test-renderer';

import InfoLabel from '../components/InfoLabel';

test('Renders an InfoLabel without crashing', () => {
  const component = renderer.create(
    <InfoLabel requiredLabel="required" />
  );
  expect(component.toJSON()).toMatchSnapshot();
});

test('Renders an InfoLabel with a characterCounter', () => {
  const component = renderer.create(
    <InfoLabel displayLength />
  );

  expect(component.toJSON()).toMatchSnapshot();
});

test('Renders an InfoLabel with a characterCounter and displays correct count and maxLength', () => {
  const component = renderer.create(
    <InfoLabel displayLength inputValue="test" maxLength={150} />
  );

  expect(component.toJSON()).toMatchSnapshot();
});

test('Renders an InfoLabel with a characterCounter and displays the requiredLabel, when value isn\'t set', () => {
  const component = renderer.create(
    <InfoLabel displayLength requiredLabel="required" />
  );

  expect(component.toJSON()).toMatchSnapshot();
});

import React from 'react';
import renderer from 'react-test-renderer';
import {mount} from 'enzyme';
import toJson from 'enzyme-to-json';
import Stars from 'Stars'; // eslint-disable-line import/no-unresolved, import/extensions, import/no-extraneous-dependencies

test('Renders static Stars without crashing', () => {
  const component = renderer.create(
    <Stars value={2.5} />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders selectable Stars without crashing', () => {
  const component = renderer.create(
    <Stars
      value={3}
      selectable />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Fills selected stars', () => {
  const stars = (
    <Stars
      value={3}
      colors={['red', 'purple', 'green', 'orange', 'black']}
      selectable />
  );

  const component = mount(stars);
  component.find('label[htmlFor="star3"]').simulate('click');
  expect(toJson(component)).toMatchSnapshot();
});

test('Renders empty stars with no value', () => {
  const tree = renderer.create(<Stars />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders correctly rounded star values', () => {
  const tree = renderer.create(<Stars value={2.75} />).toJSON();
  expect(tree).toMatchSnapshot();
});

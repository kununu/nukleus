import React from 'react';
import renderer from 'react-test-renderer';
import {mount} from 'enzyme';
import toJson from 'enzyme-to-json';
import TextField from 'TextField'; // eslint-disable-line import/no-unresolved, import/extensions, import/no-extraneous-dependencies

const textField = (
  <TextField
    id="text-field"
    label="TextField"
    name="text-field"
    value="test"
    required
    requiredLabel />
);

// input
test('Renders TextField without crashing', () => {
  const component = renderer.create(textField);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Changes output on value change manipulation', () => {
  const component = mount(textField);
  component.find('input').simulate('change', {target: {value: 'UGH'}});
  expect(toJson(component)).toMatchSnapshot();
});

// textarea
test('Renders TextField with multiline without crashing', () => {
  const component = renderer.create(
    <TextField
      id="text-field"
      label="TextField"
      name="text-field"
      value="test2"
      multiLine
      required
      requiredLabel />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

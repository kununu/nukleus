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
    isRequired
    requiredLabel="required" />
);

const textFieldWithError = (
  <TextField
    id="text-field"
    label="TextField"
    name="text-field"
    error="An Error"
    errorSubInfo="with useful hints"
    value="test"
    isRequired
    requiredLabel="required" />
);

// input
test('Renders TextField without crashing', () => {
  const component = renderer.create(textField);
  expect(component.toJSON()).toMatchSnapshot();
});

test('Changes output on value change manipulation', () => {
  const component = mount(textField);
  component.find('input').simulate('change', {target: {value: 'UGH'}});
  expect(toJson(component)).toMatchSnapshot();
});

test('Renders TextField with an error message without crashing', () => {
  const component = renderer.create(textFieldWithError);
  expect(component.toJSON()).toMatchSnapshot();
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
      isRequired
      requiredLabel="required" />
  );
  expect(component.toJSON()).toMatchSnapshot();
});

// textarea
test('Renders A TextField with visible character counter without crashing', () => {
  const component = renderer.create(
    <TextField
      id="text-field"
      label="TextField"
      name="text-field"
      value="test2"
      displayLength
      isRequired
      requiredLabel="required" />
  );
  expect(component.toJSON()).toMatchSnapshot();
});

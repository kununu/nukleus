import React from 'react';
import renderer from 'react-test-renderer';
import {mount} from 'enzyme';
import toJson from 'enzyme-to-json';

import TextField from '../components/TextField'; // eslint-disable-line import/no-unresolved, import/extensions, import/no-extraneous-dependencies
import {sanitizeWhitespace} from '../components/utils';

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

test('Renders a medium size Textfield with multiline without crashing', () => {
  const component = renderer.create(
    <TextField
      id="text-field"
      label="TextField"
      name="text-field"
      multiLine
      inputStyle="mediumSize" />
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

test('Renders a TextArea where whitespace can be normalized', () => {
  const component = mount(
    <TextField
      id="text-field"
      label="TextField"
      name="text-field"
      multiLine
      displayLength
      sanitizeValue={sanitizeWhitespace}
      isRequired
      requiredLabel="required" />
  );
  component.find('textarea').simulate('change', {target: {value: 'ab  cd'}});
  expect(component.state().value).toEqual('ab cd');
  component.find('textarea').simulate('change', {target: {value: 'ab\ncd'}});
  expect(component.state().value).toEqual('ab cd');
  component.find('textarea').simulate('change', {target: {value: 'ab\r\ncd'}});
  expect(component.state().value).toEqual('ab cd');
  component.find('textarea').simulate('change', {target: {value: 'ab\rcd'}});
  expect(component.state().value).toEqual('ab cd');
});

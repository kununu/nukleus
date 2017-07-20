import React from 'react';
import renderer from 'react-test-renderer';
import {mount} from 'enzyme';
import toJson from 'enzyme-to-json';

import TextField from '../components/TextField';
import ToolTip from '../components/ToolTip';

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

test('Renders a TextField with a ToolTip without crashing', () => {
  const component = renderer.create(
    <TextField
      id="text-field"
      label={(
        <span>
          <label htmlFor="text-field">TextField</label>
          <ToolTip content="content" label="Test" />
        </span>
      )}
      name="text-field" />
  );
  expect(component.toJSON()).toMatchSnapshot();
});

test('Focusing a TextField calls the onFocus Event', () => {
  const spyFunc = jest.fn();
  const component = mount(
    <TextField
      id="text-field"
      onFocus={spyFunc}
      label={(
        <span>
          <label htmlFor="text-field">TextField</label>
          <ToolTip content="content" label="Test" />
        </span>
      )}
      name="text-field" />
  );

  component.find('#text-field').simulate('focus');
  expect(spyFunc.mock.calls.length).toBe(1);
});

test('Bluring a TextField calls the onBlur Event', () => {
  const spyFunc = jest.fn();
  const component = mount(
    <TextField
      id="text-field"
      onBlur={spyFunc}
      label={(
        <span>
          <label htmlFor="text-field">TextField</label>
          <ToolTip content="content" label="Test" />
        </span>
      )}
      name="text-field" />
  );

  component.find('#text-field').simulate('focus');
  component.find('#text-field').simulate('blur');
  expect(spyFunc.mock.calls.length).toBe(1);
});

test('Changing a TextField calls the onChange Event', () => {
  const spyFunc = jest.fn();
  const component = mount(
    <TextField
      id="text-field"
      onChange={spyFunc}
      label={(
        <span>
          <label htmlFor="text-field">TextField</label>
          <ToolTip content="content" label="Test" />
        </span>
      )}
      name="text-field" />
  );

  component.find('#text-field').simulate('change', {target: {value: 'change'}});
  component.find('#text-field').simulate('change', {target: {value: 'change again'}});
  expect(spyFunc.mock.calls.length).toBe(2);
});

test('Focusing a TextField Textarea calls the onFocus Event', () => {
  const spyFunc = jest.fn();
  const component = mount(
    <TextField
      multiLine
      id="text-field"
      onFocus={spyFunc}
      label={(
        <span>
          <label htmlFor="text-field">TextField</label>
          <ToolTip content="content" label="Test" />
        </span>
      )}
      name="text-field" />
  );

  component.find('#text-field').simulate('focus');
  expect(spyFunc.mock.calls.length).toBe(1);
});

test('Bluring a TextField Textarea calls the onBlur Event', () => {
  const spyFunc = jest.fn();
  const component = mount(
    <TextField
      multiLine
      id="text-field"
      onBlur={spyFunc}
      label={(
        <span>
          <label htmlFor="text-field">TextField</label>
          <ToolTip content="content" label="Test" />
        </span>
      )}
      name="text-field" />
  );

  component.find('#text-field').simulate('focus');
  component.find('#text-field').simulate('blur');
  expect(spyFunc.mock.calls.length).toBe(1);
});

test('Changing a TextField Textarea calls the onChange Event', () => {
  const spyFunc = jest.fn();
  const component = mount(
    <TextField
      multiLine
      id="text-field"
      onChange={spyFunc}
      label={(
        <span>
          <label htmlFor="text-field">TextField</label>
          <ToolTip content="content" label="Test" />
        </span>
      )}
      name="text-field" />
  );

  component.find('#text-field').simulate('change', {target: {value: 'change'}});
  component.find('#text-field').simulate('change', {target: {value: 'change again'}});
  expect(spyFunc.mock.calls.length).toBe(2);
});

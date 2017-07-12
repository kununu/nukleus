import React from 'react';
import renderer from 'react-test-renderer';
import {mount} from 'enzyme';
import toJson from 'enzyme-to-json';
import Select from 'Select'; // eslint-disable-line import/no-unresolved, import/extensions, import/no-extraneous-dependencies

const select = (
  <Select
    title="Select"
    name="select"
    id="select"
    isRequired
    value="option"
    items={{option: 'Option', 'option-2': 'Option 2', 'option-3': 'Option 3'}} />
);

const selectWithError = (
  <Select
    title="Select"
    name="select"
    error="An Error"
    errorSubInfo="with useful hints"
    id="select"
    isRequired
    value="option"
    items={{option: 'Option', 'option-2': 'Option 2', 'option-3': 'Option 3'}} />
);

test('Renders Select without crashing', () => {
  const component = renderer.create(select);
  expect(component.toJSON()).toMatchSnapshot();
});

test('Changes status on value change', () => {
  const component = mount(select);
  component.find({value: 'option-2'}).simulate('change');
  expect(toJson(component)).toMatchSnapshot();
});

test('Renders Select with an error message without crashing', () => {
  const component = renderer.create(selectWithError);
  expect(component.toJSON()).toMatchSnapshot();
});

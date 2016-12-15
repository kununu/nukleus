import React from 'react';
import renderer from 'react-test-renderer';
import {mount} from 'enzyme';
import toJson from 'enzyme-to-json';
import CheckboxGroup from 'CheckboxGroup'; // eslint-disable-line import/no-unresolved, import/extensions, import/no-extraneous-dependencies

const checkbox = (
  <CheckboxGroup
    name="checkbox-group[]"
    heading="Test"
    checkboxes={
    [
      {
        id: 'option-1',
        isChecked: false,
        label: 'test',
        value: 'test'
      }
    ]
  } />
);

const checkboxes = (
  <CheckboxGroup
    name="checkbox-group[]"
    heading="CheckboxGroup"
    checkboxes={
    [{
      id: 'option-1',
      isChecked: false,
      label: 'option 1',
      value: 'option-1'
    },
    {
      id: 'option-2',
      isChecked: false,
      label: 'option 2',
      value: 'option-2'
    },
    {
      id: 'option-3',
      isChecked: false,
      label: 'option 3',
      value: 'option-2'
    },
    {
      id: 'option-4',
      isChecked: false,
      label: 'option 4',
      value: 'option-4'
    }]} />
);

test('Renders checkbox without crashing', () => {
  const component = renderer.create(checkbox);
  expect(component.toJSON()).toMatchSnapshot();
});

test('Changes status on checkbox change', () => {
  const component = mount(checkbox);
  component.find('input').simulate('change');
  expect(toJson(component)).toMatchSnapshot();
});

test('Renders checkboxes without crashing', () => {
  const component = renderer.create(checkboxes);
  expect(component.toJSON()).toMatchSnapshot();
});

test('Change status of checkboxes change', () => {
  const component = mount(checkboxes);
  component.find({value: 'option-1'}).simulate('change');
  component.find({value: 'option-4'}).simulate('change');
  expect(toJson(component)).toMatchSnapshot();
});

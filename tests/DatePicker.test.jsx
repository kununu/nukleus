import React from 'react';
import renderer from 'react-test-renderer';
import {mount} from 'enzyme';
import DatePicker from 'DatePicker'; // eslint-disable-line import/no-unresolved, import/extensions, import/no-extraneous-dependencies

jest.mock('react-datepicker', () => 'Datepicker');

test('Renders datepicker without crashing', () => {
  const component = renderer.create(<DatePicker
    id="date-picker"
    isRequired
    name="date-picker"
    title="DatePicker" />);

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders datepicker with an error message without crashing', () => {
  const component = renderer.create(<DatePicker
    id="date-picker"
    error="An Error"
    errorSubInfo="with useful hints"
    isRequired
    name="date-picker"
    title="DatePicker" />);

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Focusing a datepicker calls the onFocus Event', () => {
  const spyFunc = jest.fn();
  const component = mount(<DatePicker
    id="date-picker"
    isRequired
    onFocus={spyFunc}
    name="date-picker"
    title="DatePicker" />);

  component.find('#date-picker').hostNodes().simulate('focus');
  expect(spyFunc.mock.calls.length).toBe(1);
});

test('Bluring a datepicker calls the onBlur Event', () => {
  const spyFunc = jest.fn();
  const component = mount(<DatePicker
    id="date-picker"
    isRequired
    onBlur={spyFunc}
    name="date-picker"
    title="DatePicker" />);

  component.find('#date-picker').hostNodes().simulate('focus');
  component.find('#date-picker').hostNodes().simulate('blur');
  expect(spyFunc.mock.calls.length).toBe(1);
});

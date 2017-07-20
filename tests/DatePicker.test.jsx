import React from 'react';
import renderer from 'react-test-renderer';
import {mount} from 'enzyme';
import toJson from 'enzyme-to-json';
import DatePicker from 'DatePicker'; // eslint-disable-line import/no-unresolved, import/extensions, import/no-extraneous-dependencies

jest.mock('react-datepicker', () => 'Datepicker');
jest.mock('moment', () => 'Moment');

test('Renders datepicker without crashing', () => {
  const component = renderer.create(
    <DatePicker
      id="date-picker"
      isRequired
      name="date-picker"
      title="DatePicker" />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders datepicker with an error message without crashing', () => {
  const component = renderer.create(
    <DatePicker
      id="date-picker"
      error="An Error"
      errorSubInfo="with useful hints"
      isRequired
      name="date-picker"
      title="DatePicker" />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Focusing a datepicker calls the onFocus Event', () => {
  const mocked = jest.fn();
  const component = mount(
    <DatePicker
      id="date-picker"
      isRequired
      onFocus={mocked}
      name="date-picker"
      title="DatePicker" />
  );

  component.find('#date-picker').simulate('focus');
  expect(mocked.mock.calls.length).toBe(1);
});

test('Bluring a datepicker calls the onBlur Event', () => {
  const mocked = jest.fn();
  const component = mount(
    <DatePicker
      id="date-picker"
      isRequired
      onBlur={mocked}
      name="date-picker"
      title="DatePicker" />
  );

  component.find('#date-picker').simulate('focus');
  component.find('#date-picker').simulate('blur');
  expect(mocked.mock.calls.length).toBe(1);
});

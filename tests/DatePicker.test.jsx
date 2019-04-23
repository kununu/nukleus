/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import renderer from 'react-test-renderer';
import {mount} from 'enzyme';
import toJson from 'enzyme-to-json';
import DatePicker from 'DatePicker'; // eslint-disable-line import/no-unresolved

import * as themeable from '../utils/theming';

jest.mock('react-datepicker', () => 'DatePicker');

themeable.default = () => (...args) => Array.isArray(args) ? args.join(' ') : args;

function waitingForDebounce (cb) {
  setTimeout(cb, 550);
}

test('Renders datepicker without crashing', () => {
  const component = renderer.create(<DatePicker
    id="date-picker"
    isRequired
    name="date-picker"
    title="DatePicker"
  />);

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
    title="DatePicker"
  />);

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
    title="DatePicker"
  />);

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
    title="DatePicker"
  />);

  component.find('#date-picker').hostNodes().simulate('focus');
  component.find('#date-picker').hostNodes().simulate('blur');
  expect(spyFunc.mock.calls.length).toBe(1);
});

test('Fires onChange function when changed', () => {
  const spyFunc = jest.fn();
  const component = mount(<DatePicker
    id="date-picker"
    isRequired
    onChange={spyFunc}
    name="date-picker"
    title="DatePicker"
  />);

  component.find('#date-picker').hostNodes().simulate('change');
  expect(spyFunc.mock.calls.length).toBe(1);
});

test('Renders a datepicker without title and label', () => {
  const component = renderer.create(<DatePicker
    id="date-picker"
    isRequired
    name="date-picker"
  />);

  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});

test('Renders a datepicker with labelHidden', () => {
  const component = renderer.create(<DatePicker
    id="date-picker"
    isRequired
    name="date-picker"
    title="DatePicker"
    labelHidden
  />);

  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});

test('Renders a datepicker with a JSX label', () => {
  const component = renderer.create(<DatePicker
    id="date-picker"
    isRequired
    name="date-picker"
    label={(
      <label htmlFor="date-picker">
        Date
      </label>
    )}
  />);

  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});

test('Renders a datepicker and send an error later', (done) => {
  const component = mount(<DatePicker
    id="date-picker"
    isRequired
    name="date-picker"
    title="DatePicker"
  />);

  component.setProps({error: 'Date is empty'});

  waitingForDebounce(() => {
    expect(toJson(component)).toMatchSnapshot();
    done();
  });
});

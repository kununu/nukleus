import React from 'react';
import renderer from 'react-test-renderer';
import {mount, shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import Notification from 'Notification'; // eslint-disable-line import/no-unresolved, import/extensions, import/no-extraneous-dependencies

const notification = (
  <Notification
    message="Test"
    visible />
);
const timeoutNotification = (
  <Notification
    message="Test"
    closeMethod="onTimeout"
    duration={8000}
    visible />
);
const successNotification = (
  <Notification
    icon={<i className="fa fa-check" />}
    message="Test"
    visible />
);

test('Renders Notification without crashing', () => {
  const component = renderer.create(notification);
  expect(component.toJSON()).toMatchSnapshot();
});

test('Closes when the close button is clicked', () => {
  const component = mount(notification);
  component.find('.closeButton').simulate('click');
  expect(toJson(component)).toMatchSnapshot();
});

test('Does not close render cloce button when the close method is timeout', () => {
  const component = renderer.create(timeoutNotification);
  expect(component.toJSON()).toMatchSnapshot();
});

test('It closes on timeout when the close method is timeout', () => {
  const component = shallow(timeoutNotification);
  expect(component.state('visible')).toEqual(true);
  component.instance().onTimeout();
  expect(component.state('visible')).toEqual(false);
});

test('It shows content icon when defined in props', () => {
  const component = renderer.create(successNotification);
  expect(component.toJSON()).toMatchSnapshot();
});

test('Calls onCloseClick when the close button is clicked', () => {
  const spyFunc = jest.fn();
  const component = mount(
    <Notification
      message="Test"
      visible
      onCloseClick={spyFunc} />
  );

  component.find('.closeButton').simulate('click');
  expect(spyFunc).toHaveBeenCalled();
});

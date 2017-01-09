import React from 'react';
import renderer from 'react-test-renderer';
import {mount} from 'enzyme';
import Button from 'Button'; // eslint-disable-line import/no-unresolved, import/extensions, import/no-extraneous-dependencies

test('Renders Button without crashing', () => {
  const component = renderer.create(
    <Button text="Test"/>
  );

  const tree = component.toJSON();
  expect(component).toMatchSnapshot();
});

test('Fires onClick function when clicked', () => {
  const spyFunc = jest.fn();
  const component = mount(
    <Button text="Test" onClick={spyFunc}/>
  );

  component.find('.button').simulate('click');
  expect(spyFunc).toHaveBeenCalled();
});

test('Does not fire onClick function when clicked if the button is disabled', () => {
  const spyFunc = jest.fn();
  const component = mount(
    <Button text="Test" onClick={spyFunc} disabled={true}/>
  );

  component.find('.button').simulate('click');
  expect(spyFunc).not.toHaveBeenCalled();
});
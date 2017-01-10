import React from 'react';
import renderer from 'react-test-renderer';
import {mount} from 'enzyme';
import Button from 'Button'; // eslint-disable-line import/no-unresolved, import/extensions, import/no-extraneous-dependencies

test('Renders Button with button without crashing', () => {
  const component = renderer.create(
    <Button text="Test" onClick={() => {}} />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders Button with anchor crashing', () => {
  const component = renderer.create(
    <Button text="Test" link="/" />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders a disabled Button', () => {
  const component = renderer.create(
    <Button text="Test" onClick={() => {}} disabled />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders Button with outline', () => {
  const component = renderer.create(
    <Button text="Test" onClick={() => {}} outline />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders a full width button', () => {
  const component = renderer.create(
    <Button text="Test" onClick={() => {}} fullWidth />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});


test('Renders a full width button', () => {
  const component = renderer.create(
    <Button text="Test" onClick={() => {}} mobileFullWidth />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Fires onClick function when clicked', () => {
  const spyFunc = jest.fn();
  const component = mount(
    <Button text="Test" onClick={spyFunc} />
  );

  component.find('.button').simulate('click');
  expect(spyFunc).toHaveBeenCalled();
});

test('Does not fire onClick function when clicked if the button is disabled', () => {
  const spyFunc = jest.fn();
  const component = mount(
    <Button text="Test" onClick={spyFunc} disabled />
  );

  component.find('.button').simulate('click');
  expect(spyFunc).not.toHaveBeenCalled();
});

test('Over state is changed when button is custom', () => {
  const component = mount(
    <Button text="Test" type="custom" buttonStyle={{backgroundColor: '#000', color: '#fff'}} />
  );

  expect(component.state('isHovering')).toEqual(false);
  component.find('button').simulate('mouseOver');
  expect(component.state('isHovering')).toEqual(true);
  component.find('button').simulate('mouseOut');
  expect(component.state('isHovering')).toEqual(false);
});


test('Active state is changed when button is custom', () => {
  const component = mount(
    <Button text="Test" type="custom" buttonStyle={{backgroundColor: '#000', color: '#fff'}} />
  );

  expect(component.state('isActive')).toEqual(false);
  component.find('button').simulate('mouseDown');
  expect(component.state('isActive')).toEqual(true);
  component.find('button').simulate('mouseUp');
  expect(component.state('isActive')).toEqual(false);
});

test('Over state does not changed when button is not custom', () => {
  const component = mount(
    <Button text="Test" type="primary" />
  );

  expect(component.state('isHovering')).toEqual(false);
  component.find('button').simulate('mouseOver');
  expect(component.state('isHovering')).toEqual(false);
  component.find('button').simulate('mouseOut');
  expect(component.state('isHovering')).toEqual(false);
});


test('Active state does not changed when button is not custom', () => {
  const component = mount(
    <Button text="Test" type="primary" />
  );

  expect(component.state('isActive')).toEqual(false);
  component.find('button').simulate('mouseDown');
  expect(component.state('isActive')).toEqual(false);
  component.find('button').simulate('mouseUp');
  expect(component.state('isActive')).toEqual(false);
});

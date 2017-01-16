import React from 'react';
import renderer from 'react-test-renderer';
import {mount} from 'enzyme';
import Choice from 'Choice'; // eslint-disable-line import/no-unresolved, import/extensions, import/no-extraneous-dependencies

test('Renders Choice with radio buttons without crashing', () => {
  const component = renderer.create(
    <Choice
      name="test"
      options={{
        opA: 'Option A',
        opB: 'Option B',
        opC: 'Option C'
      }}
      onChange={() => {}} />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders a disabled Choice without crashing', () => {
  const component = renderer.create(
    <Choice
      name="test"
      options={{
        opA: 'Option A',
        opB: 'Option B',
        opC: 'Option C'
      }}
      disabled
      onChange={() => {}} />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders a Choice with default checked without crashing', () => {
  const component = renderer.create(
    <Choice
      name="test"
      options={{
        opA: 'Option A',
        opB: 'Option B',
        opC: 'Option C'
      }}
      checked={'opA'}
      onChange={() => {}} />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders a Choice with custom style without crasing', () => {
  const component = renderer.create(
    <Choice
      name="test"
      options={{
        opA: 'Option A',
        opB: 'Option B',
        opC: 'Option C'
      }}
      choiceStyle={{
        checkedColor: '#2286dc',
        hoverColor: '#778992  ',
        uncheckedColor: '#fffaec'
      }}
      onChange={() => {}} />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Change checked when changed', () => {
  const component = mount(
    <Choice
      name="test"
      options={{
        opA: 'Option A',
        opB: 'Option B',
        opC: 'Option C'
      }}
      onChange={() => {}} />
  );

  expect(component.state('checked')).toEqual('');
  component.find('#testopA').simulate('change');
  expect(component.state('checked')).toEqual('opA');
});

test('Fires onChange function when changed', () => {
  const spyFunc = jest.fn();
  const component = mount(
    <Choice
      name="test"
      options={{
        opA: 'Option A',
        opB: 'Option B',
        opC: 'Option C'
      }}
      onChange={spyFunc} />
  );

  component.find('#testopA').simulate('change');
  expect(spyFunc).toHaveBeenCalled();
});

test('Does not fire onChange function when clicked if Choice is disabled', () => {
  const spyFunc = jest.fn();
  const component = mount(
    <Choice
      name="test"
      options={{
        opA: 'Option A',
        opB: 'Option B',
        opC: 'Option C'
      }}
      disabled
      onChange={spyFunc} />
  );

  component.find('#testopA').simulate('change');
  expect(spyFunc).not.toHaveBeenCalled();
});

test('Over state is changed when button is custom', () => {
  const component = mount(
    <Choice
      name="test"
      options={{
        opA: 'Option A',
        opB: 'Option B',
        opC: 'Option C'
      }}
      choiceStyle={{
        checkedColor: '#2286dc',
        hoverColor: '#778992  ',
        uncheckedColor: '#fffaec'
      }}
      onChange={() => {}} />
  );

  expect(component.state('isHovering')).toEqual([false, false, false]);
  component.find('[htmlFor="testopA"]').simulate('mouseOver');
  expect(component.state('isHovering')).toEqual([true, false, false]);
  component.find('[htmlFor="testopA"]').simulate('mouseOut');
  component.find('[htmlFor="testopB"]').simulate('mouseOver');
  expect(component.state('isHovering')).toEqual([false, true, false]);
  component.find('[htmlFor="testopB"]').simulate('mouseOut');
  component.find('[htmlFor="testopC"]').simulate('mouseOver');
  expect(component.state('isHovering')).toEqual([false, false, true]);
  component.find('[htmlFor="testopC"]').simulate('mouseOut');
  expect(component.state('isHovering')).toEqual([false, false, false]);
});

test('Over state does not change when button is not custom', () => {
  const component = mount(
    <Choice
      name="test"
      options={{
        opA: 'Option A',
        opB: 'Option B',
        opC: 'Option C'
      }}
      onChange={() => {}} />
  );

  expect(component.state('isHovering')).toEqual([false, false, false]);
  component.find('[htmlFor="testopA"]').simulate('mouseOver');
  expect(component.state('isHovering')).toEqual([false, false, false]);
  component.find('[htmlFor="testopA"]').simulate('mouseOut');
  expect(component.state('isHovering')).toEqual([false, false, false]);
});


test('Over state does not change when button is custom but is disabled', () => {
  const component = mount(
    <Choice
      name="test"
      options={{
        opA: 'Option A',
        opB: 'Option B',
        opC: 'Option C'
      }}
      choiceStyle={{
        checkedColor: '#2286dc',
        hoverColor: '#778992  ',
        uncheckedColor: '#fffaec'
      }}
      disabled
      onChange={() => {}} />
  );

  expect(component.state('isHovering')).toEqual([false, false, false]);
  component.find('[htmlFor="testopA"]').simulate('mouseOver');
  expect(component.state('isHovering')).toEqual([false, false, false]);
  component.find('[htmlFor="testopA"]').simulate('mouseOut');
  expect(component.state('isHovering')).toEqual([false, false, false]);
});

import React from 'react';
import renderer from 'react-test-renderer';
import {mount} from 'enzyme';
import Choice from 'Choice'; // eslint-disable-line import/no-unresolved, import/extensions, import/no-extraneous-dependencies

const options = [
  {
    id: 'opA',
    label: 'Option A',
    value: 'opA'
  },
  {
    id: 'opB',
    label: 'Option B',
    value: 'opB'
  },
  {
    id: 'opC',
    label: 'Option C',
    value: 'opC'
  }
];

test('Renders Choice with radio buttons without crashing', () => {
  const component = renderer.create(
    <Choice
      name="test"
      options={options}
      onChange={() => {}} />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders Choice with an heading without crashing', () => {
  const component = renderer.create(
    <Choice
      heading="heading"
      name="test"
      options={options}
      onChange={() => {}} />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Renders a disabled Choice without crashing', () => {
  const component = renderer.create(
    <Choice
      name="test"
      options={options}
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
      options={options}
      checked="opB"
      onChange={() => {}} />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders a Choice with no default checked if it\'s not an option', () => {
  const component = renderer.create(
    <Choice
      name="test"
      options={options}
      checked="opD"
      onChange={() => {}} />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders a Choice with checked from route', () => {
  const component = renderer.create(
    <Choice
      name="test"
      options={options}
      onChange={() => {}}
      query={{test: 'opC'}} />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders a Choice with no default checked from route if it is not an option', () => {
  const component = renderer.create(
    <Choice
      name="test"
      options={options}
      onChange={() => {}}
      query={{test: 'opD'}} />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders a Choice with no default checked from route if it is the other name', () => {
  const component = renderer.create(
    <Choice
      name="test"
      options={options}
      onChange={() => {}}
      query={{otherTest: 'opC'}} />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders a Choice with custom style', () => {
  const component = renderer.create(
    <Choice
      name="test"
      options={options}
      customTheme="customThemeClass"
      onChange={() => {}} />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders a Choice with custom style disabled', () => {
  const component = renderer.create(
    <Choice
      name="test"
      options={options}
      customTheme="customThemeClass"
      disabled
      onChange={() => {}} />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Change checked when changed', () => {
  const component = mount(
    <Choice
      name="test"
      options={options}
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
      options={options}
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
      options={options}
      disabled
      onChange={spyFunc} />
  );

  component.find('#testopA').simulate('change');
  expect(spyFunc).not.toHaveBeenCalled();
});

test('Change checked prop change checked state', () => {
  const component = mount(
    <Choice
      name="test"
      checked="opA"
      options={options}
      onChange={() => {}} />
  );

  expect(component.state('checked')).toEqual('opA');
  component.setProps({checked: 'opB'});
  expect(component.state('checked')).toEqual('opB');
});

test('No change checked prop does not change checked state', () => {
  const component = mount(
    <Choice
      name="test"
      checked="opA"
      options={options}
      onChange={() => {}} />
  );

  component.setState({checked: 'opB'});
  component.setProps({checked: 'opA'});
  expect(component.state('checked')).toEqual('opB');
});


test('Change checked query changes state', () => {
  const component = mount(
    <Choice
      name="test"
      checked="opA"
      options={options}
      onChange={() => {}} />
  );

  expect(component.state('checked')).toEqual('opA');
  component.setProps({query: {test: 'opB'}});
  expect(component.state('checked')).toEqual('opB');
});

test('No change checked query does not change state', () => {
  const component = mount(
    <Choice
      name="test"
      query={{test: 'opA'}}
      options={options}
      onChange={() => {}} />
  );

  component.setState({checked: 'opB'});
  expect(component.state('checked')).toEqual('opB');
  component.setProps({query: {test: 'opA'}});
  expect(component.state('checked')).toEqual('opB');
});

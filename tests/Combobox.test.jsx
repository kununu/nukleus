import React from 'react';
import renderer from 'react-test-renderer';
import {mount} from 'enzyme';
import toJson from 'enzyme-to-json';
import Combobox from 'Combobox'; // eslint-disable-line import/no-unresolved, import/extensions, import/no-extraneous-dependencies

const combobox = (
  <Combobox
    name="name"
    label="Combobox"
    id="name"
    isRequired
    placeholder="Type m"
    keyName="name"
    items={['music', 'maths', 'manga', 'morning', 'musical', 'mania', 'message', 'metal', 'micro', 'macro', 'microphone']} />
);

function waitingForDebounce (cb) {
  setTimeout(cb, 550);
}

const comboboxWithError = (
  <Combobox
    name="name"
    label="Combobox"
    error="An Error"
    errorSubInfo="with useful hints"
    id="name"
    isRequired
    placeholder="Type m"
    keyName="name"
    items={['music', 'maths', 'manga', 'morning', 'musical', 'mania', 'message', 'metal', 'micro', 'macro', 'microphone']} />
);

test('Renders Combobox without crashing', () => {
  const component = renderer.create(combobox);
  expect(component.toJSON()).toMatchSnapshot();
});

test('Renders Combobox with an error message without crashing', () => {
  const component = renderer.create(comboboxWithError);
  expect(component.toJSON()).toMatchSnapshot();
});

test('Causes dropdown to show when input is focused', done => {
  const component = mount(combobox);
  component.find('input#name').simulate('focus');

  // Waiting for debounce
  waitingForDebounce(() => {
    expect(toJson(component)).toMatchSnapshot();
    done();
  });
});

test('Fetches Value only when debounce is over', done => {
  const component = mount(combobox);
  component.find('input#name').simulate('change', {target: {value: 'music'}});
  expect(component.state().suggestions.length).toEqual(11);

  // Waiting for debounce
  waitingForDebounce(() => {
    expect(component.state().suggestions.length).toEqual(2);
    done();
  });
});

const spyFunc = jest.fn();
const notSearchableCombobox = (
  <Combobox
    name="name"
    label="Combobox"
    id="name"
    isRequired
    placeholder="Type m"
    keyName="name"
    isSearchable={false}
    onSelect={spyFunc}
    items={['music', 'maths', 'manga', 'morning', 'musical', 'mania', 'message', 'metal', 'micro', 'macro', 'microphone']} />
);

test('Renders notSearchableCombobox without crashing', () => {
  const component = renderer.create(notSearchableCombobox);
  expect(component.toJSON()).toMatchSnapshot();
});

test('Causes dropdown to show when input is focused', () => {
  const component = mount(notSearchableCombobox);
  component.find('input#name').simulate('focus');
  component.find('#react-autowhatever-1--item-0').simulate('click');
  expect(spyFunc).toHaveBeenCalled();
});

test('Focusing a ComboBox calls the onFocus Event', () => {
  const spyFunc = jest.fn();
  const component = mount(
    <Combobox
      name="name"
      label="Combobox"
      id="name"
      isRequired
      onFocus={spyFunc}
      placeholder="Type m"
      keyName="name"
      isSearchable={false}
      onSelect={spyFunc}
      items={['music', 'maths', 'manga', 'morning', 'musical', 'mania', 'message', 'metal', 'micro', 'macro', 'microphone']} />
  );

  component.find('#name').simulate('focus');
  expect(spyFunc.mock.calls.length).toBe(1);
});

test('Bluring a ComboBox calls the onBlur Event', () => {
  const spyFunc = jest.fn();
  const component = mount(
    <Combobox
      name="name"
      label="Combobox"
      id="name"
      isRequired
      onBlur={spyFunc}
      placeholder="Type m"
      keyName="name"
      isSearchable={false}
      onSelect={spyFunc}
      items={['music', 'maths', 'manga', 'morning', 'musical', 'mania', 'message', 'metal', 'micro', 'macro', 'microphone']} />
  );

  component.find('#name').simulate('focus');
  component.find('#name').simulate('blur');
  expect(spyFunc.mock.calls.length).toBe(1);
});

test('Changing a ComboBox calls the onChange Event', () => {
  const spyFunc = jest.fn();
  const component = mount(
    <Combobox
      name="name"
      label="Combobox"
      onChange={spyFunc}
      id="name"
      isRequired
      placeholder="Type m"
      keyName="name"
      isSearchable={false}
      onSelect={spyFunc}
      items={['music', 'maths', 'manga', 'morning', 'musical', 'mania', 'message', 'metal', 'micro', 'macro', 'microphone']} />
  );

  component.find('#name').simulate('change', {target: {value: 'change'}});
  component.find('#name').simulate('change', {target: {value: 'change again'}});
  expect(spyFunc.mock.calls.length).toBe(2);
});

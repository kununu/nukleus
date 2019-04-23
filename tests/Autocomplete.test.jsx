import React from 'react';
import renderer from 'react-test-renderer';
import {mount} from 'enzyme';
import toJson from 'enzyme-to-json';
import Autocomplete from 'Autocomplete'; // eslint-disable-line import/no-unresolved
import * as themeable from '../utils/theming';

themeable.default = () => (...args) => Array.isArray(args) ? args.join(' ') : args;

function waitingForDebounce (cb) {
  setTimeout(cb, 550);
}

const staticAutocomplete = (
  <Autocomplete
    data={{
      items: [
        {item: 'apple', itemInfo: 'US'},
        {item: 'alpha', itemInfo: 'Vienna'},
        {item: 'IBM', itemInfo: 'US'},
        {item: 'kununu', itemInfo: 'Vienna'},
        {item: 'kununu', itemInfo: 'US'},
        {item: 'kununu'},
      ],
    }}
    value="test"
    disabled
    isRequired
    requiredLabel="Required"
    id="autocompletes"
    label="Autocomplete"
    name="autocomplete"
    placeholder="Type something..."
    scrollOffset={70}
    scrollTo
  />
);

const staticAutocompleteWithError = (
  <Autocomplete
    data={{
      items: [
        {item: 'apple', itemInfo: 'US'},
        {item: 'alpha', itemInfo: 'Vienna'},
        {item: 'IBM', itemInfo: 'US'},
        {item: 'kununu', itemInfo: 'Vienna'},
        {item: 'kununu', itemInfo: 'US'},
      ],
    }}
    value="test"
    disabled
    error="An Error"
    errorSubInfo="with useful hints"
    isRequired
    requiredLabel="Required"
    id="autocompletes"
    label="Autocomplete"
    name="autocomplete"
    placeholder="Type something..."
    scrollOffset={70}
    scrollTo
  />
);

test('Renders Autocomplete without crashing', () => {
  const component = renderer.create(staticAutocomplete);

  expect(component.toJSON()).toMatchSnapshot();
});

test('Renders Autocomplete with Error without crashing', () => {
  const component = renderer.create(staticAutocompleteWithError);

  expect(component.toJSON()).toMatchSnapshot();
});

test('Renders no suggestions container', (done) => {
  const component = mount(staticAutocomplete);

  component.find('input').simulate('focus');
  component.find('input').simulate('change', {target: {value: 'z'}});

  // waiting for debounce
  waitingForDebounce(() => {
    expect(toJson(component)).toMatchSnapshot();
    done();
  });
});

test('Renders suggestions container', (done) => {
  const component = mount(staticAutocomplete);

  component.find('input').simulate('change', {target: {value: 'a'}});
  component.find('input').simulate('focus');

  waitingForDebounce(() => {
    expect(toJson(component)).toMatchSnapshot();
    done();
  });
});

test('Hides no suggestions on blur', () => {
  const component = mount(staticAutocomplete);

  component.find('input').simulate('change', {target: {value: 'z'}});
  component.find('input').simulate('focus');
  component.find('input').simulate('blur');
  expect(toJson(component)).toMatchSnapshot();
});

test('Updates value on selection', () => {
  const component = mount(staticAutocomplete);

  component.find('input').hostNodes().simulate('change', {target: {value: 'a'}});
  component.find('input').hostNodes().simulate('focus');
  component.find('#react-autowhatever-autocompletes--item-0').hostNodes().simulate('click');
  expect(toJson(component)).toMatchSnapshot();
});

test('Fetches suggestions on change', (done) => {
  const spyFunc = jest.fn();
  const component = mount(<Autocomplete
    data={{items: []}}
    onGetSuggestions={spyFunc}
    id="autocompletes"
    label="Autocomplete"
    name="autocomplete"
  />);

  component.find('input').simulate('change', {target: {value: 'a'}});

  // Waiting for debounce
  waitingForDebounce(() => {
    expect(spyFunc).toHaveBeenCalled();
    done();
  });
});

test('Fetches Value only when debounce is over', (done) => {
  const component = mount(staticAutocomplete);

  component.find('input').simulate('change', {target: {value: 'kunu'}});
  expect(component.state().suggestions.length).toEqual(6);

  // waiting for debounce
  waitingForDebounce(() => {
    expect(component.state().suggestions.length).toEqual(3);
    done();
  });
});

test('Focusing an Autocomplete calls the onFocus Event', () => {
  const spyFunc = jest.fn();
  const component = mount(<Autocomplete
    data={{items: []}}
    onFocus={spyFunc}
    id="autocompletes"
    label="Autocomplete"
    name="autocomplete"
  />);

  component.find('input').simulate('focus');
  expect(spyFunc.mock.calls.length).toBe(1);
});

test('Bluring an Autocomplete calls the onBlur Event', () => {
  const spyFunc = jest.fn();
  const component = mount(<Autocomplete
    data={{items: []}}
    onBlur={spyFunc}
    id="autocompletes"
    label="Autocomplete"
    name="autocomplete"
  />);

  component.find('input').simulate('focus');
  component.find('input').simulate('blur');
  expect(spyFunc.mock.calls.length).toBe(1);
});

test('Changing an Autocomplete calls the onChange Event', () => {
  const spyFunc = jest.fn();
  const component = mount(<Autocomplete
    data={{items: []}}
    onChange={spyFunc}
    id="autocompletes"
    label="Autocomplete"
    name="autocomplete"
  />);

  component.find('input').simulate('change', {target: {value: 'test'}});
  component.find('input').simulate('change', {target: {value: 'test2'}});
  expect(spyFunc.mock.calls.length).toBe(2);
});

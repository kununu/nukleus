import React from 'react';
import renderer from 'react-test-renderer';
import {mount} from 'enzyme';
import toJson from 'enzyme-to-json';
import Autocomplete from 'Autocomplete'; // eslint-disable-line import/no-unresolved, import/extensions, import/no-extraneous-dependencies

const staticAutocomplete = (
  <Autocomplete
    data={{
      items: [
        {item: 'apple', itemInfo: 'US'},
        {item: 'alpha', itemInfo: 'Vienna'},
        {item: 'IBM', itemInfo: 'US'},
        {item: 'kununu', itemInfo: 'Vienna'},
        {item: 'kununu', itemInfo: 'US'}
      ]
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
    scrollTo />
);

const staticAutocompleteWithError = (
  <Autocomplete
    data={{
      items: [
        {item: 'apple', itemInfo: 'US'},
        {item: 'alpha', itemInfo: 'Vienna'},
        {item: 'IBM', itemInfo: 'US'},
        {item: 'kununu', itemInfo: 'Vienna'},
        {item: 'kununu', itemInfo: 'US'}
      ]
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
    scrollTo />
);

test('Renders Autocomplete without crashing', () => {
  const component = renderer.create(staticAutocomplete);
  expect(component.toJSON()).toMatchSnapshot();
});

test('Renders Autocomplete with Error without crashing', () => {
  const component = renderer.create(staticAutocompleteWithError);
  expect(component.toJSON()).toMatchSnapshot();
});

test('Renders no suggestions container', done => {
  const component = mount(staticAutocomplete);
  component.find('input').simulate('change', {target: {value: 'z'}});

  // waiting for debounce
  setTimeout(() => {
    expect(toJson(component)).toMatchSnapshot();
    done();
  }, 550);
});

test('Renders suggestions container', done => {
  const component = mount(staticAutocomplete);
  component.find('input').simulate('change', {target: {value: 'a'}});
  component.find('input').simulate('focus');

  setTimeout(() => {
    expect(toJson(component)).toMatchSnapshot();
    done();
  }, 550);
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
  component.find('input').simulate('change', {target: {value: 'a'}});
  component.find('input').simulate('focus');
  component.find('#react-autowhatever-1--item-0').simulate('click');
  expect(toJson(component)).toMatchSnapshot();
});

test('Fetches suggestions on change', done => {
  const spyFunc = jest.fn();
  const component = mount(
    <Autocomplete
      data={{items: []}}
      onGetSuggestions={spyFunc}
      id="autocompletes"
      label="Autocomplete"
      name="autocomplete" />
  );

  component.find('input').simulate('change', {target: {value: 'a'}});

  // Waiting for debounce
  setTimeout(() => {
    expect(spyFunc).toHaveBeenCalled();
    done();
  }, 550);
});

test('Fetches Value only when debounce is over', done => {
  const component = mount(staticAutocomplete);
  component.find('input').simulate('change', {target: {value: 'kunu'}});
  expect(component.state().suggestions.length).toEqual(5);

  // waiting for debounce
  setTimeout(() => {
    expect(component.state().suggestions.length).toEqual(2);
    done();
  }, 550);
});

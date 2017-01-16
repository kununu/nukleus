import React from 'react';
import renderer from 'react-test-renderer';
import {mount, shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import Autocomplete from 'Autocomplete'; // eslint-disable-line import/no-unresolved, import/extensions, import/no-extraneous-dependencies

const autocomplete = (
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
    required
    requiredLabel="Required"
    id="autocompletes"
    label="Autocomplete"
    name="autocomplete"
    placeholder="Type something..."
    scrollOffset={70}
    scrollTo />
);

test('Renders Autocomplete without crashing', () => {
  const component = renderer.create(autocomplete);
  expect(component.toJSON()).toMatchSnapshot();
});

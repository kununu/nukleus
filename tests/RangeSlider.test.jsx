import React from 'react';
import renderer from 'react-test-renderer';
import {mount} from 'enzyme';
import toJson from 'enzyme-to-json';
import RangeSlider from 'RangeSlider'; // eslint-disable-line import/no-unresolved

test('Renders RangeSlider', () => {
  const component = renderer.create((
    <RangeSlider
      min={10000}
      max={150000}
      step={1000}
      onChange={() => {}}
    />
  ));

  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});

test('RangeSlider can handle input', () => {
  const component = mount((
    <RangeSlider
      min={10000}
      max={150000}
      step={1000}
      onChange={() => {}}
    />
  ));

  component.find('#range-slider').simulate('change');

  expect(toJson(component)).toMatchSnapshot();
});

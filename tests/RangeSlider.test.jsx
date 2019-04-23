import React from 'react';
import renderer from 'react-test-renderer';
import RangeSlider from 'RangeSlider'; // eslint-disable-line import/no-unresolved

import * as themeable from '../utils/theming';

themeable.default = () => (...args) => Array.isArray(args) ? args.join(' ') : args;

test('Renders basic Table without crashing', () => {
  const component = renderer.create((
    <RangeSlider
      id="salaryCurrencySlider"
      min={0}
      max={1000}
      step={10}
      name="amount"
      onChange={() => { }}
      onBlur={() => { }}
      onFocus={() => { }}
      label="Slider label"
      meta={{
        touched: false,
        error: false,
        value: 0,
      }}
    />
  ));

  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});

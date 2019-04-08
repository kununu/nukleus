import React, {useState} from 'react';
import {storiesOf} from '@storybook/react';
import {defaultOptions} from 'defaultOptions'; // eslint-disable-line import/no-unresolved
import {withOptions} from '@storybook/addon-options';
import {withInfo} from '@storybook/addon-info';
import {withKnobs, number} from '@storybook/addon-knobs/react';

import RangeSlider from './index';

const RangeSliderExample = () => {
  const initialState = {
    sliderValue: 0,
  };
  const [input, handleInput] = useState(initialState);

  return (
    <RangeSlider
      id="salaryCurrencySlider"
      min={number('sliderMinValue', 0)}
      max={number('sliderMaxValue', 1000)}
      step={number('sliderStep', 10)}
      name="amount"
      onChange={e => handleInput({...input, sliderValue: e.target.value})}
      onBlur={() => { }}
      label={`Drag me! ${input.sliderValue || ''}`}
      meta={{
        touched: false,
        error: false,
        value: Number(input.sliderValue),
      }}
    />
  );
};

storiesOf('RangeSlider', module)
  .addDecorator(withOptions({...defaultOptions}))
  .addDecorator(withKnobs)
  .addDecorator((story, context) => withInfo('Rangeslider component! The query param needs to either be the ```window.location.search``` value or an object that contains the query params. The ``pathname`` is only necessary if you want to change the base url. The ``queryKey`` allows you to define what the url param will be - defaults to "page". Lastly, the ``baseLink`` prop allows you to use different link components from your desired library such as react-router Link or next/link from next.js. You can also just use a plain old ``<a>`` tag.')(story)(context))
  .add('basics', () => (
    <RangeSliderExample />
  ));

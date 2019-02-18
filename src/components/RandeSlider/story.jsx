import React from 'react';
import {storiesOf} from '@storybook/react';
import {defaultOptions} from 'defaultOptions'; // eslint-disable-line import/no-unresolved
import {withOptions} from '@storybook/addon-options';
import {withInfo} from '@storybook/addon-info';

import RangeSlider from './index';

storiesOf('RangeSlider', module)
  .addDecorator(withOptions({...defaultOptions}))
  .addDecorator((story, context) => withInfo('The range slider component!')(story)(context))
  .add('basics', () => (
    <div>
      <h3>Range slider</h3>
      <div>
        <RangeSlider
          min={10000}
          max={150000}
          step={10}
        />
      </div>
    </div>
  ));

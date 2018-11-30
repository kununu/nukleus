import React from 'react';
import {storiesOf} from '@storybook/react';
import {defaultOptions} from 'defaultOptions';
import {withOptions} from '@storybook/addon-options';
import {action} from '@storybook/addon-actions';
import {withInfo} from '@storybook/addon-info';
import {withKnobs, text, boolean} from '@storybook/addon-knobs/react';

import DatePicker from './index';

storiesOf('Datepicker', module)
  .addDecorator(withOptions({...defaultOptions}))
  .addDecorator(withKnobs)
  .addDecorator((story, context) => withInfo('Basic datepicker')(story)(context))
  .add('basics', () => (
    <DatePicker
      id="date-picker"
      name="date-picker"
      label="Datepicker"
      inputStyle="block"
      onChange={action('onChange')}
      onFocus={action('onFocus')}
      onBlur={action('onBlur')}
      onClick={action('onClick')}
      error={boolean('error', null)}
      errorSubInfo={text('errorSubInfo', 'Error!')}
      requiredLabel={text('requiredLabel', 'required')}
      labelHidden={boolean('labelHidden', false)}
      icon={<i className="fa fa-calendar" aria-hidden="true" />} />
  ));

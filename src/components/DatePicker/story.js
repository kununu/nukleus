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
      error={boolean('error', null)}
      errorSubInfo={text('errorSubInfo', 'Error!')}
      icon={<i className="fa fa-calendar" aria-hidden="true" />}
      id="date-picker"
      inputStyle="block"
      label="Datepicker"
      labelHidden={boolean('labelHidden', false)}
      name="date-picker"
      onBlur={action('onBlur')}
      onChange={action('onChange')}
      onChangeRaw={action('onChangeRaw')}
      onClick={action('onClick')}
      onFocus={action('onFocus')}
      requiredLabel={text('requiredLabel', 'required')}
      value={text('value', new Date())} />
  ));

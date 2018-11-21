import React from 'react';
import {storiesOf} from '@storybook/react';
import {defaultOptions} from 'defaultOptions';
import {withOptions} from '@storybook/addon-options';
import {action} from '@storybook/addon-actions';
// import {withNotes} from '@storybook/addon-notes';
import {withInfo} from '@storybook/addon-info';
import {withKnobs, text, boolean, array, radios} from '@storybook/addon-knobs/react';

import Combobox from './index';

storiesOf('Combobox', module)
  .addDecorator(withOptions({...defaultOptions}))
  .addDecorator(withKnobs)
  .addDecorator((story, context) => withInfo('The combobox is a select box / text input combo')(story)(context))
  .add('basics', () => (
    <Combobox
      handle={<i className="fa fa-chevron-down" aria-hidden="true" />}
      name="name"
      inputStyles="block"
      isSearchable={boolean('isSearchable', true)}
      label={text('label', 'Combobox')}
      labelHidden={boolean('lableHidden', false)}
      id="name"
      error={boolean('error', false)}
      errorSubInfo={text('errorSubInfo', 'Error!')}
      onSelect={action('onSelect')}
      onChange={action('onChange')}
      onBlur={action('onBlur')}
      onFocus={action('onFocus')}
      isRequired={boolean('isRequired', false)}
      placeholder={text('placeholder', 'type m')}
      items={array('items', ['music', 'maths', 'manga', 'morning', 'musical', 'mania', 'message', 'metal', 'micro', 'macro', 'microphone'], ', ')} />
  ));

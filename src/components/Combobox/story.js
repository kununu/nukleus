import React from 'react';
import {storiesOf} from '@storybook/react';
import {defaultOptions} from 'defaultOptions'; // eslint-disable-line import/no-unresolved
import {withOptions} from '@storybook/addon-options';
import {action} from '@storybook/addon-actions';
import {withInfo} from '@storybook/addon-info';
import {
  withKnobs, text, boolean, array,
} from '@storybook/addon-knobs/react';
import ThemeProvider from '../ThemeProvider';

import Combobox from './index';
import customTheme from './customTheme.scss';

storiesOf('Combobox', module)
  .addDecorator(withOptions({...defaultOptions}))
  .addDecorator(withKnobs)
  .addDecorator((story, context) => withInfo('The combobox is a select box / text input combo')(story)(context))
  .add('basics', () => (
    <Combobox
      handle="&#x25BC;"
      name="name"
      inputStyles="block"
      isSearchable={boolean('isSearchable', true)}
      label={text('label', 'Combobox')}
      labelHidden={boolean('lableHidden', false)}
      id="name"
      onSelect={action('onSelect')}
      onChange={action('onChange')}
      onBlur={action('onBlur')}
      onFocus={action('onFocus')}
      isRequired={boolean('isRequired', false)}
      placeholder={text('placeholder', 'type m')}
      items={array('items', ['music', 'maths', 'manga', 'morning', 'musical', 'mania', 'message', 'metal', 'micro', 'macro', 'microphone'], ', ')}
    />
  ))
  .add('custom', () => (
    <ThemeProvider theme={customTheme}>
      <h3>Custom theme for combobox</h3>
      
      <Combobox
        handle={(
          <i
            className="fa fa-chevron-down"
            aria-hidden="true"
          />
        )}
        name="name"
        inputStyles="block"
        isSearchable={boolean('isSearchable', true)}
        label={text('label', 'Combobox')}
        labelHidden={boolean('lableHidden', false)}
        id="name"
        onSelect={action('onSelect')}
        onChange={action('onChange')}
        onBlur={action('onBlur')}
        onFocus={action('onFocus')}
        isRequired={boolean('isRequired', false)}
        placeholder={text('placeholder', 'type m')}
        items={array('items', ['music', 'maths', 'manga', 'morning', 'musical', 'mania', 'message', 'metal', 'micro', 'macro', 'microphone'], ', ')}
      />
    </ThemeProvider>
  ));

import React from 'react';
import {storiesOf} from '@storybook/react';
import {defaultOptions} from 'defaultOptions';
import {withOptions} from '@storybook/addon-options';
import {action} from '@storybook/addon-actions';
// import {withNotes} from '@storybook/addon-notes';
import {withInfo} from '@storybook/addon-info';
import {withKnobs, text, boolean, select, number} from '@storybook/addon-knobs/react';

import TextField from './index';

const typeOptions = {
  Email: 'email',
  Hidden: 'hidden',
  Number: 'number',
  Password: 'password',
  Text: 'text',
  Url: 'url'
};

storiesOf('TextField', module)
  .addDecorator(withOptions({...defaultOptions}))
  .addDecorator(withKnobs)
  .addDecorator((story, context) => withInfo('Text field component')(story)(context))
  .add('basics', () => (
    <div>
      <h3>
        Basic text field
      </h3>
      <TextField
        autoFocus
        id="text-field"
        disabled={boolean('disabled', false)}
        label={text('label', 'TextField')}
        labelHidden={boolean('labelHidden', false)}
        inputStyle="block"
        highlightList={{bad: 'bad'}}
        minHeight={number('maxHeight', 80)}
        maxLength={number('maxLength', 500)}
        onChange={action('onChange')}
        onFocus={action('onFocus')}
        onBlur={action('onBlur')}
        onClick={action('onClick')}
        error={boolean('error', false)}
        errorSubInfo={text('errorSubInfo', 'Error!')}
        requiredLabel={text('requiredLabel', 'required')}
        type={select('type', typeOptions, 'text')}
        value={text('value', '')}
        name="text-field" />

      <br />
      <h3>
        Text field with multiple lines
      </h3>
      <hr />
      <TextField
        id="text-field"
        label={text('label', 'TextField')}
        disabled={boolean('disabled', false)}
        requiredLabel={text('requiredLabel', 'required')}
        labelHidden={boolean('labelHidden', false)}
        inputStyle="mediumSize"
        highlightList={{bad: 'bad'}}
        multiLine
        dynamicTextareaHeight={boolean('dynamicTextareaHeight', true)}
        maxLength={number('maxHeight', 500)}
        minHeight={number('maxLength', 80)}
        onChange={action('onChange')}
        onFocus={action('onFocus')}
        onBlur={action('onBlur')}
        onClick={action('onClick')}
        error={boolean('error', false)}
        errorSubInfo={text('errorSubInfo', 'Error!')}
        value={text('value', '')}
        name="text-field" />
    </div>
  ));

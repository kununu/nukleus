import React from 'react';
import {storiesOf} from '@storybook/react';
import {defaultOptions} from 'defaultOptions';
import {withOptions} from '@storybook/addon-options';
import {action} from '@storybook/addon-actions';
import {withNotes} from '@storybook/addon-notes';
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
  .addDecorator(withNotes("* Make sure to wrap your TextField in an element with position: relative if you want to use the required label or it won't be positioned correctly"))
  .addDecorator((story, context) => withInfo('Text field component')(story)(context))
  .add('basics', () => (
    <div>
      <h3>
        Basic text field
      </h3>
      <div style={{position: 'relative'}}>
        <TextField
          autoFocus
          id="text-field"
          disable={boolean('disabled', false)}
          displayLength={boolean('displayLength', false)}
          dynamicTextareaHeight={boolean('dynamicTextareaHeight', true)}
          label={text('label', 'TextField')}
          labelHidden={boolean('labelHidden', false)}
          inputStyle="block"
          highlightList={{bad: 'bad', fuck: 'fuck'}}
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
          placeholder={text('placeholder', 'Placeholder text')}
          value={text('value', '')}
          name="text-field" />
      </div>

      <br />
      <hr />

      <h3>
        Text field with multiple lines (textarea)
      </h3>
      <div style={{maxWidth: '1000px'}}>
        <p>
          By using <code>multiLine: true</code> your text input will turn into a textarea. If you select <code>dynamicTextareaHeight: true</code> the height of the textarea will increase as the user types - which is default. Otherwise it will use scoll auto.
        </p>
        <p>
          Additionally, you can enable text highlighting to warn your users about bad words in their text. In order to do this you just need to pass an array of objects to match when the users type to <code>highlightList</code>. You can handle highlighting behaviour with the onHighlight callback.
        </p>
      </div>

      <div style={{position: 'relative'}}>
        <TextField
          id="text-field"
          label={text('label', 'TextField')}
          disable={boolean('disabled', false)}
          displayLength={boolean('displayLength', false)}
          dynamicTextareaHeight={boolean('dynamicTextareaHeight', true)}
          requiredLabel={text('requiredLabel', 'required')}
          labelHidden={boolean('labelHidden', false)}
          inputStyle="mediumSize"
          highlightList={{bad: 'bad'}}
          multiLine
          maxLength={number('maxHeight', 500)}
          minHeight={number('maxLength', 80)}
          onChange={action('onChange')}
          onFocus={action('onFocus')}
          onBlur={action('onBlur')}
          onClick={action('onClick')}
          error={boolean('error', false)}
          errorSubInfo={text('errorSubInfo', 'Error!')}
          placeholder={text('placeholder', 'Placeholder text')}
          value={text('value', '')}
          name="text-field" />
      </div>

      <br />
      <hr />

      <h3>
        Text field with a custom sanitizing function
      </h3>
      <p>
        Here you can control what users are allowed to type - perhaps special characters or more than one white space. Just pass a simple replace() callback to sanitizeValue: <code>value =&gt; value.replace(/a/, &apos;b&apos;)</code> - now all As will be replaced with Bs!
      </p>

      <div style={{position: 'relative'}}>
        <TextField
          autoFocus
          id="text-field"
          disable={boolean('disabled', false)}
          displayLength={boolean('displayLength', false)}
          dynamicTextareaHeight={boolean('dynamicTextareaHeight', true)}
          label={text('label', 'TextField')}
          labelHidden={boolean('labelHidden', false)}
          inputStyle="block"
          highlightList={{bad: 'bad', fuck: 'fuck'}}
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
          placeholder={text('placeholder', 'Placeholder text')}
          sanitizeValue={value => value.replace(/a/, 'b')}
          value={text('value', '')}
          name="text-field" />
      </div>
    </div>
  ));

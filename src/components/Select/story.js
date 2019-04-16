import React from 'react';
import {storiesOf} from '@storybook/react';
import {defaultOptions} from 'defaultOptions'; // eslint-disable-line import/no-unresolved
import {withOptions} from '@storybook/addon-options';
import {action} from '@storybook/addon-actions';
import {withInfo} from '@storybook/addon-info';
import {
  withKnobs, text, boolean, select, object,
} from '@storybook/addon-knobs/react';

import ThemeProvider from '../ThemeProvider';

import Select from './index';
import customTheme from './customTheme.scss';

storiesOf('Select', module)
  .addDecorator(withOptions({...defaultOptions}))
  .addDecorator(withKnobs)
  .addDecorator((story, context) => withInfo('The select component!')(story)(context))
  .add('basics', () => (
    <div>
      <h3>Basic select with no selected value provided</h3>
      <div style={{position: 'relative'}}>
        <Select
          autoFocus={boolean('autoFocus', true)}
          label={text('label', 'Fruit')}
          labelHidden={boolean('labelHidden', false)}
          name={text('name', 'fruit1')}
          id={text('id', 'fruit1')}
          isRequired={boolean('isRequired', false)}
          inputStyle={select('inputStyle', {
            block: 'block',
            inline: 'inline',
          }, 'block')}
          onChange={action('onChange')}
          onBlur={action('onBlur')}
          onFocus={action('onFocus')}
          requiredLabel={text('requiredLabel', 'required')}
          items={object('items', {
            'option-1': 'Banana',
            'option-2': 'Apple',
            'option-3': 'Orange',
          })}
        />
      </div>

      <br />
      <br />
      <hr />
      <br />

      <h3>Select with a default item</h3>
      <p>The default item can be used when you want the user to be able to select nothing. The default item is an option tag without a value.</p>

      <div style={{position: 'relative'}}>
        <Select
          autoFocus={boolean('autoFocus', true)}
          defaultItem={text('defaultItem', 'Reselectable default item')}
          label={text('label', 'Fruit')}
          labelHidden={boolean('labelHidden', false)}
          name={text('name', 'fruit2')}
          id={text('id', 'fruit1')}
          isRequired={boolean('isRequired', false)}
          inputStyle={select('inputStyle', {
            block: 'block',
            inline: 'inline',
          }, 'block')}
          requiredLabel={text('requiredLabel', 'required')}
          onChange={action('onChange')}
          onBlur={action('onBlur')}
          onFocus={action('onFocus')}
          items={object('items', {
            'option-1': 'Banana',
            'option-2': 'Apple',
            'option-3': 'Orange',
          })}
        />
      </div>

      <br />
      <br />
      <hr />
      <br />

      <h3>Select with a default required item</h3>
      <p>
        The default required item will only be shown if nothing is selected and no value is given. Once a user
        selects an option the default required option disappears.
      </p>

      <div style={{position: 'relative'}}>
        <Select
          autoFocus={boolean('autoFocus', true)}
          defaultRequired={text('defaultRequired', 'Please select!')}
          label={text('label', 'Fruit')}
          labelHidden={boolean('labelHidden', false)}
          name={text('name', 'fruit2')}
          id={text('id', 'fruit1')}
          isRequired={boolean('isRequired', false)}
          inputStyle={select('inputStyle', {
            block: 'block',
            inline: 'inline',
          }, 'block')}
          requiredLabel={text('requiredLabel', 'required')}
          onChange={action('onChange')}
          onBlur={action('onBlur')}
          onFocus={action('onFocus')}
          items={object('items', {
            'option-1': 'Banana',
            'option-2': 'Apple',
            'option-3': 'Orange',
          })}
        />
      </div>
    </div>
  ))
  .add('With sorting', () => (
    <div>
      <p>Pass a sorting function to property sort to sort lists or objects without numbered keys.</p>
      <Select
        autoFocus={boolean('autoFocus', true)}
        label={text('label', 'Sorted fruit')}
        labelHidden={boolean('labelHidden', false)}
        name={text('name', 'fruit2')}
        id={text('id', 'fruit1')}
        isRequired={boolean('isRequired', false)}
        inputStyle={select('inputStyle', {
          block: 'block',
          inline: 'inline',
        }, 'block')}
        requiredLabel={text('requiredLabel', 'required')}
        onChange={action('onChange')}
        onBlur={action('onBlur')}
        onFocus={action('onFocus')}
        sort={(curr, next) => curr.value.localeCompare(next.value)}
        items={object('items', {
          'option-1': 'Plum',
          'option-2': 'Banana',
          'option-3': 'Apple',
          'option-4': 'Orange',
        })}
      />
    </div>
  ))
  .add('custom', () => (
    <ThemeProvider theme={customTheme}>
      <div style={{position: 'relative'}}>
        <Select
          autoFocus={boolean('autoFocus', true)}
          label={text('label', 'Fruit')}
          labelHidden={boolean('labelHidden', false)}
          name={text('name', 'fruit1')}
          id={text('id', 'fruit1')}
          isRequired={boolean('isRequired', false)}
          inputStyle={select('inputStyle', {
            block: 'block',
            inline: 'inline',
          }, 'block')}
          onChange={action('onChange')}
          onBlur={action('onBlur')}
          onFocus={action('onFocus')}
          requiredLabel={text('requiredLabel', 'required')}
          items={object('items', {
            'option-1': 'Banana',
            'option-2': 'Apple',
            'option-3': 'Orange',
          })}
        />
      </div>
    </ThemeProvider>
  ));

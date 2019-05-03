/* eslint-disable jsx-a11y/accessible-emoji */

import React from 'react';
import {storiesOf} from '@storybook/react';
import {defaultOptions} from 'defaultOptions'; // eslint-disable-line import/no-unresolved
import {withOptions} from '@storybook/addon-options';
import {action} from '@storybook/addon-actions';
import {withInfo} from '@storybook/addon-info';
import {withKnobs, text, boolean} from '@storybook/addon-knobs/react';

import ThemeProvider from '../ThemeProvider';

import customTheme from './customTheme.scss';

import DatePicker from './index';

storiesOf('DatePicker', module)
  .addDecorator(withOptions({...defaultOptions}))
  .addDecorator(withKnobs)
  .addDecorator((story, context) => withInfo('Basic datepicker')(story)(context))
  .add('basics', () => (
    <DatePicker
      dateFormat={text('dateFormat', 'dd/MM/yyyy')}
      icon={<span>📅</span>}
      id="date-picker"
      inputStyle="block"
      isRequired={boolean('isRequired', false)}
      label="DatePicker"
      labelHidden={boolean('labelHidden', false)}
      name="date-picker"
      onBlur={action('onBlur')}
      onChange={action('onChange')}
      onChangeRaw={action('onChangeRaw')}
      onClick={action('onClick')}
      onFocus={action('onFocus')}
      requiredLabel={text('requiredLabel', 'required')}
      showAbbreviatedMonthDropdown={boolean('showAbbreviatedMonthDropdown', false)}
      showMonthDropdown={boolean('showMonthDropdown', false)}
      showYearDropdown={boolean('showYearDropdown', false)}
      value={text('value', new Date())}
    />
  ))
  .add('custom', () => (
    <ThemeProvider theme={customTheme}>
      <h3>Custom theme for datePicker</h3>

      <DatePicker
        dateFormat={text('dateFormat', 'dd/MM/yyyy')}
        icon={<span>📅</span>}
        id="date-picker"
        inputStyle="block"
        isRequired={boolean('isRequired', false)}
        label="DatePicker"
        labelHidden={boolean('labelHidden', false)}
        name="date-picker"
        onBlur={action('onBlur')}
        onChange={action('onChange')}
        onChangeRaw={action('onChangeRaw')}
        onClick={action('onClick')}
        onFocus={action('onFocus')}
        requiredLabel={text('requiredLabel', 'required')}
        showAbbreviatedMonthDropdown={boolean('showAbbreviatedMonthDropdown', false)}
        showMonthDropdown={boolean('showMonthDropdown', false)}
        showYearDropdown={boolean('showYearDropdown', false)}
        value={text('value', new Date())}
      />
    </ThemeProvider>
  ));

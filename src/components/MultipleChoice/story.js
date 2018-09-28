import React from 'react';
import {storiesOf} from '@storybook/react';
import {defaultOptions} from 'defaultOptions';
import {withOptions} from '@storybook/addon-options';
// import {action} from '@storybook/addon-actions';
// import {withNotes} from '@storybook/addon-notes';
// import {withInfo} from '@storybook/addon-info';
// import {withKnobs, text, boolean} from '@storybook/addon-knobs/react';
// import backgrounds from '@storybook/addon-backgrounds';

import MultipleChoice from './index';

storiesOf('MultipleChoice', module)
  .addDecorator(withOptions({...defaultOptions}))
  .add('basics', () => (
    <MultipleChoice
      name="choices[]"
      label="MultipleChoice"
      options={
      [
        {
          id: 'option-a',
          isChecked: true,
          label: 'option a',
          value: 'option-a'
        },
        {
          id: 'option-b',
          isChecked: false,
          label: 'option b',
          value: 'option-b'
        }]} />
  ))
  .add('Button style', () => (
    <MultipleChoice
      label="Multiple choice component"
      name="choices[]"
      inputStyle="buttons"
      options={
      [{
        id: 'option-1',
        isChecked: true,
        label: 'Elephant',
        value: 'option-1'
      },
      {
        id: 'option-2',
        isChecked: false,
        label: 'Fox',
        value: 'option-2'
      },
      {
        id: 'option-3',
        isChecked: false,
        label: 'Dog',
        value: 'option-3'
      },
      {
        id: 'option-4',
        isChecked: false,
        label: 'Dasypus novemcinctus',
        value: 'option-4'
      },
      {
        id: 'option-5',
        isChecked: false,
        label: 'Horse',
        value: 'option-5'
      },
      {
        id: 'option-6',
        isChecked: false,
        label: 'Chimpanzee',
        value: 'option-6'
      },
      {
        id: 'option-7',
        isChecked: false,
        label: 'Goldfish',
        value: 'option-7'
      }]} />
  ));

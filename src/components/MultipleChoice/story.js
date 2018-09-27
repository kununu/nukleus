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
  .add('with some emoji', () => (
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
  ));

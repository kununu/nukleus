import React from 'react';
import {storiesOf} from '@storybook/react';
import {defaultOptions} from 'defaultOptions';
import {withOptions} from '@storybook/addon-options';
// import {action} from '@storybook/addon-actions';
// import {withNotes} from '@storybook/addon-notes';
// import {withInfo} from '@storybook/addon-info';
// import {withKnobs, text, boolean} from '@storybook/addon-knobs/react';
// import backgrounds from '@storybook/addon-backgrounds';

import Choice from './index';

storiesOf('Choice', module)
  .addDecorator(withOptions({...defaultOptions}))
  .add('with some emoji', () => (
    <Choice
      label="Choice"
      name="basic"
      onChange={() => {}}
      checked="option-a"
      options={[
        {
          id: 'option-a',
          label: 'Option A',
          value: 'option-a'
        },
        {
          id: 'option-b',
          label: 'Option B',
          value: 'option-b'
        },
        {
          id: 'option-c',
          label: 'Option C',
          value: 'option-c'
        }
      ]}
    // {/>}
  ));

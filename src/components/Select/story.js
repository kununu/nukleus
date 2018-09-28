import React from 'react';
import {storiesOf} from '@storybook/react';
import {defaultOptions} from 'defaultOptions';
import {withOptions} from '@storybook/addon-options';
// import {action} from '@storybook/addon-actions';
// import {withNotes} from '@storybook/addon-notes';
// import {withInfo} from '@storybook/addon-info';
// import {withKnobs, text, boolean} from '@storybook/addon-knobs/react';
// import backgrounds from '@storybook/addon-backgrounds';

import Select from './index';

storiesOf('Select', module)
  .addDecorator(withOptions({...defaultOptions}))
  .add('basics', () => (
    <Select
      title="Select"
      name="select"
      id="select"
      isRequired
      value="option"
      items={{
        'option-1': 'Option 1',
        'option-2': 'Option 2',
        'option-3': 'Option 3'
      }} />
  ));

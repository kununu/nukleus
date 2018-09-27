import React from 'react';
import {storiesOf} from '@storybook/react';
import {defaultOptions} from 'defaultOptions';
import {withOptions} from '@storybook/addon-options';
// import {action} from '@storybook/addon-actions';
// import {withNotes} from '@storybook/addon-notes';
// import {withInfo} from '@storybook/addon-info';
// import {withKnobs, text, boolean} from '@storybook/addon-knobs/react';
// import backgrounds from '@storybook/addon-backgrounds';

import TextField from './index';

storiesOf('TextField', module)
  .addDecorator(withOptions({...defaultOptions}))
  .add('with some emoji', () => (
    <TextField
      id="text-field"
      label="TextField"
      inputStyle="mediumSize"
      highlightList={{bad: 'bad'}}
      multiLine
      minHeight={80}
      name="text-field" />
  ));

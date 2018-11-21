import React from 'react';
import {storiesOf} from '@storybook/react';
import {defaultOptions} from 'defaultOptions';
import {withOptions} from '@storybook/addon-options';
import {withInfo} from '@storybook/addon-info';
import {withKnobs, text} from '@storybook/addon-knobs/react';

import TextField from '../TextField';

import InfoText from './index';

storiesOf('InfoText', module)
  .addDecorator(withOptions({...defaultOptions}))
  .addDecorator(withKnobs)
  .addDecorator((story, context) => withInfo('The info text component!')(story)(context))
  .add('basics', () => (
    <div>
      <TextField
        id="text-field"
        label="TextField"
        name="text-field" />

      <div>
        <InfoText
          text={text('text', 'I am an info text.')} />
      </div>
    </div>
  ));

import React from 'react';
import {storiesOf} from '@storybook/react';
import {defaultOptions} from 'defaultOptions';
import {withOptions} from '@storybook/addon-options';
// import {action} from '@storybook/addon-actions';
// import {withNotes} from '@storybook/addon-notes';
// import {withInfo} from '@storybook/addon-info';
// import {withKnobs, text, boolean} from '@storybook/addon-knobs/react';
// import backgrounds from '@storybook/addon-backgrounds';

import Combobox from './index';

storiesOf('Combobox', module)
  .addDecorator(withOptions({...defaultOptions}))
  .add('with some emoji', () => (
    <Combobox
      handle={<i className="fa fa-chevron-down" aria-hidden="true" />}
      name="name"
      label="Combobox"
      id="name"
      isRequired
      placeholder="Type m"
      items={['music', 'maths', 'manga', 'morning', 'musical', 'mania', 'message', 'metal', 'micro', 'macro', 'microphone']} />
  ));

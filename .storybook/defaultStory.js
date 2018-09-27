import React from 'react';
import {storiesOf} from '@storybook/react';
// import {action} from '@storybook/addon-actions';
// import {withNotes} from '@storybook/addon-notes';
// import {withInfo} from '@storybook/addon-info';
// import {withKnobs, text, boolean} from '@storybook/addon-knobs/react';
// import backgrounds from '@storybook/addon-backgrounds';
import {withOptions} from '@storybook/addon-options';
import {defaultOptions} from './defaultOptions';

storiesOf('Introduction', module)
  .addDecorator(
    withOptions({
      ...defaultOptions,
      showAddonPanel: false,
    })
  )
  .add('welcome', () => (
    <div>
    hi
    </div>
  ));

import React from 'react';
import {storiesOf} from '@storybook/react';
import {defaultOptions} from 'defaultOptions';
import {withOptions} from '@storybook/addon-options';
// import {action} from '@storybook/addon-actions';
// import {withNotes} from '@storybook/addon-notes';
// import {withInfo} from '@storybook/addon-info';
// import {withKnobs, text, boolean} from '@storybook/addon-knobs/react';
// import backgrounds from '@storybook/addon-backgrounds';

import ErrorComponent from './index';

storiesOf('Error', module)
  .addDecorator(withOptions({...defaultOptions}))
  .add('with some emoji', () => (
    <ErrorComponent
      info="This is an error"
      subInfo="And I am some sub info" />
  ));

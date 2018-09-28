import React from 'react';
import {storiesOf} from '@storybook/react';
import {defaultOptions} from 'defaultOptions';
import {withOptions} from '@storybook/addon-options';
// import {action} from '@storybook/addon-actions';
// import {withNotes} from '@storybook/addon-notes';
// import {withInfo} from '@storybook/addon-info';
// import {withKnobs, text, boolean} from '@storybook/addon-knobs/react';
// import backgrounds from '@storybook/addon-backgrounds';

import Tabs from './index';

storiesOf('Tabs', module)
  .addDecorator(withOptions({...defaultOptions}))
  .add('basics', () => (
    <Tabs
      items={[
        <a href={{pathname: '/tabs'}}>First Tab</a>,
        <a href={{pathname: '/tabs/2'}}>Second Tab</a>,
        <a href={{pathname: '/tabs/3'}}>Third Tab</a>
      ]}
      pathname="/"
      theme="default" />
  ));

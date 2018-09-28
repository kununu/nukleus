import React from 'react';
import {storiesOf} from '@storybook/react';
import {defaultOptions} from 'defaultOptions';
import {withOptions} from '@storybook/addon-options';
// import {action} from '@storybook/addon-actions';
// import {withNotes} from '@storybook/addon-notes';
// import {withInfo} from '@storybook/addon-info';
// import {withKnobs, text, boolean} from '@storybook/addon-knobs/react';
// import backgrounds from '@storybook/addon-backgrounds';

import Stars from './index';

storiesOf('Stars', module)
  .addDecorator(withOptions({...defaultOptions}))
  .add('basics', () => (
    <Stars
      colors={[
        '#ff464e',
        '#fe8e17',
        '#fec327',
        '#7cb532',
        '#96d04a']}
      name="stars"
      selectable
      value={2} />
  ));

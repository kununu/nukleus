import React from 'react';
import {storiesOf} from '@storybook/react';
import {defaultOptions} from 'defaultOptions';
import {withOptions} from '@storybook/addon-options';
// import {action} from '@storybook/addon-actions';
// import {withNotes} from '@storybook/addon-notes';
// import {withInfo} from '@storybook/addon-info';
// import {withKnobs, text, boolean} from '@storybook/addon-knobs/react';
// import backgrounds from '@storybook/addon-backgrounds';

import Autocomplete from './index';

storiesOf('Autocomplete', module)
  .addDecorator(withOptions({...defaultOptions}))
  .add('with some emoji', () => (
    <Autocomplete
      data={{
        items: [
          {item: 'apple', itemInfo: 'US'},
          {item: 'alpha', itemInfo: 'Vienna'},
          {item: 'IBM', itemInfo: 'US'},
          {item: 'kununu', itemInfo: 'Vienna'},
          {item: 'kununu', itemInfo: 'US'}
        ]
      }}
      id="autocompletes"
      label="Autocomplete"
      name="autocomplete"
      placeholder="Type something..."
      scrollOffset={70}
      scrollTo />
  ));

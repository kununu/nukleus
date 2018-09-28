import React from 'react';
import {storiesOf} from '@storybook/react';
import {defaultOptions} from 'defaultOptions';
import {withOptions} from '@storybook/addon-options';
import {action} from '@storybook/addon-actions';
// import {withNotes} from '@storybook/addon-notes';
import {withInfo} from '@storybook/addon-info';
import {withKnobs, text, boolean} from '@storybook/addon-knobs/react';

import Autocomplete from './index';

storiesOf('Autocomplete', module)
  .addDecorator(withOptions({...defaultOptions}))
  .addDecorator(withKnobs)
  .addDecorator((story, context) => withInfo('The Autocomplete can be used with static or dynamic data and works especially well with state librarys such as redux. To easily customize your spinner you can add pass an element as a spinner prop! To fetch data dynamically you should use the onGetSuggestions param to update the data being passed to the data component. <br /> To enable auto scroll on focus you need to use scrollTo and set a scrollOffset')(story)(context))
  .add('With static data', () => (
    <Autocomplete
      autofocus
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
  ))
  .add('With static data', () => (
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
      onSelectSuggestions={action('onSelectSuggestions')}
      onGetSuggestions={action('onGetSuggestions')}
      onFocus={action('onFocus')}
      onBlur={action('onBlur')}
      error={boolean('Error', false)}
      errorSubInfo={text('ErrorSubInfo', 'Here is some error info!')}
      id="autocompletes"
      label="Autocomplete"
      name="autocomplete"
      placeholder="Type something..."
      scrollOffset={70}
      scrollTo />
  ))
  .add('Block style', () => (
    <Autocomplete
      inputStyle="inline"
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

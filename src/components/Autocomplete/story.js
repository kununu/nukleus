import React from 'react';
import {storiesOf} from '@storybook/react';
import {defaultOptions} from 'defaultOptions'; // eslint-disable-line import/no-unresolved
import {withOptions} from '@storybook/addon-options';
import {action} from '@storybook/addon-actions';
import {withMarkdownNotes} from '@storybook/addon-notes';
import {withInfo} from '@storybook/addon-info';
import {withKnobs, text} from '@storybook/addon-knobs/react';

import ThemeProvider from '../ThemeProvider';

import customTheme from './customTheme.scss';

import Autocomplete from './index';


const staticData = {
  items: [
    {item: 'apple', itemInfo: 'US'},
    {item: 'alpha', itemInfo: 'Vienna'},
    {item: 'IBM', itemInfo: 'US'},
    {item: 'kununu', itemInfo: 'Vienna'},
    {item: 'kununu', itemInfo: 'US'},
  ],
};

storiesOf('Autocomplete', module)
  .addDecorator(withOptions({...defaultOptions}))
  .addDecorator(withKnobs)
  .addDecorator((story, context) => withInfo('The Autocomplete can be used with static or dynamic data and works especially well with state librarys such as redux. To easily customize your spinner you can add pass an element as a spinner prop! To fetch data dynamically you should use the onGetSuggestions param to update the data being passed to the data component. <br /> To enable auto scroll on focus you need to use scrollTo and set a scrollOffset')(story)(context))
  .add('With static data', withMarkdownNotes('The Autocomplete can be used with static or dynamic data and works especially well with state librarys such as redux. To easily customize your spinner you can add pass an element as a spinner prop! To fetch data dynamically you should use the onGetSuggestions param to update the data being passed to the data component. <br /> To enable auto scroll on focus you need to use scrollTo and set a scrollOffset')(() => (
    <div>
      <h1>
        Autocomplete
      </h1>
      <hr />
      <div className="container pull-left">
        <div className="row">

          <h3>
            Autocomplete input with inline label:
          </h3>

          <Autocomplete
            autofocus
            data={staticData}
            id="autocompletes"
            label={text('label', 'Autocomplete')}
            name="autocomplete"
            placeholder={text('placeholder', 'Type something...')}
            onSelectSuggestion={action('onSelectSuggestion')}
            noSuggestionText={text('noSuggestionText', 'No results found')}
            onFocus={action('onFocus')}
            onBlur={action('onBlur')}
            scrollOffset={70}
            scrollTo
          />

          <br />

          <h3>
          Required Autocomplete input with block label:
          </h3>

          <Autocomplete
            inputStyle="block"
            data={staticData}
            id="autocompletes"
            label={text('label', 'Autocomplete')}
            name="autocomplete"
            placeholder={text('placeholder', 'Type something...')}
            isRequired
            onSelectSuggestion={action('onSelectSuggestion')}
            noSuggestionText={text('noSuggestionText', 'No results found')}
            onFocus={action('onFocus')}
            onBlur={action('onBlur')}
            requiredLabel={text('requiredLabel', 'required')}
            scrollOffset={70}
            scrollTo
          />
        </div>
      </div>
    </div>
  )))
  .add('custom', () => (
    <ThemeProvider theme={customTheme}>
      <h3>Custom theme for buttons</h3>

      <p>
        Here is an example of an autocomplete with a custom theme.
      </p>

      <Autocomplete
        inputStyle="block"
        data={staticData}
        id="autocompletes"
        label={text('label', 'Autocomplete')}
        name="autocomplete"
        placeholder={text('placeholder', 'Type something...')}
        isRequired
        onSelectSuggestion={action('onSelectSuggestion')}
        noSuggestionText={text('noSuggestionText', 'No results found')}
        onFocus={action('onFocus')}
        onBlur={action('onBlur')}
        requiredLabel={text('requiredLabel', 'required')}
        scrollOffset={70}
        scrollTo
      />
    </ThemeProvider>
  ));

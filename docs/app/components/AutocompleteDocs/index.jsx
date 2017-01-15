import React from 'react';

import {Autocomplete} from 'nukleus';
import DocsRoot from 'components/DocsRoot';

import {default as example} from './example.txt';
import {default as propsDefinition} from './props-definition.txt';
import {default as propsDefault} from './props-default.txt';

const AutocompleteDocs = () => (
  <DocsRoot
    title="Autocomplete"
    component={
      <Autocomplete
        data={{
          isFetching: false,
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
    }
    example={example}
    propsDefinition={propsDefinition}
    propsDefault={propsDefault} />
);

export default AutocompleteDocs;

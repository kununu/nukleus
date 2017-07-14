import React from 'react';

import {Select} from 'nukleus';
import DocsRoot from 'components/DocsRoot';

import {default as example} from './example.txt';
import {default as propsDefinition} from './props-definition.txt';
import {default as propsDefault} from './props-default.txt';

const SelectDocs = () => (
  <DocsRoot
    title="Select"
    component={
      <Select
        title="Select"
        name="select"
        id="select"
        isRequired
        value="option"
        items={{
          'option': 'Option',
          'option-2': 'Option 2',
          'option-3': 'Option 3'
        }} />
    }
    example={example}
    propsDefinition={propsDefinition}
    propsDefault={propsDefault} />
);

export default SelectDocs;

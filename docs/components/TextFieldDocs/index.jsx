import React from 'react';

import {TextField} from 'nukleus';
import DocsRoot from 'components/DocsRoot';

import {default as example} from './example.txt';
import {default as propsDefinition} from './props-definition.txt';
import {default as propsDefault} from './props-default.txt';

const TextFieldDocs = () => (
  <DocsRoot
    title="TextField"
    component={
      <TextField
        id="text-field"
        label="TextField"
        inputStyle="mediumSize"
        highlightList={{bad: 'bad'}}
        multiLine
        minHeight={80}
        name="text-field" />
    }
    example={example}
    propsDefinition={propsDefinition}
    propsDefault={propsDefault} />
);

export default TextFieldDocs;

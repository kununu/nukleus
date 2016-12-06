import React from 'react';

import {Combobox} from 'nukleus';
import DocsRoot from 'components/DocsRoot';

import {default as example} from './example.txt';
import {default as propsDefinition} from './props-definition.txt';
import {default as propsDefault} from './props-default.txt';

const ComboboxDocs = () => (
  <DocsRoot
    title="Combobox"
    component={
      <Combobox
        name="name"
        label="Combobox"
        id="name"
        required
        placeholder="Type m"
        keyName="name"
        items={['music', 'maths', 'manga', 'morning', 'musical', 'mania', 'message', 'metal', 'micro', 'macro', 'microphone']} />
    }
    example={example}
    propsDefinition={propsDefinition}
    propsDefault={propsDefault} />
);

export default ComboboxDocs;

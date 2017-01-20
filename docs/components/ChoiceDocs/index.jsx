import React from 'react';

import {Choice} from 'nukleus';
import DocsRoot from 'components/DocsRoot';

import {default as example} from './example.txt';
import {default as propsDefinition} from './props-definition.txt';
import {default as propsDefault} from './props-default.txt';

const ChoiceDocs = () => (
  <DocsRoot
    title="Choice"
    component={
      <Choice
        name="basic"
        checked="option-a"
        options={[
          {
            id: 'option-a',
            label: 'Option A',
            value: 'option-a'
          },
          {
            id: 'option-b',
            label: 'Option B',
            value: 'option-b'
          },
          {
            id: 'option-c',
            label: 'Option C',
            value: 'option-c'
          }
        ]} />
    }
    example={example}
    propsDefinition={propsDefinition}
    propsDefault={propsDefault} />
);

export default ChoiceDocs;

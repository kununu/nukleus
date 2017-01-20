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
        onChange={() => {}}
        checked="opA"
        options={{
          opA: 'Option A',
          opB: 'Option B',
          opC: 'Option C'
        }} />
    }
    example={example}
    propsDefinition={propsDefinition}
    propsDefault={propsDefault} />
);

export default ChoiceDocs;

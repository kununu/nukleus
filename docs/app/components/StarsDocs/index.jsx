import React from 'react';

import {Stars} from 'nukleus';
import DocsRoot from 'components/DocsRoot';

import {default as example} from './example.txt';
import {default as propsDefinition} from './props-definition.txt';
import {default as propsDefault} from './props-default.txt';

const StarsDocs = () => (
  <DocsRoot
    title="Stars"
    component={<Stars value={2.5} />}
    example={example}
    propsDefinition={propsDefinition}
    propsDefault={propsDefault} />
);

export default StarsDocs;

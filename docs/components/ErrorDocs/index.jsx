import React from 'react';

import {Error} from 'nukleus';
import DocsRoot from 'components/DocsRoot';

import {default as example} from './example.txt';
import {default as propsDefinition} from './props-definition.txt';
import {default as propsDefault} from './props-default.txt';

const ErrorDocs = () => (
  <DocsRoot
    title="Error"
    component={
      <Error
        info={'This is an error'}
        subInfo={'And I am some sub info'} />
    }
    example={example}
    propsDefinition={propsDefinition}
    propsDefault={propsDefault} />
);

export default ErrorDocs;

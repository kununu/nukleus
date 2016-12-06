import React from 'react';

import {Logo} from 'nukleus';
import DocsRoot from 'components/DocsRoot';

import {default as example} from './example.txt';
import {default as propsDefinition} from './props-definition.txt';
import {default as propsDefault} from './props-default.txt';

const LogoDocs = () => (
  <DocsRoot
    title="Logo"
    component={
      <Logo
        href="/"
        pendingRequests={3} />
    }
    example={example}
    propsDefinition={propsDefinition}
    propsDefault={propsDefault} />
);

export default LogoDocs;

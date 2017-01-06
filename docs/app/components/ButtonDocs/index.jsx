import React from 'react';

import {Button} from 'nukleus';
import DocsRoot from 'components/DocsRoot';

import {default as example} from './example.txt';
import {default as propsDefinition} from './props-definition.txt';
import {default as propsDefault} from './props-default.txt';

const ButtonDocs = () => (
  <DocsRoot
    title="Button"
    component={
      <Button buttonStyle="primary" text="Primary Button" />
    }
    example={example}
    propsDefinition={propsDefinition}
    propsDefault={propsDefault} />
);

export default ButtonDocs;

import React from 'react';

import {Stars} from 'nukleus';
import DocsRoot from 'components/DocsRoot';

import {default as example} from './example.txt';
import {default as propsDefinition} from './props-definition.txt';
import {default as propsDefault} from './props-default.txt';
import {default as extendedExample} from './extended-example.txt';

const StarsDocs = () => (
  <div>
    <DocsRoot
      title="Static stars"
      component={<Stars value={2.5} />}
      example={example}
      propsDefinition={propsDefinition}
      propsDefault={propsDefault} />

    <br /><br />
    <DocsRoot
      title="Selectable stars"
      component={<Stars value={2} selectable colors={['red', 'orange', 'yellow', 'green', 'blue']} />}
      example={extendedExample}
      propsDefinition={propsDefinition}
      propsDefault={propsDefault} />
  </div>
);

export default StarsDocs;

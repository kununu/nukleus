import React from 'react';

import {ToolTip} from 'nukleus';
import DocsRoot from 'components/DocsRoot';

import {default as example} from './example.txt';
import {default as propsDefinition} from './props-definition.txt';
import {default as propsDefault} from './props-default.txt';

const ToolTipDocs = () => (
  <DocsRoot
    title="ToolTip"
    component={
      <ToolTip
        label="Tooltip"
        content="This could be useful" />
    }
    example={example}
    propsDefinition={propsDefinition}
    propsDefault={propsDefault} />
);

export default ToolTipDocs;

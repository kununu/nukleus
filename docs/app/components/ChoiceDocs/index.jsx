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
        name="checkbox-group[]"
        heading="CheckboxGroup"
        checkboxes={
        [
          {
            id: 'option-1',
            isChecked: true,
            label: 'option 1',
            value: 'option-1'
          },
          {
            id: 'option-2',
            isChecked: true,
            label: 'option 2',
            value: 'option-2'
          },
          {
            id: 'option-3',
            isChecked: false,
            label: 'option 3',
            value: 'option-2'
          },
          {
            id: 'option-4',
            isChecked: false,
            label: 'option 4',
            value: 'option-4'
          }
        ]
        } />
    }
    example={example}
    propsDefinition={propsDefinition}
    propsDefault={propsDefault} />
);

export default ChoiceDocs;

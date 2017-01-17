import React from 'react';

import {MultipleChoice} from 'nukleus';
import DocsRoot from 'components/DocsRoot';

import {default as example} from './example.txt';
import {default as propsDefinition} from './props-definition.txt';
import {default as propsDefault} from './props-default.txt';

const MultipleChoiceDocs = () => (
  <DocsRoot
    title="MultipleChoice"
    component={
      <div>
        <MultipleChoice
          name="choices[]"
          heading="MultipleChoice"
          choices={
          [
            {
              id: 'option-a',
              isChecked: true,
              label: 'option 1',
              value: 'option-1'
            },
            {
              id: 'option-b',
              isChecked: false,
              label: 'option 2',
              value: 'option-2'
            }]} />

        <br />

        <MultipleChoice
          name="choices[]"
          inputStyle="buttons"
          choices={
          [{
            id: 'option-1',
            isChecked: true,
            label: 'Option 1',
            value: 'option-1'
          },
          {
            id: 'option-2',
            isChecked: false,
            label: 'Option 2',
            value: 'option-2'
          },
          {
            id: 'option-3',
            isChecked: false,
            label: 'Option 3',
            value: 'option-3'
          },
          {
            id: 'option-4',
            isChecked: false,
            label: 'Option 4',
            value: 'option-4'
          },
          {
            id: 'option-5',
            isChecked: false,
            label: 'Option 5',
            value: 'option-5'
          },
          {
            id: 'option-6',
            isChecked: false,
            label: 'Option 6',
            value: 'option-6'
          },
          {
            id: 'option-7',
            isChecked: false,
            label: 'Option 7',
            value: 'option-7'
          }]} />
      </div>
    }
    example={example}
    propsDefinition={propsDefinition}
    propsDefault={propsDefault} />
);

export default MultipleChoiceDocs;

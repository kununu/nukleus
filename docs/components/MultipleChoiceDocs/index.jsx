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
          label="MultipleChoice"
          options={
          [
            {
              id: 'option-a',
              isChecked: true,
              label: 'option a',
              value: 'option-a'
            },
            {
              id: 'option-b',
              isChecked: false,
              label: 'option b',
              value: 'option-b'
            }]} />

        <br />

        <MultipleChoice
          name="choices[]"
          inputStyle="buttons"
          options={
          [{
            id: 'option-1',
            isChecked: true,
            label: 'Elephant',
            value: 'option-1'
          },
          {
            id: 'option-2',
            isChecked: false,
            label: 'Fox',
            value: 'option-2'
          },
          {
            id: 'option-3',
            isChecked: false,
            label: 'Dog',
            value: 'option-3'
          },
          {
            id: 'option-4',
            isChecked: false,
            label: 'Dasypus novemcinctus',
            value: 'option-4'
          },
          {
            id: 'option-5',
            isChecked: false,
            label: 'Horse',
            value: 'option-5'
          },
          {
            id: 'option-6',
            isChecked: false,
            label: 'Chimpanzee',
            value: 'option-6'
          },
          {
            id: 'option-7',
            isChecked: false,
            label: 'Goldfish',
            value: 'option-7'
          }]} />
      </div>
    }
    example={example}
    propsDefinition={propsDefinition}
    propsDefault={propsDefault} />
);

export default MultipleChoiceDocs;

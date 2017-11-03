import React, {PropTypes} from 'react';

import {Choice} from 'nukleus';
import DocsRoot from 'components/DocsRoot';

import {default as example} from './example.txt';
import {default as propsDefinition} from './props-definition.txt';
import {default as propsDefault} from './props-default.txt';

const ChoiceDocs = ({location: {query}}) => (
  <DocsRoot
    title="Choice"
    component={
      <div>
        <Choice
          label="Choice"
          name="basic"
          onChange={() => {}}
          checked="option-a"
          options={[
            {
              id: 'option-a',
              label: 'Option A',
              value: 'option-a'
            },
            {
              id: 'option-b',
              label: 'Option B',
              value: 'option-b'
            },
            {
              id: 'option-c',
              label: 'Option C',
              value: 'option-c'
            }
          ]}
          query={query} />
        <br /><br />
        <Choice
          label="Choice with multiple rows"
          name="multiple-rows"
          onChange={() => {}}
          optionsPerRow="3"
          checked="option-per-row-a"
          options={[
            {
              id: 'option-per-row-a',
              label: 'Option A',
              value: 'option-per-row-a'
            },
            {
              id: 'option-per-row-b',
              label: 'Option B',
              value: 'option-per-row-b'
            },
            {
              id: 'option-per-row-c',
              label: 'Option C',
              value: 'option-per-row-c'
            },
            {
              id: 'option-per-row-d',
              label: 'Option D',
              value: 'option-per-row-d'
            },
            {
              id: 'option-per-row-e',
              label: 'Option E',
              value: 'option-per-row-e'
            },
            {
              id: 'option-per-row-f',
              label: 'Option F',
              value: 'option-per-row-f'
            }
          ]}
          query={query} />
      </div>
    }
    example={example}
    propsDefinition={propsDefinition}
    propsDefault={propsDefault} />
);

ChoiceDocs.propTypes = {
  location: PropTypes.object.isRequired
};


export default ChoiceDocs;

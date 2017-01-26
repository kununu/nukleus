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
      <Choice
        heading="Choice"
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
    }
    example={example}
    propsDefinition={propsDefinition}
    propsDefault={propsDefault} />
);

ChoiceDocs.propTypes = {
  location: PropTypes.object
};


export default ChoiceDocs;

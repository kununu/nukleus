import React from 'react';

import {Stars} from 'nukleus';
import DocsRoot from 'components/DocsRoot';

import {default as example} from './example.txt';
import {default as propsDefinition} from './props-definition.txt';
import {default as propsDefault} from './props-default.txt';

const StarsDocs = () => (
  <div>
    <DocsRoot
      title="Stars"
      component={
        <div>
          <div className="inline-block">
            <Stars name="stars" value={2.5} />
          </div>&nbsp;
          <br /><br />
          <div className="row">
            <div className="col-sm-4 col-md-3">
              <Stars
                value={2}
                name="stars"
                selectable
                colors={[
                  '#ff464e',
                  '#fe8e17',
                  '#fec327',
                  '#7cb532',
                  '#96d04a']} />
            </div>
          </div>
        </div>
      }
      example={example}
      propsDefinition={propsDefinition}
      propsDefault={propsDefault} />
  </div>
);

export default StarsDocs;

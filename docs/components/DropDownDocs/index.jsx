import React from 'react';
import {Link} from 'react-router';

import {DropDown} from 'nukleus';
import DocsRoot from 'components/DocsRoot';

import {default as example} from './example.txt';
import {default as propsDefinition} from './props-definition.txt';
import {default as propsDefault} from './props-default.txt';

const at = require('./img/at.gif');
const ch = require('./img/ch.gif');
const de = require('./img/de.gif');
const us = require('./img/us.gif');

const DropDownDocs = () => (
  <DocsRoot
    title="DropDown"
    component={
      <div style={{backgroundColor: '#121b21'}}>
        <DropDown
          position="bottom"
          items={[
            {
              active: false,
              icon: <img
                alt="Austrian flag"
                src={at} />,
              link: <Link to={{pathname: '/drop-down/at'}}>Austria</Link>,
              value: 'Austria'
            },
            {
              active: false,
              icon: <img
                alt="German flag"
                src={de} />,
              link: <Link to={{pathname: '/drop-down/de'}}>German</Link>,
              value: 'German'
            },
            {
              active: false,
              icon: <img
                alt="Swiss flag"
                src={ch} />,
              link: <Link to={{pathname: '/drop-down/ch'}}>Switzerland</Link>,
              value: 'Switzerland'
            },
            {
              active: true,
              icon: <img
                alt="American flag"
                src={us} />,
              link: <Link to={{pathname: '/drop-down/us'}}>United States</Link>,
              value: 'United States'
            }
          ]} />
      </div>
    }
    example={example}
    propsDefinition={propsDefinition}
    propsDefault={propsDefault} />
);

export default DropDownDocs;

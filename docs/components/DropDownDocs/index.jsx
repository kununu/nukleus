import React, {PropTypes} from 'react';
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

const DropDownDocs = ({location: {pathname}}) => (
  <DocsRoot
    title="DropDown"
    component={
      <div style={{backgroundColor: '#121b21'}}>
        <DropDown
          pathname={pathname}
          position="bottom"
          items={[
            {
              icon: <img
                alt="Austrian flag"
                src={at} />,
              link: <Link to={{pathname: '/drop-down'}}>Austria</Link>,
              value: 'Austria'
            },
            {
              icon: <img
                alt="German flag"
                src={de} />,
              link: <Link to={{pathname: '/drop-down/de'}}>German</Link>,
              value: 'German'
            },
            {
              icon: <img
                alt="Swiss flag"
                src={ch} />,
              link: <Link to={{pathname: '/drop-down/ch'}}>Switzerland</Link>,
              value: 'Switzerland'
            },
            {
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

DropDownDocs.propTypes = {
  location: PropTypes.object.isRequired
};

export default DropDownDocs;

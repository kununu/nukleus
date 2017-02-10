import React from 'react';

import {DatePicker} from 'nukleus';
import DocsRoot from 'components/DocsRoot';

import {default as example} from './example.txt';
import {default as propsDefinition} from './props-definition.txt';
import {default as propsDefault} from './props-default.txt';

const DatePickerDocs = () => (
  <DocsRoot
    title="DatePicker"
    component={
      <DatePicker
        id="date-picker"
        name="date-picker"
        title="DatePicker"
        icon={<i className="fa fa-calendar" aria-hidden="true" />} />
    }
    example={example}
    propsDefinition={propsDefinition}
    propsDefault={propsDefault} />
);

export default DatePickerDocs;

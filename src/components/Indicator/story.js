import React from 'react';
import {storiesOf} from '@storybook/react';
import {defaultOptions} from 'defaultOptions'; // eslint-disable-line import/no-unresolved
import {withOptions} from '@storybook/addon-options';


import Indicator from './index';

storiesOf('Indicator', module)
  .addDecorator(withOptions({...defaultOptions}))
  .add('basics', () => (
    <div style={{maxWidth: '1000px'}}>
      <Indicator
        title="Work-Life Balance"
      />
    </div>
  ));

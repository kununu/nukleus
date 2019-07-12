import React from 'react';
import {storiesOf} from '@storybook/react';
import {defaultOptions} from 'defaultOptions'; // eslint-disable-line import/no-unresolved
import {withOptions} from '@storybook/addon-options';


import Gauge from './index';

storiesOf('Gauge', module)
  .addDecorator(withOptions({...defaultOptions}))
  .add('basics', () => (
    <div style={{maxWidth: '1000px'}}>
      <Gauge
        leftLabel="Traditional"
        rightLabel="Modern"
        smallHand={{
          value: 90,
          legend: 'Industry Average',
        }}
        bigHand={{
          value: 90,
          legend: 'Expedia',
        }}
      />
    </div>
  ));

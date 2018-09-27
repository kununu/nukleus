import React from 'react';
import {storiesOf} from '@storybook/react';

import Button from '../src/components/Button';

storiesOf('Test', module)
  .add('button', () => (
    <Button text="hi" />
  ));

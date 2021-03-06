import React from 'react';
import {storiesOf} from '@storybook/react';
import {defaultOptions} from 'defaultOptions'; // eslint-disable-line import/no-unresolved
import {withOptions} from '@storybook/addon-options';
import {withInfo} from '@storybook/addon-info';
import {withKnobs, text} from '@storybook/addon-knobs/react';

import ThemeProvider from '../ThemeProvider';

import customTheme from './customTheme.scss';

import ErrorComponent from './index';

storiesOf('Error', module)
  .addDecorator(withOptions({...defaultOptions}))
  .addDecorator(withKnobs)
  .addDecorator((story, context) => withInfo('Basic error block')(story)(context))
  .add('basics', () => (
    <ErrorComponent
      info={text('info', 'This is an error')}
      subInfo={text('subinfo', 'And I am some sub info')}
    />
  ))
  .add('custom', () => (
    <ThemeProvider theme={customTheme}>
      <ErrorComponent
        info={text('info', 'This is an error')}
        subInfo={text('subinfo', 'And I am some sub info')}
      />
    </ThemeProvider>
  ));

import React from 'react';
import {storiesOf} from '@storybook/react';
import {defaultOptions} from 'defaultOptions'; // eslint-disable-line import/no-unresolved
import {withOptions} from '@storybook/addon-options';
import {withInfo} from '@storybook/addon-info';
import {withKnobs, text, select} from '@storybook/addon-knobs/react';

import ThemeProvider from '../ThemeProvider';

import customTheme from './customTheme.scss';

import ToolTip from './index';

storiesOf('ToolTip', module)
  .addDecorator(withOptions({...defaultOptions}))
  .addDecorator(withKnobs)
  .addDecorator((story, context) => withInfo('The tooltip component!')(story)(context))
  .add('basics', () => (
    <div>
      <h3>
        Tooltip
      </h3>
      <p>
        The tooltip component is usually used along with TextField labels to add some additional info regarding that input field. You can customize your own icon via the
        {' '}
        <code>icon</code>
        {' '}
        prop.
      </p>

      <ToolTip
        label={text('label', 'Tooltip')}
        content={text('content', 'This could be useful')}
        position={select('position', {
          bottomLeft: 'bottomLeft',
          bottomRight: 'bottomRight',
          topLeft: 'topLeft',
          topRight: 'topRight',
        })}
      />
    </div>
  ))
  .add('custom', () => (
    <ThemeProvider theme={customTheme}>
      <h3>
        Example of custom tooltip component
      </h3>

      <ToolTip
        label={text('label', 'Tooltip')}
        content={text('content', 'This could be useful')}
        position={select('position', {
          bottomLeft: 'bottomLeft',
          bottomRight: 'bottomRight',
          topLeft: 'topLeft',
          topRight: 'topRight',
        })}
      />
    </ThemeProvider>
  ));

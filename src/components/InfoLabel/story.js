import React from 'react';
import {storiesOf} from '@storybook/react';
import {defaultOptions} from 'defaultOptions'; // eslint-disable-line import/no-unresolved
import {withOptions} from '@storybook/addon-options';
import {
  withKnobs, text, boolean, number,
} from '@storybook/addon-knobs';
import {withInfo} from '@storybook/addon-info';

import ThemeProvider from '../ThemeProvider';

import customTheme from './customTheme.scss';

import InfoLabel from './index';

const textInfo = 'The info label component! This tiny component is used to show additional info about a form field to the user. It can either show a required text or the character count. You can select this based on the displayLength true/false or with a requiredLabel string.';

storiesOf('InfoLabel', module)
  .addDecorator(withOptions({...defaultOptions}))
  .addDecorator(withKnobs)
  .addDecorator((story, context) => withInfo(textInfo)(story)(context))
  .add('basics', () => (
    <div style={{maxWidth: '1000px'}}>
      <h3>InfoLabel</h3>
      <p>
        {textInfo}
      </p>
      <div style={{
        maxWidth: '100px',
        position: 'relative',
      }}
      >
        <InfoLabel
          inputValue={text('inputValue', 'Simple info label')}
          displayLength={boolean('displayLength', true)}
          maxLength={number('maxLength', 500)}
          requiredLabel={text('requiredLabel', 'Required')}
        />
      </div>
    </div>
  ))
  .add('custom', () => (
    <div style={{maxWidth: '1000px'}}>
      <h3>InfoLabel with custom theme</h3>
      <div style={{
        maxWidth: '100px',
        position: 'relative',
      }}
      >
        <ThemeProvider theme={customTheme}>
          <InfoLabel
            inputValue={text('inputValue', 'Simple info label')}
            displayLength={boolean('displayLength', true)}
            maxLength={number('maxLength', 500)}
            requiredLabel={text('requiredLabel', 'Required')}
          />
        </ThemeProvider>
      </div>
    </div>
  ));

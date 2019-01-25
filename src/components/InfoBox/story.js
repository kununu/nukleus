import React from 'react';
import {storiesOf} from '@storybook/react';
import {defaultOptions} from 'defaultOptions';
import {withOptions} from '@storybook/addon-options';
import {withKnobs, select} from '@storybook/addon-knobs';
import {withInfo} from '@storybook/addon-info';


import InfoBox from './index';

storiesOf('InfoBox', module)
  .addDecorator(withOptions({...defaultOptions}))
  .addDecorator(withKnobs)
  .addDecorator((story, context) => withInfo('The info box component! This was created for the toolTip component but can be used as a info pop up for anything. To see full functionality take a look at the toolTip component.')(story)(context))
  .add('basics', () => (
    <div style={{marginTop: '100px', textAlign: 'center'}}>
      <div style={{
        display: 'inline-block',
        padding: '10px',
        position: 'relative',
      }}
      >
        <span
          aria-label="button"
          role="img"
        >
🔘
        </span>
        <InfoBox
          content="hi there how are you!"
          position={
            select(
              'position',
              {
                bottomLeft: 'bottomLeft',
                bottomRight: 'bottomRight',
                topLeft: 'topLeft',
                topRight: 'topRight',
              },
              'topLeft',
            )
          }
        />
      </div>
    </div>
  ));

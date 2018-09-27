import React from 'react';
import {storiesOf} from '@storybook/react';
import {defaultOptions} from 'defaultOptions';
import {withOptions} from '@storybook/addon-options';
// import {action} from '@storybook/addon-actions';
// import {withNotes} from '@storybook/addon-notes';
// import {withInfo} from '@storybook/addon-info';
// import {withKnobs, text, boolean} from '@storybook/addon-knobs/react';
// import backgrounds from '@storybook/addon-backgrounds';

import ToolTip from './index';

storiesOf('ToolTip', module)
  .addDecorator(withOptions({...defaultOptions}))
  .add('with some emoji', () => (
    <ToolTip
      label="Tooltip"
      content="This could be useful" />
  ));

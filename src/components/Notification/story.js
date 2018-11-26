import React from 'react';
import {storiesOf} from '@storybook/react';
import {defaultOptions} from 'defaultOptions';
import {withOptions} from '@storybook/addon-options';
import {withInfo} from '@storybook/addon-info';
import {action} from '@storybook/addon-actions';
import {withKnobs, text, number} from '@storybook/addon-knobs/react';

import Notification from './index';

storiesOf('Notification', module)
  .addDecorator(withOptions({...defaultOptions}))
  .addDecorator(withKnobs)
  .addDecorator((story, context) => withInfo('The notification component!')(story)(context))
  .add('error', () => (
    <Notification
      type="error"
      onCloseClick={action('onCloseClick')}
      message={text('message', 'Hi, I am an error notification box')}
      icon={<i className="fa fa-cross" />}
      visible />
  ))
  .add('success', () => (
    <Notification
      onCloseClick={action('onCloseClick')}
      message={text('message', 'Hi, I am a success notification box')}
      icon={<i className="fa fa-check" />}
      visible />
  ))
  .add('time out', () => (
    <Notification
      closeMethod="onTimeout"
      duraction={number('duration', 3000)}
      onCloseClick={action('onCloseClick')}
      message={text('message', 'Hi, I am a success notification box')}
      icon={<i className="fa fa-check" />}
      visible />
  ));
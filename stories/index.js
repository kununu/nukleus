import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {withNotes} from '@storybook/addon-notes';
import {withInfo} from '@storybook/addon-info';
import {withKnobs, text, boolean} from '@storybook/addon-knobs/react';
import backgrounds from '@storybook/addon-backgrounds';

import Button from '../src/components/Button';

import '../main.scss';

storiesOf('Button', module)
  .addDecorator(withKnobs)
  .addDecorator((story, context) => withInfo('Testing out info decorator yo')(story)(context))
  .addDecorator(backgrounds([
    {default: true, name: 'plain', value: '#ffffff'},
    {name: 'twitter', value: '#00aced'},
    {name: 'facebook', value: '#3b5998'}
  ]))
  .add('with text', withNotes('A very simple component yo')(() => (
    <Button text={text('Label', 'Button textk')} onClick={action('clicked')} disabled={boolean('Disabled', false)} />
  )))
  .add('with some emoji', () => (
    <Button text="meow" />
  ));
